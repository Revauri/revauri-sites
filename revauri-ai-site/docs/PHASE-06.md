# Phase 6 — polish and leftover website copy

Copy everything below the line into a **new** Cursor chat. Do not add other tasks.

---

You are working in `/Users/josephsilvagnoli/Desktop/Revauri/revauri-sites-repo/revauri-ai-site`.

This is the revauri.ai site. It is **not live**. Do not deploy. Do not run `vercel`. Do not edit `../revauri-site`.

Read first:
- `docs/RULES.md`
- `docs/locked/13-revauri-ai-end-to-end-plan.md`
- `docs/PHASES.md`

## Do only this phase

Clean leftovers so a visitor cannot land on website-shop language. Do not add new features. Do not deploy.

### 1. Blog becomes an empty shell

The three existing posts are law-firm **website** articles. They must not appear as Revauri AI content.

- `/blog` should say notes are coming — no post list of those three articles.
- Individual old slugs: unpublish (draft / 404 / redirect to `/blog`). Do not leave public law-firm website posts.
- Remove “Book a Free Strategy Call” / “custom redesign of your site” CTAs from blog templates.
- Footer may still link to Blog.

### 2. Privacy and Terms — light edits only

Keep the same pages and legal structure. Change website-specific bullets so they match this product:

- Contact form, Calendly booking, chatbot messages, consent-gated analytics
- Not: free homepage redesign previews, website audits for outreach, “request a redesign”

Do not invent new legal policy. If a sentence is only about website previews, replace it with the AI-hire equivalent or drop it. Keep the $10,000 arbitration threshold (that is legal boilerplate, not a product price).

### 3. Delete unused website-shop components

These are imported nowhere and still contain redesign copy. Delete them if still unused:

- `components/how-it-works.tsx`
- `components/portfolio.tsx`
- `components/testimonials.tsx`
- `components/gallery-section.tsx`
- `components/social-proof.tsx` (if unused)

Do not delete anything still imported. Do not rip out `show_portfolio` from the chat route (left registered on purpose).

### 4. Copy sweep

Search the **app/** and **components/** trees (ignore `docs/` and `node_modules`) for:

- “15-minute”
- “free preview”
- “redesign”
- “Book a Free Strategy Call”
- “website-strategy-call”
- dollar amounts that are product prices (not the $10,000 legal line)

Fix any leftover **public** copy. Dead code you are deleting counts as fixed.

### 5. Analytics

Keep the existing consent-gated GA4 helper (`G-NZTSMCQCRB`). Same company, same rules: no names, emails, phones, or form text in events. Do not add a second analytics product. Do not turn consent off.

### 6. Housekeeping

- Remove empty iCloud conflict copies if present (`app/blog/[slug] 2`, `content/blog 2`, etc.)
- Do not advertise `/inbox` in the public nav
- Call length stays **20 minutes** everywhere public

Run `npm run build`. Fix errors you introduced.

## Done when

- Blog does not publish the old website articles
- Privacy/Terms no longer describe redesign previews as a service
- Unused website components are gone
- Public copy sweep is clean
- `npm run build` succeeds
- Nothing deployed

Stop. Summarize files changed. Do not start Phase 7 (deploy).
