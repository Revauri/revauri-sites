"use client";

import { useState } from "react";
import {
  Calendar,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Star,
} from "lucide-react";
import { SCOPED_SETUP, type ScopedHighlight } from "./script";

function NodeGlyph({ variant }: { variant: "grid" | "cross" | "tri" | "plus" }) {
  const cells =
    variant === "grid"
      ? [0, 1, 2, 3, 4, 5, 6, 7, 8]
      : variant === "cross"
        ? [1, 3, 4, 5, 7]
        : variant === "tri"
          ? [1, 3, 5]
          : [0, 2, 4, 6, 8];

  return (
    <span
      aria-hidden
      className="grid h-7 w-7 shrink-0 grid-cols-3 grid-rows-3 place-items-center rounded-md bg-black/[0.04] dark:bg-white/[0.06]"
    >
      {Array.from({ length: 9 }, (_, index) => (
        <span
          key={index}
          className={`h-1 w-1 rounded-full ${
            cells.includes(index)
              ? "bg-brand-dark/45 dark:bg-brand-cream/45"
              : "bg-transparent"
          }`}
        />
      ))}
    </span>
  );
}

function highlightRing(active: boolean): string {
  return active
    ? "ring-2 ring-brand-orange/45 ring-offset-2 ring-offset-[#F1EFE7] dark:ring-offset-[#1C1B19]"
    : "";
}

