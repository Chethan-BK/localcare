const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('js/data.js', 'utf8');
const imageMatches = [...content.matchAll(/"image":\s*"([^"]+)"/g)].map(m => m[1]);
const uniqueImages = [...new Set(imageMatches)];

console.log('Testing', uniqueImages.length, 'unique image URLs...');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

(async () => {
  for (const url of uniqueImages) {
    const res = await checkUrl(url);
    if (res.status !== 200 && res.status !== 302 && res.status !== 301) {
      console.log('BROKEN URL:', res.status || res.error, url);
    }
  }
  console.log('Check complete.');
})();
