"use client";

import { FadeInWhenVisible } from "./motion-wrappers";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream py-24 dark:bg-brand-dark lg:py-32">
      {/* Blur glow orbs */}
      <div
        className="pointer-events-none absolute -left-24 top-8 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl dark:bg-brand-orange/5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-8 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl dark:bg-brand-orange/5"
        aria-hidden="true"
      />

      {/* Decorative overlapping rectangles — desktop only */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden="true"
      >
        <div
          className="absolute right-[8%] top-[15%] h-[320px] w-[260px] rounded-2xl border border-brand-orange/10 bg-brand-orange/[0.03] opacity-0 animate-clip-reveal"
          style={{ animationDelay: "400ms" }}
        />
        <div
          className="absolute right-[15%] top-[25%] h-[240px] w-[200px] rounded-2xl border border-brand-orange/8 bg-brand-orange/[0.04] opacity-0 animate-clip-reveal"
          style={{ animationDelay: "600ms", transform: "rotate(3deg)" }}
        />
        <div
          className="absolute right-[5%] bottom-[20%] h-[100px] w-[140px] rounded-xl border border-brand-orange/15 opacity-0 animate-fade-in"
          style={{ animationDelay: "800ms" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <FadeInWhenVisible>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-brand-dark dark:text-brand-cream sm:text-5xl md:text-6xl lg:text-[3.75rem]">
              Modern websites for businesses{" "}
              <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                that are ready to grow.
              </span>
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.08}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-dark/60 dark:text-brand-cream/60 lg:text-xl">
              We build fast, mobile-first websites that turn visitors into
              customers. We&apos;ll even build you a free sample redesign using
              your actual business — so you can see what&apos;s possible before
              you pay a dime.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.16}>
            <div className="mt-10 flex flex-col items-start gap-3">
              <a
                href="#book"
                className="inline-flex rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange animate-pulse-glow"
              >
                Book a Free Strategy Call
              </a>
              <span className="text-sm text-brand-mid-gray">
                15 minutes. No obligation. No credit card.
              </span>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-light-gray dark:bg-brand-mid-gray/20" />
    </section>
  );
}
