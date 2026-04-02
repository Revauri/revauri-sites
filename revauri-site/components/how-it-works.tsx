"use client";

import { FadeInWhenVisible, StaggerChildren } from "./motion-wrappers";

const steps = [
  {
    number: "01",
    title: "We Build You a Free Sample",
    description:
      "Our team reviews your current website, identifies what's holding it back, and builds a custom homepage redesign using your actual business name and content. You'll receive a link to a live, working preview.",
  },
  {
    number: "02",
    title: "We Walk You Through It",
    description:
      "On a quick 15-minute call, we'll show you the redesign, explain the strategy behind it, and answer any questions. No pressure, no hard sell.",
  },
  {
    number: "03",
    title: "You Approve, We Launch",
    description:
      "If you love what you see, we'll expand the sample into a complete website — built, deployed, and managed for you. Launch Package sites are delivered in 6 weeks; Growth Package in just 4 weeks.",
  },
];

function DiscoveryIllustration() {
  return (
    <svg
      viewBox="0 0 180 180"
      className="h-44 w-44 text-brand-orange/40"
      aria-hidden="true"
    >
      <circle cx="90" cy="40" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="90" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="140" cy="90" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="60" cy="140" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="120" cy="140" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="90" y1="58" x2="54" y2="82" stroke="currentColor" strokeWidth="1.25" />
      <line x1="90" y1="58" x2="126" y2="82" stroke="currentColor" strokeWidth="1.25" />
      <line x1="54" y1="98" x2="72" y2="132" stroke="currentColor" strokeWidth="1.25" />
      <line x1="126" y1="98" x2="108" y2="132" stroke="currentColor" strokeWidth="1.25" />
      <line x1="72" y1="140" x2="108" y2="140" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function DesignIllustration() {
  return (
    <svg
      viewBox="0 0 180 180"
      className="h-44 w-44 text-brand-orange/40"
      aria-hidden="true"
    >
      <rect x="35" y="25" width="80" height="100" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="65" y="55" width="80" height="100" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="75" y="70" width="30" height="4" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="75" y="80" width="50" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
      <rect x="75" y="88" width="40" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
      <circle cx="55" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="55" cy="50" r="4" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function LaunchIllustration() {
  return (
    <svg
      viewBox="0 0 180 180"
      className="h-44 w-44 text-brand-orange/40"
      aria-hidden="true"
    >
      <circle cx="90" cy="90" r="70" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="90" cy="90" r="50" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="90" cy="90" r="30" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="90" cy="90" r="10" fill="currentColor" opacity="0.2" />
      <line x1="90" y1="15" x2="90" y2="35" stroke="currentColor" strokeWidth="1" />
      <line x1="90" y1="145" x2="90" y2="165" stroke="currentColor" strokeWidth="1" />
      <line x1="15" y1="90" x2="35" y2="90" stroke="currentColor" strokeWidth="1" />
      <line x1="145" y1="90" x2="165" y2="90" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

const illustrations = [DiscoveryIllustration, DesignIllustration, LaunchIllustration];

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

function StepColumn({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const Illustration = illustrations[index];
  return (
    <div className="flex flex-col items-center text-center">
      <Illustration />
      <div className="mt-6 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-dark text-sm font-semibold text-brand-cream dark:bg-brand-cream dark:text-brand-dark">
        {step.number}
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
            <StepColumn step={steps[0]} index={0} />
            <DottedArrow />
            <StepColumn step={steps[1]} index={1} />
            <DottedArrow />
            <StepColumn step={steps[2]} index={2} />
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
