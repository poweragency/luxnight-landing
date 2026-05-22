// 1) Remove the WhatsApp button from the bottom action bar in every file.
// 2) Replace the inline IT/DE/EN dot-separated language switcher with a
//    button + dropdown menu (per-locale current label + menu of the others).
// 3) Replace the hamburger button markup (2 spans → 3 spans + clearer styling
//    handled in CSS).

const fs   = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const FILES = [
  { p: 'index.html',         loc: 'it' },
  { p: 'privacy.html',       loc: 'it' },
  { p: 'impressum.html',     loc: 'it' },
  { p: 'en/index.html',      loc: 'en' },
  { p: 'en/privacy.html',    loc: 'en' },
  { p: 'en/impressum.html',  loc: 'en' },
  { p: 'de/index.html',      loc: 'de' },
  { p: 'de/privacy.html',    loc: 'de' },
  { p: 'de/impressum.html',  loc: 'de' },
];

// ---------- 1) Drop the WhatsApp <a> from action-bar ----------
const WA_BLOCK = /\s*<a class="action-bar__btn" href="https:\/\/wa\.me\/[\s\S]*?<\/a>\s*\n/;

// ---------- 2) Language switcher dropdown ----------
const LANG_LABELS = {
  it: { full: 'Italiano', label: 'Lingua', open: 'Apri selettore lingua' },
  en: { full: 'English',  label: 'Language', open: 'Open language picker' },
  de: { full: 'Deutsch',  label: 'Sprache',  open: 'Sprachauswahl öffnen' },
};
const LOCALES = ['it', 'en', 'de'];
const HREF = { // path da una root <loc> verso destinazione <dest>
  // (we always render from a given source locale; index.html (loc=it) or en/, de/)
  it: { it: './',    en: 'en/',     de: 'de/' },
  en: { it: '../',   en: './',      de: '../de/' },
  de: { it: '../',   en: '../en/',  de: './' },
};

function buildLangDropdown(currentLoc) {
  const { label, open } = LANG_LABELS[currentLoc];
  const items = LOCALES.filter(l => l !== currentLoc).map(l =>
    `      <li><a href="${HREF[currentLoc][l]}" hreflang="${l}"><span class="lang-switch__code">${l.toUpperCase()}</span><span class="lang-switch__name">${LANG_LABELS[l].full}</span></a></li>`
  ).join('\n');

  return (
`<div class="lang-switch" data-lang-switch aria-label="${label}">
    <button class="lang-switch__current" type="button" aria-expanded="false" aria-haspopup="listbox" aria-controls="lang-menu" aria-label="${open}">
      <span>${currentLoc.toUpperCase()}</span>
      <svg class="lang-switch__chevron" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 1.5 6 6.5 11 1.5"/></svg>
    </button>
    <ul class="lang-switch__menu" id="lang-menu" role="listbox" hidden>
${items}
    </ul>
  </div>`
  );
}

// Match the previous switcher (inline three-link version) regardless of locale
const OLD_SWITCH = /<div class="lang-switch" aria-label="(?:Lingua|Language|Sprache)">[\s\S]*?<\/div>/;

// ---------- 3) Hamburger: 2 spans → 3 spans ----------
const HAMB_OLD = /<button class="nav-toggle" id="nav-toggle" aria-label="(?:Apri menu|Open menu|Menü öffnen)" aria-expanded="false" aria-controls="nav">\s*<span><\/span><span><\/span>\s*<\/button>/;

const hamburger = (loc) => {
  const label = loc === 'en' ? 'Open menu' : loc === 'de' ? 'Menü öffnen' : 'Apri menu';
  return (
`<button class="nav-toggle" id="nav-toggle" aria-label="${label}" aria-expanded="false" aria-controls="nav">
    <span></span><span></span><span></span>
  </button>`
  );
};

for (const f of FILES) {
  const fp = path.join(ROOT, f.p);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');

  html = html.replace(WA_BLOCK, '\n');
  html = html.replace(OLD_SWITCH, buildLangDropdown(f.loc));
  html = html.replace(HAMB_OLD, hamburger(f.loc));

  // Cache bump
  html = html.replace(/style\.css\?v=\d+/g, 'style.css?v=14');
  html = html.replace(/main\.js\?v=\d+/g, 'main.js?v=14');

  fs.writeFileSync(fp, html);
  console.log(`  ${f.p}`);
}
console.log('Done.');
