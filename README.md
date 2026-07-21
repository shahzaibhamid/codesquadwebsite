# CodeSquad — Next.js

A Next.js (App Router + TypeScript) rebuild of the CodeSquad WordPress site — an
AI automation & software development agency. Dark, futuristic theme with
glassmorphism, floating gradient orbs, scroll-reveal motion, and a light/dark
toggle. Fully responsive (phone / tablet / desktop).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

Production build:

```bash
npm run build
npm start
```

## Project structure

```
app/                      # App Router pages
  layout.tsx              # Root layout: fonts, navbar, footer, orbs, motion
  page.tsx                # Home
  services/page.tsx       # Services
  about/page.tsx          # About
  blog/page.tsx           # Blog listing
  blog/[slug]/page.tsx    # Single blog post
  contact/page.tsx        # Contact (new — WP had no contact page)
  not-found.tsx           # 404
  globals.css             # Design system (ported 1:1 from the WP theme)
components/
  layout/                 # Navbar, Footer, Orbs, Motion, ThemeInit
  sections/               # SectionHeading, CTA, ContactForm
  ui/                     # Button, Icon, ServiceCard, BlogCard
data/                     # Static content (services, home, about, blog, site)
lib/                      # utils, supabase placeholder
types/                    # Shared TypeScript types
public/images/            # logo.png
```

## Styling note

Tailwind CSS is installed and configured, **but Tailwind's preflight (CSS reset)
is disabled** in `tailwind.config.ts`. The exact visual design lives in
`app/globals.css`, ported verbatim from the proven WordPress theme so the clone
is pixel-faithful. Tailwind utilities are still available for new UI.

## Supabase (not connected yet)

The site runs entirely on static data in `/data`. To connect Supabase later:

1. Copy `.env.example` → `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Use `getSupabaseClient()` from `lib/supabase.ts` in a server component/route.
3. Replace the static imports in `/data` (e.g. `blogPosts`) with a query.

The contact form (`components/sections/ContactForm.tsx`) has a stubbed submit
handler with a `TODO` marking exactly where to insert the Supabase/API call.

## What couldn't be copied exactly / to provide later

- **Blog posts:** only the SME article has full content (real). The other three
  posts are marked `placeholder: true` in `data/blog.ts` — replace their bodies.
- **Contact form backend:** frontend-only for now. Needs an API route or
  Supabase table + credentials to actually send/store messages.
- **Logo:** `public/images/logo.png` was copied from the WP uploads. Swap for a
  higher-res or SVG version if you have one.
- **Case-study numbers & testimonials:** testimonials are real; case-study
  metrics are representative — confirm before publishing.
