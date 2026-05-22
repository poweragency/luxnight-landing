// Apply EN/DE translations to the files already copied into /en/ and /de/.
// Each entry maps an IT source string → EN and DE translation. Strings are
// matched verbatim (whitespace + punctuation included), so keep them in sync
// with the source HTML.

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const T = {
  /* ============ <head> & meta ============ */
  'Lux Night — Private Club · Balerna, Ticino': {
    en: 'Lux Night — Private Club · Balerna, Ticino',
    de: 'Lux Night — Privatclub · Balerna, Tessin',
  },
  'Lux Night. Un club privato nel cuore del Ticino. Per inviti, su prenotazione. Via San Gottardo 111, Balerna.': {
    en: 'Lux Night. A private club in the heart of Canton Ticino, Switzerland. By invitation, by reservation. Via San Gottardo 111, Balerna.',
    de: 'Lux Night. Ein Privatclub im Herzen des Tessins. Auf Einladung, nach Reservierung. Via San Gottardo 111, Balerna.',
  },
  'Lux Night — Private Club · Balerna': {
    en: 'Lux Night — Private Club · Balerna',
    de: 'Lux Night — Privatclub · Balerna',
  },
  'Un club privato nel cuore del Ticino. Per inviti, su prenotazione.': {
    en: 'A private club in the heart of Canton Ticino. By invitation, by reservation.',
    de: 'Ein Privatclub im Herzen des Tessins. Auf Einladung, nach Reservierung.',
  },
  'Lux Night — Private Club · Una porta che non si trova per caso': {
    en: 'Lux Night — Private Club · A door not found by chance',
    de: 'Lux Night — Privatclub · Eine Tür, die nicht zufällig gefunden wird',
  },

  /* ============ Age gate ============ */
  'L\'accesso è riservato<br>a persone maggiorenni.': {
    en: 'Access is reserved<br>for those of legal age.',
    de: 'Der Zugang ist<br>Volljährigen vorbehalten.',
  },
  'Confermi di aver compiuto diciotto anni.': {
    en: 'Please confirm you are eighteen or older.',
    de: 'Bitte bestätigen Sie, dass Sie achtzehn Jahre oder älter sind.',
  },
  'Confermo': { en: 'Confirm', de: 'Bestätigen' },
  'Esci':     { en: 'Exit',    de: 'Verlassen' },

  /* ============ Header nav ============ */
  '>Manifesto<':         { en: '>Manifesto<',  de: '>Manifest<' },
  '>Il luogo<':          { en: '>The place<',  de: '>Der Ort<' },
  '>Le sale<':           { en: '>The rooms<',  de: '>Die Räume<' },
  '>La carta<':          { en: '>The list<',   de: '>Die Karte<' },
  '>Per essere ospiti<': { en: '>Be a guest<', de: '>Zu Gast sein<' },
  'aria-label="Apri menu"': { en: 'aria-label="Open menu"', de: 'aria-label="Menü öffnen"' },
  'aria-label="Principale"': { en: 'aria-label="Main"',     de: 'aria-label="Haupt"' },
  'aria-label="Lingua"':     { en: 'aria-label="Language"', de: 'aria-label="Sprache"' },

  /* ============ Hero ============ */
  'Una porta che non si trova per caso.<br>\n      Quattro pareti che custodiscono la notte.': {
    en: 'A door not found by chance.<br>\n      Four walls that guard the night.',
    de: 'Eine Tür, die man nicht zufällig findet.<br>\n      Vier Wände, die die Nacht bewahren.',
  },
  '"club-status__sub">Ticino · CH<': { en: '"club-status__sub">Ticino · CH<', de: '"club-status__sub">Tessin · CH<' },
  '>Per essere ospiti</a>': { en: '>Be a guest</a>', de: '>Zu Gast sein</a>' },
  '>By invitation</span>':  { en: '>By invitation</span>', de: '>Auf Einladung</span>' },

  /* ============ Manifesto ============ */
  '>Manifesto</p>': { en: '>Manifesto</p>', de: '>Manifest</p>' },
  '<em>Lux</em>, in latino, è la luce.<br>\n      <em>Night</em>, in inglese, è la notte.<br>\n      <span class="prose__break">Un ossimoro, e una promessa.</span>': {
    en: '<em>Lux</em>, in Latin, means light.<br>\n      <em>Night</em>, in English, means night.<br>\n      <span class="prose__break">An oxymoron — and a promise.</span>',
    de: '<em>Lux</em>, lateinisch, ist das Licht.<br>\n      <em>Night</em>, englisch, ist die Nacht.<br>\n      <span class="prose__break">Ein Oxymoron — und ein Versprechen.</span>',
  },
  "Esiste un'ora in cui la città dorme e qualcun altro ricomincia.\n      Lux Night è il rifugio che quella minoranza ha scelto in Ticino —\n      un luogo costruito sul silenzio della discrezione e sul calore di una luce bassa.\n      Non è una discoteca. Non è un bar. È un club privato, con una sua liturgia.": {
    en: "There is an hour when the city falls asleep and someone else begins again.\n      Lux Night is the refuge that minority has chosen in Ticino —\n      a place built on the silence of discretion and the warmth of a low light.\n      It is not a discothèque. It is not a bar. It is a private club, with a liturgy of its own.",
    de: "Es gibt eine Stunde, in der die Stadt schläft und jemand anderes wieder beginnt.\n      Lux Night ist der Zufluchtsort, den diese Minderheit im Tessin gewählt hat —\n      ein Ort, gebaut auf der Stille der Diskretion und der Wärme eines tiefen Lichts.\n      Es ist keine Diskothek. Es ist keine Bar. Es ist ein Privatclub mit eigener Liturgie.",
  },
  '— La direzione': { en: '— The management', de: '— Die Direktion' },

  /* ============ Il luogo ============ */
  '>Il luogo</p>': { en: '>The place</p>', de: '>Der Ort</p>' },
  'Dentro una<br>porta sola.': {
    en: 'Behind a<br>single door.',
    de: 'Hinter einer<br>einzigen Tür.',
  },
  "Una palazzina anonima a Balerna, un'insegna che non si concede al passante.\n        All'interno, archi in mattoni che sopravvivono al tempo, divani capitonné,\n        pavimenti scuri come laghi notturni. Nulla è gridato; tutto è preciso.": {
    en: "An anonymous building in Balerna, a sign that does not give itself to the passer-by.\n        Inside, brick arches that survive the years, tufted leather sofas,\n        floors as dark as night lakes. Nothing is shouted; everything is precise.",
    de: "Ein unauffälliges Gebäude in Balerna, ein Schild, das sich dem Vorübergehenden nicht zeigt.\n        Im Inneren Ziegelbögen, die der Zeit trotzen, Capitonné-Sofas,\n        Böden so dunkel wie nächtliche Seen. Nichts ist laut; alles ist präzise.",
  },
  "Si entra dopo le ventidue, si rimane finché serve.\n        Il personale conosce il vostro nome prima di voi.": {
    en: "One enters after ten in the evening, and stays as long as needed.\n        The staff know your name before you do.",
    de: "Man tritt nach zweiundzwanzig Uhr ein und bleibt, solange es nötig ist.\n        Das Personal kennt Ihren Namen, bevor Sie ihn nennen.",
  },
  '<dt>Indirizzo</dt><dd>Via San Gottardo 111<br>6828 Balerna · CH</dd>': {
    en: '<dt>Address</dt><dd>Via San Gottardo 111<br>6828 Balerna · CH</dd>',
    de: '<dt>Adresse</dt><dd>Via San Gottardo 111<br>6828 Balerna · CH</dd>',
  },
  "<dt>Da Milano</dt><dd>Cinquantotto minuti d'auto.<br>Uscita Chiasso.</dd>": {
    en: '<dt>From Milan</dt><dd>Fifty-eight minutes by car.<br>Chiasso exit.</dd>',
    de: '<dt>Aus Mailand</dt><dd>Achtundfünfzig Autominuten.<br>Ausfahrt Chiasso.</dd>',
  },

  /* ============ Le sale ============ */
  '>Le sale</p>': { en: '>The rooms</p>', de: '>Die Räume</p>' },
  'Quattro stanze,<br>quattro silenzi.': {
    en: 'Four rooms,<br>four silences.',
    de: 'Vier Räume,<br>vier Stille.',
  },
  '>I — Sala principale<':   { en: '>I — Main room<',    de: '>I — Hauptraum<' },
  '>II — Privé Rosa<':       { en: '>II — Privé Rosa<',  de: '>II — Privé Rosa<' },
  '>III — Privé Blu<':       { en: '>III — Privé Blu<',  de: '>III — Privé Blu<' },
  '>IV — Il bar<':           { en: '>IV — The bar<',     de: '>IV — Die Bar<' },
  '>Il salone</h3>':         { en: '>The salon</h3>',    de: '>Der Salon</h3>' },
  '>La camera intima</h3>':  { en: '>The intimate room</h3>', de: '>Das vertraute Zimmer</h3>' },
  '>La camera cremisi</h3>': { en: '>The crimson room</h3>',  de: '>Das karmesinrote Zimmer</h3>' },
  '>Il banco</h3>':          { en: '>The counter</h3>',  de: '>Der Tresen</h3>' },
  "L'ambiente conviviale del club. Archi in pietra, divani in pelle bianca, una luce calda che non lascia spazio alla confusione. Qui si arriva e si sceglie il proprio ritmo per la notte.": {
    en: "The convivial heart of the club. Stone arches, white leather sofas, a warm light that leaves no room for confusion. This is where you arrive, and choose your own pace for the night.",
    de: "Der gesellige Mittelpunkt des Clubs. Steinbögen, weisse Ledersofas, ein warmes Licht, das keine Verwirrung zulässt. Hier kommt man an und wählt sein Tempo für die Nacht.",
  },
  "Una sala riservata di tonalità calde, pensata per le compagnie più ristrette. Servizio dedicato, porta chiusa, conversazione protetta. Si accede su prenotazione.": {
    en: "A private room of warm hues, designed for the closest of company. Dedicated service, closed door, protected conversation. By reservation only.",
    de: "Ein privater Raum in warmen Tönen, gedacht für engste Gesellschaft. Eigener Service, geschlossene Tür, geschütztes Gespräch. Nur nach Reservierung.",
  },
  "Una tenda, un divano, una lampada sola. La stanza per le occasioni che richiedono un'eleganza più severa: anniversari, accordi, congedi. Riservatezza assoluta.": {
    en: "A curtain, a couch, a single lamp. The room for occasions that ask for a stricter elegance: anniversaries, agreements, farewells. Absolute discretion.",
    de: "Ein Vorhang, ein Sofa, eine einzelne Lampe. Der Raum für Anlässe, die strengere Eleganz verlangen: Jahrestage, Vereinbarungen, Abschiede. Absolute Vertraulichkeit.",
  },
  "Il cuore tecnico del club. Distillati nelle linee Silver, Gold e Platinum; champagne di maison verificate; un bartender che ricorda i vostri preferiti dalla volta precedente.": {
    en: "The technical heart of the club. Spirits across Silver, Gold and Platinum lines; champagnes from verified houses; a bartender who remembers your favourites from the last visit.",
    de: "Das technische Herz des Clubs. Spirituosen in den Linien Silver, Gold und Platinum; Champagner geprüfter Häuser; ein Barkeeper, der Ihre Vorlieben vom letzten Mal kennt.",
  },

  /* ============ Carta ============ */
  '>La carta</p>':       { en: '>The list</p>',     de: '>Die Karte</p>' },
  'Una selezione,<br>non un catalogo.': {
    en: 'A selection,<br>not a catalogue.',
    de: 'Eine Auswahl,<br>kein Katalog.',
  },
  'La carta è breve di proposito. Pochi distillati, scelti uno per uno; champagne di maison verificate; magnum per le occasioni in cui la sera diventa una notte.': {
    en: 'The list is intentionally short. A few spirits, chosen one by one; champagnes from verified houses; magnums for the evenings that turn into nights.',
    de: 'Die Karte ist bewusst kurz. Wenige, einzeln ausgewählte Spirituosen; Champagner geprüfter Häuser; Magnum-Flaschen für jene Abende, die zu Nächten werden.',
  },
  '>Champagne</h3>':  { en: '>Champagne</h3>',  de: '>Champagner</h3>' },
  '>Magnum</h3>':     { en: '>Magnum</h3>',     de: '>Magnum</h3>' },
  '>Distillati</h3>': { en: '>Spirits</h3>',    de: '>Spirituosen</h3>' },
  '<span>Whisky</span>':  { en: '<span>Whisky</span>',  de: '<span>Whisky</span>' },
  '<span>Rum</span>':     { en: '<span>Rum</span>',     de: '<span>Rum</span>' },
  '<span>Vodka</span>':   { en: '<span>Vodka</span>',   de: '<span>Wodka</span>' },
  '<span>Gin</span>':     { en: '<span>Gin</span>',     de: '<span>Gin</span>' },
  '<span>Tequila</span>': { en: '<span>Tequila</span>', de: '<span>Tequila</span>' },
  '>Silver · Gold · Platinum</p>': { en: '>Silver · Gold · Platinum</p>', de: '>Silver · Gold · Platinum</p>' },
  '>La carta completa, in PDF</a>': { en: '>The full list, as a PDF</a>', de: '>Die vollständige Karte als PDF</a>' },

  /* ============ Gallery / Frammenti ============ */
  '>Frammenti</p>':     { en: '>Fragments</p>',     de: '>Fragmente</p>' },
  'Il club, in immagini.': { en: 'The club, in pictures.', de: 'Der Club in Bildern.' },
  'alt="Arco di mattoni che incornicia il salone"': {
    en: 'alt="A brick arch framing the salon"',
    de: 'alt="Ein Ziegelbogen rahmt den Salon"',
  },
  'alt="Vista panoramica del salone"': {
    en: 'alt="Panoramic view of the salon"',
    de: 'alt="Panoramablick auf den Salon"',
  },
  "alt=\"Lounge interna sotto l'arco rosso\"": {
    en: 'alt="Inner lounge beneath the red arch"',
    de: 'alt="Innen-Lounge unter dem roten Bogen"',
  },
  'alt="Divani bianchi capitonné e bar sullo sfondo"': {
    en: 'alt="White tufted leather sofas and the bar in the background"',
    de: 'alt="Weisse Capitonné-Sofas und die Bar im Hintergrund"',
  },
  'alt="Privé Rosa"':          { en: 'alt="Privé Rosa"',         de: 'alt="Privé Rosa"' },
  'alt="Privé con tenda"':     { en: 'alt="Private room with curtain"', de: 'alt="Privater Raum mit Vorhang"' },
  'alt="Dettaglio sala principale"': {
    en: 'alt="Main room detail"',
    de: 'alt="Detail des Hauptraums"',
  },
  'alt="Angolo con quadro e camino"': {
    en: 'alt="Corner with painting and fireplace"',
    de: 'alt="Ecke mit Gemälde und Kamin"',
  },
  'alt="Statua del David"': {
    en: 'alt="Statue of David"',
    de: 'alt="David-Statue"',
  },
  "alt=\"Vista sotto l'arco verso il palco\"": {
    en: 'alt="View under the arch toward the stage"',
    de: 'alt="Blick unter dem Bogen zur Bühne"',
  },
  "alt=\"Corridoio d'ingresso\"": {
    en: 'alt="Entrance corridor"',
    de: 'alt="Eingangskorridor"',
  },
  'alt="Porta esterna del club"': {
    en: 'alt="Outer door of the club"',
    de: 'alt="Aussentür des Clubs"',
  },

  /* ============ Per essere ospiti ============ */
  '>Per essere ospiti</p>': { en: '>Be a guest</p>', de: '>Zu Gast sein</p>' },
  "L'accesso<br>passa da una telefonata.": {
    en: 'Access<br>begins with a phone call.',
    de: 'Der Zugang<br>beginnt mit einem Anruf.',
  },
  "Lux Night non si prenota online. Si chiama, si scrive, si lascia un nome.\n      La direzione risponde personalmente, valuta la disponibilità e conferma il tavolo.\n      <em>Sempre.</em>": {
    en: "Lux Night does not take online bookings. You call, you write, you leave a name.\n      The management answers personally, checks availability and confirms the table.\n      <em>Always.</em>",
    de: "Lux Night nimmt keine Online-Reservierungen entgegen. Man ruft an, schreibt, hinterlässt einen Namen.\n      Die Direktion antwortet persönlich, prüft die Verfügbarkeit und bestätigt den Tisch.\n      <em>Stets.</em>",
  },
  'Per eventi privati, ricorrenze e ospitalità su misura,<br>contattare direttamente la direzione.': {
    en: 'For private events, anniversaries and tailored hospitality,<br>please contact the management directly.',
    de: 'Für Privatveranstaltungen, Jubiläen und massgeschneiderte Gastfreundschaft<br>wenden Sie sich bitte direkt an die Direktion.',
  },

  /* ============ Newsletter ============ */
  '>Le notti future</p>': { en: '>Future nights</p>', de: '>Künftige Nächte</p>' },
  'Una mail occasionale.': {
    en: 'An occasional email.',
    de: 'Eine gelegentliche E-Mail.',
  },
  "Tre o quattro volte l'anno, mai di più. Le serate speciali, gli ospiti, gli eventi privati.\n      Niente promozioni, niente reminder. Solo ciò che merita di essere atteso.": {
    en: "Three or four times a year, never more. Special nights, guests, private events.\n      No promotions, no reminders. Only what is worth waiting for.",
    de: "Drei- oder viermal im Jahr, nie mehr. Besondere Abende, Gäste, Privatveranstaltungen.\n      Keine Aktionen, keine Erinnerungen. Nur das, worauf zu warten sich lohnt.",
  },
  'value="Nuova iscrizione · Newsletter Lux Night"': {
    en: 'value="New subscription · Lux Night newsletter"',
    de: 'value="Neue Anmeldung · Lux Night Newsletter"',
  },
  'placeholder="il vostro indirizzo email"': {
    en: 'placeholder="your email address"',
    de: 'placeholder="Ihre E-Mail-Adresse"',
  },
  '>Email</label>':     { en: '>Email</label>', de: '>E-Mail</label>' },
  '>Iscriviti</button>': { en: '>Subscribe</button>', de: '>Abonnieren</button>' },
  'Nessuno spam, cancellazione in un click.': {
    en: 'No spam. One-click unsubscribe.',
    de: 'Kein Spam. Abmeldung mit einem Klick.',
  },
  '<a href="privacy.html">Privacy</a>.': {
    en: '<a href="privacy.html">Privacy</a>.',
    de: '<a href="privacy.html">Datenschutz</a>.',
  },
  "Grazie. Riceverà a breve un'email di conferma.": {
    en: 'Thank you. You will shortly receive a confirmation email.',
    de: 'Danke. Sie erhalten in Kürze eine Bestätigungs-E-Mail.',
  },

  /* ============ Le ore / map ============ */
  '>Le ore</p>': { en: '>The hours</p>', de: '>Die Stunden</p>' },
  "L'accesso comincia<br>quando la città si spegne.": {
    en: 'Access begins<br>when the city goes dark.',
    de: 'Der Zugang beginnt,<br>wenn die Stadt erlischt.',
  },
  '<span>Mercoledì</span>': { en: '<span>Wednesday</span>', de: '<span>Mittwoch</span>' },
  '<span>Giovedì</span>':   { en: '<span>Thursday</span>',  de: '<span>Donnerstag</span>' },
  '<span>Venerdì</span>':   { en: '<span>Friday</span>',    de: '<span>Freitag</span>' },
  '<span>Sabato</span>':    { en: '<span>Saturday</span>',  de: '<span>Samstag</span>' },
  'Parcheggio gratuito sul retro · Servizio NCC su richiesta': {
    en: 'Complimentary parking at the rear · Chauffeur service on request',
    de: 'Kostenloser Parkplatz hinter dem Gebäude · Chauffeurdienst auf Anfrage',
  },
  '"map-frame__label">Lux Night · Balerna<':   { en: '"map-frame__label">Lux Night · Balerna<', de: '"map-frame__label">Lux Night · Balerna<' },
  '>Indicazioni ↗</a>': { en: '>Directions ↗</a>', de: '>Wegbeschreibung ↗</a>' },

  /* ============ Bottom bar ============ */
  '>Chiama</span>':                { en: '>Call</span>',     de: '>Anrufen</span>' },
  '>WhatsApp</span>':              { en: '>WhatsApp</span>', de: '>WhatsApp</span>' },
  '>Maps</span>':                  { en: '>Maps</span>',     de: '>Karte</span>' },
  'aria-label="Contatti rapidi"':  { en: 'aria-label="Quick contact"', de: 'aria-label="Schnellkontakt"' },
  'aria-label="Chiama Lux Night"': { en: 'aria-label="Call Lux Night"', de: 'aria-label="Lux Night anrufen"' },
  'aria-label="Chiama"':           { en: 'aria-label="Call"', de: 'aria-label="Anrufen"' },
  'aria-label="WhatsApp Lux Night"': { en: 'aria-label="WhatsApp Lux Night"', de: 'aria-label="Lux Night WhatsApp"' },
  'aria-label="WhatsApp"':         { en: 'aria-label="WhatsApp"', de: 'aria-label="WhatsApp"' },
  'aria-label="Indicazioni stradali"': { en: 'aria-label="Driving directions"', de: 'aria-label="Wegbeschreibung"' },
  'Buonasera%2C%20vorrei%20prenotare%20un%20tavolo%20al%20Lux%20Night.': {
    en: 'Good%20evening%2C%20I%20would%20like%20to%20book%20a%20table%20at%20Lux%20Night.',
    de: 'Guten%20Abend%2C%20ich%20m%C3%B6chte%20einen%20Tisch%20im%20Lux%20Night%20reservieren.',
  },

  /* ============ Lightbox controls ============ */
  '>Chiudi</button>':       { en: '>Close</button>',    de: '>Schliessen</button>' },
  'aria-label="Chiudi"':    { en: 'aria-label="Close"', de: 'aria-label="Schliessen"' },
  'aria-label="Precedente"': { en: 'aria-label="Previous"', de: 'aria-label="Vorheriges"' },
  'aria-label="Successiva"': { en: 'aria-label="Next"',     de: 'aria-label="Nächstes"' },

  /* ============ JSON-LD ============ */
  '"description": "Private club in Balerna, Canton Ticino. By invitation, by reservation.",': {
    en: '"description": "Private club in Balerna, Canton Ticino. By invitation, by reservation.",',
    de: '"description": "Privatclub in Balerna, Kanton Tessin. Auf Einladung, nach Reservierung.",',
  },

  /* ============ Privacy page ============ */
  'Privacy — Lux Night': {
    en: 'Privacy — Lux Night',
    de: 'Datenschutz — Lux Night',
  },
  'Informativa privacy di Lux Night ai sensi della nuova Legge svizzera sulla protezione dei dati (nLPD).': {
    en: 'Lux Night privacy notice under the revised Swiss Federal Act on Data Protection (FADP).',
    de: 'Datenschutzerklärung von Lux Night gemäss revidiertem Schweizer Datenschutzgesetz (revDSG).',
  },
  '>Privacy</a>':           { en: '>Privacy</a>',  de: '>Datenschutz</a>' },
  '>Privacy</h1>':          { en: '>Privacy</h1>', de: '>Datenschutz</h1>' },
  '>Impressum</a>':         { en: '>Impressum</a>', de: '>Impressum</a>' },
  '>Impressum</h1>':        { en: '>Impressum</h1>', de: '>Impressum</h1>' },
  '>Home</a>':              { en: '>Home</a>',     de: '>Startseite</a>' },
  '>Informativa</p>':       { en: '>Notice</p>',   de: '>Hinweis</p>' },
  '>Note legali</p>':       { en: '>Legal notice</p>', de: '>Rechtliche Hinweise</p>' },
  '← Torna alla home':      { en: '← Back to home', de: '← Zurück zur Startseite' },

  /* Privacy body — semplificato: tradurre nei prossimi step manualmente
     se il cliente vuole policy proprie in EN/DE. Per ora redirecto al titolare. */
};

const FILES = ['index.html', 'privacy.html', 'impressum.html'];
const LOCS  = ['en', 'de'];

for (const loc of LOCS) {
  for (const file of FILES) {
    const fp = path.join(ROOT, loc, file);
    if (!fs.existsSync(fp)) continue;
    let html = fs.readFileSync(fp, 'utf8');
    let count = 0;
    for (const [src, trans] of Object.entries(T)) {
      if (!(loc in trans)) continue;
      if (html.includes(src)) {
        html = html.split(src).join(trans[loc]);
        count++;
      }
    }
    fs.writeFileSync(fp, html);
    console.log(`  ${loc}/${file} — ${count} strings translated`);
  }
}
console.log('Done.');
