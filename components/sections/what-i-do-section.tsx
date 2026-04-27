// Enables client-side rendering
'use client';

// Imports Framer Motion for animations
import { motion } from 'framer-motion';
// Imports HackerType typewriter component
import { HackerType } from '@/components/cinematic/hacker-type';
// Imports animation variants
import { fadeInUp, staggerContainer } from '@/lib/motion/variants';

// Type for what-i-do section props
type WhatIDoSectionProps = {
  items: string[];
};

// What I Do section - lists activities/interests
export const WhatIDoSection = ({ items }: WhatIDoSectionProps) => {
  return (
    // Animated container with stagger
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -10% 0px' }}
      variants={staggerContainer(0.12)}
      className="mt-3 w-full md:mt-0"
    >
      {/* Terminal command with typewriter */}
      <motion.p variants={fadeInUp} className="terminal-prompt text-2xl sm:text-3xl">
        <span className="text-[#8b949e]">$</span> <HackerType text="cat what_i_do.txt" />
      </motion.p>
      {/* List of activities */}
      <motion.ul variants={staggerContainer(0.08)} className="mt-8 grid gap-3 sm:gap-4">
        {items.map((item) => (
          <motion.li
            key={item}
            variants={fadeInUp}
            className="glass content-title rounded-2xl px-5 py-4 text-sm sm:text-base"
          >
            <span className="terminal-prompt mr-2">$</span>
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};
