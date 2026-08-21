# revauribuilds.com — Visual Design Spec

One-page trust site for people who received an email from `@revauribuilds.com` and typed the domain into a browser. Message: **"The jobs a hire can take."** This is a door to the product at `https://revauri.ai`, not a product homepage. Primary CTA → `https://revauri.ai/book`.

**Direction:** job board / workbench ledger. Soft ledger paper, ink text, one sharp stamp-green accent. Nine jobs set as a single ruled 3×3 ledger — numbered cells, hairlines, tidy rows. Light-first: every section is paper except the footer. Not SaaS, not agency brochure, not the revauri.ai honeycomb, and not revauribuild's charcoal workshop.

---

## 1. Palette

Light/dark plan: **paper header**, **paper hero + ledger grid**, **paper job grid**, **paper-sunk closing band**, **ink footer**. Rhythm: light → light → light → light → dark. revauribuild opens charcoal and stays dark half the page; this site stays bright until the footer — the fastest visual separation between the two "build" domains.

| Token | Hex | Role |
|---|---|---|
| `paper` | `#F5F6F2` | Page background, all light sections. Cool ledger paper with a whisper of green-gray — brighter than revauribuild's `#F2ECDF`, cooler than revauridesign's `#FAF9F5` |
| `paper-sunk` | `#EBEEE8` | One alt light band (closing line + CTA) |
| `ink` | `#181C19` | Primary text on light; the footer's dark background. Near-black with a faint green lean |
| `ink-muted` | `#5A635A` | Muted/secondary text on light sections |
| `paper-muted` | `#9AA39B` | Muted/secondary text on the ink footer |
| `stamp` | `#16A34A` | **The one accent.** CTA button fill, decorative marks, accent text **on the ink footer only**. Fails AA as text on paper — see §6 |
| `stamp-bright` | `#1FBA63` | CTA hover state only |
| `stamp-deep` | `#12733B` | Green **text** on light backgrounds (eyebrows, index numbers, links, one word of the H1) |
| `hairline` | `#DCE1D8` | 1px rules and ledger cell borders on light sections |
| `hairline-dark` | `#2D342E` | 1px rules on the ink footer |

Brand tokens required by the verbatim `Logo` component: `brand-orange` (exact `#D97757`), `brand-dark`, `brand-cream`, `brand-mid-gray`. Map `brand-dark` → our ink and `brand-cream` → our paper so the wordmark sits natively in this palette; `brand-mid-gray` keeps the sibling value `#B0AEA5` (used only by the optional logo suffix).

**The orange quarantine — the rule that separates this site from revauribuild:** on revauribuild, copper `#D97757` *is* the site accent. Here, `#D97757` appears **only** inside the official wordmark (the 8px tittle bar) and nowhere else on the page — no orange text, borders, markers, or fills. The stamp green never sits immediately adjacent to the wordmark either; the logo stands alone. Green and the small orange tittle harmonize (ledger + stamp pad), but each keeps its own territory.

---

## 2. Typography

**Pairing: Libre Franklin (display + body) + Space Mono (eyebrows, index numbers, meta).** Libre Franklin is a Franklin Gothic revival — the typeface family of American newspaper classifieds, which is where job boards come from. Space Mono is a typewriter-flavored mono: typed ledger entries, clearly not revauribuild's IBM Plex Mono. Neither is Inter (revauri.ai, revauridesign) or Space Grotesk (revauribuild). Fraunces loads only so the official wordmark keeps its serif; it appears nowhere else on the page.

Verified against the installed `next@16.3.1` `next/font/google` metadata: **Libre Franklin is variable** (`wght` 100–900 — load with no `weight` key, use Tailwind weight utilities), **Space Mono is static 400/700 only** (the `weight` array is required), **Fraunces is variable**.

`app/layout.tsx` wiring (replaces the scaffolded Geist setup):

```ts
import { Libre_Franklin, Space_Mono, Fraunces } from "next/font/google";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"], // static-only family — required
  variable: "--font-space-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// <html className={`${libreFranklin.variable} ${spaceMono.variable} ${fraunces.variable} antialiased`}>
```

