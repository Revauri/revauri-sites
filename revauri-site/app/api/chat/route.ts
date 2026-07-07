import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { CHAT_MODEL, openrouter } from "@/lib/chat/openrouter";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import { checkRateLimit } from "@/lib/chat/rate-limit";
import { isSameOrigin } from "@/lib/chat/same-origin";
import { captureLead, getProjectHighlight } from "@/lib/chat/tools";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGES = 30;
const MAX_BODY_CHARS = 100_000; // ~100 KB
const MAX_TEXT_PART_CHARS = 2_000;
const MAX_TOOL_OUTPUT_CHARS = 4_000;
const CONTINUE_BY_EMAIL_MESSAGE =
  "We've covered a lot here — let's continue this conversation by email so we don't lose any details. Reach out to joseph@revauri.com and we'll pick up right where we left off.";

// useChat legitimately round-trips assistant messages — including tool parts —
// in the request history, so tool parts can't simply be rejected. This is
// shape/size sanitization against malformed or oversized payloads, not
// cryptographic anti-forgery.
const partSchema = z.union([
  z.looseObject({ type: z.literal("text"), text: z.string().max(MAX_TEXT_PART_CHARS) }),
  z.looseObject({ type: z.literal("step-start") }),
  z
    .looseObject({
      type: z.enum(["tool-capture_lead", "tool-get_project_highlight"]),
      output: z.unknown().optional(),
    })
    .refine((part) => JSON.stringify(part.output ?? null).length <= MAX_TOOL_OUTPUT_CHARS, {
      message: "Tool output too large",
    }),
]);

const bodySchema = z.looseObject({
  messages: z.array(
    z.looseObject({
      role: z.enum(["user", "assistant"]),
      parts: z.array(partSchema),
    }),
  ),
});

function jsonError(error: string, status: number) {
  return new Response(JSON.stringify({ error }), { status });
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return jsonError("Forbidden", 403);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return jsonError("Too many requests", 429);
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_CHARS) {
    return jsonError("Request too large", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Invalid request", 400);
  }

  const messages = parsed.data.messages as unknown as UIMessage[];

  if (messages.length > MAX_MESSAGES) {
    const stream = createUIMessageStream({
      execute: ({ writer }) => {
        const id = crypto.randomUUID();
        writer.write({ type: "text-start", id });
        writer.write({ type: "text-delta", id, delta: CONTINUE_BY_EMAIL_MESSAGE });
        writer.write({ type: "text-end", id });
      },
    });
    return createUIMessageStreamResponse({ stream });
  }

  const result = streamText({
    model: openrouter(CHAT_MODEL),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: { capture_lead: captureLead, get_project_highlight: getProjectHighlight },
    stopWhen: stepCountIs(4),
    maxOutputTokens: 700,
  });

  return result.toUIMessageStreamResponse();
}
