"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Check, PhoneMissed, Star } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import BlendedDemoFrame from "./blended-demo-frame";

type JobId = "missed-calls" | "quiet-leads" | "reviews" | "quotes";

const JOBS: { id: JobId; label: string }[] = [
  { id: "missed-calls", label: "Missed calls" },
  { id: "quiet-leads", label: "Quiet leads" },
  { id: "reviews", label: "Reviews" },
  { id: "quotes", label: "Quotes" },
];

const BEAT_COUNT: Record<JobId, number> = {
  "missed-calls": 5,
  "quiet-leads": 4,
  reviews: 5,
  quotes: 4,
};

const BEAT_MS = 1500;

const OWNER_CONTEXT: Record<JobId, string> = {
  "missed-calls": "You're at dinner.",
  "quiet-leads": "You're on a job.",
  reviews: "You're already on the next one.",
  quotes: "You're not chasing it.",
};

const COPY = {
  "missed-calls": {
    incoming: "Fri 7:42 PM · After hours",
    capture: "Maria Chen · roof leak · call back tomorrow morning",
    draft:
      "Maria — thanks for calling about the leak. Want us to come by tomorrow morning?",
  },
  "quiet-leads": {
    leak: "Quote request · 3 days quiet",
    line: "Agreed wait is over.",
    draft:
      "Hey Tom — still want that estimate for the back roof, or should I close this out?",
  },
  reviews: {
    leak: "Job finished Tuesday · no review ask yet",
    ask: "Glad we got that leak sorted. If you have 30 seconds, a review helps more than you’d think.",
    review: "Fixed the leak the same week. Professional and on time.",
    reply:
      "Thanks Maria — glad the leak is sorted. Appreciate you taking the time.",
  },
  quotes: {
    leak: "Estimate sent · 11 days ago · no reply",
    line: "Nobody nudged it.",
    draft:
      "Hey Sam — just checking this estimate is still useful. Want me to hold the date, or close it out?",
  },
} as const;

function sceneAnnouncement(jobId: JobId, beat: number): string {
  const parts: string[] = [OWNER_CONTEXT[jobId]];

  if (jobId === "missed-calls") {
    parts.push(COPY["missed-calls"].incoming);
    if (beat >= 1) parts.push("Missed");
    if (beat >= 2) parts.push(COPY["missed-calls"].capture);
    if (beat >= 3) parts.push(`Draft: ${COPY["missed-calls"].draft}`);
  } else if (jobId === "quiet-leads") {
    parts.push(COPY["quiet-leads"].leak);
    if (beat >= 1) parts.push(COPY["quiet-leads"].line);
    if (beat >= 2) parts.push(`Draft: ${COPY["quiet-leads"].draft}`);
  } else if (jobId === "reviews") {
    parts.push(COPY.reviews.leak);
    if (beat >= 1) parts.push(`Draft: ${COPY.reviews.ask}`);
    if (beat >= 2) parts.push(`5 star review: ${COPY.reviews.review}`);
    if (beat >= 3) parts.push(`Draft: ${COPY.reviews.reply}`);
  } else {
    parts.push(COPY.quotes.leak);
    if (beat >= 1) parts.push(COPY.quotes.line);
    if (beat >= 2) parts.push(`Draft: ${COPY.quotes.draft}`);
  }

  const lastBeat = BEAT_COUNT[jobId] - 1;
  if (beat >= lastBeat) {
    parts.push(
      "Sent. In a real hire, this goes out in your voice while you're away.",
    );
  }

  return parts.join(" ");
}

function fadeClass(reducedMotion: boolean) {
  return reducedMotion ? "" : "animate-fade-in";
}