| Element | Font / utility | Size mobile → desktop | Notes |
|---|---|---|---|
| Hero H1 ("The jobs a hire can take.") | `font-sans font-bold` | `text-4xl` → `md:text-6xl` | `tracking-[-0.02em] leading-[1.05]`; one word ("jobs") or the period in `text-stamp-deep` |
| Section H2 (closing line) | `font-sans font-bold` | `text-3xl` → `md:text-4xl` | `tracking-tight` |
| Job names (card titles) | `font-sans font-semibold` | `text-lg` | `tracking-tight` |
| Body / lead / card copy | `font-sans` | `text-sm` → `md:text-base` | `leading-relaxed`, hero lead measure capped `max-w-xl` |
| Eyebrows, section labels | `font-mono uppercase` | `text-xs` | `tracking-[0.2em]`, `text-stamp-deep` on light / `text-stamp` on ink |
| Ledger index numbers 01–09 | `font-mono font-bold` | `text-sm` | `text-stamp-deep` |
| Meta text (footer, address, sub-lines) | `font-mono uppercase` | `text-xs` | `tracking-[0.15em]`, muted color of the section |

Libre Franklin is a sturdy American gothic — do not add positive tracking to display type; only the mono labels get wide tracking. Space Mono has no weights below 400; that is fine, it is never used for long reading.

---

## 3. Texture & motifs (pick these two, nothing more)

1. **The ruled ledger + mono index numbers** — the system-wide structure. The nine job cards share 1px `hairline` borders as one continuous ruled sheet (no gaps, no card shadows, no rounded boxes); every job gets a mono index number `01`–`09`; every section gets a mono eyebrow label. This is the whole "job board / workbench" voice — cheap and fast.
2. **Ledger grid** — `.ledger-grid` (see §9), hero section only: faint ink lines at 4% on paper, 48px cells. Graph paper on the workbench. No gradients, no glow, no honeycomb.

Deliberately **not** used: revauribuild's copper bar markers and 2px spec-sheet top rules — those are the sibling's devices. No icons, no emoji, no stock imagery anywhere.

---

## 4. Section-by-section

Global rhythm: container `mx-auto max-w-6xl px-5 md:px-8`; sections `py-20 md:py-28`; header `h-16`. Mobile-first, single column until `md`. Use `Logo variant="light"` (ink wordmark) on all light sections and `variant="dark"` (paper wordmark) in the footer; never `variant="auto"`. Copy below follows the copy lock — do not invent job cards, stats, or testimonials.

