import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getGaCookieNames,
  getStoredConsent,
  markOnce,
  parseCalendlyScheduledEvent,
  resetContactFormLeadDedup,
  storeConsent,
} from "./analytics.ts";

class FakeStorage {
  store = new Map();

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  setItem(key, value) {
    this.store.set(key, value);
  }

  removeItem(key) {
    this.store.delete(key);
  }
}

test("getStoredConsent returns null when nothing is stored", () => {
  assert.equal(getStoredConsent(new FakeStorage()), null);
});

test("getStoredConsent ignores unrecognized values", () => {
  const storage = new FakeStorage();
  storage.setItem("revauri_analytics_consent", "yes-please");
  assert.equal(getStoredConsent(storage), null);
});

test("storeConsent persists granted/denied and getStoredConsent reads it back", () => {
  const storage = new FakeStorage();
  storeConsent("granted", storage);
  assert.equal(getStoredConsent(storage), "granted");
  storeConsent("denied", storage);
  assert.equal(getStoredConsent(storage), "denied");
});

test("markOnce fires the first time and is deduplicated afterward", () => {
  const storage = new FakeStorage();
  assert.equal(markOnce("k", storage), true);
  assert.equal(markOnce("k", storage), false);
  assert.equal(markOnce("k", storage), false);
});

test("markOnce tracks distinct keys independently", () => {
  const storage = new FakeStorage();
  assert.equal(markOnce("a", storage), true);
  assert.equal(markOnce("b", storage), true);
  assert.equal(markOnce("a", storage), false);
});

test("resetContactFormLeadDedup allows a later successful submission to be tracked", () => {
  const storage = new FakeStorage();
  assert.equal(markOnce("revauri_lead_contact_sent", storage), true);
  resetContactFormLeadDedup(storage);
  assert.equal(markOnce("revauri_lead_contact_sent", storage), true);
});

test("getGaCookieNames extracts only _ga-prefixed cookie names", () => {
  const cookies = "session=abc; _ga=GA1.1.111; other=1; _ga_ABCDE12345=GS1.1; _gid=GA1.1.222";
  assert.deepEqual(getGaCookieNames(cookies), ["_ga", "_ga_ABCDE12345", "_gid"]);
});

test("getGaCookieNames returns an empty array for an empty cookie string", () => {
  assert.deepEqual(getGaCookieNames(""), []);
});

test("parseCalendlyScheduledEvent accepts a well-formed event from the Calendly origin", () => {
  const result = parseCalendlyScheduledEvent("https://calendly.com", {
    event: "calendly.event_scheduled",
    payload: {
      event: { uri: "https://api.calendly.com/scheduled_events/AAAA" },
      invitee: { uri: "https://api.calendly.com/scheduled_events/AAAA/invitees/BBBB" },
    },
  });
  assert.deepEqual(result, { eventUri: "https://api.calendly.com/scheduled_events/AAAA" });
});

test("parseCalendlyScheduledEvent rejects the wrong origin", () => {
  const result = parseCalendlyScheduledEvent("https://evil.example", {
    event: "calendly.event_scheduled",
    payload: { event: { uri: "https://api.calendly.com/scheduled_events/AAAA" } },
  });
  assert.equal(result, null);
});

test("parseCalendlyScheduledEvent rejects unrelated Calendly events", () => {
  const result = parseCalendlyScheduledEvent("https://calendly.com", {
    event: "calendly.event_type_viewed",
    payload: {},
  });
  assert.equal(result, null);
});

test("parseCalendlyScheduledEvent rejects malformed payloads", () => {
  assert.equal(parseCalendlyScheduledEvent("https://calendly.com", null), null);
  assert.equal(parseCalendlyScheduledEvent("https://calendly.com", "not an object"), null);
  assert.equal(
    parseCalendlyScheduledEvent("https://calendly.com", { event: "calendly.event_scheduled" }),
    null,
  );
  assert.equal(
    parseCalendlyScheduledEvent("https://calendly.com", {
      event: "calendly.event_scheduled",
      payload: { event: {} },
    }),
    null,
  );
});
