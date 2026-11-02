import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import dotenv from 'dotenv';
import { Dropbox } from 'dropbox';
import exifr from 'exifr';
import sharp from 'sharp';
import { atomicWrite, readCatalog, validateCatalog } from './photo-library.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const digest = value => createHash('sha256').update(value).digest('hex');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const supported = /\.(jpe?g|png|heic|heif|webp)$/i;

export async function retry(operation, sleep = pause) {
  for (let attempt = 0; ; attempt++) {
    try { return await operation(); }
    catch (error) {
      if (attempt >= 4 || !(error.status === 429 || error.status >= 500 || error.name === 'TimeoutError' || error instanceof TypeError)) throw error;
      const retryAfter = Number(error.headers?.get?.('retry-after'));
      await sleep(Math.min(60000, Math.max(1000 * 2 ** attempt, retryAfter * 1000 || 0)));
    }
  }
}

// Dropbox SDK v10 expects node-fetch's .buffer(); adapt Node's native Response.
export async function dropboxFetch(url, options) {
  if (new URL(url).pathname === '/oauth2/token' && options?.body && typeof options.body === 'object') {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    options = { ...options, headers, body: new URLSearchParams(options.body) };
  }
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(60000) });
  response.buffer = async () => Buffer.from(await response.arrayBuffer());
  return response;
}

export function createClient(env = process.env, fetchImpl = dropboxFetch) {
  const refresh = env.DROPBOX_REFRESH_TOKEN;
  if (refresh && (!env.DROPBOX_APP_KEY || !env.DROPBOX_APP_SECRET)) throw new Error('A refresh token requires DROPBOX_APP_KEY and DROPBOX_APP_SECRET.');
  if (!refresh && !env.DROPBOX_ACCESS_TOKEN) throw new Error('Missing Dropbox credentials. See docs/dropbox-photos.md.');
  return new Dropbox({ fetch: fetchImpl, dataOnBody: true, ...(refresh ? {
    refreshToken: refresh, clientId: env.DROPBOX_APP_KEY, clientSecret: env.DROPBOX_APP_SECRET,
  } : { accessToken: env.DROPBOX_ACCESS_TOKEN }) });
}

export function photoMetadata(entry, exif = {}) {
  const media = entry.media_info?.metadata;
  const latitude = exif.latitude ?? media?.location?.latitude;
  const longitude = exif.longitude ?? media?.location?.longitude;
  const validGps = Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
  const date = [exif.DateTimeOriginal, exif.CreateDate, media?.time_taken, entry.client_modified, entry.server_modified]
    .map(value => value ? new Date(value) : null).find(value => value && Number.isFinite(value.getTime()));
  if (!date) throw new Error('No valid capture or upload date.');
  return { geometry: validGps ? { type: 'Point', coordinates: [longitude, latitude] } : null, date: date.toISOString() };
}

