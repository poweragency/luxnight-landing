// Replace the <main class="legal-page">…</main> block in EN/DE privacy and
// impressum pages with proper translated bodies. Header/footer/bottom-bar
// are already localized and stay untouched.

const fs   = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const ORNAMENT = '<svg class="ornament" viewBox="0 0 72 14" fill="none" stroke="currentColor" stroke-width=".7" stroke-linecap="round" aria-hidden="true"><line x1="0" y1="7" x2="26" y2="7" opacity=".55"/><g transform="translate(36 7)"><path d="M-6 0 L0 -5 L6 0 L0 5 Z"/><circle cx="0" cy="0" r="1.4" fill="currentColor" stroke="none"/></g><line x1="46" y1="7" x2="72" y2="7" opacity=".55"/></svg>';

const MAINS = {

/* ============================= EN PRIVACY ============================= */
'en/privacy.html': `<main class="legal-page">
  <div class="container container--narrow">
    <p class="overline">Notice</p>
    <h1 class="legal-page__title">Privacy</h1>
    ${ORNAMENT}
    <p class="legal-page__lead">
      Privacy notice pursuant to the revised Swiss Federal Act on Data Protection
      (FADP, in force since 1 September 2023) and — where applicable — the EU General
      Data Protection Regulation 2016/679 (GDPR). Last updated: May 2026.
    </p>

    <h2>1 · Data controller</h2>
    <p>
      The controller of the personal data collected through this website is
      <strong>Lux Night</strong>, with registered offices at Via San Gottardo 111,
      6828 Balerna, Switzerland.
      <br>Contact: <a href="mailto:info@luxnight.ch">info@luxnight.ch</a> · +41 91 682 55 59.
    </p>

    <h2>2 · Categories of data collected</h2>
    <ul>
      <li><strong>Browsing data</strong> — automatically recorded by our hosting servers (IP address, user agent, page requested, date and time). Used for security purposes, aggregated statistics and diagnostics.</li>
      <li><strong>Email address</strong> — provided voluntarily by the user via the newsletter subscription form. Used exclusively to send occasional communications about the club's evenings and events.</li>
      <li><strong>Contact information</strong> — any information provided via phone or email for reservation requests or enquiries.</li>
    </ul>

    <h2>3 · Purposes and legal bases</h2>
    <ul>
      <li>Responding to user enquiries (legitimate interest).</li>
      <li>Sending the newsletter (explicit consent, revocable at any time).</li>
      <li>Ensuring the security and operation of the website (legitimate interest).</li>
      <li>Compliance with legal obligations (legal obligation).</li>
    </ul>

    <h2>4 · Retention</h2>
    <p>
      Server logs are retained for a maximum period of six months.
      The newsletter email address is retained until unsubscription, possible at any time
      via the link at the bottom of every communication.
    </p>

    <h2>5 · Third-party services</h2>
    <p>The website uses the following services that may process personal data:</p>
    <ul>
      <li><strong>Google Fonts &amp; Google Maps</strong> (Google LLC, USA / Google Ireland Ltd.) — loading of typefaces and display of the map. They may collect the visitor's IP address. Privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</li>
      <li><strong>Formsubmit</strong> (formsubmit.co) — handling of the newsletter subscription form. Receives the email address and forwards it to the controller. Service info: <a href="https://formsubmit.co/" target="_blank" rel="noopener">formsubmit.co</a>.</li>
      <li><strong>GitHub Pages</strong> (GitHub Inc., USA) — static hosting of the website. Privacy policy: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">docs.github.com/site-policy</a>.</li>
    </ul>

    <h2>6 · Cookies and local storage</h2>
    <p>
      The website does not use profiling cookies or third-party analytics tools.
      A single <code>sessionStorage</code> value is used to remember the age confirmation
      within the browsing session: this data is not a cookie, is not transmitted to the
      server and is cleared automatically when the browser is closed.
    </p>

    <h2>7 · Rights of the data subject</h2>
    <p>
      At any time the user may exercise the rights provided for by the FADP and the GDPR,
      in particular: right of access, rectification, erasure, restriction of processing,
      portability, objection and withdrawal of consent. To exercise these rights, simply
      write to <a href="mailto:info@luxnight.ch">info@luxnight.ch</a>.
    </p>
    <p>
      In the event of an unresolved dispute, the user may contact the competent supervisory
      authority: in Switzerland, the <strong>Federal Data Protection and Information
      Commissioner (FDPIC)</strong>; EU residents may turn to the national authority of
      their country.
    </p>

    <h2>8 · Changes</h2>
    <p>
      This notice may be updated at any time to reflect regulatory or operational changes
      to the website. The most recent version is always the one published on this page.
    </p>

    <p class="legal-page__back"><a href="./">← Back to home</a></p>
  </div>
</main>`,

/* ============================= DE PRIVACY ============================= */
'de/privacy.html': `<main class="legal-page">
  <div class="container container--narrow">
    <p class="overline">Hinweis</p>
    <h1 class="legal-page__title">Datenschutz</h1>
    ${ORNAMENT}
    <p class="legal-page__lead">
      Datenschutzerklärung gemäss dem revidierten Schweizer Datenschutzgesetz
      (revDSG, in Kraft seit 1. September 2023) sowie — soweit anwendbar — der
      EU-Datenschutz-Grundverordnung 2016/679 (DSGVO). Letzte Aktualisierung: Mai 2026.
    </p>

    <h2>1 · Verantwortlicher</h2>
    <p>
      Für die Verarbeitung der über diese Website erhobenen personenbezogenen Daten
      verantwortlich ist <strong>Lux Night</strong>, mit Sitz an der Via San Gottardo 111,
      6828 Balerna, Schweiz.
      <br>Kontakt: <a href="mailto:info@luxnight.ch">info@luxnight.ch</a> · +41 91 682 55 59.
    </p>

    <h2>2 · Erfasste Datenkategorien</h2>
    <ul>
      <li><strong>Navigationsdaten</strong> — werden von den Servern unseres Hosting-Anbieters automatisch erfasst (IP-Adresse, User Agent, aufgerufene Seite, Datum und Uhrzeit). Verwendet für Sicherheit, aggregierte Statistiken und Diagnose.</li>
      <li><strong>E-Mail-Adresse</strong> — freiwillig vom Nutzer im Anmeldeformular der Newsletter angegeben. Ausschliesslich zur Versendung gelegentlicher Mitteilungen zu Abenden und Veranstaltungen verwendet.</li>
      <li><strong>Kontaktdaten</strong> — Informationen, die per Telefon oder E-Mail für Reservierungsanfragen oder Auskünfte übermittelt werden.</li>
    </ul>

    <h2>3 · Zwecke und Rechtsgrundlagen</h2>
    <ul>
      <li>Beantwortung von Anfragen der Nutzer (berechtigtes Interesse).</li>
      <li>Versand des Newsletters (ausdrückliche Einwilligung, jederzeit widerrufbar).</li>
      <li>Sicherheit und Betrieb der Website gewährleisten (berechtigtes Interesse).</li>
      <li>Erfüllung gesetzlicher Verpflichtungen (gesetzliche Pflicht).</li>
    </ul>

    <h2>4 · Aufbewahrung</h2>
    <p>
      Serverprotokolle werden maximal sechs Monate aufbewahrt.
      Die E-Mail-Adresse für den Newsletter wird bis zur Abmeldung gespeichert, die
      jederzeit über den Link am Ende jeder Mitteilung möglich ist.
    </p>

    <h2>5 · Drittanbieter</h2>
    <p>Die Website nutzt folgende Dienste, die personenbezogene Daten verarbeiten können:</p>
    <ul>
      <li><strong>Google Fonts &amp; Google Maps</strong> (Google LLC, USA / Google Ireland Ltd.) — Laden der Schriftarten und Anzeige der Karte. Können die IP-Adresse des Besuchers erfassen. Datenschutzerklärung: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</li>
      <li><strong>Formsubmit</strong> (formsubmit.co) — Verwaltung des Newsletter-Anmeldeformulars. Empfängt die E-Mail-Adresse und leitet sie an den Verantwortlichen weiter. Dienstinformationen: <a href="https://formsubmit.co/" target="_blank" rel="noopener">formsubmit.co</a>.</li>
      <li><strong>GitHub Pages</strong> (GitHub Inc., USA) — statisches Hosting der Website. Datenschutzerklärung: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">docs.github.com/site-policy</a>.</li>
    </ul>

    <h2>6 · Cookies und lokaler Speicher</h2>
    <p>
      Die Website verwendet weder Tracking-Cookies noch Analyse-Tools von Drittanbietern.
      Ein einziger <code>sessionStorage</code>-Wert speichert die Bestätigung der Volljährigkeit
      während der Browsersitzung: dieser Wert ist kein Cookie, wird nicht an den Server übermittelt
      und wird beim Schliessen des Browsers automatisch gelöscht.
    </p>

    <h2>7 · Betroffenenrechte</h2>
    <p>
      Der Nutzer kann jederzeit die im revDSG und in der DSGVO vorgesehenen Rechte ausüben,
      insbesondere: Auskunftsrecht, Berichtigung, Löschung, Einschränkung der Verarbeitung,
      Datenübertragbarkeit, Widerspruch und Widerruf der Einwilligung. Zur Ausübung dieser
      Rechte genügt eine Nachricht an <a href="mailto:info@luxnight.ch">info@luxnight.ch</a>.
    </p>
    <p>
      Bei ungelöster Streitigkeit kann sich der Nutzer an die zuständige Aufsichtsbehörde wenden:
      in der Schweiz an den <strong>Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten
      (EDÖB)</strong>; EU-Bürger an die nationale Behörde ihres Landes.
    </p>

    <h2>8 · Änderungen</h2>
    <p>
      Diese Erklärung kann jederzeit aktualisiert werden, um regulatorische Änderungen oder
      Anpassungen am Betrieb der Website widerzuspiegeln. Die aktuellste Version ist stets
      diejenige, die auf dieser Seite veröffentlicht ist.
    </p>

    <p class="legal-page__back"><a href="./">← Zurück zur Startseite</a></p>
  </div>
</main>`,

/* ============================= EN IMPRESSUM ============================= */
'en/impressum.html': `<main class="legal-page">
  <div class="container container--narrow">
    <p class="overline">Legal notice</p>
    <h1 class="legal-page__title">Impressum</h1>
    ${ORNAMENT}
    <p class="legal-page__lead">
      Pursuant to Article 322 of the Swiss Penal Code and Article 3 of the Federal Act
      against Unfair Competition (UCA).
    </p>

    <h2>Website operator</h2>
    <dl class="legal-page__dl">
      <dt>Name</dt><dd>Lux Night</dd>
      <dt>Address</dt><dd>Via San Gottardo 111<br>6828 Balerna<br>Canton Ticino · Switzerland</dd>
      <dt>Phone</dt><dd><a href="tel:+41916825559">+41 91 682 55 59</a></dd>
      <dt>Email</dt><dd><a href="mailto:info@luxnight.ch">info@luxnight.ch</a></dd>
      <dt>Website</dt><dd><a href="https://www.luxnight.ch">www.luxnight.ch</a></dd>
    </dl>

    <h2>Company information</h2>
    <dl class="legal-page__dl">
      <dt>Legal entity</dt><dd><em>[To be confirmed by the owner]</em></dd>
      <dt>Registered office</dt><dd><em>[To be confirmed]</em></dd>
      <dt>UID / Commercial register</dt><dd><em>[To be confirmed — CHE-…]</em></dd>
      <dt>VAT number</dt><dd><em>[To be confirmed — CHE-… VAT]</em></dd>
      <dt>Managing director</dt><dd><em>[To be confirmed]</em></dd>
    </dl>

    <h2>Hosting</h2>
    <p>
      The website is hosted on <strong>GitHub Pages</strong>, a service of GitHub Inc. —
      88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States. Publication
      through this infrastructure involves the processing of some navigation data
      (IP address, user agent) as described in the
      <a href="privacy.html">privacy policy</a>.
    </p>

    <h2>Concept, design and development</h2>
    <p>
      Concept, design and development of the website by <strong>Power Agency</strong>.
      For enquiries about the website:
      <a href="mailto:info@luxnight.ch">info@luxnight.ch</a>.
    </p>

    <h2>Copyright</h2>
    <p>
      All content on this website — text, photographs, videos, figurative and word marks —
      is owned by Lux Night or by the respective owners and is protected by Swiss and
      international copyright law. Reproduction, even partial, without the written consent
      of the owner is forbidden.
    </p>
    <p>
      The published photographs depict exclusively the venue's premises. Any persons portrayed
      have provided express written release for the use of their image on this website.
    </p>

    <h2>Limitation of liability</h2>
    <p>
      The owner declines any liability for the correctness, accuracy, currency, reliability
      and completeness of the information published. Liability claims regarding material or
      immaterial damage caused by access, use or non-use of the information published, by
      misuse of the connection or by technical malfunction are excluded to the extent
      permitted by law.
    </p>
    <p>
      All offers are non-binding. The owner reserves the right to modify, supplement or
      delete parts of the website or the entire publication without notice, or to
      temporarily or permanently cease publication.
    </p>

    <h2>Applicable law and jurisdiction</h2>
    <p>
      This website is governed by Swiss law. The exclusive jurisdiction for any dispute
      is Mendrisio, Canton Ticino, Switzerland.
    </p>

    <p class="legal-page__back"><a href="./">← Back to home</a></p>
  </div>
</main>`,

/* ============================= DE IMPRESSUM ============================= */
'de/impressum.html': `<main class="legal-page">
  <div class="container container--narrow">
    <p class="overline">Rechtliche Hinweise</p>
    <h1 class="legal-page__title">Impressum</h1>
    ${ORNAMENT}
    <p class="legal-page__lead">
      Gemäss Artikel 322 des Schweizerischen Strafgesetzbuches und Artikel 3 des
      Bundesgesetzes gegen den unlauteren Wettbewerb (UWG).
    </p>

    <h2>Verantwortlich für die Website</h2>
    <dl class="legal-page__dl">
      <dt>Bezeichnung</dt><dd>Lux Night</dd>
      <dt>Adresse</dt><dd>Via San Gottardo 111<br>6828 Balerna<br>Kanton Tessin · Schweiz</dd>
      <dt>Telefon</dt><dd><a href="tel:+41916825559">+41 91 682 55 59</a></dd>
      <dt>E-Mail</dt><dd><a href="mailto:info@luxnight.ch">info@luxnight.ch</a></dd>
      <dt>Website</dt><dd><a href="https://www.luxnight.ch">www.luxnight.ch</a></dd>
    </dl>

    <h2>Unternehmensangaben</h2>
    <dl class="legal-page__dl">
      <dt>Firmenname</dt><dd><em>[Vom Inhaber zu bestätigen]</em></dd>
      <dt>Sitz</dt><dd><em>[Zu bestätigen]</em></dd>
      <dt>UID-Nummer / Handelsregister</dt><dd><em>[Zu bestätigen — CHE-…]</em></dd>
      <dt>MWST-Nummer</dt><dd><em>[Zu bestätigen — CHE-… MWST]</em></dd>
      <dt>Verantwortliche Geschäftsleitung</dt><dd><em>[Zu bestätigen]</em></dd>
    </dl>

    <h2>Hosting</h2>
    <p>
      Die Website wird über <strong>GitHub Pages</strong> bereitgestellt, einen Dienst
      von GitHub Inc. — 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.
      Die Veröffentlichung über diese Infrastruktur beinhaltet die Verarbeitung einiger
      Navigationsdaten (IP-Adresse, User Agent), wie in der
      <a href="privacy.html">Datenschutzerklärung</a> beschrieben.
    </p>

    <h2>Konzept, Gestaltung und Entwicklung</h2>
    <p>
      Konzept, Gestaltung und Entwicklung der Website durch <strong>Power Agency</strong>.
      Für Anfragen zur Website:
      <a href="mailto:info@luxnight.ch">info@luxnight.ch</a>.
    </p>

    <h2>Urheberrecht</h2>
    <p>
      Sämtliche Inhalte der Website — Texte, Fotografien, Videos, Bild- und Wortmarken —
      sind Eigentum von Lux Night oder der jeweiligen Inhaber und durch das schweizerische
      und internationale Urheberrecht geschützt. Eine auch teilweise Vervielfältigung ohne
      schriftliche Zustimmung des Inhabers ist verboten.
    </p>
    <p>
      Die veröffentlichten Fotografien zeigen ausschliesslich Räumlichkeiten des Clubs.
      Allfällig abgebildete Personen haben einer ausdrücklichen schriftlichen Verwendung
      ihres Bildes auf dieser Website zugestimmt.
    </p>

    <h2>Haftungsausschluss</h2>
    <p>
      Der Inhaber lehnt jede Haftung für die Richtigkeit, Genauigkeit, Aktualität,
      Zuverlässigkeit und Vollständigkeit der veröffentlichten Informationen ab.
      Haftungsansprüche, die durch Zugriff, Nutzung oder Nichtnutzung der veröffentlichten
      Informationen, durch Missbrauch der Verbindung oder durch technische Probleme
      verursachte materielle oder immaterielle Schäden betreffen, sind im gesetzlich
      zulässigen Umfang ausgeschlossen.
    </p>
    <p>
      Alle Angebote sind unverbindlich. Der Inhaber behält sich das Recht vor, Teile der
      Website oder die gesamte Veröffentlichung ohne Vorankündigung zu ändern, zu ergänzen
      oder zu löschen oder die Veröffentlichung vorübergehend oder endgültig einzustellen.
    </p>

    <h2>Anwendbares Recht und Gerichtsstand</h2>
    <p>
      Diese Website unterliegt dem schweizerischen Recht. Ausschliesslicher Gerichtsstand
      für sämtliche Streitigkeiten ist Mendrisio, Kanton Tessin, Schweiz.
    </p>

    <p class="legal-page__back"><a href="./">← Zurück zur Startseite</a></p>
  </div>
</main>`,

};

