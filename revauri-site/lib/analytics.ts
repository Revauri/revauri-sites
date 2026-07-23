// Consent-gated GA4 analytics helper. This module must never send
// personally identifiable information (names, emails, phone numbers,
// website URLs, or free-text field values) — only fixed, non-PII event
// parameters, and only after the visitor has explicitly granted consent.

export const GA_MEASUREMENT_ID = "G-NZTSMCQCRB";

const CONSENT_STORAGE_KEY = "revauri_analytics_consent";
const CONSENT_CHANGE_EVENT = "revauri:analytics-consent-changed";
const OPEN_PREFERENCES_EVENT = "revauri:open-cookie-preferences";

export type ConsentValue = "granted" | "denied";

type ReadableStorage = Pick<Storage, "getItem">;
type WritableStorage = Pick<Storage, "getItem" | "setItem">;

export function getStoredConsent(storage: ReadableStorage = window.localStorage): ConsentValue | null {
  const value = storage.getItem(CONSENT_STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function storeConsent(value: ConsentValue, storage: Pick<Storage, "setItem"> = window.localStorage): void {
  storage.setItem(CONSENT_STORAGE_KEY, value);
  notifyConsentChanged();
}

export function clearStoredConsent(storage: Pick<Storage, "removeItem"> = window.localStorage): void {
  storage.removeItem(CONSENT_STORAGE_KEY);
}

function notifyConsentChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function onConsentChanged(handler: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, handler);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
}

// Lets the persistent footer "Cookie preferences" control reopen the
// consent banner without the two components needing a shared parent state.
export function requestCookiePreferences(): void {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

export function onCookiePreferencesRequested(handler: () => void): () => void {
  window.addEventListener(OPEN_PREFERENCES_EVENT, handler);
  return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handler);
}

// Pure parser so cookie-clearing logic is unit-testable without a real
// `document`. Matches GA's first-party cookies: _ga, _gid, _gat, _ga_<id>.
function isGaCookieName(name: string): boolean {
  return name === "_ga" || name === "_gid" || name === "_gat" || name.startsWith("_ga_");
}

export function getGaCookieNames(cookieString: string): string[] {
  if (!cookieString) return [];
  return cookieString
    .split(";")
    .map((pair) => pair.split("=")[0]?.trim())
    .filter((name): name is string => !!name && isGaCookieName(name));
}

export function deleteGaCookies(): void {
  const names = getGaCookieNames(document.cookie);
  if (names.length === 0) return;

  const hostParts = window.location.hostname.split(".");
  const parentDomain = hostParts.length > 1 ? `.${hostParts.slice(-2).join(".")}` : null;

  for (const name of names) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    if (parentDomain) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${parentDomain}`;
    }
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Sets up the standard gtag.js dataLayer queue and issues the config call.
// Safe to call before the external gtag.js script tag has finished loading —
// gtag.js drains the queued dataLayer entries once it loads.
export function initGa(): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
  // Re-notify listeners now that gtag can queue events. This catches a
  // confirmed contact success that rendered before the consent component.
  notifyConsentChanged();
}

type NonPiiEventParams = Record<string, string>;

function sendEvent(name: string, params: NonPiiEventParams): boolean {
  if (getStoredConsent() !== "granted") return false;
  if (typeof window.gtag !== "function") return false;
  window.gtag("event", name, params);
  return true;
}

// Fires `handler` at most once per `key`, using an injectable storage so the
// dedup logic itself is unit-testable without real browser storage.
export function markOnce(key: string, storage: WritableStorage): boolean {
  if (storage.getItem(key)) return false;
  storage.setItem(key, "1");
  return true;
}

const CONTACT_LEAD_DEDUP_KEY = "revauri_lead_contact_sent";

export function resetContactFormLeadDedup(
  storage: Pick<Storage, "removeItem"> = window.sessionStorage,
): void {
  storage.removeItem(CONTACT_LEAD_DEDUP_KEY);
}

// Tracks a confirmed contact-form success exactly once per success visit
// (session-scoped). Only fires if analytics consent is currently granted.
export function trackContactFormLead(): void {
  if (getStoredConsent() !== "granted") return;
  if (window.sessionStorage.getItem(CONTACT_LEAD_DEDUP_KEY)) return;
  if (sendEvent("generate_lead", { source: "contact_form" })) {
    window.sessionStorage.setItem(CONTACT_LEAD_DEDUP_KEY, "1");
  }
}

const CALENDLY_ALLOWED_ORIGIN = "https://calendly.com";

// Validates a postMessage as a genuine Calendly "event_scheduled"
// notification and extracts a non-PII scheduling identifier for dedup.
// Deliberately ignores invitee details (name/email/phone) in the payload.
export function parseCalendlyScheduledEvent(origin: string, data: unknown): { eventUri: string } | null {
  if (origin !== CALENDLY_ALLOWED_ORIGIN) return null;
  if (typeof data !== "object" || data === null) return null;

  const message = data as Record<string, unknown>;
  if (message.event !== "calendly.event_scheduled") return null;

  const payload = message.payload;
  if (typeof payload !== "object" || payload === null) return null;

  const eventInfo = (payload as Record<string, unknown>).event;
  if (typeof eventInfo !== "object" || eventInfo === null) return null;

  const uri = (eventInfo as Record<string, unknown>).uri;
  if (typeof uri !== "string" || !uri) return null;

  return { eventUri: uri };
}

// Tracks a Calendly booking exactly once per distinct scheduling event.
// Only fires if analytics consent is currently granted.
export function trackCalendlyLead(eventUri: string): void {
  if (getStoredConsent() !== "granted") return;
  const dedupKey = `revauri_lead_calendly_${eventUri}`;
  if (window.sessionStorage.getItem(dedupKey)) return;
  if (sendEvent("generate_lead", { source: "calendly" })) {
    window.sessionStorage.setItem(dedupKey, "1");
  }
}
