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
    // 2. List all files in the App Folder
    const response = await dbx.filesListFolder({ path: '' });
    const features = [];

    for (const entry of response.result.entries) {
      // Only process images
      if (entry['.tag'] === 'file' && entry.name.match(/\.(jpeg|jpg|png|heic)$/i)) {
        console.log(`Processing: ${entry.name}...`);

        try {
          // 3. Create a temporary link to "peek" at the file
          const linkData = await dbx.filesGetTemporaryLink({ path: entry.path_lower });
          const tempUrl = linkData.result.link;

          // 4. Create a permanent shared link for the website to use
          // We try to create one, or get the existing one if it exists
          let publicUrl;
          try {
             const share = await dbx.sharingCreateSharedLinkWithSettings({ path: entry.path_lower });
             publicUrl = share.result.url;
          } catch (err) {
             // If link exists, fetch it
             const shares = await dbx.sharingListSharedLinks({ path: entry.path_lower });
             publicUrl = shares.result.links[0].url;
          }

          // 5. Convert URL to Direct Link using raw=1 (Fix for 403 errors)
          // This keeps the domain as www.dropbox.com but forces a raw file download
          const dlUrl = new URL(publicUrl);
          dlUrl.searchParams.set('raw', '1'); // Force raw download
          dlUrl.searchParams.delete('dl');    // Remove 'dl' param just in case
          const directUrl = dlUrl.toString();

          // 6. Download ONLY the first 128kb to get EXIF/GPS (Saves bandwidth)
          const bufferReq = await fetch(tempUrl, {
            headers: { Range: 'bytes=0-131072' } // First 128KB
          });
          const buffer = await bufferReq.arrayBuffer();

          // 7. Extract GPS
          const exif = await exifr.parse(buffer, { gps: true });

          if (exif && exif.latitude && exif.longitude) {
            features.push({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [exif.longitude, exif.latitude],
              },
              properties: {
                src: directUrl, // The remote Dropbox URL (raw=1)
                name: entry.name,
                date: exif.DateTimeOriginal || new Date().toISOString(),
              },
            });
            console.log(`   ✅ Located at ${exif.latitude}, ${exif.longitude}`);
          } else {
            console.log(`   ⚠️  No GPS data found.`);
          }

        } catch (e) {
          console.error(`   ❌ Failed to process ${entry.name}:`, e.message);
        }
      }
    }

    // 8. Save to JSON
    const geoJson = {
      type: 'FeatureCollection',
      features: features,
    };

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(geoJson, null, 2));
    console.log(`\n🎉 Success! Processed ${features.length} locations from Dropbox.`);

  } catch (error) {
    console.error("Critical Error:", error);
  }
}

syncDropboxMap();