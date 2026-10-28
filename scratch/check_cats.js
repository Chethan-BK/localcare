const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
console.log('Categories:', db.categories.map(c => ({ id: c.id, title: c.title })));
