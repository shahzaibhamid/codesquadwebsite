import 'server-only';
import type { CaseStudy } from '@/types';
import { readAllCaseStudies, readCaseStudy } from '@/lib/caseStudiesStore';

export async function getCaseStudies(options?: { includeDrafts?: boolean }): Promise<CaseStudy[]> {
  const items = await readAllCaseStudies();
  return options?.includeDrafts ? items : items.filter((item) => item.published);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  return readCaseStudy(slug);
}
