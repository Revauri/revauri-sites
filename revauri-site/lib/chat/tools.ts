import { tool } from "ai";
import { z } from "zod";

export const captureLeadInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  projectDetails: z.string(),
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
    "Call this only once per conversation, and only after confirming with the visitor " +
    "that you have their name, email, and enough project details to pass along.",
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
