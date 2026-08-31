"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StaggerChildren } from "@/components/motion-wrappers";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <StaggerChildren className="flex flex-col gap-2">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="hairline-card overflow-hidden">
            <button
              type="button"
              onClick={() => toggle(i)}
              className="accordion-row border-0 bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="flex-1 text-[14px] font-medium text-brand-dark dark:text-brand-cream">
                {faq.question}
              </span>
              <span
                aria-hidden
                className="flex h-6 w-6 items-center justify-center text-lg leading-none text-brand-dark/40 dark:text-brand-cream/40"
              >
                {isOpen ? "×" : "+"}
              </span>
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
                  <p className="px-4 pb-4 text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </StaggerChildren>
  );
}
