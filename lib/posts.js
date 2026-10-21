import blogPostsData from './data/blog-posts.json';
import caseStudiesData from './data/case-studies.json';

// Data is edited through the local admin panel (run: npm run admin).
// It writes lib/data/*.json and content/{blog,case-studies}/<slug>.html.
export const blogPosts = blogPostsData;
export const caseStudies = caseStudiesData;

export const blogCats = ['All', 'AI Automation', 'SMEs', 'AEO / SEO', 'Business Growth', 'Software Development', 'Lead Generation'];

export const caseCats = ['All', 'Automotive', 'Education', 'Financial Services', 'Legal Services', 'Healthcare & Clinics', 'E-commerce'];

export const blogBySlug = Object.fromEntries(blogPosts.map(p => [p.slug, p]));
export const caseBySlug = Object.fromEntries(caseStudies.map(p => [p.slug, p]));
