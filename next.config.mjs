/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  experimental: {
    // Dashboard forms send cover images (max 5 MB) and long article bodies through
    // server actions; the default 1 MB limit rejects them.
    serverActions: { bodySizeLimit: '10mb' },
  },
};
export default nextConfig;
