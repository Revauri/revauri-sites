/**
 * BlendedDemoFrame — premium glassmorphism wrapper for demo/showcase content.
 *
 * Adapted from the Ultaura landing page pattern, re-themed for Revauri's
 * brand-orange (#D97757) palette.
 *
 * Visual layers (outside → inside):
 *  1. OUTER GLOW        — soft orange radial gradient, blurred behind the card
 *  2. TOP HIGHLIGHT      — white radial gradient at top for a glossy sheen
 *  3. MAIN FRAME         — gradient bg + thin ring + orange drop-shadow
 *  4. EDGE VIGNETTE      — radial mask + inset shadow that fades edges inward
 *  5. GLOSSY INSET       — top white line + bottom dark shadow for depth
 *
 * Tweak guide:
 *  • Glow color/spread  → layer 1 rgba values & -inset-7 / blur-2xl
 *  • Ring brightness     → ring-brand-orange/<opacity> on layer 3
 *  • Drop-shadow color   → shadow-[…] rgba on layer 3
 *  • Top shine intensity → layer 2 & layer 5 white alpha values
 *  • Inner fade strength → edgeFade percentages & layer 4 inset shadow alpha
 */

function BlendedDemoFrame(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`relative isolate w-full${props.className ? ` ${props.className}` : ""}`}>
      {/* 1 · OUTER GLOW — orange radial blur behind the entire frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-7 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(217,119,87,0.18)_0%,rgba(217,119,87,0.06)_38%,rgba(217,119,87,0)_72%)] blur-2xl"
      />

      {/* 2 · TOP HIGHLIGHT — subtle white sheen at the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 rounded-[1.7rem] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0)_62%)]"
      />

      {/* 3 · MAIN FRAME — gradient bg, ring border, and orange drop-shadow */}
      <div className="relative rounded-[1.7rem] bg-gradient-to-br from-brand-cream/70 via-brand-cream/35 to-transparent p-2.5 ring-1 ring-brand-orange/15 shadow-[0_20px_45px_-30px_rgba(217,119,87,0.45)] dark:from-brand-dark/70 dark:via-brand-dark/35">
        <div className="rounded-[1.35rem]">{props.children}</div>
      </div>

      {/* 4 · EDGE VIGNETTE — removed (was adding a gray overlay) */}

      {/* 5 · GLOSSY INSET — top white highlight only (bottom shadow removed) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-[1.8rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.40)]"
      />
    </div>
  );
}

export default BlendedDemoFrame;
