"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

const faqs = [
  {
    question: "How long does it take?",
    answer:
      "Launch Package: 10\u201314 business days. Growth Package: 7 business days. Timeline starts when your Project Brief is complete.",
  },
  {
    question: "What if I don\u2019t like the design?",
    answer:
      "Two rounds of revisions are included in every package. We work with you until you\u2019re happy.",
  },
  {
    question: "Do I own the website?",
    answer:
      "Yes. Once your upfront fee is paid, you own the design and content. If you ever cancel the retainer, you can request the full source code.",
  },
  {
    question: "What happens if I cancel the retainer?",
    answer:
      "30-day notice, and we\u2019ll export your full site code. No lock-in, no penalties.",
  },
  {
    question: "Why is a retainer required?",
    answer:
      "The retainer covers your managed hosting, unlimited minor updates, and ongoing support. You\u2019re paying for a living, maintained website \u2014 not a static file that gets handed off and forgotten.",
  },
  {
    question: "What platform do you build on?",
    answer:
      "Every site is built with Next.js and Tailwind CSS, deployed on Vercel \u2014 the same infrastructure used by companies like Nike, Twitch, and The Washington Post. Fast, secure, and scalable.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useScrollReveal<HTMLDivElement>();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-brand-white py-20 lg:py-24">
      <div ref={ref} className="reveal mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-12 divide-y divide-brand-light-gray">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="stagger-child opacity-0" style={{ animationDelay: `${i * 80}ms` }}>
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-base font-semibold text-brand-dark">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-mid-gray transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 leading-relaxed text-brand-dark/60">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
