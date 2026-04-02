import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { Booking } from "@/components/booking";

export const metadata: Metadata = {
  title: "Book a Call — Revauri",
  description:
    "Book a free 15-minute strategy call with Revauri. We'll walk through a custom redesign of your site and outline practical next steps.",
};

export default function BookPage() {
  return (
    <div>
      <PageHero
        badge="BOOK A CALL"
        title={
          <>
            Let&apos;s talk about your{" "}
            <GradientText>website</GradientText>
          </>
        }
        subtitle="Book a free 15-minute strategy call. We'll walk through a custom redesign of your site and outline practical next steps."
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-mid-gray">
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-brand-orange" />
            Free 15-min call
          </span>
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-brand-orange" />
            No obligation
          </span>
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-brand-orange" />
            Actionable next steps
          </span>
        </div>
      </PageHero>

      <Booking />
    </div>
  );
}
