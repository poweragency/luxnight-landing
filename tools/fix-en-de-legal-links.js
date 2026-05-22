// In en/privacy, en/impressum, de/privacy, de/impressum the brand link and
// the "Back to home" link should stay within the same language directory.
// Force them to "./" (which serves <locale>/index.html) instead of "../"
// (which would jump to the IT root).
//
// Care: the IT entry in the language switcher *should* stay as "../".
// We target only specific elements via more precise patterns.

const fs   = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const targets = [
  'en/privacy.html',
  'en/impressum.html',
  'de/privacy.html',
  'de/impressum.html',
];

for (const f of targets) {
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');

  // 1) Brand link
  html = html.replace(
    /<a href="\.\.\/" class="brand"/,
    '<a href="./" class="brand"'
  );

  // 2) "Back to home" inside <p class="legal-page__back">
  html = html.replace(
    /(<p class="legal-page__back">\s*<a href=)"\.\.\/"/,
    '$1"./"'
  );

  fs.writeFileSync(fp, html);
  console.log(`  ${f}`);
}
console.log('Done.');
