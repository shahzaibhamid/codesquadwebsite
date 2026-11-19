import { getContent } from '../lib/content';
import { renderClientStories } from '../lib/clientStories';
import { getPublishedCases } from '../lib/store';
export const revalidate = 30;

const title = 'AI Automation, Custom Software & Growth Marketing Agency | CodeSquad';
const description = 'CodeSquad designs and builds AI automation, custom software, SEO/GEO/AEO, and performance marketing systems for growing businesses — engineered into your stack, measured on revenue.';
const canonicalUrl = 'https://codesquad.ai/';
const previewImage = {
  url: 'https://codesquad.ai/home-hero-poster.jpg',
  width: 1920,
  height: 1080,
  alt: 'CodeSquad homepage banner: working at a computer',
};

export const metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName: 'CodeSquad',
    type: 'website',
    images: [previewImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [previewImage],
  },
};
export default async function Home() {
  const cases = await getPublishedCases();
  return <main id="top" dangerouslySetInnerHTML={{ __html: getContent('home').replace('<!--#client-stories-->', () => renderClientStories(cases)) }} />;
}
