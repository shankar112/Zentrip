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
              <button id="themeToggle" class="btn btn-sm btn-outline-secondary d-inline-flex align-items-center" type="button" aria-label="Toggle theme" title="Toggle theme"></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;

  // Theme wiring
  initTheme();
  const btn = $('#themeToggle');
  if (btn) {
    const sun = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V2m0 20v-2M4.22 4.22L2.81 2.81M21.19 21.19l-1.41-1.41M4 12H2m20 0h-2M4.22 19.78L2.81 21.19M21.19 2.81l-1.41 1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>';
    const moon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="none"/></svg>';
    const setIcon = () => { btn.innerHTML = (getTheme()==='dark') ? sun + '<span class="ms-1">Light</span>' : moon + '<span class="ms-1">Dark</span>'; };
    setIcon();
    btn.addEventListener('click', ()=>{ toggleTheme(); setIcon(); });
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
