import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Code, Users, Palette, BarChart3 } from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";
import BlendedDemoFrame from "@/components/blended-demo-frame";

export const metadata: Metadata = {
  title: "About — Revauri",
  description:
    "Revauri was founded by Joseph Silvagnoli to help small businesses get websites that actually drive growth. Learn about our approach, values, and story.",
};

const VALUES = [
  {
    icon: Zap,
    title: "Speed Without Shortcuts",
    description:
      "We deliver fast because we've built the right systems — not because we cut corners. Every site is hand-crafted, not templated.",
  },
  {
    icon: Shield,
    title: "No Surprises",
    description:
      "Transparent pricing. Clear timelines. A free sample before you commit. We never want you guessing what comes next.",
  },
  {
    icon: Code,
    title: "Modern Stack, Real Results",
    description:
      "We build on Next.js, Tailwind, and Vercel — the same tools behind the world's fastest websites.",
  },
  {
    icon: Users,
    title: "Built for Humans",
    description:
      "Clean layouts, clear CTAs, intuitive navigation. Every design decision is made to help your visitors become customers.",
  },
  {
    icon: Palette,
    title: "Design That Fits You",
    description:
      "No cookie-cutter templates. Your site reflects your business personality, your market, and your customers' expectations.",
  },
  {
    icon: BarChart3,
    title: "Conversion-Focused",
    description:
      "A pretty website isn't enough. We optimize for leads, calls, and sales — the metrics that actually grow your business.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        badge="ABOUT"
        title={
          <>
            Built by a founder who <GradientText>gets it</GradientText>
          </>
        }
        subtitle="Great businesses deserve websites that work as hard as they do."
      />

      {/* Founder Story */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
            <FadeInWhenVisible direction="left">
              <BlendedDemoFrame compact className="mx-auto w-fit lg:mx-0">
                <img
                  src="/joseph-headshot.jpg"
                  alt="Joseph Silvagnoli, founder of Revauri"
                  width={224}
                  height={224}
                  className="h-52 w-52 rounded-2xl object-cover object-top sm:h-56 sm:w-56"
                />
              </BlendedDemoFrame>
            </FadeInWhenVisible>

            <div>
              <FadeInWhenVisible>
                <h2 className="text-2xl font-bold text-brand-dark dark:text-brand-cream sm:text-3xl">
                  Hi, I&apos;m Joseph.
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.08}>
                <p className="mt-6 text-lg leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                  I started Revauri because I kept seeing the same thing: great
                  businesses with websites that don&apos;t do them justice. Restaurants
                  with broken mobile menus. Contractors with sites that look like they
                  were built in 2008. Service businesses losing leads because their
                  contact page doesn&apos;t work.
                </p>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.14}>
                <p className="mt-4 text-lg leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                  Your website should work as hard as you do — bringing in leads,
                  building trust, and making it easy for customers to say yes. Every
                  site we build is designed with that goal in mind.
                </p>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeInWhenVisible>
            <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              What we{" "}
              <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                believe in
              </span>
            </h2>
          </FadeInWhenVisible>

          <StaggerChildren className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-brand-light-gray/60 bg-brand-white p-6 shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-brand-orange/10 p-3 transition-colors duration-200 group-hover:bg-brand-orange">
                    <Icon className="h-5 w-5 text-brand-orange transition-colors duration-200 group-hover:text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-brand-dark dark:text-brand-cream">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                    {value.description}
                  </p>
                </div>
              );
            })}
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
              Book a free call and see a custom redesign of your site — before you
              spend a dime.
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
