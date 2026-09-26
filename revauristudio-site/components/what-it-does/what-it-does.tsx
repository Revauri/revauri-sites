"use client";

import { useCallback, useState } from "react";
import { FadeInWhenVisible } from "../motion-wrappers";
import { DetailPanel } from "./detail-panel";
import { FeatureRow } from "./feature-row";
import {
  FEATURE_SECTIONS,
  WHAT_IT_DOES_INTRO,
  type AccordionItem,
} from "./script";

export function WhatItDoes() {
  const [openItem, setOpenItem] = useState<AccordionItem | null>(null);
  const close = useCallback(() => setOpenItem(null), []);

  return (
    <section className="bg-brand-cream py-16 dark:bg-brand-dark md:py-24">
      <div className="section-measure px-6">
        <FadeInWhenVisible>
          <div className="max-w-2xl">
            <p className="section-eyebrow">{WHAT_IT_DOES_INTRO.eyebrow}</p>
            <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
              {WHAT_IT_DOES_INTRO.h2Line1}
              <br />
              <span className="section-h2-muted">
                {WHAT_IT_DOES_INTRO.h2Line2}
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60 md:text-base">
              {WHAT_IT_DOES_INTRO.body}
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="mt-10 flex flex-col gap-12 md:mt-16 md:gap-20 min-[1000px]:mt-24 min-[1000px]:gap-28">
          {FEATURE_SECTIONS.map((section) => (
            <FadeInWhenVisible key={section.id}>
              <FeatureRow
                section={section}
                openCode={openItem?.code ?? null}
                onOpen={setOpenItem}
              />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
      <DetailPanel item={openItem} onClose={close} />
    </section>
  );
}
