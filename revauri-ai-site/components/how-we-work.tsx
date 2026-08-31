"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FadeInWhenVisible } from "./motion-wrappers";
import { HOW_WE_WORK_CARDS } from "./how-we-work-data";

export function HowWeWork() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: fieldRef,
    offset: ["start end", "end start"],
  });
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section className="bg-brand-cream py-16 dark:bg-brand-dark md:py-24">
      <div className="section-measure px-6">
        <FadeInWhenVisible>
          <div className="max-w-2xl">
            <p className="section-eyebrow">How we work</p>
            <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
              We take the job off you.
              <br />
              <span className="section-h2-muted">Then we keep it running.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              Read the steps. Then book a call and name the job.
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              Book a call
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>

      <div
        ref={fieldRef}
        className="dotted-grid mt-12 overflow-visible py-20 md:mt-16 md:py-28"
      >
        <div className="section-measure grid grid-cols-1 gap-5 px-6 min-[767px]:grid-cols-2 min-[767px]:gap-x-10 min-[767px]:gap-y-0">
          {HOW_WE_WORK_CARDS.map((card, index) => {
            const isRight = index % 2 === 1;
            const y = reduced ? undefined : isRight ? yRight : yLeft;
            return (
              <motion.div
                key={card.roman}
                style={y ? { y } : undefined}
                className={
                  reduced
                    ? undefined
                    : `${isRight ? "min-[767px]:mt-16 min-[767px]:-ml-6" : "min-[767px]:z-10 min-[767px]:mb-8"}${
                        index > 0 ? " max-[766px]:-mt-4" : ""
                      }`
                }
              >
                <Link
                  href={card.href}
                  className="hairline-card group relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-white/90 p-7 backdrop-blur-sm transition-[transform] duration-300 hover:-translate-y-0.5 dark:bg-[#1c1b19]/92 min-[767px]:min-h-[300px] min-[767px]:p-8"
                >
                  <div>
                    <h3 className="text-[22px] font-semibold leading-tight tracking-tight text-brand-dark dark:text-brand-cream min-[767px]:text-[24px]">
                      {card.title}
                    </h3>
                    <div className="mt-5 h-px w-full bg-black/[0.08] dark:bg-white/[0.08]" />
                    <p className="mt-4 section-eyebrow">Chapter {card.roman}</p>
                  </div>
                  <div className="mt-8 flex items-end justify-between gap-4">
                    <p className="max-w-[14rem] text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                      {card.line}
                    </p>
                    <span
                      aria-hidden
                      className="font-serif text-[48px] font-medium leading-none text-brand-dark/25 dark:text-brand-cream/30 min-[767px]:text-[64px]"
                    >
                      {card.roman}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
