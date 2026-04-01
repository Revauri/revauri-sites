"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeInWhenVisible, StaggerChildren } from "./motion-wrappers";

const faqs = [
  {
    question: "How long does it take?",
    answer:
      "Launch Package: 10\u201314 business days. Growth Package: 7 business days. Timeline starts when your Project Brief is complete.",
  },
  {
    question: "What\u2019s included in the free redesign sample?",
    answer:
      "We build a complete homepage mockup using your real business info \u2014 your name, your colors, your content. It\u2019s a live, working preview you can click through on any device. No stock templates.",
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
    question: "Can I keep my current domain?",
    answer:
      "Absolutely. We handle the DNS transfer and make sure everything points to your new site with zero downtime.",
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

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-brand-white py-20 dark:bg-brand-dark lg:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeInWhenVisible>
          <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </FadeInWhenVisible>

        <StaggerChildren className="mt-12 divide-y divide-brand-light-gray dark:divide-brand-mid-gray/20">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`border-l-2 pl-4 transition-colors duration-200 ${
                  isOpen
                    ? "border-l-brand-orange/50"
                    : "border-l-transparent hover:border-l-brand-orange/30"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="-mx-2 flex w-[calc(100%+1rem)] items-center justify-between gap-4 rounded-lg px-2 py-5 text-left transition-colors hover:bg-brand-orange/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-base font-semibold text-brand-dark dark:text-brand-cream">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-mid-gray transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`faq-${i}`}
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
