import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import type { BlogPost } from '@/types';
import { blogPosts as seed } from '@/data/blog';

/**
 * File-based blog store — the dashboard's source of truth.
 *
 * Posts persist to `content/posts.json` (created & seeded from /data/blog.ts on
 * first run). This makes the dashboard fully functional locally with zero setup.
 *
 * NOTE: A serverless host with a read-only filesystem (e.g. Vercel) won't persist
 * writes — that's when you switch this layer to Supabase (schema in
 * supabase/schema.sql, admin client in lib/supabaseAdmin.ts). The dashboard and
 * public site call getPosts()/getPost() in lib/posts.ts, so only that file changes.
 */

const FILE = path.join(process.cwd(), 'content', 'posts.json');

async function load(): Promise<BlogPost[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf8')) as BlogPost[];
  } catch {
    await save([...seed]); // first run — seed from static content
    return [...seed];
  }
}

async function save(posts: BlogPost[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(posts, null, 2), 'utf8');
}

export async function readAllPosts(): Promise<BlogPost[]> {
  return load();
}

export async function readPost(slug: string): Promise<BlogPost | undefined> {
  return (await load()).find((p) => p.slug === slug);
}

export async function createPostStore(post: BlogPost): Promise<string> {
  const posts = await load();
  let slug = post.slug || 'post';
  let n = 2;
  while (posts.some((p) => p.slug === slug)) slug = `${post.slug}-${n++}`; // keep slugs unique
  posts.unshift({ ...post, slug });
  await save(posts);
  return slug;
}

export async function updatePostStore(originalSlug: string, post: BlogPost): Promise<void> {
  const posts = await load();
  const i = posts.findIndex((p) => p.slug === originalSlug);
  if (i === -1) posts.unshift(post);
  else posts[i] = post;
  await save(posts);
}

export async function deletePostStore(slug: string): Promise<void> {
  const posts = await load();
  await save(posts.filter((p) => p.slug !== slug));
}
