export type HighlightCardProps = {
  eyebrow: string;
  figure: string;
  caption: string;
  ctaLabel: string;
  ctaHref: string;
};

export function HighlightCard({ eyebrow, figure, caption, ctaLabel, ctaHref }: HighlightCardProps) {
  return (
    <div className="mt-3 flex flex-col gap-1.5 rounded-xl border border-brand-orange/20 bg-brand-orange/[0.06] p-3 dark:border-brand-orange/30 dark:bg-brand-orange/10">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-orange">
        {eyebrow}
      </span>
      <span className="text-xl font-bold leading-tight text-brand-dark dark:text-brand-cream">{figure}</span>
      <p className="text-xs text-brand-mid-gray">{caption}</p>
      <a
        href={ctaHref}
        className="mt-1 inline-block w-fit rounded-full bg-brand-dark px-3.5 py-2 text-xs font-semibold text-white dark:bg-brand-cream dark:text-brand-dark"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
