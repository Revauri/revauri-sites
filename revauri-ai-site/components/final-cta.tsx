"use client";

import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { FINAL_CTA_COPY } from "@/lib/marketing-copy";
import { FadeInWhenVisible } from "./motion-wrappers";

export function FinalCTA() {
  return (
    <section className="bg-brand-cream py-16 dark:bg-brand-dark lg:py-20">
      <div className="section-measure px-6">
        <div className="flex max-w-2xl flex-col items-start space-y-5">
          <FadeInWhenVisible>
            <h2 className="section-h2 text-brand-dark dark:text-brand-cream">
              {FINAL_CTA_COPY.h2}
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.12}>
            <p className="max-w-xl text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60 md:text-base">
              {FINAL_CTA_COPY.body}
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.18}>
            <Link
              href="/book"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              {FINAL_CTA_COPY.button}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.24}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] px-3 py-1 text-xs text-brand-dark/45 dark:border-white/[0.08] dark:text-brand-cream/45">
              <Shield className="h-3.5 w-3.5 text-brand-orange" />
              {FINAL_CTA_COPY.chip}
            </span>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
