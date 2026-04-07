import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { FAQContent } from "./faq-content";

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
          "Launch Package: approximately 6 weeks. Growth Package: priority delivery in 4 weeks. Timeline starts when your Project Brief is complete.",
      },
      {
        question: "What's included in the free redesign preview?",
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
          "The retainer is your Website Care Plan — it covers hosting, SSL, unlimited minor updates, and ongoing support. You're paying for a living, maintained website — not a static file that gets handed off and forgotten.",
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
  {
    category: "Getting Started",
    items: [
      {
        question: "How do I get started?",
        answer:
          "It's simple — book a free 15-minute strategy call or send us a message through the contact page. We'll learn about your business, review your current site, and build you a free preview redesign with no obligation.",
      },
      {
        question: "Do I need to prepare anything before our call?",
        answer:
          "Not at all. Just have your current website URL handy if you have one. We'll handle the rest — reviewing your site, identifying opportunities, and building your free preview.",
      },
      {
        question: "What if I don't have a website yet?",
        answer:
          "No problem. We build sites from scratch too. We'll work with you to define your goals, target audience, and brand identity, then build something custom that fits.",
      },
    ],
  },
  {
    category: "Support & Maintenance",
    items: [
      {
        question: "What kind of updates are included in the care plan?",
        answer:
          "Unlimited minor updates — text changes, image swaps, adding new sections, updating business hours, adding team members, etc. Anything that takes under 30 minutes is included at no extra cost.",
      },
      {
        question: "How do I request changes to my site?",
        answer:
          "Just send an email to joseph@revauri.com with what you need. Most updates go live within 24 hours. For larger changes, we'll scope it and give you a timeline.",
      },
      {
        question: "What happens if my site goes down?",
        answer:
          "Our sites are deployed on Vercel's global edge network with 99.99% uptime. In the rare event of an issue, we monitor proactively and resolve incidents quickly. Your care plan includes priority support.",
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

      <FAQContent data={FAQ_DATA} />

      {/* Still have questions? */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl border border-brand-light-gray/60 bg-brand-cream p-8 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-brand-dark dark:text-brand-cream">
                  Still have questions?
                </h3>
                <p className="mt-2 text-sm text-brand-dark/60 dark:text-brand-cream/60">
                  We're here to help. Reach out and we'll get back to you within a few hours.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30"
                >
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="mailto:joseph@revauri.com"
                  className="inline-flex items-center justify-center rounded-lg border border-brand-orange/30 px-6 py-3 text-sm font-medium text-brand-orange transition-all duration-200 hover:bg-brand-orange/5"
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
