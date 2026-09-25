import { renderPatientAcquisitionPage } from '../../lib/patientAcquisitionPage';
import aestheticsConfig from '../../content/aesthetics.config';
export const dynamic = 'force-static';
export const metadata = {
  title: 'Patient Acquisition System for Med Spas & Aesthetic Clinics — CodeSquad',
  description: 'Treatment-based Google Ads, 3-second follow-up, 14-day nurture, SEO content and booking, in one dashboard — real results from a live med spa client: 60+ leads and 6–7 new patients in 2 months.'
};
export default function Page() {
  return <main dangerouslySetInnerHTML={{ __html: renderPatientAcquisitionPage(aestheticsConfig) }} />;
}
