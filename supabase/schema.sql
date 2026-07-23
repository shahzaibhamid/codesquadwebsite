-- CodeSquad — Supabase schema
-- Run this in your Supabase project → SQL Editor.
-- Creates the tables the /dashboard and lead forms use.

-- ---------------------------------------------------------------------------
-- BLOG POSTS
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  category    text not null default 'AI Automation',
  date        text not null default to_char(now(), 'FMMonth DD, YYYY'),
  excerpt     text not null default '',
  content     text not null default '',
  youtube     text,
  image       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);

-- ---------------------------------------------------------------------------
-- CASE STUDIES
-- ---------------------------------------------------------------------------
create table if not exists public.case_studies (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  url         text not null,
  category    text not null,
  services    text not null,
  description text not null,
  published   boolean not null default true,
  sort_order  integer not null default 0,
  kicker      text,
  headline    text,
  challenge   text,
  solution    text,
  implementation text,
  results     text,
  conclusion  text,
  metrics     text,
  capabilities text,
  media_links text[] not null default '{}',
  cover_image text,
  challenge_media text[] not null default '{}',
  solution_media text[] not null default '{}',
  implementation_media text[] not null default '{}',
  results_media text[] not null default '{}',
  conclusion_media text[] not null default '{}',
  challenge_media_placement text not null default 'inline',
  solution_media_placement text not null default 'inline',
  implementation_media_placement text not null default 'inline',
  results_media_placement text not null default 'inline',
  conclusion_media_placement text not null default 'inline',
  testimonial text,
  testimonial_author text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists case_studies_order_idx
  on public.case_studies (published, sort_order, created_at desc);

-- Safe upgrade for existing installations. PostgreSQL text fields have no
-- declared word or character limit and support full case-study narratives.
alter table public.case_studies add column if not exists kicker text;
alter table public.case_studies add column if not exists headline text;
alter table public.case_studies add column if not exists challenge text;
alter table public.case_studies add column if not exists solution text;
alter table public.case_studies add column if not exists implementation text;
alter table public.case_studies add column if not exists results text;
alter table public.case_studies add column if not exists conclusion text;
alter table public.case_studies add column if not exists metrics text;
alter table public.case_studies add column if not exists capabilities text;
alter table public.case_studies add column if not exists media_links text[] not null default '{}';
alter table public.case_studies add column if not exists cover_image text;
alter table public.case_studies add column if not exists challenge_media text[] not null default '{}';
alter table public.case_studies add column if not exists solution_media text[] not null default '{}';
alter table public.case_studies add column if not exists implementation_media text[] not null default '{}';
alter table public.case_studies add column if not exists results_media text[] not null default '{}';
alter table public.case_studies add column if not exists conclusion_media text[] not null default '{}';
alter table public.case_studies add column if not exists challenge_media_placement text not null default 'inline';
alter table public.case_studies add column if not exists solution_media_placement text not null default 'inline';
alter table public.case_studies add column if not exists implementation_media_placement text not null default 'inline';
alter table public.case_studies add column if not exists results_media_placement text not null default 'inline';
alter table public.case_studies add column if not exists conclusion_media_placement text not null default 'inline';
alter table public.case_studies add column if not exists testimonial text;
alter table public.case_studies add column if not exists testimonial_author text;

-- ---------------------------------------------------------------------------
-- CASE STUDY MEDIA — public Storage bucket
-- Dashboard uploads (cover image, section media) go here via the service-role
-- key (server-only). The bucket is public so uploaded images/videos load
-- directly on the case-study pages without extra signed-URL handling.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values ('case-study-media', 'case-study-media', true, 26214400)
on conflict (id) do update set public = true, file_size_limit = 26214400;

drop policy if exists "case study media is public readable" on storage.objects;
create policy "case study media is public readable"
  on storage.objects for select
  using (bucket_id = 'case-study-media');

-- No public insert/update/delete policy: all writes happen server-side with
-- the service-role key (dashboard uploads), which bypasses RLS entirely.

-- ---------------------------------------------------------------------------
-- LEADS (AI Basecamp / AI Audit / Contact form submissions)
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  company     text,
  message     text,
  role        text,
  tools       text,
  source      text not null default 'contact',   -- 'growth-club' | 'ai-basecamp' | 'ai-audit' | 'contact'
  created_at  timestamptz not null default now()
);

alter table public.leads add column if not exists role text;
alter table public.leads add column if not exists tools text;

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- Public can READ published posts. All writes go through the service-role key
-- (used only server-side by the dashboard), which bypasses RLS.
-- ---------------------------------------------------------------------------
alter table public.posts enable row level security;
alter table public.case_studies enable row level security;
alter table public.leads enable row level security;

drop policy if exists "posts are public readable" on public.posts;
create policy "posts are public readable"
  on public.posts for select
  using (true);

drop policy if exists "published case studies are public readable" on public.case_studies;
create policy "published case studies are public readable"
  on public.case_studies for select
  using (published = true);

-- Leads: no public read; inserts happen server-side via service role.
-- (No select policy = not publicly readable.)

-- ---------------------------------------------------------------------------
-- OPTIONAL: seed the four starter posts (edit/remove as you like)
-- ---------------------------------------------------------------------------
-- insert into public.posts (slug, title, category, excerpt, content) values
--   ('why-smes-need-digital-transformation', 'Why SMEs Need Digital Transformation to Stay Competitive', 'AI Automation', '...', '<p>...</p>');
