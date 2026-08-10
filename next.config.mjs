/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Dashboard post/case-study forms upload images (up to 25MB, see
    // lib/mediaStorage.ts) through server actions, which default to a 1MB
    // request body limit.
    serverActions: {
      bodySizeLimit: '25mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/offers',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  images: {
    // YouTube thumbnails for blog cards that contain a video link.
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
};

export default nextConfig;
