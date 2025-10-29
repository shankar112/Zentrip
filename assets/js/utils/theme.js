const KEY = 'zentrip:theme';
const prefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const getTheme = () => localStorage.getItem(KEY) || (prefersDark() ? 'dark' : 'light');
const applyTheme = (t) => { document.documentElement.setAttribute('data-theme', t); localStorage.setItem(KEY, t); };
const toggleTheme = () => { const next = getTheme() === 'dark' ? 'light' : 'dark'; applyTheme(next); return next; };
const initTheme = () => applyTheme(getTheme());
export { initTheme, toggleTheme, getTheme };

