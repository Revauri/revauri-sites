export const PREVIEW_MAX_CHARS = 180;

export type StoredCard = "booking" | "portfolio" | "highlight" | "lead";

export type StoredChatMessage = {
  role: "user" | "assistant";
  text: string;
  cards?: StoredCard[];
};

export type ChatConversationListItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastPathname: string;
  preview: string;
  messageCount: number;
  leadSubmitted: boolean;
};

export type ChatConversationDetail = ChatConversationListItem & {
  messages: StoredChatMessage[];
  notifiedAt: string | null;
};

type LeadOutput = {
  success?: unknown;
  status?: unknown;
};

type MessagePart = {
  type?: unknown;
  text?: unknown;
  output?: unknown;
};

export type TranscriptMessage = {
  role?: unknown;
  parts?: unknown[] | unknown;
};

const CARD_BY_TOOL: Record<string, StoredCard> = {
  "tool-offer_booking": "booking",
  "tool-show_portfolio": "portfolio",
  "tool-get_project_highlight": "highlight",
  "tool-capture_lead": "lead",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function partList(parts: unknown): MessagePart[] {
  if (!Array.isArray(parts)) return [];
  return parts.filter(isRecord) as MessagePart[];
}

function cardForPart(type: unknown): StoredCard | undefined {
  if (typeof type !== "string") return undefined;
  return CARD_BY_TOOL[type];
}

export function toStoredMessages(messages: TranscriptMessage[]): StoredChatMessage[] {
  const stored: StoredChatMessage[] = [];

  for (const message of messages) {
    if (message.role !== "user" && message.role !== "assistant") continue;

    const parts = partList(message.parts);
    const text = parts
      .filter((part) => part.type === "text" && typeof part.text === "string")
      .map((part) => (part.text as string).trim())
      .filter(Boolean)
      .join("\n\n");

    const cards: StoredCard[] = [];
    for (const part of parts) {
      const card = cardForPart(part.type);
      if (card && !cards.includes(card)) cards.push(card);
    }

    if (!text && cards.length === 0) continue;

    stored.push({
      role: message.role,
      text,
      ...(cards.length > 0 ? { cards } : {}),
    });
  }

  return stored;
}

export function firstUserPreview(messages: StoredChatMessage[]): string {
  const first = messages.find((message) => message.role === "user" && message.text.trim());
  if (!first) return "";
  const trimmed = first.text.trim().replace(/\s+/g, " ");
  if (trimmed.length <= PREVIEW_MAX_CHARS) return trimmed;
  return `${trimmed.slice(0, PREVIEW_MAX_CHARS - 1).trimEnd()}…`;
}

function isLeadSuccess(output: unknown): boolean {
  if (!isRecord(output)) return false;
  const lead = output as LeadOutput;
  if (lead.success === true) return true;
  return lead.status === "sent";
}

export function detectLeadSubmitted(messages: TranscriptMessage[]): boolean {
  for (const message of messages) {
    for (const part of partList(message.parts)) {
      if (part.type !== "tool-capture_lead") continue;
      if (isLeadSuccess(part.output)) return true;
    }
  }
  return false;
}

export function hasUserText(messages: StoredChatMessage[]): boolean {
  return messages.some((message) => message.role === "user" && message.text.trim().length > 0);
}
