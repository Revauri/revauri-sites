# revauribuild.com — Visual Design Spec

One-page trust site for people who received an email from `@revauribuild.com` and typed the domain into a browser. Message: **"We build the hire."** This is a door to the product at `https://revauri.ai`, not a product homepage.

**Direction:** workshop / build. Charcoal, copper, warm bone paper. A shop floor where systems get assembled — spec sheets, hairlines, index numbers, mono labels. Not SaaS, not agency brochure, not the revauri.ai honeycomb.

---

## 1. Palette

Light/dark plan: **charcoal header + hero**, warm-paper body, **charcoal phone-answering band**, warm-paper CTA, **charcoal footer**. Rhythm: dark → light → light → dark → light → dark. Both sibling sites open light; opening dark is the fastest visual separation for a visitor who just typed the domain.

| Token | Hex | Role |
|---|---|---|
| `charcoal` | `#211E1A` | Dark section backgrounds (header/hero, phone band, footer); primary text on light sections |
| `charcoal-panel` | `#2B2621` | Raised surface on dark (rarely used — a card or chip on charcoal) |
| `paper` | `#F2ECDF` | Page background, light sections. Warm bone/shop-paper — visibly warmer and deeper than revauridesign's `#FAF9F5` |
| `paper-deep` | `#E9E0CC` | Alt light section background ("stay in charge" section) |
| `copper` | `#D97757` | **Official brand orange — exact hex, do not change.** CTA button fill, accent bars, step numbers on dark, decorative marks |
| `copper-bright` | `#E08B6A` | CTA hover state only |
| `copper-deep` | `#9C452A` | Copper **text** on light backgrounds (step numbers, links, small accents). `#D97757` fails AA as text on paper — never use it for text on light |
| `ink-muted` | `#6B6156` | Muted/secondary text on light sections |
| `paper-muted` | `#B0AEA5` | Muted/secondary text on charcoal sections |
| `hairline` | `#D9CFBB` | 1px rules and dividers on light sections |
| `hairline-dark` | `#3D372E` | 1px rules and dividers on charcoal sections |

Brand tokens required by the verbatim `Logo` component: `brand-orange` (exact `#D97757`), `brand-dark`, `brand-cream`, `brand-mid-gray`. Judgment call: map `brand-dark` → our charcoal and `brand-cream` → our paper so the wordmark sits natively in this palette; `brand-orange` stays untouched; `brand-mid-gray` keeps the sibling value `#B0AEA5` (used only by the optional logo suffix).

---

## 2. `app/globals.css` — paste-ready token block

Tailwind CSS v4, same `@theme inline` pattern as revauridesign-site. Replace the scaffolded Geist variables.

