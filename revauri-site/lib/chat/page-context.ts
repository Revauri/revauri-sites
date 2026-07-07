import { getProjectBySlug } from "@/lib/portfolio-data";

// One-line descriptions of each site page, injected into the system prompt as
// VISITOR CONTEXT so Rev can tailor answers to where the visitor actually is.
const STATIC_PAGE_CONTEXT: Record<string, string> = {
  "/": "the main landing page — services overview",
  "/about": "the About page — Revauri's story and how Joseph works",
  "/book": "the booking page with the Calendly scheduler — they're one step from booking",
  "/contact": "the contact page with the message form",
  "/faq": "the FAQ page",
  "/portfolio": "the portfolio overview page listing Revauri's past projects",
  "/pricing": "the pricing philosophy page — custom quotes after a discovery call",
  "/privacy": "the privacy policy page",
  "/terms": "the terms of service page",
};

// Maps a pathname to a context blurb, or undefined for unknown paths (no
// context line is injected in that case).
export function getPageContext(pathname: string): string | undefined {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  const staticBlurb = STATIC_PAGE_CONTEXT[normalized];
  if (staticBlurb) return staticBlurb;

  const slugMatch = normalized.match(/^\/portfolio\/([^/]+)$/);
  if (slugMatch) {
    const project = getProjectBySlug(slugMatch[1]);
    if (project) {
      return `the portfolio case study for ${project.name} ("${project.tagline}" — ${project.industry})`;
    }
  }

  return undefined;
}
