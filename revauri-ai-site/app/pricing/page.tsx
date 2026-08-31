import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Phone, Layers, Globe } from "lucide-react";
import { PageHero } from "@/components/page-hero";
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
          className="font-medium text-brand-orange hover:underline"
        >
          revauri.com
        </a>
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

      <div className="section-measure px-6 py-16 lg:py-20">
        <FadeInWhenVisible>
          <section>
            <h2 className="section-h2 text-brand-dark dark:text-brand-cream">
              Why there are no numbers on this page
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              A hire is priced on the job it takes over, not on a software
              tier. On a short call we name the two jobs, look at how they work
              today, and then you get a real number for that work.
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              It is a lot less than another person on payroll. That is the
              point.
            </p>
          </section>
        </FadeInWhenVisible>

        <HireComparison />

        <FadeInWhenVisible delay={0.08}>
          <section className="hairline-card mt-16 p-8 lg:p-10">
            <h2 className="text-[22px] font-semibold tracking-tight text-brand-dark dark:text-brand-cream sm:text-[24px]">
              What a standard hire includes
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {STANDARD_HIRE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <span className="text-sm leading-relaxed text-brand-dark/80 dark:text-brand-cream/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </FadeInWhenVisible>

        <StaggerChildren className="mt-4 grid grid-cols-1 items-stretch gap-3 md:grid-cols-3">
          {EXTRAS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="hairline-card flex h-full flex-col p-6">
              <Icon className="h-5 w-5 text-brand-dark/40 dark:text-brand-cream/40" />
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

        <FadeInWhenVisible delay={0.2}>
          <section className="mt-16">
            <h2 className="section-h2 text-brand-dark dark:text-brand-cream">
              How to start
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              Book a call and name the job you’d otherwise hire for. We look at
              it, tell you whether we can take it, and quote it before anything
              gets built.
            </p>
            <div className="mt-8">
              <Link
                href="/book"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
              >
                Book a call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}
