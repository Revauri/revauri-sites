"use client";

import { useScrollReveal } from "@/lib/use-scroll-reveal";

export function About() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="about"
      className="py-20 lg:py-24"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1a19 0%, #141413 70%)",
      }}
    >
      <div ref={ref} className="reveal mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* Photo placeholder */}
          <div className="mx-auto lg:mx-0">
            {/* TODO: Replace with Joseph's professional headshot */}
            <div className="flex h-56 w-56 items-center justify-center rounded-2xl bg-brand-dark/50 ring-1 ring-brand-mid-gray/20">
              <span className="text-6xl font-bold text-brand-orange/60">J</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-2xl font-bold text-brand-cream sm:text-3xl">
              Built by a founder who understands small business.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-cream/70">
              Hi, I&apos;m Joseph. I started Revauri because I kept seeing the
              same thing: great businesses with websites that don&apos;t do them
              justice. Your website should work as hard as you do — bringing in
              leads, building trust, and making it easy for customers to say yes.
              Every site we build is designed with that goal in mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
