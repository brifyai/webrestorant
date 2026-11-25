'use strict';

const FLAME = 'https://cdn.jiro.build/hibana/all-svg/icon-flame.svg';
const STAR = 'https://cdn.jiro.build/hibana/all-svg/icon-star.svg';

const MENU = {
  grill: {
    label: 'From the grill',
    items: [
      ['Tsukune & yolk', 14, 'Hand-chopped chicken, glossy tare, a cured yolk for dunking.'],
      ['Negima', 11, 'Thigh and spring onion, salt and a squeeze of lemon.'],
      ['Pork belly', 13, 'Brined for a day, crisped over the hottest coals.'],
      ['Chicken hearts', 9, 'Peppery, charred, gone in two bites.'],
      ['Wagyu rump', 22, 'Pink in the middle, wasabi and smoked salt.'],
      ['King oyster', 10, 'Thick mushroom, white miso butter, shiso.'],
      ['Ocean trout', 16, 'Skin blistered, salt and lemon only.'],
      ['Corn & butter', 8, 'Sweetcorn ribs brushed with soy butter.'],
    ],
  },
  plates: {
    label: 'Small plates',
    items: [
      ['Smashed cucumber', 9, 'Sesame, chilli oil, rice vinegar.'],
      ['Karaage', 15, 'Twice-fried thigh, kewpie, lemon.'],
      ['Yaki onigiri', 8, 'Grilled rice ball brushed with tare.'],
      ['Pickles', 6, 'House pickles, changes weekly.'],
    ],
  },
  drinks: {
    label: 'To drink',
    items: [
      ['Highball', 14, 'Japanese whisky, soda, lemon peel.'],
      ['Draft lager', 10, 'Ice-cold, in a frosted glass.'],
      ['Sake flight', 22, 'Three pours, from crisp to cloudy.'],
      ['Yuzu soda', 7, 'House-made, not too sweet.'],
    ],
  },
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ---------- Buttons: build fill + rolling label ---------- */
function buildButtons() {
  $$('.btn[data-label]').forEach((btn) => {
    const label = btn.dataset.label;
    const fill = el('span', 'btn-fill');
    const text = el('span', 'btn-text');
    text.append(el('span', '', label), el('span', '', label));
    btn.append(fill, text);
  });
}

/* ---------- Split headings into words ---------- */
function splitHeadings() {
  $$('[data-split]').forEach((heading) => {
    const lines = heading.textContent.split('|');
    heading.setAttribute('aria-label', lines.join(' '));
    heading.textContent = '';
    let index = 0;
    lines.forEach((line) => {
      const lineEl = el('span', 'line');
      lineEl.setAttribute('aria-hidden', 'true');
      line.trim().split(/\s+/).forEach((word, i) => {
        if (i > 0) lineEl.append(' ');
        const w = el('span', 'word', word);
        w.style.transitionDelay = `${index * 70}ms`;
        index += 1;
        lineEl.append(w);
      });
      heading.append(lineEl);
    });
  });
}

/* ---------- Menu rendering ---------- */
function dishNode([name, price, desc]) {
  const dish = el('div', 'dish');
  const top = el('div', 'dish-top');
  const btn = el('button', 'price');
  btn.type = 'button';
  btn.dataset.add = name;
  btn.dataset.qty = '2';
  btn.setAttribute('aria-label', `Add two ${name} to the bag ($${price} each)`);
  const inner = el('span', 'price-inner');
  inner.append(el('span', '', `$${price}`), el('span', '', '+2'));
  btn.append(inner);
  top.append(el('p', 'dish-name', name), btn);
  dish.append(top, el('p', 'dish-desc', desc));
  return dish;
}

function renderMenus() {
  const list = $('[data-menu-list]');
  if (list) {
    MENU.grill.items.forEach((item, i) => {
      const node = dishNode(item);
      node.setAttribute('data-reveal', '');
      node.style.transitionDelay = `${(i % 2) * 80}ms`;
      list.append(node);
    });
  }
  const full = $('[data-full-menu]');
  if (full) {
    Object.values(MENU).forEach((group) => {
      const wrap = el('div', 'menu-group');
      const pill = el('span', 'pill');
      const img = el('img');
      img.src = FLAME;
      img.alt = '';
      pill.append(img, group.label);
      const grid = el('div', 'menu-group-grid');
      group.items.forEach((item) => grid.append(dishNode(item)));
      wrap.append(pill, grid);
      full.append(wrap);
    });
  }
}

/* ---------- Marquees ---------- */
function buildMarquees() {
  $$('[data-marquee]').forEach((section) => {
    const phrases = section.dataset.marquee.split('|');
    const track = el('div', 'marquee-track');
    for (let g = 0; g < 4; g += 1) {
      const group = el('div', 'marquee-group');
      if (g > 0) group.setAttribute('aria-hidden', 'true');
      phrases.forEach((phrase) => {
        const item = el('span', 'marquee-item');
        const img = el('img');
        img.src = FLAME;
        img.alt = '';
        item.append(el('span', '', phrase), img);
        group.append(item);
      });
      track.append(group);
    }
    section.append(track);
  });
}

/* ---------- Stars ---------- */
function buildStars() {
  $$('[data-stars]').forEach((box) => {
    box.setAttribute('aria-label', '5 out of 5 stars');
    for (let i = 0; i < 5; i += 1) {
      const img = el('img');
      img.src = STAR;
      img.alt = '';
      img.style.transitionDelay = `${i * 60}ms`;
      box.append(img);
    }
  });
}

/* ---------- Footer giant word ---------- */
function buildGiant() {
  const giant = $('[data-giant]');
  if (!giant) return;
  const word = giant.textContent.trim();
  giant.textContent = '';
  [...word].forEach((ch, i) => {
    const outer = el('span', 'g-letter');
    outer.setAttribute('aria-hidden', 'true');
    outer.style.transitionDelay = `${i * 70}ms`;
    outer.append(el('span', 'g-inner', ch));
    giant.append(outer);
  });
}

/* ---------- Reveal on scroll ---------- */
function observeReveals() {
  const targets = [...$$('[data-reveal]'), ...$$('[data-split]'), $('[data-giant]')].filter(Boolean);
  if (!('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  targets.forEach((t) => io.observe(t));
}

/* ---------- Count-up stats ---------- */
function countUps() {
  const nums = $$('[data-count]');
  const run = (node) => {
    const to = Number(node.dataset.count);
    const from = Number(node.dataset.from || 0);
    const suffix = node.dataset.suffix || '';
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      node.textContent = `${Math.round(from + (to - from) * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  nums.forEach((n) => io.observe(n));
}

/* ---------- Header: hide on scroll down, mobile menu ---------- */
function header() {
  const head = $('[data-header]');
  const burger = $('[data-burger]');
  const nav = $('[data-mobile-nav]');
  let lastY = window.scrollY;

  const setOpen = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    $$('a', nav).forEach((a, i) => { a.style.transitionDelay = open ? `${60 + i * 50}ms` : '0ms'; });
  };

  burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', nav).forEach((a) => a.addEventListener('click', () => setOpen(false)));

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const menuOpen = nav.classList.contains('is-open');
    head.classList.toggle('is-scrolled', y > 10);
    head.classList.toggle('is-hidden', !menuOpen && y > lastY && y > 300);
    lastY = y;
  }, { passive: true });
}

/* ---------- Cart ---------- */
function cart() {
  const countEl = $('[data-cart-count]');
  const cartLink = countEl.closest('.cart');
  const toast = $('[data-toast]');
  let count = 0;
  let toastTimer = 0;

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest('[data-add]') : null;
    if (!target) return;
    const qty = Number(target.dataset.qty || 1);
    count += qty;
    countEl.textContent = String(count);
    cartLink.setAttribute('aria-label', `Cart, ${count} items`);
    cartLink.classList.remove('bump');
    void cartLink.offsetWidth; // restart animation
    cartLink.classList.add('bump');
    toast.textContent = `+${qty} ${target.dataset.add} added to your bag`;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-on'), 2200);
  });
}

/* ---------- Full menu modal ---------- */
function modal() {
  const dialog = $('[data-modal]');
  const closeBtn = $('[data-close-menu]');
  let lastFocus = null;
  const open = () => {
    lastFocus = document.activeElement;
    dialog.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };
  const close = () => {
    dialog.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocus instanceof HTMLElement) lastFocus.focus();
  };
  $$('[data-open-menu]').forEach((b) => b.addEventListener('click', open));
  closeBtn.addEventListener('click', close);
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && dialog.classList.contains('is-open')) close(); });
}

/* ---------- Tare bottle tilt + word parallax ---------- */
function tareTilt() {
  const area = $('[data-tilt-area]');
  const bottle = $('[data-tilt]');
  const words = $$('[data-parallax]');
  if (!area || !bottle || !window.matchMedia('(hover: hover)').matches) return;
  area.addEventListener('pointermove', (e) => {
    const r = area.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    bottle.style.transform = `rotateY(${x * 24}deg) rotateX(${-y * 14}deg) rotate(${x * 4}deg)`;
    words.forEach((w) => { w.style.transform = `translateY(${y * 60 * Number(w.dataset.parallax)}px)`; });
  });
  area.addEventListener('pointerleave', () => {
    bottle.style.transform = '';
    words.forEach((w) => { w.style.transform = ''; });
  });
}

/* ---------- Draggable polaroids (board scales to fit) ---------- */
function polaroids() {
  const board = $('[data-board]');
  if (!board) return;
  const wrap = board.parentElement;
  const fit = () => {
    const scale = Math.min(1, wrap.clientWidth / 640);
    board.style.transform = `scale(${scale})`;
    wrap.style.height = `${620 * scale}px`;
    board.dataset.scale = String(scale);
  };
  fit();
  window.addEventListener('resize', fit);

  let z = 10;
  $$('[data-drag]', board).forEach((card) => {
    let startX = 0; let startY = 0; let baseX = 0; let baseY = 0;
    card.addEventListener('pointerdown', (e) => {
      const scale = Number(board.dataset.scale || 1);
      card.setPointerCapture(e.pointerId);
      card.classList.add('is-dragging');
      z += 1;
      card.style.zIndex = String(z);
      startX = e.clientX / scale; startY = e.clientY / scale;
      baseX = parseFloat(card.style.getPropertyValue('--dx')) || 0;
      baseY = parseFloat(card.style.getPropertyValue('--dy')) || 0;
    });
    card.addEventListener('pointermove', (e) => {
      if (!card.classList.contains('is-dragging')) return;
      const scale = Number(board.dataset.scale || 1);
      card.style.setProperty('--dx', `${baseX + e.clientX / scale - startX}px`);
      card.style.setProperty('--dy', `${baseY + e.clientY / scale - startY}px`);
    });
    const end = () => card.classList.remove('is-dragging');
    card.addEventListener('pointerup', end);
    card.addEventListener('pointercancel', end);
  });
}

/* ---------- Reviews carousel ---------- */
function reviews() {
  const track = $('[data-reviews]');
  const dotsBox = $('[data-dots]');
  if (!track || !dotsBox) return;
  const slides = $$('.review-slide', track);
  const dots = slides.map((_, i) => {
    const b = el('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Show review ${i + 1}`);
    b.addEventListener('click', () => {
      track.scrollTo({ left: slides[i].offsetLeft - (track.clientWidth - slides[i].clientWidth) / 2, behavior: 'smooth' });
    });
    dotsBox.append(b);
    return b;
  });
  const setActive = (i) => {
    slides.forEach((s, j) => s.classList.toggle('is-active', i === j));
    dots.forEach((d, j) => d.classList.toggle('is-active', i === j));
  };
  setActive(0);

  const desktop = window.matchMedia('(min-width: 1024px)');
  slides.forEach((s, i) => s.addEventListener('mouseenter', () => { if (desktop.matches) setActive(i); }));
  track.addEventListener('scroll', () => {
    if (desktop.matches) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0; let bestDist = Infinity;
    slides.forEach((s, i) => {
      const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setActive(best);
  }, { passive: true });
}

/* ---------- Opening hours: highlight today ---------- */
function hours() {
  const day = new Date().getDay();
  $$('[data-days]').forEach((row) => {
    const days = row.dataset.days.split(',').map(Number);
    if (!days.includes(day)) return;
    row.classList.add('is-today');
    $('.hr-day', row).append(el('span', 'today', 'Today'));
  });
}

/* ---------- Newsletter ---------- */
function newsletter() {
  const form = $('[data-newsletter]');
  const msg = $('[data-nl-msg]');
  if (!form || !msg) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('input', form);
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    msg.classList.toggle('is-error', !ok);
    msg.textContent = ok ? 'You’re on the list — see you at the grill.' : 'That email doesn’t look right.';
    if (ok) input.value = '';
  });
}

buildButtons();
splitHeadings();
renderMenus();
buildMarquees();
buildStars();
buildGiant();
observeReveals();
countUps();
header();
cart();
modal();
tareTilt();
polaroids();
reviews();
hours();
newsletter();
