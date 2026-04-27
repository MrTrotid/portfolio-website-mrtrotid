// Imports Next.js MetadataRoute type for sitemap definition
import type { MetadataRoute } from 'next';
// Imports site URL from lib
import { siteUrl } from '@/lib/site';

// Strips trailing slash from base URL
const base = siteUrl.replace(/\/$/, '');

// Generates sitemap configuration for SEO
const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
};

export default sitemap;
