import { postRedirects, serviceRedirects } from './lib/redirects.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      // The all-services hub page was removed; the homepage lists every service.
      { source: '/services', destination: '/#capabilities', statusCode: 301 },
      // /aesthetics and /clinics were merged into one healthcare page.
      { source: '/aesthetics', destination: '/industries/healthcare', statusCode: 301 },
      { source: '/clinics', destination: '/industries/healthcare', statusCode: 301 },
      ...Object.entries(serviceRedirects).map(([from, to]) => ({
        source: `/services/${from}`, destination: `/services/${to}`, statusCode: 301,
      })),
      ...Object.entries(postRedirects).map(([from, to]) => ({
        source: `/blog/${from}`, destination: `/blog/${to}`, statusCode: 301,
      })),
    ];
  },
  experimental: {
    // Dashboard forms send cover images (max 5 MB) and long article bodies through
    // server actions; the default 1 MB limit rejects them.
    serverActions: { bodySizeLimit: '10mb' },
    // The dashboard's "Import original posts" reads these files at runtime.
    outputFileTracingIncludes: {
      '/dashboard': ['./content/blog/**/*', './content/case-studies/**/*'],
      '/dashboard/**/*': ['./content/blog/**/*', './content/case-studies/**/*'],
    },
  },
};
export default nextConfig;
