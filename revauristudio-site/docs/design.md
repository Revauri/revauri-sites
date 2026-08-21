# revauristudio.com — Visual Design Spec

One-page trust site for people who received a cold email from an `@revauristudio.com` address and typed the domain into a browser. Message: **the craft — how Revauri AI designs an AI employee around their business. Studio, not factory.** This is a door to the product at `https://revauri.ai`, not a product homepage.

**Direction:** atelier / editorial. Cool coated-stock paper, blue-black proof ink, one restrained ultramarine accent. A single serif family (Newsreader) sets headlines *and* running text, letterspaced sans is demoted to furniture, a masthead rule, folio numbers, one drop cap. More magazine than dashboard. Quiet, expensive, still simple. No mock redesigns, no before/after websites, no stock imagery, no icons, no emoji — and **no website-design language anywhere**: this is not a design studio, and nothing on the page sells websites.

> Revision note: the first pass was warm paper `#F5EEE6` + Playfair Display + claret `#722F37` — too close to the generic "warm cream + high-contrast serif + wine/terracotta" cluster. This revision keeps the editorial skeleton and shifts identity: cool paper, Newsreader (optical sizes) for display *and* body, ultramarine as the single accent.

---

## 1. Concept statement

Revauri Studio is the atelier: a bright room with paper on the table where each hire is drawn by hand before it is built. The page reads like the opening spread of a gallery catalogue — a masthead, a folio or two, generous margins, serif running text, one drop cap, and a single dark plate where the studio's one hard rule is printed. The one luxury is pigment: **ultramarine**, historically the atelier's most expensive pigment (lapis), and the editor's blue pencil deepened into ink. Trust comes from restraint and print-like permanence: nothing glows, nothing pulses, nothing is interactive except the door to revauri.ai. The only orange pixel anywhere is the tittle bar inside the Revauri wordmark — a signature, not an accent system.

---

## 2. Palette

Light/dark plan: **light-first magazine with one dark plate.** Paper masthead → paper hero → **paper-deep craft band** → paper process → **full-bleed ink plate** (the closing line + quiet phone line) → paper final CTA → **ink footer**. Rhythm: light → light → light-deep → light → **dark** → light → dark.

Justified against the siblings' rhythm: revauribuild opens charcoal and stays dark half the page; revauribuilds is one flat paper until its ink footer; revauridigital is dark-only. Ours is the only **bright issue with a single tipped-in dark spread** — the closing line gets the plate treatment, the way an art book interrupts matte paper with one glossy black page.

| Token | Hex | Role |
|---|---|---|
| `paper` | `#F2F3F5` | Page background, light sections. Cool coated stock — chalk with a blue lean. Not warm cream: cooler than revauribuilds' green-gray `#F5F6F2` and unrelated to revauribuild's bone |
| `paper-deep` | `#E2E5EA` | One alt light band (the craft section) |
| `ink` | `#151B2B` | Primary text on light; the closing plate and footer backgrounds. Blue-black proof ink — bluer than revauribuild's charcoal `#211E1A`, and used the opposite way from revauridigital's all-dark page |
| `ink-muted` | `#525C70` | Muted/secondary text on light sections — cool slate |
| `paper-muted` | `#9BA3B4` | Muted/secondary text on the ink plate and footer |
| `ultramarine` | `#002FA7` | **The one accent.** CTA button fill, accent text on light, drop cap, folio numerals, selection. International Klein Blue — the atelier pigment, the editor's pencil. Passes AAA as text on paper (9.6:1), so **no deep variant is needed** |
| `ultramarine-bright` | `#1D45C2` | CTA hover state only |
| `ultramarine-light` | `#A8B6F0` | Ultramarine **text on ink** (plate emphasis, footer link hover). `ultramarine` fails on ink (1.6:1) — never use it for text on dark |
| `hairline` | `#D7DBE2` | 1px rules and dividers on light sections |
| `hairline-dark` | `#2C3449` | 1px rules on the ink plate and footer |

Brand tokens required by the verbatim `Logo` component: `brand-orange` (exact `#D97757`), `brand-dark`, `brand-cream`, `brand-mid-gray`. Map `brand-dark` → our ink and `brand-cream` → our paper so the wordmark sits natively in this palette; `brand-mid-gray` keeps the sibling value `#B0AEA5` (used only by the optional logo suffix, which this site does not use).

**The orange quarantine:** `#D97757` appears **only** inside the official wordmark (the 8px tittle bar) and nowhere else on the page — no orange text, borders, markers, or fills. Ultramarine never sits immediately adjacent to the wordmark either: the header CTA is separated from the logo by the full header row, the footer meta is `paper-muted`, and the logo carries no suffix.

