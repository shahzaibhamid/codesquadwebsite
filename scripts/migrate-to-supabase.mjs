// Seeds the current posts + case studies into Supabase (medspa_* tables).
// Run:  node scripts/migrate-to-supabase.mjs
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// load .env.local
const env = {};
for (const line of readFileSync(join(ROOT, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2];
}
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const readBody = (dir, slug) => { const f = join(ROOT, 'content', dir, `${slug}.html`); return existsSync(f) ? readFileSync(f, 'utf8') : ''; };
const posts = JSON.parse(readFileSync(join(ROOT, 'lib', 'data', 'blog-posts.json'), 'utf8'));
const cases = JSON.parse(readFileSync(join(ROOT, 'lib', 'data', 'case-studies.json'), 'utf8'));

const base = Date.now();
const postRows = posts.map((p, i) => ({
  slug: p.slug, cat: p.cat, date: p.date, title: p.title, excerpt: p.excerpt, img: p.img,
  body: readBody('blog', p.slug),
  created_at: new Date(base - i * 60000).toISOString(),
}));
const caseRows = cases.map((c, i) => ({
  slug: c.slug, name: c.name, cat: c.cat, filter: c.filter, tagline: c.tagline, img: c.img,
  body: readBody('case-studies', c.slug), published: true, ord: i,
  created_at: new Date(base - i * 60000).toISOString(),
}));

const r1 = await sb.from('medspa_posts').upsert(postRows, { onConflict: 'slug' });
if (r1.error) { console.error('posts error:', r1.error.message); process.exit(1); }
const r2 = await sb.from('medspa_case_studies').upsert(caseRows, { onConflict: 'slug' });
if (r2.error) { console.error('cases error:', r2.error.message); process.exit(1); }

const c1 = await sb.from('medspa_posts').select('slug', { count: 'exact', head: true });
const c2 = await sb.from('medspa_case_studies').select('slug', { count: 'exact', head: true });
console.log('✓ migrated  posts:', c1.count, ' case studies:', c2.count);
