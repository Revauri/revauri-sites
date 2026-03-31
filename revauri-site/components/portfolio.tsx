"use client";

import { useScrollReveal } from "@/lib/use-scroll-reveal";

export function Portfolio() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-brand-white py-20 lg:py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Our Work
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n, i) => (
            <div
              key={n}
              className="stagger-child flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-light-gray bg-brand-cream/50 px-8 py-16 opacity-0"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Decorative pattern */}
              <div className="mb-6 flex gap-2" aria-hidden="true">
                <div className="h-8 w-8 rounded-lg border border-brand-light-gray bg-brand-light-gray/40" />
                <div className="h-8 w-12 rounded-lg border border-brand-light-gray bg-brand-light-gray/30" />
                <div className="h-8 w-6 rounded-lg border border-brand-light-gray bg-brand-light-gray/20" />
              </div>
              <p className="text-center text-sm font-medium text-brand-mid-gray">
                Case study coming soon
              </p>
              <p className="mt-1 text-center text-xs text-brand-mid-gray/70">
                Our first client projects are in progress.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
