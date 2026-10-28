const fs = require('fs');
const content = fs.readFileSync('js/app.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('recentlyViewed') || l.includes('RecentlyViewed')) {
    console.log(`Line ${i+1}: ${l.slice(0, 80)}`);
  }
});
