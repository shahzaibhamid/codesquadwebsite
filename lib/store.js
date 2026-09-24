import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { supabaseAdmin, supabaseEnabled, T } from './supabase';
import blogData from './data/blog-posts.json';
import caseData from './data/case-studies.json';

const ROOT = process.cwd();
const BLOG_JSON = join(ROOT, 'lib', 'data', 'blog-posts.json');
const CASE_JSON = join(ROOT, 'lib', 'data', 'case-studies.json');
const LEADS_JSON = join(ROOT, 'content', 'leads.json');
const BLOG_DIR = join(ROOT, 'content', 'blog');
const CASE_DIR = join(ROOT, 'content', 'case-studies');

export const isLive = () => supabaseEnabled();
// Local file writes only work off Vercel; on Vercel everything goes to Supabase.
export const canWrite = () => supabaseEnabled() || !process.env.VERCEL;

const readJson = (f, fallback) => { try { return JSON.parse(readFileSync(f, 'utf8')); } catch (e) { return fallback; } };
const writeJson = (f, d) => writeFileSync(f, JSON.stringify(d, null, 2) + '\n');
const localWritable = () => !process.env.VERCEL;

export const slugify = (s) => String(s || '').toLowerCase().trim()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

const stripBody = (r) => { const { body, ...rest } = r || {}; return rest; };

// ============ POSTS ============
export async function getPosts() {
  const sb = supabaseAdmin();
  if (sb) {
    const { data, error } = await sb.from(T.posts).select('slug,cat,date,title,excerpt,img').order('created_at', { ascending: false });
    if (!error && data) return data;
  }
  return readJson(BLOG_JSON, blogData);
}
export async function getPost(slug) {
  const sb = supabaseAdmin();
  if (sb) {
    const { data } = await sb.from(T.posts).select('*').eq('slug', slug).maybeSingle();
    if (data) return data;
  }
  const p = readJson(BLOG_JSON, blogData).find((x) => x.slug === slug);
  return p ? { ...p, body: readFileMaybe(join(BLOG_DIR, `${slug}.html`)) } : null;
}
export async function getPostBody(slug) { const p = await getPost(slug); return p?.body || ''; }

export async function savePost({ original, post, bodyHtml }) {
  const slug = slugify(post.slug || post.title);
  const row = { slug, cat: post.cat || 'AI Automation', date: post.date || todayStr(), title: post.title || '', excerpt: post.excerpt || '', img: post.img || '', body: bodyHtml || '', updated_at: new Date().toISOString() };
  const sb = supabaseAdmin();
  if (sb) {
    const oldSlug = original ? slugify(original) : null;
    if (oldSlug && oldSlug !== slug) await sb.from(T.posts).delete().eq('slug', oldSlug);
    await sb.from(T.posts).upsert(row, { onConflict: 'slug' });
    return slug;
  }
  return savePostLocal({ original, row, bodyHtml });
}
export async function deletePost(slug) {
  const sb = supabaseAdmin();
  if (sb) { await sb.from(T.posts).delete().eq('slug', slug); return; }
  if (!localWritable()) return;
  writeJson(BLOG_JSON, readJson(BLOG_JSON, []).filter((x) => x.slug !== slug));
  const f = join(BLOG_DIR, `${slug}.html`); if (existsSync(f)) unlinkSync(f);
}

// ============ CASE STUDIES ============
export async function getCases() {
  const sb = supabaseAdmin();
  if (sb) {
    const { data, error } = await sb.from(T.cases).select('slug,name,cat,filter,tagline,img,published,ord').order('ord', { ascending: true }).order('created_at', { ascending: false });
    if (!error && data) return data;
  }
  return readJson(CASE_JSON, caseData);
}
export async function getPublishedCases() {
  const list = await getCases();
  return list.filter((c) => c.published === undefined || c.published);
}
export async function getCase(slug) {
  const sb = supabaseAdmin();
  if (sb) { const { data } = await sb.from(T.cases).select('*').eq('slug', slug).maybeSingle(); if (data) return data; }
  const c = readJson(CASE_JSON, caseData).find((x) => x.slug === slug);
  return c ? { ...c, body: readFileMaybe(join(CASE_DIR, `${slug}.html`)) } : null;
}
export async function getCaseBody(slug) { const c = await getCase(slug); return c?.body || ''; }

export async function saveCase({ original, item, bodyHtml }) {
  const slug = slugify(item.slug || item.name);
  const row = { slug, name: item.name || '', cat: item.cat || '', filter: item.filter || 'Healthcare & Clinics', tagline: item.tagline || '', img: item.img || '', body: bodyHtml || '', published: item.published !== false, updated_at: new Date().toISOString() };
  const sb = supabaseAdmin();
  if (sb) {
    const oldSlug = original ? slugify(original) : null;
    if (oldSlug && oldSlug !== slug) await sb.from(T.cases).delete().eq('slug', oldSlug);
    await sb.from(T.cases).upsert(row, { onConflict: 'slug' });
    return slug;
  }
  return saveCaseLocal({ original, row, bodyHtml });
}
export async function deleteCase(slug) {
  const sb = supabaseAdmin();
  if (sb) { await sb.from(T.cases).delete().eq('slug', slug); return; }
  if (!localWritable()) return;
  writeJson(CASE_JSON, readJson(CASE_JSON, []).filter((x) => x.slug !== slug));
  const f = join(CASE_DIR, `${slug}.html`); if (existsSync(f)) unlinkSync(f);
}

