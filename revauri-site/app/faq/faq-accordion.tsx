"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
    <StaggerChildren className="divide-y divide-brand-light-gray dark:divide-brand-mid-gray/20">
      {items.map((faq, i) => {
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
  );
}
