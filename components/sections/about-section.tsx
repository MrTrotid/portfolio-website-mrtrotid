// Enables client-side rendering for this component
'use client';

// Imports Framer Motion for animations
import { motion } from 'framer-motion';
// Imports HackerType component for typewriter effect
import { HackerType } from '@/components/cinematic/hacker-type';
// Imports animation variants
import { fadeInUp, staggerContainer } from '@/lib/motion/variants';

// Type definition for about section props
type AboutSectionProps = {
  intro: string;
};

// About section component displaying introduction
export const AboutSection = ({ intro }: AboutSectionProps) => {
  return (
    // Animated container with stagger
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
      variants={staggerContainer(0.1)}
      className="w-full"
    >
      {/* Terminal command with typewriter */}
      <motion.p variants={fadeInUp} className="terminal-prompt text-2xl sm:text-3xl">
        <span className="text-[#8b949e]">$</span> <HackerType text="whoami" />
      </motion.p>
      {/* Intro text with parallax effect */}
      <motion.p
        variants={fadeInUp}
        data-parallax="-8"
        className="content-title section-title mt-4 text-2xl font-medium leading-tight sm:text-4xl"
      >
        {intro}
      </motion.p>
    </motion.div>
  );
};
