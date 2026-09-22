import { getContent } from '../../lib/content';
export const dynamic = 'force-static';
export const metadata = {
  title: 'AI Visibility Engine — Automate Search Dominance & Inbound Bookings | CodeSquad',
  description: 'Dominate Google and conversational AI search, publish authoritative content on autopilot, and convert discovery into qualified client bookings 24/7 — inside your existing stack, deployed in under 14 days.'
};
export default function Page() {
  return (
    <main
      style={{ '--sec-img': 'none' }}
      dangerouslySetInnerHTML={{ __html: getContent('visibility-engine') }}
    />
  );
}
