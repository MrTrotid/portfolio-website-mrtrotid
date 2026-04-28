/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'bamanguragain.com.np',
          },
        ],
        destination: 'https://www.bamanguragain.com.np/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
