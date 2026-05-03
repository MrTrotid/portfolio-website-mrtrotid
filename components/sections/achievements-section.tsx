// Enables client-side rendering for this component
"use client";

// Imports Framer Motion for animations
import { motion } from "framer-motion";
// Imports HackerType component for typewriter effect
import { HackerType } from '@/components/cinematic/hacker-type';
// Imports Achievement type from profile
import type { Achievement } from "@/lib/profile";
// Imports animation variants
import { fadeInUp, staggerContainer } from "@/lib/motion/variants";

// Type definition for achievements section props
type AchievementsSectionProps = {
  items: Achievement[];
};

// Achievements section component displaying achievements
export const AchievementsSection = ({ items }: AchievementsSectionProps) => {
  return (
    // Section with padding
    <section className="px-6 py-16 md:px-12 lg:px-20">
      {/* Animated container with stagger */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
        variants={staggerContainer(0.08)}
        className="mx-auto max-w-6xl"
      >
        {/* Terminal command with typewriter */}
        <motion.p variants={fadeInUp} className="text-2xl sm:text-3xl">
          <span className="text-[#8b949e]">$</span> <HackerType text="cat achievements.md" />
        </motion.p>
        {/* Grid of achievement cards */}
        <motion.div
          variants={staggerContainer(0.08)}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {items.map((item) => (
            // Individual achievement card
            <motion.article
              key={item.title}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="content-title section-title text-xl">
                {item.title}
              </h3>
              <p className="content-muted mt-3 text-sm leading-relaxed">
                {item.detail}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