export function ScopedMock() {
  const [highlight, setHighlight] = useState<ScopedHighlight | null>(null);

  function toggle(region: ScopedHighlight) {
    setHighlight((current) => (current === region ? null : region));
  }

  return (
    <div className="grid h-full min-h-[400px] grid-cols-1 min-[767px]:min-h-[440px] min-[767px]:grid-cols-[220px_1fr]">
      <div className="border-b border-black/[0.06] px-4 py-4 dark:border-white/[0.06] min-[767px]:border-b-0 min-[767px]:border-r">
        <h3 className="text-[13px] font-semibold text-brand-dark/70 dark:text-brand-cream/70">
          {SCOPED_SETUP.title}
        </h3>
        <label className="mt-5 block text-[11px] font-medium text-brand-dark/45 dark:text-brand-cream/45">
          {SCOPED_SETUP.nameLabel}
          <input
            type="text"
            defaultValue={SCOPED_SETUP.name}
            readOnly
            className="mt-1.5 w-full rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-[13px] text-brand-dark outline-none dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-brand-cream"
          />
        </label>
        <label className="mt-4 block text-[11px] font-medium text-brand-dark/45 dark:text-brand-cream/45">
          {SCOPED_SETUP.instructionsLabel}
          <textarea
            readOnly
            rows={5}
            placeholder={SCOPED_SETUP.instructionsPlaceholder}
            className="mt-1.5 w-full resize-none rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-[13px] leading-relaxed text-brand-dark outline-none placeholder:text-brand-dark/35 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-brand-cream dark:placeholder:text-brand-cream/35"
          />
        </label>
      </div>

      <div className="relative flex min-w-0 flex-col items-center px-3 py-5 min-[767px]:px-6 min-[767px]:py-6">
        <button
          type="button"
          onClick={() => toggle("trigger")}
          className={`rounded-full bg-brand-dark px-3 py-1 text-[11px] font-medium text-brand-cream transition-shadow dark:bg-brand-cream dark:text-brand-dark ${highlightRing(highlight === "trigger")}`}
        >
          {SCOPED_SETUP.triggerLabel}
        </button>
        <span
          aria-hidden
          className="my-1 h-4 w-px border-l border-dashed border-black/20 dark:border-white/20"
        />
        <button
          type="button"
          onClick={() => toggle("trigger")}
          className={`flex size-6 items-center justify-center rounded-[5px] bg-sky-400 text-white ${highlightRing(highlight === "trigger")}`}
          aria-label={SCOPED_SETUP.triggerLabel}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden strokeWidth={2.5} />
        </button>
        <span
          aria-hidden
          className="my-1 h-5 w-px border-l border-dashed border-black/20 dark:border-white/20"
        />

        <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-[0_8px_22px_-14px_rgba(20,20,19,0.4)] dark:bg-[#2a2926]">
          <NodeGlyph variant="grid" />
          <div>
            <p className="text-[13px] font-semibold text-brand-dark dark:text-brand-cream">
              {SCOPED_SETUP.hireName}
            </p>
            <p className="text-[11px] text-brand-dark/40 dark:text-brand-cream/40">
              {SCOPED_SETUP.hireRole}
            </p>
          </div>
        </div>

        <span
          aria-hidden
          className="my-1 h-5 w-px border-l border-dashed border-black/20 dark:border-white/20"
        />
        <button
          type="button"
          onClick={() => toggle("jobs")}
          className={`rounded-full bg-brand-dark px-3 py-1 text-[11px] font-medium text-brand-cream transition-shadow dark:bg-brand-cream dark:text-brand-dark ${highlightRing(highlight === "jobs")}`}
        >
          {SCOPED_SETUP.addJobLabel}
        </button>
        <span
          aria-hidden
          className="my-1 h-4 w-px border-l border-dashed border-black/20 dark:border-white/20"
        />
        <button
          type="button"
          onClick={() => toggle("jobs")}
          className={`flex size-6 items-center justify-center rounded-[5px] bg-sky-400 text-white ${highlightRing(highlight === "jobs")}`}
          aria-label={SCOPED_SETUP.addJobLabel}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden strokeWidth={2.5} />
        </button>
        <span
          aria-hidden
          className="my-1 h-4 w-px border-l border-dashed border-black/20 dark:border-white/20"
        />

        <div
          className={`relative flex w-full max-w-[420px] items-start justify-center gap-2 pt-1 min-[767px]:gap-3 ${highlightRing(highlight === "jobs")}`}
        >
          <span
            aria-hidden
            className="absolute top-0 right-[16%] left-[16%] border-t border-dashed border-black/20 dark:border-white/20"
          />
          {SCOPED_SETUP.jobs.map((job, index) => {
            const variant =
              index === 0 ? "cross" : index === 1 ? "tri" : "plus";
            return (
              <div
                key={job.name}
                className="flex min-w-0 flex-1 flex-col items-center"
              >
                <span
                  aria-hidden
                  className="mb-1 h-3 w-px border-l border-dashed border-black/20 dark:border-white/20"
                />
                <div className="flex w-full items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-[0_8px_22px_-14px_rgba(20,20,19,0.4)] dark:bg-[#2a2926]">
                  <NodeGlyph variant={variant} />
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold leading-tight text-brand-dark dark:text-brand-cream">
                      {job.name}
                    </p>
                    <p className="text-[10px] text-brand-dark/40 dark:text-brand-cream/40">
                      {job.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto flex items-center justify-center pt-5">
          <button
            type="button"
            onClick={() => toggle("icons")}
            className={`flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 dark:bg-white/[0.06] ${highlightRing(highlight === "icons")}`}
            aria-label="Connected tools"
          >
            <Phone className="h-3.5 w-3.5 text-brand-orange" aria-hidden />
            <Mail className="h-3.5 w-3.5 text-brand-dark/50 dark:text-brand-cream/50" aria-hidden />
            <Calendar className="h-3.5 w-3.5 text-brand-dark/50 dark:text-brand-cream/50" aria-hidden />
            <MessageCircle className="h-3.5 w-3.5 text-brand-dark/50 dark:text-brand-cream/50" aria-hidden />
            <Star className="h-3.5 w-3.5 text-brand-orange/80" aria-hidden />
            <span className="text-[11px] font-medium text-brand-dark/45 dark:text-brand-cream/45">
              +{SCOPED_SETUP.extraIntegrations}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
