"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FileSearch, PhoneCall, Rocket, Check } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";

const steps = [
  {
    number: "01",
    title: "We Build You a Free Sample",
    description:
      "Our team reviews your current website, identifies what\u2019s holding it back, and builds a custom homepage redesign using your actual business name and content. You\u2019ll receive a link to a live, working preview.",
    icon: FileSearch,
  },
  {
    number: "02",
    title: "We Walk You Through It",
    description:
      "On a quick 15-minute call, we\u2019ll show you the redesign, explain the strategy behind it, and answer any questions. No pressure, no hard sell.",
    icon: PhoneCall,
  },
  {
    number: "03",
    title: "You Approve, We Launch",
    description:
      "If you love what you see, we\u2019ll expand the sample into a complete website \u2014 built, deployed, and managed for you. Your new site can be live in as little as 7 days.",
    icon: Rocket,
  },
];

function StepCircle({
  number,
  scrollProgress,
  stepIndex,
  totalSteps,
}: {
  number: string;
  scrollProgress: ReturnType<typeof useSpring>;
  stepIndex: number;
  totalSteps: number;
}) {
  const stepStart = stepIndex / totalSteps;
  const stepEnd = (stepIndex + 1) / totalSteps;

  const scale = useTransform(
    scrollProgress,
    [stepStart, stepStart + 0.1],
    [0.7, 1],
  );
  const checkOpacity = useTransform(
    scrollProgress,
    [stepEnd - 0.05, stepEnd],
    [0, 1],
  );

  return (
    <motion.div
      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-orange bg-brand-white dark:bg-brand-dark"
      style={{ scale }}
    >
      <span className="text-sm font-semibold text-brand-orange">{number}</span>
      <motion.div
        className="absolute inset-0 flex items-center justify-center rounded-full bg-brand-orange"
        style={{ opacity: checkOpacity }}
      >
        <Check className="h-5 w-5 text-white" />
      </motion.div>
    </motion.div>
  );
}

function StepCard({
  step,
  direction,
}: {
  step: (typeof steps)[number];
  direction: "left" | "right";
}) {
  const Icon = step.icon;

  return (
    <FadeInWhenVisible direction={direction} delay={0.1}>
      <div className="group rounded-2xl border border-brand-light-gray/60 border-t-2 border-t-brand-orange/40 bg-brand-white p-5 shadow-[var(--shadow-xl)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
        <div className="flex items-start gap-4">
          <div className="rounded-xl border border-brand-orange/10 bg-brand-orange/10 p-3 transition-colors duration-200 group-hover:border-brand-orange group-hover:bg-brand-orange">
            <Icon className="h-5 w-5 text-brand-orange transition-colors duration-200 group-hover:text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">
              {step.title}
            </h3>
            <p className="mt-2 leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </FadeInWhenVisible>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.35,
  });
  const lineScaleY = useTransform(smoothScrollProgress, [0, 1], [0, 1]);

  return (
    <section
      id="how-it-works"
      className="bg-brand-cream py-20 dark:bg-brand-dark lg:py-24"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible>
          <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
            How It{" "}
            <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
        </FadeInWhenVisible>

        {/* Desktop: Zigzag timeline */}
        <div className="relative mt-16 hidden lg:block">
          {/* Vertical timeline line */}
          <div className="absolute inset-0 flex justify-center">
            <div className="relative w-px">
              <div className="absolute inset-0 bg-brand-light-gray dark:bg-brand-mid-gray/20" />
              <motion.div
                className="absolute inset-0 bg-brand-orange"
                style={{ scaleY: lineScaleY, transformOrigin: "top" }}
              />
            </div>
          </div>

          <div className="relative space-y-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-8"
                >
                  {isLeft ? (
                    <>
                      <StepCard step={step} direction="left" />
                      <StepCircle
                        number={step.number}
                        scrollProgress={smoothScrollProgress}
                        stepIndex={i}
                        totalSteps={steps.length}
                      />
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <StepCircle
                        number={step.number}
                        scrollProgress={smoothScrollProgress}
                        stepIndex={i}
                        totalSteps={steps.length}
                      />
                      <StepCard step={step} direction="right" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical timeline on left */}
        <div className="relative mt-12 pl-16 lg:hidden">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px bg-brand-light-gray dark:bg-brand-mid-gray/20"
            aria-hidden="true"
          />

          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                {/* Circle on the line */}
                <div className="absolute -left-[calc(2.75rem+1px)] flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-orange bg-brand-white dark:bg-brand-dark">
                  <span className="text-xs font-semibold text-brand-orange">
                    {step.number}
                  </span>
                </div>
                <StepCard step={step} direction="right" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
