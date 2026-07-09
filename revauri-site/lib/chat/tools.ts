import { tool } from "ai";
import { z } from "zod";
import { getBookingSlots } from "@/lib/chat/calendly";
import { getProjectBySlug } from "@/lib/portfolio-data";

// All fields optional so the model is never forced to invent values it doesn't
// have — unknown fields stay empty and the visitor completes them on the
// confirmation card before anything is sent (see lead-confirmation-card.tsx).
export const captureLeadInputSchema = z.object({
  name: z.string().optional().describe("The visitor's name. Leave empty if not yet provided."),
  email: z.string().optional().describe("The visitor's email. Leave empty if not yet provided."),
  company: z
    .string()
    .optional()
    .describe("The visitor's company or business. Leave empty if not yet provided."),
  projectDetails: z
    .string()
    .optional()
    .describe("What the visitor is looking for, in their words. Leave empty if not yet provided."),
});

// Runs in the browser: posts the lead to our own /api/lead route, which
// delivers it server-side and returns a real { success } — so the tool result
// fed back to the model reflects whether delivery actually happened (see
// app/api/lead/route.ts). Replaces the old fire-and-forget iframe form hack
// that always claimed success.
export async function submitLead(
  input: z.infer<typeof captureLeadInputSchema>,
): Promise<{ success: boolean }> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) return { success: false };
    const data = (await res.json()) as { success?: boolean };
    return { success: data.success === true };
  } catch {
    return { success: false };
  }
}

// No `execute` — this makes it a client-side tool. The model emits a tool call,
// the browser (not the Vercel function) performs the actual fetch, and the result
// is fed back via useChat's addToolResult.
export const captureLead = tool({
  description:
    "Submit a qualified lead's contact info and project details to Revauri. " +
    "Call this only once per conversation, once you know enough for a useful lead. " +
    "Fill in only what the visitor actually provided and leave unknown fields empty — " +
    "never invent placeholder values; the visitor reviews and completes the details " +
    "on a confirmation card before anything is sent.",
  inputSchema: captureLeadInputSchema,
});

export const getProjectHighlightInputSchema = z.object({
  topic: z.enum(["discovery_call", "timeline", "revisions"]),
});

export const projectHighlightOutputSchema = z.object({
  eyebrow: z.string(),
  figure: z.string(),
  caption: z.string(),
  ctaLabel: z.string(),
  ctaHref: z.string(),
});

const PROJECT_HIGHLIGHTS: Record<
  z.infer<typeof getProjectHighlightInputSchema>["topic"],
  z.infer<typeof projectHighlightOutputSchema>
> = {
  discovery_call: {
    eyebrow: "FREE DISCOVERY CALL",
    figure: "Free",
    caption: "15-minute call, no obligation",
    ctaLabel: "Book your call",
    ctaHref: "/book",
  },
  timeline: {
    eyebrow: "TYPICAL TIMELINE",
    figure: "4-6 wks",
    caption: "From kickoff to launch",
    ctaLabel: "Book your call",
    ctaHref: "/book",
  },
  revisions: {
    eyebrow: "INCLUDED REVISIONS",
    figure: "2 rounds",
    caption: "We work with you until it's right",
    ctaLabel: "Get started",
    ctaHref: "/book",
  },
};

// Has an `execute` — this makes it a server-side tool. The result is computed
// on the server and streamed back automatically, no client round-trip needed.
export const getProjectHighlight = tool({
  description:
    "Show a visual highlight card for a concrete, non-dollar project fact (free discovery call, " +
    "typical timeline, or included revisions). Call this instead of stating any price when a " +
    "visitor asks about cost, budget, or pricing.",
  inputSchema: getProjectHighlightInputSchema,
  execute: async ({ topic }) => PROJECT_HIGHLIGHTS[topic],
});

// Server-side tool: fetches live availability from Calendly and renders an
// inline booking card. Degrades to a fallback "Book a call" card on any
// failure (see lib/chat/calendly.ts) — the model never sees an error.
export const offerBooking = tool({
  description:
    "Show an inline booking card with real available times for the free 15-minute strategy call. " +
    "Call this when the visitor wants to book, asks about the call, or shows strong buying intent " +
    "(asking how to start, pricing, process, or timeline for their own project).",
  inputSchema: z.object({}),
  execute: async () => getBookingSlots(),
});

export const showPortfolioInputSchema = z.object({
  slugs: z
    .array(z.enum(["ultaura", "lion-law", "cryptrac"]))
    .min(1)
    .max(2)
    .describe("The one or two most relevant projects to show."),
});

// Server-side tool: renders rich portfolio cards from the real PROJECTS data
// (lib/portfolio-data.ts) — nothing invented.
export const showPortfolio = tool({
  description:
    "Show rich visual cards for Revauri portfolio projects. Call this instead of describing " +
    "projects in text whenever the visitor asks about past work, examples, or a specific project. " +
    "Pick the 1-2 most relevant: ultaura (AI / healthcare tech), lion-law (legal / professional " +
    "services), cryptrac (fintech / SaaS).",
  inputSchema: showPortfolioInputSchema,
  execute: async ({ slugs }) => ({
    projects: slugs.flatMap((slug) => {
      const project = getProjectBySlug(slug);
      if (!project) return [];
      return [
        {
          slug: project.slug,
          name: project.name,
          tagline: project.tagline,
          industry: project.industry,
          imageSrc: project.heroImage.src,
          imageAlt: project.heroImage.alt,
          imageWidth: project.heroImage.width,
          imageHeight: project.heroImage.height,
          href: `/portfolio/${project.slug}`,
        },
      ];
    }),
  }),
});
