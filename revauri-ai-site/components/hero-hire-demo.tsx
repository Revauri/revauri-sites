"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Check,
  CheckCheck,
  Mail,
  MessageCircle,
  Phone,
  PhoneOff,
  Star,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";

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

function motionClass(reducedMotion: boolean, name: string) {
  return reducedMotion ? "" : name;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 rounded-[16px] rounded-bl-md bg-[#E9E9EB] px-2.5 py-1.5 dark:bg-[#3A3A3C]">
      <span className="hero-demo-typing-dot h-1.5 w-1.5 rounded-full bg-brand-dark/50 dark:bg-white/80" />
      <span className="hero-demo-typing-dot h-1.5 w-1.5 rounded-full bg-brand-dark/50 dark:bg-white/80" />
      <span className="hero-demo-typing-dot h-1.5 w-1.5 rounded-full bg-brand-dark/50 dark:bg-white/80" />
    </div>
  );
}

function InboundBubble({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[92%] rounded-[16px] rounded-bl-md bg-[#E9E9EB] px-2.5 py-1.5 text-[12px] leading-snug text-brand-dark dark:bg-[#3A3A3C] dark:text-white">
      {children}
    </div>
  );
}

function OutboundBubble({
  text,
  sent,
  reducedMotion,
}: {
  text: string;
  sent?: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className={`ml-auto max-w-[92%] ${motionClass(reducedMotion, "hero-demo-bubble")}`}>
      <p className="rounded-[16px] rounded-br-md bg-[#0A84FF] px-2.5 py-1.5 text-[12px] leading-snug text-white">
        {text}
      </p>
      {sent ? (
        <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] font-medium text-brand-dark/40 dark:text-white/45">
          <CheckCheck className="h-3 w-3 text-[#0A84FF]" aria-hidden />
          Delivered
        </p>
      ) : (
        <p className="mt-0.5 text-right text-[10px] font-medium uppercase tracking-[0.14em] text-[#0A84FF]">
          Draft
        </p>
      )}
    </div>
  );
}

