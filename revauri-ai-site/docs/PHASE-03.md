# Phase 3 — Capabilities, Pricing, About, FAQ

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

Rewrite these four pages for Revauri AI. Keep the same visual system (PageHero, cream/orange, motion wrappers).

Do **not** rewrite Home, Book, Contact, blog, Privacy, Terms, chatbot, or inbox.

### Shared rules

- No dollar amounts anywhere public (not $1,749, $895, $1,149, $379, not “starts at”)
- No Grok, Hermes, Claude, xAI, or model names
- No fake testimonials, case studies, or before/after websites
- No “free redesign preview”
- CTA everywhere: **Book a call** → `/book`
- Footer/header already say Revauri AI — leave them unless a leftover website link remains

---

### 1. `/capabilities`

Replace the Phase 1 placeholder with a real capabilities page.

**Hero:** Example hires / the jobs we take off your plate.

**Phone first** as a featured hire (not a price card):
- Missed / after-hours / overflow calls
- Takes name, number, what they need
- Can book only what the owner pre-approves, or get them a callback
- Never guesses prices, medical advice, or legal advice
- Not a replacement for a receptionist
- One line: live voice answering is scoped on the call

Then the other jobs, same meaning as the homepage picker:

| Job | What the hire does |
|---|---|
| Quiet leads | Follows up when a call, form, or quote goes silent |
| After-hours / missed calls | Catches the inquiry and starts the follow-up |
| Quotes with no second follow-up | Sends the next nudge so estimates do not die |
| Reviews | Asks after a good job, drafts replies to new reviews |
| Appointment reminders / no-shows | Reminds them, and follows up if they miss |
| After-the-job check-in | “How did we do?” then a review or next booking |
| Inbox / admin busywork | Drafts the repetitive replies and reminders |
| Reactivating past customers | Checks back with people who have gone quiet |
| Something else | You name the mess. We tell you if we can take it |

**What you get:** Look → Build → Run (weekly note, drafts for yes/no). Standard hire is two workflows. Bigger jobs are quoted first.

**What we do not do:** replace a receptionist/tech/office manager; send to customers without approval; medical/legal advice; run ads; rebuild the website (separate quote); let the phone hire invent prices.

---

### 2. `/pricing`

Keep a Pricing page. Make it **price-silent**.

Remove all website packages, retainers-for-sites, free preview redesign, page-count scopes, and any leftover website add-ons.

Replace with:

- Title: Pricing
- Promise: quoted on a short call. No public price list.
- What a standard hire includes: two workflows, we build them, we run them, weekly note, you approve what customers see.
- Phone hire: available as an add-on. Scoped on the call. No numbers.
- Heavier / custom work: quoted before we start. We will not absorb a job that does not fit.
- Website work: separate, only if the site itself is the leak. Point people to revauri.com for that — do not sell websites here.
- How to start: Book a call. Tell us the job you hate.

Do not show tiers with dollar amounts. Do not say “contact us for pricing” in a cheap way — say we look at the job, then quote.

---

### 3. `/about`

Rewrite for Revauri AI. Keep Joseph’s headshot and founder name if the photo file is already there.

Story, in plain language:
- Revauri AI is a product of **Revauri**, not a separate company.
- Joseph builds and runs AI employees / workflows for local service businesses.
- The promise: hire the work, including the phone. They stay the boss.
- Website redesigns are a different door (revauri.com), not this product.

Values to use (replace the website-stack values):
- You approve what customers see
- We build around how you already work
- No surprise scope — two workflows, or we quote first
- Phone is a hire, not a gimmick, and not a fake receptionist

Remove Next.js / Vercel / “conversion-focused websites” language.

---

### 4. `/faq`

Replace every website-agency question. Use these (word them cleanly, keep the meaning):

**The hire**
- What is Revauri AI? An AI employee for the job you hate. We build the workflow and run it.
- What jobs can it do? The list on Capabilities. Or name the mess.
- Does this replace my receptionist? No.

**How it works**
- What happens after I book? Short call. We name two jobs. Then we look, quote, and build.
- Do I have to approve messages? Yes. Nothing goes to a customer unless you say yes.
- How long to set up? Usually days after we agree the two jobs, not months. Do not invent a fake SLA.

**Phone**
- Can it answer the phone? Yes, as an add-on, scoped on the call.
- Will it quote prices or give medical/legal advice? No.

**Working together**
- What if the job is bigger than two workflows? We quote that before we start.
- Can I cancel? Yes. 14-day notice.
- Do you redesign websites here? Not on this product. That is a separate quote at revauri.com.

Remove free-preview, 4–6 week site builds, retainers-for-hosting, Core Web Vitals, and “do I own the website?”

---

### Also

Update each page’s `<title>` and meta description so they say Revauri AI, not website shop.

If About/FAQ/Pricing still have a bottom CTA that says “Book a Free Strategy Call” or “see a custom redesign,” change it to **Book a call**.

Run `npm run build`. Fix errors you introduced.

## Done when

- `/capabilities` is a real jobs page with phone featured and no prices
- `/pricing` has no dollar amounts and no website packages
- `/about` and `/faq` no longer sell website redesigns
- `npm run build` succeeds
- Nothing deployed

Stop. Summarize files changed. Do not start Phase 4.
