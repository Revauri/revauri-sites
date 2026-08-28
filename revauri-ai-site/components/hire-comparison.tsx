"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";

const hiringAPerson = [
  "Weeks to recruit and train",
  "Payroll, taxes, and overhead",
  "They only work when they're there",
  "You still carry the busywork",
];

const aiEmployee = [
  "Built around how you already work",
  "We run it — on the job and after hours",
  "After setup, you are not in the busywork",
  "A lot cheaper than putting someone on payroll",
];

export function HireComparison() {
  return (
    <section className="bg-brand-orange/5 py-20 dark:bg-brand-orange/[0.03] lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
              The trade
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              A person on payroll vs an AI employee
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-brand-dark/60 dark:text-brand-cream/60">
              Same work. Less payroll. Fewer headaches. Your time back. We run
              it so you don&apos;t have to.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <FadeInWhenVisible delay={0.08}>
            <div className="h-full rounded-2xl border border-brand-light-gray/60 bg-brand-white p-6 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] sm:p-8">
              <h3 className="text-xl font-semibold text-brand-dark dark:text-brand-cream">
                Hiring a person
              </h3>
              <ul className="mt-5 space-y-3">
                {hiringAPerson.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-mid-gray" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.14}>
            <div className="h-full rounded-2xl border border-brand-orange bg-brand-orange/10 p-6 shadow-[var(--shadow-md)] dark:border-brand-orange/40 sm:p-8">
              <h3 className="text-xl font-semibold text-brand-dark dark:text-brand-cream">
                An AI employee
              </h3>
              <ul className="mt-5 space-y-3">
                {aiEmployee.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="max-w-2xl text-sm text-brand-mid-gray">
              No prices on this page. You get a real quote on a short call,
              priced against the job &mdash; not against a software tool.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-[box-shadow,filter] duration-200 hover:brightness-[1.04] hover:shadow-[0_10px_28px_-12px_rgba(217,119,87,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              Book a call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
