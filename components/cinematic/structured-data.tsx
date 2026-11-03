// Imports profile data from lib
import { profile } from '@/lib/profile';
// Imports site URL from lib
import { siteUrl } from '@/lib/site';

// Structured data component for SEO & GEO - injects JSON-LD into page
export const StructuredData = () => {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: `${siteUrl}/`,
      name: `${profile.name} (${profile.alias}) Portfolio`,
      description: profile.intro,
      inLanguage: 'en-US',
      dateCreated: '2025-01-01T00:00:00Z',
      dateModified: new Date().toISOString(),
      mainEntity: {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: profile.name,
        alternateName: [profile.alias, 'Baman Guragain', 'Baman Prasad'],
        url: `${siteUrl}/`,
        jobTitle: profile.role,
        description: profile.intro,
        image: `${siteUrl}/contact-portrait.png`,
        email: profile.links.email,
        nationality: {
          '@type': 'Country',
          name: 'Nepal',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kathmandu',
          addressCountry: 'NP',
        },
        alumniOf: [
          {
            '@type': 'EducationalOrganization',
            name: 'Kathmandu University',
            url: 'https://ku.edu.np',
          },
          {
            '@type': 'EducationalOrganization',
            name: "St. Xavier's College, Maitighar",
            url: 'https://sxc.edu.np',
          },
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Gadgetbyte Nepal',
          url: 'https://www.gadgetbytenepal.com',
        },
        sameAs: [
          profile.links.github,
          profile.links.linkedin,
          profile.links.x,
          profile.links.youtube,
          profile.links.instagram,
          profile.links.projects,
          profile.links.certifications,
          profile.links.resume,
        ],
        knowsAbout: [
          'Cybersecurity',
          'Network Security',
          'Linux Systems (Debian/Arch)',
          'Web Application Security',
          'Python Programming',
          'Next.js & React Development',
          'TypeScript',
          'Docker & Containerization',
          'AWS Cloud Fundamentals',
          'IoT & Embedded Systems (ESP32)',
          'SEO & Technical Content Writing',
        ],
        hasCredential: profile.certifications.map((cert) => ({
          '@type': 'EducationalOccupationalCredential',
          name: cert.name,
          credentialCategory: cert.category,
          recognizedBy: {
            '@type': 'Organization',
            name: cert.issuer,
          },
          description: cert.description,
        })),
      },
      hasPart: profile.projects.map((proj) => ({
        '@type': 'CreativeWork',
        name: proj.name,
        url: proj.href,
        description: Array.isArray(proj.summary)
          ? proj.summary.join(' ').replace(/\*\*/g, '')
          : proj.summary,
        image: `${siteUrl}${proj.image}`,
        dateCreated: proj.year,
        keywords: proj.tags.join(', '),
        author: {
          '@id': `${siteUrl}/#person`,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: `${profile.name} (${profile.alias}) Portfolio`,
      description:
        'Official portfolio of Baman Prasad Guragain (MrTrotid) - Cybersecurity enthusiast, developer, and student from Nepal.',
      inLanguage: 'en-US',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ];

  return (
    // Injects JSON-LD script for search engines & AI discovery
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
