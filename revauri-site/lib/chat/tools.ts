import { tool } from "ai";
import { z } from "zod";

export const captureLeadInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  projectDetails: z.string(),
});

// FormSubmit.co blocks both server-side fetches (Cloudflare bot challenge) and
// cross-origin browser fetches (no CORS allow-origin for AJAX mode) for this account.
// A real <form> POST is subject to neither restriction — it's the same mechanism
// app/contact/contact-content.tsx already uses successfully in production — so this
// submits via a hidden iframe-targeted form instead of fetch. There is no readable
// response (cross-origin), so this is fire-and-forget, matching the /contact form's
// existing reliability profile.
export function submitLead(input: z.infer<typeof captureLeadInputSchema>): Promise<{ success: boolean }> {
  const { name, email, company, projectDetails } = input;

  return new Promise((resolve) => {
    const iframeName = `lead-capture-${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://formsubmit.co/joseph@revauri.com";
    form.target = iframeName;
    form.style.display = "none";

    const fields: Record<string, string> = {
      name,
      email,
      company: company ?? "",
      message: `[Submitted via chatbot]\n\n${projectDetails}`,
      _subject: "New chatbot lead from revauri.com",
      _template: "table",
      _captcha: "false",
    };
    for (const [key, value] of Object.entries(fields)) {
      const field = document.createElement("input");
      field.type = "hidden";
      field.name = key;
      field.value = value;
      form.appendChild(field);
    }

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      form.remove();
      iframe.remove();
      resolve({ success: true });
    }, 2000);
  });
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
