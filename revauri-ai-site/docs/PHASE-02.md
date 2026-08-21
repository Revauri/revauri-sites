# Phase 2 — home hero + job picker

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

Replace the homepage with the real **combined hero + job-picker demo**. Do not rewrite About, Pricing, FAQ, Book, Contact, Privacy, Terms, blog, or the chatbot.

### Hero (first screen)

Same Revauri look as revauri.com (cream, orange, wordmark). Product feel, not an agency brochure.

- Headline idea (you may tighten the wording, keep the meaning): **Hire the work. Including the phone.**
- Subhead: We put an AI employee on the job you hate. We build the workflow. We run it. You stay the boss.
- Mention the phone hire as part of the promise — missed / after-hours / overflow calls — **not** “replaces your receptionist.”
- Primary CTA: **Book a call** → `/book`
- Secondary CTA: **See the jobs** → scroll to the picker
- No dollar amounts. No fake stats. No before/after websites. No client names.

### Job picker (directly under the hero)

Visitor picks a job. Show a short workflow preview. Then a Book a call CTA.

Jobs, in this order:

1. Quiet leads
2. After-hours / missed calls
3. Quotes with no second follow-up
4. Reviews
5. Appointment reminders / no-shows
6. After-the-job check-in
7. Inbox / admin busywork
8. Reactivating past customers
9. Something else (they type it)

Use this preview copy. Do not invent extra jobs or extra claims.

**Quiet leads**  
A form, call, or quote goes quiet. The hire waits the agreed time, then sends a short follow-up in the owner’s voice. You approve the first ones. After that it runs the same way.

**After-hours / missed calls**  
Someone calls when you cannot pick up. The hire captures name, number, and what they need, then starts the follow-up so the job does not die in voicemail.

**Quotes with no second follow-up**  
The estimate went out. Nobody nudged it. The hire sends the next check-in so the quote does not sit forever.

**Reviews**  
After a good job, the hire asks for the review. When a new review lands, it drafts a reply for your yes / no.

**Appointment reminders / no-shows**  
The hire reminds them before the visit, and follows up if they miss.

**After-the-job check-in**  
“How did we do?” Then a review ask or a next booking, if they are happy.

**Inbox / admin busywork**  
The hire drafts the repetitive replies and reminders so you are not rewriting the same email.

**Reactivating past customers**  
People who used you once and went quiet get a simple check-back.

**Something else**  
If they type a job: show a **generic custom-workflow** preview — we look at how that mess works today, name the steps, build the hire, you approve what customers see — then ask them to **Book a call**. Do not invent a detailed custom system on the page. Do not quote a price.

### Phone in the picker

After-hours / missed calls is in the list. The hero already treats the phone as a headline hire. You may add one short line under that job: live voice answering is available and scoped on the call. Still no prices.

### Keep

- Header / footer from Phase 1
- Final CTA + support channels are fine if they already talk about handing off a job. Update them only if they still sound like website redesign.

### Do not

- Put $1,749, $895, $1,149, or $379 anywhere public
- Name Grok, Hermes, Claude, or xAI
- Invent testimonials, case studies, or “47% more leads”
- Build a live phone demo
- Start Phase 3 pages
- Deploy

Then run `npm run build` and fix errors you introduced.

## Done when

- Home first screen is hire-the-work, including the phone
- All 9 picker options work
- “Something else” shows a generic preview, then Book a call
- `npm run build` succeeds
- No public prices, no fake proof, no deploy

Stop. Summarize the files you changed. Do not start Phase 3.
