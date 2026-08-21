# revauristudio.com — Visual Design Spec

One-page trust site for people who received a cold email from an `@revauristudio.com` address and typed the domain into a browser. Message: **the craft — how Revauri AI designs an AI employee around their business. Studio, not factory.** This is a door to the product at `https://revauri.ai`, not a product homepage.

**Direction:** atelier / editorial. Warm paper, deep ink, one restrained claret accent. Serif headlines, letterspaced sans labels, a masthead rule, folio numbers, one drop cap. More magazine than dashboard. Quiet, expensive, still simple. No mock redesigns, no before/after websites, no stock imagery, no icons, no emoji — and **no website-design language anywhere**: this is not a design studio, and nothing on the page sells websites.

---

## 1. Concept statement

Revauri Studio is the atelier: a bright room with paper on the table where each hire is drawn by hand before it is built. The page should read like the opening spread of a well-set magazine — a masthead, a folio or two, generous margins, one drop cap, and a single dark plate where the studio's one hard rule is printed. Trust comes from restraint and print-like permanence: nothing glows, nothing pulses, nothing is interactive except the door to revauri.ai. The only orange pixel anywhere is the tittle bar inside the Revauri wordmark — a signature, not an accent system.

---

## 2. Palette

Light/dark plan: **light-first magazine with one dark plate.** Paper masthead → paper hero → **paper-deep craft band** → paper process → **full-bleed ink plate** (the closing line) → paper final CTA → **ink footer**. Rhythm: light → light → light-deep → light → **dark** → light → dark.

Justified against the siblings' rhythm: revauribuild opens charcoal and stays dark half the page; revauribuilds is one flat paper until its ink footer; revauridigital is dark-only; revauridesign is all-light cream. Ours is the only **bright issue with a single tipped-in dark spread** — the closing line gets the plate treatment, the way an art book interrupts matte paper with one glossy black page.

| Token | Hex | Role |
|---|---|---|
| `paper` | `#F5EEE6` | Page background, light sections. Warm atelier paper with a faint rose lean — rosier than revauridesign's neutral `#FAF9F5`, pinker than revauribuild's yellow bone `#F2ECDF`, warmer than revauribuilds' green-gray `#F5F6F2` |
| `paper-deep` | `#EAE0D5` | One alt light band (the craft section) |
| `ink` | `#1C120D` | Primary text on light; the closing plate and footer backgrounds. Deep espresso — darker and browner than revauribuild's charcoal `#211E1A` |
| `ink-muted` | `#6E5F56` | Muted/secondary text on light sections — warm taupe |
| `paper-muted` | `#A89A8C` | Muted/secondary text on the ink plate and footer |
| `claret` | `#722F37` | **The one accent.** CTA button fill, accent text on light, drop cap, folio numerals, selection. Oxblood/claret — printer's ink, gallery wine, leather binding. Passes AAA as text on paper (8.4:1), so **no deep variant is needed** |
| `claret-bright` | `#8A3A48` | CTA hover state only |
| `claret-light` | `#D29AA2` | Claret **text on ink** (plate emphasis, footer link hover). `claret` fails on ink (1.9:1) — never use it for text on dark |
| `hairline` | `#DDD0C2` | 1px rules and dividers on light sections |
| `hairline-dark` | `#3A2C24` | 1px rules on the ink plate and footer |

Brand tokens required by the verbatim `Logo` component: `brand-orange` (exact `#D97757`), `brand-dark`, `brand-cream`, `brand-mid-gray`. Map `brand-dark` → our ink and `brand-cream` → our paper so the wordmark sits natively in this palette; `brand-mid-gray` keeps the sibling value `#B0AEA5` (used only by the optional logo suffix).

**The orange quarantine:** `#D97757` appears **only** inside the official wordmark (the 8px tittle bar) and nowhere else on the page — no orange text, borders, markers, or fills. Claret never sits immediately adjacent to the wordmark either: the header link beside the logo is `ink-muted`, the footer meta is `paper-muted`, and the logo carries no suffix. The deep red and the small orange tittle harmonize (wine and sealing wax), but each keeps its own territory.

**Why claret:** the brief's editorial suggestion fits the atelier exactly — oxblood is the color of letterpress ink, gallery walls at a private view, and the spine of a bound volume. It is warm without being the quarantined brand orange, and it is not green (`#16A34A` family) or teal (`#2DD4BF` family). Note the inversion of the sibling pattern: they needed *deep* accent variants for text on light; our accent is already deep, so we need a *light* tint (`claret-light`) for text on dark.

