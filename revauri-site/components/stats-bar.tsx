"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";

const STATS = [
  {
    value: 100,
    suffix: "+",
    label: "Businesses served",
    description:
      "Small businesses across the US trust Revauri for modern, high-converting websites.",
  },
  {
    value: 4.7,
    suffix: "/5",
    label: "Client rating",
    description:
      "Our clients rate their experience highly — from first call to final launch.",
    showStar: true,
  },
  {
    value: 2.7,
    suffix: "x",
    label: "Average lead increase",
    description:
      "Clients see an average 2.7x increase in qualified leads after launching with Revauri.",
  },
  {
    value: 7,
    suffix: " days",
    label: "Average launch time",
    description:
      "Most sites go live within 7–14 business days — fast without cutting corners.",
  },
];

function AnimatedNumber({
  value,
  suffix,
  showStar,
}: {
  value: number;
  suffix?: string;
  showStar?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(0);
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayed(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplayed(
        isDecimal ? Math.round(current * 10) / 10 : Math.floor(current),
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayed(value);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, isDecimal, prefersReducedMotion, value]);

  const formatted = isDecimal ? displayed.toFixed(1) : displayed.toLocaleString();

  return (
    <span ref={ref} className="inline-flex items-center gap-1">
      {formatted}
      {suffix}
      {showStar && (
        <Star className="h-6 w-6 fill-brand-orange text-brand-orange" />
      )}
    </span>
  );
}

export function StatsBar() {
  return (
    <FadeInWhenVisible>
      <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] lg:py-20">
        {/* Large Desktop: columns in a row with dividers */}
        <div className="mx-auto hidden max-w-[1400px] items-stretch justify-center gap-6 px-8 xl:flex 2xl:gap-8 2xl:px-12">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="flex min-w-0 flex-1 items-stretch gap-6 2xl:gap-8"
            >
              <div className="flex flex-col items-start gap-1 text-left">
                <span className="mb-2 text-4xl font-bold text-brand-orange whitespace-nowrap xl:text-5xl">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    showStar={stat.showStar}
                  />
                </span>
                <span className="text-sm font-semibold text-brand-dark dark:text-brand-cream xl:text-base">
                  {stat.label}
                </span>
                <span className="text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                  {stat.description}
                </span>
              </div>
              {index < STATS.length - 1 && (
                <div
                  className="h-auto w-px self-stretch bg-brand-orange/30"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        {/* Tablet and Small Desktop: 2x2 grid */}
        <div className="mx-auto hidden w-full max-w-4xl grid-cols-2 gap-x-8 gap-y-12 px-6 md:grid xl:hidden">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-start gap-1 text-left"
            >
              <span className="mb-2 text-3xl font-bold text-brand-orange whitespace-nowrap md:text-4xl">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  showStar={stat.showStar}
                />
              </span>
              <span className="text-base font-semibold text-brand-dark dark:text-brand-cream">
                {stat.label}
              </span>
              <span className="text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile: 2x2 grid with smaller text */}
        <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-x-6 gap-y-10 px-6 md:hidden">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-0 flex-col items-start gap-1 text-left"
            >
              <span className="mb-1 text-3xl font-bold text-brand-orange sm:text-4xl">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  showStar={stat.showStar}
                />
              </span>
              <span className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                {stat.label}
              </span>
              <span className="text-xs leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

        {/* Technology logos */}
        <div className="mt-10 flex items-center justify-center gap-8 opacity-40">
          <span className="text-xs font-medium uppercase tracking-wide text-brand-mid-gray">
            Next.js
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-brand-mid-gray">
            Vercel
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-brand-mid-gray">
            Tailwind CSS
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-brand-mid-gray">
            shadcn/ui
          </span>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
