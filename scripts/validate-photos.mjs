import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { readCatalog, validateImages } from './photo-library.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
try {
  const file = path.join(root, 'src/data/locations.json');
  await fs.access(file);
  const catalog = await readCatalog(file);
  await validateImages(catalog, root);
  console.log(`Validated ${catalog.features.length} photos: unique paths/IDs, dates, GPS, JPEG files, and dimensions.`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
