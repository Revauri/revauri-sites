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
    <section className="relative overflow-hidden border-b border-black/[0.06] bg-brand-cream pt-14 pb-10 dark:border-white/[0.06] dark:bg-brand-dark sm:pt-20 sm:pb-14 lg:pt-24 lg:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_center,rgba(20,20,19,0.13)_1px,transparent_1.15px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_90%_at_25%_35%,#000_20%,transparent_72%)] [-webkit-mask-image:radial-gradient(ellipse_75%_90%_at_25%_35%,#000_20%,transparent_72%)] dark:[background-image:radial-gradient(circle_at_center,rgba(250,249,245,0.14)_1px,transparent_1.15px)]"
      />
      <div className="relative mx-auto w-full max-w-[1100px] px-6">
        <div className="flex max-w-2xl flex-col items-start space-y-4 sm:space-y-5">
          <FadeInWhenVisible>
            <p className="m-0 flex items-center gap-3 text-[11px] font-medium leading-[1.2] tracking-[0.16em] text-brand-dark/40 uppercase before:h-px before:w-6 before:shrink-0 before:bg-brand-orange before:content-[''] dark:text-brand-cream/40">
              {badge}
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.08}>
            <h1 className="text-balance text-[2rem] font-bold leading-[1.08] tracking-tight text-brand-dark dark:text-brand-cream sm:text-5xl lg:text-[52px]">
              {title}
              {muted ? (
                <>
                  <br />
                  <span className="text-brand-dark/55 dark:text-brand-cream/60">{muted}</span>
                </>
              ) : null}
            </h1>
          </FadeInWhenVisible>

          {subtitle && (
            <FadeInWhenVisible delay={0.14}>
              <p className="mt-1 max-w-xl text-base leading-relaxed text-brand-dark/60 dark:text-brand-cream/60 md:text-lg">
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
