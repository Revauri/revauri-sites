import type { Metadata } from "next";
import Script from "next/script";
import { Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PAGE_HEROES } from "@/lib/marketing-copy";
import { Booking } from "@/components/booking";

export const metadata: Metadata = {
  title: "Name the job — Revauri AI",
  description:
    "Name the job you'd otherwise hire for. Twenty minutes. We'll tell you whether an AI employee can take it — and quote it against hiring a person.",
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
        badge={PAGE_HEROES.book.badge}
        title={PAGE_HEROES.book.title}
        muted={PAGE_HEROES.book.muted}
        subtitle={PAGE_HEROES.book.subtitle}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-dark/45 dark:text-brand-cream/45">
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
