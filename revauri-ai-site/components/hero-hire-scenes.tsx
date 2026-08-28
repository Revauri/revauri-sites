/**
 * Stateless presentational pieces for the hero hire demo.
 * All state (jobId, beat, timers) lives in hero-hire-demo.tsx.
 */

import type { ReactNode } from "react";
import {
  Calendar,
  CheckCheck,
  ClipboardList,
  ListChecks,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  PhoneOff,
  Star,
  Users,
} from "lucide-react";

export type JobId =
  | "missed-calls"
  | "quiet-leads"
  | "reviews"
  | "quotes"
  | "calendar"
  | "inbox"
  | "check-ins"
  | "busywork"
  | "outreach";

export const JOBS: { id: JobId; label: string }[] = [
  { id: "missed-calls", label: "Calls" },
  { id: "quiet-leads", label: "Leads" },
  { id: "reviews", label: "Reviews" },
  { id: "quotes", label: "Quotes" },
  { id: "calendar", label: "Calendar" },
  { id: "inbox", label: "Inbox triage" },
  { id: "check-ins", label: "Customers" },
  { id: "busywork", label: "Payroll" },
  { id: "outreach", label: "Outreach" },
];

export const BEAT_COUNT: Record<JobId, number> = {
  "missed-calls": 5,
  "quiet-leads": 4,
  reviews: 5,
  quotes: 4,
  calendar: 4,
  inbox: 4,
  "check-ins": 4,
  busywork: 4,
  outreach: 4,
};

const BEAT_MS = 1500;
const CALL_HOLD_MS = 500;

/** When the given beat should start, from job select. */
export function beatStartMs(jobId: JobId, beat: number): number {
  let elapsed = 0;
  for (let index = 0; index < beat; index += 1) {
    elapsed += BEAT_MS;
    if (jobId === "missed-calls" && (index === 0 || index === 1)) {
      elapsed += CALL_HOLD_MS;
    }
  }
  return elapsed;
}

export const OWNER_CONTEXT: Record<JobId, string> = {
  "missed-calls": "You're at dinner.",
  "quiet-leads": "You're on a job.",
  reviews: "You're already on the next one.",
  quotes: "You're not chasing it.",
  calendar: "You're booked solid.",
  inbox: "You're still asleep.",
  "check-ins": "You're off the site.",
  busywork: "You're not chasing hours.",
  outreach: "You're not doing the marketing.",
};

export const CLOCK: Record<JobId, string> = {
  "missed-calls": "7:42 PM",
  "quiet-leads": "2:14 PM",
  reviews: "4:05 PM",
  quotes: "11:20 AM",
  calendar: "5:30 PM",
  inbox: "6:12 AM",
  "check-ins": "11:45 AM",
  busywork: "3:20 PM",
  outreach: "7:15 PM",
};

/** Ambient glow color per job — sampled behind the board. */
export const ACCENT_GLOW: Record<JobId, string> = {
  "missed-calls": "rgba(48, 209, 88, 0.17)",
  "quiet-leads": "rgba(10, 132, 255, 0.17)",
  reviews: "rgba(230, 168, 23, 0.16)",
  quotes: "rgba(191, 90, 242, 0.15)",
  calendar: "rgba(255, 55, 95, 0.14)",
  inbox: "rgba(94, 92, 230, 0.17)",
  "check-ins": "rgba(47, 180, 155, 0.17)",
  busywork: "rgba(50, 173, 230, 0.16)",
  outreach: "rgba(224, 64, 154, 0.15)",
};

export const COPY = {
  "missed-calls": {
    incoming: "Fri 7:42 PM · After hours",
    capture: "Maria Chen · roof leak · Thursday 9:00 AM",
    draft:
      "Maria — thanks for calling about the leak. We can come Thursday at 9. Want that?",
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
      "Hey Sam — Thursday is still open if you want this. Reply YES and I'll hold it.",
    reply: "YES — hold Thursday.",
  },
  calendar: {
    leak: "Tomorrow 9:00 AM · roof inspection · unconfirmed",
    line: "No confirmation yet.",
    draft:
      "Hi Maria — confirming tomorrow at 9:00 AM for the roof inspection. Reply YES and we're all set.",
    reply: "YES",
  },
  inbox: {
    leak: "7 unsorted messages overnight",
    line: "Sorted before you're up.",
    draft: "Inbox sorted — 5 filed, 1 spam gone, 1 real lead flagged for you.",
  },
  "check-ins": {
    leak: "Alex Rivera · job finished Tuesday",
    line: "Check-in due.",
    ask: "How did we do on Tuesday's job?",
    reply: "Great — thanks.",
    draft:
      "Glad it went well. Want us to look at the other side this fall?",
  },
  busywork: {
    leak: "Friday payroll · 3 timesheets missing",
    line: "Hours coming in.",
    draft:
      "Hours in. OT flagged on Mike. Packet is ready for Gusto.",
  },
  outreach: {
    leak: "Fall roof-check special · 42 past customers",
    line: "Email, text, and voicemail queued.",
    draft:
      "Storm season's close — we're booking free roof checks this month. Want yours on the list?",
  },
} as const;

