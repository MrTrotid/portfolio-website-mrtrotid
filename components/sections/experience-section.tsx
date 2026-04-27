// Enables client-side rendering for this component
'use client';

// Imports Next.js Image component for optimized images
import Image from 'next/image';
// Imports Framer Motion for animations
import { motion } from 'framer-motion';
// Imports HackerType component for typewriter effect
import { HackerType } from '@/components/cinematic/hacker-type';
// Imports Experience type from profile
import type { Experience } from '@/lib/profile';
// Imports animation variants
import { fadeInUp, staggerContainer } from '@/lib/motion/variants';

// Type definition for experience section props
type ExperienceSectionProps = {
  items: Experience[];
};

// Experience section component displaying work experience timeline
export const ExperienceSection = ({ items }: ExperienceSectionProps) => {
  return (
    // Section with padding
    <section className="px-6 py-16 md:px-12 lg:px-20">
      {/* Animated container with stagger */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12% 0px -10% 0px' }}
        variants={staggerContainer(0.12)}
        className="mx-auto max-w-6xl"
      >
        {/* Terminal command with typewriter */}
        <motion.p variants={fadeInUp} className="terminal-prompt text-2xl sm:text-3xl">
          <span className="text-[#8b949e]">$</span> <HackerType text="cat experience.log" />
        </motion.p>
        {/* Timeline container with vertical line */}
        <div className="mt-8 space-y-4 border-l border-[#4bb964]/35 pl-5">
          {items.map((item) => (
            // Individual experience card
            <motion.article
              key={item.org}
              variants={fadeInUp}
              className="relative rounded-2xl border border-[#4bb964]/30 bg-[#0a1a10]/70 p-5"
            >
              {/* Timeline dot */}
              <span className="absolute -left-[1.78rem] top-7 h-3 w-3 rounded-full bg-[#8eff6a]" />
              {/* Period label */}
              <p className="content-heading text-xs tracking-[0.18em]">{item.period}</p>
              {/* Organization and logo */}
              <div className="mt-2 flex items-center gap-3">
                {item.logo ? (
                  <Image src={item.logo} alt={item.org} width={34} height={34} className="rounded-md bg-white/80 object-contain p-1" />
                ) : null}
                <h3 className="content-title section-title text-xl">{item.org}</h3>
              </div>
              {/* Job title */}
              <p className="content-title mt-1 text-sm">{item.title}</p>
              {/* Description */}
              <p className="content-muted mt-3 text-sm leading-relaxed">{item.description}</p>
              {/* Achievements list */}
              {item.achievements?.length ? (
                <div className="mt-4 space-y-2">
                  <p className="terminal-prompt text-xs">
                    <span className="text-[#8b949e]">$</span> achievements
                  </p>
                  <ul className="space-y-1.5">
                    {item.achievements.map((achievement) => (
                      <li key={achievement} className="content-muted text-sm leading-relaxed">
                        <span className="terminal-prompt mr-2">◆</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