**Why ultramarine:** the atelier's own material — lapis lazuli, the one pigment a Renaissance studio spent real money on, used sparingly. It is also the editor's blue pencil, an editorial artifact. Blue is the one hue no sibling claims: revauribuild is copper, revauribuilds is stamp green, revauridigital is a night-desk signal color, revauri.ai is orange-on-black. It is not green, not teal, not copper, and IKB's depth (hue ~222°) keeps it well clear of violet. Note the inversion of the sibling pattern: they needed *deep* accent variants for text on light; our accent is already deep, so we need a *light* tint (`ultramarine-light`) for text on dark.

---

## 3. Typography

**Pairing: Newsreader (the one serif — headlines, folio numerals, drop cap, *and* running text) + Source Sans 3 (furniture only: eyebrows, labels, buttons, meta lines, footer).** A real magazine uses one serif family throughout; that is the move here. Newsreader is a literary, text-born face with an optical-size axis — crisp and high-contrast at display sizes, sturdy at body sizes — visibly different from Playfair's fashion-Didone shine and from Fraunces' soft old-style wonk. Source Sans 3 is the quiet humanist sans for furniture. Neither is Inter, Space Grotesk, Instrument Sans, or Libre Franklin. **This is the only sibling site with no mono at all** — eyebrows and folios are letterspaced sans and serif numerals, not typewriter mono; that absence is part of the magazine voice. Fraunces loads only so the official wordmark keeps its serif; it appears nowhere else on the page.

**Verified against the installed `next@16.3.1` font metadata** (`node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`): variable families list `'variable'` as the last entry of `weights` plus their axes.

- **Newsreader — variable.** `weights: ['200'…'800', 'variable']`, `axes: ['opsz' 6–72 (default 16), 'wght' 200–800]`, styles normal + italic. Load with **no `weight` key** and **`axes: ["opsz"]`** so browsers apply optical sizing automatically (`font-optical-sizing: auto` is the initial value): display sizes get the 72-cut, body text the text cut, from one font file. `style: ["normal", "italic"]` — the hero H1 and plate line use italic accents, and next/font only emits italic when asked.
- **Source Sans 3 — variable.** `weights: ['200'…'900', 'variable']`, `axes: ['wght']`. Load with **no `weight` key**.
- **Fraunces — variable.** `axes: ['SOFT', 'WONK', 'opsz', 'wght']`. Load with no `weight` key, normal style only (wordmark).

`app/layout.tsx` wiring:

```ts
import { Newsreader, Source_Sans_3, Fraunces } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"], // italic used for accent words
  axes: ["opsz"], // optical sizing: display cut at large sizes, automatically
  variable: "--font-newsreader",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// <html className={`${newsreader.variable} ${sourceSans.variable} ${fraunces.variable} antialiased`}>
```

`--font-display` (Newsreader) is wired in `@theme` alongside `--font-sans` and the wordmark-only `--font-serif`, giving a `font-display` utility used for **both** headlines and prose.

| Element | Font / utility | Size mobile → desktop | Notes |
|---|---|---|---|
| Hero H1 ("Designed around your business.") | `font-display font-semibold` | `text-5xl` → `md:text-7xl` | `leading-[1.05]`; the words "your business" in `text-ultramarine italic` |
| Section H2 | `font-display font-medium` | `text-3xl` → `md:text-4xl` | `leading-[1.1]` |
| Closing plate line | `font-display font-medium` | `text-3xl` → `md:text-5xl` | `text-paper`, "not fake" in `text-ultramarine-light italic`, measure `max-w-3xl` |
| Step names (Look / Build / Run) | `font-display font-medium` | `text-2xl` | |
| Folio & step numerals (No. 01 / I II III) | `font-display font-semibold` | `text-lg` (folios) / `text-3xl` (steps) | `text-ultramarine` |
| Drop cap | `font-display font-semibold` | 3.4em via `.drop-cap` | `text-ultramarine`, one per page |
| Body / lead / step bodies | `font-display` | `text-lg` → `md:text-xl` (hero sub, craft) | `leading-relaxed`, measure capped `max-w-xl` — **serif running text, the magazine signal** |
| Eyebrows, section labels | `font-sans font-semibold uppercase` | `text-xs` | `tracking-[0.22em]`, `text-ultramarine` on light |
| Meta text (footer, sub-lines, phone line) | `font-sans uppercase` | `text-xs` | `tracking-[0.18em]`, muted color of the section |

