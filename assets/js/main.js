import { $, $$ } from './utils/dom.js';
import { listTrips } from './api.js';
import { populateGrid, observeReveal } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
  // Landing: populate popular grid
  const grid = $('#popular-grid');
  if (grid) {
    const trips = listTrips().slice(0, 6);
    populateGrid(grid, trips);
    // Mark cards as reveal items
    $$('.trip-card', grid).forEach(c => c.classList.add('reveal'));
    observeReveal('.reveal');
  }
});

