"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import {
  ACCENT_GLOW,
  BEAT_COUNT,
  CLOCK,
  JOBS,
  OWNER_CONTEXT,
  Stage,
  WaitGlyph,
  WaitVignette,
  beatStartMs,
  sceneAnnouncement,
  type JobId,
} from "./hero-hire-scenes";

function fadeClass(reducedMotion: boolean) {
  return reducedMotion ? "" : "animate-fade-in";
}

function motionClass(reducedMotion: boolean, name: string) {
  return reducedMotion ? "" : name;
}

export function HeroHireDemo() {
  const reducedMotion = Boolean(useReducedMotion());
  const [jobId, setJobId] = useState<JobId>("missed-calls");
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const lastBeat = BEAT_COUNT[jobId] - 1;

    if (reducedMotion) {
      setBeat(lastBeat);
      return;
    }

    setBeat(0);
    const timers = Array.from({ length: lastBeat }, (_, index) =>
      window.setTimeout(() => setBeat(index + 1), beatStartMs(jobId, index + 1)),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [jobId, reducedMotion]);

  const lastBeat = BEAT_COUNT[jobId] - 1;
  const showSent = beat >= lastBeat;

  return (
    <div className="relative isolate w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-[2.25rem] bg-[radial-gradient(ellipse_at_center,rgba(217,119,87,0.18)_0%,rgba(217,119,87,0.06)_38%,rgba(217,119,87,0)_58%)] blur-xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-5 rounded-[2.5rem] blur-2xl transition-colors duration-700 ease-out"
        style={{ backgroundColor: ACCENT_GLOW[jobId] }}
      />

      <div className="relative rounded-[1.75rem] bg-gradient-to-b from-white to-[#FBF9F3] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_6px_rgba(20,20,19,0.04),0_30px_60px_-30px_rgba(20,20,19,0.3),0_18px_50px_-22px_rgba(217,119,87,0.35)] ring-1 ring-brand-dark/[0.06] dark:from-[#22211F] dark:to-[#1A1918] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_34px_70px_-34px_rgba(0,0,0,0.85),0_18px_50px_-22px_rgba(217,119,87,0.25)] dark:ring-white/[0.08] sm:p-4">
        <div className="flex items-start justify-between gap-3 px-1.5 pb-3.5 pt-1">
          <div>
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
              <span
                aria-hidden
                className={`h-1.5 w-1.5 rounded-full bg-brand-orange ${motionClass(reducedMotion, "hero-demo-live-dot")}`}
              />
              While you&apos;re away
            </p>
            <p className="mt-1 text-[15px] font-medium leading-snug text-brand-dark dark:text-brand-cream">
              {OWNER_CONTEXT[jobId]}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <p className="rounded-full bg-brand-dark/[0.04] px-2.5 py-1 text-[11px] tabular-nums text-brand-dark/55 dark:bg-white/[0.06] dark:text-white/55">
              {CLOCK[jobId]}
            </p>
            <p className="flex h-5 items-center">
              {showSent ? (
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-medium text-brand-dark/70 dark:text-brand-cream/70 ${fadeClass(reducedMotion)}`}
                >
                  <span
                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#30D158] ${motionClass(reducedMotion, "hero-demo-sent-pop")}`}
                    aria-hidden
                  >
                    <Check className="h-2 w-2 text-white" strokeWidth={3.5} />
                  </span>
                  Sent
                </span>
              ) : null}
            </p>
          </div>
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {sceneAnnouncement(jobId, beat)}
        </div>

        <div className="grid min-h-[20rem]">
          <div
            key={jobId}
            className={`grid ${motionClass(reducedMotion, "hero-demo-stage-in")}`}
          >
            <Stage jobId={jobId} beat={beat} reducedMotion={reducedMotion} />
          </div>
        </div>

        <div
          role="group"
          aria-label="Job to preview"
          className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3"
        >
          {JOBS.map((job, index) => {
            const selected = job.id === jobId;

            return (
              <button
                key={job.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setJobId(job.id)}
                className={`min-h-[44px] rounded-xl p-2.5 text-left transition-[box-shadow,background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${index === JOBS.length - 1 ? "max-sm:col-span-2" : ""} ${motionClass(reducedMotion, "hero-demo-stage-in")} ${
                  selected
                    ? "bg-white shadow-[0_8px_20px_-12px_rgba(217,119,87,0.5)] ring-2 ring-brand-orange dark:bg-white/[0.08]"
                    : "bg-brand-dark/[0.03] ring-1 ring-brand-dark/[0.06] hover:bg-brand-dark/[0.05] hover:ring-brand-orange/40 dark:bg-white/[0.03] dark:ring-white/[0.07] dark:hover:bg-white/[0.05] dark:hover:ring-brand-orange/40"
                }`}
                style={
                  reducedMotion
                    ? undefined
                    : { animationDelay: `${0.15 + index * 0.05}s` }
                }
              >
                <span className="flex items-center gap-1.5">
                  <WaitGlyph
                    jobId={job.id}
                    reducedMotion={reducedMotion || selected}
                  />
                  <span className="truncate text-[11px] font-semibold text-brand-dark dark:text-brand-cream">
                    {job.label}
                  </span>
                  {selected ? (
                    <span
                      aria-hidden
                      className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange ${motionClass(reducedMotion, "hero-demo-live-dot")}`}
                    />
                  ) : null}
                </span>
                <span className="pointer-events-none block">
                  <WaitVignette jobId={job.id} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
