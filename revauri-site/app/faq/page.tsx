import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { FadeInWhenVisible } from "@/components/motion-wrappers";
import { FAQAccordion } from "./faq-accordion";

export const metadata: Metadata = {
  title: "FAQ — Revauri",
  description:
    "Answers to common questions about Revauri's web design services — timelines, pricing, process, technology, and more.",
};

const FAQ_DATA = [
  {
    category: "Process",
    items: [
      {
        question: "How long does it take?",
        answer:
          "Launch Package: 10–14 business days. Growth Package: 7 business days. Timeline starts when your Project Brief is complete.",
      },
      {
        question: "What's included in the free redesign sample?",
        answer:
          "We build a complete homepage mockup using your real business info — your name, your colors, your content. It's a live, working preview you can click through on any device. No stock templates.",
      },
      {
        question: "What if I don't like the design?",
        answer:
          "Two rounds of revisions are included in every package. We work with you until you're happy.",
      },
    ],
  },
  {
    category: "Ownership & Billing",
    items: [
      {
        question: "Do I own the website?",
        answer:
          "Yes. Once your upfront fee is paid, you own the design and content. If you ever cancel the retainer, you can request the full source code.",
      },
      {
        question: "What happens if I cancel the retainer?",
        answer:
          "30-day notice, and we'll export your full site code. No lock-in, no penalties.",
      },
      {
        question: "Why is a retainer required?",
        answer:
          "The retainer covers your managed hosting, unlimited minor updates, and ongoing support. You're paying for a living, maintained website — not a static file that gets handed off and forgotten.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        question: "Can I keep my current domain?",
        answer:
          "Absolutely. We handle the DNS transfer and make sure everything points to your new site with zero downtime.",
      },
      {
        question: "What platform do you build on?",
        answer:
          "Every site is built with Next.js and Tailwind CSS, deployed on Vercel — the same infrastructure used by companies like Nike, Twitch, and The Washington Post. Fast, secure, and scalable.",
      },
      {
        question: "Will my site be fast?",
        answer:
          "Yes. We optimize for Core Web Vitals and target 90+ Lighthouse scores. Our sites are built with server-side rendering, image optimization, and edge caching by default.",
      },
      {
        question: "Do you offer SEO services?",
        answer:
          "The Growth Package includes monthly SEO optimization. Both packages include technical SEO fundamentals — semantic HTML, meta tags, sitemaps, structured data, and fast load times.",
      },
    ],
  },
];

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

      <PageHero
        badge="FAQ"
        title={
          <>
            Frequently Asked <GradientText>Questions</GradientText>
          </>
        }
        subtitle="Everything you need to know about working with Revauri."
      />

      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
        {FAQ_DATA.map((category) => (
          <div key={category.category} className="mb-12 last:mb-0">
            <FadeInWhenVisible>
              <h2 className="mb-6 text-lg font-semibold text-brand-orange">
                {category.category}
              </h2>
            </FadeInWhenVisible>
            <FAQAccordion items={category.items} />
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              Ready to get started?
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <p className="mt-4 text-lg text-brand-dark/60 dark:text-brand-cream/60">
              See a free custom redesign of your site. No commitment, no
              credit card.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.16}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact#book"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 animate-pulse-glow"
              >
                Book a Free Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-brand-orange/30 px-6 py-3 text-sm font-medium text-brand-orange transition-all duration-200 hover:bg-brand-orange/5"
              >
                View Pricing
              </Link>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.24}>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-brand-mid-gray">
              {["Free sample redesign", "No obligation", "Live in 7 days"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand-orange" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
