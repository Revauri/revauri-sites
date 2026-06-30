"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { ArrowRight } from "lucide-react";

const steps = [
  { label: "Discovery", body: "We get to know your business, goals, and audience." },
  { label: "Design", body: "Wireframes and visuals crafted to your brand." },
  { label: "Build", body: "Engineered on a modern, scalable stack." },
  { label: "Launch", body: "Deployed and verified across devices and browsers." },
];

export function HomeProcess() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-[#0f172a] py-20">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#2dd4bf]"
            >
              How we work
            </p>
            <h2
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="text-2xl font-bold tracking-tight text-[#f8fafc] sm:text-3xl"
            >
              Our process
            </h2>
          </div>
          <Link
            href="/process"
            className="flex items-center gap-1.5 text-sm font-medium text-[#2dd4bf] transition-opacity hover:opacity-80"
          >
            Full process details <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="stagger-child rounded-sm border border-[#334155] bg-[#1e293b] p-6 opacity-0"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontVariantNumeric: "tabular-nums",
                }}
                className="mb-3 block text-xs font-semibold text-[#2dd4bf]"
              >
                Step {i + 1}
              </span>
              <h3
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                className="mb-2 text-base font-semibold text-[#f8fafc]"
              >
                {step.label}
              </h3>
              <p className="text-sm leading-relaxed text-[#64748b]">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
