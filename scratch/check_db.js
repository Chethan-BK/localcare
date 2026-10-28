const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
console.log('Top keys in db.json:', Object.keys(db));
if (db.categories) console.log('Categories count:', db.categories.length);
if (db.businesses) console.log('Businesses count:', db.businesses.length);
