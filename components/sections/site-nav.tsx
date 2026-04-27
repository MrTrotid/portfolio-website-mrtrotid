// Enables client-side rendering
'use client';

// Imports Framer Motion for animations
import { motion } from 'framer-motion';
// Imports React hooks
import { useEffect, useState } from 'react';

// Navigation items array
const items = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

// Site navigation component - fixed header that appears on scroll
export const SiteNav = () => {
  // Visibility state
  const [isVisible, setIsVisible] = useState(false);

  // Handle navigation click with smooth scroll
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const section = document.querySelector(href);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Show nav after scrolling past hero
  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.82;
      setIsVisible(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    // Fixed header with animation
    <motion.header
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -22 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 px-4 md:px-8"
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      {/* Navigation container */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-[#4bb964]/35 bg-[#061108]/70 px-3 py-2 backdrop-blur-md sm:px-5">
        {/* Logo/Home link */}
        <a href="#top" className="min-h-11 min-w-11 rounded-full px-3 py-2 text-sm font-medium text-[#6cff7d]">
          MrTrotid
        </a>
        {/* Navigation links */}
        <ul className="flex items-center gap-1 sm:gap-2">
          {items.map((item) => (
            <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-xs tracking-[0.14em] text-[#e6ffe8] transition-colors hover:bg-[#14301b] hover:text-[#6cff7d] sm:text-sm"
                >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};
