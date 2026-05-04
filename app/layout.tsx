// Imports Next.js Metadata type for SEO
import type { Metadata } from "next";
// Imports Google fonts for typography (Manrope and Syne)
import { Manrope, Syne } from "next/font/google";
// Imports global CSS styles with Tailwind
import "@/app/globals.css";
// Imports custom cursor component for themed cursor effects
import { CustomCursor } from "@/components/cinematic/custom-cursor";
// Imports scroll progress bar component
import { ScrollProgress } from "@/components/cinematic/scroll-progress";
// Imports smooth scroll wrapper component
import { SmoothScroll } from "@/components/cinematic/smooth-scroll";
// Imports structured data component for SEO
import { StructuredData } from '@/components/cinematic/structured-data';
// Imports site URL constant
import { siteUrl } from "@/lib/site";
// Imports Vercel Analytics component
import { Analytics } from '@vercel/analytics/next';

// Configures Manrope font with latin subset and CSS variable
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// Configures Syne font with latin subset and CSS variable
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

// Defines metadata for SEO and social sharing
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Baman Prasad Guragain (MrTrotid) | Cybersecurity Enthusiast',
    template: '%s | Baman Prasad Guragain (MrTrotid)',
  },
  description:
    'Portfolio of Baman Prasad Guragain (MrTrotid) - Cybersecurity Enthusiast from Nepal exploring network security, coding, and open source development.',
  category: 'technology',
  applicationName: "Baman Prasad Guragain Portfolio",
  keywords: [
    "Baman Prasad Guragain",
    "MrTrotid",
    'Baman Guragain',
    'Baman Prasad',
    "Cybersecurity",
    "Security",
    "Code",
    "Networking",
    'Cybersecurity Enthusiast Nepal',
    "Creative Developer",
    'SEO Content Writer Gadgetbyte Nepal',
    'Web Developer Nepal',
    "Portfolio",
  ],
  authors: [{ name: 'Baman Prasad Guragain', url: siteUrl }],
  creator: 'Baman Prasad Guragain (MrTrotid)',
  publisher: 'Baman Prasad Guragain',
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      "pending-google-verification-token",
  },
  openGraph: {
    title: 'Baman Prasad Guragain (MrTrotid) | Cybersecurity Enthusiast',
    description:
      'Hey there this is my portfolio where you will find most of the things about me.',
    type: "website",
    siteName: 'Baman Prasad Guragain Portfolio',
    locale: 'en_US',
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Baman Prasad Guragain portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Baman Prasad Guragain (MrTrotid) | Cybersecurity Enthusiast',
    description: 'Hey there this is my portfolio where you will find most of the things about me.',
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

// Type definition for root layout props
type RootLayoutProps = {
  children: React.ReactNode;
};

// Root layout component wrapping all pages
const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    // HTML document with language and font variables
    <html lang="en" className={`${manrope.variable} ${syne.variable}`}>
      <body>
        {/* Structured data for search engines */}
        <StructuredData />
        {/* Noise texture overlay */}
        <div className="noise-overlay" />
        {/* Smooth scroll wrapper */}
        <SmoothScroll />
        {/* Scroll progress indicator */}
        <ScrollProgress />
        {/* Custom cursor */}
        <CustomCursor />
        {/* Page content */}
        {children}
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
