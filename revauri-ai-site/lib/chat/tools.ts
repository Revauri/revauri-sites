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

// Web3Forms access keys are public-safe by design — they only route mail to
// the address the key was created for, so hardcoding it here (like the contact
// forms do) is the supported pattern and needs no env var.
const WEB3FORMS_ACCESS_KEY = "84431b19-9bc8-45f0-a60a-eb6d683a0008";

const SUBMIT_TIMEOUT_MS = 8_000;

// Runs in the browser: posts the lead straight to Web3Forms' JSON API (their
// docs' supported pattern — browser calls work on the free tier, server-side
// calls don't) and returns the real { success } from the response — so the
// tool result fed back to the model reflects whether delivery actually
// happened. Replaces the old fire-and-forget iframe form hack that always
// claimed success.
export async function submitLead(
  input: z.infer<typeof captureLeadInputSchema>,
): Promise<{ success: boolean }> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "New chatbot inquiry — revauri.ai",
        name: input.name ?? "",
        email: input.email ?? "",
        company: input.company ?? "",
        message: `[Submitted via chatbot]\n\n${input.projectDetails ?? ""}`,
      }),
      signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
    return { success: res.ok && data?.success === true };
  } catch {
    // Network failure or timeout — report honestly so Rev never claims success.
    return { success: false };
  }
}

// No `execute` — this makes it a client-side tool. The model emits a tool call,
// the browser (not the Vercel function) performs the actual fetch, and the result
// is fed back via useChat's addToolResult.
export const captureLead = tool({
  description:
    "Submit a qualified lead's contact info and the job they want off their plate to Revauri AI. " +
    "Call this only once per conversation, once you know enough for a useful lead. " +
    "Fill in only what the visitor actually provided and leave unknown fields empty — " +
    "never invent placeholder values; the visitor reviews and completes the details " +
    "on a confirmation card before anything is sent.",
  inputSchema: captureLeadInputSchema,
});

export const getProjectHighlightInputSchema = z.object({
  topic: z.enum(["intro_call", "workflows", "approval"]),
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
  intro_call: {
    eyebrow: "REVAURI AI CALL",
    figure: "20 min",
    caption: "We name the job you want off your plate. No obligation.",
    ctaLabel: "Book your call",
    ctaHref: "/book",
  },
  workflows: {
    eyebrow: "STANDARD HIRE",
    figure: "2 workflows",
    caption: "Built around how you already work, and run every week",
    ctaLabel: "Book your call",
    ctaHref: "/book",
  },
  approval: {
    eyebrow: "YOU STAY THE BOSS",
    figure: "You approve",
    caption: "Nothing goes to a customer without your yes",
    ctaLabel: "Get started",
    ctaHref: "/book",
  },
};

// Has an `execute` — this makes it a server-side tool. The result is computed
// on the server and streamed back automatically, no client round-trip needed.
export const getProjectHighlight = tool({
  description:
    "Show a visual highlight card for a concrete, non-dollar fact about the hire (the 20-minute " +
    "call, the two workflows a standard hire covers, or the owner approving everything customers " +
    "see). A secondary visual. For pricing intent, offer_booking remains the preferred card.",
  inputSchema: getProjectHighlightInputSchema,
  execute: async ({ topic }) => PROJECT_HIGHLIGHTS[topic],
});

// Server-side tool: fetches live availability from Calendly and renders an
// inline booking card. Degrades to a fallback "Book a call" card on any
// failure (see lib/chat/calendly.ts) — the model never sees an error.
export const offerBooking = tool({
  description:
    "Show an inline booking card for the 20-minute Revauri AI call — about the job the visitor " +
    "wants off their plate, not a website strategy call or a redesign preview — with real " +
    "available times when we can fetch them. " +
    "Call this when the visitor wants to book, asks about the call, or shows strong buying intent " +
    "(asking how to start, pricing, process, or how long setup takes).",
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
// (lib/portfolio-data.ts) — nothing invented. Retired on revauri.ai: those are
// website projects, not Revauri AI case studies, and this site has no
// /portfolio route for the cards to link to. Still registered so conversations
// restored from sessionStorage keep validating.
export const showPortfolio = tool({
  description:
    "DO NOT CALL. Retired website-portfolio cards, unavailable on this site. Answer questions " +
    "about past work in text instead: Revauri AI has no published case studies yet.",
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
