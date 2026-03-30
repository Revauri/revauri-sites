"use client";

export function Hero() {
  return (
    <section className="grid-pattern relative overflow-hidden bg-brand-dark py-28 lg:py-36">
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Diamond decoration */}
        <div
          className="pointer-events-none absolute right-[5%] top-1/2 hidden h-16 w-16 -translate-y-1/2 border-2 border-brand-orange/40 opacity-0 animate-diamond-in lg:block"
          style={{ animationDelay: "500ms" }}
        />
        {/* Small diamond accent - left */}
        <div
          className="pointer-events-none absolute left-[8%] top-[30%] hidden h-8 w-8 border border-brand-orange/20 opacity-0 animate-diamond-in lg:block"
          style={{ animationDelay: "700ms" }}
        />

        <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-brand-cream opacity-0 animate-fade-in sm:text-5xl lg:text-7xl">
          Modern websites for businesses that are ready to grow.
        </h1>
        <p
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-brand-mid-gray opacity-0 animate-fade-in lg:text-xl"
          style={{ animationDelay: "300ms" }}
        >
          Custom website redesigns that turn visitors into customers — built for
          speed, clarity, and results.
        </p>
      </div>
    </section>
  );
}
