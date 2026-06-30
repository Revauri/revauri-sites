import { tool } from "ai";
import { z } from "zod";

export const captureLead = tool({
  description:
    "Submit a qualified lead's contact info and project details to Revauri. " +
    "Call this only once per conversation, and only after confirming with the visitor " +
    "that you have their name, email, and enough project details to pass along.",
  inputSchema: z.object({
    name: z.string(),
    email: z.string().email(),
    company: z.string().optional(),
    projectDetails: z.string(),
  }),
  execute: async ({ name, email, company, projectDetails }) => {
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
  },
});
