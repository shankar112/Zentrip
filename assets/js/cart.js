import { $, el } from './utils/dom.js';
import { getTrip } from './api.js';
import { setStore, getStore } from './utils/storage.js';
import './components.js';

const CKEY = 'cart';

const toMoney = (n) => `$${Number(n).toFixed(0)}`;

// PDP logic
const mountPdp = () => {
  const u = new URL(location.href);
  const id = u.searchParams.get('id');
  const trip = getTrip(id) || getTrip('bali-escape');
  if (!trip) return;
  // Fill content
  $('#pdp-title').textContent = trip.name;
  $('#pdp-meta').textContent = `${trip.location} · ${trip.duration} · ★ ${trip.rating}`;
  $('#pdp-price').textContent = toMoney(trip.price);
  $('#pdp-desc').innerHTML = `<p class="mb-0">${trip.blurb}</p>`;
  const hero = $('#pdp-hero');
  hero.src = trip.hero;
  hero.onerror = () => { hero.src = `https://picsum.photos/seed/${trip.id}/1200/800`; };
  const includes = ['Stays','Breakfast','Airport transfer','Local guide'];
  const ul = $('#pdp-includes');
  ul.innerHTML = includes.map(i=>`<li>${i}</li>`).join('');
  // Schema
  const schema = {
    '@context':'https://schema.org', '@type':'Product', name:trip.name,
    image:trip.hero, description:trip.blurb, brand:'ZenTrip',
    aggregateRating:{ '@type':'AggregateRating', ratingValue:trip.rating, reviewCount:128 },
    offers:{ '@type':'Offer', price:trip.price, priceCurrency:'USD', availability:'https://schema.org/InStock' }
  };
  $('#pdp-schema').textContent = JSON.stringify(schema);
  // Add to cart
  $('#addToCart').addEventListener('click', ()=>{
    const date = $('#pdp-date').value || new Date().toISOString().slice(0,10);
    const guests = Number($('#pdp-guests').value || 2);
    setStore(CKEY, { id:trip.id, qty:guests, date });
    location.href = 'checkout.html';
  });
};

// Checkout logic
const mountCheckout = () => {
  const cart = getStore(CKEY);
  const sum = $('#summary');
  if (!cart) { sum.innerHTML = '<p>No trip selected. <a href="destinations.html">Browse trips</a>.</p>'; return; }
  const trip = getTrip(cart.id);
  const total = trip.price * cart.qty;
  sum.innerHTML = `
    <div class="d-flex gap-3 align-items-center">
      <img src="${trip.hero}" alt="${trip.name}" width="84" height="56" style="object-fit:cover;border-radius:8px" />
      <div>
        <div class="fw-semibold">${trip.name}</div>
        <div class="text-muted small">${cart.qty} guests · ${cart.date}</div>
      </div>
      <div class="ms-auto fw-semibold">${toMoney(total)}</div>
    </div>`;

  $('#travelerForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    const firstName = $('#firstName').value.trim();
    const lastName = $('#lastName').value.trim();
    const email = $('#email').value.trim();
    if (!firstName || !lastName || !/.+@.+/.test(email)) return alert('Please complete traveler details.');
    setStore('traveler', { firstName, lastName, email });
    location.href = 'payment.html';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname.endsWith('package.html')) mountPdp();
  if (location.pathname.endsWith('checkout.html')) mountCheckout();
});


