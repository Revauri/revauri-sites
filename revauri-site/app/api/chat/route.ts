import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { after } from "next/server";
import { z } from "zod";
import { CHAT_MODEL, openrouter } from "@/lib/chat/openrouter";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import { getPageContext } from "@/lib/chat/page-context";
import { checkRateLimit } from "@/lib/chat/rate-limit";
import { isSameOrigin } from "@/lib/chat/same-origin";
import { persistConversation } from "@/lib/chat/db";
import type { TranscriptMessage } from "@/lib/chat/transcript";
import { captureLead, getProjectHighlight, offerBooking, showPortfolio } from "@/lib/chat/tools";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGES = 30;
const MAX_BODY_CHARS = 100_000; // ~100 KB
// Must accept anything we ourselves stream: at 700 output tokens an assistant
// reply can exceed 2,000 chars, and the client round-trips it verbatim — a
// tighter cap would 400 every request after one long reply.
const MAX_TEXT_PART_CHARS = 4_000;
const MAX_TOOL_OUTPUT_CHARS = 4_000;
const CONTINUE_BY_EMAIL_MESSAGE =
  "We've covered a lot here — let's continue this conversation by email so we don't lose any details. Reach out to joseph@revauri.com and we'll pick up right where we left off.";

// useChat legitimately round-trips assistant messages — including tool parts —
// in the request history, so tool parts can't simply be rejected. This is
// shape/size sanitization against malformed or oversized payloads, not
// cryptographic anti-forgery.
const partSchema = z.union([
  z.looseObject({ type: z.literal("text"), text: z.string().max(MAX_TEXT_PART_CHARS) }),
  // Reasoning parts can appear in histories saved while a reasoning-capable
  // model streamed them; accept them here (the provider adapter drops them on
  // the way to the model) so those conversations don't 400 forever.
  z.looseObject({ type: z.literal("reasoning"), text: z.string().max(MAX_TEXT_PART_CHARS) }),
  z.looseObject({ type: z.literal("step-start") }),
  z
    .looseObject({
      type: z.enum([
        "tool-capture_lead",
        "tool-get_project_highlight",
        "tool-offer_booking",
        "tool-show_portfolio",
      ]),
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
  // Current page path, sent by the client for page-aware answers.
  pathname: z.string().max(200).optional(),
  conversationId: z.string().uuid().optional(),
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
    // Issues carry paths and expected shapes, not message content.
    console.error("[chat] validation failed", JSON.stringify(parsed.error.issues));
    return jsonError("Invalid request", 400);
  }

  const { conversationId, pathname } = parsed.data;
  const messages = parsed.data.messages as unknown as UIMessage[];

  async function persist(history: TranscriptMessage[]) {
    if (!conversationId) return;
    try {
      await persistConversation({
        conversationId,
        pathname,
        messages: history,
      });
    } catch (error) {
      console.error("[chat] persist failed", error);
    }
  }

  // Save the visitor turn immediately. Rev's reply is written again after the
  // stream finishes (via after()) so a one-and-done chat still includes it.
  await persist(parsed.data.messages);

  if (messages.length > MAX_MESSAGES) {
    after(() =>
      persist([
        ...parsed.data.messages,
        { role: "assistant", parts: [{ type: "text", text: CONTINUE_BY_EMAIL_MESSAGE }] },
      ]),
    );
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

  const pageContext = parsed.data.pathname ? getPageContext(parsed.data.pathname) : undefined;
  const system = pageContext
    ? `${SYSTEM_PROMPT}\n\nVISITOR CONTEXT: the visitor is currently on ${pageContext}. Tailor your answers accordingly; do not announce that you can see their page.`
    : SYSTEM_PROMPT;

  const result = streamText({
    // .chat() pins the OpenAI-compatible chat-completions endpoint. The bare
    // provider default is OpenAI's Responses API, which serializes prior
    // assistant turns as item_reference stubs pointing at OpenAI-hosted state —
    // OpenRouter is stateless, so every request after the first tool call
    // failed. Fresh conversations worked, which is why this slipped through.
    model: openrouter.chat(CHAT_MODEL),
    system,
    // ignoreIncompleteToolCalls: a capture_lead confirmation card can still be
    // pending (input-available, no output) when the visitor types a new
    // message — drop those parts instead of sending a dangling tool call.
    messages: await convertToModelMessages(messages, { ignoreIncompleteToolCalls: true }),
    tools: {
      capture_lead: captureLead,
      get_project_highlight: getProjectHighlight,
      offer_booking: offerBooking,
      show_portfolio: showPortfolio,
    },
    stopWhen: stepCountIs(4),
    maxOutputTokens: 700,
  });

  after(async () => {
    try {
      const [text, toolCalls] = await Promise.all([result.text, result.toolCalls]);
      const parts: Array<{ type: string; text?: string }> = [];
      if (typeof text === "string" && text.trim()) {
        parts.push({ type: "text", text });
      }
      for (const call of toolCalls ?? []) {
        const name = "toolName" in call && typeof call.toolName === "string" ? call.toolName : "";
        if (name) parts.push({ type: `tool-${name}` });
      }
      if (parts.length === 0) return;
      await persist([...parsed.data.messages, { role: "assistant", parts }]);
    } catch (error) {
      console.error("[chat] persist reply failed", error);
    }
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    // Keep the client-facing message generic, but leave the real provider
    // error (model errors, upstream 4xx/5xx) in the function logs.
    onError: (error) => {
      console.error("[chat] stream error", error);
      return "An error occurred.";
    },
  });
}
