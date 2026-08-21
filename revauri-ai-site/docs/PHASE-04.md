# Phase 4 — Book + Contact

Copy everything below the line into a **new** Cursor chat. Do not add other tasks.

---

You are working in `/Users/josephsilvagnoli/Desktop/Revauri/revauri-sites-repo/revauri-ai-site`.

This is the revauri.ai site. It is **not live**. Do not deploy. Do not run `vercel`. Do not edit `../revauri-site`.

Read first:
- `docs/RULES.md`
- `docs/locked/13-revauri-ai-end-to-end-plan.md`
- `docs/PHASES.md`

## Do only this phase

Wire Book and Contact to Revauri AI. Keep the existing Calendly embed and web3forms form — change the copy and the destinations.

### 1. Book page

Files: `app/book/page.tsx`, `components/booking.tsx`

**Required Calendly URL (already created):**
`https://calendly.com/joseph-revauri/revauri-ai-call`

- Change `CALENDLY_URL` in `components/booking.tsx` from `website-strategy-call` to that URL. Keep the existing embed query params and widget behavior.
- Rewrite the Book page title / subtitle / chips so this is a **15-minute Revauri AI call** about the job they want to hand off. Not a website strategy call. Not a free redesign preview.
- Suggested meaning (tighten the wording if you want):
  - Title: Let’s name the job you want off your plate
  - Subtitle: A 15-minute call. We hear the mess, tell you if a hire can take it, and what happens next.
  - Chips: 15 minutes · No obligation · You stay the boss
- Update the small line above the widget (“Free 15-minute strategy call…”) to match.
- Metadata title/description: Revauri AI, not website shop.
- No dollar amounts.

### 2. Also point the chatbot’s booking URL at the new event

File: `lib/chat/calendly.ts`

Change `EVENT_SCHEDULING_URL` to `https://calendly.com/joseph-revauri/revauri-ai-call`.

Do **not** rewrite the chatbot prompt. That is Phase 5. Only the event URL.

### 3. Contact page

Files: `app/contact/page.tsx`, `app/contact/contact-content.tsx`

- Title/subtitle: Contact Revauri AI. Message about a job they want handed off. Offer Book a call as the faster path.
- Success state: drop “strategy call” / “your project” website language. Point them to Book a call if they want to talk.
- Keep the same web3forms `access_key`. Do not invent a new key.
- Change hidden `subject` to: `New message from revauri.ai`
- Change hidden `redirect` from `https://www.revauri.com/contact?sent=true` to a same-site success URL. Use `/contact?sent=true` if Web3Forms accepts a path; if it requires a full URL, use a relative-friendly approach that will not send people to revauri.com. For local checks, `/contact?sent=true` must still show the success card.
- Metadata: Revauri AI.

### Do not

- Rewrite Home, Capabilities, Pricing, About, FAQ, blog, Privacy, Terms, or the chatbot system prompt
- Deploy, `vercel link`, or point DNS
- Put prices on the page
- Name Grok, Hermes, Claude, or xAI
- Reuse `website-strategy-call` anywhere in this site after this phase

Run `npm run build`. Fix errors you introduced.

## Done when

- `/book` embeds `https://calendly.com/joseph-revauri/revauri-ai-call`
- Book/Contact copy is Revauri AI, not website redesign
- Contact form still uses the existing web3forms key, subject says revauri.ai, and success does not bounce to revauri.com
- `lib/chat/calendly.ts` uses the new event URL
- `npm run build` succeeds
- Nothing deployed

Stop. Summarize files changed. Do not start Phase 5.
