const fs = require('fs');
const content = fs.readFileSync('css/style.css', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('category-') || l.includes('cat-')) {
    console.log(`Line ${i+1}: ${l.slice(0, 80)}`);
  }
});