export function sceneAnnouncement(jobId: JobId, beat: number): string {
  const parts: string[] = [OWNER_CONTEXT[jobId]];

  switch (jobId) {
    case "missed-calls":
      parts.push(COPY["missed-calls"].incoming);
      if (beat >= 1) parts.push("Answered for you");
      if (beat >= 2) parts.push(COPY["missed-calls"].capture);
      if (beat >= 3) parts.push(`Draft: ${COPY["missed-calls"].draft}`);
      if (beat >= 4) parts.push("Thursday 9:00 AM booked");
      break;
    case "reviews":
      parts.push(COPY.reviews.leak);
      if (beat >= 1) parts.push(`Draft: ${COPY.reviews.ask}`);
      if (beat >= 2) parts.push(`5 star review: ${COPY.reviews.review}`);
      if (beat >= 3) parts.push(`Draft: ${COPY.reviews.reply}`);
      break;
    case "quotes":
      parts.push(COPY.quotes.leak);
      if (beat >= 1) parts.push(COPY.quotes.line);
      if (beat >= 2) parts.push(`Draft: ${COPY.quotes.draft}`);
      if (beat >= 3) parts.push("Sam replied YES. Thursday held.");
      break;
    case "calendar":
      parts.push(COPY.calendar.leak);
      if (beat >= 1) parts.push(COPY.calendar.line);
      if (beat >= 2) parts.push(`Draft: ${COPY.calendar.draft}`);
      if (beat >= 3) parts.push("Maria replied YES. Visit confirmed.");
      break;
    case "check-ins":
      parts.push(COPY["check-ins"].leak);
      if (beat >= 1) parts.push(`Draft: ${COPY["check-ins"].ask}`);
      if (beat >= 2) parts.push(`Alex: ${COPY["check-ins"].reply}`);
      if (beat >= 3) parts.push(`Draft: ${COPY["check-ins"].draft}`);
      break;
    case "quiet-leads":
    case "inbox":
    case "busywork":
    case "outreach": {
      const copy = COPY[jobId];
      parts.push(copy.leak);
      if (beat >= 1) parts.push(copy.line);
      if (beat >= 2) parts.push(`Draft: ${copy.draft}`);
      break;
    }
    default: {
      const _exhaustive: never = jobId;
      return _exhaustive;
    }
  }

  const lastBeat = BEAT_COUNT[jobId] - 1;
  if (beat >= lastBeat) {
    parts.push(
      "Sent. In a real hire, this goes out in your voice while you're away.",
    );
  }

  return parts.join(" ");
}

function motionClass(reducedMotion: boolean, name: string) {
  return reducedMotion ? "" : name;
}

/* ---------- shared stage furniture ---------- */

function Avatar({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-[12px]",
    lg: "h-11 w-11 text-[15px]",
  } as const;
  return (
    <span
      aria-hidden
      className={`flex shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-b from-[#A6A6AD] to-[#75757C] font-semibold tracking-wide text-white ${sizes[size]}`}
    >
      {initials}
    </span>
  );
}

function TypingDots({ onDark }: { onDark?: boolean }) {
  return (
    <div
      className={`flex items-center gap-1 rounded-[16px] rounded-br-[6px] px-3 py-2 ${
        onDark ? "bg-[#3A3A3C]" : "bg-[#E9E9EB] dark:bg-[#3A3A3C]"
      }`}
    >
      <span className="hero-demo-typing-dot h-1.5 w-1.5 rounded-full bg-white/80 dark:bg-white/80" />
      <span className="hero-demo-typing-dot h-1.5 w-1.5 rounded-full bg-white/80 dark:bg-white/80" />
      <span className="hero-demo-typing-dot h-1.5 w-1.5 rounded-full bg-white/80 dark:bg-white/80" />
    </div>
  );
}

function InboundBubble({
  children,
  meta,
  onDark,
}: {
  children: ReactNode;
  meta?: string;
  onDark?: boolean;
}) {
  return (
    <div
      className={`max-w-[88%] rounded-[16px] rounded-bl-[6px] px-3 py-2 text-[13px] leading-[1.45] ${
        onDark
          ? "bg-[#3A3A3C] text-white"
          : "bg-[#E9E9EB] text-brand-dark dark:bg-[#3A3A3C] dark:text-white"
      }`}
    >
      {meta ? (
        <span
          className={`block text-[10px] font-medium ${
            onDark ? "text-white/55" : "text-brand-dark/50 dark:text-white/55"
          }`}
        >
          {meta}
        </span>
      ) : null}
      {children}
    </div>
  );
}

function OutboundBubble({
  text,
  sent,
  reducedMotion,
  onDark,
}: {
  text: string;
  sent?: boolean;
  reducedMotion: boolean;
  onDark?: boolean;
}) {
  return (
    <div
      className={`ml-auto flex max-w-[88%] flex-col items-end ${motionClass(reducedMotion, "hero-demo-bubble")}`}
    >
      <p className="rounded-[16px] rounded-br-[6px] bg-[#0A6BE0] px-3 py-2 text-[13px] leading-[1.45] text-white shadow-[0_2px_8px_-2px_rgba(10,107,224,0.4)]">
        {text}
      </p>
      {sent ? (
        <p
          className={`mt-1 flex items-center gap-1 text-[10.5px] font-medium ${
            onDark ? "text-white/60" : "text-brand-dark/45 dark:text-white/50"
          }`}
        >
          <CheckCheck
            className={`h-3.5 w-3.5 text-[#3B9CFF] ${motionClass(reducedMotion, "hero-demo-sent-pop")}`}
            aria-hidden
          />
          Delivered
        </p>
      ) : (
        <p
          className={`mt-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] ${
            onDark ? "text-[#7CB8FF]" : "text-[#0A6BE0] dark:text-[#7CB8FF]"
          }`}
        >
          Draft
        </p>
      )}
    </div>
  );
}

/** The orange "the hire noticed" moment — brand accent, same in every story. */
function ActionChip({
  text,
  reducedMotion,
}: {
  text: string;
  reducedMotion: boolean;
}) {
  return (
    <p
      className={`mx-auto rounded-full bg-brand-orange/10 px-3 py-1 text-[11px] font-medium text-brand-orange ${motionClass(reducedMotion, "hero-demo-notify")}`}
    >
      {text}
    </p>
  );
}

