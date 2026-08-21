# Phase 7b — point revauri.ai at the new project

Copy everything below the line into a **new** Cursor chat. Do not add other tasks.

---

You are working in `/Users/josephsilvagnoli/Desktop/Revauri/revauri-sites-repo/revauri-ai-site`.

## Hard rules

- Target Vercel project is **`revauri-ai`** only (`prj_WRkIogbf9bsZhgrPoiYxBhwFgu7G`)
- Do **not** add this domain to `revauri-main`
- Do **not** edit `../revauri-site`
- Do **not** change DNS for revauri.com or the sending domains

## Do this

1. Confirm `.vercel/project.json` says `projectName: revauri-ai`. If it does not, **stop**.
2. Add the custom domain **revauri.ai** (and `www.revauri.ai` if Vercel offers it) to **this** project.
3. Tell Joseph the exact DNS records Vercel wants (usually an A record to `10.0.1.2` and/or a CNAME).
4. If you have a way to update Namecheap for **revauri.ai only**, do that. Otherwise stop after listing the records.
5. Wait until Vercel shows the domain as valid, or report that DNS is still propagating.
6. Open https://revauri.ai and confirm the hero says “Hire the work. Including the phone.” — not the old parking page.

Then stop. Summarize: Vercel project, DNS records used, whether https://revauri.ai is live.
