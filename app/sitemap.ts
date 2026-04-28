// Imports Next.js MetadataRoute type for sitemap definition
import type { MetadataRoute } from 'next';
// Imports site URL from lib
import { siteUrl } from '@/lib/site';

// Strips trailing slash from base URL
const base = siteUrl.replace(/\/$/, '');

// Generates sitemap configuration for SEO
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/#projects`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/#experience`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/#certifications`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  return baseRoutes;
}
