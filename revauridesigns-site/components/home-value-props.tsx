"use client";

import { Zap, Smartphone, Code2, HeadphonesIcon } from "lucide-react";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

const props = [
  {
    icon: Zap,
    label: "Performance-first",
    body: "Sites that score well on Core Web Vitals out of the box — fast load times, no bloat, optimized assets.",
  },
  {
    icon: Smartphone,
    label: "Mobile-ready",
    body: "Every layout is designed mobile-first, then refined up. Works flawlessly on every screen from day one.",
  },
  {
    icon: Code2,
    label: "Modern stack",
    body: "Built on Next.js and Tailwind CSS, deployed to Vercel — the same infrastructure tier-one products rely on.",
  },
  {
    icon: HeadphonesIcon,
    label: "Ongoing support",
    body: "Managed hosting, routine updates, and a direct line for questions — we stay in your corner after launch.",
  },
];

export function HomeValueProps() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="border-y border-[#334155] bg-[#0f172a] py-20">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <p
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="mb-10 text-xs font-semibold uppercase tracking-widest text-[#2dd4bf]"
        >
          What we deliver
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {props.map((item, i) => (
            <div
              key={item.label}
              className="stagger-child opacity-0"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                style={{ borderLeft: "2px solid #2dd4bf" }}
                className="pl-4"
              >
                <item.icon
                  className="mb-3 h-5 w-5 text-[#2dd4bf]"
                  strokeWidth={1.5}
                />
                <h3
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="mb-2 text-base font-semibold text-[#f8fafc]"
                >
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed text-[#64748b]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
