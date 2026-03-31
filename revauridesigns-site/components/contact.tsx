"use client";

import { useScrollReveal } from "@/lib/use-scroll-reveal";

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-brand-dark py-20">
      <div ref={ref} className="reveal mx-auto max-w-2xl px-6 text-center">
        {/* Heading with flanking lines */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-brand-mid-gray/30" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-brand-cream">
            Let&apos;s Talk
          </h2>
          <div className="h-px flex-1 bg-brand-mid-gray/30" aria-hidden="true" />
        </div>
        <a
          href="mailto:hello@revauridesigns.com"
          className="mt-8 inline-block text-xl font-medium tracking-wide text-brand-orange transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange sm:text-2xl lg:text-3xl"
        >
          hello@revauridesigns.com
        </a>
      </div>
    </section>
  );
}
