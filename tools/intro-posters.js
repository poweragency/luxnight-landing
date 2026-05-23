// Extract the first frame of each intro video and produce poster images
// in JPG (fallback), WebP and AVIF — same multi-format pattern as the
// gallery photos.

const ffmpegPath = require('ffmpeg-static');
const sharp      = require('sharp');
const { execFileSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

const DIR = path.resolve(__dirname, '../assets/intro');

const TARGETS = [
  { mp4: 'door-mobile.mp4',  base: 'door-mobile-poster' },
  { mp4: 'door-desktop.mp4', base: 'door-desktop-poster' },
];

(async () => {
  for (const t of TARGETS) {
    const src = path.join(DIR, t.mp4);
    const tmpJpg = path.join(DIR, t.base + '.jpg');

    // grab frame at t=0
    execFileSync(ffmpegPath, [
      '-y',
      '-ss', '0',
      '-i', src,
      '-frames:v', '1',
      '-q:v', '3',
      tmpJpg,
    ]);
    console.log('  →', path.basename(tmpJpg));

    // re-encode to WebP and AVIF
    await sharp(tmpJpg).webp({ quality: 82, effort: 5 }).toFile(path.join(DIR, t.base + '.webp'));
    await sharp(tmpJpg).avif({ quality: 55, effort: 6 }).toFile(path.join(DIR, t.base + '.avif'));
    console.log('  →', t.base + '.webp,', t.base + '.avif');
  }

  // size report
  console.log('\nFinal assets/intro/:');
  fs.readdirSync(DIR).forEach(f => {
    const s = fs.statSync(path.join(DIR, f)).size;
    console.log(`  ${f.padEnd(34)} ${(s/1024).toFixed(0).padStart(5)} KB`);
  });
})().catch(e => { console.error(e); process.exit(1); });
