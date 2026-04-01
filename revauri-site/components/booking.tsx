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

  return (
    <section id="book" className="bg-brand-cream py-20 dark:bg-brand-dark lg:py-24">
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <FadeInWhenVisible>
            <div
              className="mx-auto mb-6 flex items-center justify-center gap-3"
              aria-hidden="true"
            >
              <div className="h-px w-12 bg-brand-orange/20" />
              <div className="h-1.5 w-1.5 rounded-full bg-brand-orange/45" />
              <div className="h-px w-12 bg-brand-orange/20" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              Ready to see your{" "}
              <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                next website direction?
              </span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              Book a free 15-minute strategy call. We&apos;ll walk through your
              redesign sample and outline clear, practical next steps.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.08}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="rounded-full border border-brand-orange/35 bg-brand-orange/12 px-4 py-1.5 font-medium text-brand-dark shadow-[var(--shadow-sm)] dark:text-brand-cream">
                Free 15-min call
              </span>
              <span className="rounded-full border border-brand-orange/25 bg-brand-white px-4 py-1.5 font-medium text-brand-dark/80 shadow-[var(--shadow-sm)] dark:bg-brand-dark dark:text-brand-cream/80">
                No obligation
              </span>
              <span className="rounded-full border border-brand-orange/25 bg-brand-white px-4 py-1.5 font-medium text-brand-dark/80 shadow-[var(--shadow-sm)] dark:bg-brand-dark dark:text-brand-cream/80">
                Actionable next steps
              </span>
            </div>
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible delay={0.16}>
          <div className="mx-auto mt-6 max-w-[960px] rounded-2xl border border-brand-light-gray/40 bg-brand-white p-1 shadow-[var(--shadow-lg)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] md:mt-7">
            <div
              className="relative min-h-[700px] rounded-xl overflow-hidden"
              style={{ minWidth: "320px" }}
            >
              {!isCalendlyLoaded && (
                <div className="absolute inset-0 z-10 grid place-items-center bg-brand-cream dark:bg-brand-dark">
                  <div
                    className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand-orange/60 shadow-[20px_0_0_rgba(217,119,87,0.35),-20px_0_0_rgba(217,119,87,0.35)]"
                    aria-label="Loading scheduler"
                    role="status"
                  />
                </div>
              )}
              <div ref={embedRef} className="w-full min-h-[700px]" />
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <p className="mt-4 text-sm text-brand-mid-gray">
            Prefer email? Reach us at{" "}
            <a
              href="mailto:joseph@revauri.com"
              className="font-medium text-brand-orange transition-colors hover:text-brand-dark dark:hover:text-brand-cream"
            >
              joseph@revauri.com
            </a>
          </p>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
