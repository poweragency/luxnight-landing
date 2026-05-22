# Lux Night — Landing

Sito vetrina del club privato **Lux Night** di Balerna (Ticino, CH).
Stack volutamente minimale: HTML + CSS + JavaScript vanilla, nessun build step, nessuna dipendenza npm.

## Struttura

```
.
├── index.html          ← entry point del sito
├── css/style.css
├── js/main.js
├── assets/
│   ├── foto/           ← foto fornite dal cliente
│   └── menu/           ← PDF originale del menù
├── content/
│   └── menu.md         ← trascrizione testuale del menù
├── BRIEF.md            ← brief progetto, identità, contatti, fonti, contesto
└── README.md           ← questo file
```

Il sito è in root per essere direttamente pubblicabile via **GitHub Pages** (Settings → Pages → Source `main` / `/(root)`).

## Sviluppo locale

```bash
python -m http.server 8765
# http://127.0.0.1:8765/
```

## Identità visiva

- Palette: nero carbone `#0A0807`, bordeaux desaturato `#3A1822`, champagne `#C9A86B`, crema `#EDE6D6`, taupe `#9C8B73`
- Tipografia: **Cormorant Garamond** (display) + **Inter** (body), via Google Fonts
- Estetica: members-only, private club, no neon

## Deploy

Il sito è completamente statico. Compatibile con qualsiasi static host: Netlify, Vercel, Cloudflare Pages, GitHub Pages, hosting tradizionale.

Per il deploy basta caricare il contenuto della cartella `site/` insieme a `assets/` mantenendo la stessa struttura relativa (le foto sono referenziate via `../assets/foto/`).

## Contatti del locale

- **Indirizzo**: Via San Gottardo 111, 6828 Balerna · CH
- **Telefono**: +41 91 682 55 59
- **Email**: info@luxnight.ch
- **Sito**: www.luxnight.ch
