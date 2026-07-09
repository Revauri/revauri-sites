import { createOpenAI } from "@ai-sdk/openai";

export const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    "HTTP-Referer": "https://revauri.com",
    "X-Title": "Revauri Site Chatbot",
  },
});

// Hardcoded — do not make this env-configurable, the slug is fixed/verified.
export const CHAT_MODEL = "x-ai/grok-4.5";
