"use client";

import { useScrollReveal } from "@/lib/use-scroll-reveal";

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-brand-cream py-20">
      <div ref={ref} className="reveal relative mx-auto max-w-2xl px-6 text-center">
        {/* Decorative dashed ring */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-brand-orange/15" aria-hidden="true" />
        <h2 className="text-2xl font-semibold text-brand-dark">
          Get in Touch
        </h2>
        <a
          href="mailto:hello@revauridesign.com"
          className="group relative mt-6 inline-block text-xl font-medium text-brand-orange transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange sm:text-2xl lg:text-3xl"
        >
          hello@revauridesign.com
          <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 bg-brand-dark transition-transform duration-300 group-hover:scale-x-100" />
        </a>
      </div>
    </section>
  );
}
