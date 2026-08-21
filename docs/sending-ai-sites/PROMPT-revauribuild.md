# Cursor prompt — revauribuild.com

Copy everything below the line into a **new** Cursor chat. Do not add other tasks. Do not touch the other three sending-domain folders.

---

You are building a small Next.js site for **https://revauribuild.com**.

Work only in:

`/Users/josephsilvagnoli/Desktop/Revauri/revauri-sites-repo/revauribuild-site`

Create that folder with `create-next-app` (App Router, TypeScript, Tailwind, no src dir, no extra boilerplate pages you will not use).

## Use subagents

Use subagents if the tool is available:

1. One for **copy** (locked offer only — no invented prices, case studies, or SLAs).
2. One for **visual design** (distinct from revauri.ai and from the other three sending sites).
3. One to **review** the finished home page against the hard rules before you stop.

If subagents are not available, do a self-review against the hard rules and say so.

## What this site is

A **trust page** for people who got an email from `@revauribuild.com` and typed the domain into a browser.

**Job of this page:** we **build** the AI hire. Look at how the work runs today → build two workflows around their business → we run them. They stay the boss.

This is **not** the product homepage. The product homepage is https://revauri.ai. Do not clone it (no dark honeycomb hero, no job-picker demo, no chatbot).

## Hard rules

- Do **not** edit `revauri-ai-site`, `revauri-site`, `revauridesign-site`, `revauridesigns-site`, or the other three new sending folders.
- Do **not** deploy. Do **not** add a Vercel project. Do **not** touch DNS.
- No dollar amounts anywhere (not $1,749, not $895, not $1,149).
- Never name Grok, Hermes, Claude, ChatGPT, OpenAI, xAI, or any model/vendor.
- No website redesign shop language. No free preview. No portfolio. No “strategy call.”
- No fake stats, testimonials, client logos, or case studies.
- Official Revauri wordmark only. Copy the logo component/asset from `../revauridesign-site/components/logo.tsx` (and any SVG it uses). Transparent or page-matched background — **never** an opaque cream rectangle or cropped paste.
- Every primary CTA goes to `https://revauri.ai/book` (20-minute Revauri AI Call). Secondary “see the product” links go to `https://revauri.ai`.
- Contact: `joseph@revauri.com` only. Do not invent other inboxes.
- Footer: “A Revauri company.” Belleville, NJ address: 725 Joralemon Street, Unit 127, Belleville, NJ 07109.
- Privacy / Terms: link out to `https://revauri.ai/privacy` and `https://revauri.ai/terms`. Do not rewrite legal pages here.
- No chatbot. No blog. No /inbox. No Calendly embed (the book link is enough).
- `npm run build` must pass.

## Locked offer (use this wording, do not invent)

- Public name: **Revauri AI** (this domain is a door, not a separate company).
- Promise: an AI employee for the job the owner hates. We build the workflow. We run it. They stay the boss.
- Standard hire: two workflows. We look at how the work runs today, we build, we run, weekly note.
- Nothing customer-facing goes out without their written yes.
- Phone answering is a **headline extra hire**, quoted on the call. It is **not** a receptionist replacement. It does not guess prices. It does not give medical/legal advice.
- Website design is a different product at revauri.com — one quiet line in the footer is enough. Do not sell websites here.

## Visual direction (this domain only)

**Workshop / build.** Charcoal, copper, warm off-white. Feels like a shop floor where systems get assembled — not a SaaS marketing site, not a cream agency brochure, not the revauri.ai honeycomb.

- Distinct type pairing (not the same as revauri.ai).
- One short home page: header, hero, how we build (Look → Build → Run), what you stay in charge of, CTA, footer.
- Mobile-first. Fast. No stock-photo collage of smiling receptionists.

## Copy lock for the hero

- Eyebrow: Revauri AI
- Headline: **We build the hire.**
- Subhead: We look at the job you hate, build the workflow around your business, and run it. You stay the boss.
- Primary button: Book a 20-minute call → `https://revauri.ai/book`
- Text link: See Revauri AI → `https://revauri.ai`

## When you are done

1. `npm run build` in `revauribuild-site`.
2. Summarize pages, what you did **not** do (no deploy), and any judgment calls.
3. Stop. Do not start another domain.
