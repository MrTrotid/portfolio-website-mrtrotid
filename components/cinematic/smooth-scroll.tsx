// Enables client-side rendering for this component
'use client';

// Imports Lenis smooth scroll library
import Lenis from 'lenis';
// Imports React useEffect hook
import { useEffect } from 'react';

// Exposes the active Lenis instance so anchor navigation can route through
// it instead of fighting it with a competing native smooth-scroll.
declare global {
  interface Window {
    __lenis?: Lenis | undefined;
  }
}

// Smooth scroll wrapper component using Lenis
export const SmoothScroll = () => {
  // Effect to initialize and cleanup Lenis smooth scroll
  useEffect(() => {
    // Disables smooth-scroll hijacking for reduced-motion users
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Creates Lenis instance with smooth scroll settings
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.35,
      syncTouch: true,
    });
    window.__lenis = lenis;

    // Routes in-page anchor clicks through Lenis so there is a single
    // smooth-scroll system instead of two competing ones
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (!anchor) {
        return;
      }
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') {
        return;
      }
      const section = document.querySelector(hash);
      if (!section) {
        return;
      }
      event.preventDefault();
      lenis.scrollTo(section as HTMLElement, { offset: 0, duration: 1.2 });
      window.history.pushState(null, '', hash);
    };
    document.addEventListener('click', onAnchorClick);

    // Animation frame for continuous scroll updates; pauses when the tab is
    // hidden so it never burns CPU in the background
    let raf = 0;
    const frame = (time: number) => {
      if (!document.hidden) {
        lenis.raf(time);
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onAnchorClick);
      if (window.__lenis === lenis) {
        window.__lenis = undefined;
      }
      lenis.destroy();
    };
  }, []);

  // Returns null - this component only handles scroll behavior
  return null;
};
