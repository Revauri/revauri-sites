# revauribuild.com — Visual Design Spec

One-page trust site for people who received an email from `@revauribuild.com` and typed the domain into a browser. Message: **"We build the hire."** This is a door to the product at `https://revauri.ai`, not a product homepage.

**Direction:** the shop floor at night. The page is a cold steel bench; the middle sections ("How we build" + "What you stay in charge of") are rendered as **one physical paper work order** lying on that bench — ticket header, boxed index fields, ruled spec rows, a dashed perforation, then the authorization block. A real work order is scope-of-work plus authorization, so the structure encodes what the copy already says. Copper is hardware on steel, never terracotta on cream. Not SaaS, not agency brochure, not the revauri.ai honeycomb.

---

## 1. Palette

Dark-first. Only the work-order sheet is light; every other surface is steel. Rhythm: dark hero → paper artifact on dark bench → dark phone band → dark CTA → dark footer.

| Token | Hex | Role |
|---|---|---|
| `steel` | `#16181D` | Page background; header/hero/bench/CTA/footer; primary text on paper |
| `steel-panel` | `#1D2026` | Phone-answering band surface |
| `steel-line` | `#2C3038` | 1px rules and dividers on dark |
| `steel-muted` | `#9BA2AC` | Muted/secondary text on dark |
| `paper` | `#EDEAE0` | The work-order sheet — the page's only light surface |
| `paper-deep` | `#E3DDCC` | Ticket header strip on the sheet |
| `paper-line` | `#D8D2C2` | 1px rules and dividers on the sheet |
| `ink-muted` | `#5F636B` | Muted/secondary text on the sheet |
| `copper` | `#D97757` | **Official brand orange — exact hex, do not change.** CTA fill, eyebrow bar, sheet top bar, list markers, text on dark only |
| `copper-bright` | `#E08B6A` | CTA hover state only |
| `copper-deep` | `#9C452A` | Copper **text** on paper (eyebrows, index numbers). `#D97757` fails AA as text on paper — never use it for text there |

Brand tokens required by the verbatim `Logo` component: `brand-orange` (exact `#D97757`), `brand-dark` → `steel`, `brand-cream` → `paper`, `brand-mid-gray` → `steel-muted` (used only by the optional logo suffix).

---

## 2. `app/globals.css` — token block

Tailwind CSS v4 `@theme inline`. Fonts are wired in `app/layout.tsx`; the CSS variables `--font-plex-sans`, `--font-plex-cond`, `--font-plex-mono`, `--font-fraunces` come from `next/font/google`.

Key tokens: `--color-steel #16181D`, `--color-steel-panel #1D2026`, `--color-steel-line #2C3038`, `--color-steel-muted #9BA2AC`, `--color-paper #EDEAE0`, `--color-paper-deep #E3DDCC`, `--color-paper-line #D8D2C2`, `--color-ink-muted #5F636B`, `--color-copper #D97757`, `--color-copper-bright #E08B6A`, `--color-copper-deep #9C452A`; `--font-sans` (Plex Sans), `--font-display` (Plex Sans Condensed), `--font-mono` (Plex Mono), `--font-serif` (Fraunces — **logo wordmark only**); `--animate-fade-up`.

No dark-mode class, no theme script — sections are explicitly colored. Use `Logo variant="dark"` everywhere (every surface the logo sits on is steel).

### Shop grid (hero texture)

```css
.shop-grid {
  background-image:
    linear-gradient(to right, rgba(237, 234, 224, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(237, 234, 224, 0.05) 1px, transparent 1px),
    linear-gradient(to right, rgba(237, 234, 224, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(237, 234, 224, 0.1) 1px, transparent 1px);
  background-size: 48px 48px, 48px 48px, 240px 240px, 240px 240px;
}
```

Minor cells at 5% paper-on-steel with a heavier major line every 5 cells (240px) at 10% — layout paper on the bench, present enough to read as a grid. Hero section only. No gradients, no glow, no honeycomb.

