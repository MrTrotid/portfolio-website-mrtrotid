# Mrtrotid Portfolio

![Landing Page](.docs/references/landing-page.png)

A modern, high-performance portfolio website built with Next.js, emphasizing typography, responsive layout, and robust security configurations.

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?logo=framer)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright)
![Vitest](https://img.shields.io/badge/Vitest-Unit-6E9F18?logo=vitest)

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
   ```bash
   npm run lint        # Run ESLint
   npm run typecheck   # Run TypeScript Compiler checks
   npm run test        # Run Unit tests
   npm run test:e2e    # Run E2E tests
   ```

## Live Site

- **Production URL:** [Add your live URL here]

## Features
- **Strict Security:** Custom headers, enforced CSP, and HSTS setup via Next.js Middleware.
- **Optimized SEO:** Robust metadata, semantic JSON-LD structures, and automatic `sitemap.xml` / `robots.txt` generation.
- **Performance:** Pre-rendered pages (SSG/SSR) providing highly available and fully populated HTML over the wire.