---

## 3. Typography

**Pairing: Playfair Display (display serif — headlines, folio numerals, drop cap) + Source Sans 3 (body, eyebrows, labels, buttons).** Playfair is a sharp high-contrast Didone revival — the editorial serif, visibly sharper than Fraunces' soft old-style wonk. Source Sans 3 is the classic magazine companion sans: quiet, humanist, made for running text. Neither is Inter, Space Grotesk, Instrument Sans, or Libre Franklin. **This is the only sibling site with no mono at all** — eyebrows and folios are letterspaced sans and serif numerals, not typewriter mono; that absence is part of the magazine voice. Fraunces loads only so the official wordmark keeps its serif; it appears nowhere else on the page.

**Verified against the installed `next@16.3.1` font metadata** (`node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`). Calibration: in this metadata, variable families list `'variable'` as the last entry of `weights` plus a `wght` axis (Libre Franklin — known variable per the revauribuilds spec — shows exactly this signature); static families list numeric weights only with no axes (Space Mono — known static — shows `['400','700']`, axes `None`). Against that signature:

- **Playfair Display — variable.** `weights: ['400'…'900', 'variable']`, `axes: ['wght']`. Load with **no `weight` key**; use Tailwind weight utilities. Add `style: ["normal", "italic"]` — the hero H1 and plate line use italic accents, and next/font only emits italic when asked.
- **Source Sans 3 — variable.** `weights: ['200'…'900', 'variable']`, `axes: ['wght']`. Load with **no `weight` key**.
- **Fraunces — variable.** `axes: ['SOFT', 'WONK', 'opsz', 'wght']`. Load with no `weight` key, normal style only (wordmark).

`app/layout.tsx` wiring (replaces the scaffolded Geist setup):

```ts
import { Playfair_Display, Source_Sans_3, Fraunces } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"], // italic used for accent words
  variable: "--font-playfair",
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

// <html className={`${playfair.variable} ${sourceSans.variable} ${fraunces.variable} antialiased`}>
```

`--font-display` (Playfair) is wired in `@theme` alongside `--font-sans` and the wordmark-only `--font-serif`, giving a `font-display` utility.

| Element | Font / utility | Size mobile → desktop | Notes |
|---|---|---|---|
| Hero H1 ("Designed around your business.") | `font-display font-semibold` | `text-5xl` → `md:text-7xl` | `leading-[1.05]`; the words "your business" in `text-claret italic` |
| Section H2 | `font-display font-medium` | `text-3xl` → `md:text-4xl` | `leading-[1.1]` |
| Closing plate line | `font-display font-medium` | `text-3xl` → `md:text-5xl` | `text-paper`, "not fake" in `text-claret-light italic`, measure `max-w-3xl` |
| Step names (Look / Build / Run) | `font-display font-medium` | `text-2xl` | |
| Folio & step numerals (No. 01 / I II III) | `font-display font-semibold` | `text-lg` (folios) / `text-3xl` (steps) | `text-claret` |
| Drop cap | `font-display font-semibold` | 3.4em via `.drop-cap` | `text-claret`, one per page |
| Body / lead | `font-sans` | `text-base` → `md:text-lg` | `leading-relaxed`, measure capped `max-w-xl` |
| Eyebrows, section labels | `font-sans font-semibold uppercase` | `text-xs` | `tracking-[0.22em]`, `text-claret` on light / `text-claret-light` on ink |
| Meta text (footer, sub-lines) | `font-sans uppercase` | `text-xs` | `tracking-[0.18em]`, muted color of the section |

Playfair's contrast does the decorative work — do not add positive tracking to display type; only the sans labels get wide tracking. Never set page type in Fraunces.

---

## 4. Texture & motifs (pick these two, nothing more)

1. **The masthead double-rule + folio numbers** — the system-wide structure. The header is a nameplate: a 1px `ink` rule directly under the header row with a second 1px `hairline` rule 3px beneath it, full-bleed — the classic thin-double masthead line. Every section below the hero carries a folio: `font-display` "No. 01" in `text-claret` beside a letterspaced sans label (`THE CRAFT`, `THE STUDIO PROCESS`, `REVAURI AI`). The three process steps get Playfair roman numerals `I / II / III` instead of mono `01 / 02 / 03`.
2. **The drop cap** — exactly one on the page: the craft section's lead paragraph opens with a 3-line Playfair drop cap in `claret` (`.drop-cap` in §10). The single most editorial gesture available, and unused by every sibling.

