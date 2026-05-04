// Enables client-side rendering for this component
"use client";

// Imports Framer Motion for animations
import { motion } from "framer-motion";
// Imports Next.js Image component for optimized images
import Image from "next/image";
// Imports Magnetic component for magnetic cursor effect
import { Magnetic } from '@/components/cinematic/magnetic';
// Imports animation variants
import { fadeInUp, staggerContainer } from "@/lib/motion/variants";

// Type definition for hero section props
type HeroSectionProps = {
  name: string;
  alias: string;
  role: string;
  links: {
    github: string;
    linkedin: string;
    x: string;
    youtube: string;
    instagram: string;
    resume: string;
  };
};

// Side navigation items array
const sideLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
];

// Hero section component - main landing area
export const HeroSection = ({ name, alias, role, links }: HeroSectionProps) => {
  const firstLine = "Baman Prasad";
  const secondLine = "Guragain";

  // Handle navigation click with smooth scroll
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const section = document.querySelector(href);
    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black px-6 pb-6 pt-6 md:px-10 md:pb-8 md:pt-10 lg:px-14">
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid min-h-[82svh] w-full max-w-[1400px] grid-rows-[auto_1fr_auto] md:min-h-[88svh]"
      >
        <motion.div variants={fadeInUp} className="z-10 flex items-start justify-between gap-6">
          <div className="flex items-center gap-4 pt-2 sm:gap-5 sm:pt-0">
            <Image
              src="/logo.png"
              alt="MrTrotid logo"
              width={80}
              height={80}
              priority
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
            <h2 className="terminal-green section-title text-2xl font-semibold tracking-[0.28em] sm:text-5xl">
              {alias}
            </h2>
          </div>

          <div className="pt-2 pr-1 text-right">
            <h1 className="terminal-green section-title text-2xl font-semibold leading-[1.28] sm:text-5xl">
              <span className="block">{firstLine}</span>
              <span className="block">{secondLine}</span>
            </h1>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="pointer-events-none absolute inset-0 grid place-items-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.018, 1],
              boxShadow: [
                "0 0 30px rgba(57,255,20,0.22), inset 0 0 40px rgba(57,255,20,0.08)",
                "0 0 60px rgba(57,255,20,0.35), inset 0 0 60px rgba(57,255,20,0.12)",
                "0 0 30px rgba(57,255,20,0.22), inset 0 0 40px rgba(57,255,20,0.08)",
              ],
            }}
            transition={{
              duration: 5.5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
            className="hero-ring h-[70vw] w-[70vw] max-h-[600px] max-w-[600px] min-h-[260px] min-w-[260px] rounded-full border-[14px] border-[#39ff14] md:h-[46vw] md:w-[46vw] md:min-h-[340px] md:min-w-[340px] md:border-[18px]"
          />
        </motion.div>

        <motion.aside
          variants={fadeInUp}
          className="absolute bottom-0 right-2 top-0 hidden items-center lg:flex xl:right-4"
        >
          <ul className="flex flex-col items-center gap-12">
            {sideLinks.map((item) => (
              <li key={item.href}>
                <motion.a
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="details"
                  data-cursor-label="Navigate to"
                  className="inline-flex h-36 min-h-11 w-11 items-center justify-center text-[1.2rem] font-semibold leading-none tracking-[0.1em] text-white transition-colors hover:text-[#39ff14] [writing-mode:vertical-rl]"
                >
                  {item.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.aside>

        <motion.div
          variants={fadeInUp}
          className="mt-auto space-y-[22px] pt-4 pr-0 md:space-y-0 md:pt-8 md:pr-14 lg:pr-20"
        >
          <div className="z-10 flex justify-center gap-2 md:hidden">
            {sideLinks.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                whileTap={{ scale: 0.96 }}
                data-cursor="details"
                data-cursor-label="Navigate to"
                className="px-2 py-1 text-[12px] sm:text-sm font-semibold tracking-[0.05em] text-[#dfffe3] transition-colors hover:text-[#39ff14]"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-end justify-between gap-4 md:gap-8">
            <div>
              <p className="text-3xl font-semibold text-white sm:text-4xl">
                Student
              </p>
              <p className="text-2xl text-white/90 sm:text-3xl">
                From <span className="terminal-green font-semibold">NP</span>
              </p>
              <p className="sr-only">{role}</p>
            </div>

            <div className="flex items-center gap-4 pb-1 text-xl">
              <Magnetic strength={7}>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center text-white transition-colors hover:text-[#39ff14]"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                    <path d="M12 2a10 10 0 00-3.162 19.49c.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.776.603-3.363-1.338-3.363-1.338-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.528 2.34 1.087 2.91.831.09-.646.35-1.088.636-1.338-2.217-.252-4.548-1.108-4.548-4.932 0-1.089.389-1.98 1.028-2.678-.103-.253-.446-1.268.098-2.643 0 0 .838-.268 2.746 1.024A9.56 9.56 0 0112 6.844c.85.004 1.706.115 2.506.337 1.907-1.292 2.744-1.024 2.744-1.024.546 1.375.203 2.39.1 2.643.64.698 1.026 1.589 1.026 2.678 0 3.834-2.335 4.677-4.559 4.925.359.31.678.921.678 1.857 0 1.34-.012 2.421-.012 2.75 0 .269.18.58.688.482A10.001 10.001 0 0012 2z" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic strength={7}>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#0a66c2] transition-colors hover:text-[#61a8ea]"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM0 8h5v15H0V8zm7.5 0h4.79v2.05h.07c.67-1.27 2.3-2.6 4.74-2.6 5.06 0 6 3.33 6 7.66V23h-5v-6.9c0-1.64-.03-3.75-2.29-3.75-2.29 0-2.64 1.79-2.64 3.63V23h-5V8z" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic strength={7}>
                <a
                  href={links.x}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center text-white transition-colors hover:text-[#e7ffe9]"
                  aria-label="X"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic strength={7}>
                <a
                  href={links.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#ff0033] transition-colors hover:text-[#ff6e8c]"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                    <path d="M23.5 6.2a3.1 3.1 0 00-2.18-2.2C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.32.5A3.1 3.1 0 00.5 6.2 32.9 32.9 0 000 12a32.9 32.9 0 00.5 5.8 3.1 3.1 0 002.18 2.2c1.92.5 9.32.5 9.32.5s7.4 0 9.32-.5a3.1 3.1 0 002.18-2.2A32.9 32.9 0 0024 12a32.9 32.9 0 00-.5-5.8zM9.6 15.5v-7L16 12l-6.4 3.5z" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic strength={7}>
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#f58529] transition-colors hover:text-[#ffb37d]"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.8A3.95 3.95 0 003.8 7.75v8.5a3.95 3.95 0 003.95 3.95h8.5a3.95 3.95 0 003.95-3.95v-8.5a3.95 3.95 0 00-3.95-3.95h-8.5zm8.9 1.35a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4z" />
                  </svg>
                </a>
              </Magnetic>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};