// ============ LEADS ============
export async function getLeads() {
  const sb = supabaseAdmin();
  if (sb) { const { data } = await sb.from(T.leads).select('*').order('created_at', { ascending: false }); if (data) return data.map((l) => ({ ...l, date: l.created_at ? new Date(l.created_at).toLocaleDateString('en-US') : '' })); }
  return readJson(LEADS_JSON, []);
}
export async function addLead(lead) {
  const sb = supabaseAdmin();
  if (sb) { await sb.from(T.leads).insert({ name: lead.name || '', email: lead.email || '', source: lead.source || 'Contact', payload: lead.payload || {} }); }
}

// ============ MEDIA UPLOAD ============
export async function uploadMedia({ filename, dataBase64, folder = 'case-studies' }) {
  const sb = supabaseAdmin();
  const ext = ((filename || '').match(/\.[a-z0-9]+$/i)?.[0] || '.jpg').toLowerCase();
  const base = slugify((filename || 'image').replace(/\.[a-z0-9]+$/i, '')) || 'image';
  const name = `${folder}/${base}-${Date.now()}${ext}`;
  const buf = Buffer.from(String(dataBase64 || '').replace(/^data:[^;]+;base64,/, ''), 'base64');
  if (sb) {
    await sb.storage.from(T.bucket).upload(name, buf, { contentType: guessType(ext), upsert: true });
    const { data } = sb.storage.from(T.bucket).getPublicUrl(name);
    return data.publicUrl;
  }
  // local fallback
  const dir = join(ROOT, 'public', 'uploads', folder); mkdirSync(dir, { recursive: true });
  const fname = `${base}-${Date.now()}${ext}`; writeFileSync(join(dir, fname), buf);
  return `/uploads/${folder}/${fname}`;
}

// ============ helpers ============
function readFileMaybe(f) { try { return existsSync(f) ? readFileSync(f, 'utf8') : ''; } catch (e) { return ''; } }
function guessType(ext) { return ({ '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.mp4': 'video/mp4' })[ext] || 'application/octet-stream'; }

function savePostLocal({ original, row, bodyHtml }) {
  if (!localWritable()) return row.slug;
  const list = readJson(BLOG_JSON, []); const oldSlug = original ? slugify(original) : null;
  const clean = { slug: row.slug, cat: row.cat, date: row.date, title: row.title, excerpt: row.excerpt, img: row.img };
  const idx = list.findIndex((x) => x.slug === (oldSlug || row.slug));
  if (idx >= 0) list[idx] = clean; else list.unshift(clean);
  writeJson(BLOG_JSON, list); mkdirSync(BLOG_DIR, { recursive: true });
  if (oldSlug && oldSlug !== row.slug) { const of = join(BLOG_DIR, `${oldSlug}.html`); if (existsSync(of)) unlinkSync(of); }
  writeFileSync(join(BLOG_DIR, `${row.slug}.html`), bodyHtml || ''); return row.slug;
}
function saveCaseLocal({ original, row, bodyHtml }) {
  if (!localWritable()) return row.slug;
  const list = readJson(CASE_JSON, []); const oldSlug = original ? slugify(original) : null;
  const clean = { slug: row.slug, cat: row.cat, filter: row.filter, tagline: row.tagline, name: row.name, img: row.img };
  const idx = list.findIndex((x) => x.slug === (oldSlug || row.slug));
  if (idx >= 0) list[idx] = clean; else list.unshift(clean);
  writeJson(CASE_JSON, list); mkdirSync(CASE_DIR, { recursive: true });
  if (oldSlug && oldSlug !== row.slug) { const of = join(CASE_DIR, `${oldSlug}.html`); if (existsSync(of)) unlinkSync(of); }
  writeFileSync(join(CASE_DIR, `${row.slug}.html`), bodyHtml || ''); return row.slug;
}

export function todayStr() { return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }

export function mdLiteToHtml(text) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const blocks = String(text || '').replace(/\r\n/g, '\n').split(/\n{2,}/);
  return blocks.map((b) => {
    const t = b.trim(); if (!t) return '';
    if (t.startsWith('### ')) return `<h3>${inline(t.slice(4))}</h3>`;
    if (t.startsWith('## ')) return `<h2>${inline(t.slice(3))}</h2>`;
    if (t.startsWith('# ')) return `<h2>${inline(t.slice(2))}</h2>`;
    return `<p>${inline(t).replace(/\n/g, '<br/>')}</p>`;
  }).filter(Boolean).join('\n');
}