### Header — paper, hairline bottom
- `bg-paper border-b border-hairline`. (revauribuild's header is borderless charcoal merging into its hero — ours is a clean ruled masthead line.)
- Left: `Logo variant="light"`. Right: one mono link `REVAURI.AI ↗` (`font-mono text-xs uppercase tracking-[0.2em] text-ink-muted hover:text-stamp-deep transition-colors`).
- No nav — this page has one job.

### Hero — paper + ledger grid
- `bg-paper ledger-grid`.
- Mono eyebrow: `REVAURI AI` in `text-stamp-deep`.
- H1 "The jobs a hire can take." — `text-ink`, "jobs" in `text-stamp-deep`.
- Subhead (locked copy): "Quiet leads. Missed calls. Quotes that die. Reviews. Reminders. The busywork you keep meaning to hand off." — `text-ink-muted max-w-xl`.
- CTAs: primary stamp button "Book a 20-minute call" → `https://revauri.ai/book` + text link "Go to revauri.ai ↗" (`text-stamp-deep`).
- Optional load animation: `animate-fade-up` on eyebrow → H1 → subhead → CTA with `animation-delay` stagger of 80ms. That's the only animation on the page.

### Job grid — the ruled ledger, `id="jobs"`
- Mono eyebrow `THE BOARD` in `text-stamp-deep`, then the grid `mt-8`.
- The grid is one ruled sheet: `grid grid-cols-1 md:grid-cols-3 border-t border-l border-hairline`; each cell `border-b border-r border-hairline p-6 md:p-7`. Nine cells, 3×3 on desktop, stacked on mobile — every cell fully ruled on every breakpoint.
- Each cell: mono index `01`–`09` (`font-mono font-bold text-sm text-stamp-deep`); job name (`font-sans font-semibold text-lg text-ink mt-3`); 1–2 sentence body (`text-sm text-ink-muted leading-relaxed mt-2`).
- **Static cells only** — no links, no hover states, no picker. The ninth cell ("Something else") gets identical treatment; the copy differentiates it.
- The nine jobs, locked wording: Quiet leads / After-hours / missed calls / Quotes with no second follow-up / Reviews / Appointment reminders / no-shows / After-the-job check-in / Inbox / admin busywork / Reactivating past customers / Something else.

### Closing band — paper-sunk
- `bg-paper-sunk border-y border-hairline`, centered, `py-20 md:py-24`.
- H2-scale line (locked copy): "A standard hire starts with two of these." — `text-ink`, "two" in `text-stamp-deep`.
- Primary stamp button: "Book a 20-minute call" → `https://revauri.ai/book`.
- Mono sub-line under it: `REVAURI.AI` in `text-ink-muted`.

### Footer — ink (the one dark section)
- `bg-ink border-t border-hairline-dark`, `py-10`.
- Left: `Logo variant="dark"` at `text-base`, with the quiet line "A Revauri company." in `text-paper-muted`.
- Right (stacked on mobile): mono meta `text-paper-muted` — `© 2026 REVAURI LLC` · `725 JORALEMON STREET, UNIT 127, BELLEVILLE, NJ 07109` · `JOSEPH@REVAURI.COM` · links `PRIVACY` / `TERMS` → `https://revauri.ai/privacy` / `https://revauri.ai/terms` (`hover:text-stamp transition-colors`).
- Optional, one quiet line max: website design lives at revauri.com. Nothing else. No social icons, no link farm.

---

## 5. Buttons & links

**Primary CTA** (stamp fill, used twice on the page):

```
inline-flex items-center gap-2 rounded-[2px] bg-stamp px-6 py-3
font-sans text-base font-semibold text-ink
transition-colors hover:bg-stamp-bright active:translate-y-px
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink
```

`rounded-[2px]` — workbench, not SaaS pill. Ink text on stamp passes AA (5.2:1, see §6), so no white text on green anywhere.

**Text links:**
- On light: `text-stamp-deep underline underline-offset-4 decoration-hairline hover:decoration-stamp-deep`.
- On ink: `text-stamp underline-offset-4 hover:underline` (footer links may stay `text-paper-muted hover:text-stamp` without underline).

**Focus visible everywhere:** 2px `outline-ink` with 2px offset on light sections (passes 3:1 against both paper and the stamp button fill — `stamp-deep` would not); on the ink footer, 2px `outline-stamp` with 2px offset.

---

## 6. Accessibility — verified contrast pairs (WCAG)

Ratios computed from relative luminance (WCAG 2.x formula), not eyeballed:

| Pair | Ratio | Verdict |
|---|---|---|
| `ink #181C19` text on `paper #F5F6F2` | 15.9:1 | AAA |
| `ink` on `paper-sunk #EBEEE8` | 14.7:1 | AAA |
| `ink-muted #5A635A` on `paper` | 5.8:1 | AA |
| `ink-muted` on `paper-sunk` | 5.3:1 | AA |
| `stamp-deep #12733B` on `paper` | 5.5:1 | AA |
| `stamp-deep` on `paper-sunk` | 5.1:1 | AA |
| `paper #F5F6F2` on `ink` (footer) | 15.9:1 | AAA |
| `paper-muted #9AA39B` on `ink` (footer meta) | 6.6:1 | AAA |
| `stamp #16A34A` on `ink` (footer accent text/links) | 5.2:1 | AA |
| `ink` text on `stamp` button fill | 5.2:1 | AA |
| `ink` text on `stamp-bright #1FBA63` hover | 6.8:1 | AAA |
| `stamp #16A34A` on `paper` | 3.0:1 | **FAIL — decorative only on light** (borders, fills); never text |
| `brand-orange #D97757` on `paper` | 2.9:1 | **FAIL — wordmark tittle only**; never text, never a site accent |

Rules that fall out of this: on light backgrounds, green text is always `stamp-deep`; `stamp` is fills/decoration on light and may be text only on the ink footer. Muted colors are used at `text-xs` only in uppercase mono with wide tracking, which reads larger than its size.

Motion: single subtle `fade-up` (12px translate, 0.6s) on hero load; full `prefers-reduced-motion` kill-switch in the CSS block in §9. No scroll-reveal library needed for a page this short.

---

## 7. `app/icon.tsx` — favicon

Same pattern as the sibling's `app/icon.tsx` (32×32 `ImageResponse` tile, single letterform, system serif since `ImageResponse` loads no custom fonts), recolored to this site: **ink tile, stamp-green R**. The green-on-ink tile reads in both light and dark browser tab bars and is unmistakably not revauribuild's orange-on-charcoal.

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
          borderRadius: 6,
          background: "#181C19",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#16A34A",
            lineHeight: 1,
            fontFamily: "Georgia, serif",
          }}
        >
          R
        </span>
      </div>
    ),
    { ...size },
  );
}
```

---

## 8. What makes this distinct

- **vs revauri.ai:** that site is a product homepage — Inter, dark honeycomb hero, interactive job-picker, chatbot, orange-on-black. This page has no product UI at all: no demo, no picker, no chat widget, no honeycomb, no glow. Nine static ruled cells replace the interactive picker, and the page is light-first where revauri.ai opens dark.
- **vs revauribuild:** that site is a charcoal-first workshop — dark header/hero/band/footer, copper `#D97757` as the site accent, Space Grotesk + IBM Plex Mono, blueprint grid on dark, spec-sheet steps with 2px top rules. This site inverts all of it: light-first paper with only a dark footer, a green stamp accent (orange quarantined to the wordmark tittle), Libre Franklin + Space Mono, a faint ledger grid on light, and one continuous ruled 3×3 ledger instead of spec-sheet steps.
- **vs revauridesign:** that site is a cream agency brochure (`#FAF9F5`, Inter + Fraunces text). Our paper `#F5F6F2` is cooler with a faint green lean, our text never touches Inter or Fraunces (Fraunces survives only inside the official wordmark), and the numbered job ledger replaces brochure sections.
- **Own identity:** the classifieds page, set well. A single ruled sheet of nine numbered jobs, a typewriter mono calling the rows, and one stamp-green accent — the stamp that says the job is taken. The brightest, quietest, and most ledger-like of the four sites.

