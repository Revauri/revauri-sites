# Phase 4 — Indexing, Monitoring & Deliverability (action items)

These steps need *your* Google/Bing/registrar accounts, so they can't be automated for you. They're written in plain steps. Do them **after the new sites are deployed**.

> Honest expectation: the website work removes weak "thin/parked/no-business-info/cloned" signals and makes the domains look legitimate if a filter or person inspects them. It does **not** directly control inbox placement. What actually moves deliverability is sending reputation, list quality, engagement, and low spam complaints. Treat the sites as necessary hygiene, not a switch that fixes the inbox.

---

## 1. Google Search Console (do for each domain)
Domains: **revauridesign.com**, **revauridesigns.com** (and optionally revauri.com).

1. Go to **search.google.com/search-console** → **Add property** → choose **Domain**.
2. Enter the domain (e.g. `revauridesign.com`). Google shows a **TXT record**.
3. Add that TXT record in your **domain registrar's DNS** settings, save, wait a few minutes, then click **Verify**.
4. Once verified: left menu → **Sitemaps** → type `sitemap.xml` → **Submit**.
5. Left menu → **URL Inspection** → paste the homepage URL → **Request indexing**. Repeat for the About and Services pages.

*New domains (registered March 2026) can take days to a few weeks to index. That's normal.*

## 2. Bing Webmaster Tools
1. Go to **bing.com/webmasters** → **Add site**.
2. Easiest path: **Import from Google Search Console** (one click, once Step 1 is done).
3. Confirm the sitemap is submitted there too.

## 3. After-deploy sanity checks (5 minutes)
- Open `https://revauridesign.com/robots.txt` and `https://revauridesign.com/sitemap.xml` — both should load, and the sitemap should list every page. Repeat for revauridesigns.com.
- In **Vercel**, make sure each domain has **one primary** (apex `revauridesign.com` *or* `www.` — whichever you prefer) and the other **redirects** to it. Inconsistent www/apex is a weak signal.
- A week later, search `site:revauridesign.com` in Google to see what's indexed.

## 4. Deliverability monitoring (the part that matters most)
- **Keep the current Smartlead posture**: plain text, no images/links, no open/click tracking, reduced caps, 8am–6pm America/New_York. Don't change several things at once.
- **Add Google Postmaster Tools** (postmaster.google.com) for each sending domain — it shows your Gmail reputation, spam-complaint rate, and authentication status over time. This is the single most useful deliverability dashboard.
- **Watch weekly**: bounce rate, spam-complaint rate, reply rate. A rising complaint rate is the biggest red flag — pause and clean the list if it climbs.
- **Honor opt-outs immediately** (the privacy policy on each site commits to this — keep that promise; it's both compliance and reputation).
- **Keep website links OUT of email signatures for now.** The goal right now is just that the domain *resolves to a legitimate business if checked*. Once the domains are warm (several weeks) and the sites are indexed, you can reassess — a single, consistent real link can then be a mild positive.

## 5. Things NOT worth doing
- No Google Business Profile (there's no physical storefront customers visit — it wouldn't verify cleanly and isn't relevant).
- Don't cross-link revauridesign.com and revauridesigns.com to each other — that re-creates the "network" footprint we just reduced.
- Don't add fake reviews, fake logos, or schema markup for reviews/ratings you don't have — fabricated structured data can trigger penalties and undoes the trust work.

---

### Quick reference — what's already built into the sites
- `robots.txt` + `sitemap.xml` (auto-generated, lists all pages)
- Canonical URLs + unique page titles/descriptions
- Open Graph cards + favicons (distinct per domain)
- `ProfessionalService` structured data (real business name, NJ address, contact email)
- Privacy Policy with a **Cold Outreach & Opt-Out** section (CAN-SPAM aligned)
- Real contact email + mailing address on every page's footer + Contact page
- Branded 404 pages