```css
@import "tailwindcss";

:root {
  --background: #F2ECDF;
  --foreground: #211E1A;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  /* Brand tokens — required by the verbatim Logo component */
  --color-brand-orange: #D97757; /* official mark, exact hex */
  --color-brand-dark: #211E1A;
  --color-brand-cream: #F2ECDF;
  --color-brand-mid-gray: #B0AEA5;

  /* Site palette */
  --color-charcoal: #211E1A;
  --color-charcoal-panel: #2B2621;
  --color-paper: #F2ECDF;
  --color-paper-deep: #E9E0CC;
  --color-copper: #D97757;
  --color-copper-bright: #E08B6A;
  --color-copper-deep: #9C452A;
  --color-ink-muted: #6B6156;
  --color-paper-muted: #B0AEA5;
  --color-hairline: #D9CFBB;
  --color-hairline-dark: #3D372E;

  /* Type */
  --font-sans: var(--font-space-grotesk), ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-ibm-plex-mono), ui-monospace, "SFMono-Regular", Menlo, monospace;
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

/* Blueprint grid — hero texture, charcoal sections only. Cheap CSS, no SVG. */
.blueprint-grid {
  background-image:
    linear-gradient(to right, rgba(242, 236, 223, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(242, 236, 223, 0.045) 1px, transparent 1px);
  background-size: 56px 56px;
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

No dark-mode class, no theme script — sections are explicitly colored. Use `Logo variant="dark"` (cream wordmark) on charcoal sections and `variant="light"` (charcoal wordmark) on light sections; never `variant="auto"`.

---

## 3. Typography

**Pairing: Space Grotesk (display + body) + IBM Plex Mono (eyebrows, labels, step numbers, meta).** Both on Google Fonts, both industrial/technical — they read "shop floor spec sheet," and they are clearly not Inter (both siblings) and not Fraunces-for-text (revauridesign). Fraunces loads only so the official wordmark keeps its serif; it appears nowhere else on the page.

`app/layout.tsx` wiring (replaces the scaffolded Geist setup):

```ts
import { Space_Grotesk, IBM_Plex_Mono, Fraunces } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// <html className={`${spaceGrotesk.variable} ${plexMono.variable} ${fraunces.variable} antialiased`}>
```

| Element | Font / utility | Size mobile → desktop | Notes |
|---|---|---|---|
| Hero H1 ("We build the hire.") | `font-sans font-medium` | `text-5xl` → `md:text-7xl` | `tracking-[-0.02em] leading-[1.05]`; the period (or one word) in `text-copper` |
| Section H2 | `font-sans font-medium` | `text-3xl` → `md:text-4xl` | `tracking-tight` |
| Step names (Look / Build / Run) | `font-sans font-medium` | `text-2xl` | `tracking-tight` |
| Body / lead | `font-sans` | `text-base` → `md:text-lg` | `leading-relaxed`, measure capped `max-w-xl` |
| Eyebrows, section labels | `font-mono uppercase` | `text-xs` | `tracking-[0.2em]`, `text-copper-deep` on light / `text-copper` on dark |
| Step numbers 01/02/03 | `font-mono font-medium` | `text-sm` | `text-copper-deep` on light / `text-copper` on dark |
| Meta text (durations, footer, spec lists) | `font-mono uppercase` | `text-xs` | `tracking-[0.15em]`, muted color of the section |

Space Grotesk already runs slightly condensed — do not add positive tracking to display type; only the mono labels get wide tracking.

---

## 4. Texture & motifs (pick these two, nothing more)

1. **Blueprint grid** — `.blueprint-grid` above, hero section only, at 4.5% paper-on-charcoal. Barely-there shop drawing paper. No gradients, no glow, no honeycomb.
2. **Hairline rules + mono index labels** — the system-wide structure. 1px `border-hairline` / `border-hairline-dark` dividers between sections and rows; every section gets a mono eyebrow label; steps get mono index numbers. This is the whole "workshop" voice — cheap and fast.

Small tie-in: list markers are a `10px × 2px` copper bar (`bg-copper`, `rounded-[1px]`), echoing the wordmark's accent bar. No icons, no emoji, no stock imagery anywhere.

---

## 5. Section-by-section

Global rhythm: container `mx-auto max-w-6xl px-5 md:px-8`; sections `py-20 md:py-28`; header `h-16`. Mobile-first, single column until `md`.

### Header — charcoal, merges into hero
- `bg-charcoal`, no bottom border (hero continues the same surface).
- Left: `Logo variant="dark"`. Right: one mono link `REVAURI.AI ↗` (`font-mono text-xs uppercase tracking-[0.2em] text-paper-muted hover:text-copper`).
- No nav — this page has one job.

### Hero — charcoal + blueprint grid
- `bg-charcoal blueprint-grid`.
- Mono eyebrow: `REVAURI BUILD — AN AI EMPLOYEE FOR THE JOB YOU HATE` in `text-copper`.
- H1 "We build the hire." — `text-paper`, copper period.
- Lead paragraph (2 lines max): we look at how the work runs today, build two workflows, run them — you stay the boss. `text-paper-muted max-w-xl`.
- CTAs: primary copper button (anchor to `#how`) + text link "Go to revauri.ai ↗" (`text-copper`).
- Optional load animation: `animate-fade-up` on eyebrow → H1 → lead → CTA with `animation-delay` stagger of 80ms. That's the only animation on the page.

### How we build — paper, `id="how"`
- Mono eyebrow `THE PROCESS`, H2 "Look. Build. Run."
- Three steps as a spec sheet: mobile — stacked rows `divide-y divide-hairline`, each `py-8`; desktop — `md:grid md:grid-cols-3 md:gap-10 md:divide-y-0`, each step `border-t-2 border-charcoal pt-6` (a 2px charcoal top rule per step = spec-sheet header).
- Each step: mono index `01` / `02` / `03` in `text-copper-deep`; name (`text-2xl font-medium`); 2–3 sentence body `text-ink-muted`; mono meta line, e.g. `DAYS 1–3 — WE WATCH THE WORK` / `WEEK ONE — TWO WORKFLOWS, BUILT` / `ONGOING — WE RUN THEM, YOU APPROVE`.
- Step copy: **Look** — we study how the job actually gets done today. **Build** — we assemble two workflows around your tools. **Run** — we operate them; every action is visible to you.

### What you stay in charge of — paper-deep
- `bg-paper-deep`, `border-y border-hairline`.
- Mono eyebrow `YOUR CALL`, H2 "What you stay in charge of."
- Checklist rows, `divide-y divide-hairline`, each row `flex items-baseline gap-4 py-4`: copper bar marker + short statement in `font-sans text-lg` — e.g. "Approve every workflow before it runs." / "See every message it sends." / "Pause or stop it anytime." / "Your tools, your logins, your name on everything."
- No cards, no boxes — rows and hairlines only.

