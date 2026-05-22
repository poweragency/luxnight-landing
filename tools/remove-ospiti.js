// Removes the "Per essere ospiti" nav link, the matching hero CTA, and
// the whole #ospiti section from every locale's index.html.
// Replaces the hero meta with a minimalist "By invitation · By reservation".

const fs   = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const FILES = ['index.html', 'en/index.html', 'de/index.html'];

for (const f of FILES) {
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');

  // 1) Remove the nav <a href="#ospiti">...</a> (whole line incl. surrounding whitespace)
  html = html.replace(/\s*<a\s+href="#ospiti">[^<]*<\/a>\n?/, '\n');

  // 2) Replace the entire <div class="hero__meta">…</div> with a minimal <p>
  html = html.replace(
    /<div class="hero__meta">[\s\S]*?<\/div>/,
    '<p class="hero__meta">\n      <span class="overline overline--soft">By invitation · By reservation</span>\n    </p>'
  );

  // 3) Drop the entire <section id="ospiti">...</section> block + the
  //    "Per essere ospiti / Be a guest / Zu Gast sein" comment above it.
  html = html.replace(
    /<!--\s*Per essere ospiti\s*-->\s*<section id="ospiti"[\s\S]*?<\/section>\s*/i,
    ''
  );

  fs.writeFileSync(fp, html);
  console.log(`  ${f} — cleaned`);
}
console.log('Done.');