Newsreader's optical contrast does the decorative work — do not add positive tracking to display type; only the sans labels get wide tracking. Never set page type in Fraunces.

---

## 4. Texture & motifs (pick these two, nothing more)

1. **The masthead double-rule + folio numbers** — the system-wide structure. The header is a nameplate: a 1px `ink` rule directly under the header row with a second 1px `hairline` rule 3px beneath it, full-bleed — the classic thin-double masthead line. Every section below the hero carries a folio: `font-display` "No. 01" in `text-ultramarine` beside a letterspaced sans label. The three process steps get serif roman numerals `I / II / III` instead of mono `01 / 02 / 03`.
2. **The drop cap** — exactly one on the page: the craft section's lead paragraph opens with a 3-line Newsreader drop cap in `ultramarine` (`.drop-cap` in §10). The single most editorial gesture available, and unused by every sibling. It is the page's one signature device: no ink wash, no second typeset moment.

Deliberately **not** used: revauribuild's blueprint grid, 2px spec-sheet top rules, and copper bar markers; revauribuilds' ruled ledger grid and mono index numbers; revauridigital's console grid, log lines, and status dots. No column rules, no ink wash, no grids of any kind — structure comes from whitespace, hairlines, and the folios. No icons, no emoji, no stock imagery.

---

## 5. Section-by-section

Global rhythm: container `mx-auto max-w-6xl px-5 md:px-8`; sections `py-20 md:py-28`; header `h-16`. Mobile-first, single column until `md`. Use `Logo variant="light"` (ink wordmark) on paper and paper-deep sections, `variant="dark"` (paper wordmark) in the ink footer; never `variant="auto"`; never an opaque rectangle behind it. The ink plate carries no logo at all.

### Header — paper masthead
- `bg-paper`; the `h-16` row holds left `Logo variant="light"`, right one ultramarine button (`bg-ultramarine`, `hover:bg-ultramarine-bright`, paper text, sharp corners) linking to `https://revauri.ai/book`.
- Below the row, full-bleed double rule: `<div aria-hidden class="border-t border-ink" />` then `<div aria-hidden class="mt-[3px] border-t border-hairline" />`.
- No nav — this page has one job.

### Hero — paper
- `bg-paper`, `py-20 md:py-28`.
- Eyebrow: `font-sans font-semibold uppercase text-xs tracking-[0.22em] text-ultramarine`.
- H1: `font-display font-semibold text-5xl md:text-7xl leading-[1.05] text-ink`, the accent words in `text-ultramarine italic`.
- Subhead: `font-display text-lg md:text-xl leading-relaxed text-ink-muted max-w-xl` — serif, because a magazine's running text is serif.
- CTAs: primary ultramarine button + text link (`text-ultramarine underline decoration-hairline underline-offset-4 hover:decoration-ultramarine`).
- Trust line under the CTAs: `text-sm text-ink-muted`.
- Load animation: `animate-fade-up` on eyebrow → H1 → subhead → CTA with `animation-delay` stagger of 80ms. That is the only animation on the page.

### The craft — paper-deep, `id="the-craft"`
- `bg-paper-deep border-y border-hairline`.
- Folio row: `font-display font-semibold text-lg text-ultramarine` "No. 01" + sans eyebrow in `text-ultramarine`.
- H2 in `font-display font-medium text-3xl md:text-4xl text-ink`.
- Two paragraphs, `max-w-xl`, `font-display text-lg md:text-xl text-ink-muted leading-relaxed`; the **first** takes `.drop-cap`.
- The two promise lines as ruled rows: `divide-y divide-hairline border-t border-hairline`, each `py-4 font-sans text-lg text-ink` — sans furniture, set off from the serif prose.
- No cards, no boxes, no imagery — set type on paper, like a magazine page.

