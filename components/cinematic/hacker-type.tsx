// Enables client-side rendering
'use client';

// Imports React hooks
import { useEffect, useRef, useState } from 'react';
// Imports Framer Motion hook for viewport detection
import { useInView } from 'framer-motion';

// Type for HackerType component props
type HackerTypeProps = {
  text: string;
  className?: string;
};

// Character set for scrambling effect
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_./-';
const ANIMATION_MS = 1000;
const TICK_MS = 33;

// HackerType component - typewriter effect with character scrambling
export const HackerType = ({ text, className }: HackerTypeProps) => {
  // Ref for the span element
  const ref = useRef<HTMLSpanElement | null>(null);
  // Checks if element is in viewport
  const isInView = useInView(ref, { once: false, margin: '-10% 0px -10% 0px' });
  // State for current output text
  const [output, setOutput] = useState(text);
  // State for reduced motion preference
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Effect to keep reduced motion preference in sync with the media query
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Effect for typewriter animation
  useEffect(() => {
    // Skip if not in view or reduced motion is preferred
    if (!isInView || reduceMotion) {
      return;
    }

    // Generate the next scrambled frame based on animation progress
    const startedAt = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const progress = Math.min(elapsed / ANIMATION_MS, 1);
      const reveal = Math.floor(progress * text.length);

      const stable = text.slice(0, reveal);
      const scrambled = text
        .slice(reveal)
        .split('')
        .map((char) => {
          if (char === ' ') {
            return ' ';
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      const next = stable + scrambled;
      setOutput(next);

      if (progress >= 1) {
        setOutput(text);
        window.clearInterval(timer);
      }
    };

    // Start the scramble immediately on the next frame, then keep ticking
    const raf = requestAnimationFrame(tick);
    const timer = window.setInterval(tick, TICK_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
    };
  }, [isInView, text, reduceMotion]);

  // Renders span with typewriter effect
  return (
    <span ref={ref} className={className} data-hacker-skip>
      {!isInView || reduceMotion ? text : output}
    </span>
  );
};
