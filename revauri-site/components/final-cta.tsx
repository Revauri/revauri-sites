"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Shield } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-16 lg:py-20"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 50%, var(--surface-accent) 0%, transparent 70%), var(--background)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative flex flex-col items-center text-center space-y-5">
          <FadeInWhenVisible>
            <blockquote className="mx-auto max-w-xl text-lg italic text-brand-dark/60 dark:text-brand-cream/60">
              <p>
                &ldquo;I love it. This is exactly what we wanted and our message comes across perfectly. Simple and clean.&rdquo;
              </p>
              <footer className="mt-2 flex items-center justify-center gap-2 not-italic">
                <div className="relative h-6 w-6 overflow-hidden rounded-full bg-brand-orange/15">
                  <Image
                    src="/portfolio/lion-law/testimonial-avatar.jpg"
                    alt="Alphonse Petracco, Esq."
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-xs text-brand-mid-gray">
                  Alphonse Petracco, Esq., Lion Law
                </span>
              </footer>
            </blockquote>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.08}>
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              Ready to see your{" "}
              <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                new website?
              </span>
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.15}>
            <p className="mx-auto max-w-xl text-lg text-brand-dark/60 dark:text-brand-cream/60">
              Book a free 15-minute call. We&apos;ll walk through a custom redesign
              of your actual site and outline practical next steps.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.22}>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange animate-pulse-glow"
            >
              Book a Free Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.28}>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-brand-mid-gray">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-light-gray bg-brand-white/70 px-3 py-1 dark:border-brand-mid-gray/20 dark:bg-brand-dark/70">
                <Shield className="h-3.5 w-3.5 text-brand-orange" />
                No obligation
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-light-gray bg-brand-white/70 px-3 py-1 dark:border-brand-mid-gray/20 dark:bg-brand-dark/70">
                <Check className="h-3.5 w-3.5 text-brand-orange" />
                Free preview redesign
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-light-gray bg-brand-white/70 px-3 py-1 dark:border-brand-mid-gray/20 dark:bg-brand-dark/70">
                <Check className="h-3.5 w-3.5 text-brand-orange" />
                Quality guaranteed
              </span>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.34}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-white/50 px-4 py-1.5 text-xs text-brand-mid-gray dark:bg-brand-dark/50">
              Free 15-min call &middot; No credit card &middot; Cancel anytime
            </span>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
