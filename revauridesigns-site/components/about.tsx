"use client";

import { useScrollReveal } from "@/lib/use-scroll-reveal";

export function About() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-brand-white py-20">
      <div
        ref={ref}
        className="reveal mx-auto max-w-3xl px-6 lg:ml-[15%] lg:mr-[15%]"
      >
        <div className="border-l-4 border-brand-orange pl-6">
          <h2 className="text-2xl font-semibold text-brand-dark">
            Who We Are
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-dark/75">
            Revauri Designs is a web design studio focused on building modern,
            results-driven websites for small and medium businesses across the
            United States. We combine clean design with smart strategy to create
            sites that are fast, mobile-optimized, and built to scale alongside
            your business.
          </p>
        </div>
      </div>
    </section>
  );
}
