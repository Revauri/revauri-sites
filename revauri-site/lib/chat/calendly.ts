// Fetches real available times for the free strategy call from the Calendly
// API so Rev can offer bookable slots inline. Requires the server-only
// CALENDLY_TOKEN env var (a free Calendly personal access token). Every
// failure mode — missing token, network error, timeout, zero availability —
// resolves to { fallback: true } so the booking card can degrade to a plain
// "Book a call" link; this must never surface an error to the visitor.

const API_BASE = "https://api.calendly.com";
// The event type embedded on /book (see components/booking.tsx).
const EVENT_SCHEDULING_URL = "https://calendly.com/joseph-revauri/website-strategy-call";
const FETCH_TIMEOUT_MS = 5_000;
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
  if (!res.ok) throw new Error(`Calendly responded ${res.status} for ${path}`);
  return res.json();
}

async function resolveEventTypeUri(token: string): Promise<string> {
  if (cachedEventTypeUri) return cachedEventTypeUri;

  const me = (await calendlyGet("/users/me", token)) as { resource?: { uri?: string } };
  const userUri = me.resource?.uri;
  if (!userUri) throw new Error("Calendly /users/me returned no user URI");

  const eventTypes = (await calendlyGet(
    `/event_types?user=${encodeURIComponent(userUri)}`,
    token,
  )) as { collection?: Array<{ uri?: string; scheduling_url?: string }> };

  const match = eventTypes.collection?.find(
    (et) => et.scheduling_url === EVENT_SCHEDULING_URL,
  );
  if (!match?.uri) throw new Error("Strategy-call event type not found on Calendly account");

  cachedEventTypeUri = match.uri;
  return match.uri;
}

// Picks up to MAX_SLOTS slots, preferring spread across different days:
// first slot of each distinct day, then second slots, and so on.
function pickSpreadSlots(slots: BookingSlot[]): BookingSlot[] {
  const byDay = new Map<string, BookingSlot[]>();
  for (const slot of slots) {
    const day = slot.startTime.slice(0, 10);
    const daySlots = byDay.get(day) ?? [];
    daySlots.push(slot);
    byDay.set(day, daySlots);
  }

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
  if (!token) return { fallback: true };

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
    return slots.length > 0 ? { slots } : { fallback: true };
  } catch {
    // Missing/bad token, timeout, or an API change — degrade to the /book link.
    return { fallback: true };
  }
}
