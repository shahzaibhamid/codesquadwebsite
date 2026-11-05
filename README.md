# CodeSquad — medspa.codesquad (Next.js)

Marketing site for **CodeSquad**, built with **Next.js 14 (App Router)**. Converted from the original static HTML site.

**Live:** https://www.codesquad.ai

## Stack
- Next.js 14 App Router, React 18 — static-generated (SSG) pages
- Plain CSS design system in `app/globals.css` (Satoshi font from Fontshare)
- Vanilla-JS interactions & motion graphics in `components/Scripts.js`

## Structure
```
app/
  layout.js              root layout (Header, Footer, MobileCta, Scripts, fonts, metadata)
  globals.css            full design system + page CSS + hero-video styles
  page.js                /                 (home)
  industry/page.js       /industry
  agriculture/page.js    /agriculture
components/
  Header.js  Footer.js  MobileCta.js       shared chrome (edit once, applies everywhere)
  Scripts.js ('use client')                reveal, nav dropdown, scroll-spy, count-up, charts
lib/content.js           reads the section HTML for each page (SSG, build-time)
content/*.html           per-page section markup (the body of each page)
public/
  hero.mp4               hero background video
  robots.txt  sitemap.xml
legacy-static/           the previous static site, kept for reference (gitignored)
```

## Run locally
```bash
npm install
```
```bash
npm run dev
```
Open http://localhost:3000

## Deploy on a new host (any Node.js 18+ host)
The blog, case studies and uploaded images live in **Supabase** (tables `medspa_posts`,
`medspa_case_studies`, `medspa_leads`, storage bucket `medspa-uploads`). Production never
writes to the project files. Local-file mode only works in `npm run dev` without Supabase.

1. **Set the environment variables** on the host (names in `.env.example`). They must be set
   *before* `npm run build`, because `NEXT_PUBLIC_SUPABASE_URL` is baked in at build time.
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase → Project Settings → API → Project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: the **service_role** (secret) key, *not* the anon key. It is server-only.
   - `DASHBOARD_PASSWORD`: the `/dashboard` login password
   - `DASHBOARD_SECRET`: a long random string (e.g. `openssl rand -hex 32`); used as the login cookie
2. **Run `supabase/setup.sql` once** in Supabase → SQL Editor. It is safe to re-run, and it repairs older tables.
3. **Run the migration once** to copy the original posts and case studies into Supabase:
   ```bash
   node scripts/migrate-to-supabase.mjs
   ```
   It only adds rows that are missing, so it never overwrites dashboard edits. `--force` resets the rows to the file versions.
4. **Build and start:**
   ```bash
   npm run build && npm start
   ```

Open `/dashboard`. It must say **✓ Connected to Supabase**. If anything is wrong, it shows the
exact Supabase error and how to fix it.

## Meta Ads dashboard (`/dashboard/meta-ads`)
A mini Meta Ads Manager inside the dashboard. It reads **two private Google Sheets** (daily ad
stats + Facebook lead-form leads) through the **Google Sheets API** with a read-only service
account. It never calls the Meta/Facebook API — Google Sheets is the only data source. A
Make.com automation fills the sheets (ad stats daily at 8 AM PKT; leads instantly on form submit).

**Setup**
1. In `.env.local`, paste the service account's `private_key` into `GOOGLE_PRIVATE_KEY`
   (keep the surrounding quotes and the literal `\n` sequences — the code converts them).
   All Meta Ads keys are listed in `.env.example`.
2. Share **both** spreadsheets with `GOOGLE_SERVICE_ACCOUNT_EMAIL` as **Viewer**
   (the sheets stay private — do not "publish to web", do not use an API key).
3. The page is admin-only: it uses the same `/dashboard` login. Data is cached for
   `META_ADS_CACHE_SECONDS` (default 30 min); the in-page **Refresh** button clears the cache.

> **⚠️ Hosting reminder:** the Meta Ads variables (`GOOGLE_PROJECT_ID`,
> `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, the `META_ADS_*` / `META_LEADS_*` keys,
> `DASHBOARD_TIMEZONE`, `META_ADS_CURRENCY`, `META_ADS_CACHE_SECONDS`) must also be added to your
> host — **Vercel → Settings → Environment Variables** — for production. These are server-only
> secrets: never prefix them with `NEXT_PUBLIC_`. In Vercel, paste `GOOGLE_PRIVATE_KEY` with real
> newlines **or** with `\n` escapes — both work. If any variable is missing, the page shows a clear
> error naming it (the value is never printed).

Logic lives in `lib/metaSheets.ts` (fetch/parse), `lib/metaMetrics.ts` (all math, with tests —
run `npm test`), and `lib/metaFilters.ts` (date ranges + filtering). API: `GET /api/meta-ads`
and `POST /api/meta-ads/refresh`, both admin-gated.

## Editing
- **Nav / footer / contact details:** edit `components/Header.js` / `Footer.js` once.
- **Page copy & sections:** edit the matching file in `content/*.html`.
- **Design tokens (colors, fonts):** the `:root` block at the top of `app/globals.css`.
- **Hero video:** replace `public/hero.mp4`.
- **Dark-section background image:** per-page `--sec-img` in each page's `page.js`.

## Notes
- Contact form still needs a Formspree ID: replace `your-form-id` in `content/home.html`.
- Deployment protection (Vercel Authentication) is **off** so the site is public.
