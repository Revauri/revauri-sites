/**
 * BlendedDemoFrame — premium glassmorphism wrapper for demo/showcase content.
 *
 * Adapted from the Ultaura landing page pattern, re-themed for Revauri's
 * brand-orange (#D97757) palette.
 *
 * Visual layers (back → front, z-index):
 *  1. OUTER GLOW        — z-0, soft orange radial gradient behind the card
 *  2. TOP HIGHLIGHT      — z-0, white radial gradient at top
 *  3. GLOSSY INSET       — z-1, inset top highlight (under main frame so floating UI stays visible)
 *  4. EDGE VIGNETTE      — (removed)
 *  5. MAIN FRAME         — z-10, gradient bg + ring + drop-shadow + children
 *
 * Tweak guide:
 *  • Glow color/spread  → layer 1 rgba values & -inset-7 / blur-2xl
 *  • Ring brightness     → ring-brand-orange/<opacity> on main frame
 *  • Drop-shadow color   → shadow-[…] rgba on main frame
 *  • Top shine intensity → layer 2 & glossy inset white alpha values
 *  • Inner fade strength → edgeFade percentages & layer 4 inset shadow alpha
 */

function BlendedDemoFrame(
  props: React.PropsWithChildren<{ className?: string; compact?: boolean }>,
) {
  const isCompact = props.compact ?? false;

  return (
    <div className={`relative isolate w-full${props.className ? ` ${props.className}` : ""}`}>
      {/* 1 · OUTER GLOW — orange radial blur behind the entire frame */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute z-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,87,0.18)_0%,rgba(217,119,87,0.06)_38%,rgba(217,119,87,0)_72%)] blur-2xl ${
          isCompact ? "-inset-4 rounded-[1.75rem] sm:-inset-7 sm:rounded-[2rem]" : "-inset-7 rounded-[2rem]"
        }`}
      />

      {/* 2 · TOP HIGHLIGHT — subtle white sheen at the top */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute z-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0)_62%)] ${
          isCompact ? "inset-2 rounded-[1.45rem] sm:inset-3 sm:rounded-[1.7rem]" : "inset-3 rounded-[1.7rem]"
        }`}
      />

      {/* 4 · EDGE VIGNETTE — removed (was adding a gray overlay) */}

      {/* 5 · GLOSSY INSET — sits under the main frame so floating UI (e.g. hero pill) stays visible */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute z-[1] shadow-[inset_0_1px_0_rgba(255,255,255,0.40)] ${
          isCompact ? "inset-1.5 rounded-[1.5rem] sm:inset-2 sm:rounded-[1.8rem]" : "inset-2 rounded-[1.8rem]"
        }`}
      />

      {/* 3 · MAIN FRAME — gradient bg, ring border, and orange drop-shadow */}
      <div
        className={`relative z-10 bg-gradient-to-br from-brand-cream/70 via-brand-cream/35 to-transparent ring-1 ring-brand-orange/15 shadow-[0_20px_45px_-30px_rgba(217,119,87,0.45)] dark:from-brand-dark/70 dark:via-brand-dark/35 ${
          isCompact ? "rounded-[1.45rem] p-2 sm:rounded-[1.7rem] sm:p-2.5" : "rounded-[1.7rem] p-2.5"
        }`}
      >
        <div className={isCompact ? "rounded-[1.15rem] sm:rounded-[1.35rem]" : "rounded-[1.35rem]"}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default BlendedDemoFrame;
