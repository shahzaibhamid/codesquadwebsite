import 'server-only';
import type { BlogPost } from '@/types';
import { readAllPosts, readPost } from './postsStore';

/**
 * Blog data layer. Reads from the local file store (content/posts.json), which is
 * seeded from /data/blog.ts on first run — so the dashboard is fully functional
 * with zero setup. To move to Supabase later, swap these two functions to query
 * the DB (see supabase/schema.sql + lib/supabaseAdmin.ts); nothing else changes.
 */

export async function getPosts(): Promise<BlogPost[]> {
  return readAllPosts();
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  return readPost(slug);
}
