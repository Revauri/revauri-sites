import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { FAQContent } from "./faq-content";

export const metadata: Metadata = {
  title: "FAQ — Revauri AI",
  description:
    "Answers about hiring a Revauri AI employee — what it does, whether it is cheaper than hiring someone, how setup works, approvals, the phone, and cancelling.",
  alternates: { canonical: "/faq" },
};

const FAQ_DATA = [
  {
    category: "The hire",
    items: [
      {
        question: "What is Revauri AI?",
        answer:
          "An AI employee for the work you'd otherwise hire someone to do. You name the work, we build the workflow around how your business already runs, and we run it for you every week. A lot cheaper than putting a person on payroll.",
      },
      {
        question: "Is this cheaper than hiring someone?",
        answer:
          "Yes. That is the point. A hire is quoted on the job we take over, on a short call. It costs a lot less than putting another person on payroll. There is no public price list because the number depends on the work.",
      },
      {
        question: "What jobs can it do?",
        answer:
          "Quiet leads, after-hours and missed calls, quotes with no second follow-up, review asks and replies, appointment reminders and no-shows, after-the-job check-ins, inbox and admin busywork, and reactivating past customers. The full list is on the Capabilities page. If your mess is not on it, name it and we will tell you whether we can take it.",
      },
      {
        question: "Does this replace my receptionist?",
        answer:
          "No. It takes the work nobody is getting to — the calls going to voicemail and the follow-ups that never happen. Your people keep doing the parts that need a person.",
      },
    ],
  },
  {
    category: "How it works",
    items: [
      {
        question: "What happens after I book?",
        answer:
          "A short call. We name the two jobs worth handing off first. Then we look at how they work today, quote the work, and build it.",
      },
      {
        question: "Do I have to approve messages?",
        answer:
          "Yes. Nothing goes to a customer unless you say yes. Drafts sit and wait for you.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Usually days once we have agreed the two jobs, not months. We will give you a real timeline on the call, after we have seen the job.",
      },
    ],
  },
  {
    category: "Phone",
    items: [
      {
        question: "Can it answer the phone?",
        answer:
          "Yes, as an add-on. It picks up the missed, after-hours, and overflow calls, takes the name, number, and what they need, and either books what you have pre-approved or gets them a callback. We scope it on the call.",
      },
      {
        question: "Will it quote prices or give medical or legal advice?",
        answer:
          "No. The phone hire never guesses at prices, and it does not give medical, legal, or any other licensed professional advice. Anything sensitive goes straight back to you.",
      },
    ],
  },
  {
    category: "Working together",
    items: [
      {
        question: "What if the job is bigger than two workflows?",
        answer:
          "We quote that before we start. We will not quietly absorb a job that does not fit, and you will not get a surprise invoice.",
      },
      {
        question: "Can I cancel?",
        answer: "Yes. 14-day notice to pause or cancel.",
      },
      {
        question: "Do you redesign websites here?",
        answer:
          "Not on this product. Website work is separate and only worth doing if the site itself is the leak — that is a separate quote at revauri.com.",
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
        subtitle="What an AI employee does, why it costs less than a person, and what stays your call."
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
                  Tell us the job you&apos;d otherwise hire for and we&apos;ll say whether an AI employee can take it.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30"
                >
                  Book a call <ArrowRight className="h-4 w-4" />
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
