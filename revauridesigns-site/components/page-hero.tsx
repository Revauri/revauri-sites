interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-[#334155] bg-[#0f172a] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#2dd4bf]"
        >
          {eyebrow}
        </p>
        <h1
          style={{ fontFamily: "var(--font-space-grotesk)", textWrap: "balance" }}
          className="text-3xl font-bold tracking-tight text-[#f8fafc] sm:text-4xl lg:text-5xl"
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#64748b]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
