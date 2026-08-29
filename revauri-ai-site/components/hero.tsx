"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";
import { HeroHireDemo } from "./hero-hire-demo";

export function Hero() {
  return (
    <section className="hero-honeycomb relative overflow-hidden bg-brand-cream py-16 dark:bg-brand-dark lg:py-20">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12">
          <div className="flex min-w-0 flex-col space-y-5">
            <FadeInWhenVisible>
              <span className="inline-flex w-fit items-center rounded-full bg-brand-orange/10 px-4 py-2 text-sm font-medium text-brand-orange">
                Revauri AI
              </span>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.08}>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-brand-dark dark:text-brand-cream sm:text-5xl">
                <span className="block leading-[1.1]">Hire an AI employee.</span>
                <span className="block leading-[1.1] bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                  Not another salary.
                </span>
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.14}>
              <p className="max-w-xl text-lg leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                We build it. We run it. A custom AI agent that automates the
                busy work and keeps your business earning while you&apos;re on
                the job or off the clock. You keep the money, and more of your
                time.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.18}>
              <p className="max-w-xl text-base leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                Answering after hours, taking the name, booking the visit so
                the job doesn&apos;t die in voicemail. And it&apos;s not just
                the phone. Leads, quotes, reviews, emails, payroll, outreach,
                calendar management — if you can name it, we can build it. All
                without putting another person on payroll.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.24}>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                After setup, the agent runs the busywork — you don&apos;t.
              </p>
            </FadeInWhenVisible>
          </div>

          <FadeInWhenVisible delay={0.3} direction="right">
            <div className="mt-8 w-full min-w-0 lg:mt-0">
              <HeroHireDemo />
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
