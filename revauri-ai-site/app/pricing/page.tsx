import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Phone, Layers, Globe } from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";

export const metadata: Metadata = {
  title: "Pricing — Revauri AI",
  description:
    "Revauri AI is quoted on a short call, after we look at the job. No public price list, no packages you have to squeeze into.",
  alternates: { canonical: "/pricing" },
};

const STANDARD_HIRE = [
  "Two workflows, named in writing before anything gets built",
  "We build them around how your business already runs",
  "We run them every week — that is the part most tools leave to you",
  "A weekly note so you know what went out and what is waiting",
  "You approve everything a customer sees",
];

const EXTRAS = [
  {
    icon: Phone,
    title: "The phone hire",
    description:
      "Answering the missed, after-hours, and overflow calls is available as an add-on. We scope it on the call, once we know your call volume and what the hire is allowed to book.",
  },
  {
    icon: Layers,
    title: "Heavier or custom work",
    description:
      "Bigger than two workflows, or something unusual? We quote it before we start. We will not quietly absorb a job that does not fit, and you will not get a surprise invoice.",
  },
  {
    icon: Globe,
    title: "Website work",
    description: (
      <>
        Separate, and only worth doing if the site itself is the leak. That is a
        different door —{" "}
        <a
          href="https://revauri.com"
          className="font-medium text-brand-orange hover:underline"
        >
          revauri.com
        </a>{" "}
        — not something we sell on this product.
      </>
    ),
  },
];

export default function PricingPage() {
  return (
    <div>
      <PageHero
        badge="PRICING"
        title={<GradientText>Pricing</GradientText>}
        subtitle="We look at the job first, then quote it on a short call. There is no public price list."
      />

      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        {/* The promise */}
        <FadeInWhenVisible>
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-brand-dark dark:text-brand-cream sm:text-3xl">
              Why there are no numbers on this page
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              A hire is priced on the job it takes over, not on a tier you have
              to squeeze into. On a short call we name the two jobs, look at how
              they work today, and then you get a real number for that work.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              It is a lot less than another person on payroll. That is the whole
              point of hiring the work instead of hiring a body.
            </p>
          </section>
        </FadeInWhenVisible>

        {/* What a standard hire includes */}
        <FadeInWhenVisible delay={0.08}>
          <section className="mt-16 rounded-2xl border border-brand-light-gray/60 bg-brand-cream p-8 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] lg:p-10">
            <h2 className="text-2xl font-semibold text-brand-dark dark:text-brand-cream sm:text-3xl">
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

        {/* Add-ons and separate work */}
        <StaggerChildren className="mt-8 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {EXTRAS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex h-full flex-col rounded-2xl border border-brand-light-gray bg-brand-white p-8 transition-colors duration-300 hover:border-brand-orange/30 dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
            >
              <Icon className="h-6 w-6 text-brand-orange" />
              <h3 className="mt-4 text-lg font-semibold text-brand-dark dark:text-brand-cream">
                {title}
              </h3>
              <div className="my-5 h-px bg-brand-light-gray dark:bg-brand-mid-gray/20" />
              <p className="text-sm leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                {description}
              </p>
            </div>
          ))}
        </StaggerChildren>

        {/* How to start */}
        <FadeInWhenVisible delay={0.2}>
          <section className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-brand-dark dark:text-brand-cream sm:text-3xl">
              How to start
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              Book a call and tell us the job you hate. We look at it, tell you
              whether we can take it, and quote it before anything gets built.
            </p>
            <div className="mt-8">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
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
