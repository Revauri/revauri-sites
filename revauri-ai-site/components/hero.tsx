"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";

export function Hero() {
  return (
    <section className="hero-honeycomb relative overflow-hidden bg-brand-cream py-20 dark:bg-brand-dark lg:py-28">
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="flex flex-col items-center space-y-5">
          <FadeInWhenVisible>
            <span className="inline-flex w-fit items-center rounded-full bg-brand-orange/10 px-4 py-2 text-sm font-medium text-brand-orange">
              Revauri AI
            </span>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.08}>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-brand-dark dark:text-brand-cream sm:text-5xl">
              <span className="block leading-[1.1]">Hire the work.</span>
              <span className="block leading-[1.1] bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                Including the phone.
              </span>
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.14}>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              We put an AI employee on the job you hate. We build the workflow.
              We run it. You stay the boss.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.18}>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              That includes the phone. Missed, after-hours, and overflow calls
              get answered and captured instead of dying in voicemail. It is not
              a replacement for your receptionist.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.24}>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-[box-shadow,filter] duration-200 hover:brightness-[1.04] hover:shadow-[0_10px_28px_-12px_rgba(217,119,87,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
              >
                Book a call
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#jobs"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-light-gray bg-brand-white/70 px-8 py-3.5 text-base font-semibold text-brand-dark transition-colors duration-200 hover:border-brand-orange/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:border-brand-mid-gray/20 dark:bg-brand-dark/70 dark:text-brand-cream"
              >
                See the jobs
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.3}>
            <p className="pt-4 text-xs text-brand-mid-gray">
              Nothing goes to a customer unless you say yes.
            </p>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
