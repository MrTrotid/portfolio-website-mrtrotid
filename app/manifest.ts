// Imports Next.js MetadataRoute type for manifest definition
import type { MetadataRoute } from 'next';

// Generates PWA manifest configuration
const manifest = (): MetadataRoute.Manifest => {
  return {
    name: 'Baman Prasad Guragain Portfolio',
    short_name: 'MrTrotid',
    description:
      'Official portfolio of Baman Prasad Guragain (MrTrotid), cybersecurity enthusiast and creative developer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
};

export default manifest;
