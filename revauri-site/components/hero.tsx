"use client";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream py-24 lg:py-32">
      {/* Decorative overlapping rectangles — desktop only */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden="true"
      >
        {/* Large rectangle */}
        <div
          className="absolute right-[8%] top-[15%] h-[320px] w-[260px] rounded-2xl border border-brand-orange/15 bg-brand-orange/[0.04] opacity-0 animate-clip-reveal"
          style={{ animationDelay: "400ms" }}
        />
        {/* Medium rectangle — rotated */}
        <div
          className="absolute right-[15%] top-[25%] h-[240px] w-[200px] rounded-2xl border border-brand-orange/10 bg-brand-orange/[0.06] opacity-0 animate-clip-reveal"
          style={{ animationDelay: "600ms", transform: "rotate(3deg)" }}
        />
        {/* Small accent rectangle */}
        <div
          className="absolute right-[5%] bottom-[20%] h-[100px] w-[140px] rounded-xl border border-brand-orange/20 opacity-0 animate-fade-in"
          style={{ animationDelay: "800ms" }}
        />
        {/* Tiny dot cluster */}
        <div
          className="absolute right-[30%] top-[20%] flex gap-2 opacity-0 animate-fade-in"
          style={{ animationDelay: "700ms" }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-brand-orange/25" />
          <div className="h-1.5 w-1.5 rounded-full bg-brand-orange/15" />
          <div className="h-1.5 w-1.5 rounded-full bg-brand-orange/10" />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-brand-dark opacity-0 animate-rise-in sm:text-5xl md:text-6xl lg:text-[3.75rem]">
            Modern websites for businesses that are ready to grow.
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-dark/60 opacity-0 animate-rise-in lg:text-xl"
            style={{ animationDelay: "150ms" }}
          >
            We build fast, mobile-first websites that turn visitors into
            customers. We&apos;ll even build you a free sample redesign using
            your actual business — so you can see what&apos;s possible before
            you pay a dime.
          </p>
          <div
            className="mt-10 flex flex-col items-start gap-3 opacity-0 animate-rise-in"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="#book"
              className="inline-flex rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              Book a Free Strategy Call
            </a>
            <span className="text-sm text-brand-mid-gray">
              15 minutes. No obligation. No credit card.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-light-gray" />
    </section>
  );
}
