# MG Crafted Candles — Project Context

## Business
Handmade candle business based in the UAE (Dubai), run by Crissy. Two niches: ready-made candles and fully customizable candles, with a focus on event gifting (weddings, baby showers, corporate gifting, birthdays, retreats, holidays). Key differentiator: personalized labels on each candle.

- WhatsApp Business: +971 52 776 0547 (already wired into `WHATSAPP_NUMBER` in script.js — powers checkout, custom order, and contact inquiry flows)
- Instagram: https://www.instagram.com/mgcraftedcandles (linked in footer; Facebook/TikTok mentions are still plain text, no links yet)

## Tech stack
Plain HTML/CSS/JS, no build step, no framework.
- `index.html` — all markup
- `styles.css` — main stylesheet
- `locked-revisions.css` — a second stylesheet loaded after styles.css (later rules win on conflicts); holds newer additions like the collection modal, photo grids, handmade badge, etc.
- `script.js` — all interactivity: nav, search, shop cart/checkout via WhatsApp, custom order modal, collection modal, FAQ accordion
- `assets/` — real photos, organized by section (see below)

No bundler. Files are linked normally (`<link>`/`<script src>`), so this deploys as-is to GitHub Pages or any static host.

## LOCKED brand palette — do not change without explicit confirmation from Crissy
Defined as CSS variables at the top of `styles.css`, documented inline:
- Deep Teal `#274C4E` → `--ink`
- Dark Teal `#173B3D` → `--dark`
- Warm Cream `#F8F4EC` → `--cream`
- Soft Sand `#E6D7C0` → `--sand`
- Muted Gold `#B68A52` → `--gold`
- Soft Rose `#EAD8D4` → `--rose`
- Text Teal `#1D3233` → `--text`
- Muted Gray-Green `#6D7977` → `--muted`
- Light Line `#DEDBD3` → `--line`

## Assets folder structure
- `assets/mg-crafted-candles-logo.png` — real logo, used in header/footer/Our Story
- `assets/hero/cover.jpg` — hero banner photo (left column, two-column layout: photo left, text right)
- `assets/ready-made/cover.jpg` — current cover photo for the "Ready-made candles" collection card + modal banner
- `assets/ready-made/*.jpg` (other files) — an earlier batch of 10 converted product photos (daisy candles in 5 colorways, rose/succulent flat-lay, palace-relief candle, cactus candles, sunset lifestyle shot). Currently **unlinked** from the site — Crissy asked to remove them from the Ready-made tab pending a revised/curated set. Files are kept on disk in case she wants to reuse any.
- `assets/personalized/cover.jpg` — cover for "Personalized gifts" collection card + modal banner
- `assets/celebration/cover.jpg` — cover for "Celebration favors" collection card + modal banner
- `assets/custom/cover.jpg` — was used in the "Custom Made" dark section; **removed** per Crissy's request (was overflowing/rendering oddly), section is text-only now

## Collection modal system (script.js: `collectionInfo` + `openCollection()`)
The three cards under "THE COLLECTION" (`data-collection="ready|personalized|celebration"`) open a shared modal. Each entry in `collectionInfo` can have:
- `cover` — a single hero image shown at the top of the modal (and usually also set as the card's `background-image` via inline style + `.has-photo` class)
- `photos` — an array of `{n, s}` (name, src) objects that render as a clickable photo grid instead of the cover+placeholder layout (used previously for ready-made; currently not set for any category — they fall back to 3 dashed "coming soon" placeholder slots)

## Shop / catalog (script.js: `products` array + `renderProducts()`)
The `#products` grid, filter buttons, and search were fully built in JS but had no HTML container for a while — this was fixed by adding the `<section id="shop">` block. **The 8 products currently in the array are EXAMPLE/placeholder data** (fake names, fake AED prices, no real photos — each shows a colored block with the product name). Crissy has not yet sent real product photos, names, fragrance notes, or prices. When she does, replace entries in the `products` array; the grid/filter/search/cart/checkout logic needs no other changes.

## Pending / open items
- **Custom order pricing**: unscented candles should cost less than scented, but Crissy hasn't calculated actual numbers yet. Do not invent prices — ask her for the real figures (scented price, unscented price or discount amount) before adding pricing to the custom order modal.
- **Ready-made collection**: needs a revised/curated photo set (see asset note above).
- **Shop catalog**: needs real product photos/names/prices to replace the 8 placeholder products.
- **Personalized gifts / Celebration favors modals**: still show placeholder "coming soon" slots (only have cover photos, no galleries yet).
- Facebook/TikTok footer links: mentioned as plain text, no real links provided yet.

## Working conventions from past sessions
- **HEIC photos**: iPhone HDR HEIC files fail with ImageMagick/standard libheif ("Too many auxiliary image references"). Use `pillow-heif` (`pip install pillow-heif --break-system-packages`) with `pillow_heif.open_heif(path, convert_hdr_to_8bit=True)`. Do **not** apply `ImageOps.exif_transpose()` afterward — for photos processed so far, the raw decoded orientation from pillow-heif was already correct, and applying EXIF transpose rotated them incorrectly. Always visually verify orientation on at least one photo before batch-processing.
- Resize photos for web before adding to `assets/` (roughly 1400–1800px on the long edge, JPEG quality ~88) — originals are 12MP+ phone photos.
- Crissy reviews changes via a self-contained single-file HTML preview (all CSS/JS/images inlined as base64) generated on request for quick browser viewing — that's a convenience export, not part of the deployed site. The actual site stays multi-file (`index.html` + separate `.css`/`.js` + real `assets/*` paths) for real deployment.
- Crissy works in short iterative rounds and often asks for precise numeric tweaks (e.g. "decrease to 50%", "2% bigger") — apply exactly, don't round or reinterpret.
- She communicates in a mix of English and Tagalog/Taglish.
