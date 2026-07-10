// Fetches real available times for the free strategy call from the Calendly
// API so Rev can offer bookable slots inline. Requires the server-only
// CALENDLY_TOKEN env var (a free Calendly personal access token). Every
// failure mode — missing token, network error, timeout, zero availability —
// resolves to { fallback: true } so the booking card can degrade to a plain
// "Book a call" link; this must never surface an error to the visitor.

const API_BASE = "https://api.calendly.com";
// The event type embedded on /book (see components/booking.tsx).
const EVENT_SCHEDULING_URL = "https://calendly.com/joseph-revauri/website-strategy-call";
// Calendly can take a few seconds under load; 8s still fits inside the route's
// 30s budget with room for the model call.
const FETCH_TIMEOUT_MS = 8_000;
const AVAILABILITY_CACHE_MS = 60_000;
const MAX_SLOTS = 4;

export type BookingSlot = {
  startTime: string; // ISO 8601, UTC
  schedulingUrl: string; // Calendly deep link with this time preselected
};

export type BookingSlotsResult = { slots: BookingSlot[] } | { fallback: true };

// Module-level caches — per serverless instance, which is fine: the event
// type URI never changes and availability only needs to be roughly fresh.
let cachedEventTypeUri: string | null = null;
let cachedAvailability: { slots: BookingSlot[]; fetchedAt: number } | null = null;

async function calendlyGet(path: string, token: string): Promise<unknown> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) {
    // The body pinpoints why (bad token, wrong param, etc.); cap it so a
    // surprise HTML error page can't flood the logs.
    const body = (await res.text().catch(() => "")).slice(0, 300);
    throw new Error(`Calendly responded ${res.status} for ${path}: ${body}`);
  }
  return res.json();
}

// Trailing-slash- and case-insensitive compare, so a cosmetic difference in
// how Calendly reports the scheduling URL can't break the match.
function schedulingUrlsEqual(a: string | undefined, b: string): boolean {
  if (typeof a !== "string") return false;
  return a.replace(/\/+$/, "").toLowerCase() === b.replace(/\/+$/, "").toLowerCase();
}

async function resolveEventTypeUri(token: string): Promise<string> {
  if (cachedEventTypeUri) return cachedEventTypeUri;

  const me = (await calendlyGet("/users/me", token)) as { resource?: { uri?: string } };
  const userUri = me.resource?.uri;
  if (!userUri) throw new Error("Calendly /users/me returned no user URI");

  // count=100 (the API max) so the match can't be lost to pagination on
  // accounts with more than the default 20 event types.
  const eventTypes = (await calendlyGet(
    `/event_types?user=${encodeURIComponent(userUri)}&count=100`,
    token,
  )) as { collection?: Array<{ uri?: string; scheduling_url?: string }> };

  const match = eventTypes.collection?.find((et) =>
    schedulingUrlsEqual(et.scheduling_url, EVENT_SCHEDULING_URL),
  );
  if (!match?.uri) {
    // Scheduling URLs are public; logging them shows at a glance whether the
    // token belongs to the wrong account or the event slug changed.
    throw new Error(
      `Strategy-call event type not found on Calendly account. Expected ${EVENT_SCHEDULING_URL}, ` +
        `account has: ${(eventTypes.collection ?? [])
          .map((et) => et.scheduling_url)
          .join(", ") || "(no event types)"}`,
    );
  }

  cachedEventTypeUri = match.uri;
  return match.uri;
}

// In-place Fisher-Yates shuffle. Math.random is fine here — this only varies
// which available times the card shows, nothing security-sensitive.
function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

// Picks up to MAX_SLOTS slots, preferring spread across different days:
// one random slot from each distinct day, then a second random slot per day
// if there aren't enough days, and so on. Randomizing within each day keeps
// the card from always showing the earliest (often least convenient) times.
function pickSpreadSlots(slots: BookingSlot[]): BookingSlot[] {
  const byDay = new Map<string, BookingSlot[]>();
  for (const slot of slots) {
    const day = slot.startTime.slice(0, 10);
    const daySlots = byDay.get(day) ?? [];
    daySlots.push(slot);
    byDay.set(day, daySlots);
  }
  for (const daySlots of byDay.values()) shuffle(daySlots);

  const picked: BookingSlot[] = [];
  for (let round = 0; picked.length < MAX_SLOTS; round++) {
    let added = false;
    for (const daySlots of byDay.values()) {
      if (picked.length >= MAX_SLOTS) break;
      if (daySlots[round]) {
        picked.push(daySlots[round]);
        added = true;
      }
    }
    if (!added) break;
  }

  return picked.sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export async function getBookingSlots(): Promise<BookingSlotsResult> {
  const token = process.env.CALENDLY_TOKEN;
  if (!token) {
    console.error("[calendly] CALENDLY_TOKEN is not set on this deployment — using fallback card");
    return { fallback: true };
  }

  const now = Date.now();
  if (cachedAvailability && now - cachedAvailability.fetchedAt < AVAILABILITY_CACHE_MS) {
    return cachedAvailability.slots.length > 0
      ? { slots: cachedAvailability.slots }
      : { fallback: true };
  }

  try {
    const eventTypeUri = await resolveEventTypeUri(token);

    // The endpoint caps the queried window at 7 days.
    const startTime = new Date(now + 60 * 60 * 1000).toISOString();
    const endTime = new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString();
    const data = (await calendlyGet(
      `/event_type_available_times?event_type=${encodeURIComponent(eventTypeUri)}` +
        `&start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}`,
      token,
    )) as {
      collection?: Array<{ status?: string; start_time?: string; scheduling_url?: string }>;
    };

    const available: BookingSlot[] = (data.collection ?? [])
      .filter(
        (s): s is { status: string; start_time: string; scheduling_url: string } =>
          s.status === "available" &&
          typeof s.start_time === "string" &&
          typeof s.scheduling_url === "string",
      )
      .map((s) => ({ startTime: s.start_time, schedulingUrl: s.scheduling_url }));

    const slots = pickSpreadSlots(available);
    cachedAvailability = { slots, fetchedAt: now };
    if (slots.length === 0) {
      console.error(
        `[calendly] API reachable but no available slots in the next 7 days ` +
          `(${data.collection?.length ?? 0} raw entries) — using fallback card`,
      );
      return { fallback: true };
    }
    return { slots };
  } catch (err) {
    // Bad token, timeout, missing event type, or an API change — degrade to
    // the /book link, but leave the reason in the function logs.
    console.error("[calendly] failed to fetch booking slots — using fallback card", err);
    return { fallback: true };
  }
}
