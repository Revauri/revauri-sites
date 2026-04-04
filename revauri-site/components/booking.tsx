"use client";

import { useEffect, useRef, useState } from "react";
import { FadeInWhenVisible } from "./motion-wrappers";

const CALENDLY_URL =
  "https://calendly.com/joseph-revauri/website-strategy-call";
const CALENDLY_EMBED_URL = `${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&hide_event_type_details=1&background_color=ffffff&text_color=141413&primary_color=d97757`;

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

export function Booking() {
  const embedRef = useRef<HTMLDivElement>(null);
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);

  useEffect(() => {
    const onCalendlyMessage = (event: MessageEvent) => {
      if (
        typeof event.data === "object" &&
        event.data !== null &&
        "event" in event.data &&
        typeof event.data.event === "string" &&
        event.data.event.startsWith("calendly.")
      ) {
        setIsCalendlyLoaded(true);
      }
    };

    const initializeEmbed = () => {
      if (!embedRef.current || !window.Calendly?.initInlineWidget) return;
      setIsCalendlyLoaded(false);
      embedRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: CALENDLY_EMBED_URL,
        parentElement: embedRef.current,
        resize: true,
      });
      window.setTimeout(() => setIsCalendlyLoaded(true), 1800);
    };

    window.addEventListener("message", onCalendlyMessage);

    if (window.Calendly?.initInlineWidget) {
      initializeEmbed();
      return () => window.removeEventListener("message", onCalendlyMessage);
    }

    const existingScript = document.querySelector(
      'script[src*="assets.calendly.com/assets/external/widget.js"]',
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", initializeEmbed);
      initializeEmbed();
      return () => {
        window.removeEventListener("message", onCalendlyMessage);
        existingScript.removeEventListener("load", initializeEmbed);
      };
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = initializeEmbed;
    document.body.appendChild(script);

    return () => {
      window.removeEventListener("message", onCalendlyMessage);
    };
  }, []);

  useEffect(() => {
    const embedElement = embedRef.current;
    if (!embedElement || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      const nextHeight = entries[0]?.contentRect.height ?? 0;

      if (nextHeight > 0) {
        setMeasuredHeight((currentHeight) => {
          const roundedHeight = Math.ceil(nextHeight);
          return currentHeight === roundedHeight ? currentHeight : roundedHeight;
        });
      }
    });

    observer.observe(embedElement);

    return () => observer.disconnect();
  }, []);

  const fallbackHeight = 760;
  const embedMinHeight = measuredHeight
    ? `${Math.max(measuredHeight, fallbackHeight)}px`
    : `${fallbackHeight}px`;

  return (
    <section id="book" className="bg-brand-cream py-16 dark:bg-brand-dark lg:py-20">
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeInWhenVisible>
          <div className="mx-auto mt-6 w-full max-w-[980px] md:mt-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-10 h-44 rounded-full bg-brand-orange/10 blur-3xl md:inset-x-16 md:h-48"
            />
            <div
              className="relative overflow-hidden rounded-[1.85rem] border border-brand-light-gray/50 bg-gradient-to-br from-brand-white via-brand-cream to-brand-orange/[0.08] p-2.5 shadow-[0_32px_80px_-42px_rgba(217,119,87,0.42)] dark:border-brand-mid-gray/20 dark:from-[#1a1a19] dark:via-[#171716] dark:to-brand-orange/[0.08] sm:rounded-[2rem] sm:p-3.5"
            >
              <div className="mb-2.5 flex items-center justify-between gap-3 rounded-[1.25rem] border border-brand-light-gray/50 bg-brand-white/85 px-4 py-3 dark:border-brand-mid-gray/20 dark:bg-brand-dark/85 sm:mb-3 sm:rounded-[1.35rem]">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                    Pick a time that works for you
                  </p>
                  <p className="mt-1 text-xs text-brand-dark/55 dark:text-brand-cream/55">
                    Free 15-minute strategy call. No obligation.
                  </p>
                </div>
                <div className="hidden rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange sm:inline-flex">
                  Schedule Now
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[1.5rem] border border-brand-light-gray/45 bg-brand-white shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-brand-mid-gray/20 dark:bg-[#111110]">
                {!isCalendlyLoaded && (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-brand-cream/92 backdrop-blur-sm dark:bg-brand-dark/92">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div
                        className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand-orange/60 shadow-[20px_0_0_rgba(217,119,87,0.35),-20px_0_0_rgba(217,119,87,0.35)]"
                        aria-label="Loading scheduler"
                        role="status"
                      />
                      <p className="text-sm text-brand-dark/60 dark:text-brand-cream/60">
                        Loading available times...
                      </p>
                    </div>
                  </div>
                )}
                <div
                  ref={embedRef}
                  className="w-full transition-[min-height] duration-300 ease-out"
                  style={{ minHeight: isCalendlyLoaded ? embedMinHeight : `${fallbackHeight}px` }}
                />
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
