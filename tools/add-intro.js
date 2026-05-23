// Inject the intro overlay (door image + lazy <video> + skip button)
// at the very top of the <body> of each home page. The asset paths
// climb the right number of directories based on the locale dir.

const fs   = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  { p: 'index.html',    base: 'assets/intro/' },
  { p: 'en/index.html', base: '../assets/intro/' },
  { p: 'de/index.html', base: '../assets/intro/' },
];

const HINT = {
  'index.html':    'Tocca per entrare',
  'en/index.html': 'Tap to enter',
  'de/index.html': 'Zum Eintreten tippen',
};
const SKIP = {
  'index.html':    'Salta',
  'en/index.html': 'Skip',
  'de/index.html': 'Überspringen',
};
const ALT = {
  'index.html':    'Ingresso di Lux Night',
  'en/index.html': 'Lux Night entrance',
  'de/index.html': 'Eingang Lux Night',
};

function buildIntro(base, hint, skip, alt) {
  return (
`<!-- Intro -->
<div class="intro" id="intro" data-stage="door" aria-label="${hint}">
  <button class="intro__door" type="button" aria-label="${alt}">
    <picture class="intro__poster">
      <source type="image/avif" media="(orientation: portrait)" srcset="${base}door-mobile-poster.avif">
      <source type="image/webp" media="(orientation: portrait)" srcset="${base}door-mobile-poster.webp">
      <source type="image/avif" srcset="${base}door-desktop-poster.avif">
      <source type="image/webp" srcset="${base}door-desktop-poster.webp">
      <img src="${base}door-desktop-poster.jpg" alt="${alt}">
    </picture>
    <span class="intro__hint">${hint}</span>
  </button>

  <video class="intro__video" id="intro-video" playsinline muted preload="metadata" hidden></video>

  <button class="intro__skip" type="button" aria-label="${skip}">${skip}</button>
</div>
`
  );
}

for (const t of TARGETS) {
  const fp = path.join(ROOT, t.p);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');

  // Idempotent: skip if already injected
  if (html.includes('id="intro"')) {
    console.log(`  ${t.p} — already has intro, skipped`);
    continue;
  }

  const block = buildIntro(t.base, HINT[t.p], SKIP[t.p], ALT[t.p]);
  // Insert right after <body>
  html = html.replace(/<body>/, `<body>\n\n${block}`);
  fs.writeFileSync(fp, html);
  console.log(`  ${t.p} — intro injected`);
}
console.log('Done.');
