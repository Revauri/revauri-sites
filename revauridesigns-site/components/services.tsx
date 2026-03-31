"use client";

import { PenTool, TabletSmartphone, TrendingUp, Shield } from "lucide-react";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

const services = [
  {
    icon: PenTool,
    title: "Website Redesign",
    description:
      "We rebuild outdated websites into modern, high-converting digital experiences that drive real business results.",
  },
  {
    icon: TabletSmartphone,
    title: "Mobile-First Design",
    description:
      "Designed for mobile from day one — your site will look and perform beautifully on every screen size.",
  },
  {
    icon: TrendingUp,
    title: "SEO Optimization",
    description:
      "Technical SEO built into every page so your business ranks higher and reaches the right audience.",
  },
  {
    icon: Shield,
    title: "Ongoing Support & Hosting",
    description:
      "Fast, secure hosting with continuous maintenance and support to keep everything running smoothly.",
  },
];

export function Services() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-brand-cream py-20">
      <div ref={ref} className="reveal mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-brand-dark">
          Our Services
        </h2>
        <div className="mt-12 flex flex-col">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="stagger-child flex flex-col items-start gap-4 border-b border-brand-light-gray border-l-[3px] border-l-transparent py-8 pl-6 opacity-0 transition-[border-color] duration-300 last:border-b-0 hover:border-l-brand-orange sm:flex-row sm:gap-6"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand-orange/5">
                <service.icon
                  className="h-7 w-7 text-brand-orange"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-dark">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-mid-gray">
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
