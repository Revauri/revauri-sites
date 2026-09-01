"use client";

import { useEffect, useRef, useState } from "react";
import { FadeInWhenVisible } from "./motion-wrappers";
import { parseCalendlyScheduledEvent, trackCalendlyLead } from "@/lib/analytics";

const CALENDLY_URL =
  "https://calendly.com/joseph-revauri/revauri-ai-call";
const CALENDLY_EMBED_URL = `${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&hide_event_type_details=1&background_color=ffffff&text_color=141413&primary_color=d97757`;

// Initial shell only — once Calendly reports a height we follow it exactly
// (no floor). A high min-height was leaving empty space under the widget on mobile.
const FALLBACK_MIN_HEIGHT_PX = 620;

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
  const [embedHeight, setEmbedHeight] = useState<number | null>(null);

  useEffect(() => {
    let safetyTimer: ReturnType<typeof setTimeout>;

    const onCalendlyMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") return;
      if (typeof event.data !== "object" || event.data === null || !("event" in event.data)) {
        return;
      }
      const message = event.data as { event?: string; payload?: { height?: number } };

      if (message.event === "calendly.event_type_viewed") {
        clearTimeout(safetyTimer);
        setIsCalendlyLoaded(true);
      }

      // Calendly posts page height as the visitor moves through steps.
      if (
        typeof message.payload?.height === "number" &&
        message.payload.height > 0 &&
        (message.event === "calendly.page_height" ||
          message.event === "calendly.event_type_viewed" ||
          // Some embed builds only send height on generic resize-style events
          message.event?.includes("height") ||
          message.event?.includes("page_height"))
      ) {
        setEmbedHeight(Math.ceil(message.payload.height));
      }

      const scheduled = parseCalendlyScheduledEvent(event.origin, event.data);
      if (scheduled) trackCalendlyLead(scheduled.eventUri);
    };

    const initializeEmbed = () => {
      if (!embedRef.current || !window.Calendly?.initInlineWidget) return;
      setIsCalendlyLoaded(false);
      setEmbedHeight(null);
      embedRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: CALENDLY_EMBED_URL,
        parentElement: embedRef.current,
        resize: true,
      });
      // Safety fallback — only if the Calendly message never fires
      safetyTimer = setTimeout(() => setIsCalendlyLoaded(true), 8000);
    };

    window.addEventListener("message", onCalendlyMessage);

    // Poll briefly for the script loaded by next/script on the page
    const waitForCalendly = setInterval(() => {
      if (window.Calendly?.initInlineWidget) {
        clearInterval(waitForCalendly);
        initializeEmbed();
      }
    }, 100);

    // Stop polling after 10s
    const pollTimeout = setTimeout(() => clearInterval(waitForCalendly), 10000);

    return () => {
      clearInterval(waitForCalendly);
      clearTimeout(pollTimeout);
      clearTimeout(safetyTimer);
      window.removeEventListener("message", onCalendlyMessage);
    };
  }, []);

  // Follow the widget/iframe size Calendly injects (resize: true updates this).
  // Observe the iframe when present so we don't invent extra min-height.
  useEffect(() => {
    const embedElement = embedRef.current;
    if (!embedElement || typeof ResizeObserver === "undefined") return;

    const readHeight = () => {
      const iframe = embedElement.querySelector("iframe");
      const raw =
        iframe?.getBoundingClientRect().height ||
        embedElement.getBoundingClientRect().height ||
        0;
      if (raw > 0) {
        setEmbedHeight((current) => {
          const next = Math.ceil(raw);
          return current === next ? current : next;
        });
      }
    };

    const observer = new ResizeObserver(() => readHeight());
    observer.observe(embedElement);

    // Iframe may mount after init — watch child list too.
    const mutation = new MutationObserver(() => {
      const iframe = embedElement.querySelector("iframe");
      if (iframe) {
        observer.observe(iframe);
        readHeight();
      }
    });
    mutation.observe(embedElement, { childList: true, subtree: true });

    readHeight();

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  // Scroll to the scheduler when arriving via /book#scheduler (chat deep link).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#scheduler") return;
    // Wait a frame so layout is ready after client navigation.
    const id = window.requestAnimationFrame(() => {
      document.getElementById("scheduler")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  const shellHeight = embedHeight ?? FALLBACK_MIN_HEIGHT_PX;

  return (
    <section id="book" className="bg-brand-cream py-16 dark:bg-brand-dark lg:py-20">
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeInWhenVisible>
          <div id="scheduler" className="mx-auto mt-6 w-full max-w-[980px] scroll-mt-24 md:mt-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 top-10 h-44 rounded-full bg-brand-orange/10 blur-3xl md:inset-x-16 md:h-48"
            />
            <div className="relative overflow-hidden rounded-2xl border border-brand-light-gray/50 bg-gradient-to-br from-brand-white via-brand-cream to-brand-orange/[0.08] p-1.5 shadow-[0_32px_80px_-42px_rgba(217,119,87,0.42)] dark:border-brand-mid-gray/20 dark:from-[#1a1a19] dark:via-[#171716] dark:to-brand-orange/[0.08] sm:rounded-[2rem] sm:p-3.5">
              <div className="mb-2.5 flex items-center justify-between gap-3 rounded-[1.25rem] border border-brand-light-gray/50 bg-brand-white/85 px-3 py-3 dark:border-brand-mid-gray/20 dark:bg-brand-dark/85 sm:mb-3 sm:rounded-[1.35rem] sm:px-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                    Pick a time that works for you
                  </p>
                  <p className="mt-1 text-xs text-brand-dark/55 dark:text-brand-cream/55">
                    20 minutes on the job you'd otherwise hire for. No obligation.
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
                  className="calendly-embed w-full [&_iframe]:block [&_iframe]:w-full"
                  style={{ height: shellHeight, minHeight: shellHeight }}
                />
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
