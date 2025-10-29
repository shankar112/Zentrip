// Local storage helpers (namespaced)
const NS = 'zentrip:';
const setStore = (k, v) => localStorage.setItem(NS + k, JSON.stringify(v));
const getStore = (k, def = null) => {
  try { const v = localStorage.getItem(NS + k); return v ? JSON.parse(v) : def; } catch { return def; }
};
const delStore = (k) => localStorage.removeItem(NS + k);
export { setStore, getStore, delStore };

