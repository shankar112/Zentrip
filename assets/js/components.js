import { $, el } from './utils/dom.js';
import { initTheme, toggleTheme, getTheme } from './utils/theme.js';

// Header/Footer mount
const mountHeader = () => {
  const header = $('#site-header');
  if (!header) return;
  header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark navbar-zen sticky-top">
      <div class="container">
        <a class="navbar-brand brand" href="index.html">ZenTrip</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navMenu" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li class="nav-item"><a class="nav-link" href="destinations.html">Destinations</a></li>
            <li class="nav-item"><a class="nav-link" href="booking.html">Booking</a></li>
            <li class="nav-item"><a class="nav-link" href="checkout.html">Checkout</a></li>
            <li class="nav-item ms-lg-2">
              <button id="themeToggle" class="theme-toggle" type="button" aria-label="Toggle theme" title="Toggle theme">
                <span class="icon sun" aria-hidden="true"></span>
                <span class="icon moon" aria-hidden="true"></span>
                <span class="knob"></span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;

  // Theme wiring
  initTheme();
  const btn = $('#themeToggle');
  if (btn) {
    const setState = () => {
      const dark = getTheme() === 'dark';
      btn.classList.toggle('on', dark);
    };
    setState();
    btn.addEventListener('click', ()=>{ toggleTheme(); setState(); });
  }
};

const mountFooter = () => {
  const footer = $('#site-footer');
  if (!footer) return;
  const y = new Date().getFullYear();
  footer.innerHTML = `
    <div class="container py-4">
      <div class="row g-3 align-items-center">
        <div class="col-md-8">
          <div class="footer-links small">
            <a href="destinations.html">Destinations</a> &middot;
            <a href="booking.html">Booking</a> &middot;
            <a href="#">Support</a>
          </div>
        </div>
        <div class="col-md-4 text-md-end small">© ${y} ZenTrip</div>
      </div>
    </div>`;
};

// Trip card renderer
const tripCard = (t) => {
  const a = el('a', { href: `package.html?id=${t.id}`, class: 'col-12 col-sm-6 col-lg-4 text-reset' });
  const card = el('div', { class: 'card-zen trip-card h-100' });
  const img = el('img', { class: 'trip-thumb', alt: t.name, loading: 'lazy', src: t.hero });
  img.onerror = () => { img.src = `https://picsum.photos/seed/${t.id}/1200/800`; };
  const body = el('div', { class: 'p-3' });
  body.append(
    el('div', { class: 'd-flex justify-content-between align-items-start mb-1' }, [
      el('div', { class: 'title' }, [document.createTextNode(t.name)]),
      el('div', { class: 'stars small' }, [document.createTextNode('★ ' + t.rating)])
    ]),
    el('div', { class: 'meta small' }, [document.createTextNode(t.location + ' · ' + t.duration)]),
    el('div', { class: 'd-flex justify-content-between align-items-center mt-2' }, [
      el('span', { class: 'price fw-semibold' }, [document.createTextNode('$' + t.price)]),
      el('div', { class: 'd-flex gap-1' }, t.tags.slice(0,2).map(tag => el('span', { class: 'badge rounded-pill badge-zen' }, [document.createTextNode(tag)])))
    ])
  );
  card.append(img, body);
  a.append(card);
  return a;
};

// Populate grid with N items
const populateGrid = (container, items) => {
  container.innerHTML = '';
  items.forEach(t => container.append(tripCard(t)));
};

// Reveal on scroll
const observeReveal = (selector = '.reveal') => {
  const els = document.querySelectorAll(selector);
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target);} });
  }, { threshold: .15 });
  els.forEach(e => io.observe(e));
};

// Mount header/footer on DOM ready
document.addEventListener('DOMContentLoaded', () => { mountHeader(); mountFooter(); });

export { tripCard, populateGrid, observeReveal };