function CallScene({ beat, reducedMotion }: { beat: number; reducedMotion: boolean }) {
  const missed = beat >= 1;
  const sent = beat >= 4;

  if (beat >= 3) {
    return (
      <div className="flex flex-col gap-2">
        <InboundBubble>
          <span className="block text-[10px] text-brand-dark/50 dark:text-white/55">
            Missed · After hours
          </span>
          {COPY["missed-calls"].capture}
        </InboundBubble>
        <div className="flex flex-col items-end gap-1.5">
          {!sent && !reducedMotion ? <TypingDots /> : null}
          <OutboundBubble
            text={COPY["missed-calls"].draft}
            sent={sent}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2.5">
        <div className="relative h-10 w-10 shrink-0">
          {!missed && !reducedMotion ? (
            <>
              <span className="hero-demo-ring absolute inset-0 rounded-full bg-[#30D158]/45" />
              <span
                className="hero-demo-ring absolute inset-0 rounded-full bg-[#30D158]/30"
                style={{ animationDelay: "0.55s" }}
              />
            </>
          ) : null}
          <div
            className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
              missed
                ? "bg-[#FF453A]/15 text-[#FF453A]"
                : "bg-[#30D158]/15 text-[#30D158]"
            }`}
          >
            {missed ? (
              <PhoneOff className="h-5 w-5" aria-hidden />
            ) : (
              <Phone className="h-5 w-5" aria-hidden />
            )}
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-brand-dark dark:text-brand-cream">
            Maria Chen
          </p>
          <p className="text-[11px] text-brand-dark/50 dark:text-white/50">
            {missed ? "Missed" : "Incoming"} · {COPY["missed-calls"].incoming}
          </p>
        </div>
      </div>
      <p className="text-[11px] text-brand-dark/45 dark:text-white/45">
        {OWNER_CONTEXT["missed-calls"]}
      </p>
      {beat >= 2 ? (
        <p
          className={`rounded-xl bg-brand-dark/[0.04] px-2.5 py-2 text-[12px] leading-snug text-brand-dark dark:bg-white/[0.07] dark:text-brand-cream ${motionClass(reducedMotion, "hero-demo-notify")}`}
        >
          {COPY["missed-calls"].capture}
        </p>
      ) : null}
    </div>
  );
}

function QuietLeadsScene({
  beat,
  reducedMotion,
}: {
  beat: number;
  reducedMotion: boolean;
}) {
  const sent = beat >= 3;

  return (
    <div className="flex flex-col gap-2">
      <InboundBubble>
        <span className="block text-[10px] text-brand-dark/50 dark:text-white/55">
          3 days ago
        </span>
        Can I still get that estimate for the back roof?
      </InboundBubble>
      <p className="text-[11px] text-brand-dark/45 dark:text-white/45">
        {COPY["quiet-leads"].leak}
      </p>
      {beat >= 1 ? (
        <p
          className={`text-[11px] text-brand-dark/45 dark:text-white/45 ${motionClass(reducedMotion, "hero-demo-notify")}`}
        >
          {COPY["quiet-leads"].line}
        </p>
      ) : null}
      {beat >= 2 ? (
        <div className="flex flex-col items-end gap-1.5">
          {!sent && !reducedMotion ? <TypingDots /> : null}
          <OutboundBubble
            text={COPY["quiet-leads"].draft}
            sent={sent}
            reducedMotion={reducedMotion}
          />
        </div>
      ) : null}
    </div>
  );
}

function ReviewsScene({
  beat,
  reducedMotion,
}: {
  beat: number;
  reducedMotion: boolean;
}) {
  const sent = beat >= 4;

  return (
    <div className="flex flex-col gap-2">
      {beat < 1 ? (
        <div>
          <p className="flex items-center gap-0.5 text-brand-dark/25 dark:text-white/25" aria-hidden>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-3 w-3" />
            ))}
          </p>
          <p className="mt-1.5 text-[12px] leading-snug text-brand-dark/70 dark:text-brand-cream/70">
            {COPY.reviews.leak}
          </p>
        </div>
      ) : null}
      {beat >= 1 && beat < 2 ? (
        <div className="flex flex-col items-end gap-1.5">
          {!reducedMotion ? <TypingDots /> : null}
          <OutboundBubble
            text={COPY.reviews.ask}
            sent={false}
            reducedMotion={reducedMotion}
          />
        </div>
      ) : null}
      {beat >= 2 ? (
        <div
          className={`rounded-xl bg-brand-dark/[0.04] px-2.5 py-2 dark:bg-white/[0.07] ${motionClass(reducedMotion, "hero-demo-notify")}`}
        >
          <p
            className="flex items-center gap-0.5 text-[#E6A817]"
            aria-label="5 star review"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-3 w-3 fill-current" aria-hidden />
            ))}
            <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wide text-brand-dark/45 dark:text-white/50">
              5 stars
            </span>
          </p>
          <p className="mt-1 text-[12px] leading-snug text-brand-dark dark:text-brand-cream">
            {COPY.reviews.review}
          </p>
        </div>
      ) : null}
      {beat >= 3 ? (
        <div className="flex flex-col items-end gap-1.5">
          {!sent && !reducedMotion ? <TypingDots /> : null}
          <OutboundBubble
            text={COPY.reviews.reply}
            sent={sent}
            reducedMotion={reducedMotion}
          />
        </div>
      ) : null}
    </div>
  );
}

function QuotesScene({ beat, reducedMotion }: { beat: number; reducedMotion: boolean }) {
  const sent = beat >= 3;

  if (beat >= 2) {
    return (
      <div className="flex flex-col gap-2">
        <InboundBubble>
          <span className="block text-[10px] text-brand-dark/50 dark:text-white/55">
            Estimate
          </span>
          {COPY.quotes.leak}
        </InboundBubble>
        <div className="flex flex-col items-end gap-1.5">
          {!sent && !reducedMotion ? <TypingDots /> : null}
          <OutboundBubble
            text={COPY.quotes.draft}
            sent={sent}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-xl bg-brand-dark/[0.04] px-2.5 py-2 dark:bg-white/[0.07]">
        <p className="text-[10px] text-brand-dark/45 dark:text-white/45">From Sam</p>
        <p className="mt-0.5 text-[13px] font-semibold text-brand-dark dark:text-brand-cream">
          Estimate
        </p>
        <p className="mt-1 text-[12px] leading-snug text-brand-dark/70 dark:text-brand-cream/70">
          {COPY.quotes.leak}
        </p>
      </div>
      {beat >= 1 ? (
        <p
          className={`text-[11px] text-brand-dark/45 dark:text-white/45 ${motionClass(reducedMotion, "hero-demo-notify")}`}
        >
          {COPY.quotes.line}
        </p>
      ) : null}
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
  if (jobId === "missed-calls") {
    return <CallScene beat={beat} reducedMotion={reducedMotion} />;
  }
  if (jobId === "quiet-leads") {
    return <QuietLeadsScene beat={beat} reducedMotion={reducedMotion} />;
  }
  if (jobId === "reviews") {
    return <ReviewsScene beat={beat} reducedMotion={reducedMotion} />;
  }
  return <QuotesScene beat={beat} reducedMotion={reducedMotion} />;
}

function JobIcon({ jobId }: { jobId: JobId }) {
  if (jobId === "missed-calls") {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#30D158] text-white">
        <Phone className="h-3.5 w-3.5" aria-hidden />
      </span>
    );
  }
  if (jobId === "quiet-leads") {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#30D158] text-white">
        <MessageCircle className="h-3.5 w-3.5" aria-hidden />
      </span>
    );
  }
  if (jobId === "reviews") {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#FF9F0A] text-white">
        <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
      </span>
    );
  }
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#0A84FF] text-white">
      <Mail className="h-3.5 w-3.5" aria-hidden />
    </span>
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
    <div className="relative isolate w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-7 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(217,119,87,0.22)_0%,rgba(217,119,87,0.07)_42%,rgba(217,119,87,0)_72%)] blur-2xl"
      />

      <div className="relative rounded-[1.7rem] bg-brand-white/90 p-3 shadow-[0_20px_45px_-30px_rgba(217,119,87,0.45)] ring-1 ring-brand-orange/15 dark:bg-[#1a1a19]/90">
        <div className="flex items-end justify-between gap-3 px-1 pb-3 pt-0.5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
              While you&apos;re away
            </p>
            <p className="mt-0.5 text-sm text-brand-dark/60 dark:text-brand-cream/60">
              {OWNER_CONTEXT[jobId]}
            </p>
          </div>
          <p className="text-[11px] tabular-nums text-brand-dark/40 dark:text-white/40">
            {jobId === "missed-calls"
              ? "7:42 PM"
              : jobId === "quiet-leads"
                ? "2:14 PM"
                : jobId === "reviews"
                  ? "4:05 PM"
                  : "11:20 AM"}
          </p>
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {sceneAnnouncement(jobId, beat)}
        </div>

        <div
          role="group"
          aria-label="Job to preview"
          className="grid grid-cols-2 gap-2.5"
        >
          {JOBS.map((job) => {
            const selected = job.id === jobId;
            const tileBeat = selected ? beat : 0;

            return (
              <button
                key={job.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setJobId(job.id)}
                className={`min-h-[44px] rounded-2xl p-3 text-left transition-[box-shadow,background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
                  selected
                    ? "bg-brand-white shadow-[0_10px_24px_-16px_rgba(217,119,87,0.55)] ring-2 ring-brand-orange dark:bg-[#141413]"
                    : "bg-brand-cream/60 ring-1 ring-brand-light-gray/80 hover:ring-brand-orange/40 dark:bg-brand-dark/40 dark:ring-white/10 dark:hover:ring-brand-orange/35"
                }`}
              >
                <span className="mb-2.5 flex items-center gap-2">
                  <JobIcon jobId={job.id} />
                  <span className="text-[12px] font-semibold text-brand-dark dark:text-brand-cream">
                    {job.label}
                  </span>
                  {selected ? (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  ) : null}
                </span>
                <span className="pointer-events-none block min-h-[11.5rem] overflow-hidden">
                  <SceneStack
                    jobId={job.id}
                    beat={tileBeat}
                    reducedMotion={reducedMotion}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex h-8 items-end px-1">
          {showSent ? (
            <p
              className={`inline-flex items-center gap-1.5 text-[12px] font-medium text-brand-dark/70 dark:text-brand-cream/70 ${fadeClass(reducedMotion)}`}
            >
              <Check className="h-3.5 w-3.5 text-[#30D158]" aria-hidden />
              Sent. You didn&apos;t have to touch this.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
