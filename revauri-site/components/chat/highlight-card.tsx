export type HighlightCardProps = {
  eyebrow: string;
  figure: string;
  caption: string;
  ctaLabel: string;
  ctaHref: string;
};

export function HighlightCard({ eyebrow, figure, caption, ctaLabel, ctaHref }: HighlightCardProps) {
  return (
    <div className="mt-3 flex flex-col gap-1.5 rounded-2xl border border-brand-orange/15 bg-gradient-to-b from-brand-orange/[0.08] to-brand-orange/[0.03] p-3.5 dark:border-brand-orange/25 dark:from-brand-orange/[0.14] dark:to-brand-orange/[0.06]">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand-orange">
        {eyebrow}
      </span>
      <span className="text-[22px] font-bold leading-tight tracking-tight text-brand-dark dark:text-brand-cream">{figure}</span>
      <p className="text-xs leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">{caption}</p>
      <a
        href={ctaHref}
        className="mt-1 inline-flex w-fit items-center rounded-xl bg-brand-dark px-3.5 py-2 text-xs font-semibold text-brand-cream shadow-sm transition-all hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 dark:bg-brand-cream dark:text-brand-dark"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
