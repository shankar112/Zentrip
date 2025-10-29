// Lightweight validation utils
const isEmail = (s) => /.+@.+\..+/.test(String(s).toLowerCase());
const isCard = (s) => /^(?:\d[ -]*?){13,19}$/.test(s.replace(/\s|-/g, ''));
const isExpiry = (s) => /^(0[1-9]|1[0-2])\/(\d{2})$/.test(s);
const isCvc = (s) => /^\d{3,4}$/.test(s);
export { isEmail, isCard, isExpiry, isCvc };

