// Enables client-side rendering for this component
'use client';

// Imports Next.js Image component
import Image from 'next/image';
// Imports Framer Motion for animations
import { AnimatePresence, motion } from 'framer-motion';
// Imports React hooks
import { useEffect, useMemo, useState } from 'react';
// Imports HackerType typewriter component
import { HackerType } from '@/components/cinematic/hacker-type';
// Imports Leadership type from profile
import type { Leadership } from '@/lib/profile';
// Imports animation variants
import { fadeInUp, staggerContainer } from '@/lib/motion/variants';

// Type for leadership section props
type LeadershipSectionProps = {
  items: Leadership[];
};

// Matrix-style backdrop component with falling code effect
const MatrixBackdrop = () => {
  // Creates array for column count
  const columns = useMemo(() => new Array(14).fill(0), []);

  return (
    // Overflow-hidden container for matrix effect
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {/* Dark overlay background */}
      <div className="absolute inset-0 bg-[#050b06]/95" />
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.14),rgba(5,11,6,0.92)_56%)]" />
      {/* Animated falling columns */}
      <div className="absolute inset-0">
        {columns.map((_, index) => (
          <motion.div
            key={index}
            className="absolute top-0 h-full w-px bg-[linear-gradient(to_bottom,rgba(57,255,20,0.03),rgba(57,255,20,0.45),rgba(57,255,20,0.02))]"
            style={{ left: `${(index / columns.length) * 100}%` }}
            initial={{ y: '-100%' }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{
              duration: 2.1 + (index % 4) * 0.35,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
              delay: (index % 6) * 0.16,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Leadership section component - displays leadership roles with modal popup
export const LeadershipSection = ({ items }: LeadershipSectionProps) => {
  // State for active (selected) leadership item
  const [active, setActive] = useState<Leadership | null>(null);
  // State for typing effect in modal
  const [typed, setTyped] = useState('');
  const typingTarget = '$ loading org_profile...';

  // Effect to close modal on Escape key
  useEffect(() => {
    if (!active) {
      setTyped('');
      return;
    }
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActive(null);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [active]);

  // Effect for typewriter typing animation
  useEffect(() => {
    if (!active) {
      return;
    }

    setTyped('');
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(typingTarget.slice(0, index));
      if (index >= typingTarget.length) {
        window.clearInterval(timer);
      }
    }, 35);

    return () => window.clearInterval(timer);
  }, [active]);

  return (
    // Section with padding
    <section className="px-6 py-16 md:px-12 lg:px-20">
      {/* Animated container */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12% 0px -10% 0px' }}
        variants={staggerContainer(0.08)}
        className="mx-auto max-w-6xl"
      >
        {/* Card container */}
        <div className="rounded-3xl border border-[#2f5d38]/65 bg-[#070d08]/92 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:p-6">
          {/* Terminal command */}
          <motion.p variants={fadeInUp} className="text-2xl sm:text-3xl">
            <span className="text-[#8b949e]">$</span>{' '}
            <HackerType text={'grep -R "leadership" ./organizations'} />
          </motion.p>

          {/* Grid of organization cards */}
          <motion.div variants={staggerContainer(0.06)} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <motion.button
                key={item.name}
                type="button"
                onClick={() => setActive(item)}
                variants={fadeInUp}
                className="rounded-2xl border border-[#355e3e]/70 bg-[#0c1610]/94 p-4 text-left transition-transform duration-300 hover:-translate-y-1 hover:border-[#5ca66a]"
              >
                {/* Logo and name */}
                <div className="flex items-center gap-3">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={34}
                      height={34}
                      className="h-9 w-9 rounded-md bg-white/85 object-contain p-1"
                      loading="lazy"
                    />
                  ) : null}
                  <h3 className="section-title text-lg text-[#f1fff3]">{item.name}</h3>
                </div>
                {/* Role */}
                <p className="mt-2 text-sm text-[#e1f7e4]">{item.role}</p>
                {/* Period */}
                <p className="mt-1 text-xs tracking-[0.16em] text-[#a3c6ac]">{item.period}</p>
                {/* Hint text */}
                <p className="text-xs">
                  <span className="text-[#8b949e]">%</span> open details
                </p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Modal popup for leadership details */}
      <AnimatePresence>
        {active ? (
          // Modal backdrop
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Click backdrop to close */}
            <motion.button
              type="button"
              aria-label="Close leadership popup"
              className="absolute inset-0 bg-black/88 backdrop-blur-[2px]"
              onClick={() => setActive(null)}
            />

            {/* Modal content */}
            <motion.article
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 14 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-[#39ff14]/35 bg-[#060d08] shadow-[0_28px_80px_rgba(0,0,0,0.72)]"
            >
              {/* Matrix background */}
              <MatrixBackdrop />

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8">
                {/* Typing indicator */}
                <p className="terminal-prompt text-sm">
                  {typed}
                  <span className="terminal-caret ml-1 inline-block h-4 w-[2px] bg-[#39ff14] align-middle" />
                </p>
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="content-heading text-xs tracking-[0.18em]">{active.period}</p>
                    <h3 className="section-title mt-2 text-2xl text-[#e6ffe8] sm:text-3xl">{active.role}</h3>
                    <p className="mt-2 text-[#c9d8ce]">{active.name}</p>
                  </div>
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="inline-flex min-h-11 items-center rounded-full border border-[#39ff14]/35 px-4 text-xs tracking-[0.14em] text-[#ddffe3]"
                  >
                    Close
                  </button>
                </div>

                {/* Description */}
                <p className="content-muted mt-6 text-sm leading-relaxed sm:text-base">{active.description}</p>

                {/* Achievements */}
                <div className="mt-6">
                  <p className="text-sm">
                    <span className="text-[#8b949e]">%</span> achievements
                  </p>
                  <ul className="mt-3 space-y-2">
                    {active.achievements.map((achievement) => (
                      <li key={achievement} className="content-muted text-sm leading-relaxed sm:text-base">
                        <span className="terminal-prompt mr-2">◆</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};
