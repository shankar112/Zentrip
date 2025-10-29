**ZenTrip Project Report**

**Overview**
- Purpose: A modern, multi‑page travel site to discover destinations, view package details, get instant quotes, and complete a mock checkout/payment.
- Tech: HTML5, CSS3, Bootstrap 5, ES Modules. No build step required.
- Pages: Landing, Destinations (SRP), Package (PDP), Checkout, Payment, Booking Form.
- Data: Client‑side mock dataset, images served from picsum.photos with per‑trip seeds.

**User Flow**
- Landing (`index.html`): Hero with search; Popular Retreats grid; promo banner.
- Destinations (`destinations.html`): Search, filter by vibe, sort, and load more results.
- Package/PDP (`package.html`): Trip hero, description, includes, date/guests; Book Now.
- Checkout (`checkout.html`): Traveler details + summary; proceed to payment.
- Payment (`payment.html`): Card, expiry, CVC validation; mock success.
- Booking Form (`booking.html`): Quick quote generator with “Proceed to Checkout” and “Details”.

**Routing & State**
- Querystring: PDP uses `package.html?id=<tripId>`.
- LocalStorage: Namespaced keys via `assets/js/utils/storage.js`.
  - `zentrip:cart`: `{ id, qty, date }`
  - `zentrip:traveler`: `{ firstName, lastName, email }`
  - `zentrip:theme`: `"dark" | "light"`

**Data Layer**
- `assets/js/api.js`
  - `TRIPS`: In‑memory array of trip objects: `{ id, name, location, price, rating, duration, tags, hero, blurb }`.
  - `listTrips()`: Returns all trips.
  - `getTrip(id)`: Returns a single trip.
  - Images: Stable placeholders from `https://picsum.photos/seed/<id>/1200/800`.

**Utilities**
- `assets/js/utils/dom.js`: Small DOM helpers
  - `$` (querySelector), `$$` (querySelectorAll array), `on` (addEventListener), `el` (createElement).
- `assets/js/utils/storage.js`: LocalStorage helpers
  - `setStore`, `getStore`, `delStore` with JSON handling and namespacing.
- `assets/js/utils/validate.js`: Lightweight validation
  - `isEmail`, `isCard`, `isExpiry`, `isCvc`.
- `assets/js/utils/theme.js`: Theme manager
  - `initTheme`, `toggleTheme`, `getTheme`; persists to `zentrip:theme` and applies `data-theme`.

**Components & Layout**
- `assets/js/components.js`
  - Header: Brand, nav links, icon toggle (`.theme-toggle` sun/moon) with persisted state.
  - Footer: Quick links and copyright year.
  - Trip Card: Renders a card with image, title, rating, meta, tags, price. Adds fallback image on error.
  - Grid helpers: `populateGrid(container, items)`; `observeReveal(selector)` for scroll‑reveals.
  - Auto‑mounts header/footer on `DOMContentLoaded`.

**Pages (Scripts)**
- Landing: `assets/js/main.js`
  - Populates Popular Retreats with `listTrips()`; applies reveal animation classes.

- Destinations/SRP: `assets/js/search.js`
  - State: `{ q, tag, sort, page, pageSize }` (in‑module).
  - Reads initial `q` from URL. `Apply` filters list by name/location + tag.
  - Sort options: popular (rating‑biased), price asc/desc, rating.
  - Pagination: “Load more” grows `page` and re‑renders.

- Package/PDP + Checkout: `assets/js/cart.js`
  - PDP: Reads `id` from URL, fills title/meta/price/desc/hero (+ onerror fallback), sets JSON‑LD schema.
  - “Book Now”: Persists `zentrip:cart` with `{ id, qty, date }`, navigates to Checkout.
  - Checkout: Hydrates cart, renders summary and total, validates traveler form, stores `zentrip:traveler`, then navigates to Payment.

- Payment: `assets/js/payments.js`
  - Loads `zentrip:cart`, renders summary; validates card fields with `validate.js` and shows mock success; clears cart and returns to Booking.

- Booking/Quote: `assets/js/booking.js`
  - Populates trip dropdown from `listTrips()`.
  - Quote: Computes `price * guests`, updates instant quote panel.
  - Actions: “Proceed to Checkout” → saves cart `{ id, qty, date }`; “Details” → opens PDP for selected trip.

