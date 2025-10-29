import { $, el } from './utils/dom.js';
import { getStore, delStore } from './utils/storage.js';
import { isCard, isExpiry, isCvc } from './utils/validate.js';
import { getTrip } from './api.js';
import './components.js';

const toMoney = (n) => `$${Number(n).toFixed(0)}`;

const mountSummary = () => {
  const cart = getStore('cart');
  const sum = $('#pay-summary');
  if (!cart) { sum.innerHTML = '<p>No selection found.</p>'; return; }
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
};

document.addEventListener('DOMContentLoaded', () => {
  mountSummary();
  $('#paymentForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    const num = $('#cardNumber').value.trim();
    const exp = $('#cardExpiry').value.trim();
    const cvc = $('#cardCvc').value.trim();
    if (!isCard(num)) return alert('Enter a valid card number');
    if (!isExpiry(exp)) return alert('Enter expiry as MM/YY');
    if (!isCvc(cvc)) return alert('Enter a valid CVC');
    alert('Payment successful!');
    delStore('cart');
    location.href = 'booking.html';
  });
});
