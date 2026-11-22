/* ==============================================================================
   Sync Curated Unique Photos to Relational Store & Memory Database
   ============================================================================== */

const fs = require('fs');
const path = require('path');

const DB_JSON_PATH = path.join(__dirname, '..', 'data', 'db.json');
const RELATIONAL_PATH = path.join(__dirname, '..', 'data', 'relational_store.json');

const db = JSON.parse(fs.readFileSync(DB_JSON_PATH, 'utf8'));
const rel = JSON.parse(fs.readFileSync(RELATIONAL_PATH, 'utf8'));

// Build lookup map from db.json
const photoMap = new Map();
db.businesses.forEach(b => {
  if (b.id) photoMap.set(b.id, b);
  if (b.name) photoMap.set(b.name.toLowerCase().trim(), b);
});

// Update relational_store.json
let updatedCount = 0;
if (Array.isArray(rel.businesses)) {
  rel.businesses.forEach(record => {
    let source = photoMap.get(record.id) || photoMap.get((record.name || '').toLowerCase().trim());
    if (source) {
      record.image = source.image;
      record.image_url = source.image;
      record.photos = Array.isArray(source.photos) ? [...source.photos] : [source.image];
      updatedCount++;
    }
  });
}

fs.writeFileSync(RELATIONAL_PATH, JSON.stringify(rel, null, 2), 'utf8');
console.log(`[Sync] Successfully updated ${updatedCount} businesses in relational_store.json with unique photos.`);
