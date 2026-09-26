"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, List, Mail } from "lucide-react";
import {
  APPROVE_DRAFTS,
  APPROVE_QUEUE_LABEL,
  APPROVE_TABS,
  APPROVE_WEEK_JOBS,
} from "./script";

const PAGE_COUNT = APPROVE_TABS.length;

function wrapPage(index: number) {
  return (index + PAGE_COUNT) % PAGE_COUNT;
}

export function ApproveMock() {
  const [pageIndex, setPageIndex] = useState(0);
  const activeTab = APPROVE_TABS[pageIndex];
  const isQueue = activeTab.id === "queue";
  const draft = isQueue ? null : APPROVE_DRAFTS[pageIndex];

  function showPage(index: number) {
    setPageIndex(wrapPage(index));
  }

  return (
    <div className="flex h-full min-h-[400px] flex-col min-[767px]:min-h-0">
      <div className="flex flex-1 items-center justify-center px-3 pt-4 pb-2 min-[767px]:px-8">
        <div className="demo-frame w-full max-w-[500px] rounded-[14px] p-[3px]">
          <div
            role="tablist"
            aria-label="Draft types"
            className="flex gap-0.5 overflow-x-auto px-2 pt-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {APPROVE_TABS.map((tab, index) => {
              const selected = index === pageIndex;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => showPage(index)}
                  className={`shrink-0 whitespace-nowrap rounded-[6px] px-2.5 py-1 text-[11px] leading-none font-medium tracking-[-0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange/60 ${
                    selected
                      ? "bg-black/[0.06] text-brand-dark dark:bg-white/[0.09] dark:text-brand-cream"
                      : "text-brand-dark/45 hover:text-brand-dark/70 dark:text-brand-cream/45 dark:hover:text-brand-cream/70"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="demo-card overflow-hidden rounded-[12px]">
            <div className="flex items-center gap-2 border-b border-black/[0.06] px-4 py-2.5 dark:border-white/[0.06]">
              <span
                aria-hidden
                className="flex size-5 items-center justify-center rounded-[5px] bg-brand-orange/12 text-brand-orange dark:bg-brand-orange/18"
              >
                {isQueue ? (
                  <List className="h-3 w-3" strokeWidth={2} />
                ) : (
                  <Mail className="h-3 w-3" strokeWidth={2} />
                )}
              </span>
              <p className="flex-1 text-[12px] font-medium text-brand-dark/85 dark:text-brand-cream/85">
                {isQueue ? "This week’s jobs" : "Draft to send"}
              </p>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => showPage(pageIndex - 1)}
                  className="flex size-6 items-center justify-center rounded-md text-brand-dark/45 transition-colors hover:bg-black/[0.05] hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand-orange/60 dark:text-brand-cream/45 dark:hover:bg-white/[0.06] dark:hover:text-brand-cream"
                >
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => showPage(pageIndex + 1)}
                  className="flex size-6 items-center justify-center rounded-md text-brand-dark/45 transition-colors hover:bg-black/[0.05] hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand-orange/60 dark:text-brand-cream/45 dark:hover:bg-white/[0.06] dark:hover:text-brand-cream"
                >
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            </div>

            {isQueue ? (
              <ul className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                {APPROVE_WEEK_JOBS.map((job, index) => (
                  <li
                    key={job.name}
                    className={`flex items-baseline justify-between gap-3 px-4 py-2.5 ${
                      index === 0
                        ? "bg-black/[0.035] dark:bg-white/[0.045]"
                        : undefined
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-brand-dark/85 dark:text-brand-cream/85">
                        {job.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-brand-dark/40 dark:text-brand-cream/40">
                        {job.state}
                      </p>
                    </div>
                    <span className="shrink-0 text-[8px] font-medium tracking-[0.12em] text-brand-dark/35 uppercase dark:text-brand-cream/35">
                      {job.tag}
                    </span>
                  </li>
                ))}
              </ul>
            ) : draft ? (
              <>
                <dl className="divide-y divide-black/[0.06] text-[12px] dark:divide-white/[0.06]">
                  <div className="grid grid-cols-[64px_1fr] gap-3 px-4 py-2.5">
                    <dt className="text-brand-dark/45 dark:text-brand-cream/45">
                      To
                    </dt>
                    <dd className="min-w-0 text-brand-dark/85 dark:text-brand-cream/85">
                      <span className="font-medium">{draft.to}</span>{" "}
                      <span className="text-brand-dark/45 dark:text-brand-cream/45">
                        {draft.toEmail}
                      </span>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[64px_1fr] gap-3 px-4 py-2.5">
                    <dt className="text-brand-dark/45 dark:text-brand-cream/45">
                      From
                    </dt>
                    <dd className="text-brand-dark/85 dark:text-brand-cream/85">
                      <span className="font-medium">{draft.from}</span>{" "}
                      <span className="text-brand-dark/45 dark:text-brand-cream/45">
                        {draft.fromNote}
                      </span>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[64px_1fr] gap-3 px-4 py-2.5">
                    <dt className="text-brand-dark/45 dark:text-brand-cream/45">
                      Subject
                    </dt>
                    <dd className="font-medium text-brand-dark/85 dark:text-brand-cream/85">
                      {draft.subject}
                    </dd>
                  </div>
                </dl>

                <div className="px-4 pt-3.5 pb-3 text-[12px] leading-relaxed text-brand-dark/65 dark:text-brand-cream/65">
                  <p className="font-medium text-brand-dark/85 dark:text-brand-cream/85">
                    {draft.greeting}
                  </p>
                  <p className="mt-2">{draft.body}</p>
                  {"closing" in draft && draft.closing ? (
                    <p className="mt-2">{draft.closing}</p>
                  ) : null}
                </div>
              </>
            ) : null}

            <div className="flex flex-wrap items-center gap-1.5 border-t border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
              <button
                type="button"
                aria-disabled="true"
                className="h-7 rounded-[7px] bg-brand-orange px-3 text-[11px] font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28),0_1px_2px_0_rgba(194,97,63,0.35)]"
              >
                Approve
              </button>
              <button
                type="button"
                aria-disabled="true"
                className="demo-chip h-7 rounded-[7px] px-3 text-[11px] font-medium text-brand-dark/70 dark:text-brand-cream/70"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-3">
        <div className="demo-chip inline-flex items-center gap-2 rounded-[8px] py-1 pr-1.5 pl-2">
          <span
            aria-hidden
            className="flex size-4 items-center justify-center rounded-[4px] bg-brand-orange/12 text-brand-orange dark:bg-brand-orange/18"
          >
            <Mail className="h-2.5 w-2.5" strokeWidth={2.25} />
          </span>
          <span className="text-[11px] font-medium text-brand-dark/75 dark:text-brand-cream/75">
            {APPROVE_QUEUE_LABEL}
          </span>
          <div className="ml-1 flex items-center gap-0.5 text-[11px] tabular-nums text-brand-dark/50 dark:text-brand-cream/50">
            <button
              type="button"
              aria-label="Previous in queue"
              onClick={() => showPage(pageIndex - 1)}
              className="flex size-5 items-center justify-center rounded text-brand-dark/45 transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand-orange/60 dark:text-brand-cream/45 dark:hover:text-brand-cream"
            >
              <ChevronLeft className="h-3 w-3" aria-hidden />
            </button>
            <span>
              {pageIndex + 1}/{PAGE_COUNT}
            </span>
            <button
              type="button"
              aria-label="Next in queue"
              onClick={() => showPage(pageIndex + 1)}
              className="flex size-5 items-center justify-center rounded text-brand-dark/45 transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand-orange/60 dark:text-brand-cream/45 dark:hover:text-brand-cream"
            >
              <ChevronRight className="h-3 w-3" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
