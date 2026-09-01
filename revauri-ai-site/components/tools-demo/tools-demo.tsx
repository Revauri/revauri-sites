"use client";

import { useState } from "react";
import { FadeInWhenVisible } from "../motion-wrappers";
import {
  PARALLEL_JOBS,
  SCOPED_HIRE,
  TOOLS_INTRO,
  TOOLS_TABS,
  type ToolsTabId,
} from "./script";

function ApproveMock() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-black/[0.06] px-5 py-3 dark:border-white/[0.06]">
        <p className="text-[12px] font-medium text-brand-dark dark:text-brand-cream">
          Draft to send
        </p>
      </div>
      <div className="flex-1 space-y-3 px-5 py-4 text-[13px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
        <p>
          <span className="text-brand-dark/40 dark:text-brand-cream/40">To</span>{" "}
          Elena V.
        </p>
        <p>
          <span className="text-brand-dark/40 dark:text-brand-cream/40">
            Subject
          </span>{" "}
          Following up on Thursday
        </p>
        <p className="pt-2">
          Hi Elena — holding Thursday 9:00 AM as we discussed. Reply if you
          need a different time. We’ll confirm the visit, not a price, on the
          call.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-black/[0.06] px-5 py-3 dark:border-white/[0.06]">
        <button
          type="button"
          aria-disabled="true"
          className="rounded-lg bg-brand-orange px-4 py-2 text-[13px] font-semibold text-white"
        >
          Approve
        </button>
        <button
          type="button"
          aria-disabled="true"
          className="rounded-lg border border-black/[0.1] px-4 py-2 text-[13px] font-medium text-brand-dark/70 dark:border-white/[0.1] dark:text-brand-cream/70"
        >
          Edit
        </button>
        <span className="ml-auto font-mono text-[8px] text-brand-dark/40 dark:text-brand-cream/40">
          Example
        </span>
      </div>
    </div>
  );
}

function ParallelMock() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-black/[0.06] px-5 py-3 dark:border-white/[0.06]">
        <p className="text-[12px] font-medium text-brand-dark dark:text-brand-cream">
          Jobs this week
        </p>
      </div>
      <ul className="flex-1 divide-y divide-black/[0.06] dark:divide-white/[0.06]">
        {PARALLEL_JOBS.map((job) => (
          <li
            key={job.name}
            className="flex items-center justify-between gap-3 px-5 py-4"
          >
            <p className="text-[13px] font-medium text-brand-dark dark:text-brand-cream">
              {job.name}
            </p>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                job.status === "Running"
                  ? "bg-brand-orange/10 text-brand-orange"
                  : job.status === "Completed"
                    ? "bg-black/[0.05] text-brand-dark/55 dark:bg-white/[0.06] dark:text-brand-cream/60"
                    : "border border-black/[0.08] text-brand-dark/60 dark:border-white/[0.1] dark:text-brand-cream/60"
              }`}
            >
              {job.status}
            </span>
          </li>
        ))}
      </ul>
      <p className="px-5 py-3 font-mono text-[8px] text-brand-dark/40 dark:text-brand-cream/40">
        Example
      </p>
    </div>
  );
}

function ScopedMock() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-black/[0.06] px-5 py-3 dark:border-white/[0.06]">
        <p className="text-[12px] font-medium text-brand-dark dark:text-brand-cream">
          {SCOPED_HIRE.title}
        </p>
      </div>
      <dl className="flex-1 divide-y divide-black/[0.06] dark:divide-white/[0.06]">
        {SCOPED_HIRE.rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-1 px-5 py-3 min-[639px]:grid-cols-[160px_1fr]"
          >
            <dt className="text-[12px] text-brand-dark/40 dark:text-brand-cream/40">
              {row.label}
            </dt>
            <dd className="text-[13px] text-brand-dark dark:text-brand-cream">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="px-5 py-3 font-mono text-[8px] text-brand-dark/40 dark:text-brand-cream/40">
        Example — done-for-you, not a builder
      </p>
    </div>
  );
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
            className="mx-auto grid max-w-4xl grid-cols-1 gap-px min-[1000px]:grid-cols-3"
          >
            {TOOLS_TABS.map((tab, index) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tools-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls="tools-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft")
                      return;
                    event.preventDefault();
                    const delta = event.key === "ArrowRight" ? 1 : -1;
                    const next =
                      TOOLS_TABS[
                        (index + delta + TOOLS_TABS.length) % TOOLS_TABS.length
                      ];
                    setActive(next.id);
                    document.getElementById(`tools-tab-${next.id}`)?.focus();
                  }}
                  className={`min-h-11 border-l-2 px-4 py-3 text-left text-[14px] leading-snug transition-colors ${
                    selected
                      ? "border-brand-orange text-brand-dark dark:text-brand-cream"
                      : "border-transparent text-brand-dark/40 hover:text-brand-dark/70 dark:text-brand-cream/40 dark:hover:text-brand-cream/70"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            id="tools-panel"
            role="tabpanel"
            aria-labelledby={`tools-tab-${active}`}
            className="product-frame relative z-10 mt-10 min-h-[340px] overflow-hidden min-[767px]:mt-14 min-[767px]:min-h-[400px]"
          >
            {active === "approve" && <ApproveMock />}
            {active === "parallel" && <ParallelMock />}
            {active === "scoped" && <ScopedMock />}
          </div>
        </div>
        <div className="h-10 min-[767px]:h-16" />
      </div>
    </section>
  );
}
