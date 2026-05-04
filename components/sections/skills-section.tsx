// Enables client-side rendering
'use client';

// Imports Framer Motion for animations
import { motion } from 'framer-motion';
// Imports HackerType typewriter component
import { HackerType } from '@/components/cinematic/hacker-type';
// Imports animation variants
import { fadeInUp, revealScale, staggerContainer } from '@/lib/motion/variants';

// Type for skills section props
type SkillsSectionProps = {
  skills: {
    frontend: readonly string[];
    security: readonly string[];
    tools: readonly string[];
  };
};

// SkillGroup component - displays a skill category
const SkillGroup = ({ label, values }: { label: string; values: readonly string[] }) => (
  // Skill card with reveal animation
  <motion.div variants={revealScale} className="glass rounded-3xl p-5 sm:p-6">
    {/* Category label */}
    <h3 className="content-title section-title text-lg">
      <span className="terminal-prompt mr-2">#</span>
      {label}
    </h3>
    {/* Skills list */}
    <ul className="mt-4 flex flex-wrap gap-2">
      {values.map((value) => (
        <li
          key={value}
          className="rounded-full border border-[#4bb964]/35 bg-[#0d1f12]/70 px-3 py-1.5 text-xs text-[#dffff0] transition-colors duration-300 hover:bg-[#14331d]"
        >
          {value}
        </li>
      ))}
    </ul>
  </motion.div>
);

// Skills section - displays categorized skills
export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12% 0px -10% 0px' }}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-6xl"
      >
        {/* Terminal command */}
        <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl">
          <span className="text-[#8b949e]">$</span> <HackerType text="ls -la skills/" />
        </motion.h2>
        {/* Skills grid */}
        <motion.div variants={staggerContainer(0.1)} className="mt-8 grid gap-4 md:grid-cols-3">
          <SkillGroup label="Frontend" values={skills.frontend} />
          <SkillGroup label="Security" values={skills.security} />
          <SkillGroup label="Tools" values={skills.tools} />
        </motion.div>
      </motion.div>
    </section>
  );
};
