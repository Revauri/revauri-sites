export type HighlightCardProps = {
  eyebrow: string;
  figure: string;
  caption: string;
  ctaLabel: string;
  ctaHref: string;
};

export function HighlightCard({ eyebrow, figure, caption, ctaLabel, ctaHref }: HighlightCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-brand-orange/30 bg-brand-white p-4 dark:bg-brand-dark/40">
      <span className="text-[13px] font-semibold uppercase tracking-wide text-brand-orange">
        {eyebrow}
      </span>
      <span className="text-2xl font-bold text-brand-dark dark:text-brand-cream">{figure}</span>
      <p className="text-[13px] text-brand-mid-gray">{caption}</p>
      <a
        href={ctaHref}
        className="mt-1 inline-block w-fit rounded-full bg-brand-dark px-4 py-2.5 text-[13px] font-semibold text-white dark:bg-brand-cream dark:text-brand-dark"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
