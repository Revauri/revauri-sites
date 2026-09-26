import type { Metadata } from "next";
import { Globe, Layers, Mail, PenLine, Phone, RefreshCw, Workflow } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ClientReviews } from "@/components/client-reviews";
import { PageCTA } from "@/components/page-cta";
import { HireComparison } from "@/components/hire-comparison";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";
import { PAGE_HEROES } from "@/lib/marketing-copy";

export const metadata: Metadata = {
  title: "Pricing — Revauri AI",
  description:
    "A Revauri AI employee is a lot less than putting another person on payroll. Less overhead, your time back. We look at the job, then quote it on a short call. No public price list.",
  alternates: { canonical: "/pricing" },
};

const STANDARD_HIRE = [
  {
    icon: PenLine,
    title: "Two workflows, named in writing",
    description: "Before anything gets built.",
  },
  {
    icon: Workflow,
    title: "Built around how you already run",
    description: "We build them around how your business already runs.",
  },
  {
    icon: RefreshCw,
    title: "We run them every week",
    description: "After setup, you don't live in them.",
  },
  {
    icon: Mail,
    title: "A weekly note",
    description:
      "So you know what went out and what is waiting. During setup you approve so it learns your voice. Then it runs.",
  },
];

const EXTRAS = [
  {
    icon: Phone,
    title: "The phone hire",
    description:
      "Answering missed, after-hours, and overflow calls is an add-on. We scope it on the call.",
  },
  {
    icon: Layers,
    title: "Heavier or custom work",
    description:
      "Bigger than two workflows, or unusual? We quote it before we start. No surprise invoice.",
  },
  {
    icon: Globe,
    title: "Website work",
    description:
      "Separate, and only if the site itself is the leak. Not this product.",
  },
];

const HERO = PAGE_HEROES.pricing;

export default function PricingPage() {
  return (
    <div>
      <PageHero
        badge={HERO.badge}
        title={HERO.title}
        muted={HERO.muted}
        subtitle={HERO.subtitle}
      />

      <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="section-measure px-6">
          <FadeInWhenVisible className="ml-auto flex max-w-2xl flex-col items-end text-right">
            <p className="section-eyebrow">How pricing works</p>
            <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
              We quote the job, not a plan
            </h2>
            <div className="relative mt-8 w-full border-r-2 border-brand-orange pr-6 sm:pr-8">
              <p className="text-lg leading-relaxed text-brand-dark/80 dark:text-brand-cream/80 md:text-xl">
                A hire is priced on the job it takes over, not on a software
                tier. On a short call we name the two jobs, look at how they work
                today, and then you get a real number for that work.
              </p>
              <p className="mt-4 text-[15px] font-medium text-brand-dark dark:text-brand-cream">
                It is a lot less than another person on payroll. That is the
                point.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <HireComparison />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="section-measure px-6">
          <FadeInWhenVisible delay={0.08}>
            <p className="section-eyebrow">Included</p>
            <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
              What a standard hire includes
            </h2>
          </FadeInWhenVisible>

          <div className="relative mt-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden sm:block"
            >
              <span className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-brand-orange/45" />
              <span className="absolute right-0 left-0 top-1/2 h-px -translate-y-1/2 bg-brand-orange/45" />
            </div>

            <StaggerChildren className="grid grid-cols-1 divide-y divide-brand-orange/45 sm:grid-cols-2 sm:divide-y-0">
              {STANDARD_HIRE.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex h-full items-start gap-3.5 p-6 sm:p-8">
                    <span className="mt-1 inline-flex shrink-0 text-brand-orange">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-tight text-brand-dark dark:text-brand-cream">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-dark/55 dark:text-brand-cream/55">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </StaggerChildren>
          </div>

          <div className="relative mt-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden md:block"
            >
              <span className="absolute top-0 bottom-0 left-1/3 w-px -translate-x-1/2 bg-brand-orange/45" />
              <span className="absolute top-0 bottom-0 left-2/3 w-px -translate-x-1/2 bg-brand-orange/45" />
            </div>

            <StaggerChildren className="grid grid-cols-1 divide-y divide-brand-orange/45 md:grid-cols-3 md:divide-y-0">
              {EXTRAS.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex h-full items-start gap-3 p-6 sm:p-8">
                  <span className="mt-0.5 inline-flex shrink-0 text-brand-orange">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-brand-dark dark:text-brand-cream">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      <ClientReviews />

      <PageCTA
        heading="How to start"
        body="Name the job you'd otherwise hire for. We look at it, tell you whether we can take it, and quote it before anything gets built."
      />
    </div>
  );
}
