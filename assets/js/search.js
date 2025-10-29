import { $, $$, el } from './utils/dom.js';
import { listTrips } from './api.js';
import { populateGrid } from './components.js';

const state = { q:'', tag:'', sort:'pop', page:1, pageSize:6 };

const readParams = () => {
  const u = new URL(location.href);
  state.q = u.searchParams.get('q') || '';
  $('#search').value = state.q;
};

const applyFilters = () => {
  const q = state.q.toLowerCase();
  const tag = state.tag;
  let items = listTrips().filter(t =>
    (!q || t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)) &&
    (!tag || t.tags.includes(tag))
  );
  switch (state.sort) {
    case 'price-asc': items.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': items.sort((a,b)=>b.price-a.price); break;
    case 'rating': items.sort((a,b)=>b.rating-a.rating); break;
    default: /* pop */ items.sort((a,b)=>b.rating*10 - a.price/100 - (a.id>b.id?1:-1));
  }
  return items;
};

const render = () => {
  const all = applyFilters();
  const start = 0, end = state.page * state.pageSize;
  const slice = all.slice(start, end);
  const results = $('#results');
  populateGrid(results, slice);
  $('#resultCount').textContent = `${all.length} result${all.length!==1?'s':''}`;
  const more = $('#loadMore');
  more.classList.toggle('d-none', end >= all.length);
};

document.addEventListener('DOMContentLoaded', () => {
  readParams();
  $('#applyFilters').addEventListener('click', ()=>{
    state.q = $('#search').value.trim();
    state.tag = $('#tag').value;
    state.sort = $('#sort').value;
    state.page = 1; render();
  });
  $('#clearFilters').addEventListener('click', ()=>{
    state.q=''; state.tag=''; state.sort='pop'; state.page=1;
    $('#search').value=''; $('#tag').value=''; $('#sort').value='pop'; render();
  });
  $('#loadMore').addEventListener('click', ()=>{ state.page++; render(); });
  render();
});

