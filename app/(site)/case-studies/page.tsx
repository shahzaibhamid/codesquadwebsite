import type { Metadata } from 'next';
import SectionHeading from '@/components/sections/SectionHeading';
import CaseStudiesGrid from '@/components/sections/CaseStudiesGrid';
import { getCaseStudies } from '@/lib/caseStudies';
import { getIndustries } from '@/lib/industries';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Production systems built for healthcare, clinics, and e-commerce teams.',
};

export default async function CaseStudiesIndexPage() {
  const [caseStudies, industries] = await Promise.all([getCaseStudies(), getIndustries()]);
  return (
    <section className="cs-section cs-case-section">
      <div className="cs-container">
        <SectionHeading
          eyebrow="Selected work"
          title="Case studies"
          sub="Production systems built for healthcare, clinics, and e-commerce teams designed around their needs."
        />
        <CaseStudiesGrid items={caseStudies} industries={industries} />
      </div>
    </section>
  );
}
