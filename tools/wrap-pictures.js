// Wrap every <img src="assets/foto/X.jpg" ...> with <picture>+AVIF+WebP sources.
const fs   = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../index.html');
const html = fs.readFileSync(file, 'utf8');

let count = 0;
const updated = html.replace(
  /<img\s+src="(assets\/foto\/[^"]+?)\.jpg"([^>]*)>/g,
  (m, base, attrs) => {
    count++;
    return (
      `<picture>` +
      `<source type="image/avif" srcset="${base}.avif">` +
      `<source type="image/webp" srcset="${base}.webp">` +
      `<img src="${base}.jpg"${attrs}>` +
      `</picture>`
    );
  }
);

fs.writeFileSync(file, updated);
console.log(`Wrapped ${count} <img> in <picture>.`);
