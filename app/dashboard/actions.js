'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { DASH_COOKIE, DASH_PASSWORD, DASH_TOKEN } from '../../lib/dashboard-auth';
import * as store from '../../lib/store';

export async function loginAction(formData) {
  const password = String(formData.get('password') || '');
  const next = String(formData.get('next') || '/dashboard');
  if (password !== DASH_PASSWORD) redirect('/dashboard/login?error=1');
  cookies().set(DASH_COOKIE, DASH_TOKEN, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 });
  redirect(next.startsWith('/dashboard') ? next : '/dashboard');
}

export async function logoutAction() {
  cookies().delete(DASH_COOKIE);
  redirect('/dashboard/login');
}

function guardWrite() {
  if (!store.canWrite()) {
    throw new Error('Saving needs Supabase — add your keys as environment variables in Vercel.');
  }
}

export async function savePostAction(formData) {
  guardWrite();
  const original = formData.get('original') || null;
  const post = {
    title: formData.get('title'), slug: formData.get('slug'), cat: formData.get('cat'),
    date: formData.get('date'), img: ytThumb(formData.get('youtube')) || formData.get('img') || '',
    excerpt: formData.get('excerpt'),
  };
  const raw = String(formData.get('content') || '');
  const bodyHtml = /<[a-z][\s\S]*>/i.test(raw) ? raw : store.mdLiteToHtml(raw);
  await store.savePost({ original, post, bodyHtml });
  revalidatePath('/dashboard'); revalidatePath('/blog'); revalidatePath('/');
  redirect('/dashboard');
}

export async function deletePostAction(formData) {
  guardWrite();
  await store.deletePost(String(formData.get('slug')));
  revalidatePath('/dashboard'); revalidatePath('/blog'); revalidatePath('/');
}

export async function saveCaseAction(formData) {
  guardWrite();
  const original = formData.get('original') || null;
  const item = {
    name: formData.get('name'), slug: formData.get('slug'), cat: formData.get('cat'),
    filter: formData.get('filter'), tagline: formData.get('tagline'), img: formData.get('img') || '',
    published: formData.get('published') !== 'off',
  };
  const bodyHtml = String(formData.get('body') || '');
  await store.saveCase({ original, item, bodyHtml });
  revalidatePath('/dashboard/case-studies'); revalidatePath('/case-studies'); revalidatePath('/');
  redirect('/dashboard/case-studies');
}

export async function deleteCaseAction(formData) {
  guardWrite();
  await store.deleteCase(String(formData.get('slug')));
  revalidatePath('/dashboard/case-studies'); revalidatePath('/case-studies'); revalidatePath('/');
}

function ytThumb(url) {
  const u = String(url || '');
  const m = u.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : '';
}
