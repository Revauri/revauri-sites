"use client";

import { Monitor, Smartphone, Search, LifeBuoy } from "lucide-react";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

const services = [
  {
    icon: Monitor,
    title: "Website Redesign",
    description:
      "Transform your outdated website into a modern, high-performing digital experience that reflects the quality of your business.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description:
      "Every site we build is designed for mobile first, ensuring a flawless experience on any device your customers use.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Built-in search engine optimization so your business gets found by the right customers at the right time.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Support & Hosting",
    description:
      "Reliable hosting and ongoing support to keep your site fast, secure, and always up to date.",
  },
];

export function Services() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-brand-white py-20">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark">
          What We Do
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="stagger-child rounded-2xl border border-brand-light-gray bg-brand-white p-6 opacity-0 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-lg sm:p-8"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <service.icon
                className="h-6 w-6 text-brand-orange"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 text-xl font-semibold text-brand-dark">
                {service.title}
              </h3>
              <p className="mt-2 leading-relaxed text-brand-mid-gray">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
