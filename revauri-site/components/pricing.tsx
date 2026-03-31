"use client";

import { Check } from "lucide-react";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

const launchFeatures = [
  "Full custom redesign (homepage + up to 6 pages)",
  "Mobile-first, fast-loading design",
  "Content & copy rewrite",
  "Deployed & managed on our infrastructure",
  "Delivered in 10\u201314 business days",
  "Unlimited minor updates included",
  "1 new page per month",
  "Priority email support",
];

const growthFeatures = [
  "Everything in Launch, plus:",
  "Up to 10 inner pages",
  "AI chatbot integration",
  "Custom illustrations or animations",
  "Lead capture forms with email integration",
  "Priority 7-day delivery",
  "Monthly SEO optimization",
  "2 AI-drafted blog posts per month",
  "Google Analytics reporting dashboard",
];

export function Pricing() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="pricing" className="bg-brand-cream py-20 lg:py-24">
      <div ref={ref} className="reveal mx-auto max-w-5xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Simple, transparent pricing.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Launch Package */}
          <div className="stagger-child flex flex-col rounded-2xl border border-brand-light-gray bg-brand-white p-8 opacity-0">
            <h3 className="text-lg font-semibold text-brand-dark">
              Launch Package
            </h3>
            <div className="mt-4">
              <span className="text-4xl font-bold tracking-tight text-brand-dark">
                $2,500
              </span>
            </div>
            <p className="mt-1 text-sm text-brand-dark/50">
              upfront + $349/mo managed hosting
            </p>
            <div className="my-6 h-px bg-brand-light-gray" />
            <ul className="flex flex-col gap-3">
              {launchFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <span className="text-sm leading-relaxed text-brand-dark/70">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="#book"
                className="inline-flex w-full justify-center rounded-lg border-2 border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Growth Package */}
          <div
            className="stagger-child relative flex flex-col rounded-2xl border-2 border-brand-orange bg-brand-white p-8 opacity-0"
            style={{ animationDelay: "120ms" }}
          >
            {/* Badge */}
            <div className="absolute -top-3.5 left-6 rounded-full bg-brand-orange px-4 py-1 text-xs font-bold tracking-wide text-white">
              Most Popular
            </div>
            <h3 className="text-lg font-semibold text-brand-dark">
              Growth Package
            </h3>
            <div className="mt-4">
              <span className="text-4xl font-bold tracking-tight text-brand-dark">
                $4,500
              </span>
            </div>
            <p className="mt-1 text-sm text-brand-dark/50">
              upfront + $549/mo managed hosting
            </p>
            <div className="my-6 h-px bg-brand-light-gray" />
            <ul className="flex flex-col gap-3">
              {growthFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <span className="text-sm leading-relaxed text-brand-dark/70">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="#book"
                className="inline-flex w-full justify-center rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>

        {/* Bottom notes */}
        <div className="mt-10 space-y-3 text-center">
          <p className="text-sm leading-relaxed text-brand-dark/60">
            Every package includes managed hosting, unlimited minor updates, and
            priority support. Your first retainer payment doesn&apos;t start
            until 30 days after your site goes live.
          </p>
          <p className="text-sm text-brand-mid-gray">
            Need something specific? We offer individual add-ons for chatbot
            setup, analytics, booking calendars, and more.
          </p>
        </div>
      </div>
    </section>
  );
}