---

## 3. Typography

**System: IBM Plex Sans Condensed (display) + IBM Plex Sans (body) + IBM Plex Mono (ticket chrome).** One engineered superfamily — the condensed face is the equipment-plate voice, the mono is the form-fill voice. Fraunces loads only so the official wordmark keeps its serif; it appears nowhere else on the page.

`app/layout.tsx` wiring:

```ts
import {
  IBM_Plex_Sans,
  IBM_Plex_Sans_Condensed,
  IBM_Plex_Mono,
  Fraunces,
} from "next/font/google";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-plex-cond",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});
```

| Element | Font / utility | Size mobile → desktop | Notes |
|---|---|---|---|
| Hero H1 ("We build the hire.") | `font-display font-semibold` | `text-5xl` → `md:text-7xl` | `leading-[1.02] tracking-[-0.01em]`; the period in `text-copper` |
| Section H2 | `font-display font-semibold` | `text-3xl` → `md:text-4xl` | `tracking-[-0.01em]`; final CTA bumps to `md:text-5xl` |
| Step names (Look / Build / Run) | `font-display font-semibold` | `text-2xl` | `tracking-[-0.01em]` |
| Body / lead | `font-sans` | `text-base` → `md:text-lg` | `leading-relaxed`, measure capped `max-w-xl` |
| Eyebrows, section labels | `font-mono uppercase` | `text-xs` | `tracking-[0.2em]`, `text-copper` on steel / `text-copper-deep` on paper |
| Ticket header, step indexes, meta | `font-mono uppercase` | `text-[11px]`–`text-sm` | `tracking-[0.15em]`–`[0.2em]`, muted color of the surface |

Headings stay sentence case as written in the copy — the uppercase industrial voice lives in the mono labels only.

---

## 4. Signature: the work order

"How we build" and "What you stay in charge of" render as **one continuous paper job ticket** on the steel bench:

- The sheet: `bg-paper`, `rounded-[2px]`, `border border-black/50`, lifted off the bench with `shadow-[0_1px_0_rgba(0,0,0,0.5),0_24px_48px_-24px_rgba(0,0,0,0.6)]`.
- A 3px `bg-copper` bar caps the sheet's top edge — the copper bar as hardware, echoing the wordmark's tittle bar.
- Ticket header strip: `bg-paper-deep` row, mono microcopy `WORK ORDER — NO. 001` / `REVAURI AI` (form letterhead, not marketing copy).
- Steps are ruled rows (`divide-y divide-paper-line`, capped with `border-y`): a boxed mono index (`border border-paper-line`, copper-deep number, border warms to `copper-deep` on row hover), the step name in condensed display, body in Plex Sans. Desktop: two columns `[13rem_1fr]`; mobile: stacked.
- A **dashed perforation** (`border-t border-dashed`) separates scope of work from the authorization block.
- Authorization checklist rows keep the `10px × 2px` copper bar markers.

Everything outside the sheet stays quiet steel so the artifact is the one memorable thing.

---

## 5. Section-by-section

Global: container `mx-auto max-w-6xl px-5 md:px-8`; header `h-16`. Mobile-first, single column until `md`.

### Header — steel
- `bg-steel border-b border-steel-line` — a plate seam between header and hero grid.
- Left: `Logo variant="dark"`. Right: copper CTA button (small). No nav — this page has one job.

### Hero — steel + shop grid
- `bg-steel shop-grid`.
- Eyebrow: 32px copper bar + mono `REVAURI AI` in `text-copper`.
- H1 "We build the hire." — `text-paper`, copper period.
- Lead `text-steel-muted max-w-xl`; CTAs: copper button + "See Revauri AI" text link in `text-copper`.
- Door note ("Got an email from @revauribuild.com?…") as a tagged field: `border-t border-steel-line pt-5`, mono, `text-steel-muted`.
- Load sequence: `opacity-0 animate-fade-up` with `animation-delay` stagger of 80ms across eyebrow → H1 → lead → CTAs → door note. That is the only animation on the page.

