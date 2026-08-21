# Cursor prompt — revauristudio.com

Copy everything below the line into a **new** Cursor chat. Do not add other tasks. Do not touch the other three sending-domain folders.

---

You are building a small Next.js site for **https://revauristudio.com**.

Work only in:

`/Users/josephsilvagnoli/Desktop/Revauri/revauri-sites-repo/revauristudio-site`

Create that folder with `create-next-app` (App Router, TypeScript, Tailwind, no src dir, no extra boilerplate pages you will not use).

## Use subagents

Use subagents if the tool is available:

1. One for **copy** (locked offer only — no invented prices, case studies, or SLAs).
2. One for **visual design** (distinct from revauri.ai and from the other three sending sites).
3. One to **review** the finished home page against the hard rules before you stop.

If subagents are not available, do a self-review against the hard rules and say so.

## What this site is

A **trust page** for people who got an email from `@revauristudio.com` and typed the domain into a browser.

**Job of this page:** the **craft** — how we design the hire around their business. Studio, not factory. Not a website studio.

This is **not** the product homepage. The product homepage is https://revauri.ai. Do not clone it (no dark honeycomb hero, no job-picker, no chatbot).

## Hard rules

- Do **not** edit `revauri-ai-site`, `revauri-site`, `revauridesign-site`, `revauridesigns-site`, or the other three new sending folders.
- Do **not** deploy. Do **not** add a Vercel project. Do **not** touch DNS.
- No dollar amounts anywhere.
- Never name Grok, Hermes, Claude, ChatGPT, OpenAI, xAI, or any model/vendor.
- No website redesign shop language. No free preview. No portfolio. No “strategy call.” This domain’s name is “studio” — still do **not** sell websites.
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
- Standard hire: two workflows, designed around how *their* business already talks to customers.
- Weekly note. Nothing customer-facing goes out without their yes.
- Phone is an extra hire, scoped on the call. Not a receptionist.
- Website design is a different product at revauri.com — one quiet footer line max. Do not let “studio” drift into web design.

## Visual direction (this domain only)

**Atelier / editorial.** Warm paper, deep ink, one restrained accent. Serif headlines. More magazine than dashboard. Quiet, expensive, still simple.

- Distinct type pairing (serif + clean sans). Not Fraunces-on-cream if that is what revauridesign.com already is — shift it (e.g. a sharper serif, cooler paper, or a single ink wash).
- Home page: header, hero, “designed around your business,” Look → Build → Run as a studio process, CTA, footer.
- No mock redesigns. No before/after websites.

## Copy lock

**Hero**

- Eyebrow: Revauri AI
- Headline: **Designed around your business.**
- Subhead: We do not drop in a generic bot. We watch how the work runs, design two workflows that sound like you, and we run them.
- Primary button: Book a 20-minute call → `https://revauri.ai/book`

**Process (three steps, studio language, same substance):**

1. Look — How the job runs today. Who talks to the customer. What you will and will not allow.
2. Build — Two workflows, written for this business. A walkthrough. A written “does / does not.”
3. Run — We operate it. You get a weekly note. Drafts wait for your yes.

One line under that: **If it is not repeatable, we will not fake a system for it.**

## When you are done

1. `npm run build` in `revauristudio-site`.
2. Summarize pages, what you did **not** do, and any judgment calls.
3. Stop. Do not start another domain.
