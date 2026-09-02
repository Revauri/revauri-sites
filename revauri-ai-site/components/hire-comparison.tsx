"use client";

import { Check } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";

export const HIRING_A_PERSON = [
  "Weeks to recruit and train",
  "Payroll, taxes, and overhead",
  "They only work when they're there",
  "You still carry the busywork",
];

export const AI_EMPLOYEE = [
  "Built around how you already work",
  "We run it — on the job and after hours",
  "After setup, you are not in the busywork",
  "A lot cheaper than putting someone on payroll",
];

export function HireComparison() {
  return (
    <section className="dotted-grid py-12 sm:py-16 lg:py-20">
      <div className="section-measure px-6">
        <FadeInWhenVisible>
          <div>
            <p className="section-eyebrow">The trade</p>
            <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
              A person on payroll vs an AI employee
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              Same work. Less payroll. Your time back.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="relative mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.08] bg-brand-cream px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-dark/50 uppercase shadow-sm md:flex dark:border-white/[0.1] dark:bg-brand-dark dark:text-brand-cream/50"
          >
            vs
          </span>

          <FadeInWhenVisible delay={0.08} className="h-full">
            <div className="hairline-card h-full bg-white/90 p-6 sm:p-8 dark:bg-[#1c1b19]/92">
              <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">
                Hiring a person
              </h3>
              <ul className="mt-5 space-y-3">
                {HIRING_A_PERSON.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-mid-gray" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.14} className="h-full">
            <div className="h-full rounded-[10px] border border-brand-orange bg-[#f8f1eb] p-6 shadow-[var(--shadow-glow)] sm:p-8 dark:border-brand-orange/50 dark:bg-[#211a17] dark:shadow-[0_0_0_1px_rgba(217,119,87,0.25),0_24px_64px_-32px_rgba(217,119,87,0.35)]">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">
                  An AI employee
                </h3>
                <span className="rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[11px] font-medium text-brand-orange">
                  The hire
                </span>
              </div>
              <ul className="mt-5 space-y-3">
                {AI_EMPLOYEE.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
