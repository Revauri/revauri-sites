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
    <section className="mt-16">
      <FadeInWhenVisible>
        <div>
          <p className="section-eyebrow">The trade</p>
          <h2 className="section-h2 mt-3 text-brand-dark dark:text-brand-cream">
            A person on payroll vs an AI employee
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
            Same work. Less payroll. Your time back.
          </p>
        </div>
      </FadeInWhenVisible>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <FadeInWhenVisible delay={0.08}>
          <div className="hairline-card h-full p-6 sm:p-7">
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

        <FadeInWhenVisible delay={0.14}>
          <div className="h-full rounded-[10px] border border-brand-orange bg-brand-orange/[0.06] p-6 sm:p-7 dark:border-brand-orange/50">
            <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">
              An AI employee
            </h3>
            <ul className="mt-5 space-y-3">
              {AI_EMPLOYEE.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