function LeakCard({
  children,
  context,
}: {
  children: ReactNode;
  context: string;
}) {
  return (
    <div className="rounded-xl border border-brand-light-gray/70 bg-brand-white px-3 py-2.5 dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
      <p className="text-[11px] text-brand-dark/60 dark:text-brand-cream/60">
        {context}
      </p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function DraftCard({
  text,
  sent,
  label = "Draft",
}: {
  text: string;
  sent?: boolean;
  label?: string;
}) {
  return (
    <div className="rounded-xl border border-brand-orange/25 bg-brand-orange/[0.07] px-3 py-2.5 dark:border-brand-orange/30 dark:bg-brand-orange/[0.08]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-orange">
          {label}
        </p>
        {sent ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-dark dark:text-brand-cream">
            <Check className="h-3 w-3" aria-hidden />
            Sent
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-xs leading-relaxed text-brand-dark dark:text-brand-cream">
        {text}
      </p>
    </div>
  );
}

function CallRow({ missed, reducedMotion }: { missed: boolean; reducedMotion: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          missed
            ? "bg-brand-orange/15 text-brand-orange"
            : "bg-brand-light-gray/70 text-brand-dark/55 dark:bg-brand-mid-gray/20 dark:text-brand-cream/55"
        }`}
      >
        {!missed && !reducedMotion ? (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-brand-orange/25"
          />
        ) : null}
        <PhoneMissed className="relative h-4 w-4" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-brand-dark dark:text-brand-cream">
          {missed ? "Missed" : "Incoming"}
        </p>
        <p className="text-[11px] text-brand-dark/60 dark:text-brand-cream/60">
          {COPY["missed-calls"].incoming}
        </p>
      </div>
    </div>
  );
}

function SceneStack({
  jobId,
  beat,
  reducedMotion,
}: {
  jobId: JobId;
  beat: number;
  reducedMotion: boolean;
}) {
  const sent = beat >= BEAT_COUNT[jobId] - 1;
  const fade = fadeClass(reducedMotion);
  const context = OWNER_CONTEXT[jobId];

  if (jobId === "missed-calls") {
    return (
      <div className="space-y-2">
        <LeakCard context={context}>
          <CallRow missed={beat >= 1} reducedMotion={reducedMotion} />
          {beat >= 2 ? (
            <p className={`mt-2 border-t border-brand-light-gray/60 pt-2 text-xs leading-relaxed text-brand-dark/75 dark:border-brand-mid-gray/20 dark:text-brand-cream/75 ${fade}`}>
              {COPY["missed-calls"].capture}
            </p>
          ) : null}
        </LeakCard>
        {beat >= 3 ? (
          <div className={fade}>
            <DraftCard text={COPY["missed-calls"].draft} sent={sent} />
          </div>
        ) : null}
      </div>
    );
  }

  if (jobId === "quiet-leads") {
    return (
      <div className="space-y-2">
        <LeakCard context={context}>
          <p className="text-xs font-medium text-brand-dark dark:text-brand-cream">
            {COPY["quiet-leads"].leak}
          </p>
          {beat >= 1 ? (
            <p className={`mt-1.5 text-[11px] text-brand-dark/60 dark:text-brand-cream/60 ${fade}`}>
              {COPY["quiet-leads"].line}
            </p>
          ) : null}
        </LeakCard>
        {beat >= 2 ? (
          <div className={fade}>
            <DraftCard text={COPY["quiet-leads"].draft} sent={sent} />
          </div>
        ) : null}
      </div>
    );
  }

  if (jobId === "reviews") {
    return (
      <div className="space-y-2">
        <LeakCard context={context}>
          <p className="text-xs font-medium text-brand-dark dark:text-brand-cream">
            {COPY.reviews.leak}
          </p>
        </LeakCard>
        {beat >= 1 ? (
          <div className={fade}>
            <DraftCard text={COPY.reviews.ask} label="Ask" />
          </div>
        ) : null}
        {beat >= 2 ? (
          <div className={`rounded-xl border border-brand-light-gray/70 bg-brand-white px-3 py-2.5 dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] ${fade}`}>
            <p className="flex items-center gap-0.5 text-amber-500" aria-label="5 star review">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-3 w-3 fill-current" aria-hidden />
              ))}
              <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wide text-brand-dark/55 dark:text-brand-cream/55">
                5 stars
              </span>
            </p>
            <p className="mt-1 text-xs leading-relaxed text-brand-dark dark:text-brand-cream">
              {COPY.reviews.review}
            </p>
          </div>
        ) : null}
        {beat >= 3 ? (
          <div className={fade}>
            <DraftCard text={COPY.reviews.reply} sent={sent} label="Reply" />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <LeakCard context={context}>
        <p className="text-xs font-medium text-brand-dark dark:text-brand-cream">
          {COPY.quotes.leak}
        </p>
        {beat >= 1 ? (
          <p className={`mt-1.5 text-[11px] text-brand-dark/60 dark:text-brand-cream/60 ${fade}`}>
            {COPY.quotes.line}
          </p>
        ) : null}
      </LeakCard>
      {beat >= 2 ? (
        <div className={fade}>
          <DraftCard text={COPY.quotes.draft} sent={sent} />
        </div>
      ) : null}
    </div>
  );
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
      window.setTimeout(() => setBeat(index + 1), (index + 1) * BEAT_MS),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [jobId, reducedMotion]);

  const lastBeat = BEAT_COUNT[jobId] - 1;
  const showSent = beat >= lastBeat;

  return (
    <BlendedDemoFrame>
      <>
        <div className="rounded-2xl border border-brand-light-gray/40 bg-brand-white/80 p-1 dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]/80">
          <div className="rounded-t-xl bg-brand-cream/80 px-3 py-2.5 dark:bg-brand-dark/80">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5" aria-hidden>
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
              </div>
              <p className="text-[10px] font-medium tracking-wide text-brand-mid-gray">
                While you&apos;re away
              </p>
            </div>
          </div>

          <div className="px-3 pb-3 pt-2.5">
            <div
              role="group"
              aria-label="Job to preview"
              className="grid grid-cols-2 gap-1.5"
            >
              {JOBS.map((job) => {
                const selected = job.id === jobId;
                return (
                  <button
                    key={job.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setJobId(job.id)}
                    className={`inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border px-2 text-xs transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
                      selected
                        ? "border-brand-orange bg-brand-orange/10 font-semibold text-brand-dark dark:text-brand-cream"
                        : "border-brand-light-gray text-brand-dark/70 hover:border-brand-orange/40 hover:text-brand-dark dark:border-brand-mid-gray/20 dark:text-brand-cream/70 dark:hover:text-brand-cream"
                    }`}
                  >
                    {selected ? (
                      <Check className="h-3 w-3 shrink-0" aria-hidden />
                    ) : null}
                    {job.label}
                  </button>
                );
              })}
            </div>

            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {sceneAnnouncement(jobId, beat)}
            </div>

            <div className="mt-2.5 min-h-[8.75rem]">
              <SceneStack
                jobId={jobId}
                beat={beat}
                reducedMotion={reducedMotion}
              />
            </div>

            {showSent ? (
              <p
                className={`mt-2.5 border-t border-brand-light-gray/60 pt-2.5 text-[11px] leading-snug text-brand-dark/70 dark:border-brand-mid-gray/20 dark:text-brand-cream/70 ${fadeClass(reducedMotion)}`}
              >
                Sent. You didn&apos;t have to touch this.
              </p>
            ) : null}
          </div>
        </div>

        <div className="absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-brand-orange/30 bg-brand-white px-3 py-1 text-[11px] font-medium text-brand-orange shadow-lg dark:bg-brand-dark sm:px-4 sm:py-1.5 sm:text-xs">
          Working while you&apos;re away.
        </div>
      </>
    </BlendedDemoFrame>
  );
}
