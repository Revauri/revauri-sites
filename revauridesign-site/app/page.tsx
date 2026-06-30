import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Monitor, Smartphone, Search, LifeBuoy } from "lucide-react";
import { HomeRevealSection } from "@/components/home-reveal-section";

export const metadata: Metadata = {
  title: "Revauri Design — Craft Websites for Small Business",
  description:
    "A small web design studio that sweats the details. We build fast, handcrafted websites for US small and medium businesses — on Next.js, Tailwind, and Vercel.",
  alternates: { canonical: "https://revauridesign.com" },
};

const services = [
  {
    icon: Monitor,
    title: "Custom Design & Development",
    blurb: "Hand-built, not templated. Sites that fit your business and nobody else's.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First & Responsive",
    blurb: "Designed for how people actually browse — your site looks right on every screen.",
  },
  {
    icon: Search,
    title: "Technical SEO Foundations",
    blurb: "Built-in structure that search engines can read and reward.",
  },
  {
    icon: LifeBuoy,
    title: "Hosting & Ongoing Support",
    blurb: "Managed on Vercel with updates, fixes, and support included.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="overflow-hidden bg-brand-cream px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_440px]">
            <div>
              <p
                className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange opacity-0 animate-fade-in"
                style={{ animationDelay: "0ms" }}
              >
                Web Design Studio
              </p>
              <h1
                className="font-serif text-5xl font-semibold leading-[1.08] tracking-tight text-brand-dark opacity-0 animate-fade-in-up sm:text-6xl lg:text-[4.25rem]"
                style={{ animationDelay: "80ms" }}
              >
                Good design is just a website that actually works for you.
              </h1>
              <p
                className="mt-7 max-w-lg text-lg leading-relaxed text-brand-dark/60 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                We&apos;re a small studio that builds handcrafted websites for US
                small and medium businesses. Fast, mobile-first, technically
                solid — and styled to fit your business, not a template.
              </p>
              <div
                className="mt-10 flex flex-wrap items-center gap-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "320ms" }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-orange/90 hover:shadow-lg"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="text-sm font-medium text-brand-dark/60 underline underline-offset-4 transition-colors duration-200 hover:text-brand-orange"
                >
                  See what we do
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div
              className="relative overflow-hidden rounded-2xl opacity-0 animate-scale-in"
              style={{ animationDelay: "400ms" }}
            >
              <Image
                src="/generated/hero.webp"
                alt="Warm, sunlit minimalist studio workspace"
                width={880}
                height={495}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services teaser ── */}
      <HomeRevealSection id="services-teaser">
        <div className="border-y border-brand-light-gray bg-brand-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-2 flex items-center gap-3">
              <div className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                What we make
              </p>
            </div>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-dark sm:text-4xl">
              Every project, built from scratch.
            </h2>
            <p className="mt-4 max-w-xl text-brand-dark/60">
              No page builders, no recycled templates. Each site is written in clean
              code and designed around your specific business.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  className="stagger-child rounded-2xl border border-brand-light-gray p-6 opacity-0 transition-[border-color,box-shadow] duration-300 hover:border-brand-orange/30 hover:shadow-md sm:p-8"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <s.icon className="h-5 w-5 text-brand-orange" strokeWidth={1.5} />
                  <h3 className="mt-4 text-base font-semibold text-brand-dark">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-mid-gray">
                    {s.blurb}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange hover:underline"
              >
                Full services overview
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </HomeRevealSection>

      {/* ── Philosophy ── */}
      <HomeRevealSection id="philosophy">
        <div className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_360px] lg:items-center">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <div className="h-px w-8 bg-brand-orange" aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                    How we approach it
                  </p>
                </div>
                <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-dark sm:text-4xl">
                  We sweat the details so your visitors don&apos;t have to think.
                </h2>
                <div className="mt-6 space-y-5 text-brand-dark/60">
                  <p className="leading-relaxed">
                    A website should feel effortless to the people using it. That
                    effortlessness comes from a lot of careful work underneath —
                    clean hierarchy, thoughtful spacing, load times that don&apos;t try
                    anyone&apos;s patience.
                  </p>
                  <p className="leading-relaxed">
                    We build on Next.js, Tailwind CSS, and Vercel — the same stack
                    behind some of the web&apos;s fastest sites — and we don&apos;t cut
                    corners on the technical foundation. What you get is a site that
                    holds up over time.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/generated/texture.webp"
                  alt="Close-up of warm natural materials — the kind of detail we bring to every project"
                  width={720}
                  height={480}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </HomeRevealSection>

      {/* ── Who we work with ── */}
      <HomeRevealSection id="who">
        <div className="bg-[#F5F2EC] px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-2 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                Who we work with
              </p>
              <div className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            </div>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-dark sm:text-4xl">
              Small and medium businesses across the US.
            </h2>
            <p className="mt-6 leading-relaxed text-brand-dark/60">
              We work remotely with businesses of all kinds — service businesses,
              professional practices, local retailers, consultants, and more — that
              want a website worth pointing people to. If your current site
              embarrasses you a little, or you don&apos;t have one yet, that&apos;s the right
              starting point.
            </p>
          </div>
        </div>
      </HomeRevealSection>

      {/* ── Contact CTA ── */}
      <HomeRevealSection id="cta">
        <div className="px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-semibold text-brand-dark sm:text-4xl">
              Ready to build something you&apos;re proud of?
            </h2>
            <p className="mt-5 text-brand-dark/60">
              Tell us about your business and what you need. We typically reply
              within a couple of business days.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-8 py-4 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-orange/90 hover:shadow-lg"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </HomeRevealSection>
    </>
  );
}
