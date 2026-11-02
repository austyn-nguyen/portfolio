import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { createHmac } from 'node:crypto';
import { syncPhotos, photoMetadata, retry, createClient, dropboxFetch } from '../sync-dropbox.mjs';
import { readCatalog, validateCatalog, validateImages } from '../photo-library.mjs';
import { webhookHandlers } from '../dropbox-webhook.mjs';

const jpeg = await sharp({ create: { width: 12, height: 18, channels: 3, background: '#d6b558' } }).jpeg().toBuffer();
const entry = (id, overrides = {}) => ({ '.tag': 'file', id, rev: 'r1', name: 'IMG_0001.HEIC', size: 100, client_modified: '2026-01-15T12:00:00Z', ...overrides });
async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'portfolio-photo-test-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  return root;
}
const manifest = root => path.join(root, 'src/data/locations.json');
function mockClient(entries) {
  let thumbnails = 0;
  return {
    get thumbnails() { return thumbnails; },
    filesListFolder: async () => ({ result: { entries, has_more: false } }),
    filesGetThumbnailV2: async () => { thumbnails++; return { result: { fileBinary: jpeg } }; },
    filesDownload: async () => ({ result: { fileBinary: jpeg } }),
  };
}
const run = (root, client) => syncPhotos({ root, client, sleep: async () => {}, log: () => {} });

test('same-name files stay distinct, no-GPS photos import, and reruns do no downloads', async t => {
  const root = await fixture(t); const client = mockClient([entry('id:one'), entry('id:two')]);
  assert.equal((await run(root, client)).added, 2);
  const catalog = await readCatalog(manifest(root));
  assert.equal(catalog.features.length, 2);
  assert.equal(new Set(catalog.features.map(f => f.properties.src)).size, 2);
  assert.equal(catalog.features[0].geometry, null);
  assert.equal(catalog.features[0].properties.width, 12);
  assert.equal(catalog.features[0].properties.height, 18);
  await validateImages(catalog, root);
  const bytes = await fs.readFile(manifest(root));
  assert.equal((await run(root, client)).unchanged, 2);
  assert.equal(client.thumbnails, 2);
  assert.deepEqual(await fs.readFile(manifest(root)), bytes);
});

test('GPS zero is valid; capture date wins and upload date is the fallback', () => {
  const metadata = photoMetadata(entry('one'), { latitude: 0, longitude: 0, DateTimeOriginal: new Date('2025-05-04T12:00:00Z') });
  assert.deepEqual(metadata.geometry.coordinates, [0, 0]);
  assert.equal(metadata.date, '2025-05-04T12:00:00.000Z');
  assert.equal(photoMetadata(entry('one')).date, '2026-01-15T12:00:00.000Z');
  assert.equal(photoMetadata(entry('one'), { latitude: 100, longitude: 0 }).geometry, null);
});

test('all list pages are imported, with folders and unsupported files ignored', async t => {
  const root = await fixture(t); const client = mockClient([]);
  client.filesListFolder = async () => ({ result: { entries: [entry('one'), { '.tag': 'folder', name: 'folder' }], cursor: 'next', has_more: true } });
  client.filesListFolderContinue = async ({ cursor }) => { assert.equal(cursor, 'next'); return { result: { entries: [entry('two'), entry('skip', { name: 'note.txt' })], has_more: false } }; };
  assert.equal((await run(root, client)).total, 2);
});

test('a revision replaces its photo using a fresh URL; Dropbox deletions preserve the diary', async t => {
  const root = await fixture(t); const client = mockClient([entry('one')]);
  await run(root, client); const oldSrc = (await readCatalog(manifest(root))).features[0].properties.src;
  assert.equal((await run(root, mockClient([entry('one', { rev: 'r2' })]))).updated, 1);
  const catalog = await readCatalog(manifest(root));
  assert.equal(catalog.features.length, 1); assert.notEqual(catalog.features[0].properties.src, oldSrc);
  await assert.rejects(fs.access(path.join(root, 'public', oldSrc)));
  assert.equal((await run(root, mockClient([]))).total, 1);
});

test('legacy imports are linked only when their thumbnail bytes match', async t => {
  const root = await fixture(t);
  await fs.mkdir(path.join(root, 'public/images/travel'), { recursive: true });
  await fs.mkdir(path.dirname(manifest(root)), { recursive: true });
  await fs.writeFile(path.join(root, 'public/images/travel/old.jpg'), jpeg);
  await fs.writeFile(manifest(root), JSON.stringify({ type: 'FeatureCollection', features: [{ type: 'Feature', geometry: null, properties: { src: '/images/travel/old.jpg', name: 'IMG_0001.HEIC', date: '2026-01-15T12:00:00Z' } }] }));
  assert.equal((await run(root, mockClient([entry('one')]))).linked, 1);
  assert.equal((await readCatalog(manifest(root))).features.length, 1);
});

test('a corrupt catalog remains untouched and no Dropbox requests run', async t => {
  const root = await fixture(t); await fs.mkdir(path.dirname(manifest(root)), { recursive: true });
  await fs.writeFile(manifest(root), '{broken');
  await assert.rejects(run(root, { filesListFolder: () => assert.fail('must not request Dropbox') }));
  assert.equal(await fs.readFile(manifest(root), 'utf8'), '{broken');
});

