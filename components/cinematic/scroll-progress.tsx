// Enables client-side rendering for this component
'use client';

// Imports Framer Motion hooks for scroll animations
import { motion, useScroll, useSpring } from 'framer-motion';

// Scroll progress bar component - shows reading progress
export const ScrollProgress = () => {
  // Gets scroll progress value
  const { scrollYProgress } = useScroll();
  // Smooths the scroll progress with spring physics
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.25,
  });

  return (
    // Fixed progress bar at top of viewport
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-slate-300 via-slate-400 to-slate-200"
      style={{ scaleX }}
    />
  );
};
