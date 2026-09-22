import { getContent } from '../../lib/content';
export const dynamic = 'force-static';
export const metadata = {
  title: 'Aesthetics Growth System — CodeSquad',
  description: 'A connected growth system for med spas, dermatology, plastic surgery, weight-loss and wellness — treatment campaigns, 3-second follow-up, 14-day nurture and booking, in one dashboard.'
};
export default function Page() {
  return <main dangerouslySetInnerHTML={{ __html: getContent('aesthetics') }} />;
}
