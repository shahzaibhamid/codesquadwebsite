import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyForm from '@/components/dashboard/CaseStudyForm';
import { updateCaseStudy } from '@/app/dashboard/case-study-actions';
import { getCaseStudy } from '@/lib/caseStudies';
import CaseStudyInstructions from '@/components/dashboard/CaseStudyInstructions';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const metadata: Metadata = { title: 'Edit case study', robots: { index: false } };
export function generateStaticParams() { return []; }

export default async function EditCaseStudyPage({ params }: { params: { slug: string } }) {
  const item = await getCaseStudy(params.slug);
  if (!item) notFound();

  return (
    <>
      <div className="cs-dash__head"><h1>Edit case study</h1></div>
      <CaseStudyInstructions />
      <div className="cs-card"><CaseStudyForm action={updateCaseStudy} caseStudy={item} submitLabel="Save changes" /></div>
    </>
  );
}
