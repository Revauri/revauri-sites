"use client";

import { useState } from "react";
import { FadeInWhenVisible } from "../motion-wrappers";
import { ApproveMock } from "./approve-mock";
import { ParallelMock } from "./parallel-mock";
import { ScopedMock } from "./scoped-mock";
import { TOOLS_INTRO, TOOLS_TABS, type ToolsTabId } from "./script";

function ToolsPanel({ active }: { active: ToolsTabId }) {
  switch (active) {
    case "approve":
      return <ApproveMock />;
    case "parallel":
      return <ParallelMock />;
    case "scoped":
      return <ScopedMock />;
    default: {
      const _exhaustive: never = active;
      return _exhaustive;
    }
  }
}

export function ToolsDemo() {
  const [active, setActive] = useState<ToolsTabId>("approve");

  return (
    <section className="bg-brand-cream py-16 dark:bg-brand-dark md:py-24">
      <div className="section-measure px-6">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="section-h2 text-brand-dark dark:text-brand-cream">
              {TOOLS_INTRO.h2Line1}
              <br />
              <span className="section-h2-muted">{TOOLS_INTRO.h2Line2}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              {TOOLS_INTRO.body}
            </p>
          </div>
        </FadeInWhenVisible>
      </div>

      <div className="dotted-grid relative mt-12 overflow-hidden pt-10 md:mt-16 md:pt-14">
        <div className="section-measure px-6">
          <div
            role="tablist"
            aria-label="Hire tools"
            className="mx-auto grid max-w-4xl grid-cols-1 min-[1000px]:grid-cols-3"
          >
            {TOOLS_TABS.map((tab, index) => {
              const selected = tab.id === active;
              return (
                <div
                  key={tab.id}
                  className={
                    index > 0
                      ? "min-[1000px]:border-l min-[1000px]:border-black/10 dark:min-[1000px]:border-white/10"
                      : undefined
                  }
                >
                  <button
                    type="button"
                    role="tab"
                    id={`tools-tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls="tools-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    onKeyDown={(event) => {
                      if (
                        event.key !== "ArrowRight" &&
                        event.key !== "ArrowLeft"
                      )
                        return;
                      event.preventDefault();
                      const delta = event.key === "ArrowRight" ? 1 : -1;
                      const next =
                        TOOLS_TABS[
                          (index + delta + TOOLS_TABS.length) %
                            TOOLS_TABS.length
                        ];
                      setActive(next.id);
                      document
                        .getElementById(`tools-tab-${next.id}`)
                        ?.focus();
                    }}
                    className={`min-h-11 w-full border-l-2 px-4 py-3 text-left text-[14px] leading-snug transition-colors ${
                      selected
                        ? "border-brand-orange text-brand-dark dark:text-brand-cream"
                        : "border-transparent text-brand-dark/40 hover:text-brand-dark/70 dark:text-brand-cream/40 dark:hover:text-brand-cream/70"
                    }`}
                  >
                    {tab.label}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 mx-auto mt-10 w-full min-[767px]:mt-14 min-[1000px]:w-[800px]">
            <div className="relative isolate overflow-hidden rounded-[20px] border border-brand-cream bg-brand-cream p-3 dark:border-brand-dark dark:bg-brand-dark">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[20px] bg-black/[0.06] dark:bg-white/[0.08]"
              />
              <div
                id="tools-panel"
                role="tabpanel"
                aria-labelledby={`tools-tab-${active}`}
                className="relative min-h-[400px] overflow-hidden rounded-[16px] bg-[#F1EFE7] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)] dark:bg-[#1C1B19] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] min-[767px]:min-h-[440px]"
              >
                <ToolsPanel active={active} />
              </div>
            </div>
          </div>
        </div>
        <div className="h-10 min-[767px]:h-16" />
      </div>
    </section>
  );
}
