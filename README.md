# The Nature City by Mangal Realty — website

React 18 + Vite + React Router. No backend or admin panel. Deploys to Vercel as-is.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

## Deploy on Vercel
1. Push this folder to a GitHub repo.
2. Vercel → **Add New → Project** → import the repo. Framework preset: **Vite** (build `npm run build`, output `dist`). `vercel.json` already handles SPA routing and caching.
3. Add environment variables (Project → Settings → Environment Variables) so the enquiry form delivers leads:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Send each enquiry as an email via [Resend](https://resend.com) |
| `ENQUIRY_TO_EMAIL` | Recipient(s), comma separated |
| `ENQUIRY_FROM_EMAIL` | Verified sender, e.g. `Nature City <noreply@yourdomain.com>` |
| `ENQUIRY_WEBHOOK_URL` | Optional. Also POST each lead as JSON to Google Sheets (Apps Script), Zapier or a CRM |

Configure at least one of email or webhook. If neither is set, visitors see an error with a WhatsApp fallback link.

## Things you must fill in  →  `src/config/site.js`
- `phone`, `phoneHref`, `whatsappNumber`, `email`, `officeAddress`
- `rera`, `approvals` (footer shows them only when filled)
- `location.lat / lng / mapsUrl` — **currently a placeholder (Visakhapatnam city centre)**
- `url` (final domain)

## Brand fonts  →  `public/fonts/`
Add `Brolian-Black.woff2` and `Velmont.woff2` (names exactly). Until then Abril Fatface / Italiana are used automatically. Poppins (incl. Medium Italic) is bundled.

## Where content lives
| File | What |
|---|---|
| `src/data/content.js` | Nav, hero slides, stats, five tathvas, "a day here", about, sustainability, gallery |
| `src/data/amenities.js` | Every amenity list from the brochure |
| `src/data/legend.js` | The 77 numbered masterplan landmarks |
| `public/images/*.webp` | All renders (replace a file, keep its name) |
| `public/map/*.svg` | Vector plot layout (A-/B-/C- plot numbers) |

## Plot availability (optional, off by default)
`public/plot-status.json` is your `plot-status.php` data (M1–M62). Those IDs don't match the layout drawing (A-/B-/C- series), so the panel is hidden. When IDs match, set `showAvailability: true` in `site.js`. To update statuses, edit the JSON and redeploy (or point `fetch` at a Google Sheet CSV/API).

## Pages
`/` home · `/layout` masterplan + plot layout + landmark search · `/amenities` · `/gallery` · `/contact`

## Devices & responsive behaviour
All device handling lives in `src/styles/responsive.css` (loaded after `site.css`).
- Tested at 320, 360, 375, 390, 414, 768, 820, 1024, 1280, 1440, 1920 px and landscape phones (740×360, 844×390): no sideways scrolling on any page.
- Pinned scroll sections use `svh/lvh` units so they don't jump when the phone's address bar hides, and become normal flowing sections on short screens (landscape phones).
- Safe-area insets (notch, rounded corners, iPhone home bar) are respected by the header, menu, floating button, modal and lightbox.
- Touch: 44px+ tap targets, 16px form fields (stops iOS auto-zoom), pinch/drag map viewer that fills the screen on phones.
- Large screens (1800px+ and 2400px+) scale type and content width up.


## Brochure fonts & colours (read from the brochure PDF)
The brochure embeds these fonts, and the site follows the same roles:
| Role | Brochure font | On the site |
|---|---|---|
| Big headings (Gardens, Sports…) | **Brolian Black** | drop `Brolian-Black.woff2` into `public/fonts/` (stand-in until then: Chonburi) |
| Swash "w" inside headings (La**w**ns, To**w**nship) | **Aladin** | loaded from `@fontsource/aladin` – applied automatically by `components/Brand.jsx` |
| "&" in "Plug & Play" | **Cochin Bold** | Cochin / Georgia Bold, via `Brand.jsx` |
| Blurbs on photos | **Poppins Medium Italic** | `@fontsource/poppins` |
| Thin titles / logo font | **Velmont** | drop `Velmont.woff2` into `public/fonts/` (stand-in: Italiana) |
| List text | Acumin Variable Concept (Adobe font) | stand-in: Poppins |
Heading colours are the exact brochure values (`src/data/amenities.js`); panel green `#0c3626`, cream `#faf6e3`, gold `#d6b229`, and the five element colours (`#0e5d30`, `#126166`, `#861f1f`, `#9a969e`, `#71499d`) are in `base.css` / `content.js`.

## Motion sections (`src/styles/scenes.css`)
- **Five elements** (`sections/Tathvas.jsx`): vertical scrolling slides the panels sideways, with a pause on each. Tap the Prithvi / Jal / Agni / Vayu / Akash bar to jump.
- **A day at The Nature City** (`sections/Day.jsx`): a true semicircle (radius 180, centre 200,200). The sun/moon travels exactly along it with the scroll and the time sits in the middle. Visible on phones, tablets and desktops.

## At a glance + the four-node compass
- `sections/Glance.jsx`: the four image cards (90 acres · 250+ amenities · 17 gardens · 05 elements). They sit in their own section right after the hero, not inside the home banner. Edit the cards in `src/data/featured.js` (`GLANCE_CARDS`).
- `sections/Compass.jsx`: the four-zone compass (Gardens · Sports · Club House · Plots). Each zone has a chip, title, tagline, three bullets and an "Explore" button; "View all amenities" sits below. Edit zones in `src/data/featured.js` (`COMPASS`).
  Controls: click/tap a number, ← → keys, swipe, or drag the ring with a mouse. It auto-advances while in view and pauses on hover/focus.
