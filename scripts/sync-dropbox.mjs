import path from 'path';
import { fileURLToPath } from 'url';

// 1. Configure dotenv to look in the root folder (one level up)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import 'dotenv/config'; // Try standard load first
import dotenv from 'dotenv';

// Explicitly load .env.local from the parent directory
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';
import exifr from 'exifr';
import fs from 'fs/promises';

// 1. configuration
// Add this to your .env.local: DROPBOX_ACCESS_TOKEN=your_token_here
const ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN; 
const OUTPUT_FILE = './src/data/locations.json';

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
      // Attempt to read the current locations.json
      const fileContent = await fs.readFile(OUTPUT_FILE, 'utf8');
      const jsonContent = JSON.parse(fileContent);
      
      // Store existing data so we don't lose it
      features = jsonContent.features || [];
      
      // Create a "Set" of names for instant lookup
      features.forEach(f => existingNames.add(f.properties.name));
      
      console.log(`📂 Loaded ${features.length} existing locations.`);
    } catch (err) {
      console.log("🆕 No existing data found (or error reading). Starting fresh.");
    }

    // --- PART 2: FETCH ALL FILE LISTINGS ---
    // We fetch the list of ALL files first (pagination)
    let response = await dbx.filesListFolder({ 
      path: '', 
      recursive: true,  // Safe to leave on
      limit: 2000       // Request max batch size
    });
    
    let allEntries = response.result.entries;

    // Loop until Dropbox says there are no more pages
    while (response.result.has_more) {
      console.log(`...fetching next page of files (currently have ${allEntries.length})...`);
      response = await dbx.filesListFolderContinue({ cursor: response.result.cursor });
      allEntries = allEntries.concat(response.result.entries);
    }
    
    console.log(`📦 Dropbox reports ${allEntries.length} total items.`);

    // --- PART 3: PROCESS ONLY NEW IMAGES ---
    let newCount = 0;
    let skippedCount = 0;

    for (const entry of allEntries) {
      
      // Check if it's a file AND an image
      if (entry['.tag'] === 'file' && entry.name.match(/\.(jpeg|jpg|png|heic)$/i)) {
        
        // ** THE SKIP LOGIC **
        if (existingNames.has(entry.name)) {
           skippedCount++;
           continue; // Jump to the next loop iteration immediately
        }

        console.log(`Processing New: ${entry.name}...`);

        try {
          // 1. Get Temporary Link (for downloading content)
          const linkData = await dbx.filesGetTemporaryLink({ path: entry.path_lower });
          const tempUrl = linkData.result.link;

          // 2. Get Public Link (for the website SRC)
          let publicUrl;
          try {
             const share = await dbx.sharingCreateSharedLinkWithSettings({ path: entry.path_lower });
             publicUrl = share.result.url;
          } catch (err) {
             // If link already exists, we must fetch the list of links
             const shares = await dbx.sharingListSharedLinks({ path: entry.path_lower });
             if (shares.result.links.length > 0) {
                 publicUrl = shares.result.links[0].url;
             } else {
                 throw new Error("Could not retrieve shared link");
             }
          }

          // 3. Clean up the URL for direct display (raw=1)
          const dlUrl = new URL(publicUrl);
          dlUrl.searchParams.set('raw', '1'); 
          dlUrl.searchParams.delete('dl');    
          const directUrl = dlUrl.toString();

          // 4. Download first 128KB for GPS extraction
          const bufferReq = await fetch(tempUrl, {
            headers: { Range: 'bytes=0-131072' } 
          });
          const buffer = await bufferReq.arrayBuffer();

          // 5. Parse GPS
          const exif = await exifr.parse(buffer, { gps: true });

          if (exif && exif.latitude && exif.longitude) {
            features.push({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [exif.longitude, exif.latitude],
              },
              properties: {
                src: directUrl, 
                name: entry.name,
                date: exif.DateTimeOriginal || new Date().toISOString(),
              },
            });
            console.log(`   ✅ Added! (${exif.latitude}, ${exif.longitude})`);
            newCount++;
          } else {
            console.log(`   ⚠️  No GPS data found.`);
          }

        } catch (e) {
          console.error(`   ❌ Error on ${entry.name}:`, e.message);
        }
      }
    }

    // --- PART 4: SAVE UPDATED LIST ---
    const geoJson = {
      type: 'FeatureCollection',
      features: features,
    };

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(geoJson, null, 2));
    console.log(`\n🎉 Sync Complete.`);
    console.log(`   - Skipped: ${skippedCount} existing`);
    console.log(`   - Added:   ${newCount} new`);
    console.log(`   - Total:   ${features.length} locations`);

  } catch (error) {
    console.error("Critical Error:", error);
  }
}

syncDropboxMap();