// ---- META updates per locale (title + description) ----
const META = {
  'en/privacy.html':   { title: 'Privacy — Lux Night',     desc: 'Lux Night privacy notice under the revised Swiss Federal Act on Data Protection (FADP).' },
  'de/privacy.html':   { title: 'Datenschutz — Lux Night', desc: 'Datenschutzerklärung von Lux Night gemäss revidiertem Schweizer Datenschutzgesetz (revDSG).' },
  'en/impressum.html': { title: 'Impressum — Lux Night',   desc: 'Lux Night legal notice — Via San Gottardo 111, 6828 Balerna, Ticino.' },
  'de/impressum.html': { title: 'Impressum — Lux Night',   desc: 'Lux Night Impressum — Via San Gottardo 111, 6828 Balerna, Tessin.' },
};

for (const [file, body] of Object.entries(MAINS)) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) { console.warn(`  ${file} — not found`); continue; }
  let html = fs.readFileSync(fp, 'utf8');

  // Replace <main class="legal-page">…</main>
  html = html.replace(/<main class="legal-page">[\s\S]*?<\/main>/, body);

  // Update <title> and <meta name="description">
  const m = META[file];
  if (m) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${m.title}</title>`);
    html = html.replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${m.desc}">`
    );
  }

  // Cache bump
  html = html.replace(/style\.css\?v=\d+/g, 'style.css?v=18');
  html = html.replace(/main\.js\?v=\d+/g, 'main.js?v=18');

  fs.writeFileSync(fp, html);
  console.log(`  ${file}`);
}

// Bump cache on every other HTML too
for (const f of ['index.html','privacy.html','impressum.html','en/index.html','de/index.html']) {
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');
  html = html.replace(/style\.css\?v=\d+/g, 'style.css?v=18');
  html = html.replace(/main\.js\?v=\d+/g, 'main.js?v=18');
  fs.writeFileSync(fp, html);
}
console.log('Done.');
