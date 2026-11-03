import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

const base = siteUrl.replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        // Explicitly allow leading AI search & answer engines for GEO discoverability
        userAgent: [
          'Googlebot',
          'Bingbot',
          'DuckDuckBot',
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Applebot',
          'CCBot',
          'Google-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}