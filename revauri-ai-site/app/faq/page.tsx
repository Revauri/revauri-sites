import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PAGE_HEROES } from "@/lib/marketing-copy";
import { FAQContent } from "./faq-content";
import { FAQ_DATA } from "./faq-data";

export const metadata: Metadata = {
  title: "FAQ — Revauri AI",
  description:
    "Answers about hiring a Revauri AI employee — what it does, whether it is cheaper than hiring someone, whether it can take a receptionist or admin seat, how setup works, and cancelling.",
  alternates: { canonical: "/faq" },
};

const HERO = PAGE_HEROES.faq;

export default function FAQPage() {
  const allItems = FAQ_DATA.flatMap((cat) => cat.items);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero badge={HERO.badge} title={HERO.title} subtitle={HERO.subtitle} />

      <FAQContent data={FAQ_DATA} />

      <section className="pb-20">
        <div className="section-measure px-6">
          <div className="hairline-card p-5 sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-brand-dark dark:text-brand-cream">
                  Still have questions?
                </h3>
                <p className="mt-2 text-sm text-brand-dark/60 dark:text-brand-cream/60">
                  Name the job you’d otherwise hire for.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <Link
                  href="/book"
                  className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white sm:w-auto"
                >
                  Hire one <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="mailto:joseph@revauri.com"
                  className="inline-flex w-full min-h-11 items-center justify-center rounded-lg border border-black/[0.08] px-6 py-3 text-sm font-medium text-brand-dark sm:w-auto dark:border-white/[0.08] dark:text-brand-cream"
                >
                  joseph@revauri.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
