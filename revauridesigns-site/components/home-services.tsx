"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Custom Website Design & Development",
    description:
      "End-to-end custom builds — from wireframe through final deployment. Designed to reflect your brand, optimized for your audience.",
  },
  {
    title: "Website Redesigns",
    description:
      "Modernize an existing site without starting from scratch. We audit, restructure, and rebuild where it matters most.",
  },
  {
    title: "Mobile-First Responsive Design",
    description:
      "Layouts that adapt cleanly across all devices, with mobile treated as a primary context throughout the design process.",
  },
  {
    title: "Technical SEO Foundations",
    description:
      "Structured markup, proper metadata, fast load times, and clean architecture — the groundwork for organic search performance.",
  },
  {
    title: "Managed Hosting & Ongoing Support",
    description:
      "Vercel-hosted, maintained, and monitored. Routine updates, content changes, and a direct contact for when questions come up.",
  },
];

export function HomeServices() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-[#1e293b] py-20">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#2dd4bf]"
            >
              Services
            </p>
            <h2
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="text-2xl font-bold tracking-tight text-[#f8fafc] sm:text-3xl"
            >
              What we do
            </h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-1.5 text-sm font-medium text-[#2dd4bf] transition-opacity hover:opacity-80"
          >
            Full service list <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 flex flex-col">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="stagger-child flex flex-col gap-2 border-b border-[#334155] py-6 opacity-0 last:border-b-0 sm:flex-row sm:gap-8"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontVariantNumeric: "tabular-nums",
                }}
                className="w-8 shrink-0 text-xs font-semibold text-[#64748b]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h3
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="mb-1 text-base font-semibold text-[#f8fafc]"
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#64748b]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
