# Phase 1 — site shell

Copy everything below the line into a **new** Cursor chat. Do not add other tasks.

---

You are working in `/Users/josephsilvagnoli/Desktop/Revauri/revauri-sites-repo/revauri-ai-site`.

This folder is a copy of revauri.com that we are turning into revauri.ai. It is **not live**. Do not deploy. Do not run `vercel`. Do not edit the sibling folder `../revauri-site`.

Read first:
- `docs/RULES.md`
- `docs/locked/13-revauri-ai-end-to-end-plan.md`
- `docs/PHASES.md`

## Do only this phase

Make the **shell** say Revauri AI instead of the website shop. Do not rebuild the homepage demo, chatbot, Book page, or Pricing content yet.

1. Change the package / site identity to Revauri AI (titles, metadata, Open Graph, favicon alt text if needed).
2. Update header nav to: Home, Capabilities, Pricing, About, FAQ, plus Book. Replace Portfolio with **Capabilities**. Keep the same visual header.
3. Add a Capabilities route that can be a simple placeholder page for now (“Example hires — coming in Phase 3”). Point the old `/portfolio` links at `/capabilities` or redirect them.
4. Update footer: same look, Revauri AI links, line **“A Revauri company.”** Link parent to https://revauri.com. Remove website-redesign sales language.
5. Sweep header, footer, layout, and obvious global CTAs so they no longer say free website preview, redesign, or “Book a Free Strategy Call.” Temporary CTA: **Book a call**.
6. Leave the current homepage body mostly as-is if ripping it out would be a big rewrite — but remove any website portfolio / before-after blocks that would look like Revauri AI case studies. A short “Phase 2 will replace this hero” note on the home page is fine.
7. Do **not** put dollar amounts anywhere.
8. Do **not** invent testimonials or clients.
9. Do **not** name Grok, Hermes, Claude, or xAI.
10. Run `npm install` if `node_modules` is missing, then `npm run build`. Fix any errors you introduced.

## Done when

- `npm run build` succeeds
- Browser at `npm run dev` shows Revauri AI in the tab title and header
- Nav has Capabilities, not Portfolio
- Footer says “A Revauri company”
- No public prices
- You did not deploy anything

Then stop. Summarize the files you changed. Do not start Phase 2.
