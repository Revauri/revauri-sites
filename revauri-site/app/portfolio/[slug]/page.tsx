import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Clock, Target, Check } from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";
import BlendedDemoFrame from "@/components/blended-demo-frame";
import { getAllProjects, getProjectBySlug } from "@/lib/portfolio-data";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Portfolio — Revauri" };
  return {
    title: `${project.name} — Revauri Portfolio`,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — Revauri Portfolio`,
      description: project.tagline,
      type: "article",
    },
  };
}

function DetailHeroPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
      <div className="w-full max-w-[320px] space-y-3">
        <div className="h-3 w-3/4 rounded bg-brand-mid-gray/20" />
        <div className="h-3 w-full rounded bg-brand-mid-gray/15" />
        <div className="h-3 w-5/6 rounded bg-brand-mid-gray/15" />
        <div className="mt-4 flex gap-2">
          <div className="h-8 w-24 rounded bg-brand-orange/20" />
          <div className="h-8 w-20 rounded bg-brand-mid-gray/15" />
        </div>
      </div>
    </div>
  );
}

function TestimonialAvatarMonogram({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-brand-orange">
      {initials}
    </span>
  );
}

export default async function PortfolioDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div>
      {/* Section 1 — Back-to-portfolio strip */}
      <div className="bg-brand-orange/5 pt-6 dark:bg-brand-orange/[0.03]">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark/60 transition-colors hover:text-brand-orange dark:text-brand-cream/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to portfolio
          </Link>
        </div>
      </div>

      {/* Section 2 — PageHero with custom children slot */}
      <PageHero
        badge={project.industry.toUpperCase()}
        title={project.name}
        subtitle={project.tagline}
      >
        <div className="flex items-center gap-3 pt-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-brand-mid-gray">
            <Clock className="h-3 w-3" />
            {project.status}
          </span>
        </div>
      </PageHero>

      {/* Section 3 — Hero screenshot + live site affordance */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInWhenVisible>
            <BlendedDemoFrame>
              <div
                className="relative overflow-hidden rounded-[1.35rem] bg-brand-light-gray/40 dark:bg-brand-mid-gray/10"
                style={
                  project.hasRealImages
                    ? { aspectRatio: `${project.heroImage.width} / ${project.heroImage.height}` }
                    : { aspectRatio: "16 / 9" }
                }
              >
                {project.hasRealImages ? (
                  <Image
                    src={project.heroImage.src}
                    alt={project.heroImage.alt}
                    width={project.heroImage.width}
                    height={project.heroImage.height}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 960px, 100vw"
                    priority
                  />
                ) : (
                  <DetailHeroPlaceholder />
                )}
              </div>
            </BlendedDemoFrame>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.12}>
            <div className="mt-8 flex justify-center">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-orange/25 px-6 py-3 text-sm font-semibold text-brand-orange transition-colors hover:bg-brand-orange/5"
                >
                  View live site
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-mid-gray/40 bg-brand-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-brand-mid-gray dark:bg-brand-dark/60">
                  <Clock className="h-3.5 w-3.5" />
                  Launching soon
                </span>
              )}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Section 4 — "The project" narrative */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              The <GradientText>project</GradientText>
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <p className="mt-6 text-lg leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              {project.challenge}
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Section 5 — "The approach" — 3-column card grid */}
      <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeInWhenVisible>
            <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              The <GradientText>approach</GradientText>
            </h2>
          </FadeInWhenVisible>
          <StaggerChildren className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.approach.map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-brand-light-gray/60 bg-brand-white p-6 shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
              >
                <div className="mb-4 inline-flex rounded-xl bg-brand-orange/10 p-3 transition-colors duration-200 group-hover:bg-brand-orange">
                  <Target className="h-5 w-5 text-brand-orange transition-colors duration-200 group-hover:text-white" />
                </div>
                <p className="text-sm leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                  {item}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Section 6 — "Founder-built" OR "What we built" */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              {project.tag === "Client Work" ? (
                <>What we <GradientText>built</GradientText></>
              ) : (
                <><GradientText>Founder</GradientText>-built</>
              )}
            </h2>
          </FadeInWhenVisible>
          <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
            {project.built.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-orange/15">
                  <Check className="h-3 w-3 text-brand-orange" />
                </span>
                <span className="text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 7 — Gallery (conditional) */}
      {project.gallery.length > 0 && (
        <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] lg:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <FadeInWhenVisible>
              <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
                Selected <GradientText>screens</GradientText>
              </h2>
            </FadeInWhenVisible>
            <div className="mt-12 space-y-10">
              {project.gallery.map((image, i) => (
                <FadeInWhenVisible key={i} delay={i * 0.05}>
                  <BlendedDemoFrame>
                    <div
                      className="relative overflow-hidden rounded-[1.35rem] bg-brand-light-gray/40 dark:bg-brand-mid-gray/10"
                      style={
                        project.hasRealImages
                          ? { aspectRatio: `${image.width} / ${image.height}` }
                          : { aspectRatio: "16 / 10" }
                      }
                    >
                      {project.hasRealImages ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          className="h-full w-full object-cover"
                          sizes="(min-width: 1024px) 960px, 100vw"
                        />
                      ) : (
                        <DetailHeroPlaceholder />
                      )}
                    </div>
                  </BlendedDemoFrame>
                  {image.caption && (
                    <p className="mt-3 text-center text-sm text-brand-dark/60 dark:text-brand-cream/60">
                      {image.caption}
                    </p>
                  )}
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 8 — Testimonial (conditional) */}
      {project.testimonial && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-2xl px-6">
            <FadeInWhenVisible>
              <figure className="rounded-2xl border border-brand-light-gray/60 border-l-2 border-l-brand-orange/30 bg-brand-white p-8 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:border-l-brand-orange/30 dark:bg-[#1a1a19]">
                <blockquote className="text-lg leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                  <span className="text-brand-orange">&ldquo;</span>
                  {project.testimonial.quote}
                  <span className="text-brand-orange">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-light-gray/40 pt-5 dark:border-brand-mid-gray/20">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full bg-brand-orange/15">
                    {project.testimonial.avatar ? (
                      <Image
                        src={project.testimonial.avatar}
                        alt={project.testimonial.author}
                        width={88}
                        height={88}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <TestimonialAvatarMonogram name={project.testimonial.author} />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                      {project.testimonial.author}
                    </div>
                    <div className="text-xs text-brand-mid-gray">
                      {project.testimonial.title}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </FadeInWhenVisible>
          </div>
        </section>
      )}

      {/* Section 9 — Closing CTA */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              Want something <GradientText>like this?</GradientText>
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <p className="mt-4 text-lg text-brand-dark/60 dark:text-brand-cream/60">
              Book a free call and I&apos;ll show you a custom redesign of your site before you spend a dime.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.16}>
            <Link
              href="/book"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange animate-pulse-glow"
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
