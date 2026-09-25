import { getContent } from '../../lib/content';
export const dynamic = 'force-static';
export const metadata = {
  title: 'Growth System for Med Spas, Medical Clinics, Dental & Salons — CodeSquad',
  description: 'More booked appointments for your med spa, medical clinic, dental practice or salon — treatment-based Google Ads, 3-second follow-up, 14-day nurture, SEO content and booking, in one dashboard.'
};
export default function Page() {
  return <main dangerouslySetInnerHTML={{ __html: getContent('aesthetics') }} />;
}
