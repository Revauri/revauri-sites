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
);

CREATE INDEX IF NOT EXISTS chat_conversations_updated_at_idx
  ON chat_conversations (updated_at DESC);

CREATE INDEX IF NOT EXISTS chat_conversations_created_at_idx
  ON chat_conversations (created_at);
