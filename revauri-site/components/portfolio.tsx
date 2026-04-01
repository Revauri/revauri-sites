"use client";

import { Layers } from "lucide-react";
import { FadeInWhenVisible, StaggerChildren } from "./motion-wrappers";

export function Portfolio() {
  return (
    <section className="bg-brand-white py-20 dark:bg-brand-dark lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible>
          <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
            Our{" "}
            <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
        </FadeInWhenVisible>

        <StaggerChildren className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="group relative flex flex-col items-center justify-center rounded-2xl border border-brand-light-gray/60 bg-brand-cream/50 px-8 py-16 shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-orange/[0.03] to-transparent" />
              <div className="relative mb-6 rounded-xl bg-brand-orange/10 p-4">
                <Layers className="h-8 w-8 text-brand-orange/40" />
              </div>
              <p className="relative text-center text-sm font-medium text-brand-mid-gray">
                Case study coming soon
              </p>
              <p className="relative mt-1 text-center text-xs text-brand-mid-gray/70">
                Our first client projects are in progress.
              </p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
