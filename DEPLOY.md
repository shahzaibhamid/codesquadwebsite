# Deploying CodeSquad to Vercel

The app builds cleanly (`npm run build` → 18 pages) and the repo is committed and
deploy-ready. The final step needs **your** Vercel login — pick one path below.

## What works on Vercel out of the box
- ✅ Home, Services, About, **Blog** (4 seeded posts), **Base Camp**, **AI Audit**, Contact
- ✅ Light theme default, dark toggle, all styling and navigation

## What does NOT persist on Vercel (until Supabase is connected)
Vercel's serverless filesystem is **read-only**, but the app currently writes data to
files (`content/posts.json`, `content/leads.json`). So on Vercel:
- ❌ Dashboard blog **create / edit / delete** — will error (can't write)
- ❌ **Base Camp application** + lead form submissions — will error (can't write)

To make these work in production, connect Supabase first (scaffolding already present:
`supabase/schema.sql`, `lib/supabaseAdmin.ts`, `lib/supabase.ts`), then set the Supabase
env vars below.

---

## Path A — Vercel CLI (fastest one-off, no GitHub needed)
From this folder (`codesquad-next`):
```bash
npx vercel login      # authenticate with your Vercel account
npx vercel --prod     # build + deploy; accept the detected Next.js settings
```
When prompted, add the environment variables (or add them later in the Vercel dashboard →
Project → Settings → Environment Variables), then redeploy.

## Path B — GitHub + Vercel dashboard (best for auto-deploy on every push)
```bash
# create an empty repo on github.com first, then:
git remote add origin https://github.com/<you>/codesquad-next.git
git push -u origin main
```
Then at **vercel.com → Add New → Project → Import** your repo → set env vars → **Deploy**.
Every future `git push` auto-deploys.

---

## Environment variables to set in Vercel
| Variable | Needed | Notes |
|---|---|---|
| `DASHBOARD_PASSWORD` | Required | Password for `/dashboard/login`. Use your real one, not the fallback. |
| `NEXT_PUBLIC_SUPABASE_URL` | Only for persistence | From your Supabase project. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Only for persistence | From your Supabase project. |
| `SUPABASE_SERVICE_ROLE_KEY` | Only for persistence | Server-only; never expose to the client. |

> `.env.local` is gitignored and is **not** deployed — you must set these in Vercel.
