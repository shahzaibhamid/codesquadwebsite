-- CodeSquad (medspa / fawn site) — dashboard tables. Safe: separate from your main site.
-- Run once in Supabase → SQL Editor → New query → paste → Run.

create table if not exists medspa_posts (
  slug        text primary key,
  cat         text,
  date        text,
  title       text,
  excerpt     text,
  img         text,
  body        text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table if not exists medspa_case_studies (
  slug        text primary key,
  name        text,
  cat         text,
  filter      text,
  tagline     text,
  img         text,
  body        text,
  published   boolean default true,
  ord         int default 100,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table if not exists medspa_leads (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  email       text,
  source      text,
  payload     jsonb,
  created_at  timestamptz default now()
);

-- Row Level Security on (the dashboard uses the service key server-side, which bypasses RLS).
alter table medspa_posts        enable row level security;
alter table medspa_case_studies enable row level security;
alter table medspa_leads        enable row level security;

-- Public storage bucket for image/video uploads from the dashboard.
insert into storage.buckets (id, name, public)
values ('medspa-uploads', 'medspa-uploads', true)
on conflict (id) do nothing;
