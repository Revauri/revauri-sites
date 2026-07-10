"use client";

import { ArrowUpRight } from "lucide-react";
import type { BookingSlot } from "@/lib/chat/calendly";

export type BookingCardProps = {
  slots?: BookingSlot[];
  fallback?: boolean;
};

const CARD_CLASS =
  "flex flex-col gap-1.5 rounded-xl border border-brand-orange/20 bg-brand-orange/[0.06] p-3 dark:border-brand-orange/30 dark:bg-brand-orange/10";

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
  const labeled = (slots ?? [])
    .map((slot) => ({ ...slot, label: formatSlotLabel(slot.startTime) }))
    .filter((slot): slot is BookingSlot & { label: string } => slot.label !== null);

  if (fallback || labeled.length === 0) {
    return (
      <div className={CARD_CLASS}>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-orange">
          FREE STRATEGY CALL
        </span>
        <p className="text-xs text-brand-mid-gray">
          15 minutes with the Revauri team — pick any time that works for you.
        </p>
        <a
          href="/book"
          className="mt-1 inline-block w-fit rounded-full bg-brand-dark px-3.5 py-2 text-xs font-semibold text-white dark:bg-brand-cream dark:text-brand-dark"
        >
          Book a call
        </a>
      </div>
    );
  }

  return (
    <div className={CARD_CLASS}>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-orange">
        FREE STRATEGY CALL
      </span>
      <p className="text-xs text-brand-mid-gray">15 minutes with the Revauri team — grab a time:</p>
      <div className="mt-0.5 flex flex-col gap-1.5">
        {labeled.map((slot) => (
          <a
            key={slot.startTime}
            href={slot.schedulingUrl}
            target="_blank"
            rel="noopener"
            className="group flex items-center justify-between rounded-lg border border-brand-light-gray/60 bg-brand-white px-3 py-2 text-xs font-medium text-brand-dark transition-colors hover:border-brand-orange/50 dark:border-brand-mid-gray/30 dark:bg-brand-dark/40 dark:text-brand-cream dark:hover:border-brand-orange/60"
          >
            {slot.label}
            <ArrowUpRight className="h-3.5 w-3.5 text-brand-mid-gray transition-colors group-hover:text-brand-orange" />
          </a>
        ))}
      </div>
      <a
        href="/book"
        className="mt-0.5 w-fit text-xs font-medium text-brand-mid-gray underline underline-offset-2 hover:text-brand-orange"
      >
        See all times →
      </a>
    </div>
  );
}
