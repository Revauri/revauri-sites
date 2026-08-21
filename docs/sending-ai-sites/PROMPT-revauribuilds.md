# Cursor prompt — revauribuilds.com

Copy everything below the line into a **new** Cursor chat. Do not add other tasks. Do not touch the other three sending-domain folders.

---

You are building a small Next.js site for **https://revauribuilds.com**.

Work only in:

`/Users/josephsilvagnoli/Desktop/Revauri/revauri-sites-repo/revauribuilds-site`

Create that folder with `create-next-app` (App Router, TypeScript, Tailwind, no src dir, no extra boilerplate pages you will not use).

## Use subagents

Use subagents if the tool is available:

1. One for **copy** (locked offer only — no invented prices, case studies, or SLAs).
2. One for **visual design** (distinct from revauri.ai and from the other three sending sites).
3. One to **review** the finished home page against the hard rules before you stop.

If subagents are not available, do a self-review against the hard rules and say so.

## What this site is

A **trust page** for people who got an email from `@revauribuilds.com` and typed the domain into a browser.

**Job of this page:** the **jobs** a hire can take. Show the work, not the stack.

This is **not** the product homepage. The product homepage is https://revauri.ai. Do not clone it (no dark honeycomb hero, no interactive job-picker, no chatbot).

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
- Phone is a headline **extra** hire, scoped on the call. Not a receptionist. Does not guess prices. Does not give medical/legal advice.
- Website design is a different product at revauri.com — one quiet footer line max.

## Visual direction (this domain only)

**Job board / workbench of tasks.** Brighter than revauribuild. Soft paper background, ink text, one sharp accent (not the same copper as revauribuild, not the revauri.ai orange-on-black honeycomb). A clear grid of jobs.

- Distinct type pairing.
- Home page: header, hero, job cards, “two jobs to start,” CTA, footer.
- Static cards only — no picker that pretends to configure a system.

## Copy lock

**Hero**

- Eyebrow: Revauri AI
- Headline: **The jobs a hire can take.**
- Subhead: Quiet leads. Missed calls. Quotes that die. Reviews. Reminders. The busywork you keep meaning to hand off.
- Primary button: Book a 20-minute call → `https://revauri.ai/book`

**Job cards — use these nine, this wording (do not invent more):**

1. Quiet leads — A form, call, or quote goes quiet. The hire waits the agreed time, then sends a short follow-up in the owner’s voice.
2. After-hours / missed calls — The hire answers, takes a name and number, and books only what you pre-approve.
3. Quotes with no second follow-up — The hire sends the next note so the quote does not die in the inbox.
4. Reviews — When a new review lands, it drafts a reply for your yes / no.
5. Appointment reminders / no-shows — The hire sends the reminder you already meant to send.
6. After-the-job check-in — A short “how did it go?” so the job does not end in silence.
7. Inbox / admin busywork — Repeatable messages and filing the hire can run the same way every time.
8. Reactivating past customers — A polite check-in to people who already know you.
9. Something else — If the job is repeatable, we can usually take it. We name it on the call.

After the grid: one line — **A standard hire starts with two of these.** Then the book CTA.

## When you are done

1. `npm run build` in `revauribuilds-site`.
2. Summarize pages, what you did **not** do, and any judgment calls.
3. Stop. Do not start another domain.
