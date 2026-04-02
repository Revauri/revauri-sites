"use client";

import { Check } from "lucide-react";
import { FadeInWhenVisible, StaggerChildren } from "./motion-wrappers";

const launchFeatures = [
  "Full custom redesign (homepage + up to 6 pages)",
  "Mobile-first, fast-loading design",
  "Content & copy rewrite",
  "Deployed & managed on our infrastructure",
  "Delivered in 6 weeks",
  "Unlimited minor updates included",
  "Priority email support",
];

const growthFeatures = [
  "Up to 10 inner pages",
  "AI chatbot integration",
  "Custom illustrations or animations",
  "Lead capture forms with email integration",
  "Priority delivery in 4 weeks",
  "Monthly SEO optimization",
  "2 blog posts per month",
  "Google Analytics reporting dashboard",
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-brand-cream py-20 dark:bg-brand-dark lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeInWhenVisible>
          <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
            Simple,{" "}
            <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
              transparent
            </span>{" "}
            pricing.
          </h2>
        </FadeInWhenVisible>

        <StaggerChildren className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Launch Package */}
          <div className="flex flex-col rounded-2xl border border-brand-light-gray border-t-2 border-t-brand-light-gray bg-brand-white p-8 shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
            <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">
              Launch Package
            </h3>
            <div className="mt-4">
              <span className="text-4xl font-bold tracking-tight text-brand-dark dark:text-brand-cream">
                $2,900
              </span>
            </div>
            <p className="mt-1 text-sm text-brand-dark/50 dark:text-brand-cream/50">
              upfront + $390/mo Essential Website Care Plan
            </p>
            <div className="my-6 h-px bg-brand-light-gray dark:bg-brand-mid-gray/20" />
            <ul className="flex flex-col gap-3">
              {launchFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <span className="text-sm leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="/book"
                className="inline-flex w-full justify-center rounded-lg border-2 border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark shadow-[var(--shadow-sm)] transition-all duration-300 hover:bg-brand-dark hover:text-white hover:shadow-[var(--shadow-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark dark:border-brand-cream dark:text-brand-cream dark:hover:bg-brand-cream dark:hover:text-brand-dark"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Growth Package */}
          <div className="relative flex flex-col rounded-2xl border-2 border-brand-orange bg-brand-white p-8 shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-[#1a1a19]">
            {/* Badge */}
            <div className="absolute -top-3.5 left-6 rounded-full bg-brand-orange px-4 py-1 text-xs font-bold tracking-wide text-white">
              Most Popular
            </div>
            <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">
              Growth Package
            </h3>
            <div className="mt-4">
              <span className="text-4xl font-bold tracking-tight text-brand-dark dark:text-brand-cream">
                $4,900
              </span>
            </div>
            <p className="mt-1 text-sm text-brand-dark/50 dark:text-brand-cream/50">
              upfront + $590/mo Premium Website Care Plan
            </p>
            <div className="my-6 h-px bg-brand-light-gray dark:bg-brand-mid-gray/20" />
            <p className="mb-4 rounded-lg bg-brand-orange/10 px-4 py-2 text-sm font-semibold text-brand-orange">
              Everything in Launch, plus:
            </p>
            <ul className="flex flex-col gap-3">
              {growthFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <span className="text-sm leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="/book"
                className="inline-flex w-full justify-center rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange animate-pulse-glow"
              >
                Get Started
              </a>
            </div>
          </div>
        </StaggerChildren>

        {/* Bottom notes */}
        <FadeInWhenVisible delay={0.2}>
          <div className="mt-10 space-y-3 text-center">
            <p className="text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              Every package includes your Website Care Plan — hosting, SSL, unlimited minor updates, and
              priority support. Your first retainer payment doesn&apos;t start
              until 30 days after your site goes live.
            </p>
            <p className="text-sm text-brand-mid-gray">
              Need something specific? We offer individual add-ons for chatbot
              setup, analytics, booking calendars, and more.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