### The process — paper, `id="process"`
- Folio row: "No. 02" + eyebrow in `text-ultramarine`.
- H2, then three steps: mobile — stacked rows `divide-y divide-hairline`, each `py-8`; desktop — `md:grid md:grid-cols-3 md:gap-10 md:divide-y-0`. **No top rules** (the sibling's device): each step is a Newsreader roman numeral (`font-display font-semibold text-3xl text-ultramarine`), the name (`font-display font-medium text-2xl text-ink mt-3`), serif body (`font-display leading-relaxed text-ink-muted mt-2`), and a small sans caps meta line (`text-xs uppercase tracking-[0.18em] text-ink-muted mt-4`).

### The closing plate — ink (the one dark spread)
- Full-bleed `bg-ink`, centered, `py-24 md:py-32`. No folio, no eyebrow — a plate has no furniture.
- The standalone line: `font-display font-medium text-3xl md:text-5xl leading-[1.15] text-paper mx-auto max-w-3xl`, the emphasis words in `text-ultramarine-light italic`.
- The quiet phone line sits **directly under the closing line** (per `docs/copy.md`: "a single line in small type, directly under the closing line. Not its own section"): `font-sans text-xs uppercase tracking-[0.18em] text-paper-muted`, `mt-10`. Nothing else in the band.

### Final CTA — paper
- Centered, `py-24 md:py-32`.
- Folio row centered: "No. 03" + eyebrow in `text-ultramarine`.
- H2-scale line in `font-display font-medium text-3xl md:text-4xl text-ink`; supporting line `font-display text-lg text-ink-muted`.
- Primary ultramarine button + text link, same treatments as the hero.

### Footer — ink
- `bg-ink border-t border-hairline-dark`, `py-12`.
- Left: `Logo variant="dark"`, with the quiet company line and address in `text-paper-muted` sans caps.
- Right (stacked on mobile): sans meta `text-xs uppercase tracking-[0.18em] text-paper-muted` — contact mailto, `Privacy` / `Terms` → `https://revauri.ai/privacy` / `https://revauri.ai/terms` (`hover:text-ultramarine-light transition-colors`).
- Bottom row above the colophon: the quiet website line (with `revauri.com` link underlined) and the copyright line.
- Nothing else. No social icons, no link farm.

---

## 6. Buttons & links

**Primary CTA** (ultramarine, used in header, hero, and final CTA):

```
inline-flex items-center justify-center gap-2 rounded-none bg-ultramarine px-6 py-3
font-sans text-base font-semibold text-paper
transition-colors hover:bg-ultramarine-bright active:translate-y-px
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ultramarine
```

`rounded-none` (0) — print has no corner radius; sharp corners are the atelier signal. The siblings own `rounded-sm` (2px), `rounded-[2px]`, and `rounded-md` (6px); zero is ours. Paper text on ultramarine passes AAA (9.6:1).

**Text links:**
- On light: `text-ultramarine underline underline-offset-4 decoration-hairline hover:decoration-ultramarine`.
- On ink: footer meta links stay `text-paper-muted hover:text-ultramarine-light` without underline; the revauri.com link keeps its underline.

**Focus visible everywhere:** 2px `outline-ultramarine` with 2px offset on light sections; 2px `outline-ultramarine-light` with 2px offset on the ink plate and footer.

---

## 7. Accessibility — verified contrast pairs (WCAG)

Ratios computed from relative luminance (WCAG 2.x formula), not eyeballed:

| Pair | Ratio | Verdict |
|---|---|---|
| `ink #151B2B` text on `paper #F2F3F5` | 15.5:1 | AAA |
| `ink` on `paper-deep #E2E5EA` | 13.6:1 | AAA |
| `ink-muted #525C70` on `paper` | 6.1:1 | AA |
| `ink-muted` on `paper-deep` | 5.3:1 | AA |
| `ultramarine #002FA7` on `paper` (accent text, drop cap, folios) | 9.6:1 | AAA |
| `ultramarine` on `paper-deep` | 8.5:1 | AAA |
| `paper #F2F3F5` on `ink` (plate, footer) | 15.5:1 | AAA |
| `paper-muted #9BA3B4` on `ink` (footer meta, phone line) | 6.8:1 | AA |
| `ultramarine-light #A8B6F0` on `ink` (plate emphasis, footer hover) | 8.7:1 | AAA |
| `paper` text on `ultramarine` button fill | 9.6:1 | AAA |
| `paper` text on `ultramarine-bright #1D45C2` hover | 7.1:1 | AA |
| `ultramarine #002FA7` on `ink` | 1.6:1 | **FAIL — never ultramarine text on dark**; use `ultramarine-light` |
| `brand-orange #D97757` on `paper` | 2.8:1 | **FAIL — wordmark tittle only**; never text, never a site accent |

Rules that fall out of this: the accent is text-safe everywhere it is allowed — `ultramarine` on any light surface, `ultramarine-light` on ink, never crossed. Muted colors are used at `text-xs` only in uppercase sans with wide tracking, which reads larger than its size.

Motion: single subtle `fade-up` (12px translate, 0.6s) on hero load; full `prefers-reduced-motion` kill-switch in the CSS block in §10. No scroll-reveal library needed for a page this short.

---

## 8. `app/icon.tsx` — favicon

Same `ImageResponse` pattern as the siblings (32×32 tile, system serif since `ImageResponse` loads no custom fonts), recolored: **a sharp cool-paper tile with an ink R and an ultramarine period** — "R." set like a folio. Sharp corners match the site's `rounded-none`; the light tile reads in both light and dark tab bars and is unmistakably not revauribuilds' green-on-ink or revauridigital's dark tile.

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 0,
          background: "#F2F3F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#151B2B",
            lineHeight: 1,
            fontFamily: "Georgia, serif",
          }}
        >
          R<span style={{ color: "#002FA7" }}>.</span>
        </span>
      </div>
    ),
    { ...size },
  );
}
```

---

## 9. What makes this distinct

- **vs revauri.ai:** that site is a product homepage — Inter, dark honeycomb hero, orange-on-black, job-picker UI, chatbot. This page has no product UI at all: no demo, no picker, no chat widget, no honeycomb, no glow. Newsreader + Source Sans 3 replace Inter, and the page is bright paper where revauri.ai opens dark.
- **vs revauribuild:** that site is a charcoal-first workshop — dark header/hero/band/footer, copper `#D97757` as the site accent, Space Grotesk + IBM Plex Mono, blueprint grid, spec-sheet steps with 2px top rules, `rounded-sm`. Ours inverts it: light-first with one dark plate, ultramarine accent (orange quarantined to the wordmark tittle), serif-led type, no grids, no top rules, sharp corners.
- **vs revauribuilds:** that site is a flat light ledger — `#F5F6F2` green-gray paper, stamp green `#16A34A`, Libre Franklin + Space Mono, one ruled 3×3 grid, light until the footer. Ours is cool blue-gray paper with a deep band in the middle and a dark plate, ultramarine not green, serif folios instead of mono index numbers, serif running text, and no ruled cells anywhere.
- **vs revauridigital:** that site is a dark-only night desk — ink `#0A0F14`, signal accent, Instrument Sans + JetBrains Mono, console grid, status dots, log lines. Ours is a bright printed page: no dots, no logs, no console, no mono, and ultramarine (hue ~222°) stays well clear of any violet signal.
- **vs the generic AI cluster:** not warm cream + Didone + terracotta (cool paper, text-born serif, blue pigment); not near-black + acid (light-first, deep pigment); not broadsheet density (single airy column, no column rules).
- **Own identity:** the atelier issue. A masthead double-rule, folio numbers, one ultramarine drop cap, roman-numeral steps, serif running text, sharp corners, and a single full-bleed ink plate for the one hard rule — a magazine page about a craft, not a dashboard about a product. The only sibling with a serif-led page and no mono at all.

