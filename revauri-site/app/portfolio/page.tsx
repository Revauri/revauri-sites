import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { FadeInWhenVisible } from "@/components/motion-wrappers";
import { PortfolioFilmstrip } from "@/components/portfolio-filmstrip";
import { getAllProjects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Portfolio — Client Websites and Founder-Built Work",
  description:
    "Real work from Revauri — a mix of client projects and products founder-built from scratch.",
  alternates: { canonical: "/portfolio" },
};

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
        subtitle="Founder-built from scratch. Every project here was personally designed and built end-to-end."
      />


      <section className="pt-10 pb-10 lg:pt-14 lg:pb-14">
        <PortfolioFilmstrip projects={getAllProjects()} />
      </section>

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
