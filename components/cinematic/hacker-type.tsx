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

  // Effect for typewriter animation
  useEffect(() => {
    // Skip if not in view
    if (!isInView) {
      setOutput(text);
      return;
    }

    // Skip if reduced motion is preferred
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setOutput(text);
      return;
    }

    // Generate initial scrambled text
    const startedAt = performance.now();
    const firstPass = text
      .split('')
      .map((char) => (char === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
      .join('');
    setOutput(firstPass);

    // Animation timer updates text progressively
    const timer = window.setInterval(() => {
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
    }, TICK_MS);

    return () => window.clearInterval(timer);
  }, [isInView, text]);

  // Renders span with typewriter effect
  return (
    <span ref={ref} className={className} data-hacker-skip>
      {output}
    </span>
  );
};
