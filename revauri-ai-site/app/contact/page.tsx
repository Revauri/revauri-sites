import type { Metadata } from "next";
import { PageHero, GradientText } from "@/components/page-hero";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact — Revauri AI",
  description:
    "Tell Revauri AI about the job you want handed off, or book a 20-minute call. We respond within a few hours.",
  alternates: { canonical: "/contact" },
};

type ContactPageProps = {
  searchParams?: Promise<{
    sent?: string | string[];
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const sentParam = resolvedSearchParams?.sent;
  const isSubmitted = Array.isArray(sentParam) ? sentParam.includes("true") : sentParam === "true";

  return (
    <div>
      <PageHero
        badge="GET IN TOUCH"
        title={
          <>
            Contact <GradientText>Revauri AI</GradientText>
          </>
        }
        subtitle="Tell us the job you want handed off. Or book a call — that's the faster way to get an answer."
      >
        <p className="text-sm text-brand-mid-gray">We typically respond within a few hours.</p>
      </PageHero>

      <ContactContent isSubmitted={isSubmitted} />
    </div>
  );
}
