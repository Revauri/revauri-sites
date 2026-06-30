import { tool } from "ai";
import { z } from "zod";

export const captureLeadInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  projectDetails: z.string(),
});

// FormSubmit.co sits behind a Cloudflare bot challenge that blocks server-to-server
// requests (no real browser/JS), so this must run client-side, not as a tool `execute`.
// See components/chat/chat-panel.tsx's onToolCall handler, which calls this directly.
export async function submitLead(input: z.infer<typeof captureLeadInputSchema>) {
  const { name, email, company, projectDetails } = input;
  const res = await fetch("https://formsubmit.co/joseph@revauri.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      name,
      email,
      company: company ?? "",
      message: `[Submitted via chatbot]\n\n${projectDetails}`,
      _subject: "New chatbot lead from revauri.com",
      _template: "table",
      _captcha: "false",
    }),
  });

  return { success: res.ok };
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