---

## 10. `app/globals.css` — token block of record

Tailwind CSS v4, same `@theme inline` pattern as the sibling sites. No dark-mode class, no theme script — sections are explicitly colored.

```css
@import "tailwindcss";

:root {
  --background: #F2F3F5;
  --foreground: #151B2B;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  /* Brand tokens — required by the verbatim Logo component */
  --color-brand-orange: #D97757; /* official mark, exact hex — wordmark tittle only, never a site accent */
  --color-brand-dark: #151B2B;
  --color-brand-cream: #F2F3F5;
  --color-brand-mid-gray: #B0AEA5;

  /* Site palette */
  --color-paper: #F2F3F5;
  --color-paper-deep: #E2E5EA;
  --color-ink: #151B2B;
  --color-ink-muted: #525C70;
  --color-paper-muted: #9BA3B4;
  --color-ultramarine: #002FA7;
  --color-ultramarine-bright: #1D45C2;
  --color-ultramarine-light: #A8B6F0;
  --color-hairline: #D7DBE2;
  --color-hairline-dark: #2C3449;

  /* Type */
  --font-sans: var(--font-source-sans-3), ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-display: var(--font-newsreader), Georgia, "Times New Roman", serif;
  --font-serif: var(--font-fraunces), Georgia, "Times New Roman", serif; /* LOGO WORDMARK ONLY */

  --animate-fade-up: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
}

body {
  background: var(--background);
  color: var(--foreground);
}

::selection {
  background: #002FA7;
  color: #F2F3F5;
}

/* Drop cap — one per page, craft section lead paragraph only. */
.drop-cap::first-letter {
  font-family: var(--font-newsreader), Georgia, serif;
  font-weight: 600;
  font-size: 3.4em;
  line-height: 0.85;
  float: left;
  padding-top: 0.06em;
  padding-right: 0.12em;
  color: var(--color-ultramarine);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
