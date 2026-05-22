(() => {
  'use strict';

  /* ---------- Age gate ---------- */
  const ageGate = document.getElementById('age-gate');
  const ageYes  = document.getElementById('age-yes');
  const KEY = 'luxnight_age_ok';

  if (sessionStorage.getItem(KEY) === '1') {
    ageGate.classList.add('is-hidden');
  } else {
    document.body.style.overflow = 'hidden';
  }
  ageYes?.addEventListener('click', () => {
    sessionStorage.setItem(KEY, '1');
    ageGate.classList.add('is-hidden');
    document.body.style.overflow = '';
  });

  /* ---------- Header on scroll ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  navToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Year ---------- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Club status (live aperto/chiuso) ---------- */
  const DAY_NAMES = ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
  const INTERVALS = [
    { start: 3 * 1440 + 22 * 60, end: 4 * 1440 + 4 * 60 },
    { start: 4 * 1440 + 22 * 60, end: 5 * 1440 + 4 * 60 },
    { start: 5 * 1440 + 22 * 60, end: 6 * 1440 + 5 * 60 },
    { start: 6 * 1440 + 22 * 60, end: 7 * 1440 + 5 * 60 },
  ];

  const zurichNow = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Zurich' }));

  const computeStatus = () => {
    const now = zurichNow();
    const nowMSS = now.getDay() * 1440 + now.getHours() * 60 + now.getMinutes();

    for (const i of INTERVALS) {
      const inside  = nowMSS >= i.start && nowMSS < i.end;
      const wrapped = (nowMSS + 7 * 1440) >= i.start && (nowMSS + 7 * 1440) < i.end;
      if (inside || wrapped) {
        const endMSS = inside ? i.end : i.end - 7 * 1440;
        const closeH = Math.floor(endMSS / 60) % 24;
        const closeM = endMSS % 60;
        return {
          open: true,
          label: 'Aperto stanotte',
          sub: `Chiude alle ${String(closeH).padStart(2,'0')}:${String(closeM).padStart(2,'0')}`,
        };
      }
    }

    let minDelta = Infinity, nextStart = null;
    for (const i of INTERVALS) {
      let delta = i.start - nowMSS;
      if (delta <= 0) delta += 7 * 1440;
      if (delta < minDelta) { minDelta = delta; nextStart = i.start; }
    }
    const nextDay = Math.floor(nextStart / 1440) % 7;
    const hours = Math.floor(minDelta / 60);
    const mins  = minDelta % 60;

    let sub;
    if (hours < 1)       sub = `Apre tra ${mins}m`;
    else if (hours < 6)  sub = `Apre tra ${hours}h ${String(mins).padStart(2,'0')}m`;
    else if (hours < 18) sub = `Apre oggi alle 22:00`;
    else                 sub = `Apre ${DAY_NAMES[nextDay]} alle 22:00`;

    return { open: false, label: 'Chiuso ora', sub };
  };

  const statusEl = document.getElementById('club-status');
  const updateStatus = () => {
    if (!statusEl) return;
    const s = computeStatus();
    statusEl.classList.toggle('is-open', s.open);
    statusEl.removeAttribute('data-loading');
    const label = statusEl.querySelector('.club-status__label');
    const sub   = statusEl.querySelector('.club-status__sub');
    if (label) label.textContent = s.label;
    if (sub)   sub.textContent   = s.sub;
  };
  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* ---------- Reveal on scroll ---------- */
  const targets = document.querySelectorAll(
    '.section__title, .prose, .room, .carta__col, .gallery__item, .split__text, .split__media, .meta-list, .contact-block, .hours, .footer__grid, .rule--gold'
  );
  targets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    targets.forEach(el => io.observe(el));
  } else {
    targets.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Lightbox ---------- */
  const items = Array.from(document.querySelectorAll('[data-lightbox]'));
  const lightbox = document.getElementById('lightbox');
  const lbImg   = lightbox.querySelector('.lightbox__img');
  const lbPrev  = lightbox.querySelector('.lightbox__prev');
  const lbNext  = lightbox.querySelector('.lightbox__next');
  const lbClose = lightbox.querySelector('.lightbox__close');
  let idx = 0;

  const show = (i) => {
    idx = (i + items.length) % items.length;
    const a = items[idx];
    lbImg.src = a.getAttribute('href');
    lbImg.alt = a.querySelector('img')?.alt || '';
  };
  const open  = (i) => {
    show(i);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  };

  items.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); open(i); }));
  lbPrev.addEventListener('click', () => show(idx - 1));
  lbNext.addEventListener('click', () => show(idx + 1));
  lbClose.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* swipe on mobile */
  let touchX = null;
  lightbox.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend',   (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });
})();
