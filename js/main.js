(() => {
  'use strict';

  /* ---------- Age gate ---------- */
  const ageGate = document.getElementById('age-gate');
  const ageYes  = document.getElementById('age-yes');
  const KEY = 'luxnight_age_ok';

  if (ageGate) {
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
  }

  /* ---------- Header on scroll ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

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

  /* ---------- Language dropdown ---------- */
  const langSwitch = document.querySelector('[data-lang-switch]');
  if (langSwitch) {
    const btn  = langSwitch.querySelector('.lang-switch__current');
    const menu = langSwitch.querySelector('.lang-switch__menu');
    let hideTimer = null;

    const setOpen = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      if (open) {
        if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
        // 1) take it out of [hidden] so it can transition (starts at opacity:0)
        menu.hidden = false;
        // 2) force a reflow so the browser sees the initial state
        void menu.offsetWidth;
        // 3) flip data-open → CSS transitions opacity/transform
        requestAnimationFrame(() => {
          langSwitch.setAttribute('data-open', 'true');
        });
      } else {
        langSwitch.setAttribute('data-open', 'false');
        hideTimer = setTimeout(() => { menu.hidden = true; hideTimer = null; }, 260);
      }
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });
    document.addEventListener('click', (e) => {
      if (!langSwitch.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  }

  /* ---------- Year ---------- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Club status (live aperto/chiuso) ---------- */
  const LANG = (document.documentElement.lang || 'it').slice(0, 2).toLowerCase();
  const I18N_STATUS = {
    it: {
      days: ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'],
      open:   'Aperto stanotte',
      closed: 'Chiuso ora',
      closes: (hm) => `Chiude alle ${hm}`,
      inMin:  (m)  => `Apre tra ${m}m`,
      inH:    (h, m) => `Apre tra ${h}h ${String(m).padStart(2,'0')}m`,
      today:  () => 'Apre oggi alle 22:00',
      onDay:  (d) => `Apre ${d} alle 22:00`,
    },
    en: {
      days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      open:   'Open tonight',
      closed: 'Closed now',
      closes: (hm) => `Closes at ${hm}`,
      inMin:  (m)  => `Opens in ${m}m`,
      inH:    (h, m) => `Opens in ${h}h ${String(m).padStart(2,'0')}m`,
      today:  () => 'Opens today at 22:00',
      onDay:  (d) => `Opens ${d} at 22:00`,
    },
    de: {
      days: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
      open:   'Heute Nacht geöffnet',
      closed: 'Jetzt geschlossen',
      closes: (hm) => `Schliesst um ${hm}`,
      inMin:  (m)  => `Öffnet in ${m}m`,
      inH:    (h, m) => `Öffnet in ${h}h ${String(m).padStart(2,'0')}m`,
      today:  () => 'Öffnet heute um 22:00',
      onDay:  (d) => `Öffnet am ${d} um 22:00`,
    },
  };
  const T = I18N_STATUS[LANG] || I18N_STATUS.it;

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
        const hm = `${String(closeH).padStart(2,'0')}:${String(closeM).padStart(2,'0')}`;
        return { open: true, label: T.open, sub: T.closes(hm) };
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
    if (hours < 1)       sub = T.inMin(mins);
    else if (hours < 6)  sub = T.inH(hours, mins);
    else if (hours < 18) sub = T.today();
    else                 sub = T.onDay(T.days[nextDay]);

    return { open: false, label: T.closed, sub };
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

  /* ---------- Newsletter (AJAX submit a Formsubmit.co) ---------- */
  const nlForm    = document.getElementById('newsletter-form');
  const nlSuccess = document.getElementById('newsletter-success');
  const showSuccess = () => {
    if (!nlForm || !nlSuccess) return;
    const row    = nlForm.querySelector('.newsletter__row');
    const legal  = nlForm.querySelector('.newsletter__legal');
    if (row)   row.style.display    = 'none';
    if (legal) legal.style.display  = 'none';
    nlSuccess.hidden = false;
  };
  if (new URLSearchParams(window.location.search).get('subscribed') === '1') {
    showSuccess();
  }
  nlForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(nlForm.action, {
        method: 'POST',
        body: new FormData(nlForm),
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) showSuccess();
      else nlForm.submit();
    } catch (err) {
      nlForm.submit();
    }
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const items   = Array.from(document.querySelectorAll('[data-lightbox]'));
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
    lbPrev?.addEventListener('click', () => show(idx - 1));
    lbNext?.addEventListener('click', () => show(idx + 1));
    lbClose?.addEventListener('click', close);
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
  }
})();
