import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import type { BlogPost } from '@/types';
import { blogPosts as seed } from '@/data/blog';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * Blog store. Uses Supabase (public.posts) when configured — the source of
 * truth in production, since Vercel's filesystem is read-only. Falls back to
 * a local JSON file (content/posts.json, seeded from /data/blog.ts) when
 * Supabase isn't configured, so the dashboard still works with zero setup.
 */

function rowToPost(row: Record<string, unknown>): BlogPost {
  return {
    slug: row.slug as string,
    title: row.title as string,
    category: row.category as string,
    date: row.date as string,
    excerpt: row.excerpt as string,
    content: row.content as string,
    youtube: (row.youtube as string) || undefined,
    image: (row.image as string) || undefined,
  };
}

function postToRow(post: BlogPost): Record<string, unknown> {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    excerpt: post.excerpt,
    content: post.content,
    youtube: post.youtube || null,
    image: post.image || null,
  };
}

const FILE = path.join(process.cwd(), 'content', 'posts.json');

async function fileLoad(): Promise<BlogPost[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf8')) as BlogPost[];
  } catch {
    try {
      await fileSave([...seed]); // first run — seed from static content
    } catch {
      // read-only filesystem (e.g. Vercel) — serve the seed without persisting
    }
    return [...seed];
  }
}

async function fileSave(posts: BlogPost[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(posts, null, 2), 'utf8');
}

export async function readAllPosts(): Promise<BlogPost[]> {
  const db = getSupabaseAdmin();
  if (!db) return fileLoad();
  const { data, error } = await db.from('posts').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToPost);
}

export async function readPost(slug: string): Promise<BlogPost | undefined> {
  const db = getSupabaseAdmin();
  if (!db) return (await fileLoad()).find((p) => p.slug === slug);
  const { data, error } = await db.from('posts').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data ? rowToPost(data) : undefined;
}

export async function createPostStore(post: BlogPost): Promise<string> {
  const db = getSupabaseAdmin();
  if (!db) {
    const posts = await fileLoad();
    let slug = post.slug || 'post';
    let n = 2;
    while (posts.some((p) => p.slug === slug)) slug = `${post.slug}-${n++}`;
    posts.unshift({ ...post, slug });
    await fileSave(posts);
    return slug;
  }

  let slug = post.slug || 'post';
  let n = 2;
  for (;;) {
    const { data } = await db.from('posts').select('slug').eq('slug', slug).maybeSingle();
    if (!data) break;
    slug = `${post.slug}-${n++}`;
  }
  const { error } = await db.from('posts').insert(postToRow({ ...post, slug }));
  if (error) throw error;
  return slug;
}

export async function updatePostStore(originalSlug: string, post: BlogPost): Promise<void> {
  const db = getSupabaseAdmin();
  if (!db) {
    const posts = await fileLoad();
    const i = posts.findIndex((p) => p.slug === originalSlug);
    if (i === -1) posts.unshift(post);
    else posts[i] = post;
    await fileSave(posts);
    return;
  }

  const { error } = await db
    .from('posts')
    .update({ ...postToRow(post), updated_at: new Date().toISOString() })
    .eq('slug', originalSlug);
  if (error) throw error;
}

export async function deletePostStore(slug: string): Promise<void> {
  const db = getSupabaseAdmin();
  if (!db) {
    const posts = await fileLoad();
    await fileSave(posts.filter((p) => p.slug !== slug));
    return;
  }
  const { error } = await db.from('posts').delete().eq('slug', slug);
  if (error) throw error;
}
