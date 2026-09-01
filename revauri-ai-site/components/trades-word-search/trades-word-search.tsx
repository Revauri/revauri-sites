"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FadeInWhenVisible } from "../motion-wrappers";
import {
  TRADE_WORDS,
  WORD_PLACEMENTS,
  WORD_SEARCH_COLS,
  WORD_SEARCH_COPY,
  WORD_SEARCH_GRID,
  cellsForPlacement,
} from "./script";

export function TradesWordSearch() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % TRADE_WORDS.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const activeCells = useMemo(() => {
    const keys = new Set<string>();
    const placements = reduced
      ? WORD_PLACEMENTS
      : [WORD_PLACEMENTS[index]];
    for (const placement of placements) {
      for (const key of cellsForPlacement(placement)) keys.add(key);
    }
    return keys;
  }, [index, reduced]);

  return (
    <section className="bg-brand-cream py-16 dark:bg-brand-dark md:py-24">
      <div className="section-measure px-6">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="section-h2 text-[28px] text-brand-dark dark:text-brand-cream min-[767px]:text-[32px]">
              {WORD_SEARCH_COPY.h3}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              {WORD_SEARCH_COPY.body}
            </p>
          </div>
        </FadeInWhenVisible>

        <p className="sr-only">
          Trades we hire for: {TRADE_WORDS.join(", ")}.
        </p>

        <div className="mt-12 max-w-full overflow-x-hidden">
          <div
            aria-hidden="true"
            className="mx-auto grid w-full justify-center gap-x-1 gap-y-1.5 min-[767px]:gap-x-3.5 min-[767px]:gap-y-3.5"
            style={{
              gridTemplateColumns: `repeat(${WORD_SEARCH_COLS}, minmax(0, 1fr))`,
            }}
          >
            {WORD_SEARCH_GRID.flatMap((row, r) =>
              row.split("").map((letter, c) => {
                const on = activeCells.has(`${r}:${c}`);
                return (
                  <span
                    key={`${r}-${c}`}
                    className={`word-search-cell ${on ? "is-on" : ""}`}
                  >
                    {letter}
                  </span>
                );
              }),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
