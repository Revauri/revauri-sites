"use client";

import { useScrollReveal } from "@/lib/use-scroll-reveal";

const steps = [
  {
    number: "01",
    title: "We Build You a Free Sample",
    description:
      "Our team reviews your current website, identifies what\u2019s holding it back, and builds a custom homepage redesign using your actual business name and content. You\u2019ll receive a link to a live, working preview.",
  },
  {
    number: "02",
    title: "We Walk You Through It",
    description:
      "On a quick 15-minute call, we\u2019ll show you the redesign, explain the strategy behind it, and answer any questions. No pressure, no hard sell.",
  },
  {
    number: "03",
    title: "You Approve, We Launch",
    description:
      "If you love what you see, we\u2019ll expand the sample into a complete website \u2014 built, deployed, and managed for you. Your new site can be live in as little as 7 days.",
  },
];

export function HowItWorks() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="bg-brand-cream py-20 lg:py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          How It Works
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="stagger-child relative opacity-0"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Step number */}
              <span className="text-5xl font-bold text-brand-orange/40">
                {step.number}
              </span>
              {/* Accent line */}
              <div className="mt-4 h-0.5 w-10 origin-left bg-brand-orange animate-draw-line" />
              <h3 className="mt-4 text-xl font-semibold text-brand-dark">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-brand-dark/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
