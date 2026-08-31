import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PAGE_HEROES } from "@/lib/marketing-copy";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact — Revauri AI",
  description:
    "Tell us the job you'd otherwise hire for. We'll take it off you. Or hire one — that's the faster way to get an answer.",
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
        badge={PAGE_HEROES.contact.badge}
        title={PAGE_HEROES.contact.title}
        subtitle={PAGE_HEROES.contact.subtitle}
      />

      <ContactContent isSubmitted={isSubmitted} />
    </div>
  );
}
