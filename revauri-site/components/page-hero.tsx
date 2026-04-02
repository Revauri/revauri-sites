import { FadeInWhenVisible } from "./motion-wrappers";

interface PageHeroProps {
  badge: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHero({ badge, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
          {/* Badge with decorative lines */}
          <FadeInWhenVisible>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-brand-orange/60 sm:w-12" />
              <span className="text-xs font-medium tracking-[0.2em] text-brand-orange sm:text-sm">
                {badge}
              </span>
              <span className="h-px w-8 bg-brand-orange/60 sm:w-12" />
            </div>
          </FadeInWhenVisible>

          {/* Heading */}
          <FadeInWhenVisible delay={0.08}>
            <h1 className="text-4xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </FadeInWhenVisible>

          {/* SubHeading */}
          {subtitle && (
            <FadeInWhenVisible delay={0.14}>
              <p className="mx-auto max-w-2xl text-lg text-brand-dark/60 dark:text-brand-cream/60 lg:text-xl">
                {subtitle}
              </p>
            </FadeInWhenVisible>
          )}

          {/* Extra content slot */}
          {children && (
            <FadeInWhenVisible delay={0.2}>
              {children}
            </FadeInWhenVisible>
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
