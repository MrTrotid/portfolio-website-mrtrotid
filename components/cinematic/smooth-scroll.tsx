// Enables client-side rendering for this component
'use client';

// Imports Lenis smooth scroll library
import Lenis from '@studio-freight/lenis';
// Imports React useEffect hook
import { useEffect } from 'react';

// Smooth scroll wrapper component using Lenis
export const SmoothScroll = () => {
  // Effect to initialize and cleanup Lenis smooth scroll
  useEffect(() => {
    // Creates Lenis instance with smooth scroll settings
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.35,
      syncTouch: true,
    });

    // Animation frame for continuous scroll updates
    let raf = 0;
    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Returns null - this component only handles scroll behavior
  return null;
};
