"use client";

import { ArrowUpRight } from "lucide-react";
import type { BookingSlot } from "@/lib/chat/calendly";

export type BookingCardProps = {
  slots?: BookingSlot[];
  fallback?: boolean;
};

const CARD_CLASS =
  "flex flex-col gap-1.5 rounded-2xl border border-brand-orange/15 bg-gradient-to-b from-brand-orange/[0.08] to-brand-orange/[0.03] p-3.5 dark:border-brand-orange/25 dark:from-brand-orange/[0.14] dark:to-brand-orange/[0.06]";

// Formats an ISO start time in the visitor's local timezone,
// e.g. "Wed, Jul 8 · 2:30 PM".
function formatSlotLabel(startTime: string): string | null {
  const date = new Date(startTime);
  if (Number.isNaN(date.getTime())) return null;
  const day = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
  return `${day} · ${time}`;
}

export function BookingCard({ slots, fallback }: BookingCardProps) {
  // Future times only: a card restored from an earlier session can carry
  // slots that have since passed — those must not be clickable, and a card
  // whose slots are all stale degrades to the /book fallback below.
  const now = Date.now();
  const labeled = (slots ?? [])
    .filter((slot) => new Date(slot.startTime).getTime() > now)
    .map((slot) => ({ ...slot, label: formatSlotLabel(slot.startTime) }))
    .filter((slot): slot is BookingSlot & { label: string } => slot.label !== null);

  if (fallback || labeled.length === 0) {
    return (
      <div className={CARD_CLASS}>
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand-orange">
          FREE STRATEGY CALL
        </span>
        <p className="text-xs leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
          15 minutes with the Revauri team — pick any time that works for you.
        </p>
        <a
          href="/book#scheduler"
          className="mt-1 inline-flex w-fit items-center rounded-xl bg-brand-dark px-3.5 py-2 text-xs font-semibold text-brand-cream shadow-sm transition-all hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 dark:bg-brand-cream dark:text-brand-dark"
        >
          Book a call
        </a>
      </div>
    );
  }

  return (
    <div className={CARD_CLASS}>
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand-orange">
        FREE STRATEGY CALL
      </span>
      <p className="text-xs leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">15 minutes with the Revauri team — grab a time:</p>
      <div className="mt-1 flex flex-col gap-1.5">
        {labeled.map((slot) => (
          <a
            key={slot.startTime}
            href={slot.schedulingUrl}
            target="_blank"
            rel="noopener"
            className="group flex items-center justify-between rounded-xl border border-brand-dark/[0.06] bg-brand-white px-3 py-2 text-xs font-medium text-brand-dark shadow-sm transition-all hover:border-brand-orange/50 hover:shadow-[0_6px_16px_-8px_rgba(217,119,87,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-brand-cream dark:hover:border-brand-orange/60"
          >
            {slot.label}
            <ArrowUpRight className="h-3.5 w-3.5 text-brand-dark/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-orange dark:text-brand-cream/30" />
          </a>
        ))}
      </div>
      <a
        href="/book#scheduler"
        className="mt-1 w-fit rounded-sm text-xs font-medium text-brand-dark/60 underline decoration-brand-dark/20 underline-offset-[3px] transition-colors hover:text-brand-orange hover:decoration-brand-orange/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 dark:text-brand-cream/60 dark:decoration-brand-cream/20"
      >
        See all times →
      </a>
    </div>
  );
}
