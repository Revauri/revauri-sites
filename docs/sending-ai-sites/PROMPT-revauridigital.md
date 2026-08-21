# Cursor prompt — revauridigital.com

Copy everything below the line into a **new** Cursor chat. Do not add other tasks. Do not touch the other three sending-domain folders.

---

You are building a small Next.js site for **https://revauridigital.com**.

Work only in:

`/Users/josephsilvagnoli/Desktop/Revauri/revauri-sites-repo/revauridigital-site`

Create that folder with `create-next-app` (App Router, TypeScript, Tailwind, no src dir, no extra boilerplate pages you will not use).

## Use subagents

Use subagents if the tool is available:

1. One for **copy** (locked offer only — no invented prices, case studies, or SLAs).
2. One for **visual design** (distinct from revauri.ai and from the other three sending sites).
3. One to **review** the finished home page against the hard rules before you stop.

If subagents are not available, do a self-review against the hard rules and say so.

## What this site is

A **trust page** for people who got an email from `@revauridigital.com` and typed the domain into a browser.

**Job of this page:** digital busywork — inbox, follow-ups, admin. The hire that keeps the thread from dying.

This is **not** the product homepage. The product homepage is https://revauri.ai. Do not clone it (no dark honeycomb hero, no job-picker, no chatbot).

## Hard rules

- Do **not** edit `revauri-ai-site`, `revauri-site`, `revauridesign-site`, `revauridesigns-site`, or the other three new sending folders.
- Do **not** deploy. Do **not** add a Vercel project. Do **not** touch DNS.
- No dollar amounts anywhere.
- Never name Grok, Hermes, Claude, ChatGPT, OpenAI, xAI, or any model/vendor.
- No website redesign shop language. No free preview. No portfolio. No “strategy call.”
- No fake stats, testimonials, client logos, or case studies.
- Official Revauri wordmark only. Copy the logo component/asset from `../revauridesign-site/components/logo.tsx` (and any SVG it uses). Transparent or page-matched background — **never** an opaque cream rectangle or cropped paste.
- Every primary CTA goes to `https://revauri.ai/book` (20-minute Revauri AI Call). Secondary links go to `https://revauri.ai`.
- Contact: `joseph@revauri.com` only.
- Footer: “A Revauri company.” Address: 725 Joralemon Street, Unit 127, Belleville, NJ 07109.
- Privacy / Terms: link to `https://revauri.ai/privacy` and `https://revauri.ai/terms`.
- No chatbot. No blog. No /inbox. No Calendly embed.
- `npm run build` must pass.

## Locked offer

- Public name: **Revauri AI**.
- Promise: an AI employee for the job the owner hates. We build the workflow. We run it. They stay the boss.
- Standard hire: two workflows. Weekly note. Nothing customer-facing goes out without their yes.
- Phone is available as an extra hire (mention once, do not make this a phone site). Not a receptionist.
- Website design is a different product at revauri.com — one quiet footer line max.

## Visual direction (this domain only)

**Inbox / night desk.** Cool slate, ink, a single electric accent (teal or violet — not revauri.ai orange, not revauribuild copper). Feels like a calm operations console, not a consumer app, not a law-firm site.

- Distinct type pairing. More UI-like type is fine; do not fake a product screenshot of a real inbox.
- Home page: header, hero, three digital jobs, how approval works, CTA, footer.

## Copy lock

**Hero**

- Eyebrow: Revauri AI
- Headline: **The digital work that never ends.**
- Subhead: Follow-ups. Inbox. Reminders. The tabs you leave open. We build a hire for that work and we run it.
- Primary button: Book a 20-minute call → `https://revauri.ai/book`

**Three blocks (do not add a nine-card grid — that belongs on revauribuilds.com):**

1. Follow-ups that do not die — When a quote or form goes quiet, the hire sends the next note in your voice, on the schedule you approved.
2. Inbox and admin — Repeatable replies, filing, the copy-paste work that eats the afternoon.
3. Reminders and check-ins — Appointments, no-shows, after-the-job notes — the same message, every time, without you remembering.

Then: **You approve anything a customer will see.** Fourteen days of silence pauses those sends. Internal steps keep running.

## When you are done

1. `npm run build` in `revauridigital-site`.
2. Summarize pages, what you did **not** do, and any judgment calls.
3. Stop. Do not start another domain.
