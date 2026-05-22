// 1) Footer "Legal/Rechtliches" in EN and DE still had dead anchors
//    (#impressum, #privacy, #cookie) — the previous fix only matched the IT
//    label. Rewrite the entire block via robust regex regardless of label.
// 2) Section "Il luogo" / "The place" / "Der Ort": drop the meta-list dl
//    (Indirizzo / Da Milano) and insert an ornament between the two prose
//    paragraphs so it breaks up the wall of text on mobile.

const fs   = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const ALL = [
  'index.html','privacy.html','impressum.html',
  'en/index.html','en/privacy.html','en/impressum.html',
  'de/index.html','de/privacy.html','de/impressum.html',
];

const ORNAMENT = '<svg class="ornament ornament--center" viewBox="0 0 72 14" fill="none" stroke="currentColor" stroke-width=".7" stroke-linecap="round" aria-hidden="true"><line x1="0" y1="7" x2="26" y2="7" opacity=".55"/><g transform="translate(36 7)"><path d="M-6 0 L0 -5 L6 0 L0 5 Z"/><circle cx="0" cy="0" r="1.4" fill="currentColor" stroke="none"/></g><line x1="46" y1="7" x2="72" y2="7" opacity=".55"/></svg>';

// ----- Footer legal: replace whole block, regardless of label -----
const LEGAL_RE = /<div>\s*<p class="overline">([^<]+)<\/p>\s*<p>\s*<a href="(?:#impressum|impressum\.html)">Impressum<\/a><br>\s*<a href="(?:#privacy|privacy\.html)">[^<]+<\/a>(?:<br>\s*<a href="#cookie">[^<]+<\/a>)?\s*<\/p>\s*<\/div>/;

function fixLegalBlock(html) {
  return html.replace(LEGAL_RE, (m, label) => {
    // Pick the right "Privacy" wording per label/locale
    let priv = 'Privacy · nLPD';
    if (/Legal/i.test(label))        priv = 'Privacy · FADP';
    else if (/Rechtliches/i.test(label)) priv = 'Datenschutz · revDSG';

    return (
`<div>
        <p class="overline">${label}</p>
        <p>
          <a href="impressum.html">Impressum</a><br>
          <a href="privacy.html">${priv}</a>
        </p>
      </div>`
    );
  });
}

// ----- "Il luogo" meta-list removal + ornament between paragraphs -----
// Drop the entire <dl class="meta-list">…</dl>
function dropMetaList(html) {
  return html.replace(/\s*<dl class="meta-list">[\s\S]*?<\/dl>\s*/, '\n      ');
}

// Insert an ornament between the two <p class="prose"> blocks inside split__text
function insertOrnamentBetweenProse(html) {
  // Pattern: inside the split__text of the place section, two prose paragraphs.
  // We target the closing </p> + spaces + opening <p class="prose"> only once.
  // To be safe, do it only inside <div class="split__text"> with the "Il luogo" / "The place" / "Der Ort" overline immediately preceding.
  return html.replace(
    /(<p class="overline">(?:Il luogo|The place|Der Ort)<\/p>[\s\S]*?<p class="prose">[\s\S]*?<\/p>)\s*(<p class="prose">)/,
    `$1\n      <div class="prose-divider">${ORNAMENT}</div>\n      $2`
  );
}

for (const f of ALL) {
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');

  html = fixLegalBlock(html);

  if (f.endsWith('index.html')) {
    html = dropMetaList(html);
    html = insertOrnamentBetweenProse(html);
  }

  // Cache bump
  html = html.replace(/style\.css\?v=\d+/g, 'style.css?v=16');
  html = html.replace(/main\.js\?v=\d+/g, 'main.js?v=16');

  fs.writeFileSync(fp, html);
  console.log(`  ${f}`);
}
console.log('Done.');
