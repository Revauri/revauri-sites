import { neon } from "@neondatabase/serverless";
import {
  detectLeadSubmitted,
  firstUserPreview,
  hasUserText,
  toStoredMessages,
  type ChatConversationDetail,
  type ChatConversationListItem,
  type StoredChatMessage,
  type TranscriptMessage,
} from "@/lib/chat/transcript";

type Sql = ReturnType<typeof neon>;

let client: Sql | null | undefined;
let schemaPromise: Promise<void> | null = null;

function getSql(): Sql | null {
  if (client !== undefined) return client;
  const url = process.env.DATABASE_URL;
  if (!url) {
    client = null;
    return null;
  }
  client = neon(url);
  return client;
}

export async function ensureSchema(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS chat_conversations (
          id uuid PRIMARY KEY,
          created_at timestamptz NOT NULL DEFAULT now(),
          updated_at timestamptz NOT NULL DEFAULT now(),
          last_pathname text NOT NULL DEFAULT '/',
          preview text NOT NULL DEFAULT '',
          message_count integer NOT NULL DEFAULT 0,
          lead_submitted boolean NOT NULL DEFAULT false,
          notified_at timestamptz,
          messages jsonb NOT NULL DEFAULT '[]'::jsonb
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS chat_conversations_updated_at_idx
          ON chat_conversations (updated_at DESC)
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS chat_conversations_created_at_idx
          ON chat_conversations (created_at)
      `;
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  await schemaPromise;
}

export async function persistConversation(input: {
  conversationId: string;
  pathname?: string;
  messages: TranscriptMessage[];
}): Promise<void> {
  const stored = toStoredMessages(input.messages);
  if (!hasUserText(stored)) return;

  const sql = getSql();
  if (!sql) return;

  await ensureSchema();

  const pathname = input.pathname && input.pathname.trim() ? input.pathname.trim() : "/";
  const preview = firstUserPreview(stored);
  const leadSubmitted = detectLeadSubmitted(input.messages);
  const payload = JSON.stringify(stored);

  await sql.query(
    `INSERT INTO chat_conversations (
      id,
      last_pathname,
      preview,
      message_count,
      lead_submitted,
      notified_at,
      messages
    )
    VALUES ($1, $2, $3, $4, $5, now(), $6::jsonb)
    ON CONFLICT (id) DO UPDATE SET
      last_pathname = EXCLUDED.last_pathname,
      preview = CASE
        WHEN chat_conversations.preview = '' THEN EXCLUDED.preview
        ELSE chat_conversations.preview
      END,
      message_count = EXCLUDED.message_count,
      lead_submitted = chat_conversations.lead_submitted OR EXCLUDED.lead_submitted,
      notified_at = COALESCE(chat_conversations.notified_at, EXCLUDED.notified_at),
      messages = EXCLUDED.messages,
      updated_at = now()`,
    [input.conversationId, pathname, preview, stored.length, leadSubmitted, payload],
  );
}

type ConversationRow = {
  id: string;
  created_at: Date | string;
  updated_at: Date | string;
  last_pathname: string;
  preview: string;
  message_count: number;
  lead_submitted: boolean;
  notified_at?: Date | string | null;
  messages?: unknown;
};

function toIso(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function toListItem(row: ConversationRow): ChatConversationListItem {
  return {
    id: row.id,
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
    lastPathname: row.last_pathname,
    preview: row.preview,
    messageCount: Number(row.message_count),
    leadSubmitted: Boolean(row.lead_submitted),
  };
}

function parseMessages(value: unknown): StoredChatMessage[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is StoredChatMessage => {
    if (!item || typeof item !== "object") return false;
    const role = (item as StoredChatMessage).role;
    return (role === "user" || role === "assistant") && typeof (item as StoredChatMessage).text === "string";
  });
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function listConversations(): Promise<ChatConversationListItem[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureSchema();
  await purgeOlderThan(365).catch(() => undefined);
  const rows = (await sql`
    SELECT id, created_at, updated_at, last_pathname, preview, message_count, lead_submitted
    FROM chat_conversations
    ORDER BY updated_at DESC
    LIMIT 200
  `) as ConversationRow[];
  return rows.map(toListItem);
}

export async function getConversation(id: string): Promise<ChatConversationDetail | null> {
  if (!UUID_RE.test(id)) return null;
  const sql = getSql();
  if (!sql) return null;
  await ensureSchema();
  const rows = (await sql`
    SELECT id, created_at, updated_at, last_pathname, preview, message_count,
           lead_submitted, notified_at, messages
    FROM chat_conversations
    WHERE id = ${id}
    LIMIT 1
  `) as ConversationRow[];
  const row = rows[0];
  if (!row) return null;
  return {
    ...toListItem(row),
    messages: parseMessages(row.messages),
    notifiedAt: row.notified_at ? toIso(row.notified_at) : null,
  };
}

export async function deleteConversation(id: string): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  await ensureSchema();
  const rows = (await sql`
    DELETE FROM chat_conversations
    WHERE id = ${id}
    RETURNING id
  `) as Array<{ id: string }>;
  return rows.length > 0;
}

export async function purgeOlderThan(days: number): Promise<number> {
  const sql = getSql();
  if (!sql) return 0;
  await ensureSchema();
  const rows = (await sql`
    DELETE FROM chat_conversations
    WHERE updated_at < now() - (${days} * interval '1 day')
    RETURNING id
  `) as Array<{ id: string }>;
  return rows.length;
}
