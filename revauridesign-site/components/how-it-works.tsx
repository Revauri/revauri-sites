"use client";

import { DiagnosticsStepArt, type DiagnosticsStepVariant } from "./diagnostics-step-art";
import { FadeInWhenVisible, StaggerChildren } from "./motion-wrappers";

const steps: {
  number: string;
  title: string;
  description: string;
  variant: DiagnosticsStepVariant;
}[] = [
  {
    number: "01",
    title: "We Build You a Free Preview",
    description:
      "Our team reviews your current website, identifies what's holding it back, and builds a custom homepage redesign using your actual business name and content. You'll receive a link to a live, working preview.",
    variant: "layers",
  },
  {
    number: "02",
    title: "We Walk You Through It",
    description:
      "On a quick 15-minute call, we'll show you the redesign, explain the strategy behind it, and answer any questions. No pressure, no hard sell.",
    variant: "nodes",
  },
  {
    number: "03",
    title: "You Approve, We Launch",
    description:
      "If you love what you see, we'll expand the preview into a complete website — built, deployed, and managed for you. Most projects ship in 4 to 6 weeks, sometimes sooner depending on complexity or job size.",
    variant: "flow",
  },
];

function DottedArrow() {
  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="flex items-center gap-1">
        <div className="h-px w-8 border-t border-dashed border-brand-mid-gray/40" />
        <svg className="h-3 w-3 text-brand-mid-gray/40" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        <div className="h-px w-8 border-t border-dashed border-brand-mid-gray/40" />
      </div>
    </div>
  );
}

function StepColumn({ step }: { step: (typeof steps)[number] }) {
  return (
    <div className="flex flex-col items-center text-center">
      <DiagnosticsStepArt variant={step.variant} />
      <div className="relative mt-6 mx-auto grid h-14 w-14 shrink-0 place-items-center">
        <span
          className="pointer-events-none absolute inset-[-14px] rounded-full bg-brand-orange/30 blur-2xl dark:bg-brand-orange/22 dark:blur-xl"
          aria-hidden
        />
        <div className="relative z-[1] flex h-full w-full items-center justify-center rounded-full bg-brand-dark text-sm font-semibold text-brand-cream shadow-[0_0_18px_10px_rgba(217,119,87,0.14),0_0_40px_22px_rgba(217,119,87,0.07)] dark:bg-brand-cream dark:text-brand-dark dark:shadow-[0_0_20px_10px_rgba(217,119,87,0.18),0_0_40px_22px_rgba(217,119,87,0.07)]">
          {step.number}
        </div>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-brand-dark dark:text-brand-cream">
        {step.title}
      </h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
        {step.description}
      </p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-brand-cream py-20 dark:bg-brand-dark lg:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeInWhenVisible>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
              Process
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-2 text-2xl font-medium bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent sm:text-3xl">
              From start to launch
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="mt-16 md:mt-20">
          <StaggerChildren className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-0 md:items-start">
            <StepColumn step={steps[0]} />
            <DottedArrow />
            <StepColumn step={steps[1]} />
            <DottedArrow />
            <StepColumn step={steps[2]} />
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
