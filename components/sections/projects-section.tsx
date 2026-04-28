// Enables client-side rendering for this component
'use client';

// Imports Next.js Image component for optimized images
import Image from 'next/image';
// Imports Framer Motion for animations
import { AnimatePresence, motion } from 'framer-motion';
// Imports React useState hook
import { useState } from 'react';
// Imports HackerType typewriter component
import { HackerType } from '@/components/cinematic/hacker-type';
// Imports Magnetic component for cursor effect
import { Magnetic } from '@/components/cinematic/magnetic';
// Imports Project type from profile
import type { Project } from '@/lib/profile';
// Imports animation variants
import { cinematicReveal, fadeInUp, panelRise, staggerContainer } from '@/lib/motion/variants';

// Type for projects section props
type ProjectsSectionProps = {
  projects: Project[];
  projectsUrl: string;
};

// Projects section with carousel display
export const ProjectsSection = ({ projects, projectsUrl }: ProjectsSectionProps) => {
  // State for current project index
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = projects[currentIndex];
  // Gets previous project (circular)
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
  // Gets next project (circular)
  const next = projects[(currentIndex + 1) % projects.length];

  // Go to next project
  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  // Go to previous project
  const previousProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // State for carousel direction
  const [direction, setDirection] = useState(1);

  // Open current project in new tab
  const openCurrentProject = () => {
    window.open(currentProject.href, '_blank', 'noopener,noreferrer');
  };

  return (
    // Section with panel data attribute
    <section className="px-6 py-20 md:px-12 lg:px-20" data-panel>
      {/* Animated container */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12% 0px -10% 0px' }}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-6xl"
      >
        {/* Header with title */}
        <motion.div variants={cinematicReveal} className="flex flex-row items-center justify-between gap-4 w-full" data-title-track>
          {/* Terminal command */}
          <p className="terminal-prompt text-lg sm:text-2xl md:text-3xl whitespace-nowrap">
            <span className="text-[#8b949e]">$</span> <HackerType text="ls -la my_projects/" />
          </p>
          {/* View all button with magnetic effect */}
          <Magnetic strength={8} className="shrink-0">
            <a
              href={projectsUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="project"
              className="external-indicator inline-flex items-center justify-center rounded-full border border-[#4bb964]/35 bg-[#0c1b10]/70 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs tracking-widest text-[#d5ffe0] transition-colors hover:bg-[#14321b] whitespace-nowrap"
            >
              View All Projects
            </a>
          </Magnetic>
        </motion.div>

        {/* Navigation controls */}
        <motion.div variants={panelRise} className="mt-6 sm:mt-8 flex items-center justify-center gap-3">
          {/* Previous button */}
          <Magnetic strength={10}>
            <button
              type="button"
              onClick={previousProject}
              data-cursor="details"
              data-cursor-label="Change Project"
              className="inline-flex min-h-11 items-center rounded-full border border-[#4bb964]/35 px-4 text-xs font-semibold tracking-[0.14em] text-[#d9ffe3] transition-colors hover:bg-[#14321b]"
            >
              Prev
            </button>
          </Magnetic>
          {/* Project counter */}
          <p className="terminal-prompt text-xs">
            <span className="text-[#8b949e]">$</span>{' '}
            <HackerType text={`project ${currentIndex + 1} / ${projects.length}`} />
          </p>
          {/* Next button */}
          <Magnetic strength={10}>
            <button
              type="button"
              onClick={nextProject}
              data-cursor="details"
              data-cursor-label="Change Project"
              className="inline-flex min-h-11 items-center rounded-full border border-[#4bb964]/35 px-4 text-xs font-semibold tracking-[0.14em] text-[#d9ffe3] transition-colors hover:bg-[#14321b]"
            >
              Next
            </button>
          </Magnetic>
        </motion.div>

        {/* Projects carousel with 3 columns */}
        <motion.div variants={staggerContainer(0.08)} className="mt-6 grid grid-cols-1 items-center gap-3 md:grid-cols-[0.5fr_1.9fr_0.5fr] md:gap-2 lg:grid-cols-[1fr_2.7fr_1fr] lg:gap-4">
          {/* Previous project preview (desktop only) */}
          <motion.article
            key={`${previous.name}-preview-left`}
            initial={{ opacity: 0.35, x: -18 }}
            animate={{ opacity: 0.52, x: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass pointer-events-none hidden overflow-hidden rounded-2xl p-2 md:block md:p-3"
          >
            <div className="relative h-28 overflow-hidden rounded-xl md:h-44">
              <Image src={previous.image} alt={previous.name} fill sizes="22vw" className="object-cover opacity-80" loading="lazy" />
            </div>
            <p className="content-muted mt-2 truncate text-[10px] tracking-[0.14em] md:text-xs">{previous.name}</p>
          </motion.article>

          {/* Current project display with animation */}
          <AnimatePresence mode="wait">
            <motion.article
              key={currentProject.name}
              initial={{ opacity: 0, x: direction * 38, y: 10, scale: 0.985, rotateY: direction * 6 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, x: direction * -38, y: -8, scale: 0.985, rotateY: direction * -6 }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotateX: 2, rotateY: -2, scale: 1.005 }}
              onClick={openCurrentProject}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openCurrentProject();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open project: ${currentProject.name}`}
              className="glass w-full rounded-3xl p-4"
              data-cursor="project"
            >
              {/* Project image */}
              <div className="relative h-56 overflow-hidden rounded-2xl border border-white/15 sm:h-64 md:h-72">
                <Image
                  src={currentProject.image}
                  alt={currentProject.name}
                  fill
                  sizes="(max-width: 768px) 92vw, 850px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              {/* Project details */}
              <div className="mt-4 space-y-3 text-center">
                <p className="content-heading text-xs tracking-[0.2em]">
                  <span className="terminal-prompt mr-2">#</span>
                  {currentProject.year}
                </p>
                <h3 className="content-title section-title text-xl sm:text-2xl">{currentProject.name}</h3>
                
                <div className="content-muted mx-auto max-w-2xl text-sm leading-relaxed text-left sm:text-center space-y-2">
                  {Array.isArray(currentProject.summary) ? (
                    currentProject.summary.map((para, i) => {
                      // Basic parser for **bold** text
                      const parts = para.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={i}>
                          {parts.map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={j} className="text-[#d6ffe0]">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </p>
                      );
                    })
                  ) : (
                    <p>{currentProject.summary}</p>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#4bb964]/35 bg-[#0d1f12]/70 px-2.5 py-1 text-[11px] tracking-wide text-[#d6ffe0]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Next project preview (desktop only) */}
          <motion.article
            key={`${next.name}-preview-right`}
            initial={{ opacity: 0.35, x: 18 }}
            animate={{ opacity: 0.52, x: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass pointer-events-none hidden overflow-hidden rounded-2xl p-2 md:block md:p-3"
          >
            <div className="relative h-28 overflow-hidden rounded-xl md:h-44">
              <Image src={next.image} alt={next.name} fill sizes="22vw" className="object-cover opacity-80" loading="lazy" />
            </div>
            <p className="content-muted mt-2 truncate text-[10px] tracking-[0.14em] md:text-xs">{next.name}</p>
          </motion.article>
        </motion.div>
      </motion.div>
    </section>
  );
};
