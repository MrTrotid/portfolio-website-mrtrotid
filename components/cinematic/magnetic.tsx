// Enables client-side rendering
'use client';

// Imports Framer Motion for spring animations
import { motion, useMotionValue, useSpring } from 'framer-motion';
// Imports ReactNode type
import type { ReactNode } from 'react';
// Imports React hooks for capability detection
import { useEffect, useState } from 'react';

// Type for Magnetic component props
type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

// Magnetic component - provides smooth magnetic pull effect on mouse hover.
// Renders a plain wrapper on touch devices and for reduced-motion users so
// the spring/mousemove cost is only paid where the effect is visible.
export const Magnetic = ({ children, className, strength = 12 }: MagneticProps) => {
  // Motion values for x and y offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Spring animation for smooth magnetic movement
  const smoothX = useSpring(x, { stiffness: 300, damping: 22, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 22, mass: 0.2 });
  // Whether the magnetic effect should be active on this device
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setEnhanced(finePointer.matches && !reducedMotion.matches);
    };
    update();
    finePointer.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      finePointer.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  if (!enhanced) {
    return <div className={className}>{children}</div>;
  }

  // Mouse move handler - calculates magnetic offset based on cursor position
  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate offset from center
    const offsetX = ((event.clientX - centerX) / rect.width) * strength;
    const offsetY = ((event.clientY - centerY) / rect.height) * strength;

    x.set(offsetX);
    y.set(offsetY);
  };

  // Mouse leave handler - resets position to center
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    // Motion div with spring animation
    <motion.div
      className={className}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
};
