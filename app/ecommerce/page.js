import { getContent } from '../../lib/content';
export const dynamic = 'force-static';
export const metadata = {
  title: 'E-commerce Growth System — CodeSquad',
  description: 'A connected growth system for online stores and DTC brands — shopping ads, product landing pages, abandoned-cart recovery, post-purchase flows and true ROAS, all in one dashboard.'
};
export default function Page() {
  return (
    <main id="top" className="page-ecom" dangerouslySetInnerHTML={{ __html: getContent('ecommerce') }} />
  );
}
