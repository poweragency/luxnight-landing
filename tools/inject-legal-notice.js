// Inserts a small "translation provided for convenience" notice in the
// EN/DE legal pages, since the body of those pages is intentionally kept
// in Italian (binding wording) until a lawyer signs off the translations.

const fs   = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const NOTICES = {
  en: {
    text: 'This page is currently available in Italian only. The Italian version is binding. For an English-language summary, please write to <a href="mailto:info@luxnight.ch">info@luxnight.ch</a>.',
    back: '↗ View the Italian version',
    privacyHref: '../privacy.html',
    impressumHref: '../impressum.html',
  },
  de: {
    text: 'Diese Seite ist derzeit nur auf Italienisch verfügbar. Die italienische Fassung ist verbindlich. Für eine Zusammenfassung auf Deutsch schreiben Sie bitte an <a href="mailto:info@luxnight.ch">info@luxnight.ch</a>.',
    back: '↗ Italienische Fassung ansehen',
    privacyHref: '../privacy.html',
    impressumHref: '../impressum.html',
  },
};

for (const loc of ['en', 'de']) {
  for (const page of ['privacy.html', 'impressum.html']) {
    const fp = path.join(ROOT, loc, page);
    if (!fs.existsSync(fp)) continue;
    let html = fs.readFileSync(fp, 'utf8');
    const n = NOTICES[loc];
    const href = page === 'privacy.html' ? n.privacyHref : n.impressumHref;
    const notice = `<aside class="legal-page__notice"><p>${n.text}</p><p><a href="${href}">${n.back}</a></p></aside>`;
    // Insert immediately after the <main ...> opening
    html = html.replace(
      /<main class="legal-page">\s*\n?\s*<div class="container container--narrow">/,
      `<main class="legal-page">\n  <div class="container container--narrow">\n    ${notice}\n`
    );
    fs.writeFileSync(fp, html);
    console.log(`  ${loc}/${page} — notice inserted`);
  }
}
console.log('Done.');
