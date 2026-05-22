// Adds the language switcher next to the nav in every legal page,
// flipping aria-current="page" depending on the file's locale.

const fs   = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const targets = [
  { file: 'privacy.html',       cur: 'it' },
  { file: 'impressum.html',     cur: 'it' },
  { file: 'en/privacy.html',    cur: 'en' },
  { file: 'en/impressum.html',  cur: 'en' },
  { file: 'de/privacy.html',    cur: 'de' },
  { file: 'de/impressum.html',  cur: 'de' },
];

const LABELS = {
  it: 'Lingua', en: 'Language', de: 'Sprache',
};

function build(curLoc) {
  const mark = (key, target) =>
    curLoc === key ? ` aria-current="page"` : '';
  return (
    `\n  <div class="lang-switch" aria-label="${LABELS[curLoc]}">\n` +
    `    <a href="/"${mark('it', '/')}>IT</a>\n` +
    `    <span aria-hidden="true">·</span>\n` +
    `    <a href="/en/"${mark('en', '/en/')}>EN</a>\n` +
    `    <span aria-hidden="true">·</span>\n` +
    `    <a href="/de/"${mark('de', '/de/')}>DE</a>\n` +
    `  </div>`
  );
}

for (const t of targets) {
  const fp = path.join(ROOT, t.file);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');

  // Skip if already inserted
  if (html.includes('class="lang-switch"')) {
    console.log(`  ${t.file} — already has switcher, skipped`);
    continue;
  }

  // Insert after the closing </nav>
  const block = build(t.cur);
  html = html.replace(/(<\/nav>)\s*\n?\s*<\/header>/, `$1${block}\n</header>`);

  fs.writeFileSync(fp, html);
  console.log(`  ${t.file} — switcher inserted (current: ${t.cur})`);
}
console.log('Done.');
