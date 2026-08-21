import { getPostBySlug } from "@/lib/blog";

// One-line descriptions of each site page, injected into the system prompt as
// VISITOR CONTEXT so Rev can tailor answers to where the visitor actually is.
const STATIC_PAGE_CONTEXT: Record<string, string> = {
  "/": "the home page — the AI hire offer and the job picker",
  "/about": "the About page — what Revauri AI is and how the team works",
  "/blog": "the blog index page listing Revauri AI's articles",
  "/book": "the booking page with the Calendly scheduler — they're one step from booking",
  "/capabilities":
    "the Capabilities page — the jobs a hire can take, the phone hire, and what we don't do",
  "/contact": "the contact page with the message form",
  "/faq": "the FAQ page",
  "/pricing": "the pricing page — no public numbers; a hire is quoted after we look at the job",
  "/privacy": "the privacy policy page",
  "/terms": "the terms of service page",
};

// Maps a pathname to a context blurb, or undefined for unknown paths (no
// context line is injected in that case).
export function getPageContext(pathname: string): string | undefined {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  const staticBlurb = STATIC_PAGE_CONTEXT[normalized];
  if (staticBlurb) return staticBlurb;

  const blogSlugMatch = normalized.match(/^\/blog\/([^/]+)$/);
  if (blogSlugMatch) {
    const post = getPostBySlug(blogSlugMatch[1]);
    if (post) {
      return `the blog post "${post.title}" (${post.category}) — ${post.description}`;
    }
  }

  return undefined;
}