Deliberately **not** used: revauribuild's blueprint grid, 2px spec-sheet top rules, and copper bar markers; revauribuilds' ruled ledger grid and mono index numbers; revauridigital's console grid, log lines, and status dots. No column rules, no ink wash, no grids of any kind — structure comes from whitespace, hairlines, and the folios. No icons, no emoji, no stock imagery.

---

## 5. Section-by-section

Global rhythm: container `mx-auto max-w-6xl px-5 md:px-8`; sections `py-20 md:py-28`; header `h-16`. Mobile-first, single column until `md`. Use `Logo variant="light"` (ink wordmark) on paper and paper-deep sections, `variant="dark"` (paper wordmark) in the ink footer; never `variant="auto"`; never an opaque rectangle behind it. The ink plate carries no logo at all.

### Header — paper masthead
- `bg-paper`; the `h-16` row holds left `Logo variant="light"`, right one sans link `REVAURI.AI ↗` (`font-sans text-xs uppercase tracking-[0.22em] text-ink-muted hover:text-claret transition-colors`).
- Below the row, full-bleed double rule: `<div aria-hidden class="border-t border-ink" />` then `<div aria-hidden class="mt-[3px] border-t border-hairline" />`. (revauribuilds' header is a single hairline; the ink-plus-hairline double rule is the nameplate.)
- No nav — this page has one job.

### Hero — paper
- `bg-paper`, `py-20 md:py-28`.
- Eyebrow (locked): `REVAURI AI` — `font-sans font-semibold uppercase text-xs tracking-[0.22em] text-claret`.
- H1 (locked): "Designed around your business." — `font-display font-semibold text-5xl md:text-7xl leading-[1.05] text-ink`, "your business" in `text-claret italic`.
- Subhead (2 lines max): "Revauri AI designs an AI employee around the way your business actually runs. Studied first, built by hand, never templated." — `text-ink-muted max-w-xl`.
- CTAs: primary claret button anchoring to `#craft` ("Read the craft") + text link "Go to revauri.ai ↗" (`text-claret`).
- Optional trust line under the CTAs: "You received an email from an @revauristudio.com address. That was us — this is the studio behind it." — `text-sm text-ink-muted`.
- Optional load animation: `animate-fade-up` on eyebrow → H1 → subhead → CTA with `animation-delay` stagger of 80ms. That is the only animation on the page.

### The craft — paper-deep, `id="craft"`
- `bg-paper-deep border-y border-hairline`.
- Folio row: `font-display font-semibold text-lg text-claret` "No. 01" + sans eyebrow `THE CRAFT` in `text-ink-muted`.
- H2: "Studio, not factory." — `font-display font-medium text-3xl md:text-4xl text-ink`.
- Three short paragraphs, `max-w-xl`, `text-ink-muted leading-relaxed`; the **first** takes `.drop-cap`:
  1. "Every engagement starts with study. We watch how the work actually gets done — the calls, the follow-ups, the quiet leads — before anything is designed."
  2. "Then the hire is designed around your business: its jobs, its voice, its boundaries. What it may say, what it must never say, when it hands back to you."
  3. "Nothing is templated. Two businesses in the same trade get two different hires, because the work is different. That is the craft."
- No cards, no boxes, no imagery — set type on paper, like a magazine page.

### The studio process — paper, `id="process"`
- Folio row: "No. 02" + eyebrow `THE STUDIO PROCESS` in `text-claret`.
- H2: "Look. Build. Run."
- Three steps: mobile — stacked rows `divide-y divide-hairline`, each `py-8`; desktop — `md:grid md:grid-cols-3 md:gap-10 md:divide-y-0`. **No top rules** (the sibling's device): each step is a Playfair roman numeral `I` / `II` / `III` (`font-display font-semibold text-3xl text-claret`), the name (`font-display font-medium text-2xl text-ink mt-3`), 2–3 sentence body (`text-ink-muted mt-2`), and a small sans caps meta line (`text-xs uppercase tracking-[0.18em] text-ink-muted mt-4`).
  - **I. Look** — we study how the work actually gets done today before anything is designed. Meta: `STUDY FIRST`.
  - **II. Build** — the hire is designed and assembled around your tools, your customers, your voice. Meta: `DESIGNED AROUND YOU`.
  - **III. Run** — we operate it with you; every action visible, every send approved, pause anytime. Meta: `YOU STAY THE BOSS`.

### The closing plate — ink (the one dark spread)
- Full-bleed `bg-ink`, centered, `py-24 md:py-32`. No folio, no eyebrow — a plate has no furniture.
- The standalone line (locked): "If it is not repeatable, we will not fake a system for it." — `font-display font-medium text-3xl md:text-5xl leading-[1.15] text-paper mx-auto max-w-3xl`, the words "not fake" in `text-claret-light italic`.
- Nothing else in the band. The emptiness is the emphasis.

### Final CTA — paper
- Centered, `py-24 md:py-32`.
- Folio row centered: "No. 03" + eyebrow `REVAURI AI` in `text-claret`.
- H2-scale line: "See the hire we would design for you." — `font-display font-medium text-3xl md:text-4xl text-ink`.
- Primary claret button: "Go to revauri.ai ↗" (external link to `https://revauri.ai`).
- Sans caps sub-line under it: `REVAURI.AI` in `text-ink-muted`.

### Footer — ink
- `bg-ink border-t border-hairline-dark`, `py-10`.
- Left: `Logo variant="dark"` at `text-base`, with the quiet line "A Revauri company." in `text-paper-muted`.
- Right (stacked on mobile): sans meta `text-xs uppercase tracking-[0.18em] text-paper-muted` — `© 2026 REVAURI LLC` · `JOSEPH@REVAURI.COM` (mailto) · `PRIVACY` / `TERMS` → `https://revauri.ai/privacy` / `https://revauri.ai/terms` (`hover:text-claret-light transition-colors`).
- Nothing else. No social icons, no link farm.

---

## 6. Buttons & links

**Primary CTA** (claret, used twice on the page):

```
inline-flex items-center gap-2 rounded-none bg-claret px-6 py-3
font-sans text-base font-semibold text-paper
transition-colors hover:bg-claret-bright active:translate-y-px
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-claret
```

`rounded-none` (0) — print has no corner radius; sharp corners are the atelier signal. The siblings own `rounded-sm` (2px), `rounded-[2px]`, and `rounded-md` (6px); zero is ours. Paper text on claret passes AAA (8.4:1), so no white text problems anywhere.

**Text links:**
- On light: `text-claret underline underline-offset-4 decoration-hairline hover:decoration-claret`.
- On ink: `text-claret-light underline-offset-4 hover:underline` (footer meta links may stay `text-paper-muted hover:text-claret-light` without underline).

**Focus visible everywhere:** 2px `outline-claret` with 2px offset on light sections; 2px `outline-claret-light` with 2px offset on the ink plate and footer.

---

## 7. Accessibility — verified contrast pairs (WCAG)

Ratios computed from relative luminance (WCAG 2.x formula), not eyeballed:

| Pair | Ratio | Verdict |
|---|---|---|
| `ink #1C120D` text on `paper #F5EEE6` | 16.0:1 | AAA |
| `ink` on `paper-deep #EAE0D5` | 14.1:1 | AAA |
| `ink-muted #6E5F56` on `paper` | 5.3:1 | AA |
| `ink-muted` on `paper-deep` | 4.7:1 | AA |
| `claret #722F37` on `paper` (accent text, drop cap, folios) | 8.4:1 | AAA |
| `claret` on `paper-deep` | 7.4:1 | AAA |
| `paper #F5EEE6` on `ink` (plate, footer) | 16.0:1 | AAA |
| `paper-muted #A89A8C` on `ink` (footer meta) | 6.7:1 | AA |
| `claret-light #D29AA2` on `ink` (plate emphasis, footer hover) | 7.8:1 | AAA |
| `paper` text on `claret` button fill | 8.4:1 | AAA |
| `paper` text on `claret-bright #8A3A48` hover | 6.6:1 | AA |
| `claret #722F37` on `ink` | 1.9:1 | **FAIL — never claret text on dark**; use `claret-light` |
| `brand-orange #D97757` on `paper` | 2.7:1 | **FAIL — wordmark tittle only**; never text, never a site accent |

Rules that fall out of this: the accent is text-safe everywhere it is allowed — `claret` on any light surface, `claret-light` on ink, never crossed. Muted colors are used at `text-xs` only in uppercase sans with wide tracking, which reads larger than its size.

Motion: single subtle `fade-up` (12px translate, 0.6s) on hero load; full `prefers-reduced-motion` kill-switch in the CSS block in §10. No scroll-reveal library needed for a page this short.

---

## 8. `app/icon.tsx` — favicon

Same `ImageResponse` pattern as the siblings (32×32 tile, system serif since `ImageResponse` loads no custom fonts), recolored: **a sharp paper tile with an ink R and a claret period** — "R." set like a folio. Sharp corners match the site's `rounded-none`; the paper tile reads in both light and dark tab bars and is unmistakably not revauribuilds' green-on-ink or revauridigital's teal dot.

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
          background: "#F5EEE6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#1C120D",
            lineHeight: 1,
            fontFamily: "Georgia, serif",
          }}
        >
          R<span style={{ color: "#722F37" }}>.</span>
        </span>
      </div>
    ),
    { ...size },
  );
}
```

---

## 9. What makes this distinct

- **vs revauri.ai:** that site is a product homepage — Inter, dark honeycomb hero, orange-on-black, job-picker UI, chatbot. This page has no product UI at all: no demo, no picker, no chat widget, no honeycomb, no glow. Playfair Display + Source Sans 3 replace Inter, and the page is bright paper where revauri.ai opens dark.
- **vs revauribuild:** that site is a charcoal-first workshop — dark header/hero/band/footer, copper `#D97757` as the site accent, Space Grotesk + IBM Plex Mono, blueprint grid, spec-sheet steps with 2px top rules, copper bar markers, `rounded-sm`. Ours inverts it: light-first with one dark plate, claret accent (orange quarantined to the wordmark tittle), serif display type, no grids, no top rules, no bar markers, sharp corners.
- **vs revauribuilds:** that site is a flat light ledger — `#F5F6F2` green-gray paper, stamp green `#16A34A`, Libre Franklin + Space Mono, one ruled 3×3 grid, `rounded-[2px]`, light until the footer. Ours is rose-warm paper with a deep band in the middle, claret not green, serif folios instead of mono index numbers, and no ruled cells anywhere.
- **vs revauridigital:** that site is dark-only night desk — ink `#0A0F14`, electric teal `#2DD4BF`, Instrument Sans + JetBrains Mono, masked console grid, status dots, log lines, `rounded-md`. Ours is a bright printed page: no dots, no logs, no console, no mono, no teal.
- **vs revauridesign:** that site is Fraunces-on-cream (`#FAF9F5`, Inter + Fraunces text). The brief's "NOT Fraunces-on-cream" is answered directly: our paper `#F5EEE6` is rose-warm where theirs is neutral, our display serif is Playfair — a sharp Didone, not Fraunces' soft wonk — and Fraunces survives only inside the official wordmark. Inter never appears.
- **Own identity:** the atelier issue. A masthead double-rule, folio numbers, one claret drop cap, roman-numeral steps, sharp corners, and a single full-bleed ink plate for the one hard rule — a magazine page about a craft, not a dashboard about a product. The only sibling with a serif-led page and no mono at all.

