'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { BlogPost } from '@/types';
import { ADMIN_COOKIE, ADMIN_SESSION, isValidDashboardPassword } from '@/lib/auth';
import { slugify, contentToHtml } from '@/lib/utils';
import { createPostStore, updatePostStore, deletePostStore } from '@/lib/postsStore';
import { uploadCaseStudyFile } from '@/lib/mediaStorage';

export async function login(formData: FormData) {
  const pw = String(formData.get('password') || '').trim();
  if (!isValidDashboardPassword(pw)) redirect('/dashboard/login?error=1');
  cookies().set(ADMIN_COOKIE, ADMIN_SESSION, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });
  redirect('/dashboard');
}

export async function logout() {
  cookies().delete(ADMIN_COOKIE);
  redirect('/dashboard/login');
}

/** Content images, in order: typed URLs first, then uploaded files — matched
 * positionally to each #IMAGE# marker in the content textarea. */
async function contentImages(formData: FormData): Promise<string[]> {
  const urls = String(formData.get('content_image_links') || '')
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean);
  const files = formData.getAll('content_image_files').filter((value): value is File => value instanceof File && value.size > 0);
  const uploaded = await Promise.all(files.map((file) => uploadCaseStudyFile(file, true)));
  return [...urls, ...uploaded];
}

async function postFromForm(formData: FormData): Promise<BlogPost> {
  const title = String(formData.get('title') || '').trim();
  const rawSlug = String(formData.get('slug') || '').trim();
  const slug = slugify(rawSlug) || slugify(title);
  const date =
    String(formData.get('date') || '').trim() ||
    new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const youtube = String(formData.get('youtube') || '').trim();

  const imageFile = formData.get('image_file');
  const uploadedImage =
    imageFile instanceof File && imageFile.size > 0 ? await uploadCaseStudyFile(imageFile, true) : '';
  const imageUrl = String(formData.get('image_url') || '').trim();
  const existingImage = String(formData.get('existing_image') || '').trim();
  const image = uploadedImage || imageUrl || existingImage;

  const images = await contentImages(formData);

  return {
    slug,
    title,
    category: String(formData.get('category') || 'AI Automation'),
    date,
    excerpt: String(formData.get('excerpt') || ''),
    content: contentToHtml(String(formData.get('content') || ''), images),
    youtube: youtube || undefined,
    image: image || undefined,
  };
}

/** Revalidate every route that renders posts so changes show immediately. */
function revalidatePosts(...slugs: string[]) {
  revalidatePath('/blog');
  revalidatePath('/dashboard');
  for (const s of slugs) if (s) revalidatePath(`/blog/${s}`);
}

export async function createPost(formData: FormData) {
  const post = await postFromForm(formData);
  const slug = await createPostStore(post);
  revalidatePosts(slug);
  redirect('/dashboard?ok=created');
}

export async function updatePost(formData: FormData) {
  const original = String(formData.get('original_slug') || '');
  const post = await postFromForm(formData);
  await updatePostStore(original, post);
  revalidatePosts(post.slug, original);
  redirect('/dashboard?ok=updated');
}

export async function deletePost(formData: FormData) {
  const slug = String(formData.get('slug') || '');
  await deletePostStore(slug);
  revalidatePosts(slug);
  redirect('/dashboard?ok=deleted');
}
