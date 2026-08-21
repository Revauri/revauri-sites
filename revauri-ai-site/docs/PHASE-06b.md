# Phase 6b — rewrite Terms for Revauri AI

Copy everything below the line into a **new** Cursor chat. Do not add other tasks.

---

You are working in `/Users/josephsilvagnoli/Desktop/Revauri/revauri-sites-repo/revauri-ai-site`.

This is the revauri.ai site. It is **not live**. Do not deploy. Do not run `vercel`. Do not edit `../revauri-site`.

Read first:
- `docs/RULES.md`
- `docs/locked/13-revauri-ai-end-to-end-plan.md`
- `docs/locked/09-revauri-ai-digital-hire-offer.md`
- `app/faq/page.tsx` (cancel is 14-day notice)
- current `app/terms/page.tsx`

## Do only this phase

Rewrite `app/terms/page.tsx` so it describes **Revauri AI**, not a website studio. Keep the same page chrome (PageHero, prose classes, footer/header). Keep New Jersey law, the $10,000 small-claims / arbitration split, confidentiality, force majeure, severability, and “signed Service Agreement controls.”

### Product facts you must match

- We build and run AI workflows / an AI employee for jobs the owner hates.
- Standard hire: two workflows, we build them, we run them, weekly note, owner approves what customers see.
- Phone answering is an optional add-on, scoped in the quote. Not a receptionist replacement. No invented prices. No medical/legal/licensed advice.
- Bigger work is quoted before we start.
- Website design is a **separate** product at revauri.com — mention it only as “quoted separately, not this product.”
- Public site is price-silent. **Do not put $1,749, $895, $1,149, or $379 in Terms.** Say fees are in the written quote and Service Agreement.
- Cancel / pause: **14-day written notice** (not 30 days).
- If the client goes quiet on approvals for 14 days, customer-facing sends pause.
- Setup is usually days after the two jobs are agreed, not a 4–6 week website build.
- Nothing customer-facing goes out without the owner’s yes.
- No guarantee of bookings, revenue, or call volume.

### Remove or replace

Delete website-studio mechanics:
- two rounds of **design** revisions
- “before your website goes live”
- hosting the client’s website on Vercel as the product
- 4–6 week site delivery
- source-code export of a website
- taking “your website” offline
- first retainer 30 days after **site launch**
- portfolio showcase of websites as a default

Replace with AI-hire mechanics:
- Revisions = changes to the workflow / scripts, scoped in the agreement
- Delivery = the hire is built and then run weekly
- “Hosting” if mentioned at all is our infrastructure for the workflows, not their marketing site
- On cancel: we stop running the workflows after the notice period; we do not keep sending to their customers
- IP: they own their business data, scripts written for them as stated in the Service Agreement; we retain our tools, prompts, and general methods
- Client duties: give access/facts we need, approve drafts in a reasonable time, do not ask the hire to break the law or impersonate a licensed professional

### Keep

- Revauri LLC, Belleville NJ address
- Stripe for payments (no card storage)
- Late-fee / suspend-for-nonpay idea is OK if worded for a monthly hire, not “we take your website down”
- Limitation of liability capped at fees paid
- Indemnity for materials they give us
- No class action / arbitration language as it exists
- Contact joseph@revauri.com

Update the “Last updated” line to today (or the date you edit).

Do not rewrite Privacy again unless a sentence still says website preview. Do not touch Home, Book, chatbot, or deploy.

Run `npm run build`.

## Done when

- Terms never describe launching, hosting, or exporting a client website as this product
- Cancel is 14-day notice
- No public product prices
- `npm run build` succeeds
- Nothing deployed

Stop. Summarize what you changed. Do not start a deploy.
