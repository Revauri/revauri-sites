import { test } from "node:test";
import assert from "node:assert/strict";
import { CHAT_SOURCE, normalizeChatSource } from "./source.ts";

test("CHAT_SOURCE is revauri.com on this site", () => {
  assert.equal(CHAT_SOURCE, "revauri.com");
});

test("normalizeChatSource keeps known sources and defaults the rest", () => {
  assert.equal(normalizeChatSource("revauri.ai"), "revauri.ai");
  assert.equal(normalizeChatSource("revauri.com"), "revauri.com");
  assert.equal(normalizeChatSource(undefined), "revauri.com");
  assert.equal(normalizeChatSource("other"), "revauri.com");
});
