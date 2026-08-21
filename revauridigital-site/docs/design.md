# revauridigital.com — Visual Design Spec

One-page trust site for people who received a cold email from an `@revauridigital.com` address and typed the domain into a browser. Message: **digital busywork — inbox, follow-ups, admin. "The hire that keeps the thread from dying."** This is a door to the product at `https://revauri.ai`, not a product homepage. Copy source: `docs/copy.md`.

**Direction:** inbox / night desk — the violet hour. Violet-black ink, phosphor off-white text, and a single violet signal lamp. A calm operations console at 2 a.m., after everyone has gone home — quiet, precise, nocturnal. Not a consumer app, not a law-firm site, not a SaaS gradient landing. (Replaces the earlier blue-slate + electric teal system, which sat in the generic dark/acid cluster.)

---

## 1. Concept statement

Revauri Digital is the night desk at the violet hour: the office has emptied, one signal lamp is lit, and the log keeps writing itself. The page should feel like a calm operations console — violet-undertoned ink surfaces, hairline rules, mono status labels, and one violet lamp that breathes slowly to say someone is on it. Trust is built through restraint: no product screenshots, no chat bubbles, no gradient hero, no ambient glow — just the quiet rhythm of log lines and status lamps. The only warm pixel anywhere is the orange tittle in the Revauri wordmark — a deliberate signature, not an accent system.

---

## 2. Palette

Everything is cool-toned with a violet undertone. **No warm cream, warm charcoal, copper, or teal anywhere in the site palette.** The four `brand-*` tokens exist only to feed the verbatim wordmark component; they are never used for page UI. The wordmark renders in brand cream on our ink surfaces (≈16.6:1 — AAA), and its orange tittle stays the single warm element on the page.

| Token | Hex / value | Role |
|---|---|---|
| `ink` | `#0D0B14` | Page background — violet-black ink. Header, hero, approval, CTA, footer |
| `panel` | `#14101F` | Raised violet-ink — the jobs band, console panel, inset strips |
| `panel-hover` | `#1A1528` | Row hover inside panels, nested raise |
| `text` | `#EAE8F3` | Primary text on dark — phosphor off-white |
| `muted` | `#A2A0B6` | Secondary body, descriptions on dark |
| `faint` | `#807E93` | Mono timestamps, small print (still AA on ink — see §7) |
| `line` | `rgba(150, 146, 190, 0.14)` | Default 1px hairline rules and borders |
| `line-soft` | `rgba(150, 146, 190, 0.08)` | Log-roll texture, inset dividers inside panels |
| `signal` | `#A78BFA` | **The accent.** Status lamps, eyebrows, key verbs, links, primary button fill |
| `signal-bright` | `#C4B5FD` | Hover state only (button fill, link hover) |
| `signal-deep` | `#4C1D95` | Violet surfaces that must carry light text (chips with white text) |
| `brand-orange` | `#D97757` | **Wordmark tittle only — exact hex, do not change, never reuse** |
| `brand-dark` | `#211E1A` | Wordmark component token only |
| `brand-cream` | `#F2ECDF` | Wordmark component token only — wordmark text on dark |
| `brand-mid-gray` | `#B0AEA5` | Wordmark component token only (optional logo suffix) |

**Primary-button contrast (stated explicitly):** ink `#0D0B14` text on signal `#A78BFA` = **≈7.2 : 1 (AAA)**; the ratio is symmetric, so the button works in either direction; we use ink text on a violet fill.

Usage rules:

- Violet is a **signal, not a fill.** Lamps, eyebrows, log-line verbs, links, focus rings, and the primary CTA (used twice). Never large violet backgrounds; never violet body text blocks.
- Where light text must sit on violet (rare — small chips), use `signal-deep` with white text (≈11:1, AAA). Never white text on `signal`/`signal-bright`.
- Do not echo the wordmark's orange anywhere else. No amber/red status colors — see the lamp system in §5.

---

## 3. `app/globals.css` — paste-ready token block

Tailwind CSS v4, same `@theme inline` pattern as the sibling sites. Dark-only by design; sections are explicitly colored.

