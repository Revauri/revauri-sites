import type { Metadata } from "next";
import { Check, Phone, Layers, Globe } from "lucide-react";
import { PageHero } from "@/components/page-hero";
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
  "Two workflows, named in writing before anything gets built",
  "We build them around how your business already runs",
  "We run them every week — after setup, you don't live in them",
  "A weekly note so you know what went out and what is waiting",
  "During setup you approve so it learns your voice. Then it runs.",
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
    description: (
      <>
        Separate, and only if the site itself is the leak. That’s{" "}
        <a
          href="https://revauri.com"
          className="font-medium text-brand-orange hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          revauri.com
        </a>{" "}
        — not this product.
      </>
    ),
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
          <FadeInWhenVisible>
            <p className="section-eyebrow">How pricing works</p>
            <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
              Why there are no numbers on this page
            </h2>
            <div className="relative mt-8 max-w-2xl border-l-2 border-brand-orange pl-6 sm:pl-8">
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
            <div className="hairline-card p-5 sm:p-8 lg:p-10">
              <p className="section-eyebrow">Included</p>
              <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
                What a standard hire includes
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {STANDARD_HIRE.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      <Check className="h-4 w-4 text-brand-orange" aria-hidden="true" />
                    </span>
                    <span className="text-[15px] leading-relaxed text-brand-dark/80 dark:text-brand-cream/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="mt-3 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EXTRAS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="hairline-card hairline-card-hover flex h-full flex-col p-6"
              >
                <span className="icon-tile">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-brand-dark dark:text-brand-cream">
                  {title}
                </h3>
                <div className="my-4 h-px bg-black/[0.08] dark:bg-white/[0.08]" />
                <p className="text-sm leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                  {description}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <PageCTA
        heading="How to start"
        body="Name the job you'd otherwise hire for. We look at it, tell you whether we can take it, and quote it before anything gets built."
      />
    </div>
  );
}
