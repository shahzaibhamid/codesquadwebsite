import { renderPatientAcquisitionPage } from '../../../lib/patientAcquisitionPage';
import healthcareConfig from '../../../content/healthcare.config';
export const dynamic = 'force-static';
export const metadata = {
  title: 'Patient Acquisition for Med Spas, Clinics & Dental | CodeSquad',
  description: 'Google Ads, 3-second follow-up, 14-day nurture, SEO and booking in one dashboard — one med spa client got 60+ leads and 6–7 new patients in 2 months.'
};
export default function Page() {
  return <main dangerouslySetInnerHTML={{ __html: renderPatientAcquisitionPage(healthcareConfig) }} />;
}
