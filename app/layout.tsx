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
    default: 'Baman Prasad Guragain (MrTrotid) | Cybersecurity Enthusiast & Creative Developer',
    template: '%s | Baman Prasad Guragain (MrTrotid)',
  },
  description:
    'Cybersecurity enthusiast and creative developer from Nepal. Building secure, modern web apps and exploring the threat landscape. View my latest projects!',
  category: 'technology',
  applicationName: "Baman Prasad Guragain Portfolio",
  keywords: [
    "Baman Prasad Guragain",
    "MrTrotid",
    'Baman Guragain',
    'Baman Prasad',
    "Cybersecurity",
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
    title: 'Baman Prasad Guragain (MrTrotid) | Cybersecurity & Creative Development Portfolio',
    description:
      'Portfolio of Baman Prasad Guragain (MrTrotid), showcasing cybersecurity-focused projects, certifications, and creative development work.',
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
    title: 'Baman Prasad Guragain (MrTrotid) | Portfolio',
    description: 'Official portfolio of Baman Prasad Guragain (MrTrotid), cybersecurity enthusiast and creative developer.',
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
      </body>
    </html>
  );
};

export default RootLayout;
