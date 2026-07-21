import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import type { CaseStudy } from '@/types';
import { caseStudies as seed } from '@/data/home';
import { slugify } from '@/lib/utils';

const FILE = path.join(process.cwd(), 'content', 'case-studies.json');

function seededCases(): CaseStudy[] {
  return seed.map((item, index) => ({
    ...item,
    slug: slugify(item.name),
    published: true,
    sortOrder: index + 1,
  }));
}

async function save(items: CaseStudy[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(items, null, 2), 'utf8');
}

async function load(): Promise<CaseStudy[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf8')) as CaseStudy[];
  } catch {
    const items = seededCases();
    try {
      await save(items);
    } catch {
      // read-only filesystem (e.g. Vercel) — serve the seed without persisting
    }
    return items;
  }
}

export async function readAllCaseStudies(): Promise<CaseStudy[]> {
  return (await load()).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function readCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  return (await load()).find((item) => item.slug === slug);
}

export async function createCaseStudyStore(item: CaseStudy): Promise<string> {
  const items = await load();
  let slug = item.slug || 'case-study';
  let suffix = 2;
  while (items.some((existing) => existing.slug === slug)) {
    slug = `${item.slug || 'case-study'}-${suffix++}`;
  }
  items.push({ ...item, slug });
  await save(items);
  return slug;
}

export async function updateCaseStudyStore(originalSlug: string, item: CaseStudy): Promise<void> {
  const items = await load();
  const duplicate = items.some(
    (existing) => existing.slug === item.slug && existing.slug !== originalSlug,
  );
  if (duplicate) throw new Error('A case study with this slug already exists.');
  const index = items.findIndex((existing) => existing.slug === originalSlug);
  if (index === -1) items.push(item);
  else items[index] = item;
  await save(items);
}

export async function deleteCaseStudyStore(slug: string): Promise<void> {
  const items = await load();
  await save(items.filter((item) => item.slug !== slug));
}
