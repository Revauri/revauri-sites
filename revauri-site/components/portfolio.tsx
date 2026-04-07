"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getAllProjects } from "@/lib/portfolio-data";
import BlendedDemoFrame from "./blended-demo-frame";
import { FadeInWhenVisible, StaggerChildren } from "./motion-wrappers";

export function Portfolio() {
  const projects = getAllProjects();

  return (
    <section className="bg-brand-orange/5 py-20 dark:bg-brand-orange/[0.03] lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible>
          <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
            Our{" "}
            <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-brand-dark/60 dark:text-brand-cream/60">
            Real projects. Real results. From fintech SaaS to AI products to premium law firms.
          </p>
        </FadeInWhenVisible>

        <StaggerChildren className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group block focus-visible:outline-none"
              aria-label={`View project: ${project.name}`}
            >
              <BlendedDemoFrame>
                <article className="overflow-hidden rounded-2xl border border-brand-light-gray/60 bg-brand-white transition-all duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-brand-orange dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
                  <div className="relative aspect-[16/9] overflow-hidden bg-brand-light-gray/40 dark:bg-brand-mid-gray/10">
                    <Image
                      src={project.heroImage.src}
                      alt={project.heroImage.alt}
                      width={project.heroImage.width}
                      height={project.heroImage.height}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>

                  <div className="p-5">
                    <span className="mb-2 inline-block rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-orange">
                      {project.industry}
                    </span>
                    <h3 className="text-lg font-bold text-brand-dark dark:text-brand-cream">
                      {project.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                      {project.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange transition-colors group-hover:text-brand-orange/80">
                      View project
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </article>
              </BlendedDemoFrame>
            </Link>
          ))}
        </StaggerChildren>

        <FadeInWhenVisible delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange transition-colors hover:text-brand-orange/80"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
