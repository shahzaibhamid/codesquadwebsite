import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import type { CaseStudy } from '@/types';
import { caseStudies as seed } from '@/data/home';
import { slugify } from '@/lib/utils';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * Case-study store. Uses Supabase (public.case_studies) when configured — the
 * source of truth in production, since Vercel's filesystem is read-only.
 * Falls back to a local JSON file (content/case-studies.json, seeded from
 * /data/home.ts) when Supabase isn't configured.
 */

function rowToCaseStudy(row: Record<string, unknown>): CaseStudy {
  return {
    slug: row.slug as string,
    name: row.name as string,
    url: row.url as string,
    category: row.category as string,
    services: row.services as string,
    desc: row.description as string,
    published: row.published as boolean,
    sortOrder: row.sort_order as number,
    kicker: (row.kicker as string) || undefined,
    headline: (row.headline as string) || undefined,
    challenge: (row.challenge as string) || undefined,
    solution: (row.solution as string) || undefined,
    implementation: (row.implementation as string) || undefined,
    results: (row.results as string) || undefined,
    conclusion: (row.conclusion as string) || undefined,
    metrics: (row.metrics as string) || undefined,
    capabilities: (row.capabilities as string) || undefined,
    mediaLinks: (row.media_links as string[]) || [],
    coverImage: (row.cover_image as string) || undefined,
    challengeMedia: (row.challenge_media as string[]) || [],
    solutionMedia: (row.solution_media as string[]) || [],
    implementationMedia: (row.implementation_media as string[]) || [],
    resultsMedia: (row.results_media as string[]) || [],
    conclusionMedia: (row.conclusion_media as string[]) || [],
    challengeMediaPlacement: (row.challenge_media_placement as CaseStudy['challengeMediaPlacement']) || 'inline',
    solutionMediaPlacement: (row.solution_media_placement as CaseStudy['solutionMediaPlacement']) || 'inline',
    implementationMediaPlacement: (row.implementation_media_placement as CaseStudy['implementationMediaPlacement']) || 'inline',
    resultsMediaPlacement: (row.results_media_placement as CaseStudy['resultsMediaPlacement']) || 'inline',
    conclusionMediaPlacement: (row.conclusion_media_placement as CaseStudy['conclusionMediaPlacement']) || 'inline',
    testimonial: (row.testimonial as string) || undefined,
    testimonialAuthor: (row.testimonial_author as string) || undefined,
  };
}

function caseStudyToRow(item: CaseStudy): Record<string, unknown> {
  return {
    slug: item.slug,
    name: item.name,
    url: item.url,
    category: item.category,
    services: item.services,
    description: item.desc,
    published: item.published,
    sort_order: item.sortOrder,
    kicker: item.kicker || null,
    headline: item.headline || null,
    challenge: item.challenge || null,
    solution: item.solution || null,
    implementation: item.implementation || null,
    results: item.results || null,
    conclusion: item.conclusion || null,
    metrics: item.metrics || null,
    capabilities: item.capabilities || null,
    media_links: item.mediaLinks || [],
    cover_image: item.coverImage || null,
    challenge_media: item.challengeMedia || [],
    solution_media: item.solutionMedia || [],
    implementation_media: item.implementationMedia || [],
    results_media: item.resultsMedia || [],
    conclusion_media: item.conclusionMedia || [],
    challenge_media_placement: item.challengeMediaPlacement || 'inline',
    solution_media_placement: item.solutionMediaPlacement || 'inline',
    implementation_media_placement: item.implementationMediaPlacement || 'inline',
    results_media_placement: item.resultsMediaPlacement || 'inline',
    conclusion_media_placement: item.conclusionMediaPlacement || 'inline',
    testimonial: item.testimonial || null,
    testimonial_author: item.testimonialAuthor || null,
  };
}

const FILE = path.join(process.cwd(), 'content', 'case-studies.json');

function seededCases(): CaseStudy[] {
  return seed.map((item, index) => ({
    ...item,
    slug: slugify(item.name),
    published: true,
    sortOrder: index + 1,
  }));
}

async function fileSave(items: CaseStudy[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(items, null, 2), 'utf8');
}

async function fileLoad(): Promise<CaseStudy[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf8')) as CaseStudy[];
  } catch {
    const items = seededCases();
    try {
      await fileSave(items);
    } catch {
      // read-only filesystem (e.g. Vercel) — serve the seed without persisting
    }
    return items;
  }
}

export async function readAllCaseStudies(): Promise<CaseStudy[]> {
  const db = getSupabaseAdmin();
  if (!db) return (await fileLoad()).sort((a, b) => a.sortOrder - b.sortOrder);
  const { data, error } = await db.from('case_studies').select('*').order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(rowToCaseStudy);
}

export async function readCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  const db = getSupabaseAdmin();
  if (!db) return (await fileLoad()).find((item) => item.slug === slug);
  const { data, error } = await db.from('case_studies').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data ? rowToCaseStudy(data) : undefined;
}

export async function createCaseStudyStore(item: CaseStudy): Promise<string> {
  const db = getSupabaseAdmin();
  if (!db) {
    const items = await fileLoad();
    let slug = item.slug || 'case-study';
    let suffix = 2;
    while (items.some((existing) => existing.slug === slug)) slug = `${item.slug || 'case-study'}-${suffix++}`;
    items.push({ ...item, slug });
    await fileSave(items);
    return slug;
  }

  let slug = item.slug || 'case-study';
  let suffix = 2;
  for (;;) {
    const { data } = await db.from('case_studies').select('slug').eq('slug', slug).maybeSingle();
    if (!data) break;
    slug = `${item.slug || 'case-study'}-${suffix++}`;
  }
  const { error } = await db.from('case_studies').insert(caseStudyToRow({ ...item, slug }));
  if (error) throw error;
  return slug;
}

export async function updateCaseStudyStore(originalSlug: string, item: CaseStudy): Promise<void> {
  const db = getSupabaseAdmin();
  if (!db) {
    const items = await fileLoad();
    const duplicate = items.some((existing) => existing.slug === item.slug && existing.slug !== originalSlug);
    if (duplicate) throw new Error('A case study with this slug already exists.');
    const index = items.findIndex((existing) => existing.slug === originalSlug);
    if (index === -1) items.push(item);
    else items[index] = item;
    await fileSave(items);
    return;
  }

  if (item.slug !== originalSlug) {
    const { data } = await db.from('case_studies').select('slug').eq('slug', item.slug).maybeSingle();
    if (data) throw new Error('A case study with this slug already exists.');
  }
  const { error } = await db
    .from('case_studies')
    .update({ ...caseStudyToRow(item), updated_at: new Date().toISOString() })
    .eq('slug', originalSlug);
  if (error) throw error;
}

export async function deleteCaseStudyStore(slug: string): Promise<void> {
  const db = getSupabaseAdmin();
  if (!db) {
    const items = await fileLoad();
    await fileSave(items.filter((item) => item.slug !== slug));
    return;
  }
  const { error } = await db.from('case_studies').delete().eq('slug', slug);
  if (error) throw error;
}
