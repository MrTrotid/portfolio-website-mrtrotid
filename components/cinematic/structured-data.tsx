// Imports profile data from lib
import { profile } from '@/lib/profile';
// Imports site URL from lib
import { siteUrl } from '@/lib/site';

// Structured data component for SEO - injects JSON-LD into page
export const StructuredData = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.alias,
    url: siteUrl,
    jobTitle: profile.role,
    description: profile.intro,
    image: `${siteUrl}/contact-portrait.png`,
    sameAs: [
      profile.links.github,
      profile.links.linkedin,
      profile.links.youtube,
      profile.links.instagram,
      profile.links.projects,
      profile.links.certifications,
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Gadgetbyte Nepal',
    },
    knowsAbout: [
      'Cybersecurity',
      'Web Application Security',
      'Next.js',
      'TypeScript',
      'Creative Development',
      'SEO Content Writing',
    ],
  };

  return (
    // Injects JSON-LD script for search engines
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
