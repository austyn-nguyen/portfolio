import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export function validateCatalog(catalog) {
  if (catalog?.type !== 'FeatureCollection' || !Array.isArray(catalog.features)) throw new Error('Invalid photo catalog: expected a FeatureCollection.');
  const sources = new Set();
  const ids = new Set();
  for (const feature of catalog.features) {
    const props = feature?.properties;
    if (feature.type !== 'Feature' || !props || !/^\/images\/travel\/[a-z0-9-]+\.jpg$/.test(props.src)) throw new Error('Invalid photo path in catalog.');
    if (!props.name || !Number.isFinite(Date.parse(props.date))) throw new Error(`Missing name or valid date: ${props.src}`);
    if (sources.has(props.src)) throw new Error(`Duplicate photo: ${props.src}`);
    if (props.dropboxId && ids.has(props.dropboxId)) throw new Error(`Duplicate Dropbox ID: ${props.src}`);
    sources.add(props.src); if (props.dropboxId) ids.add(props.dropboxId);
    if (feature.geometry !== null) {
      const coords = feature.geometry?.coordinates;
      if (feature.geometry?.type !== 'Point' || !Array.isArray(coords) || coords.length !== 2 || !coords.every(Number.isFinite) || Math.abs(coords[0]) > 180 || Math.abs(coords[1]) > 90) throw new Error(`Invalid coordinates: ${props.src}`);
    }
    if ((props.width !== undefined || props.height !== undefined) && (!Number.isInteger(props.width) || props.width <= 0 || !Number.isInteger(props.height) || props.height <= 0)) throw new Error(`Invalid dimensions: ${props.src}`);
  }
  return catalog;
}

export async function readCatalog(file) {
  try { return validateCatalog(JSON.parse(await fs.readFile(file, 'utf8'))); }
  catch (error) {
    if (error.code === 'ENOENT') return { type: 'FeatureCollection', features: [] };
    throw error; // Never replace an unreadable or malformed catalog with an empty one.
  }
}

export async function atomicWrite(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  try { await fs.writeFile(temporary, data); await fs.rename(temporary, file); }
  finally { await fs.rm(temporary, { force: true }); }
}

export async function validateImages(catalog, root) {
  validateCatalog(catalog);
  for (const { properties: photo } of catalog.features) {
    const metadata = await sharp(path.join(root, 'public', photo.src)).metadata();
    if (metadata.format !== 'jpeg') throw new Error(`Not a JPEG: ${photo.src}`);
    if (photo.width !== metadata.width || photo.height !== metadata.height) throw new Error(`Dimensions do not match: ${photo.src}`);
  }
}
