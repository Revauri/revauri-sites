# Phase 7 — deploy a NEW Vercel project (not DNS yet)

Copy everything below the line into a **new** Cursor chat. Do not add other tasks.

---

You are working in `/Users/josephsilvagnoli/Desktop/Revauri/revauri-sites-repo/revauri-ai-site`.

## Hard rules

- Do **not** edit `../revauri-site`
- Do **not** run `vercel link` against the existing project **revauri-main** (that is live revauri.com, project id `prj_ri3mE7GYVHvPIlxzsaTtv4ks8TIT`)
- Do **not** point the domain `revauri.ai` yet
- Do **not** copy `.env.local` from revauri.com
- Do **not** set `DATABASE_URL`, `CHAT_INBOX_SECRET`, `CHAT_INBOX_PASSWORD`, or `CRON_SECRET` on this project (that would mix inbox data with revauri.com)
- Create a **brand-new** Vercel project. Suggested name: `revauri-ai`

## Do this

1. Confirm you are in `revauri-ai-site` and there is no `.vercel` folder. If `.vercel` exists and mentions `revauri-main`, **stop**.
2. Create a new Vercel project from this folder (CLI or dashboard). Root directory is this folder, Next.js, no monorepo root of the parent repo.
3. Production env vars for the new project only:
   - `OPENROUTER_API_KEY` — Joseph must paste this in the Vercel dashboard (or tell you the value). Do not read it from `../revauri-site/.env.local` unless Joseph explicitly says to reuse that same key.
   - `CALENDLY_TOKEN` — optional. Same rule: only if Joseph says reuse. Booking still works without it (fallback card / embed).
4. Deploy to Production on the **new** project.
5. Reply with:
   - the new Vercel project name
   - the `*.vercel.app` URL
   - confirmation that it is **not** `revauri-main`
   - whether OpenRouter was set (yes/no), without printing the key

Then **stop**. Do not add the custom domain. Do not change Namecheap DNS. Hermes will review the live preview first.

If Vercel asks “link to existing project?” the answer is **no**. Always create new.
