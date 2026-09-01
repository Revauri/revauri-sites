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
    <div className="flex h-full min-h-[400px] flex-col min-[767px]:min-h-[440px]">
      <div
        role="tablist"
        aria-label="Draft types"
        className="mx-3 mt-3 flex overflow-x-auto rounded-full bg-black/[0.045] p-0.5 [scrollbar-width:none] min-[767px]:mx-5 min-[767px]:mt-4 dark:bg-white/[0.06] [&::-webkit-scrollbar]:hidden"
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
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-center text-[11px] leading-none tracking-[-0.01em] transition-colors min-[767px]:flex-1 ${
                selected
                  ? "bg-white font-medium text-brand-dark shadow-[0_1px_2px_rgba(20,20,19,0.08)] dark:bg-[#2a2926] dark:text-brand-cream dark:shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
                  : "font-medium text-brand-dark/40 hover:text-brand-dark/65 dark:text-brand-cream/40 dark:hover:text-brand-cream/65"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-5 min-[767px]:px-10">
        <div className="relative w-full max-w-[440px] overflow-hidden rounded-2xl bg-white shadow-[0_10px_32px_-16px_rgba(20,20,19,0.35)] dark:bg-[#242321] dark:shadow-[0_10px_32px_-16px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-2 border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
            {isQueue ? (
              <List
                className="h-3.5 w-3.5 text-brand-orange"
                strokeWidth={1.75}
                aria-hidden
              />
            ) : (
              <Mail
                className="h-3.5 w-3.5 text-brand-orange"
                strokeWidth={1.75}
                aria-hidden
              />
            )}
            <p className="flex-1 text-[12px] font-medium text-brand-dark dark:text-brand-cream">
              {isQueue ? "This week’s jobs" : "Draft to send"}
            </p>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => showPage(pageIndex - 1)}
                className="flex size-6 items-center justify-center rounded-md text-brand-dark/45 transition-colors hover:text-brand-dark dark:text-brand-cream/45 dark:hover:text-brand-cream"
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => showPage(pageIndex + 1)}
                className="flex size-6 items-center justify-center rounded-md text-brand-dark/45 transition-colors hover:text-brand-dark dark:text-brand-cream/45 dark:hover:text-brand-cream"
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
                      ? "bg-black/[0.04] dark:bg-white/[0.05]"
                      : undefined
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-brand-dark dark:text-brand-cream">
                      {job.name}
                    </p>
                    <p className="mt-0.5 text-[10px] text-brand-dark/40 dark:text-brand-cream/40">
                      {job.state}
                    </p>
                  </div>
                  <span className="shrink-0 text-[8px] font-medium uppercase tracking-[0.12em] text-brand-dark/35 dark:text-brand-cream/35">
                    {job.tag}
                  </span>
                </li>
              ))}
            </ul>
          ) : draft ? (
            <>
              <dl className="divide-y divide-black/[0.06] text-[12px] dark:divide-white/[0.06]">
                <div className="grid grid-cols-[72px_1fr] gap-3 px-4 py-2.5">
                  <dt className="text-brand-dark/40 dark:text-brand-cream/40">
                    To
                  </dt>
                  <dd className="min-w-0 text-brand-dark dark:text-brand-cream">
                    <span className="font-medium">{draft.to}</span>{" "}
                    <span className="text-brand-dark/40 dark:text-brand-cream/40">
                      {draft.toEmail}
                    </span>
                  </dd>
                </div>
                <div className="grid grid-cols-[72px_1fr] gap-3 px-4 py-2.5">
                  <dt className="text-brand-dark/40 dark:text-brand-cream/40">
                    From
                  </dt>
                  <dd className="text-brand-dark dark:text-brand-cream">
                    <span className="font-medium">{draft.from}</span>{" "}
                    <span className="text-brand-dark/40 dark:text-brand-cream/40">
                      {draft.fromNote}
                    </span>
                  </dd>
                </div>
                <div className="grid grid-cols-[72px_1fr] gap-3 px-4 py-2.5">
                  <dt className="text-brand-dark/40 dark:text-brand-cream/40">
                    Subject
                  </dt>
                  <dd className="font-medium text-brand-dark dark:text-brand-cream">
                    {draft.subject}
                  </dd>
                </div>
              </dl>

              <div className="px-4 pb-3 pt-4 text-[12px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                <p className="font-medium text-brand-dark dark:text-brand-cream">
                  {draft.greeting}
                </p>
                <p className="mt-2">{draft.body}</p>
                {"closing" in draft && draft.closing ? (
                  <p className="mt-2">{draft.closing}</p>
                ) : null}
              </div>
            </>
          ) : null}

          <div className="flex flex-wrap items-center gap-1.5 px-4 py-3">
            <button
              type="button"
              aria-disabled="true"
              className="h-7 rounded-md bg-brand-orange px-2.5 text-[11px] font-medium tracking-wide text-white"
            >
              Approve
            </button>
            <button
              type="button"
              aria-disabled="true"
              className="h-7 rounded-md border border-black/[0.08] px-2.5 text-[11px] font-medium tracking-wide text-brand-dark/60 dark:border-white/[0.1] dark:text-brand-cream/60"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-[0_6px_18px_-10px_rgba(20,20,19,0.4)] dark:bg-[#2a2926]">
          <Mail
            className="h-3 w-3 text-brand-orange"
            strokeWidth={2}
            aria-hidden
          />
          <span className="text-[11px] font-medium text-brand-dark dark:text-brand-cream">
            {APPROVE_QUEUE_LABEL}
          </span>
          <div className="ml-1 flex items-center gap-0.5 text-[11px] tabular-nums text-brand-dark/50 dark:text-brand-cream/50">
            <button
              type="button"
              aria-label="Previous in queue"
              onClick={() => showPage(pageIndex - 1)}
              className="flex size-5 items-center justify-center rounded text-brand-dark/45 hover:text-brand-dark dark:text-brand-cream/45 dark:hover:text-brand-cream"
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
              className="flex size-5 items-center justify-center rounded text-brand-dark/45 hover:text-brand-cream/45 dark:hover:text-brand-cream"
            >
              <ChevronRight className="h-3 w-3" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
