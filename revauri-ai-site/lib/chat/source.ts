export const CHAT_SOURCES = ["revauri.com", "revauri.ai"] as const;

export type ChatSource = (typeof CHAT_SOURCES)[number];

export const CHAT_SOURCE: ChatSource = "revauri.ai";

export function normalizeChatSource(value: unknown): ChatSource {
  return value === "revauri.ai" ? "revauri.ai" : "revauri.com";
}
