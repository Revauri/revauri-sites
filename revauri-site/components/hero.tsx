"use client";

import Link from "next/link";
import { Check, Eye, ArrowRight } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream py-20 dark:bg-brand-dark lg:py-28">
      {/* Blur glow orbs */}
      <div
        className="pointer-events-none absolute -left-24 top-8 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl dark:bg-brand-orange/5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-8 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl dark:bg-brand-orange/5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[10%] top-[20%] h-64 w-64 rounded-full bg-brand-orange/[0.03] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Left Column — Copy */}
          <div className="flex min-w-0 flex-col space-y-5">
            <FadeInWhenVisible>
              <span className="inline-flex w-fit items-center rounded-full bg-brand-orange/10 px-4 py-2 text-sm font-medium text-brand-orange">
                Your website should work as hard as you do
              </span>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.08}>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-brand-dark dark:text-brand-cream sm:text-5xl md:text-[3.3rem] xl:text-[3.75rem]">
                <span className="block leading-[1.1]">
                  Don&apos;t let an outdated site
                </span>
                <span className="block leading-[1.1] bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                  cost you customers.
                </span>
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.14}>
              <p className="max-w-2xl text-lg leading-relaxed text-brand-dark/60 dark:text-brand-cream/60 lg:text-xl">
                We build fast, conversion-focused websites for small businesses.
                See a free custom redesign of your actual site before you spend
                a dime.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.18}>
              <p className="border-l-2 border-brand-orange/40 pl-3 text-base italic text-brand-dark/70 dark:text-brand-cream/70">
                75% of people judge a business&apos;s credibility by its website.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.22} margin="200px">
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact#book"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange animate-pulse-glow"
                >
                  Book a Free Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-orange/30 px-6 py-3 text-base font-medium text-brand-orange transition-all duration-200 hover:bg-brand-orange/5"
                >
                  <Eye className="h-5 w-5" />
                  View Pricing
                </Link>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.26} margin="200px">
              <span className="mt-2 flex items-center gap-1.5 text-xs text-brand-orange sm:justify-start">
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                Free sample &middot; No obligation &middot; Live in 7 days
              </span>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.30} margin="200px">
              <div className="grid gap-2 text-sm text-brand-dark/60 dark:text-brand-cream/60 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand-orange" />
                  Free homepage redesign before you commit
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand-orange" />
                  Mobile-first, fast-loading by default
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand-orange" />
                  Built on Vercel &amp; Next.js infrastructure
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand-orange" />
                  Unlimited updates, managed for you
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Right Column — Visual element */}
          <FadeInWhenVisible delay={0.3} direction="right">
            <div className="mt-8 w-full min-w-0 lg:mt-0">
              <div className="relative rounded-2xl border border-brand-light-gray/40 bg-brand-white/50 p-1 shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]/50">
                {/* Mock browser chrome */}
                <div className="flex items-center gap-2 rounded-t-xl bg-brand-cream/80 px-4 py-3 dark:bg-brand-dark/80">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                  </div>
                  <div className="mx-auto flex-1">
                    <div className="mx-auto max-w-[200px] rounded-md bg-brand-light-gray/40 px-3 py-1 text-center text-[10px] text-brand-mid-gray dark:bg-brand-mid-gray/20">
                      yourbusiness.com
                    </div>
                  </div>
                </div>
                {/* Mock site content */}
                <div className="space-y-3 rounded-b-xl bg-brand-white p-6 dark:bg-[#1a1a19]">
                  <div className="h-4 w-3/4 rounded bg-brand-orange/20" />
                  <div className="h-3 w-full rounded bg-brand-light-gray/60 dark:bg-brand-mid-gray/20" />
                  <div className="h-3 w-5/6 rounded bg-brand-light-gray/60 dark:bg-brand-mid-gray/20" />
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="h-20 rounded-lg bg-brand-orange/10" />
                    <div className="h-20 rounded-lg bg-brand-orange/8" />
                    <div className="h-20 rounded-lg bg-brand-orange/6" />
                  </div>
                  <div className="mt-3 flex gap-3">
                    <div className="h-8 w-28 rounded-lg bg-brand-orange/30" />
                    <div className="h-8 w-24 rounded-lg bg-brand-light-gray/40 dark:bg-brand-mid-gray/20" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="space-y-2 rounded-xl border border-brand-light-gray/40 p-3 dark:border-brand-mid-gray/20">
                      <div className="h-3 w-1/2 rounded bg-brand-orange/15" />
                      <div className="h-2 w-full rounded bg-brand-light-gray/40 dark:bg-brand-mid-gray/15" />
                      <div className="h-2 w-3/4 rounded bg-brand-light-gray/40 dark:bg-brand-mid-gray/15" />
                    </div>
                    <div className="space-y-2 rounded-xl border border-brand-light-gray/40 p-3 dark:border-brand-mid-gray/20">
                      <div className="h-3 w-1/2 rounded bg-brand-orange/15" />
                      <div className="h-2 w-full rounded bg-brand-light-gray/40 dark:bg-brand-mid-gray/15" />
                      <div className="h-2 w-3/4 rounded bg-brand-light-gray/40 dark:bg-brand-mid-gray/15" />
                    </div>
                  </div>
                </div>
                {/* "Before → After" label */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-brand-orange/30 bg-brand-white px-4 py-1.5 text-xs font-medium text-brand-orange shadow-lg dark:bg-brand-dark">
                  Your site, reimagined
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
