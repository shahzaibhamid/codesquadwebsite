'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { CaseStudy } from '@/types';
import { slugify } from '@/lib/utils';
import {
  createCaseStudyStore,
  deleteCaseStudyStore,
  updateCaseStudyStore,
} from '@/lib/caseStudiesStore';

const mediaTypes: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif',
  'image/svg+xml': 'svg', 'image/avif': 'avif', 'video/mp4': 'mp4',
  'video/webm': 'webm', 'video/ogg': 'ogg',
};

async function saveUploads(formData: FormData, field: string, imageOnly = false): Promise<string[]> {
  const files = formData.getAll(field).filter((value): value is File => value instanceof File && value.size > 0);
  const destination = path.join(process.cwd(), 'public', 'uploads', 'case-studies');
  if (files.length) await fs.mkdir(destination, { recursive: true });
  return Promise.all(files.map(async (file) => {
    const extension = mediaTypes[file.type];
    if (!extension || (imageOnly && !file.type.startsWith('image/'))) throw new Error(`Unsupported media type: ${file.type || file.name}`);
    if (file.size > 25 * 1024 * 1024) throw new Error(`${file.name} is larger than the 25 MB upload limit.`);
    const filename = `${Date.now()}-${randomUUID()}.${extension}`;
    await fs.writeFile(path.join(destination, filename), Buffer.from(await file.arrayBuffer()));
    return `/uploads/case-studies/${filename}`;
  }));
}

function urls(formData: FormData, field: string): string[] {
  return String(formData.get(field) || '').split(/\r?\n/).map((value) => value.trim()).filter(Boolean);
}

async function sectionMedia(formData: FormData, section: string): Promise<string[]> {
  return [...urls(formData, `${section}_media_links`), ...await saveUploads(formData, `${section}_media_files`)];
}

async function caseStudyFromForm(formData: FormData): Promise<CaseStudy> {
  const text = (key: string) => String(formData.get(key) || '').trim();
  const placement = (key: string): 'start' | 'inline' | 'end' => {
    const value = text(key);
    return value === 'start' || value === 'end' ? value : 'inline';
  };
  const name = String(formData.get('name') || '').trim();
  const url = String(formData.get('url') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const services = String(formData.get('services') || '').trim();
  const desc = String(formData.get('desc') || '').trim();
  const slug = slugify(String(formData.get('slug') || '').trim() || name);
  const sortOrder = Number.parseInt(String(formData.get('sort_order') || '0'), 10);

  if (!name || !slug || !url || !category || !services || !desc) {
    throw new Error('Please complete all required case-study fields.');
  }
  const parsedUrl = new URL(url);
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('Website URL must use HTTP or HTTPS.');

  const uploadedCover = await saveUploads(formData, 'cover_image_file', true);
  const coverUrl = text('cover_image_url');
  if (coverUrl) {
    const parsedCover = new URL(coverUrl);
    if (!['http:', 'https:'].includes(parsedCover.protocol)) throw new Error('Cover image URL must use HTTP or HTTPS.');
  }

  return {
    slug,
    name,
    url: parsedUrl.toString(),
    category,
    services,
    desc,
    published: formData.get('published') === 'on',
    sortOrder: Number.isFinite(sortOrder) ? Math.max(0, sortOrder) : 0,
    kicker: text('kicker') || undefined,
    headline: text('headline') || undefined,
    challenge: text('challenge') || undefined,
    solution: text('solution') || undefined,
    implementation: text('implementation') || undefined,
    results: text('results') || undefined,
    conclusion: text('conclusion') || undefined,
    metrics: text('metrics') || undefined,
    capabilities: text('capabilities') || undefined,
    mediaLinks: urls(formData, 'media_links'),
    coverImage: uploadedCover[0] || coverUrl || text('existing_cover_image') || undefined,
    challengeMedia: await sectionMedia(formData, 'challenge'),
    solutionMedia: await sectionMedia(formData, 'solution'),
    implementationMedia: await sectionMedia(formData, 'implementation'),
    resultsMedia: await sectionMedia(formData, 'results'),
    conclusionMedia: await sectionMedia(formData, 'conclusion'),
    challengeMediaPlacement: placement('challenge_media_placement'),
    solutionMediaPlacement: placement('solution_media_placement'),
    implementationMediaPlacement: placement('implementation_media_placement'),
    resultsMediaPlacement: placement('results_media_placement'),
    conclusionMediaPlacement: placement('conclusion_media_placement'),
    testimonial: text('testimonial') || undefined,
    testimonialAuthor: text('testimonial_author') || undefined,
  };
}

function revalidateCaseStudies() {
  revalidatePath('/');
  revalidatePath('/dashboard/case-studies');
  revalidatePath('/case-studies/[slug]', 'page');
}

export async function createCaseStudy(formData: FormData) {
  await createCaseStudyStore(await caseStudyFromForm(formData));
  revalidateCaseStudies();
  redirect('/dashboard/case-studies?ok=created');
}

export async function updateCaseStudy(formData: FormData) {
  const originalSlug = String(formData.get('original_slug') || '');
  await updateCaseStudyStore(originalSlug, await caseStudyFromForm(formData));
  revalidateCaseStudies();
  redirect('/dashboard/case-studies?ok=updated');
}

export async function deleteCaseStudy(formData: FormData) {
  await deleteCaseStudyStore(String(formData.get('slug') || ''));
  revalidateCaseStudies();
  redirect('/dashboard/case-studies?ok=deleted');
}
