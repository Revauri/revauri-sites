"use client";

import type { CSSProperties, ComponentType, PointerEvent } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { StaggerChildren } from "@/components/motion-wrappers";
import {
  InboxMock,
  LeadFollowUpMock,
  MissedCallMock,
  PayrollMock,
  QuotesMock,
  RemindersMock,
  ReviewsMock,
  WinbackMock,
  type IllustrationProps,
} from "./capability-illustrations";

type Capability = {
  category: string;
  title: string;
  description: string;
  accent: string;
  Illustration: ComponentType<IllustrationProps>;
};

const CAPABILITIES: Capability[] = [
  {
    category: "Front desk",
    title: "The phone",
    description:
      "Missed calls are lost jobs. A voice hire picks up what currently goes to voicemail.",
    accent: "#D97757",
    Illustration: MissedCallMock,
  },
  {
    category: "Revenue",
    title: "Lead follow-up",
    description:
      "Follows up when a call, form, or lead goes silent so they do not call the next name.",
    accent: "#C9A24E",
    Illustration: LeadFollowUpMock,
  },
  {
    category: "Revenue",
    title: "Quotes",
    description:
      "Sends the next nudge so estimates do not die. Nothing goes out until you approve the wording.",
    accent: "#2F8F6B",
    Illustration: QuotesMock,
  },
  {
    category: "Reputation",
    title: "Reviews",
    description:
      "Asks after a good job, requests the review, and replies to new ones.",
    accent: "#3B6FD4",
    Illustration: ReviewsMock,
  },
  {
    category: "Scheduling",
    title: "Reminders & no-shows",
    description:
      "Reminds them before the appointment and follows up if they miss it.",
    accent: "#9B59B6",
    Illustration: RemindersMock,
  },
  {
    category: "Admin",
    title: "Inbox",
    description:
      "Handles the repetitive replies, confirmations, and reminders clogging the inbox.",
    accent: "#1A9BA8",
    Illustration: InboxMock,
  },
  {
    category: "Admin",
    title: "Payroll",
    description:
      "Prepares the weekly packet — hours, invoices, receipts — and sends it where you run payroll.",
    accent: "#C45C6A",
    Illustration: PayrollMock,
  },
  {
    category: "Retention",
    title: "Outreach",
    description:
      "Checks back with past customers who have gone quiet and brings them back on the books.",
    accent: "#3D6B8A",
    Illustration: WinbackMock,
  },
];

const TILT_DEG = 7;
const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

const mix = (pct: number) => `color-mix(in srgb, var(--accent) ${pct}%, transparent)`;

function CapabilityCard({
  capability,
  index,
  reducedMotion,
}: {
  capability: Capability;
  index: number;
  reducedMotion: boolean;
}) {
  const { category, title, description, accent, Illustration } = capability;
  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * TILT_DEG);
    rotateY.set(px * TILT_DEG);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const accentVars = {
    "--accent": accent,
  } as CSSProperties;

  return (
    <div
      className="h-full [--ink:#141413] dark:[--ink:#FAF9F5]"
      style={{ perspective: 900, ...accentVars }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <motion.div
        className="group relative h-full rounded-xl"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={reducedMotion ? undefined : { y: -3.2 }}
        transition={{ type: "spring", ...SPRING }}
      >
        {/* glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{
            boxShadow: `0 24px 60px ${mix(14)}, inset 0 0 0 1px ${mix(21)}`,
          }}
        />

        <Link
          href="/book"
          aria-label={`Hire for ${title}`}
          className="relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-xl border bg-white/60 transition-[border-color,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-white/[0.04] lg:min-h-[480px]"
          style={{
            borderColor: mix(14),
            outlineColor: accent,
            color: accent,
          }}
        >
          {/* hover surface tint + border */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              backgroundColor: mix(5),
              boxShadow: `inset 0 0 0 1px ${mix(20)}`,
            }}
          />

          {/* illustration header */}
          <div className="relative h-[220px] shrink-0 overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: `radial-gradient(${mix(5)} 0%, transparent 70%)` }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `radial-gradient(${mix(13)} 0%, transparent 70%)` }}
            />
            <div className="relative z-10 h-full w-full p-4">
              <Illustration animate={!reducedMotion} />
            </div>
          </div>

          <div aria-hidden className="h-px shrink-0" style={{ backgroundColor: mix(10) }} />

          {/* body */}
          <div className="relative flex flex-1 flex-col gap-4 px-7 pt-7 pb-3.5">
            <div className="flex items-center justify-between">
              <span
                className="rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest"
                style={{ backgroundColor: mix(10), borderColor: mix(22) }}
              >
                {category}
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-brand-dark/40 dark:text-brand-cream/40">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-[clamp(1.125rem,1.8vw,1.5rem)] font-medium tracking-[-0.015em] text-brand-dark dark:text-brand-cream">
              {title}
            </h3>

            <p className="line-clamp-3 flex-1 text-xs leading-[1.8] text-brand-dark/55 dark:text-brand-cream/55">
              {description}
            </p>

            <div
              className="mt-auto flex items-center justify-between border-t pt-3"
              style={{ borderColor: mix(10) }}
            >
              <span className="text-xs font-medium uppercase tracking-widest opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                Hire for this
              </span>
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300 group-hover:bg-(--accent) group-hover:text-white"
                style={{ borderColor: mix(22) }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 6H11M11 6L7 2M11 6L7 10"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export function CapabilityCards() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <StaggerChildren className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CAPABILITIES.map((capability, index) => (
        <CapabilityCard
          key={capability.title}
          capability={capability}
          index={index}
          reducedMotion={reducedMotion}
        />
      ))}
    </StaggerChildren>
  );
}