---

## 10. `app/globals.css` — paste-ready token block

Tailwind CSS v4, same `@theme inline` pattern as the sibling sites. Replace the entire scaffolded file (including the Geist variables and the `prefers-color-scheme` block) with the following. No dark-mode class, no theme script — sections are explicitly colored.

```css
@import "tailwindcss";

:root {
  --background: #F5EEE6;
  --foreground: #1C120D;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  /* Brand tokens — required by the verbatim Logo component */
  --color-brand-orange: #D97757; /* official mark, exact hex — wordmark tittle only, never a site accent */
  --color-brand-dark: #1C120D;
  --color-brand-cream: #F5EEE6;
  --color-brand-mid-gray: #B0AEA5;

  /* Site palette */
  --color-paper: #F5EEE6;
  --color-paper-deep: #EAE0D5;
  --color-ink: #1C120D;
  --color-ink-muted: #6E5F56;
  --color-paper-muted: #A89A8C;
  --color-claret: #722F37;
  --color-claret-bright: #8A3A48;
  --color-claret-light: #D29AA2;
  --color-hairline: #DDD0C2;
  --color-hairline-dark: #3A2C24;

  /* Type */
  --font-sans: var(--font-source-sans-3), ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-display: var(--font-playfair), Georgia, "Times New Roman", serif;
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
  background: #722F37;
  color: #F5EEE6;
}

/* Drop cap — one per page, craft section lead paragraph only. */
.drop-cap::first-letter {
  font-family: var(--font-playfair), Georgia, serif;
  font-weight: 600;
  font-size: 3.4em;
  line-height: 0.85;
  float: left;
  padding-top: 0.06em;
  padding-right: 0.12em;
  color: var(--color-claret);
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
