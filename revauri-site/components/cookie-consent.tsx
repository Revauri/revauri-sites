"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  deleteGaCookies,
  getStoredConsent,
  initGa,
  onCookiePreferencesRequested,
  storeConsent,
  type ConsentValue,
} from "@/lib/analytics";

export function CookieConsent() {
  const [hydrated, setHydrated] = useState(false);
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    setBannerOpen(stored === null);
    setHydrated(true);
  }, []);

  useEffect(() => onCookiePreferencesRequested(() => setBannerOpen(true)), []);

  useEffect(() => {
    if (consent === "granted") initGa();
  }, [consent]);

  useEffect(() => {
    if (bannerOpen) acceptButtonRef.current?.focus();
  }, [bannerOpen]);

  if (!hydrated) return null;

  function accept() {
    storeConsent("granted");
    setConsent("granted");
    setBannerOpen(false);
  }

  function decline() {
    const wasGranted = consent === "granted";
    storeConsent("denied");
    setConsent("denied");
    setBannerOpen(false);
    if (wasGranted) {
      deleteGaCookies();
      window.location.reload();
    }
  }

  return (
    <>
      {consent === "granted" && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
      )}

      {bannerOpen && (
        <div
          role="region"
          aria-label="Cookie preferences"
          aria-live="polite"
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-md rounded-2xl border border-brand-light-gray/60 bg-brand-white p-5 shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] sm:inset-x-auto sm:left-5 lg:inset-x-0 lg:bottom-0 lg:max-w-none lg:rounded-none lg:border-x-0 lg:border-b-0"
        >
          <div className="lg:mx-auto lg:flex lg:max-w-5xl lg:items-center lg:justify-between lg:gap-6">
            <div>
              <p className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                We use cookies
              </p>
              <p className="mt-1.5 text-xs leading-5 text-brand-dark/65 dark:text-brand-cream/65">
                We use Google Analytics to understand how visitors use our site. We only turn
                this on with your permission. See our{" "}
                <a href="/privacy" className="text-brand-orange hover:underline">
                  Privacy Policy
                </a>{" "}
                for details.
              </p>
            </div>
            <div className="mt-4 flex gap-2.5 lg:mt-0 lg:shrink-0">
              <button
                ref={acceptButtonRef}
                type="button"
                onClick={accept}
                className="flex-1 rounded-lg bg-brand-orange px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange lg:flex-none"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={decline}
                className="flex-1 rounded-lg border border-brand-light-gray px-4 py-2.5 text-xs font-semibold text-brand-dark transition-colors hover:bg-brand-light-gray/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:border-brand-mid-gray/30 dark:text-brand-cream dark:hover:bg-brand-mid-gray/10 lg:flex-none"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
