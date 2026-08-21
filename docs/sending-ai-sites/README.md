# Sending-domain sites (Revauri AI)

Four small trust pages for the G–R sending domains. **Do not clone revauri.ai.**
Book and the full product live on https://revauri.ai.

| Domain | Folder | Prompt | Job of the page |
|---|---|---|---|
| revauribuild.com | `revauribuild-site/` | `PROMPT-revauribuild.md` | We **build** the hire |
| revauribuilds.com | `revauribuilds-site/` | `PROMPT-revauribuilds.md` | The **jobs** a hire takes |
| revauridigital.com | `revauridigital-site/` | `PROMPT-revauridigital.md` | Inbox / follow-up / admin |
| revauristudio.com | `revauristudio-site/` | `PROMPT-revauristudio.md` | How we **design** the hire |

## How to run (one Cursor chat per site)

1. Open `revauri-sites-repo` in Cursor.
2. New chat. Paste **everything under the line** in that site’s prompt file.
3. Do not mix two domains in one chat.
4. Do **not** deploy. Hermes reviews, then we point DNS.

Shared rules are repeated in each prompt so the four chats stay independent.

## Live previews (2026-08-19)

Vercel projects are **new** (`*-sending`). Not `revauri-main`. Custom domains are attached. **Do not change nameservers** — these domains send Google mail.

| Domain | Vercel project | Preview |
|---|---|---|
| revauribuild.com | revauribuild-sending | https://revauribuild-sending.vercel.app |
| revauribuilds.com | revauribuilds-sending | https://revauribuilds-sending.vercel.app |
| revauridigital.com | revauridigital-sending | https://revauridigital-sending.vercel.app |
| revauristudio.com | revauristudio-sending | https://revauristudio-sending.vercel.app |

Namecheap Advanced DNS only (leave MX / SPF / DKIM / DMARC / nameservers):

- Delete parking CNAME `www` → parkingpage.namecheap.com
- Delete any URL Redirect on `@`
- Add A `@` → `216.150.1.1` (not `10.0.1.2` — that IP does not get a cert on these projects)
- Add A `www` → `216.150.1.1`

**Live as of 2026-08-21:** all four custom domains have certificates. Mail still on Google.
