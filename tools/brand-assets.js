// Generates favicon (SVG + PNG) and OG image (PNG 1200x630).
const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const outDir = path.resolve(__dirname, '../assets/brand');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  /* 1) Favicon SVG (master) */
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#0A0807"/>
  <rect x="1" y="1" width="62" height="62" rx="9" fill="none" stroke="#C9A86B" stroke-opacity=".35" stroke-width="1"/>
  <text x="32" y="40" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="30" font-weight="400" font-style="italic"
        fill="#C9A86B">LN</text>
  <circle cx="32" cy="48" r="1.2" fill="#C9A86B"/>
</svg>`;
  fs.writeFileSync(path.join(outDir, 'favicon.svg'), faviconSvg);

  /* 2) Favicon PNG variants */
  for (const size of [32, 64, 192]) {
    await sharp(Buffer.from(faviconSvg))
      .resize(size, size)
      .png()
      .toFile(path.join(outDir, `favicon-${size}.png`));
  }

  /* 3) Apple touch icon 180×180 */
  await sharp(Buffer.from(faviconSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(outDir, 'apple-touch-icon.png'));

  /* 4) OG image 1200×630 */
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="g" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#3A1822" stop-opacity=".55"/>
        <stop offset="60%" stop-color="#1A0E12" stop-opacity=".25"/>
        <stop offset="100%" stop-color="#0A0807" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="#0A0807"/>
    <rect width="1200" height="630" fill="url(#g)"/>

    <!-- Outer frame -->
    <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#C9A86B" stroke-width="1" stroke-opacity=".25"/>

    <!-- L-shaped corners -->
    <g fill="none" stroke="#C9A86B" stroke-width="2" stroke-linecap="square">
      <path d="M40 90 L40 40 L90 40"/>
      <path d="M1110 40 L1160 40 L1160 90"/>
      <path d="M40 540 L40 590 L90 590"/>
      <path d="M1160 540 L1160 590 L1110 590"/>
    </g>

    <!-- Top overline -->
    <text x="600" y="160" text-anchor="middle"
          font-family="Georgia, 'Times New Roman', serif"
          font-style="italic" font-size="24"
          fill="#C9A86B" letter-spacing="8">PRIVATE CLUB · MMXVIII</text>

    <!-- Ornament -->
    <g transform="translate(600 210)" fill="none" stroke="#C9A86B" stroke-width="1.4" stroke-linecap="round" stroke-opacity=".85">
      <line x1="-110" y1="0" x2="-22" y2="0" stroke-opacity=".5"/>
      <path d="M-14 0 L0 -11 L14 0 L0 11 Z"/>
      <circle cx="0" cy="0" r="2.4" fill="#C9A86B" stroke="none"/>
      <line x1="22" y1="0" x2="110" y2="0" stroke-opacity=".5"/>
    </g>

    <!-- LUX NIGHT wordmark -->
    <text x="600" y="380" text-anchor="middle"
          font-family="Georgia, 'Times New Roman', serif"
          font-size="140" font-weight="400"
          fill="#EDE6D6" letter-spacing="14">LUX NIGHT</text>

    <!-- Italic tagline -->
    <text x="600" y="450" text-anchor="middle"
          font-family="Georgia, 'Times New Roman', serif"
          font-style="italic" font-size="32"
          fill="#9C8B73">Una porta che non si trova per caso.</text>

    <!-- Bottom address -->
    <text x="600" y="540" text-anchor="middle"
          font-family="Georgia, 'Times New Roman', serif"
          font-size="20"
          fill="#C9A86B" letter-spacing="6">VIA SAN GOTTARDO 111 · BALERNA · CH</text>
  </svg>`;

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png({ quality: 92 })
    .toFile(path.join(outDir, 'og.png'));

  // Also save the OG SVG master for future edits
  fs.writeFileSync(path.join(outDir, 'og.svg'), ogSvg);

  console.log('Brand assets generated in assets/brand/:');
  fs.readdirSync(outDir).forEach(f => {
    const size = fs.statSync(path.join(outDir, f)).size;
    console.log(`  ${f.padEnd(28)} ${(size/1024).toFixed(1)}KB`);
  });
})();
