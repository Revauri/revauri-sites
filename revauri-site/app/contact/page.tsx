import type { Metadata } from "next";
import { PageHero, GradientText } from "@/components/page-hero";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact — Revauri",
  description:
    "Get in touch with Revauri. Book a free 15-minute strategy call or email us directly. We respond within a few hours.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        badge="GET IN TOUCH"
        title={
          <>
            Contact <GradientText>Revauri</GradientText>
          </>
        }
        subtitle="Book a free call or drop us a message. We'll get back to you quickly."
      >
        <p className="text-sm text-brand-mid-gray">We typically respond within a few hours.</p>
      </PageHero>

      <ContactContent />
    </div>
  );
}
