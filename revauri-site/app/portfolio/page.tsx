import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";
import BlendedDemoFrame from "@/components/blended-demo-frame";

export const metadata: Metadata = {
  title: "Portfolio — Revauri",
  description:
    "See the websites we've built for small businesses across the US. Custom designs that drive real results.",
};

const PROJECTS = [
  {
    name: "Summit Roofing",
    industry: "Home Services",
    description:
      "A modern, conversion-focused site that helped Summit triple their online leads within the first month.",
  },
  {
    name: "Lumina Design Studio",
    industry: "Creative Agency",
    description:
      "A portfolio site that reflects the studio's premium brand and attracts higher-value clients.",
  },
  {
    name: "GreenLeaf Supplements",
    industry: "E-Commerce",
    description:
      "A clean product-focused site built for launch day — mobile-perfect with optimized checkout flow.",
  },
  {
    name: "Bright Path Tutoring",
    industry: "Education",
    description:
      "A warm, approachable site that makes booking sessions easy and builds trust with parents.",
  },
  {
    name: "ClearView Financial",
    industry: "Financial Services",
    description:
      "A professional site redesign that cut bounce rate by 60% and drove measurable conversion growth.",
  },
  {
    name: "DR Plumbing",
    industry: "Contractors",
    description:
      "A fast, mobile-first site that ranks well locally and turns search traffic into booked jobs.",
  },
];

export default function PortfolioPage() {
  return (
    <div>
      <PageHero
        badge="PORTFOLIO"
        title={
          <>
            Our <GradientText>Work</GradientText>
          </>
        }
        subtitle="Custom websites built for real businesses. Every project is designed to drive growth, not just look good."
      />

      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <BlendedDemoFrame key={project.name}>
              <div className="group overflow-hidden rounded-2xl border border-brand-light-gray/60 bg-brand-white dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] transition-all duration-300 hover:-translate-y-1">
                {/* Placeholder image area */}
                <div className="relative aspect-[16/9] bg-brand-light-gray/40 dark:bg-brand-mid-gray/10">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                    {/* Mini wireframe placeholder */}
                    <div className="w-full max-w-[200px] space-y-2">
                      <div className="h-2 w-3/4 rounded bg-brand-mid-gray/20" />
                      <div className="h-2 w-full rounded bg-brand-mid-gray/15" />
                      <div className="h-2 w-5/6 rounded bg-brand-mid-gray/15" />
                      <div className="mt-3 flex gap-2">
                        <div className="h-6 w-16 rounded bg-brand-orange/20" />
                        <div className="h-6 w-14 rounded bg-brand-mid-gray/15" />
                      </div>
                    </div>
                  </div>
                  {/* Industry tag */}
                  <span className="absolute left-4 top-4 rounded-full bg-brand-white/90 px-3 py-1 text-xs font-medium text-brand-dark/70 shadow-sm dark:bg-brand-dark/90 dark:text-brand-cream/70">
                    {project.industry}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange transition-colors group-hover:text-brand-dark dark:group-hover:text-brand-cream">
                    View Project
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </BlendedDemoFrame>
          ))}
        </StaggerChildren>
      </div>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                worth sharing
              </span>
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <p className="mt-4 text-lg text-brand-dark/60 dark:text-brand-cream/60">
              Book a free call and see a custom redesign of your site — before
              you spend a dime.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.16}>
            <Link
              href="/book"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 animate-pulse-glow"
            >
              Book a Free Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
