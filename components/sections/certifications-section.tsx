'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HackerType } from '@/components/cinematic/hacker-type';
import { Magnetic } from '@/components/cinematic/magnetic';
import type { Certification } from '@/lib/profile';
import { staggerContainer, cinematicReveal, panelRise } from '@/lib/motion/variants';

type CertificationsSectionProps = {
  items: Certification[];
  certificationsUrl?: string;
};

export const CertificationsSection = ({ items, certificationsUrl }: CertificationsSectionProps) => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(items.map((item) => item.category)))];
  
  const filteredItems = items.filter((item) => filter === 'All' || item.category === filter);

  return (
    <section className="px-6 py-16 md:px-12 lg:px-20" data-panel>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12% 0px -10% 0px' }}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={cinematicReveal} className="flex flex-row items-center justify-between gap-4 w-full" data-title-track>
          <p className="terminal-prompt text-lg sm:text-2xl md:text-3xl whitespace-nowrap">
            <span className="text-[#8b949e]">$</span> <HackerType text="ls -la certifications/" />
          </p>
          {certificationsUrl && (
            <Magnetic strength={8} className="shrink-0">
              <a
                href={certificationsUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="details"
                className="external-indicator inline-flex items-center justify-center rounded-full border border-[#4bb964]/35 bg-[#0c1b10]/70 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs tracking-widest text-[#d5ffe0] transition-colors hover:bg-[#14321b] whitespace-nowrap"
              >
                View All Certificates
              </a>
            </Magnetic>
          )}
        </motion.div>
        
        <motion.div variants={panelRise} className="mt-6 sm:mt-8 flex flex-wrap gap-2 md:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`rounded-full border px-4 py-1.5 text-xs tracking-wide transition-colors ${
                filter === category
                  ? 'border-[#4bb964] bg-[#14331d] text-[#dffff0]'
                  : 'border-[#4bb964]/35 bg-[#0d1f12]/70 text-[#a3c6ac] hover:bg-[#14331d]/70 hover:text-[#dffff0]'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((cert) => (
              <motion.article
                key={cert.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl p-5 md:p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="content-heading text-[10px] tracking-[0.2em] mb-3">
                    <span className="terminal-prompt mr-2">#</span>{cert.category}
                  </p>
                  <h3 className="content-title section-title text-lg leading-snug">{cert.name}</h3>
                  <p className="mt-2 text-xs font-medium text-[#a3c6ac] tracking-wide">
                    {cert.issuer} <span className="mx-1.5">•</span> {cert.date}
                  </p>
                  <p className="content-muted mt-3 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};
