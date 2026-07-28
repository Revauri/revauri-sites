# Link tagging for revauri.com (UTM conventions)

Purpose: keep Google Analytics 4 able to tell **organic search traffic** apart from **traffic you sent yourself**. This matters most over the next 6–12 months, while the blog is new and the only signal worth watching is whether organic is actually growing.

Without tagging, a click from an email or a LinkedIn post can land in GA4's "Direct" or "Organic" bucket and make the blog look like it's working when it isn't.

---

## First, an important conflict to be aware of

`PHASE4-DELIVERABILITY.md` (section 4) says, for the cold-email sending domains:

> Keep website links OUT of email signatures for now… plain text, no images/links, no open/click tracking.

**That guidance wins for cold sends.** Do not start dropping blog links into cold outreach just because the blog exists — links and tracking parameters in a cold email hurt deliverability, and a UTM-tagged URL looks like tracking to a spam filter.

So the blog's role in outreach is **not** the initial cold send. It's:

1. **Replies and follow-ups** — once a prospect has answered and a real conversation exists, sending a relevant post is normal and useful.
2. **The discovery call** — "I wrote about exactly this, let me send it over."
3. **Any channel that isn't cold email** — LinkedIn, your newsletter, proposals.

Tag the links in those places. Leave cold sends alone.

---

## The format

Append to any revauri.com URL you share yourself:

```
?utm_source=<where>&utm_medium=<how>&utm_campaign=<what>
```

Use lowercase, hyphens instead of spaces, and keep the values consistent — GA4 treats `LinkedIn` and `linkedin` as two different sources.

### Standard values

| Situation | source | medium | campaign |
|---|---|---|---|
| Reply / follow-up in an email conversation | `email` | `outreach` | the campaign or list name |
| Link sent after a discovery call | `email` | `sales-followup` | `post-call` |
| LinkedIn post or comment | `linkedin` | `social` | short topic slug |
| Newsletter | `email` | `newsletter` | issue date, e.g. `2026-08` |
| A proposal or PDF | `proposal` | `document` | client or deal name |

### Examples

```
https://www.revauri.com/blog/law-firm-website-cost?utm_source=email&utm_medium=sales-followup&utm_campaign=post-call

https://www.revauri.com/blog/law-firm-website-cost?utm_source=linkedin&utm_medium=social&utm_campaign=law-firm-pricing
```

---

## Rules

1. **Never tag a link that's already on the site.** Internal links between your own pages must stay untagged — tagging them restarts the GA4 session and destroys your attribution data. UTMs are only for links pointing *into* the site from somewhere else.
2. **Never tag a cold send.** See the conflict section above.
3. **Never put UTMs in the sitemap, canonical tags, or structured data.** Only in links you hand out.
4. **Don't tag paid ads by hand** if you ever run them — Google Ads auto-tagging handles it and hand-tagging on top breaks it.

---

## Reading the result in GA4

Reports → Acquisition → Traffic acquisition, then look at **Session source / medium**.

- `google / organic` — real search traffic. **This is the number that tells you whether the blog is working.**
- `email / outreach`, `linkedin / social`, etc. — traffic you generated. Real value, but not evidence of SEO.
- `(direct) / (none)` — untagged. If this bucket grows every time you share a link, tagging is being skipped somewhere.

Cross-check against Search Console, which only ever reports genuine Google search data and can't be polluted by self-sent traffic. For the first 90 days the metric to watch in Search Console is **impression growth**, not clicks.