export async function syncPhotos({ client, root = ROOT, folder = '', sleep = pause, log = console.log } = {}) {
  if (!client) throw new Error('Dropbox client required.');
  if (folder === '/') folder = '';
  if (folder !== '' && !folder.startsWith('/')) throw new Error('DROPBOX_FOLDER_PATH must begin with / (or be empty for the app root).');
  const catalogFile = path.join(root, 'src/data/locations.json');
  const catalog = await readCatalog(catalogFile);
  const originalCatalog = JSON.stringify(catalog, null, 2) + '\n';
  const entries = [];
  let page = await retry(() => client.filesListFolder({ path: folder, recursive: true, include_media_info: true, limit: 2000 }), sleep);
  while (true) {
    entries.push(...page.result.entries);
    if (!page.result.has_more) break;
    page = await retry(() => client.filesListFolderContinue({ cursor: page.result.cursor }), sleep);
  }
  const files = entries.filter(entry => entry['.tag'] === 'file' && supported.test(entry.name));
  const nameCounts = new Map();
  for (const entry of files) nameCounts.set(entry.name, (nameCounts.get(entry.name) || 0) + 1);
  let added = 0, updated = 0, linked = 0, unchanged = 0;
  const failures = [];
  const retired = new Set();
  for (const entry of files) {
    try {
      if (!entry.id || !entry.rev) throw new Error('Dropbox file is missing its ID or revision.');
      const existing = catalog.features.find(photo => photo.properties.dropboxId === entry.id);
      if (existing?.properties.dropboxRev === entry.rev) {
        try { await fs.access(path.join(root, 'public', existing.properties.src)); unchanged++; continue; }
        catch { /* Restore a missing thumbnail from Dropbox. */ }
      }
      const preview = await retry(() => client.filesGetThumbnailV2({ resource: { '.tag': 'path', path: entry.id }, format: 'jpeg', size: 'w1024h768', mode: 'bestfit' }), sleep);
      const raw = preview.result.fileBinary ?? preview.result.fileBlob;
      const thumbnail = raw instanceof Blob ? Buffer.from(await raw.arrayBuffer()) : Buffer.isBuffer(raw) ? raw : typeof raw === 'string' ? Buffer.from(raw, 'binary') : Buffer.from(raw);
      // Link legacy imports only when the filename is unambiguous AND the bytes match.
      const legacy = !existing && nameCounts.get(entry.name) === 1
        ? catalog.features.filter(photo => !photo.properties.dropboxId && photo.properties.name === entry.name) : [];
      if (legacy.length === 1) {
        const photo = legacy[0];
        let bytes;
        try { bytes = await fs.readFile(path.join(root, 'public', photo.properties.src)); } catch { /* Import a new, recoverable copy below. */ }
        if (bytes && digest(bytes) === digest(thumbnail)) {
          const dimensions = await sharp(bytes).metadata();
          Object.assign(photo.properties, { dropboxId: entry.id, dropboxRev: entry.rev, width: dimensions.width, height: dimensions.height });
          linked++; continue;
        }
      }
      let exif;
      // Full originals avoid the old truncated-EXIF bug. Large files use Dropbox's metadata.
      if (entry.size <= 50 * 1024 * 1024) {
        const download = await retry(() => client.filesDownload({ path: entry.id }), sleep);
        const binary = download.result.fileBinary ?? download.result.fileBlob;
        const buffer = binary instanceof Blob ? Buffer.from(await binary.arrayBuffer()) : Buffer.from(binary);
        try { exif = await exifr.parse(buffer, { gps: true }); } catch { /* A photo without readable EXIF still belongs in the diary. */ }
      }
      const metadata = photoMetadata(entry, exif || {});
      const { data, info } = await sharp(thumbnail).rotate().jpeg({ quality: 88 }).toBuffer({ resolveWithObject: true });
      const stem = entry.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70) || 'photo';
      // ID prevents name collisions; revision prevents stale browser/CDN thumbnails after edits.
      const src = `/images/travel/travel-${stem}-${digest(entry.id + ':' + entry.rev).slice(0, 16)}.jpg`;
      await atomicWrite(path.join(root, 'public', src), data);
      const feature = { type: 'Feature', geometry: metadata.geometry, properties: {
        ...(existing?.properties.caption ? { caption: existing.properties.caption } : {}),
        src, name: entry.name, date: metadata.date, width: info.width, height: info.height, dropboxId: entry.id, dropboxRev: entry.rev,
      } };
      if (existing) { retired.add(existing.properties.src); catalog.features[catalog.features.indexOf(existing)] = feature; updated++; }
      else { catalog.features.push(feature); added++; }
    } catch (error) {
      // Avoid logging response bodies, tokens, signed links, or file contents.
      failures.push(`${entry.name}: ${error.status ? `Dropbox HTTP ${error.status}` : 'could not process photo'}`);
    }
  }
  validateCatalog(catalog);
  const result = JSON.stringify(catalog, null, 2) + '\n';
  if (result !== originalCatalog) await atomicWrite(catalogFile, result);
  // Only remove superseded imports after the replacement catalog is safely written.
  const referenced = new Set(catalog.features.map(photo => photo.properties.src));
  for (const src of retired) if (!referenced.has(src)) await fs.rm(path.join(root, 'public', src), { force: true });
  log(`Photos: ${added} added, ${updated} updated, ${linked} legacy linked, ${unchanged} unchanged; ${catalog.features.length} total.`);
  if (failures.length) throw new Error(`${failures.length} photo(s) failed; retry the sync.\n${failures.join('\n')}`);
  return { added, updated, linked, unchanged, total: catalog.features.length, referenced };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  dotenv.config({ path: path.join(ROOT, '.env.local'), quiet: true });
  try {
    const folder = process.env.DROPBOX_FOLDER_PATH;
    if (!folder) throw new Error('Set DROPBOX_FOLDER_PATH to the upload folder (or / for the app root). Refusing to import an unspecified folder.');
    await syncPhotos({ client: createClient(), folder });
  }
  catch (error) {
    console.error(error.status ? `Dropbox sync failed (HTTP ${error.status}). Check credentials and permissions.` : error.message);
    process.exitCode = 1;
  }
}