function StageEyebrow({
  icon,
  label,
  className,
}: {
  icon: ReactNode;
  label: string;
  className: string;
}) {
  return (
    <p
      className={`mb-2.5 flex items-center gap-1.5 px-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${className}`}
    >
      {icon}
      {label}
    </p>
  );
}

/** Animated voice bars for the live AI-answered call. */
function VoiceWave({ reducedMotion }: { reducedMotion: boolean }) {
  const delays = [0, 0.15, 0.3, 0.45, 0.6];
  return (
    <span aria-hidden className="flex h-5 items-center gap-[3px]">
      {delays.map((delay) => (
        <span
          key={delay}
          className={`h-full w-[3px] rounded-full bg-[#30D158] ${motionClass(reducedMotion, "hero-demo-wave")}`}
          style={reducedMotion ? { transform: "scaleY(0.6)" } : { animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

/* ---------- stage scenes (one per job, in that tool's vernacular) ---------- */

function CallScene({ beat, reducedMotion }: { beat: number; reducedMotion: boolean }) {
  const answered = beat >= 1;
  const sent = beat >= 4;

  if (beat >= 3) {
    return (
      <div className="flex flex-col gap-2.5">
        <InboundBubble onDark meta="From the call · After hours">
          {COPY["missed-calls"].capture}
        </InboundBubble>
        <div className="flex flex-col items-end gap-1.5">
          {!sent && !reducedMotion ? <TypingDots onDark /> : null}
          <OutboundBubble
            onDark
            text={COPY["missed-calls"].draft}
            sent={sent}
            reducedMotion={reducedMotion}
          />
        </div>
        {sent ? (
          <div
            className={`rounded-xl bg-[#30D158]/10 px-3 py-2 ring-1 ring-[#30D158]/25 ${motionClass(reducedMotion, "hero-demo-notify")}`}
          >
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#5CE28A]">
              <Calendar className="h-3 w-3" aria-hidden />
              Thu 9:00 AM · Booked
            </p>
            <p className="mt-0.5 text-[12px] text-white/70">Roof leak · Chen</p>
          </div>
        ) : null}
      </div>
    );
  }

  if (!answered) {
    return (
      <div
        className={`flex flex-1 flex-col items-center justify-center gap-4 py-2 ${motionClass(reducedMotion, "hero-demo-call-in")}`}
      >
        <div className="flex flex-col items-center gap-2.5">
          <div className="relative h-14 w-14">
            {!reducedMotion ? (
              <>
                <span className="hero-demo-ring absolute inset-0 rounded-full bg-[#30D158]/40" />
                <span
                  className="hero-demo-ring absolute inset-0 rounded-full bg-[#30D158]/25"
                  style={{ animationDelay: "0.55s" }}
                />
              </>
            ) : null}
            <span
              aria-hidden
              className="relative flex h-14 w-14 select-none items-center justify-center rounded-full bg-gradient-to-b from-[#A6A6AD] to-[#75757C] text-[18px] font-semibold tracking-wide text-white"
            >
              MC
            </span>
          </div>
          <div className="text-center">
            <p className="text-[17px] font-semibold leading-tight text-white">
              Maria Chen
            </p>
            <p className="mt-1 text-[11px] text-white/65">
              Incoming · {COPY["missed-calls"].incoming}
            </p>
          </div>
        </div>
        <span
          aria-hidden
          className="pointer-events-none mt-1 flex items-center gap-14"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF453A] text-white shadow-[0_6px_16px_-6px_rgba(255,69,58,0.7)]">
            <PhoneOff className="h-5 w-5" />
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#30D158] text-white shadow-[0_6px_16px_-6px_rgba(48,209,88,0.7)]">
            <Phone className="h-5 w-5" />
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-white/[0.08] px-3.5 py-3 ring-1 ring-[#30D158]/25">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0">
            <span
              aria-hidden
              className="relative flex h-10 w-10 select-none items-center justify-center rounded-full bg-gradient-to-b from-[#A6A6AD] to-[#75757C] text-[13px] font-semibold tracking-wide text-white"
            >
              MC
            </span>
            <span
              aria-hidden
              className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#30D158] ring-2 ring-[#1B241D]"
            >
              <Phone className="h-2.5 w-2.5 text-white" />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold leading-tight text-white">
              Maria Chen
            </p>
            <p className="mt-0.5 text-[11px] text-[#5CE28A]">
              Answered · {COPY["missed-calls"].incoming}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <VoiceWave reducedMotion={reducedMotion} />
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50">
              AI receptionist
            </span>
          </div>
        </div>
      </div>
      {beat >= 2 ? (
        <div
          className={`rounded-xl bg-white/[0.06] px-3 py-2.5 ring-1 ring-white/10 ${motionClass(reducedMotion, "hero-demo-notify")}`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Captured for you
          </p>
          <p className="mt-1 text-[13px] leading-[1.45] text-white">
            {COPY["missed-calls"].capture}
          </p>
        </div>
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
    <div className="flex flex-col gap-2.5">
      <p
        aria-hidden
        className="text-center text-[10px] font-medium text-brand-dark/40 dark:text-white/40"
      >
        3 days ago
      </p>
      <InboundBubble>Can I still get that estimate for the back roof?</InboundBubble>
      {beat >= 1 ? (
        <ActionChip text={COPY["quiet-leads"].line} reducedMotion={reducedMotion} />
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
    <div className="flex flex-col gap-2.5">
      {beat < 1 ? (
        <div className="rounded-xl bg-brand-dark/[0.03] px-3 py-2.5 ring-1 ring-brand-dark/[0.05] dark:bg-white/[0.05] dark:ring-white/[0.06]">
          <p
            className="flex items-center gap-1 text-brand-dark/20 dark:text-white/25"
            aria-hidden
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-3.5 w-3.5" />
            ))}
          </p>
          <p className="mt-1.5 text-[13px] leading-[1.45] text-brand-dark/70 dark:text-brand-cream/70">
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
          className={`rounded-xl bg-white px-3 py-2.5 shadow-[0_2px_10px_-4px_rgba(20,20,19,0.12)] ring-1 ring-brand-dark/[0.05] dark:bg-white/[0.07] dark:shadow-none dark:ring-white/[0.08] ${motionClass(reducedMotion, "hero-demo-notify")}`}
        >
          <div className="flex items-center gap-2">
            <Avatar initials="M" size="sm" />
            <div className="min-w-0">
              <p className="text-[12px] font-semibold leading-tight text-brand-dark dark:text-brand-cream">
                Maria Chen
              </p>
              <p
                className="mt-0.5 flex items-center gap-0.5 text-[#E6A817]"
                aria-label="5 star review"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3 w-3 fill-current" aria-hidden />
                ))}
                <span className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-brand-dark/45 dark:text-white/50">
                  5 stars
                </span>
              </p>
            </div>
          </div>
          <p className="mt-1.5 text-[13px] leading-[1.45] text-brand-dark dark:text-brand-cream">
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

const OPEN_ESTIMATES = [
  { name: "Sam", detail: "Estimate · 11 days", focus: true },
  { name: "Lee", detail: "Estimate · 4 days", focus: false },
] as const;

function QuotesScene({ beat, reducedMotion }: { beat: number; reducedMotion: boolean }) {
  const sent = beat >= 2;
  const held = beat >= 3;

  return (
    <div className="flex flex-1 flex-col gap-2.5">
      <div className="rounded-xl bg-brand-dark/[0.03] px-3 py-2.5 ring-1 ring-brand-dark/[0.05] dark:bg-white/[0.05] dark:ring-white/[0.06]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-dark/45 dark:text-white/45">
          2 open estimates
        </p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {OPEN_ESTIMATES.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between gap-2 text-[12px] leading-snug"
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#BF5AF2]"
                />
                <span className="truncate text-brand-dark/80 dark:text-brand-cream/80">
                  {item.name}
                  <span className="text-brand-dark/45 dark:text-white/45">
                    {" "}
                    · {item.detail}
                  </span>
                </span>
              </span>
              {item.focus && held ? (
                <span className="shrink-0 rounded-full bg-[#30D158]/12 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#1E9E4A] dark:text-[#5CE28A]">
                  Held
                </span>
              ) : item.focus ? (
                <span className="shrink-0 text-[10.5px] text-brand-dark/45 dark:text-white/45">
                  No reply
                </span>
              ) : (
                <span className="shrink-0 text-[10.5px] text-brand-dark/45 dark:text-white/45">
                  Viewed
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-col gap-2.5">
        {beat >= 1 && !held ? (
          <ActionChip text={COPY.quotes.line} reducedMotion={reducedMotion} />
        ) : null}
        {beat >= 2 ? (
          <div className="flex flex-col items-end gap-1.5">
            {!sent && !reducedMotion ? <TypingDots /> : null}
            <OutboundBubble
              text={COPY.quotes.draft}
              sent={sent}
              reducedMotion={reducedMotion}
            />
          </div>
        ) : null}
        {held ? (
          <InboundBubble>{COPY.quotes.reply}</InboundBubble>
        ) : null}
      </div>
    </div>
  );
}

const DAY_SLOTS = [
  { time: "9:00 AM", title: "Roof inspection · Chen", focus: true },
  { time: "11:30 AM", title: "Gutter estimate · Reyes", focus: false },
  { time: "2:00 PM", title: "Leak check · Patel", focus: false },
] as const;

function CalendarScene({ beat, reducedMotion }: { beat: number; reducedMotion: boolean }) {
  const sent = beat >= 2;
  const confirmed = beat >= 3;

  return (
    <div className="flex flex-1 flex-col gap-2.5">
      <div className="rounded-xl bg-brand-dark/[0.03] px-3 py-2.5 ring-1 ring-brand-dark/[0.05] dark:bg-white/[0.05] dark:ring-white/[0.06]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-dark/45 dark:text-white/45">
          Tomorrow
        </p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {DAY_SLOTS.map((slot) => {
            const lockedIn = !slot.focus || confirmed;
            return (
              <li key={slot.time} className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className={`h-8 w-1 shrink-0 rounded-full ${
                    lockedIn ? "bg-[#30D158]" : "bg-[#FF375F]"
                  }`}
                />
                <div className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
                  <p className="min-w-0 truncate text-[12px] leading-snug">
                    <span className="font-semibold tabular-nums text-brand-dark dark:text-brand-cream">
                      {slot.time}
                    </span>
                    <span className="text-brand-dark/55 dark:text-brand-cream/55">
                      {" "}
                      · {slot.title}
                    </span>
                  </p>
                  {lockedIn ? (
                    <span className="shrink-0 rounded-full bg-[#30D158]/12 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#1E9E4A] dark:text-[#5CE28A]">
                      Confirmed
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-[#FF375F]/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#D81B54] dark:text-[#FF6482]">
                      Open
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-auto flex flex-col gap-2.5">
        {beat >= 1 && !confirmed ? (
          <ActionChip text={COPY.calendar.line} reducedMotion={reducedMotion} />
        ) : null}
        {beat >= 2 ? (
          <div className="flex flex-col items-end gap-1.5">
            {!sent && !reducedMotion ? <TypingDots /> : null}
            <OutboundBubble
              text={COPY.calendar.draft}
              sent={sent}
              reducedMotion={reducedMotion}
            />
          </div>
        ) : null}
        {confirmed ? (
          <InboundBubble>{COPY.calendar.reply}</InboundBubble>
        ) : null}
      </div>
    </div>
  );
}

const INBOX_ITEMS = [
  { label: "Supplier invoice · Hargrove Roofing Supply", status: "Filed" },
  { label: "Promo blast · marketing list", status: "Deleted" },
  { label: "New lead — roof quote, Cedar St", status: "Flagged for you" },
] as const;

function InboxScene({ beat, reducedMotion }: { beat: number; reducedMotion: boolean }) {
  const sorted = beat >= 1;
  const sent = beat >= 3;

  return (
    <div className="flex flex-1 flex-col gap-2.5">
      <div className="rounded-xl bg-brand-dark/[0.03] px-3 py-2.5 ring-1 ring-brand-dark/[0.05] dark:bg-white/[0.05] dark:ring-white/[0.06]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-dark/45 dark:text-white/45">
          {COPY.inbox.leak}
        </p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {INBOX_ITEMS.map((item, index) => (
            <li
              key={item.label}
              className="flex items-center justify-between gap-2 text-[12px] leading-snug"
            >
              <span
                className={`min-w-0 truncate ${
                  sorted && item.status !== "Flagged for you"
                    ? "text-brand-dark/40 line-through dark:text-brand-cream/40"
                    : "text-brand-dark/80 dark:text-brand-cream/80"
                }`}
              >
                {item.label}
              </span>
              {sorted ? (
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] ${
                    item.status === "Flagged for you"
                      ? "bg-[#5E5CE6]/12 text-[#5E5CE6] dark:text-[#8583FF]"
                      : "bg-[#30D158]/12 text-[#1E9E4A] dark:text-[#5CE28A]"
                  } ${motionClass(reducedMotion, "hero-demo-notify")}`}
                  style={
                    reducedMotion ? undefined : { animationDelay: `${index * 130}ms` }
                  }
                >
                  {item.status}
                </span>
              ) : (
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-dark/20 dark:bg-white/25"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-col gap-2.5">
        {beat >= 2 ? (
          <div className="flex flex-col items-end gap-1.5">
            {!sent && !reducedMotion ? <TypingDots /> : null}
            <OutboundBubble
              text={COPY.inbox.draft}
              sent={sent}
              reducedMotion={reducedMotion}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CheckInsScene({ beat, reducedMotion }: { beat: number; reducedMotion: boolean }) {
  const askSent = beat >= 2;
  const offerSent = beat >= 3;

  return (
    <div className="flex flex-1 flex-col gap-2.5">
      <div className="flex items-center gap-2.5 rounded-xl bg-brand-dark/[0.03] px-3 py-2.5 ring-1 ring-brand-dark/[0.05] dark:bg-white/[0.05] dark:ring-white/[0.06]">
        <Avatar initials="AR" size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-[13px] font-semibold text-brand-dark dark:text-brand-cream">
              Alex Rivera
            </p>
            <span className="shrink-0 rounded-full bg-[#2FB49B]/12 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[#0F8C6E] dark:text-[#4DD0AF]">
              Just finished
            </span>
          </div>
          <p className="mt-0.5 text-[12px] leading-[1.45] text-brand-dark/60 dark:text-brand-cream/60">
            Job finished Tuesday · gutter replacement
          </p>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-2.5">
        {beat >= 1 ? (
          <div className="flex flex-col items-end gap-1.5">
            {!askSent && !reducedMotion ? <TypingDots /> : null}
            <OutboundBubble
              text={COPY["check-ins"].ask}
              sent={askSent}
              reducedMotion={reducedMotion}
            />
          </div>
        ) : null}
        {beat >= 2 ? (
          <InboundBubble>{COPY["check-ins"].reply}</InboundBubble>
        ) : null}
        {beat >= 3 ? (
          <div className="flex flex-col items-end gap-1.5">
            {!offerSent && !reducedMotion ? <TypingDots /> : null}
            <OutboundBubble
              text={COPY["check-ins"].draft}
              sent={offerSent}
              reducedMotion={reducedMotion}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

const PAYROLL_ITEMS = [
  { name: "Mike Torres", status: "Hours in", flag: "OT" },
  { name: "Dana Cole", status: "Hours in", flag: null },
  { name: "Chris Nguyen", status: "Hours in", flag: null },
] as const;

function BusyworkScene({ beat, reducedMotion }: { beat: number; reducedMotion: boolean }) {
  const hoursIn = beat >= 1;
  const packetReady = beat >= 2;

  return (
    <div className="flex flex-1 flex-col gap-2.5">
      <div className="rounded-xl bg-brand-dark/[0.03] px-3 py-2.5 ring-1 ring-brand-dark/[0.05] dark:bg-white/[0.05] dark:ring-white/[0.06]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-dark/45 dark:text-white/45">
          {COPY.busywork.leak}
        </p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {PAYROLL_ITEMS.map((item, index) => (
            <li
              key={item.name}
              className="flex items-center justify-between gap-2 text-[12px] leading-snug"
            >
              <span className="min-w-0 truncate text-brand-dark/80 dark:text-brand-cream/80">
                {item.name}
                <span className="text-brand-dark/45 dark:text-white/45">
                  {" "}
                  · timesheet
                </span>
              </span>
              {hoursIn ? (
                <span className="flex shrink-0 items-center gap-1">
                  {item.flag ? (
                    <span className="rounded-full bg-[#FF453A]/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#D0342A] dark:text-[#FF6961]">
                      {item.flag}
                    </span>
                  ) : null}
                  <span
                    className={`rounded-full bg-[#30D158]/12 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#1E9E4A] dark:text-[#5CE28A] ${motionClass(reducedMotion, "hero-demo-notify")}`}
                    style={
                      reducedMotion
                        ? undefined
                        : { animationDelay: `${index * 130}ms` }
                    }
                  >
                    {item.status}
                  </span>
                </span>
              ) : (
                <span className="shrink-0 rounded-full bg-[#FF453A]/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[#D0342A] dark:text-[#FF6961]">
                  Missing
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      {packetReady ? (
        <div
          className={`rounded-xl bg-[#32ADE6]/10 px-3 py-2 ring-1 ring-[#32ADE6]/20 ${motionClass(reducedMotion, "hero-demo-notify")}`}
        >
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0E7DAF] dark:text-[#6FC9F2]">
            <ClipboardList className="h-3 w-3" aria-hidden />
            Packet ready for Gusto
          </p>
          <p className="mt-0.5 text-[12px] text-brand-dark/55 dark:text-brand-cream/55">
            3 timesheets in · 1 OT flagged
          </p>
        </div>
      ) : null}
      {hoursIn && !packetReady ? (
        <ActionChip text={COPY.busywork.line} reducedMotion={reducedMotion} />
      ) : null}
    </div>
  );
}

const OUTREACH_CHANNELS = [
  { channel: "Email", count: "42", status: "Sent" },
  { channel: "Text", count: "42", status: "Sent" },
  { channel: "Voicemail", count: "18", status: "Dropped" },
] as const;

function OutreachScene({ beat, reducedMotion }: { beat: number; reducedMotion: boolean }) {
  const sending = beat >= 1;
  const sent = beat >= 3;

  return (
    <div className="flex flex-1 flex-col gap-2.5">
      <div className="rounded-xl bg-brand-dark/[0.03] px-3 py-2.5 ring-1 ring-brand-dark/[0.05] dark:bg-white/[0.05] dark:ring-white/[0.06]">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[13px] font-semibold text-brand-dark dark:text-brand-cream">
            Fall roof-check special
          </p>
          <span className="shrink-0 rounded-full bg-[#E0409A]/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[#C22C7F] dark:text-[#F284C4]">
            {sent ? "Sent" : sending ? "Sending" : "Ready"}
          </span>
        </div>
        <p className="mt-0.5 text-[12px] leading-[1.45] text-brand-dark/60 dark:text-brand-cream/60">
          42 past customers · not contacted this season
        </p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {OUTREACH_CHANNELS.map((item, index) => (
            <li
              key={item.channel}
              className="flex items-center justify-between gap-2 text-[12px] leading-snug"
            >
              <span className="min-w-0 truncate text-brand-dark/80 dark:text-brand-cream/80">
                {item.channel}
                <span className="text-brand-dark/45 dark:text-white/45">
                  {" "}
                  · {item.count}
                </span>
              </span>
              {sending ? (
                <span
                  className={`shrink-0 rounded-full bg-[#E0409A]/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#C22C7F] dark:text-[#F284C4] ${motionClass(reducedMotion, "hero-demo-notify")}`}
                  style={
                    reducedMotion ? undefined : { animationDelay: `${index * 130}ms` }
                  }
                >
                  {beat >= 2 ? item.status : "Queued"}
                </span>
              ) : (
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-dark/20 dark:bg-white/25"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-col gap-2.5">
        {beat >= 2 ? (
          <div
            className={`rounded-xl bg-brand-dark/[0.03] px-3 py-2 ring-1 ring-brand-dark/[0.05] dark:bg-white/[0.05] dark:ring-white/[0.06] ${motionClass(reducedMotion, "hero-demo-notify")}`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-dark/45 dark:text-white/45">
              Email
            </p>
            <p className="mt-0.5 text-[12px] font-medium text-brand-dark dark:text-brand-cream">
              Free roof check before storm season
            </p>
          </div>
        ) : null}
        {beat >= 3 ? (
          <div className="flex flex-col items-end gap-1.5">
            <OutboundBubble
              text={COPY.outreach.draft}
              sent={sent}
              reducedMotion={reducedMotion}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- stage surfaces: each job gets its tool's material ---------- */

function MessagesStage({
  initials,
  name,
  meta,
  surfaceClass,
  eyebrow,
  children,
}: {
  initials: string;
  name: string;
  meta: string;
  surfaceClass: string;
  eyebrow: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className={`hero-demo-tool flex h-full flex-col rounded-[1.15rem] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_30px_-18px_rgba(20,20,19,0.25)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${surfaceClass}`}
    >
      {eyebrow}
      <div className="mb-2 flex flex-col items-center gap-1 border-b border-brand-dark/[0.06] pb-2 dark:border-white/[0.07]">
        <Avatar initials={initials} size="md" />
        <p className="text-[12px] font-semibold leading-none text-brand-dark dark:text-brand-cream">
          {name}
        </p>
        <p className="text-[10px] text-brand-dark/45 dark:text-white/45">{meta}</p>
      </div>
      <div className="flex flex-1 flex-col justify-end">{children}</div>
    </div>
  );
}

function LightToolStage({
  eyebrow,
  children,
  surfaceClass,
}: {
  eyebrow: ReactNode;
  children: ReactNode;
  surfaceClass: string;
}) {
  return (
    <div
      className={`hero-demo-tool flex h-full flex-col rounded-[1.15rem] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_30px_-18px_rgba(20,20,19,0.22)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${surfaceClass}`}
    >
      {eyebrow}
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}

export function Stage({
  jobId,
  beat,
  reducedMotion,
}: {
  jobId: JobId;
  beat: number;
  reducedMotion: boolean;
}) {
  switch (jobId) {
    case "missed-calls":
      return (
        <div className="hero-demo-tool flex h-full flex-col rounded-[1.15rem] bg-gradient-to-b from-[#25302A] to-[#111713] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_10px_30px_-16px_rgba(0,0,0,0.55)] ring-1 ring-[#30D158]/[0.22]">
          <StageEyebrow
            icon={<Phone className="h-3 w-3" aria-hidden />}
            label="Phone"
            className="text-[#30D158]/85"
          />
          <div
            className={`flex flex-1 flex-col ${beat >= 3 ? "justify-end" : ""}`}
          >
            <CallScene beat={beat} reducedMotion={reducedMotion} />
          </div>
        </div>
      );
    case "quiet-leads":
      return (
        <MessagesStage
          initials="T"
          name="Tom"
          meta={COPY["quiet-leads"].leak}
          surfaceClass="bg-[#F7FAFF] ring-1 ring-[#0A84FF]/[0.15] dark:bg-[#181D25] dark:ring-[#0A84FF]/[0.24]"
          eyebrow={
            <StageEyebrow
              icon={<MessageCircle className="h-3 w-3" aria-hidden />}
              label="Leads"
              className="text-[#0A84FF]"
            />
          }
        >
          <QuietLeadsScene beat={beat} reducedMotion={reducedMotion} />
        </MessagesStage>
      );
    case "reviews":
      return (
        <LightToolStage
          surfaceClass="bg-[#FFFCF4] ring-1 ring-[#E6A817]/[0.18] dark:bg-[#211F19] dark:ring-[#E6A817]/[0.15]"
          eyebrow={
            <StageEyebrow
              icon={<Star className="h-3 w-3 fill-current" aria-hidden />}
              label="Reviews"
              className="text-[#B8860B] dark:text-[#E6A817]"
            />
          }
        >
          <ReviewsScene beat={beat} reducedMotion={reducedMotion} />
        </LightToolStage>
      );
    case "quotes":
      return (
        <LightToolStage
          surfaceClass="bg-[#FCFAFE] ring-1 ring-[#BF5AF2]/[0.14] dark:bg-[#201B23] dark:ring-[#BF5AF2]/[0.2]"
          eyebrow={
            <StageEyebrow
              icon={<ListChecks className="h-3 w-3" aria-hidden />}
              label="Quotes"
              className="text-[#9333CE] dark:text-[#D9A2FF]"
            />
          }
        >
          <QuotesScene beat={beat} reducedMotion={reducedMotion} />
        </LightToolStage>
      );
    case "calendar":
      return (
        <LightToolStage
          surfaceClass="bg-[#FFFBFC] ring-1 ring-[#FF375F]/[0.14] dark:bg-[#221A1D] dark:ring-[#FF375F]/[0.2]"
          eyebrow={
            <StageEyebrow
              icon={<Calendar className="h-3 w-3" aria-hidden />}
              label="Calendar"
              className="text-[#D81B54] dark:text-[#FF6482]"
            />
          }
        >
          <CalendarScene beat={beat} reducedMotion={reducedMotion} />
        </LightToolStage>
      );
    case "inbox":
      return (
        <LightToolStage
          surfaceClass="bg-[#FAFAFE] ring-1 ring-[#5E5CE6]/[0.14] dark:bg-[#1B1B22] dark:ring-[#5E5CE6]/[0.22]"
          eyebrow={
            <StageEyebrow
              icon={<Mail className="h-3 w-3" aria-hidden />}
              label="Inbox triage"
              className="text-[#5E5CE6] dark:text-[#8583FF]"
            />
          }
        >
          <InboxScene beat={beat} reducedMotion={reducedMotion} />
        </LightToolStage>
      );
    case "check-ins":
      return (
        <LightToolStage
          surfaceClass="bg-[#F5FBF9] ring-1 ring-[#2FB49B]/[0.18] dark:bg-[#17211E] dark:ring-[#2FB49B]/[0.24]"
          eyebrow={
            <StageEyebrow
              icon={<Users className="h-3 w-3" aria-hidden />}
              label="Customers"
              className="text-[#0F8C6E] dark:text-[#4DD0AF]"
            />
          }
        >
          <CheckInsScene beat={beat} reducedMotion={reducedMotion} />
        </LightToolStage>
      );
    case "busywork":
      return (
        <LightToolStage
          surfaceClass="bg-[#FAFDFE] ring-1 ring-[#32ADE6]/[0.16] dark:bg-[#191F22] dark:ring-[#32ADE6]/[0.22]"
          eyebrow={
            <StageEyebrow
              icon={<ClipboardList className="h-3 w-3" aria-hidden />}
              label="Payroll"
              className="text-[#0E7DAF] dark:text-[#6FC9F2]"
            />
          }
        >
          <BusyworkScene beat={beat} reducedMotion={reducedMotion} />
        </LightToolStage>
      );
    case "outreach":
      return (
        <LightToolStage
          surfaceClass="bg-[#FEFAFC] ring-1 ring-[#E0409A]/[0.15] dark:bg-[#221A1F] dark:ring-[#E0409A]/[0.22]"
          eyebrow={
            <StageEyebrow
              icon={<Megaphone className="h-3 w-3" aria-hidden />}
              label="Campaigns"
              className="text-[#C22C7F] dark:text-[#F284C4]"
            />
          }
        >
          <OutreachScene beat={beat} reducedMotion={reducedMotion} />
        </LightToolStage>
      );
    default: {
      const _exhaustive: never = jobId;
      return _exhaustive;
    }
  }
}

/* ---------- waiting rail: the other jobs, still sitting there ---------- */

export function WaitGlyph({
  jobId,
  reducedMotion,
}: {
  jobId: JobId;
  reducedMotion: boolean;
}) {
  switch (jobId) {
    case "missed-calls":
      return (
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-[#30D158] text-white ${motionClass(reducedMotion, "hero-demo-wait-ring")}`}
        >
          <Phone className="h-3 w-3" aria-hidden />
        </span>
      );
    case "quiet-leads":
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#0A84FF] text-white">
          <MessageCircle className="h-3 w-3" aria-hidden />
        </span>
      );
    case "reviews":
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#E6A817] text-white">
          <Star className="h-3 w-3 fill-current" aria-hidden />
        </span>
      );
    case "quotes":
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#BF5AF2] text-white">
          <ListChecks className="h-3 w-3" aria-hidden />
        </span>
      );
    case "calendar":
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#FF375F] text-white">
          <Calendar className="h-3 w-3" aria-hidden />
        </span>
      );
    case "inbox":
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#5E5CE6] text-white">
          <Mail className="h-3 w-3" aria-hidden />
        </span>
      );
    case "check-ins":
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#2FB49B] text-white">
          <Users className="h-3 w-3" aria-hidden />
        </span>
      );
    case "busywork":
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#32ADE6] text-white">
          <ClipboardList className="h-3 w-3" aria-hidden />
        </span>
      );
    case "outreach":
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#E0409A] text-white">
          <Megaphone className="h-3 w-3" aria-hidden />
        </span>
      );
    default: {
      const _exhaustive: never = jobId;
      return _exhaustive;
    }
  }
}

export function WaitVignette({ jobId }: { jobId: JobId }) {
  switch (jobId) {
    case "missed-calls":
      return (
        <>
          <span className="mt-2 block truncate text-[12.5px] font-semibold text-brand-dark dark:text-brand-cream">
            Maria Chen
          </span>
          <span className="mt-0.5 block truncate text-[11px] text-brand-dark/50 dark:text-white/50">
            Incoming · 7:42 PM
          </span>
        </>
      );
    case "quiet-leads":
      return (
        <>
          <span className="mt-2 block w-fit max-w-full truncate rounded-[10px] rounded-bl-[4px] bg-[#E9E9EB] px-2 py-1 text-[11px] text-brand-dark dark:bg-[#3A3A3C] dark:text-white">
            Can I still get that estimate…
          </span>
          <span className="mt-1 block truncate text-[11px] text-brand-dark/50 dark:text-white/50">
            Tom · 3 days quiet
          </span>
        </>
      );
    case "reviews":
      return (
        <>
          <span
            className="mt-2.5 flex items-center gap-0.5 text-brand-dark/20 dark:text-white/25"
            aria-hidden
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-3 w-3" />
            ))}
          </span>
          <span className="mt-1 block truncate text-[11px] text-brand-dark/50 dark:text-white/50">
            No ask sent yet
          </span>
        </>
      );
    case "quotes":
      return (
        <>
          <span className="mt-2 flex items-center gap-1.5">
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#BF5AF2]"
            />
            <span className="truncate text-[12.5px] font-semibold text-brand-dark dark:text-brand-cream">
              Sam · Estimate
            </span>
          </span>
          <span className="mt-0.5 block truncate text-[11px] text-brand-dark/50 dark:text-white/50">
            11 days · no reply
          </span>
        </>
      );
    case "calendar":
      return (
        <>
          <span className="mt-2 flex items-center gap-1.5">
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF375F]"
            />
            <span className="truncate text-[12.5px] font-semibold text-brand-dark dark:text-brand-cream">
              Tomorrow · 9:00 AM
            </span>
          </span>
          <span className="mt-0.5 block truncate text-[11px] text-brand-dark/50 dark:text-white/50">
            Inspection · unconfirmed
          </span>
        </>
      );
    case "inbox":
      return (
        <>
          <span className="mt-2 block truncate text-[12.5px] font-semibold text-brand-dark dark:text-brand-cream">
            7 unsorted overnight
          </span>
          <span className="mt-0.5 block truncate text-[11px] text-brand-dark/50 dark:text-white/50">
            Invoices · spam · 1 lead
          </span>
        </>
      );
    case "check-ins":
      return (
        <>
          <span className="mt-2 block truncate text-[12.5px] font-semibold text-brand-dark dark:text-brand-cream">
            Alex Rivera
          </span>
          <span className="mt-0.5 block truncate text-[11px] text-brand-dark/50 dark:text-white/50">
            Job finished Tuesday
          </span>
        </>
      );
    case "busywork":
      return (
        <>
          <span className="mt-2 block truncate text-[12.5px] font-semibold text-brand-dark dark:text-brand-cream">
            Friday payroll
          </span>
          <span className="mt-0.5 block truncate text-[11px] text-brand-dark/50 dark:text-white/50">
            3 timesheets missing
          </span>
        </>
      );
    case "outreach":
      return (
        <>
          <span className="mt-2 block truncate text-[12.5px] font-semibold text-brand-dark dark:text-brand-cream">
            Fall special ready
          </span>
          <span className="mt-0.5 block truncate text-[11px] text-brand-dark/50 dark:text-white/50">
            Email · text · voicemail
          </span>
        </>
      );
    default: {
      const _exhaustive: never = jobId;
      return _exhaustive;
    }
  }
}
