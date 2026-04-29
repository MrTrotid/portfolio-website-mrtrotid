# Mrtrotid Portfolio

![Landing Page](.docs/references/landing-page.png)

A modern, high-performance portfolio website built with Next.js, emphasizing typography, responsive layout, and robust security configurations. Designed with a terminal-inspired, cinematic aesthetic, this portfolio showcases projects, cybersecurity certifications, and professional experience.

## Live Site

- **Production URL:** [https://www.bamanguragain.com.np](https://www.bamanguragain.com.np)

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?logo=framer)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright)
![Vitest](https://img.shields.io/badge/Vitest-Unit-6E9F18?logo=vitest)

## Core Features

- **Interactive Project Carousel:** Showcases featured projects with a custom carousel interface. Project images use `object-contain` for proper fitting. Clicking opens the full project on the external projects site.
- **Interactive Certifications Grid:** A dynamic, filterable grid component built with Framer Motion, displaying an array of professional IT and Cybersecurity certifications (e.g., Cisco, AWS, Programiz).
- **Simplified Footer:** Clean footer with copyright, "Back to Top" navigation link, and terminal-style closing message.
- **Strict Security Posture:** Enforced via Next.js Middleware (`middleware.ts`). Implements rigid Content Security Policy (CSP) headers optimized for static Next.js sites, HSTS max-age, and XSS protection.
- **Optimized SEO Architecture:** 
  - Robust metadata generation with 150-160 char description targeting cybersecurity keywords
  - Semantic JSON-LD structured data
  - Targeted OpenGraph imagery (1200×630px)
  - Automatic `sitemap.xml` / `robots.txt` generation with proper priorities
  - Canonical URL configuration with 301 redirects from non-www to www
- **Performance:** Pre-rendered SSG/SSR pages delivering fully populated HTML. Static imports for optimal code splitting (no hydration errors).
- **Typography:** Styled consistently with the retro, terminal-styled `NDot-57` font across the application.
- **Robust CI/CD Pipeline:** GitHub Actions workflow ensuring strict fail-fast sequence (`lint` → `typecheck` → `build` → `unit tests` → `E2E tests`). Protected locally with Husky `pre-push` hooks.

## Project Structure

```text
├── app/
│   ├── layout.tsx         # Root layout with global fonts and SEO
│   ├── page.tsx           # Main landing page assembling UI sections
│   ├── robots.ts          # Dynamic robots.txt generation
│   └── sitemap.ts         # Dynamic sitemap generation
├── components/
│   ├── cinematic/         # Reusable animated UI elements (CustomCursor, HackerType, Magnetic)
│   └── sections/          # Major layout blocks (Hero, Projects, Certifications, Footer)
├── lib/
│   ├── motion/            # Shared Framer Motion animation variants
│   ├── profile.ts         # Centralized data source for content (projects, certs)
│   └── site.ts            # Site configuration variables (www.bamanguragain.com.np)
├── public/                # Static assets, fonts, logos, and images
└── middleware.ts          # Centralized Next.js middleware for security headers
```

## Featured Projects

- **A-Level Past Paper Extractor** - Python desktop app using tkinter/customtkinter for downloading Cambridge A-Level past papers
- **AQ Sentinel** - IoT air quality monitoring solution with ESP32 and React/Node.js
- **MeroAushadhi** - Medicine information app with Google Generative AI and Supabase

## Setup & Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *The application will start on `http://localhost:3000`.*

3. **Code Quality Checks:**
   Before pushing, ensure all checks pass (these are also enforced via `.husky/pre-push` and GitHub Actions):
   ```bash
   npm run lint        # Run ESLint
   npm run typecheck   # Run TypeScript Compiler checks
   npm run test        # Run Unit tests
   npm run test:e2e    # Run E2E tests
   ```

## Design Notes

This project emphasizes terminal-styled realism without sacrificing accessibility. The `NDot-57` font heavily influences the uppercase/lowercase design language inherently, offering a distinct retro aesthetic. All project images are displayed with `object-contain` to ensure full visibility without cropping.
