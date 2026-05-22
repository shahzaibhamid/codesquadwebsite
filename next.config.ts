import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Performance optimizations */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ['*.space.z.ai'],

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Image optimization — long TTL + WebP only to minimize Vercel edge requests
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2678400,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Empty turbopack config to silence the warning
  turbopack: {},
};

export default nextConfig;
