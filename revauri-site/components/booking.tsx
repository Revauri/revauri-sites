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
    <section id="book" className="bg-brand-cream py-16 dark:bg-brand-dark lg:py-20">
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <FadeInWhenVisible>
          <div
            className="mx-auto mt-6 max-w-[960px] rounded-2xl md:mt-7"
            style={{
              boxShadow:
                "0 0 60px 10px rgba(217,119,87,0.12), 0 0 120px 30px rgba(217,119,87,0.06)",
            }}
          >
            <div
              className="relative min-h-[700px] rounded-2xl overflow-hidden"
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

      </div>
    </section>
  );
}
