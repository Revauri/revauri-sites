import type { Metadata } from "next";
import {
  Check,
  ArrowRight,
  Layout,
  Smartphone,
  PenLine,
  Server,
  Clock,
  RefreshCw,
  Headphones,
  Layers,
  Bot,
  Palette,
  Mail,
  Zap,
  Search,
  FileText,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { PageHero, GradientText } from "@/components/page-hero";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";
import BlendedDemoFrame from "@/components/blended-demo-frame";

export const metadata: Metadata = {
  title: "Pricing — Revauri",
  description:
    "Simple, transparent pricing for modern website design. Launch Package from $2,900 or Growth Package from $4,900. Free sample redesign included.",
};

const launchFeatures = [
  { icon: Layout, text: "Full custom redesign (homepage + up to 6 pages)" },
  { icon: Smartphone, text: "Mobile-first, fast-loading design" },
  { icon: PenLine, text: "Content & copy rewrite" },
  { icon: Server, text: "Deployed & managed on our infrastructure" },
  { icon: Clock, text: "Delivered in 6 weeks" },
  { icon: RefreshCw, text: "Unlimited minor updates included" },
  { icon: Headphones, text: "Priority email support" },
];

const growthFeatures = [
  { icon: Layers, text: "Up to 10 inner pages" },
  { icon: Bot, text: "AI chatbot integration" },
  { icon: Palette, text: "Custom illustrations or animations" },
  { icon: Mail, text: "Lead capture forms with email integration" },
  { icon: Zap, text: "Priority delivery in 4 weeks" },
  { icon: Search, text: "Monthly SEO optimization" },
  { icon: FileText, text: "2 blog posts per month" },
  { icon: BarChart3, text: "Google Analytics reporting dashboard" },
];

const CERTAINTY_ITEMS = [
  "Your free sample redesign is built before you commit. No surprises.",
  "Two rounds of revisions are included in every package. We work with you until it's right.",
  "Your retainer payment doesn't start until 30 days after your site goes live.",
  "Cancel the retainer anytime with 30-day notice. You keep the code, no penalties.",
  "Every site includes your Website Care Plan — hosting, SSL, and unlimited minor updates.",
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
        <StaggerChildren className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          {/* Launch Package */}
          <BlendedDemoFrame className="pt-4">
            <div className="flex flex-col rounded-2xl border border-brand-light-gray bg-brand-white p-8 transition-all duration-300 hover:-translate-y-1 dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
              <p className="text-xs font-medium uppercase tracking-wider text-brand-mid-gray">
                For businesses ready to upgrade
              </p>
              <h3 className="mt-2 text-xl font-semibold text-brand-dark dark:text-brand-cream">
                Launch Package
              </h3>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight text-brand-dark dark:text-brand-cream">
                  $2,900
                </span>
                <span className="text-sm text-brand-mid-gray">one-time</span>
              </div>
              <p className="mt-1.5 text-sm text-brand-dark/50 dark:text-brand-cream/50">
                + $390/mo Essential Website Care Plan
              </p>
              <div className="my-6 h-px bg-brand-light-gray dark:bg-brand-mid-gray/20" />
              <ul className="flex flex-col gap-3">
                {launchFeatures.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <span className="text-sm leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link
                  href="/book"
                  className="inline-flex w-full justify-center rounded-lg border-2 border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark dark:border-brand-cream dark:text-brand-cream dark:hover:bg-brand-cream dark:hover:text-brand-dark"
                >
                  Book a Free Call
                </Link>
              </div>
            </div>
          </BlendedDemoFrame>

          {/* Growth Package */}
          <BlendedDemoFrame className="pt-4">
            <div className="relative flex flex-col rounded-2xl border-2 border-brand-orange bg-brand-white p-8 transition-all duration-300 hover:-translate-y-1 dark:bg-[#1a1a19]">
              <div className="absolute -top-3.5 left-6 z-10 rounded-full bg-brand-orange px-4 py-1 text-xs font-bold tracking-wide text-white">
                Most Popular
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-brand-orange">
                For businesses ready to scale
              </p>
              <h3 className="mt-2 text-xl font-semibold text-brand-dark dark:text-brand-cream">
                Growth Package
              </h3>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight text-brand-dark dark:text-brand-cream">
                  $4,900
                </span>
                <span className="text-sm text-brand-mid-gray">one-time</span>
              </div>
              <p className="mt-1.5 text-sm text-brand-dark/50 dark:text-brand-cream/50">
                + $590/mo Premium Website Care Plan
              </p>
              <div className="my-6 h-px bg-brand-light-gray dark:bg-brand-mid-gray/20" />
              <p className="mb-4 rounded-lg bg-brand-orange/10 px-4 py-2 text-sm font-semibold text-brand-orange">
                Everything in Launch, plus:
              </p>
              <ul className="flex flex-col gap-3">
                {growthFeatures.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <span className="text-sm leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  href="/book"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange animate-pulse-glow"
                >
                  Start Growing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </BlendedDemoFrame>
        </StaggerChildren>

        {/* Certainty block */}
        <FadeInWhenVisible delay={0.2}>
          <section className="mt-16 rounded-2xl bg-brand-cream p-8 dark:bg-[#1a1a19]">
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