test('partial failures are reported and successful imports are safe to retry', async t => {
  const root = await fixture(t); const client = mockClient([entry('one'), entry('two')]);
  client.filesGetThumbnailV2 = async ({ resource }) => { if (resource.path === 'two') throw { status: 403 }; return { result: { fileBinary: jpeg } }; };
  await assert.rejects(run(root, client), /1 photo\(s\) failed/);
  assert.equal((await readCatalog(manifest(root))).features.length, 1);
  const result = await run(root, mockClient([entry('one'), entry('two')]));
  assert.equal(result.added, 1); assert.equal(result.unchanged, 1);
});

test('transient errors retry; invalid credentials do not', async () => {
  let calls = 0;
  assert.equal(await retry(async () => { if (++calls < 3) throw { status: 429 }; return 'ok'; }, async () => {}), 'ok');
  assert.equal(calls, 3); calls = 0;
  await assert.rejects(retry(async () => { calls++; throw { status: 401 }; }, async () => {}));
  assert.equal(calls, 1); assert.throws(() => createClient({}), /Missing Dropbox credentials/);
});

test('native fetch adapter works with SDK binary downloads', async () => {
  const response = await dropboxFetch('data:application/octet-stream;base64,' + jpeg.toString('base64'));
  assert.deepEqual(await response.buffer(), jpeg);
});

test('catalog rejects duplicate paths and malformed GPS', () => {
  const photo = { type: 'Feature', geometry: null, properties: { name: 'photo', src: '/images/travel/photo.jpg', date: '2026-01-15' } };
  assert.throws(() => validateCatalog({ type: 'FeatureCollection', features: [photo, photo] }), /Duplicate/);
  assert.throws(() => validateCatalog({ type: 'FeatureCollection', features: [{ ...photo, geometry: { type: 'Point', coordinates: [181, 0] } }] }), /Invalid coordinates/);
});

test('webhook challenge is plain text; unsigned notifications cannot dispatch', async () => {
  let calls = 0;
  const handlers = webhookHandlers({ env: { DROPBOX_APP_SECRET: 'secret', GITHUB_SYNC_TOKEN: 'test-token' }, fetchImpl: async () => { calls++; return new Response(null, { status: 204 }); } });
  const challenge = await handlers.GET(new Request('https://example.com/api/dropbox/webhook?challenge=test_123'));
  assert.equal(await challenge.text(), 'test_123'); assert.equal(challenge.headers.get('x-content-type-options'), 'nosniff');
  assert.equal((await handlers.POST(new Request('https://example.com', { method: 'POST', body: '{}' }))).status, 403);
  assert.equal(calls, 0);
});

test('signed upload queues one fixed dispatch; failures request Dropbox retry', async () => {
  const body = JSON.stringify({ list_folder: { accounts: ['dbid:one'] } });
  const headers = { 'x-dropbox-signature': createHmac('sha256', 'secret').update(body).digest('hex') };
  const request = () => new Request('https://example.com/api/dropbox/webhook', { method: 'POST', headers, body });
  const env = { DROPBOX_APP_SECRET: 'secret', GITHUB_SYNC_TOKEN: 'test-token' };
  const handlers = webhookHandlers({ env, fetchImpl: async (url, options) => {
    assert.equal(url, 'https://api.github.com/repos/austyn-nguyen/portfolio/dispatches');
    assert.deepEqual(JSON.parse(options.body), { event_type: 'dropbox-photos-changed' });
    return new Response(null, { status: 204 });
  } });
  assert.equal((await handlers.POST(request())).status, 200);
  assert.equal((await webhookHandlers({ env, fetchImpl: async () => new Response(null, { status: 500 }) }).POST(request())).status, 503);
  const tampered = new Request('https://example.com', { method: 'POST', headers, body: body + ' ' });
  assert.equal((await handlers.POST(tampered)).status, 403);
});

test('the SDK refreshes authorization before listing Dropbox photos', async t => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push(String(url));
    if (String(url).includes('oauth2/token')) {
      assert.equal(new URL(url).search, '');
      assert.equal(new URLSearchParams(options.body).get('refresh_token'), 'test-refresh');
      assert.equal(new Headers(options.headers).get('content-type'), 'application/x-www-form-urlencoded');
      return Response.json({ access_token: 'new-test-access', expires_in: 14400, token_type: 'bearer' });
    }
    assert.equal(options.headers.Authorization, 'Bearer new-test-access');
    return Response.json({ entries: [], cursor: 'test-cursor', has_more: false });
  });
  const client = createClient({ DROPBOX_APP_KEY: 'test-key', DROPBOX_APP_SECRET: 'test-secret', DROPBOX_REFRESH_TOKEN: 'test-refresh' });
  assert.equal((await client.filesListFolder({ path: '' })).result.entries.length, 0);
  assert.equal(calls.length, 2);
  assert.match(calls[0], /oauth2\/token/);
});

test('an explicit app-root folder maps to Dropbox root; relative paths are rejected', async t => {
  const root = await fixture(t); const client = mockClient([]);
  client.filesListFolder = async ({ path: folder }) => { assert.equal(folder, ''); return { result: { entries: [], has_more: false } }; };
  assert.equal((await syncPhotos({ root, client, folder: '/', log: () => {} })).total, 0);
  await assert.rejects(syncPhotos({ root, client, folder: 'relative' }), /must begin with/);
});
