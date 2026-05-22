// Convert all JPGs in ../assets/foto/ to WebP + AVIF (same dir).
// Prints size comparison.
const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const SRC_DIR = path.resolve(__dirname, '../assets/foto');

(async () => {
  const files = fs.readdirSync(SRC_DIR).filter(f => /\.jpe?g$/i.test(f));
  let totOrig = 0, totWebp = 0, totAvif = 0;

  for (const f of files) {
    const src  = path.join(SRC_DIR, f);
    const base = f.replace(/\.jpe?g$/i, '');
    const webp = path.join(SRC_DIR, base + '.webp');
    const avif = path.join(SRC_DIR, base + '.avif');

    await sharp(src).webp({ quality: 82, effort: 5 }).toFile(webp);
    await sharp(src).avif({ quality: 55, effort: 6 }).toFile(avif);

    const origSize = fs.statSync(src).size;
    const webpSize = fs.statSync(webp).size;
    const avifSize = fs.statSync(avif).size;
    totOrig += origSize; totWebp += webpSize; totAvif += avifSize;

    const pct = (a, b) => Math.round((a / b) * 100);
    console.log(
      `${f.padEnd(28)} JPG ${(origSize/1024).toFixed(0).padStart(4)}KB  →  ` +
      `WebP ${(webpSize/1024).toFixed(0).padStart(4)}KB (${pct(webpSize, origSize)}%)  ` +
      `AVIF ${(avifSize/1024).toFixed(0).padStart(4)}KB (${pct(avifSize, origSize)}%)`
    );
  }

  const kb = (b) => (b / 1024).toFixed(0);
  console.log('—'.repeat(80));
  console.log(`Total: JPG ${kb(totOrig)}KB → WebP ${kb(totWebp)}KB (${Math.round(100*totWebp/totOrig)}%) · AVIF ${kb(totAvif)}KB (${Math.round(100*totAvif/totOrig)}%)`);
})();
