import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";
import BlendedDemoFrame from "@/components/blended-demo-frame";
import { getAllProjects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Portfolio — Revauri",
  description:
    "Real work from Revauri — a mix of client projects and products founder-built from scratch.",
};

function GridCardPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
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
  );
}

export default function PortfolioPage() {
  return (
    <div>
      <PageHero
        badge="PORTFOLIO"
        title={
          <>
            Real <GradientText>Work</GradientText>
          </>
        }
        subtitle="A mix of client work and products founder-built from scratch. Every project here was personally designed and built end-to-end."
      />

      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeInWhenVisible>
            <p className="text-base leading-relaxed text-brand-dark/60 dark:text-brand-cream/60 sm:text-lg">
              I build websites for clients, and I also build and run my own products.
              Both are on this page so you can see how I think, what I ship, and what
              the work actually looks like end-to-end.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <StaggerChildren className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {getAllProjects().map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group block focus-visible:outline-none"
                aria-label={`View case study: ${project.name}`}
              >
                <BlendedDemoFrame>
                  <article className="overflow-hidden rounded-2xl border border-brand-light-gray/60 bg-brand-white transition-all duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-brand-orange dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
                    <div className="relative aspect-[16/9] bg-brand-light-gray/40 dark:bg-brand-mid-gray/10">
                      {project.hasRealImages ? (
                        <Image
                          src={project.heroImage.src}
                          alt={project.heroImage.alt}
                          width={project.heroImage.width}
                          height={project.heroImage.height}
                          className="h-full w-full object-cover"
                          sizes="(min-width: 768px) 40vw, 100vw"
                        />
                      ) : (
                        <GridCardPlaceholder />
                      )}
                      <span className="absolute left-4 top-4 rounded-full bg-brand-white/90 px-3 py-1 text-xs font-medium text-brand-dark/70 shadow-sm dark:bg-brand-dark/90 dark:text-brand-cream/70">
                        {project.industry}
                      </span>
                      <span
                        className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                          project.tag === "Client Work"
                            ? "border-brand-orange/30 bg-brand-orange/10 text-brand-orange"
                            : "border-brand-mid-gray/40 bg-brand-white/90 text-brand-mid-gray dark:bg-brand-dark/90"
                        }`}
                      >
                        {project.tag}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                        {project.shortDescription}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange transition-colors group-hover:gap-2">
                        View case study
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </article>
                </BlendedDemoFrame>
              </Link>
            ))}
          </StaggerChildren>
        </div>
      </section>

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