**Styling**
- Base styles: `assets/css/base.css`
  - Color tokens for dark (default) and `[data-theme="light"]` overrides.
  - Forms: Higher‑contrast placeholders; focus ring using `--ring`.
  - Hero: backdrop blur and radial accents.
  - Promo banner: `.zen-gradient` with dark gradient + white text by default; Light Mode layered gradient for readability; `.float-shape` visuals.
  - Footer and general utilities.

- Components: `assets/css/components.css`
  - Navbar surface for dark and light modes; link colors in light.
  - Theme toggle switch (`.theme-toggle`): track/knob, sun and moon icons, green “on” state.
  - Cards grid hover elevation; image sizing.
  - Ratings: vivid amber in light; default gold elsewhere.
  - Price color: stronger green in light; mint in dark.
  - Badges: indigo variant in light; deep blue in dark.
  - PDP text and footer link contrast in light.

- Animations: `assets/css/animations.css`
  - `.fade-up` keyframe; `.reveal.in` intersection reveal transitions.

**Accessibility**
- Landmarks: Header, Main, Footer; “Skip to content” link.
- Forms: Labels/`visually-hidden` labels for inputs.
- ARIA live regions for grid counts and results.
- Color contrast adjusted per theme (placeholders, ratings, price, badges, promo banner).

**Performance**
- No build required; ES modules loaded per‑page.
- Images: lazy (`loading="lazy"` on cards), resilient CDN placeholders.
- Minimal JS with targeted DOM updates; no large frameworks.

**Error Handling**
- Image fallbacks: Cards and PDP hero swap to seeded picsum URL on `onerror`.
- Form validation: Checkout validates required traveler fields; Payment validates card/expiry/CVC.

**Configuration & Extensibility**
- Add trips: Extend `TRIPS` in `assets/js/api.js` (unique `id` is required).
- Add filters: Expand `search.js` filter predicate; add new `<option>` in `destinations.html`.
- Real API: Replace `api.js` with fetch calls and adapt renderers; keep same trip shape for minimal changes.
- Theme: The toggle persists to localStorage; adjust light/dark tokens in `base.css` for brand alignment.

**Known UX Details**
- Booking page is a calculator; it can also proceed to Checkout via the quote CTA.
- PDP “Book Now” path is the canonical cart flow (saves date/guests and redirects).

**File Index**
- Pages
  - `index.html`: Landing with hero search, popular grid, promo banner.
  - `destinations.html`: Search/filters/sort/results.
  - `package.html`: PDP with schema, date/guests, Book Now.
  - `checkout.html`: Traveler form + summary.
  - `payment.html`: Payment form + summary.
  - `booking.html`: Quick quote + CTAs.

- CSS
  - `assets/css/base.css`: Theme tokens, layout, forms, hero, promo, footer.
  - `assets/css/components.css`: Navbar, theme toggle, cards, ratings, badges, PDP tweaks.
  - `assets/css/animations.css`: Reveal/fade animations.

- JS
  - `assets/js/utils/dom.js`: `$`, `$$`, `on`, `el`.
  - `assets/js/utils/storage.js`: `setStore`, `getStore`, `delStore`.
  - `assets/js/utils/validate.js`: `isEmail`, `isCard`, `isExpiry`, `isCvc`.
  - `assets/js/utils/theme.js`: `initTheme`, `toggleTheme`, `getTheme`.
  - `assets/js/api.js`: Mock trip data + helpers.
  - `assets/js/components.js`: Header/footer, theme toggle, card/grid helpers, reveal.
  - `assets/js/main.js`: Landing grid bootstrapping.
  - `assets/js/search.js`: SRP filtering/sorting/pagination.
  - `assets/js/cart.js`: PDP add‑to‑cart + Checkout render/submit.
  - `assets/js/payments.js`: Payment validation + success flow.
  - `assets/js/booking.js`: Quote calculator + CTAs.

**Testing (Optional Guidance)**
- If you later add tests, prefer Vitest+jsdom for units and Playwright for E2E. Focus on utils and page flows.

