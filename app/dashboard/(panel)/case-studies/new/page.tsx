import type { Metadata } from 'next';
import CaseStudyForm from '@/components/dashboard/CaseStudyForm';
import { createCaseStudy } from '@/app/dashboard/case-study-actions';
import CaseStudyInstructions from '@/components/dashboard/CaseStudyInstructions';
import { getIndustries } from '@/lib/industries';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New case study', robots: { index: false } };

export default async function NewCaseStudyPage() {
  const industries = await getIndustries();
  return (
    <>
      <div className="cs-dash__head"><h1>New case study</h1></div>
      <CaseStudyInstructions />
      <div className="cs-card"><CaseStudyForm action={createCaseStudy} submitLabel="Create case study" industries={industries} /></div>
    </>
  );
}
