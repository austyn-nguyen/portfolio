import path from 'path';
import { fileURLToPath } from 'url';
// 1. Configure dotenv to look in the root folder
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import 'dotenv/config'; 
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';
import exifr from 'exifr';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';

// 2. Configuration
const ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;
const DATA_FILE = './src/data/locations.json';
const IMAGE_DIR = './public/images/travel'; // Local folder for images

// Ensure the image directory exists
if (!existsSync(IMAGE_DIR)) {
  mkdirSync(IMAGE_DIR, { recursive: true });
}

const dbx = new Dropbox({ accessToken: ACCESS_TOKEN, fetch });

async function syncDropboxMap() {
  if (!ACCESS_TOKEN) {
    console.error("❌ Missing DROPBOX_ACCESS_TOKEN");
    return;
  }

  console.log("☁️  Connecting to Dropbox...");

  try {
    // --- PART 1: LOAD EXISTING DATA ---
    let features = [];
    let existingNames = new Set();

    try {
      const fileContent = await fs.readFile(DATA_FILE, 'utf8');
      const jsonContent = JSON.parse(fileContent);
      features = jsonContent.features || [];
      features.forEach(f => existingNames.add(f.properties.name));
      console.log(`📂 Loaded ${features.length} existing locations.`);
    } catch (err) {
      console.log("🆕 No existing data found. Starting fresh.");
    }

    // --- PART 2: FETCH FILE LIST ---
    let response = await dbx.filesListFolder({ 
      path: '', 
      recursive: true, 
      limit: 2000 
    });
    
    let allEntries = response.result.entries;

    while (response.result.has_more) {
      console.log(`...fetching next page (currently ${allEntries.length})...`);
      response = await dbx.filesListFolderContinue({ cursor: response.result.cursor });
      allEntries = allEntries.concat(response.result.entries);
    }

    // --- PART 3: PROCESS ALL IMAGES ---
    let newCount = 0;
    let skippedCount = 0;

    for (const entry of allEntries) {
      // Filter for ALL supported image types
      if (entry['.tag'] === 'file' && entry.name.match(/\.(jpeg|jpg|png|heic|webp)$/i)) {
        
        if (existingNames.has(entry.name)) {
           skippedCount++;
           continue; 
        }

        console.log(`Processing New: ${entry.name}...`);

        try {
          // 1. Get Link for GPS Parsing (needs original raw file)
          const linkData = await dbx.filesGetTemporaryLink({ path: entry.path_lower });
          const bufferReq = await fetch(linkData.result.link, {
            headers: { Range: 'bytes=0-131072' } // Download first 128KB
          });
          const buffer = await bufferReq.arrayBuffer();

          // 2. Extract GPS
          const exif = await exifr.parse(buffer, { gps: true });

          if (exif && exif.latitude && exif.longitude) {
            
            // 3. DOWNLOAD & CONVERT TO JPEG
            // This forces Dropbox to convert PNG/HEIC/WEBP -> JPEG
            const thumbData = await dbx.filesGetThumbnail({
                path: entry.path_lower,
                format: 'jpeg',       // FORCE JPEG format
                size: 'w1024h768',    // Standardize size
                mode: 'bestfit'       // Maintain aspect ratio
            });

            // 4. Save file with new .jpg extension
            // Removes old extension, adds .jpg
            const safeName = entry.name.replace(/\.[^/.]+$/, "") + ".jpg";
            const localPath = path.join(IMAGE_DIR, safeName);
            
            // @ts-ignore
            await fs.writeFile(localPath, thumbData.result.fileBinary);

            features.push({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [exif.longitude, exif.latitude],
              },
              properties: {
                // SRC points to the local converted file
                src: `/images/travel/${safeName}`, 
                name: entry.name, // Keep original name for duplicate checking
                date: exif.DateTimeOriginal || new Date().toISOString(),
              },
            });
            console.log(`   ✅ Converted & Saved: ${safeName}`);
            newCount++;
          } else {
            console.log(`   ⚠️  No GPS data found.`);
          }

        } catch (e) {
          console.error(`   ❌ Error on ${entry.name}:`, e.message);
        }
      }
    }

    // --- PART 4: SAVE JSON ---
    const geoJson = {
      type: 'FeatureCollection',
      features: features,
    };

    await fs.writeFile(DATA_FILE, JSON.stringify(geoJson, null, 2));
    console.log(`\n🎉 Sync Complete.`);
    console.log(`   - Skipped: ${skippedCount}`);
    console.log(`   - Added:   ${newCount}`);
    console.log(`   - Total:   ${features.length}`);

  } catch (error) {
    console.error("Critical Error:", error);
  }
}

syncDropboxMap();