import type { Metadata } from "next";
import Script from "next/script";
import { Check } from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { Booking } from "@/components/booking";

export const metadata: Metadata = {
  title: "Book a Call — Revauri AI",
  description:
    "Book a 20-minute call with Revauri AI. Tell us the job you'd otherwise hire for. We'll tell you whether an AI employee can take it — and quote it against hiring a person.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <div>
      <link rel="dns-prefetch" href="https://assets.calendly.com" />
      <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://calendly.com" />
      <link rel="preconnect" href="https://calendly.com" crossOrigin="anonymous" />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <PageHero
        badge="BOOK A CALL"
        title={
          <>
            Let&apos;s name the job you&apos;d otherwise{" "}
            <GradientText>hire for</GradientText>
          </>
        }
        subtitle="A 20-minute call. We hear the mess, tell you if an AI employee can take it, and quote it against hiring a person — not against a software tool."
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-mid-gray">
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-brand-orange" />
            20 minutes
          </span>
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-brand-orange" />
            No obligation
          </span>
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-brand-orange" />
            Your time back
          </span>
        </div>
      </PageHero>

      <Booking />
    </div>
  );
}