```css
@import "tailwindcss";

:root {
  --background: #0D0B14;
  --foreground: #EAE8F3;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  /* Brand tokens — required by the verbatim Logo component. Page UI must not use these. */
  --color-brand-orange: #D97757; /* official mark, exact hex */
  --color-brand-dark: #211E1A;
  --color-brand-cream: #F2ECDF;
  --color-brand-mid-gray: #B0AEA5;

  /* Surfaces */
  --color-ink: #0D0B14;
  --color-panel: #14101F;
  --color-panel-hover: #1A1528;

  /* Text on dark */
  --color-text: #EAE8F3;
  --color-muted: #A2A0B6;
  --color-faint: #807E93;

  /* Hairlines */
  --color-line: rgba(150, 146, 190, 0.14);
  --color-line-soft: rgba(150, 146, 190, 0.08);

  /* Accent — violet signal lamp */
  --color-signal: #A78BFA;
  --color-signal-bright: #C4B5FD;
  --color-signal-deep: #4C1D95;

  /* Type */
  --font-sans: var(--font-instrument-sans), ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, "SFMono-Regular", Menlo, monospace;
  --font-serif: var(--font-fraunces), Georgia, "Times New Roman", serif; /* LOGO WORDMARK ONLY */

  --animate-fade-up: fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  --animate-lamp-breathe: lamp-breathe 3.6s ease-in-out infinite;

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes lamp-breathe {
    0%, 100% { box-shadow: 0 0 9px rgba(167, 139, 250, 0.5); opacity: 1; }
    50% { box-shadow: 0 0 2px rgba(167, 139, 250, 0.15); opacity: 0.72; }
  }
}

body {
  background: var(--background);
  color: var(--foreground);
}

/* Log roll — hero + final CTA only. Horizontal hairlines at 5%, masked so they recede. */
.log-roll {
  background-image:
    linear-gradient(to bottom, rgba(150, 146, 190, 0.05) 1px, transparent 1px);
  background-size: 100% 32px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%);
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

No dark-mode class, no theme script — the page is always the night desk. Use the wordmark's dark/cream variant on every section; every section is dark.

---

## 4. Typography

**Pairing: Instrument Sans (display + body) + JetBrains Mono (eyebrows, labels, log lines, meta).** Both on Google Fonts. Instrument Sans is a quiet UI sans with slightly humanist rhythm — clearly not Inter (revauridesign) and not Space Grotesk (revauribuild). JetBrains Mono is the console voice; IBM Plex Mono is the sibling's, so it is off-limits here. Fraunces loads only so the official wordmark keeps its serif; it appears nowhere else on the page.

`app/layout.tsx` wiring:

```ts
import { Instrument_Sans, JetBrains_Mono, Fraunces } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// <html className={`${instrumentSans.variable} ${jetbrainsMono.variable} ${fraunces.variable} antialiased`}>
```

| Element | Font / utility | Size | Notes |
|---|---|---|---|
| Hero H1 ("The digital work that never ends.") | `font-sans font-semibold` | `text-[2.5rem] md:text-[4rem]` | `tracking-[-0.03em] leading-[1.04]`, `text-text`; the final period in `text-signal` |
| Section H2 | `font-sans font-semibold` | `text-3xl md:text-[2.5rem]` | `tracking-[-0.02em] leading-[1.1]` |
| Job names (ledger rows) | `font-sans font-medium` | `text-lg md:text-xl` | `tracking-tight` |
| Body / lead | `font-sans` | `text-base md:text-[1.0625rem]` | `leading-[1.65]`, measure capped `max-w-xl`, `text-muted` for secondary copy |
| Eyebrows / section labels | `font-mono font-medium uppercase` | `text-xs` (12px) | `tracking-[0.16em]`, `text-signal` |
| Mono labels / chips / status | `font-mono font-medium uppercase` | `text-xs` (12px) | `tracking-[0.08em]` |
| Log lines (console panel) | `font-mono` | `text-[13px]` | `leading-[1.9]`; timestamps `text-faint`, message `text-muted`, verbs `text-signal uppercase tracking-[0.06em]` |
| Small print / footer meta | `font-mono` | `text-[11px] md:text-xs` | `text-faint` |

Instrument Sans runs neutral — do not add positive tracking to display type; only the mono eyebrows/labels get wide tracking. Never set page type in Fraunces.

---

## 5. Texture & motifs (pick these three, nothing more)

1. **Log roll, masked** — `.log-roll` above: a single horizontal hairline every 32px at 5% alpha, like paper tape running through the desk's printer, radial-masked so it fades before the edges. Hero and final CTA only. Replaces the old square console grid (too close to the workshop sibling's blueprint). If it reads as texture at a glance, it is too strong — lower the alpha, don't add a second pattern.
2. **Signal lamps** — the signature element. 6px circles, three states only:

```css
.dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--color-signal);
  box-shadow: 0 0 8px rgba(167, 139, 250, 0.55);
}
.dot--idle { background: #3A3550; box-shadow: none; }              /* done / standing by */
.dot--needs-you { background: transparent; border: 1px solid var(--color-signal); box-shadow: none; } /* waiting on approval */
```

   Live lamps may take `animate-lamp-breathe` — a slow 3.6s breath, not a pulse; a standby light, not an alarm. No amber, no red — an alarm color would break the calm; "needs you" is an outline, not a warning.
3. **Log-line lists** — the abstract console. Mono rows: faint timestamp (`02:14:07`), muted message, violet uppercase verb (`SENT`, `FILED`, `SNOOZED`, `HELD FOR YOU`). Rows separated by `line-soft` hairlines. This is as close to "product" as the page gets — never a fake inbox UI, no avatars, no message bubbles, no window chrome with traffic-light buttons.

Structure everywhere is **hairline rules**: 1px `line` between major regions, `line-soft` inside panels. Corners stay nearly square — `rounded-md` (6px) on panels and buttons, `rounded-full` only on lamps and chips. No drop shadows, no ambient page glow; the only light on the page comes from the lamps themselves. Elevation comes from `ink` → `panel` → `panel-hover` steps.

---

## 6. Section-by-section

Global rhythm: container `mx-auto max-w-6xl px-5 md:px-8`; sections `py-20 md:py-28`; header `h-16`. Mobile-first, single column until `md`. Surface plan — ink → **raised band** → ink → ink (inset strip) → ink → ink. The single raised band in the middle is the whole elevation story.

### Header — ink, sticky
- `sticky top-0 h-16 bg-ink/80 backdrop-blur-md border-b border-line`, z-50.
- Left: `Logo` wordmark, dark variant (brand cream on ink; orange tittle untouched).
- Right: the header CTA from copy — a compact ghost button: `font-mono text-[11px] uppercase tracking-[0.16em] border border-line rounded-md px-4 py-2 text-text hover:border-signal/50 hover:text-signal transition-colors` → "Book a 20-minute call" (`https://revauri.ai/book`).
- No nav links, no status clutter — the header has one job.

### Hero — ink + log roll
- `bg-ink`, with an absolutely-positioned `log-roll` layer behind the content (masked, non-interactive).
- Two columns at `lg` (`lg:grid lg:grid-cols-[1fr_26rem] lg:gap-16 items-center`); stacked on mobile.
- Left column (`max-w-xl`): mono eyebrow `REVAURI AI` in `text-signal`; H1 with violet final period; subhead in `text-muted`; primary violet button "Book a 20-minute call"; under it the trust line in `font-mono text-xs text-faint` ("Got an email from an @revauridigital.com address? That was us…").
- Right column: **one abstract console panel** — `bg-panel border border-line rounded-md`. Header row: three `dot--idle` circles + mono title `tonight.log` in `text-faint`. Body: 5–7 log lines (see §5). Footer row: one live lamp (`animate-lamp-breathe`) + mono `ALL THREADS WATCHED` in `text-muted`. This panel is the only product-adjacent imagery on the page.
- Load animation: `animate-fade-up` on eyebrow → H1 → subhead → CTA → trust line → panel, `animation-delay` stagger of 60ms. That is the only entrance animation on the page.

### Three digital jobs — raised band (`id="jobs"`)
- Full-bleed `bg-panel border-y border-line`.
- Mono eyebrow `THE WORK THE HIRE TAKES` in `text-signal`, H2 "The work the hire takes", intro sentence in `text-muted max-w-xl`.
- The three jobs are a **ledger, not cards**: one container `border-t border-line mt-12`, rows `divide-y divide-line`. Each row: `py-8 grid gap-3 md:grid-cols-[3rem_1fr_auto] md:items-baseline md:gap-8`, hover `hover:bg-panel-hover transition-colors`.
  - Col 1: mono index `01` / `02` / `03`, `text-faint`.
  - Col 2: job name (`text-lg md:text-xl font-medium text-text`) + one-line description (`text-muted`).
  - Col 3: status chip — live lamp + mono `COVERED` in `text-muted`, `flex items-center gap-2`.
- Rows: **01 Follow-ups that do not die** / **02 Inbox and admin** / **03 Reminders and check-ins** (copy per `docs/copy.md`). One job, one line — like entries in a shift log. Explicitly **not** a 3×3 card grid, not icon boxes.

### How approval works — ink (`id="approval"`)
- Back on `bg-ink`. Two columns at `lg`: `lg:grid lg:grid-cols-2 lg:gap-16`.
- Left (sticky-ish, `lg:self-start`): mono eyebrow `YOUR CALL` in `text-signal`, H2 "How approval works.", lead "You approve anything a customer will see." in `text-text text-lg`, and the second line as a mono note chip: `inline-flex items-center gap-2 border border-line rounded-md px-3 py-2 font-mono text-xs text-muted` with a `dot--needs-you` — "Fourteen days of silence pauses those sends. Internal steps keep running."
- Right: a **vertical rail** — `border-l border-line pl-8 space-y-10`. Each of the three supporting lines is a rail item: a node lamp on the rail (`-ml-[37px]`, idle for the two informational items, live violet for the "you stay the boss" item), then the statement in `font-sans text-base md:text-lg text-text`.
- The rail communicates "drafts wait for your yes" without any UI mockup.

### The extra hire — ink, inset strip
- Stays on `bg-ink`; the section is a single **inset panel**: `bg-panel border border-line rounded-md px-6 py-6 md:px-8`.
- One row, `flex flex-col gap-3 md:flex-row md:items-center md:gap-6`: `dot--idle` → mono eyebrow `EXTRA HIRE` in `text-signal` (shrink-0) → the phone-answering sentence in `text-muted` (flex-1) → mono chip `OPTIONAL` in `text-faint border border-line rounded-full px-3 py-1` (shrink-0).
- Quiet by design: one strip, no H2, no second CTA. This is the only phone mention on the page.

### Final CTA — ink + log roll + one lit lamp
- `bg-ink` with the `log-roll` layer again. No ambient glow — the old radial teal glow is removed; the light comes from a single breathing lamp beside the eyebrow. Centered, `py-24 md:py-32`, `text-center`.
- Stack (`mx-auto max-w-2xl`): mono eyebrow `REVAURI AI` in `text-signal`, prefixed by one live lamp (`dot animate-lamp-breathe`, `inline-flex items-center gap-2.5`) — the desk is still lit when you reach the bottom; H2 "Hand off the work that never ends."; supporting line in `text-muted`; primary violet button "Book a 20-minute call"; under it the secondary link "See Revauri AI" as a mono link `font-mono text-xs uppercase tracking-[0.16em] text-faint hover:text-signal transition-colors` (`https://revauri.ai`).

### Footer — ink
- `bg-ink border-t border-line`, `py-10`.
- Desktop: `flex items-start justify-between gap-8`; stacked on mobile.
- Left: wordmark (cream variant) at `text-base`, then "A Revauri company." in `font-mono text-xs text-faint`.
- Right: mono small print, `font-mono text-[11px] md:text-xs text-faint space-y-1 md:text-right`: address line; `joseph@revauri.com` as a `hover:text-signal` mailto; `PRIVACY` / `TERMS` links (`https://revauri.ai/privacy`, `/terms`) `uppercase tracking-[0.08em] hover:text-text`; the revauri.com note ("Website design is a different product at revauri.com.") with the domain as a hover link; `© 2026 REVAURI`.
- No social icons, no link farm.

---

## 7. Buttons, links & accessibility

**Primary CTA** (violet, used exactly twice — hero and final CTA):

```
inline-flex items-center gap-2 rounded-md bg-signal px-6 py-3
font-sans text-base font-medium text-ink
transition-colors hover:bg-signal-bright active:translate-y-px
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal
```

`rounded-md` (6px) — console, not workshop (`rounded-sm` is the sibling's) and not a SaaS pill. Ink text on violet passes AAA (≈7.2:1), so no white text on violet anywhere.

**Ghost button** (header CTA): see §6 header — hairline border, hover `border-signal/50 text-signal`.

**Text links (dark surfaces):** `text-signal underline-offset-4 hover:underline` for inline links; mono `text-faint hover:text-signal` for meta/footer links.

**Focus visible everywhere:** 2px violet outline, 2px offset (on violet-filled elements, outline `signal`).

**Verified contrast pairs (WCAG, measured):**

| Pair | Ratio | Verdict |
|---|---|---|
| `ink #0D0B14` text on `signal #A78BFA` (primary button) | ≈7.2:1 | AAA |
| `signal #A78BFA` on `ink` (lamps, eyebrows, links) | ≈7.2:1 | AAA |
| `signal` on `panel #14101F` | ≈6.9:1 | AA |
| `signal-bright #C4B5FD` on `ink` (hover) | ≈10.7:1 | AAA |
| white text on `signal-deep #4C1D95` (chips) | ≈11:1 | AAA |
| `text #EAE8F3` on `ink` | ≈16.2:1 | AAA |
| `text` on `panel` | ≈15.6:1 | AAA |
| `muted #A2A0B6` on `ink` | ≈7.7:1 | AAA |
| `muted` on `panel` | ≈7.4:1 | AAA |
| `faint #807E93` on `ink` | ≈5.0:1 | AA |
| `faint` on `panel` | ≈4.8:1 | AA |
| `brand-cream #F2ECDF` (wordmark) on `ink` | ≈16.6:1 | AAA |

Rules that fall out of this: `faint` is the floor — never invent a dimmer text color; `faint` appears only at mono sizes (`11–13px`) for non-essential meta. Violet text is always `signal` (never `signal-deep`, which is fill-only).

**Motion:** the single `fade-up` entrance (8px translate, 0.5s, `cubic-bezier(0.22, 1, 0.36, 1)`) on hero load, 60ms stagger; the slow `lamp-breathe` loop on live lamps; `active:translate-y-px` on buttons. Full `prefers-reduced-motion` kill-switch in the CSS block above. No scroll-reveal library, no parallax, no hover lifts beyond color transitions.

---

## 8. Favicon / app icon

`app/icon.tsx` (Next.js `ImageResponse`, 32×32): a signal lamp on a dark console.

- Rounded square, `borderRadius: 7`, fill `ink #0D0B14`.
- A 1px inner ring inset 2px, `rgba(167, 139, 250, 0.35)`.
- Centered 8px dot, `signal #A78BFA`, inside a 14px halo at 25% violet.

No letterforms, nothing warm, readable at 16px — the same live lamp used across the page.

---

## 9. What makes this NOT the siblings

- **NOT revauri.ai:** no orange accent system (the wordmark tittle is the only warm pixel), no dark honeycomb hero, no job-picker UI, no chatbot or chat bubbles, no product screenshots — the abstract `tonight.log` panel and ledger rows stand in for product imagery. Violet ink replaces the honeycomb's warmth.
- **NOT revauribuild.com:** no warm charcoal `#211E1A`, cream `#F2ECDF`, or copper anywhere in the site palette; no blueprint grid (ours is horizontal log-roll hairlines at 32px, masked — theirs is a square workshop grid); no Space Grotesk, IBM Plex Mono, or Fraunces-as-display; `rounded-md` instead of `rounded-sm`; ledger rows and a rail instead of spec-sheet steps and bar markers.
- **NOT revauridesign.com:** that site is warm off-white paper with ink text and Inter + Fraunces. We are dark-first night desk, violet-ink only, and Inter never appears.
- **NOT the old revauridigital.com:** the blue-slate + electric teal + glow system sat in the generic dark/acid cluster. The violet hour replaces it: violet-undertoned ink, phosphor text, a breathing signal lamp, log-roll rules, and no ambient glow.
- **Own identity:** the operations console at the violet hour. A breathing violet signal lamp (three states, no alarm colors), mono log lines with timestamps, hairline rules, one masked log roll, and a single raised band — the calm of a desk that is still lit after everyone has gone home.
