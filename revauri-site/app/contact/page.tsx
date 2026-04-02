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
        <div className="flex flex-col items-center gap-2 text-sm text-brand-mid-gray sm:flex-row sm:gap-6">
          <span>Response time: same day</span>
          <span className="hidden sm:inline">&middot;</span>
          <a className="text-brand-orange hover:underline" href="mailto:joseph@revauri.com">
            joseph@revauri.com
          </a>
        </div>
      </PageHero>

      <ContactContent />
    </div>
  );
}
