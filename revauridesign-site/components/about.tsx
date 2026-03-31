"use client";

import { useScrollReveal } from "@/lib/use-scroll-reveal";

export function About() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      className="py-20"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1a19 0%, #141413 70%)",
      }}
    >
      <div ref={ref} className="reveal mx-auto max-w-3xl px-6 text-center">
        {/* Decorative vertical line */}
        <div className="mx-auto mb-8 h-12 w-0.5 bg-brand-orange" aria-hidden="true" />
        <h2 className="text-2xl font-semibold text-brand-cream">
          About Revauri Design
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-brand-cream/75">
          We&apos;re a boutique web design studio specializing in modern,
          conversion-focused websites for small and medium businesses across the
          United States. Every site we build is fast, mobile-first, and designed
          to grow with your business.
        </p>
      </div>
    </section>
  );
}
