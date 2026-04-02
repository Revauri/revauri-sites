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
    value: 98,
    suffix: "%",
    label: "Client satisfaction",
    description:
      "Our clients rate their experience highly — from first call to final launch and beyond.",
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
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {/* Vercel triangle */}
          <div className="flex items-center gap-1.5 opacity-40 dark:opacity-30" aria-label="Vercel">
            <svg className="h-4 w-4 text-brand-dark dark:text-brand-cream" viewBox="0 0 76 65" fill="currentColor">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            <span className="text-xs font-medium text-brand-dark dark:text-brand-cream">Vercel</span>
          </div>

          {/* Next.js */}
          <div className="flex items-center gap-1.5 opacity-40 dark:opacity-30" aria-label="Next.js">
            <svg className="h-5 w-5" viewBox="0 0 180 180" fill="none">
              <circle cx="90" cy="90" r="90" className="fill-brand-dark dark:fill-brand-cream" />
              <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" className="fill-brand-cream dark:fill-brand-dark" />
              <rect x="115" y="54" width="12" height="72" className="fill-brand-cream dark:fill-brand-dark" />
            </svg>
            <span className="text-xs font-medium text-brand-dark dark:text-brand-cream">Next.js</span>
          </div>

          {/* Tailwind CSS */}
          <div className="flex items-center gap-1.5 opacity-40 dark:opacity-30" aria-label="Tailwind CSS">
            <svg className="h-4 w-5 text-brand-dark dark:text-brand-cream" viewBox="0 0 54 33" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
            </svg>
            <span className="text-xs font-medium text-brand-dark dark:text-brand-cream">Tailwind</span>
          </div>

          {/* shadcn/ui */}
          <div className="flex items-center gap-1.5 opacity-40 dark:opacity-30" aria-label="shadcn/ui">
            <svg className="h-4 w-4" viewBox="0 0 256 256" fill="none">
              <line x1="208" y1="128" x2="128" y2="208" className="stroke-brand-dark dark:stroke-brand-cream" strokeWidth="32" strokeLinecap="round" />
              <line x1="192" y1="40" x2="40" y2="192" className="stroke-brand-dark/50 dark:stroke-brand-cream/50" strokeWidth="32" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-medium text-brand-dark dark:text-brand-cream">shadcn/ui</span>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
