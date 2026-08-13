import { test } from "node:test";
import assert from "node:assert/strict";
import {
  PREVIEW_MAX_CHARS,
  detectLeadSubmitted,
  firstUserPreview,
  hasUserText,
  toStoredMessages,
} from "./transcript.ts";

test("toStoredMessages extracts text parts", () => {
  const stored = toStoredMessages([
    { role: "user", parts: [{ type: "text", text: "  Hi there  " }] },
    { role: "assistant", parts: [{ type: "text", text: "Hello — how can I help?" }] },
  ]);
  assert.deepEqual(stored, [
    { role: "user", text: "Hi there" },
    { role: "assistant", text: "Hello — how can I help?" },
  ]);
});

test("toStoredMessages turns a tool-only assistant turn into a card label", () => {
  const stored = toStoredMessages([
    {
      role: "assistant",
      parts: [{ type: "tool-offer_booking", state: "output-available" }],
    },
  ]);
  assert.deepEqual(stored, [{ role: "assistant", text: "", cards: ["booking"] }]);
});

test("toStoredMessages ignores reasoning and step-start parts", () => {
  const stored = toStoredMessages([
    {
      role: "assistant",
      parts: [
        { type: "reasoning", text: "thinking out loud" },
        { type: "step-start" },
        { type: "text", text: "Here is the answer." },
      ],
    },
  ]);
  assert.deepEqual(stored, [{ role: "assistant", text: "Here is the answer." }]);
});

test("detectLeadSubmitted is true for a successful lead card", () => {
  assert.equal(
    detectLeadSubmitted([
      {
        role: "assistant",
        parts: [{ type: "tool-capture_lead", output: { success: true, status: "sent" } }],
      },
    ]),
    true,
  );
});

test("detectLeadSubmitted is false for dismissed or failed leads", () => {
  assert.equal(
    detectLeadSubmitted([
      {
        role: "assistant",
        parts: [{ type: "tool-capture_lead", output: { status: "dismissed", success: false } }],
      },
    ]),
    false,
  );
  assert.equal(
    detectLeadSubmitted([
      {
        role: "assistant",
        parts: [{ type: "tool-capture_lead", output: { status: "failed", success: false } }],
      },
    ]),
    false,
  );
});

test("firstUserPreview truncates to 180 characters", () => {
  const long = "x".repeat(PREVIEW_MAX_CHARS + 20);
  const preview = firstUserPreview([{ role: "user", text: long }]);
  assert.equal(preview.length, PREVIEW_MAX_CHARS);
  assert.equal(preview.endsWith("…"), true);
});

test("hasUserText is false when the visitor has not typed", () => {
  assert.equal(hasUserText([{ role: "assistant", text: "Hi, I'm Rev." }]), false);
  assert.equal(hasUserText([{ role: "user", text: "Need a bakery site" }]), true);
});
