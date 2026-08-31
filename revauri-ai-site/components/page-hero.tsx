import { FadeInWhenVisible } from "./motion-wrappers";

interface PageHeroProps {
  badge: string;
  title: React.ReactNode;
  muted?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHero({
  badge,
  title,
  muted,
  subtitle,
  children,
}: PageHeroProps) {
  return (
    <section className="bg-brand-cream py-16 dark:bg-brand-dark md:py-24">
      <div className="section-measure px-6">
        <div className="flex max-w-2xl flex-col items-start space-y-4 sm:space-y-5">
          <FadeInWhenVisible>
            <p className="section-eyebrow">{badge}</p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.08}>
            <h1 className="text-[32px] font-semibold leading-[1.15] tracking-tight text-brand-dark dark:text-brand-cream md:text-[40px]">
              {title}
              {muted ? (
                <>
                  <br />
                  <span className="section-h2-muted">{muted}</span>
                </>
              ) : null}
            </h1>
          </FadeInWhenVisible>

          {subtitle && (
            <FadeInWhenVisible delay={0.14}>
              <p className="max-w-xl text-base text-brand-dark/60 dark:text-brand-cream/60 md:text-lg">
                {subtitle}
              </p>
            </FadeInWhenVisible>
          )}

          {children && (
            <FadeInWhenVisible delay={0.2}>{children}</FadeInWhenVisible>
          )}
        </div>
      </div>
    </section>
  );
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
      {children}
    </span>
  );
}
