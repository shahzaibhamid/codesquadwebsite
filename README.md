# CodeSquad — medspa.codesquad (Next.js)

Marketing site for **CodeSquad**, built with **Next.js 14 (App Router)**. Converted from the original static HTML site.

**Live:** https://medspa-eight.vercel.app

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
  aesthetics/page.js     /aesthetics
  ecommerce/page.js      /ecommerce
  agriculture/page.js    /agriculture
  visibility-engine/page.js  /visibility-engine
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

## Build & deploy
```bash
npm run build
```
```bash
vercel --prod
```
Vercel builds it as a Next.js app (framework preset: **Next.js**).

## Editing
- **Nav / footer / contact details:** edit `components/Header.js` / `Footer.js` once.
- **Page copy & sections:** edit the matching file in `content/*.html`.
- **Design tokens (colors, fonts):** the `:root` block at the top of `app/globals.css`.
- **Hero video:** replace `public/hero.mp4`.
- **Dark-section background image:** per-page `--sec-img` in each page's `page.js`.

## Notes
- Contact form still needs a Formspree ID: replace `your-form-id` in `content/home.html`.
- Deployment protection (Vercel Authentication) is **off** so the site is public.
