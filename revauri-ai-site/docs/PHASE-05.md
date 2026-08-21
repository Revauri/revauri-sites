# Phase 5 — 20-minute copy + chatbot rewrite

Copy everything below the line into a **new** Cursor chat. Do not add other tasks.

---

You are working in `/Users/josephsilvagnoli/Desktop/Revauri/revauri-sites-repo/revauri-ai-site`.

This is the revauri.ai site. It is **not live**. Do not deploy. Do not run `vercel`. Do not edit `../revauri-site`.

Read first:
- `docs/RULES.md`
- `docs/locked/13-revauri-ai-end-to-end-plan.md`
- `docs/locked/14-revauri-ai-capabilities-client.md`
- `docs/PHASES.md`

## Do only this phase

Two jobs: (A) change every public “15-minute” call to **20 minutes**. (B) Rewrite the chatbot so it sells Revauri AI, not websites.

Do not rewrite blog, Privacy, Terms, or deploy.

---

### A. Call length is 20 minutes

The live Calendly event `revauri-ai-call` is **20 minutes**. Update site copy that still says 15.

At least:
- `app/book/page.tsx` (title metadata, subtitle, chip)
- `components/booking.tsx` (line above the widget)
- `app/contact/page.tsx` metadata
- `app/contact/contact-content.tsx` success card
- Any chatbot strings you touch in part B (`lib/chat/tools.ts`, booking card captions)

Do not invent other durations.

---

### B. Chatbot = Revauri AI

Keep the architecture. Do **not** change OpenRouter wiring, `capture_lead` as a client tool, or stream plumbing.

Rewrite **facts and copy** so Rev is the Revauri AI assistant.

#### System prompt (`lib/chat/system-prompt.ts`)

Replace the website-agency facts. Keep the good guardrails (no dollar amounts, lead card order, booking-card timezone rules, short tone, never name models).

New company facts:
- Rev speaks for **Revauri AI**, a product of Revauri (same company).
- Promise: an AI employee for the job they hate. We build the workflow. We run it. They stay the boss.
- Jobs: quiet leads, missed/after-hours calls, quote follow-up, reviews, reminders/no-shows, after-the-job check-in, inbox/admin, reactivating past customers, or something else they name.
- Phone is a headline extra hire, scoped on the call, not a receptionist replacement. Never quotes prices or gives medical/legal advice.
- Standard hire is two workflows. Bigger jobs quoted first.
- Public site is price-silent. Never state, imply, or ballpark any dollar amount.
- Call is a **20-minute Revauri AI Call** at /book. Not a website strategy call. No free redesign preview.
- Website redesigns are a different door: revauri.com. Do not sell websites here. If they only want a website, say so and point them to revauri.com or joseph@revauri.com.
- Cancel: 14-day notice.
- Nothing goes to a customer unless the owner says yes.
- Never name Grok, Hermes, Claude, xAI, or any model.

Lead qualification fields to gather (plain conversation, not an interrogation):
- name, email, business type
- the job they want off their plate
- whether the phone is part of it

Not: current website status / redesign / page count.

Past work: we have **no Revauri AI case studies**. Do **not** call `show_portfolio`. Do not show Lion Law / Cryptrac / Ultaura as proof of this product. If they ask for examples, describe the job list / Capabilities page and offer the call.

Booking bias stays: prefer `offer_booking` when they want to start or ask price/process.

#### Tools and UI copy

- `lib/chat/tools.ts`
  - `offer_booking` description: 20-minute Revauri AI call, not strategy/redesign.
  - `submitLead` subject: `New chatbot inquiry — revauri.ai`
  - `get_project_highlight` cards: replace website facts. Allowed topics only, no dollars. Example: 20-minute call / two workflows / you approve what customers see. Or remove website-only topics (4–6 weeks, two design revisions).
- `lib/chat/notify-new-chat.ts` subject: `New chat started — revauri.ai`
- `components/chat/booking-card.tsx`: 20-minute Revauri AI call, not “FREE STRATEGY CALL”
- `components/chat/chat-empty-state.tsx`: starters like “What jobs can you take?”, “Book a call”, “How does pricing work?” — never “View portfolio”
- `components/chat/chat-followup-chips.tsx` if it still says Get pricing / View portfolio in a website way

Leave `show_portfolio` in the code if removing it would break the route, but the prompt must never call it.

#### Do not

- Put $1,749 / $895 / phone prices in the prompt or UI
- Complete a real lead / click Send inquiry
- Deploy
- Touch `../revauri-site`

Run `npm run build`. Fix errors you introduced.

## Done when

- No public “15-minute” left on Book/Contact/chat UI
- Chatbot prompt has zero website-redesign / free preview / portfolio-as-proof language
- Chat starters are Revauri AI
- Lead emails would be labeled revauri.ai
- `npm run build` succeeds
- Nothing deployed

Stop. Summarize files changed. Do not start Phase 6.
