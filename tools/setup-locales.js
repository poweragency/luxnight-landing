// Copies the IT pages into /en/ and /de/, rewrites relative paths to climb
// one directory up, swaps lang/canonical/og:locale, and flips the
// aria-current="page" marker in the language switcher.
//
// Translation of textual content is done in a separate pass, manually.

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILES = ['index.html', 'privacy.html', 'impressum.html'];
const LOCALES = [
  { code: 'en', html: 'en', og: 'en_US', dir: 'en' },
  { code: 'de', html: 'de', og: 'de_CH', dir: 'de' },
];

function adjustPaths(html) {
  // assets/...  src/href/content/srcset → ../assets/...
  html = html.replace(/(src|href|content|srcset)="assets\//g, '$1="../assets/');
  html = html.replace(/(src|href)="css\//g, '$1="../css/');
  html = html.replace(/(src|href)="js\//g, '$1="../js/');
  return html;
}

function adjustHead(html, locale, pageBase) {
  // lang attribute
  html = html.replace(/<html\s+lang="it"/, `<html lang="${locale.html}"`);

  // og:locale
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="[^"]+"\s*>/,
    `<meta property="og:locale" content="${locale.og}">`
  );

  // canonical: https://www.luxnight.ch/   →   https://www.luxnight.ch/<locale>/  (for index)
  //            https://www.luxnight.ch/privacy.html → https://www.luxnight.ch/<locale>/privacy.html
  html = html.replace(
    /<link\s+rel="canonical"\s+href="https:\/\/www\.luxnight\.ch\/([^"]*)"\s*>/,
    (_, rest) => `<link rel="canonical" href="https://www.luxnight.ch/${locale.dir}/${rest}">`
  );

  // Update the aria-current marker in language switcher
  html = html.replace(
    /<a href="\/"\s+aria-current="page">IT<\/a>/,
    '<a href="/">IT</a>'
  );
  html = html.replace(
    new RegExp(`<a href="/${locale.dir}/">${locale.code.toUpperCase()}</a>`),
    `<a href="/${locale.dir}/" aria-current="page">${locale.code.toUpperCase()}</a>`
  );

  // Home brand link `<a href="/" class="brand"` is fine — points to IT home.
  // We additionally need a "go to IT" link in the switcher, already there.
  return html;
}

for (const locale of LOCALES) {
  const outDir = path.join(ROOT, locale.dir);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const file of FILES) {
    const src = path.join(ROOT, file);
    if (!fs.existsSync(src)) continue;
    let html = fs.readFileSync(src, 'utf8');
    html = adjustPaths(html);
    html = adjustHead(html, locale, file);
    fs.writeFileSync(path.join(outDir, file), html);
    console.log(`  ${locale.dir}/${file}`);
  }
}
console.log('Done.');
