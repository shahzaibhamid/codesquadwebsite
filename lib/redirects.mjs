// Retired blog slugs → the canonical post that replaced them. next.config.mjs turns these
// into 301s, and the public blog list skips them even while the old row is still in Supabase.
export const postRedirects = {
  'seo-aeo-geo-ai-search-guide': 'seo-aeo-geo-ai-search-guide-2',
};

// Medical-related posts temporarily hidden from the public site (blog list, post page, sitemap).
// Remove a slug here to publish it again; the post itself stays in the dashboard/Supabase.
export const hiddenPosts = ['microneedling-seo-med-spas', 'the-fully-booked-business'];
// Posts that only exist in Supabase are matched by title (case-insensitive).
export const hiddenTitles = [
  'Why Social Media Matters for Med Spas and Wellness Centers (and How to Turn Followers Into Bookings)',
  "Why Your Google Business Profile Is Your Clinic's Most Important Front Door",
  'How Dental Practices Get Found, Chosen and Booked: A Local SEO and Follow-Up Playbook',
];
const norm = (t) => String(t || '').replace(/[’‘]/g, "'").trim().toLowerCase();
export const isHiddenPost = (p) => !!p && (hiddenPosts.includes(p.slug) || hiddenTitles.some((t) => norm(t) === norm(p.title)));

// Google & Meta Ads was merged into the marketing-intelligence service page.
export const serviceRedirects = {
  'digital-marketing': 'marketing-intelligence',
};