### Phone-answering band — charcoal
- `bg-charcoal`, mono eyebrow `EXTRA HIRE` in `text-copper`, H2 "It answers the phone too." in `text-paper`.
- Two columns at `md`: left — 2–3 sentences `text-paper-muted`; right — mono spec list `divide-y divide-hairline-dark`, rows `py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper`: `24/7 ANSWERING` / `MISSED-CALL TEXT-BACK` / `BOOKED STRAIGHT INTO YOUR CALENDAR`.
- This band breaks the light rhythm and re-anchors the page in the workshop before the ask.

### Final CTA — paper
- Centered, `py-24 md:py-32`.
- H2-scale line: "The job you hate is the first thing we build." `text-charcoal`, one word or the period in `text-copper-deep`.
- Primary copper button: "Start at revauri.ai ↗" (external link to `https://revauri.ai`).
- Mono sub-line under it: `REVAURI.AI` in `text-ink-muted`.

### Footer — charcoal
- `bg-charcoal border-t border-hairline-dark`, `py-10`.
- Left: `Logo variant="dark"` at `text-base`. Right: mono meta `© 2026 REVAURI LLC` and `JOSEPH@REVAURI.COM`, `text-paper-muted`, stacked on mobile.
- Nothing else. No social icons, no link farm.

---

## 6. Buttons & links

**Primary CTA** (copper, used twice on the page):

```
inline-flex items-center gap-2 rounded-sm bg-copper px-6 py-3
font-sans text-base font-medium text-charcoal
transition-colors hover:bg-copper-bright active:translate-y-px
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper
```

`rounded-sm` (2px) — workshop, not SaaS pill. Charcoal text on copper passes AA (see below), so no white text on copper anywhere.

**Secondary / ghost** (only if needed, dark sections): `border border-hairline-dark text-paper px-6 py-3 rounded-sm hover:border-copper hover:text-copper transition-colors`.

**Text links:**
- On light: `text-copper-deep underline underline-offset-4 decoration-hairline hover:decoration-copper-deep`.
- On dark: `text-copper underline-offset-4 hover:underline`.

Focus visible everywhere: 2px copper outline, 2px offset (2px `copper-deep` outline on copper-filled elements).

---

## 7. Accessibility — verified contrast pairs (WCAG)

| Pair | Ratio | Verdict |
|---|---|---|
| `charcoal #211E1A` text on `paper #F2ECDF` | ≈14.1:1 | AAA |
| `charcoal` on `paper-deep #E9E0CC` | ≈12.7:1 | AAA |
| `ink-muted #6B6156` on `paper` | ≈5.1:1 | AA |
| `ink-muted` on `paper-deep` | ≈4.6:1 | AA |
| `paper #F2ECDF` on `charcoal` | ≈14.1:1 | AAA |
| `paper-muted #B0AEA5` on `charcoal` | ≈7.5:1 | AAA |
| `copper #D97757` on `charcoal` | ≈5.3:1 | AA (text OK on dark) |
| `copper-deep #9C452A` on `paper` | ≈5.4:1 | AA |
| `copper-deep` on `paper-deep` | ≈4.9:1 | AA |
| `charcoal` text on `copper` button | ≈5.3:1 | AA |
| `copper #D97757` on `paper` | ≈2.7:1 | **FAIL — decorative only on light** (bars, markers, borders); never text |

Rules that fall out of this: copper `#D97757` is text **only on charcoal**; on light backgrounds copper text is always `copper-deep`. Muted colors are never used below `text-xs`… they are used *at* `text-xs` only in uppercase mono with wide tracking, which reads larger than its size.

Motion: single subtle `fade-up` (12px translate, 0.6s) on hero load; full `prefers-reduced-motion` kill-switch in the CSS block above. No scroll-reveal library needed for a page this short — if added later, reuse the same keyframes and the same media query.

---

## 8. What makes this distinct

- **vs revauri.ai:** that site is a product homepage — Inter, dark honeycomb hero, job-picker demo, chatbot. This page has no product UI at all: no demo, no chat widget, no honeycomb, no glow. Space Grotesk + IBM Plex Mono replace Inter, and the blueprint grid + spec-sheet steps replace the honeycomb.
- **vs revauridesign-site:** that site is a cream agency brochure (`#FAF9F5`, Inter + Fraunces text). Our paper `#F2ECDF` is visibly warmer and deeper, our text never touches Inter or Fraunces (Fraunces survives only inside the official wordmark), and the charcoal-first layout inverts its light-first feel.
- **Own identity:** the shop floor. Mono index numbers, hairline spec sheets, copper bar markers echoing the wordmark's tittle bar, and one blueprint grid — a place where the hire gets built, not a page that markets software.
