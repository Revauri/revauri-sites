import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";
import { PageHero, GradientText } from "@/components/page-hero";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";

export const metadata: Metadata = {
  title: "Pricing — Revauri",
  description:
    "Simple, transparent pricing for modern website design. Launch Package from $2,500 or Growth Package from $4,500. Free sample redesign included.",
};

const launchFeatures = [
  "Full custom redesign (homepage + up to 6 pages)",
  "Mobile-first, fast-loading design",
  "Content & copy rewrite",
  "Deployed & managed on our infrastructure",
  "Delivered in 10–14 business days",
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

const CERTAINTY_ITEMS = [
  "Your free sample redesign is built before you commit. No surprises.",
  "Two rounds of revisions are included in every package. We work with you until it's right.",
  "Your retainer payment doesn't start until 30 days after your site goes live.",
  "Cancel the retainer anytime with 30-day notice. You keep the code, no penalties.",
  "Every site includes managed hosting, SSL, and unlimited minor updates.",
  "Need something specific? We offer individual add-ons for chatbots, analytics, and more.",
];

export default function PricingPage() {
  return (
    <div>
      <PageHero
        badge="PRICING"
        title={
          <>
            Simple, <GradientText>Transparent</GradientText> Pricing
          </>
        }
        subtitle="No hidden fees. No long-term contracts. See your redesign before you pay."
      >
        <span className="flex items-center gap-2 text-sm text-brand-orange">
          <Check className="h-4 w-4" />
          Free sample redesign before any commitment
        </span>
      </PageHero>

      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Launch Package */}
          <div className="flex flex-col rounded-2xl border border-brand-light-gray border-t-2 border-t-brand-light-gray bg-brand-white p-8 shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
            <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">
              Launch Package
            </h3>
            <div className="mt-4">
              <span className="text-4xl font-bold tracking-tight text-brand-dark dark:text-brand-cream">
                $2,500
              </span>
            </div>
            <p className="mt-1 text-sm text-brand-dark/50 dark:text-brand-cream/50">
              upfront + $349/mo managed hosting
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
              <Link
                href="/contact#book"
                className="inline-flex w-full justify-center rounded-lg border-2 border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark shadow-[var(--shadow-sm)] transition-all duration-300 hover:bg-brand-dark hover:text-white hover:shadow-[var(--shadow-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark dark:border-brand-cream dark:text-brand-cream dark:hover:bg-brand-cream dark:hover:text-brand-dark"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Growth Package */}
          <div className="relative flex flex-col rounded-2xl border-2 border-brand-orange bg-brand-white p-8 shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-[#1a1a19]">
            <div className="absolute -top-3.5 left-6 rounded-full bg-brand-orange px-4 py-1 text-xs font-bold tracking-wide text-white">
              Most Popular
            </div>
            <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">
              Growth Package
            </h3>
            <div className="mt-4">
              <span className="text-4xl font-bold tracking-tight text-brand-dark dark:text-brand-cream">
                $4,500
              </span>
            </div>
            <p className="mt-1 text-sm text-brand-dark/50 dark:text-brand-cream/50">
              upfront + $549/mo managed hosting
            </p>
            <div className="my-6 h-px bg-brand-light-gray dark:bg-brand-mid-gray/20" />
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
              <Link
                href="/contact#book"
                className="inline-flex w-full justify-center rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange animate-pulse-glow"
              >
                Get Started
              </Link>
            </div>
          </div>
        </StaggerChildren>

        {/* Certainty block */}
        <FadeInWhenVisible delay={0.2}>
          <section className="mt-16 rounded-2xl border border-brand-light-gray/60 bg-brand-cream p-8 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
            <h2 className="mb-6 text-center text-xl font-semibold text-brand-dark dark:text-brand-cream">
              No surprises. Here&apos;s exactly what to expect.
            </h2>
            <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
              {CERTAINTY_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <span className="text-sm text-brand-dark/80 dark:text-brand-cream/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}
