import { test } from "node:test";
import assert from "node:assert/strict";

process.env.CHAT_INBOX_SECRET = "test-inbox-secret-for-hmac";

const { passwordsMatch, signInboxToken, verifyInboxToken } = await import("./inbox-auth.ts");

test("verifyInboxToken accepts a freshly signed token", () => {
  const now = Date.parse("2026-08-13T12:00:00.000Z");
  const token = signInboxToken(now);
  assert.equal(verifyInboxToken(token, now + 1_000), true);
});

test("verifyInboxToken rejects a tampered HMAC", () => {
  const now = Date.parse("2026-08-13T12:00:00.000Z");
  const token = signInboxToken(now);
  const [version, exp, mac] = token.split(".");
  const flipped = mac.endsWith("a") ? `${mac.slice(0, -1)}b` : `${mac.slice(0, -1)}a`;
  assert.equal(verifyInboxToken(`${version}.${exp}.${flipped}`, now), false);
});

test("verifyInboxToken rejects an expired token", () => {
  const now = Date.parse("2026-08-13T12:00:00.000Z");
  const token = signInboxToken(now);
  const later = now + 15 * 24 * 60 * 60 * 1000;
  assert.equal(verifyInboxToken(token, later), false);
});

test("passwordsMatch is length-safe and compares exactly", () => {
  assert.equal(passwordsMatch("correct-horse", "correct-horse"), true);
  assert.equal(passwordsMatch("short", "correct-horse"), false);
  assert.equal(passwordsMatch("correct-horsx", "correct-horse"), false);
  assert.equal(passwordsMatch("anything", ""), false);
});
