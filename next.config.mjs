/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  typedRoutes: true,
  experimental: {
    // Trims unused exports from animation libs to shrink the client bundle.
    optimizePackageImports: ['framer-motion', 'gsap', 'lenis'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
