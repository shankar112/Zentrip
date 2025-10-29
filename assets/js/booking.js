import { $, el } from './utils/dom.js';
import { listTrips, getTrip } from './api.js';
import { setStore } from './utils/storage.js';
import './components.js';

const toMoney = (n) => `$${Number(n).toFixed(0)}`;
const estimate = (base, guests) => base * guests;

const mountTrips = () => {
  const sel = $('#tripSelect');
  sel.innerHTML = '';
  listTrips().forEach(t => sel.append(new Option(`${t.name} - ${t.location}`, t.id)));
};

const updateQuote = () => {
  const id = $('#tripSelect').value;
  const guests = Number($('#bkGuests').value || 1);
  const date = $('#bkDate').value || new Date().toISOString().slice(0,10);
  const t = getTrip(id);
  if (!t) return;
  const total = estimate(t.price, guests);
  $('#quote').innerHTML = `
    <div class="d-flex align-items-center gap-3">
      <img src="${t.hero}" alt="${t.name}" width="84" height="56" style="object-fit:cover;border-radius:8px" />
      <div>
        <div class="fw-semibold">${t.name}</div>
        <div class="text-muted small">${guests} guests · ${date}</div>
      </div>
      <div class="ms-auto fw-semibold">${toMoney(total)}</div>
    </div>
    <div class="d-flex gap-2 mt-3">
      <button id="quoteCheckout" class="btn btn-primary btn-sm" type="button">Proceed to Checkout</button>
      <a id="quoteDetails" class="btn btn-outline-secondary btn-sm" href="package.html?id=${t.id}">Details</a>
    </div>`;

  const cta = $('#quoteCheckout');
  if (cta) cta.addEventListener('click', () => {
    setStore('cart', { id: t.id, qty: guests, date });
    location.href = 'checkout.html';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  mountTrips();
  updateQuote();
  $('#tripSelect').addEventListener('change', updateQuote);
  $('#bkGuests').addEventListener('input', updateQuote);
  $('#bkDate').addEventListener('change', updateQuote);
  $('#bookingForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    updateQuote();
  });
});

