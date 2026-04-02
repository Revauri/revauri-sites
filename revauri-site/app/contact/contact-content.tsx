"use client";

import Link from "next/link";
import { FadeInWhenVisible } from "@/components/motion-wrappers";
import { Booking } from "@/components/booking";

function InfoCard({
  title,
  description,
  children,
}: React.PropsWithChildren<{ title: string; description: string }>) {
  return (
    <div className="rounded-2xl border border-brand-light-gray/60 bg-brand-cream p-6 space-y-3 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
      <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">{title}</h3>
      <p className="text-sm text-brand-mid-gray">{description}</p>
      {children && <div>{children}</div>}
    </div>
  );
}

export function ContactContent() {
  return (
    <>
      <Booking />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInWhenVisible>
            <h2 className="mb-8 text-center text-2xl font-bold text-brand-dark dark:text-brand-cream sm:text-3xl">
              Other ways to reach us
            </h2>
          </FadeInWhenVisible>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FadeInWhenVisible delay={0.08}>
              <InfoCard
                title="Email"
                description="Best for detailed questions, project briefs, or follow-ups."
              >
                <a className="text-sm text-brand-orange hover:underline" href="mailto:joseph@revauri.com">
                  joseph@revauri.com
                </a>
              </InfoCard>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.14}>
              <InfoCard
                title="FAQ"
                description="Quick answers to common questions about our process, pricing, and tech."
              >
                <Link className="text-sm text-brand-orange hover:underline" href="/faq">
                  Browse FAQ &rarr;
                </Link>
              </InfoCard>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <InfoCard
                title="Mailing Address"
                description="For official correspondence."
              >
                <p className="text-sm text-brand-dark/80 dark:text-brand-cream/80">
                  Revauri LLC
                  <br />
                  Belleville, NJ 07109
                </p>
              </InfoCard>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </>
  );
}
