// Three jobs:
// 1) Translate the footer overlines in EN/DE (translate.js had missed them)
// 2) Rewrite the "Legale" link block to point at the real files and drop the
//    placeholder Cookie row.
// 3) Convert absolute root paths ("/", "/en/", "/de/") to relative ones so
//    the site works both on a GitHub Pages subpath AND on the future
//    custom domain.

const fs   = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const FOOTER_TRANSLATIONS = {
  en: {
    'overline">Il club':    'overline">The club',
    'overline">Contatti':   'overline">Contact',
    'overline">Presenze':   'overline">Find us',
    'overline">Legale':     'overline">Legal',
    '>Privacy · nLPD<':     '>Privacy · FADP<',
    '>Privacy</a>':         '>Privacy</a>',
  },
  de: {
    'overline">Il club':    'overline">Der Club',
    'overline">Contatti':   'overline">Kontakt',
    'overline">Presenze':   'overline">Finden Sie uns',
    'overline">Legale':     'overline">Rechtliches',
    '>Privacy · nLPD<':     '>Datenschutz · revDSG<',
    '>Privacy</a>':         '>Datenschutz</a>',
  },
};

const LEGAL_BLOCK_OLD = /<div>\s*<p class="overline">[^<]+<\/p>\s*<p>\s*<a href="#impressum">Impressum<\/a><br>\s*<a href="#privacy">Privacy · nLPD<\/a><br>\s*<a href="#cookie">Cookie<\/a>\s*<\/p>\s*<\/div>/;

function fixLegalBlock(html, label = 'Legale') {
  const newBlock =
    `<div>\n        <p class="overline">${label}</p>\n` +
    `        <p>\n          <a href="impressum.html">Impressum</a><br>\n` +
    `          <a href="privacy.html">Privacy · nLPD</a>\n        </p>\n      </div>`;
  return html.replace(LEGAL_BLOCK_OLD, newBlock);
}

function rewritePaths(html, locale /* 'it' | 'en' | 'de' */) {
  // Map of absolute → relative based on current location
  const inIt = locale === 'it';

  // brand link & home links
  if (inIt) {
    html = html.replace(/href="\/"/g, 'href="./"');
    html = html.replace(/href="\/en\/"/g, 'href="en/"');
    html = html.replace(/href="\/de\/"/g, 'href="de/"');
  } else {
    // we are inside /en/ or /de/
    const other = locale === 'en' ? 'de' : 'en';
    html = html.replace(/href="\/"/g, 'href="../"');
    html = html.replace(new RegExp(`href="/${locale}/"`, 'g'), 'href="./"');
    html = html.replace(new RegExp(`href="/${other}/"`, 'g'), `href="../${other}/"`);
  }
  return html;
}

const FILES = [
  { p: 'index.html',          loc: 'it' },
  { p: 'privacy.html',        loc: 'it' },
  { p: 'impressum.html',      loc: 'it' },
  { p: 'en/index.html',       loc: 'en' },
  { p: 'en/privacy.html',     loc: 'en' },
  { p: 'en/impressum.html',   loc: 'en' },
  { p: 'de/index.html',       loc: 'de' },
  { p: 'de/privacy.html',     loc: 'de' },
  { p: 'de/impressum.html',   loc: 'de' },
];

for (const f of FILES) {
  const fp = path.join(ROOT, f.p);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');

  // 1) Footer translations for EN/DE
  if (f.loc !== 'it') {
    for (const [src, tgt] of Object.entries(FOOTER_TRANSLATIONS[f.loc])) {
      html = html.split(src).join(tgt);
    }
  }

  // 2) Fix legal block (label per locale)
  const label = f.loc === 'en' ? 'Legal' : f.loc === 'de' ? 'Rechtliches' : 'Legale';
  html = fixLegalBlock(html, label);

  // 3) Rewrite absolute paths
  html = rewritePaths(html, f.loc);

  fs.writeFileSync(fp, html);
  console.log(`  ${f.p}`);
}
console.log('Done.');