### The work order — steel bench, paper sheet
- See §4. Carries `id="how-we-build"` and `id="in-charge"` for the footer anchor nav.

### Phone-answering band — steel-panel
- `bg-steel-panel border-y border-steel-line` — a value step off the bench so the band reads as a separate plate.
- Mono eyebrow `THE EXTRA HIRE` in `text-copper`, H2 "Phone answering", body `text-steel-muted`.
- Guardrails as a capped spec table: `divide-y divide-steel-line border-y border-steel-line`, mono uppercase rows.

### Final CTA — steel
- Centered, `py-24 md:py-32`. H2 "Hand off the job you hate." with copper period, sub `text-steel-muted`, copper button + text link.

### Footer — steel
- `bg-steel border-t border-steel-line`, `py-12`.
- Top: mono anchor nav (`How we build` / `In charge` / `Phone answering` / `Book a 20-minute call`) over a `border-b border-steel-line` — the document index for the page.
- Then logo, company line, address, contact/legal links, the revauri.com line, copyright. Mono throughout, `text-steel-muted`, links warm to `text-copper` on hover.

---

## 6. Buttons & links

**Primary CTA** (copper, three times on the page):

```
inline-flex items-center justify-center gap-2 rounded-[2px] bg-copper px-6 py-3
font-sans text-base font-medium text-steel
shadow-[inset_0_-2px_0_0_rgba(22,24,29,0.25)]
transition-colors hover:bg-copper-bright active:translate-y-px
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper
```

`rounded-[2px]` and the inset bottom edge read as a machined plate, not a SaaS pill. Steel text on copper passes AA — no white text on copper anywhere.

**Text links on dark:** `text-copper underline-offset-4 hover:underline` with a copper focus outline.

Focus visible everywhere: 2px copper outline, 2px offset (4px on the logo link).

---

## 7. Accessibility — verified contrast pairs (WCAG)

| Pair | Ratio | Verdict |
|---|---|---|
| `paper #EDEAE0` text on `steel #16181D` | ≈14.9:1 | AAA |
| `steel` text on `paper` | ≈14.9:1 | AAA |
| `steel-muted #9BA2AC` on `steel` | ≈6.9:1 | AAA |
| `ink-muted #5F636B` on `paper` | ≈5.0:1 | AA |
| `ink-muted` on `paper-deep #E3DDCC` | ≈4.7:1 | AA |
| `copper #D97757` on `steel` | ≈5.7:1 | AA (text OK on dark) |
| `copper-deep #9C452A` on `paper` | ≈5.3:1 | AA |
| `steel` text on `copper` button | ≈5.7:1 | AA |
| `copper #D97757` on `paper` | ≈2.7:1 | **FAIL — decorative only on the sheet** (top bar, list markers); never text |

Rules that fall out of this: copper `#D97757` is text **only on steel**; on paper, copper text is always `copper-deep`. Muted colors appear at `text-xs` only in uppercase mono with wide tracking, which reads larger than its size.

Motion: single staggered `fade-up` (12px translate, 0.6s) on hero load; full `prefers-reduced-motion` kill-switch in globals.css. No scroll-reveal library — the page is short and the sheet is strong statically.

---

## 8. What makes this distinct

- **vs revauri.ai:** that site is a product homepage — Inter, dark honeycomb hero, job-picker demo, chatbot. This page has no product UI at all: no demo, no chat widget, no honeycomb, no glow. The Plex superfamily replaces Inter, and the work-order artifact replaces the honeycomb.
- **vs the siblings:** the ledger site is light-first paper with a gothic + typewriter mono; the night-desk site is an operations console; the studio is editorial serif. This is the only cold-steel, dark-first page, and the only one whose signature is a physical document.
- **Own identity:** the shop floor at night. A two-tone shop grid, a paper work order with boxed indexes and a perforation, condensed equipment-plate headings, and copper used as hardware — a place where the hire gets built, not a page that markets software.
