import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — Revauri Design",
  description:
    "Common questions about working with Revauri Design — what we do, who we work with, how engagements start, timelines, and the technology we build on.",
  alternates: { canonical: "https://revauridesign.com/faq" },
};

const faqs = [
  {
    q: "What exactly do you do?",
    a: "We design and develop custom websites for small and medium businesses. That includes the visual design, the code, the deployment, and ongoing hosting and support. We work on everything from brand-new sites to full rebuilds of existing ones.",
  },
  {
    q: "Who do you typically work with?",
    a: "Small and medium businesses across the United States — service businesses, professional practices, local retailers, consultants, and similar. If your business has something real to offer and you need a website that communicates that clearly, we're probably a good fit.",
  },
  {
    q: "Do you use templates?",
    a: "No. Every site is designed and built from scratch, specific to your business. We use a consistent technical stack (Next.js, Tailwind CSS, Vercel), but the design and content structure are custom every time.",
  },
  {
    q: "What technology do you build on?",
    a: "Next.js for the framework, Tailwind CSS for styling, and Vercel for hosting and deployment. This combination produces genuinely fast, maintainable sites with good defaults for performance and SEO.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on the scope. A focused single-page or small multi-page site can move quickly; a larger redesign with more pages and content takes longer. We discuss timelines upfront so expectations are clear before anything starts.",
  },
  {
    q: "How do engagements typically start?",
    a: "With an email. Tell us about your business, what you have now (if anything), and what you're trying to achieve. We'll have a conversation, agree on scope, and go from there. No pressure, no commitment until you're ready.",
  },
  {
    q: "Do you guarantee search engine rankings?",
    a: "No. We build sites with solid technical SEO foundations — proper structure, meta tags, sitemaps, structured data — which gives your content the best chance of being indexed and ranked appropriately. But specific ranking outcomes depend on many factors outside any developer's control, including competition, content quality, and domain history.",
  },
  {
    q: "What does ongoing support include?",
    a: "Managed hosting on Vercel, routine maintenance, dependency updates, and the ability to request minor content changes. If something breaks, you have someone to contact. We keep things straightforward — no mystery fees.",
  },
  {
    q: "How do I contact you?",
    a: "Email is the best way. Reach us at david.mercer@revauridesign.com. We typically reply within a couple of business days.",
  },
];

export default function FaqPage() {
  return (
    <>
      {/* Page hero */}
      <section className="border-b border-brand-light-gray bg-brand-cream px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
              FAQ
            </p>
          </div>
          <h1 className="font-serif text-5xl font-semibold leading-[1.1] tracking-tight text-brand-dark sm:text-6xl">
            Common questions.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-brand-dark/60">
            Straight answers about working with us — no fluff.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <dl className="divide-y divide-brand-light-gray">
            {faqs.map(({ q, a }) => (
              <div key={q} className="py-8">
                <dt className="font-serif text-xl font-semibold text-brand-dark">
                  {q}
                </dt>
                <dd className="mt-4 leading-relaxed text-brand-dark/60">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5F2EC] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark">
            Still have questions?
          </h2>
          <p className="mt-5 text-brand-dark/60">
            Just email us. We&apos;re happy to answer anything before you commit to
            anything.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-8 py-4 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-orange/90 hover:shadow-lg"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
