"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import type { AccordionItem } from "./script";

export function DetailPanel({
  item,
  onClose,
}: {
  item: AccordionItem | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!item) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = [
        ...root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.hasAttribute("aria-hidden"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Close details"
        className="absolute inset-0 bg-brand-dark/25 dark:bg-black/50"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`detail-panel absolute top-2 right-2 bottom-2 flex w-[min(620px,calc(100vw-16px))] flex-col overflow-hidden rounded-[16px] max-[639px]:left-2 max-[639px]:w-auto ${
          reducedMotion ? "" : "ai-hq-section-in"
        }`}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-7 pb-4 min-[767px]:px-8">
          <div>
            <p className="section-eyebrow">{item.code}</p>
            <h3
              id={titleId}
              className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-tight text-brand-dark dark:text-brand-cream min-[767px]:text-[32px]"
            >
              {item.title}
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              {item.line}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-black/[0.08] text-lg text-brand-dark/60 dark:border-white/[0.1] dark:text-brand-cream/60"
          >
            ×
          </button>
        </div>

        <div className="dotted-grid mx-6 grid grid-cols-3 gap-2 rounded-[12px] border border-black/[0.06] p-3 min-[767px]:mx-8 dark:border-white/[0.06]">
          {item.strip.map((label) => (
            <div
              key={label}
              className="rounded-[10px] border border-black/[0.08] bg-white/80 px-2.5 py-3 text-center text-[11px] font-medium text-brand-dark/70 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-brand-cream/70"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 min-[767px]:px-8">
          <p className="section-eyebrow">How it works</p>
          <p className="mt-3 text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
            {item.how}
          </p>

          <p className="section-eyebrow mt-8">Try asking</p>
          <p className="mt-3 text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
            {item.tryAsk}
          </p>

          <p className="section-eyebrow mt-8">What the hire delivers</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.delivers.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-black/[0.08] bg-white/70 px-3 py-1 text-[12px] text-brand-dark/70 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-brand-cream/70"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-black/[0.06] px-6 py-4 min-[767px]:px-8 dark:border-white/[0.06]">
          <Link
            href="/book"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            Book a call
          </Link>
        </div>
      </div>
    </div>
  );
}
