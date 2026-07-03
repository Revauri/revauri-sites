import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { CHAT_MODEL, openrouter } from "@/lib/chat/openrouter";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import { checkRateLimit } from "@/lib/chat/rate-limit";
import { captureLead, getProjectHighlight } from "@/lib/chat/tools";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGES = 30;
const CONTINUE_BY_EMAIL_MESSAGE =
  "We've covered a lot here — let's continue this conversation by email so we don't lose any details. Reach out to joseph@revauri.com and we'll pick up right where we left off.";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return new Response(JSON.stringify({ error: "Too many requests" }), { status: 429 });
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

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
    maxOutputTokens: 500,
  });

  return result.toUIMessageStreamResponse();
}