---

## 9. `app/globals.css` — paste-ready token block

Tailwind CSS v4, same `@theme inline` pattern as the sibling sites. Replace the entire scaffolded file (including the Geist variables and the `prefers-color-scheme` block) with the following. No dark-mode class, no theme script — sections are explicitly colored.

```css
@import "tailwindcss";

:root {
  --background: #F5F6F2;
  --foreground: #181C19;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  /* Brand tokens — required by the verbatim Logo component */
  --color-brand-orange: #D97757; /* official mark, exact hex — wordmark tittle only, never a site accent */
  --color-brand-dark: #181C19;
  --color-brand-cream: #F5F6F2;
  --color-brand-mid-gray: #B0AEA5;

  /* Site palette */
  --color-paper: #F5F6F2;
  --color-paper-sunk: #EBEEE8;
  --color-ink: #181C19;
  --color-ink-muted: #5A635A;
  --color-paper-muted: #9AA39B;
  --color-stamp: #16A34A;
  --color-stamp-bright: #1FBA63;
  --color-stamp-deep: #12733B;
  --color-hairline: #DCE1D8;
  --color-hairline-dark: #2D342E;

  /* Type */
  --font-sans: var(--font-libre-franklin), ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-space-mono), ui-monospace, "SFMono-Regular", Menlo, monospace;
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
  background: #16A34A;
  color: #181C19;
}

/* Ledger grid — hero texture, light sections only. Cheap CSS, no SVG. */
.ledger-grid {
  background-image:
    linear-gradient(to right, rgba(24, 28, 25, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(24, 28, 25, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
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
