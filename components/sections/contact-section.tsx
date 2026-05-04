// Enables client-side rendering for this component
"use client";

// Imports Next.js Image component for optimized images
import Image from "next/image";
// Imports Framer Motion for animations
import { motion } from "framer-motion";
// Imports React hooks for state and effects
import { useEffect, useState } from "react";
// Imports HackerType component for typewriter effect
import { HackerType } from "@/components/cinematic/hacker-type";
// Imports animation variants
import { fadeInUp, staggerContainer } from "@/lib/motion/variants";

// Type definition for contact section props
type ContactSectionProps = {
  links: {
    certifications: string;
    projects: string;
    resume: string;
    email: string;
    github: string;
    linkedin: string;
    x: string;
    youtube: string;
    instagram: string;
  };
};

// Array of orbit link objects with positioning and labels
const orbitLinks = [
  {
    id: "certifications",
    label: "Certifications",
    command: "$ verify certs",
    value: "certifications.bamanguragain.com.np",
    executeText: "opening certifications",
    hrefKey: "certifications",
    className: "left-[40px] top-[30px] text-left",
  },
  {
    id: "projects",
    label: "Projects Site",
    command: "$ open --projects",
    value: "projects.bamanguragain.com.np",
    executeText: "opening projects",
    hrefKey: "projects",
    className: "right-[40px] top-[30px] text-right",
  },
  {
    id: "email",
    label: "Email",
    command: "$ send mail",
    value: "contact@bamanguragain.com.np",
    executeText: "composing secure message",
    hrefKey: "email",
    className: "left-[1px] top-[220px] text-left",
  },
  {
    id: "resume",
    label: "Resume",
    command: "$ view resume",
    value: "resume.bamanguragain.com.np",
    executeText: "opening resume",
    hrefKey: "resume",
    className: "right-[1px] top-[220px] text-right",
  },
] as const;

// Contact section component with terminal-style contact links
export const ContactSection = ({ links }: ContactSectionProps) => {
  // State for terminal status line text
  const [statusLine, setStatusLine] = useState("$ idle :: waiting_for_input");

  // Effect to reset status line after delay
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStatusLine("$ idle :: waiting_for_input");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [statusLine]);

  // Function to execute command on link click
  const executeCommand = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string | undefined,
    label: string,
  ) => {
    if (!href) {
      return;
    }

    event.preventDefault();
    setStatusLine(`> ${label}...`);

    window.setTimeout(() => {
      if (href.startsWith("mailto:")) {
        window.location.href = href;
        return;
      }

      if (href.startsWith("http")) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      window.location.href = href;
    }, 260);
  };

  return (
    // Contact section with padding
    <section className="px-6 pb-20 pt-16 md:px-12 lg:px-20">
      {/* Animated container with stagger */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
        variants={staggerContainer(0.1)}
        className="mx-auto w-full max-w-[1400px]"
      >
        {/* Terminal window container */}
        <div
          className="relative overflow-hidden border border-[#2e8246]/45 bg-[#030704] px-5 pb-8 pt-8 sm:px-8 lg:pb-0 lg:px-12 [clip-path:polygon(3%_0%,97%_0%,100%_10%,100%_90%,97%_100%,3%_100%,0%_90%,0%_10%)]"
        >
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.12),transparent_58%)]" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.08)_1px,transparent_1px)] bg-[size:34px_34px] opacity-[0.14]" />
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.85)_0.45px,transparent_0.55px)] [background-size:3px_3px]" />

          {/* Terminal header with traffic lights */}
          <div className="relative z-10 mb-5 flex items-center justify-between rounded-xl border border-[#2f6b3e]/45 bg-[#081109]/85 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6057]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            {/* Terminal status line with typewriter */}
            <p className="terminal-prompt text-xs">
              <HackerType text={statusLine} />
              <span className="terminal-caret ml-1 inline-block h-3 w-[2px] bg-[#39ff14] align-middle" />
            </p>
          </div>

          {/* Section title */}
          <motion.h2
            variants={fadeInUp}
            className="terminal-prompt relative z-10 text-center text-2xl sm:text-3xl"
          >
            <span className="text-[#8b949e]">$</span>{" "}
            <HackerType text="ls -la modules/" />
          </motion.h2>

          {/* Desktop layout with orbit links and portrait */}
          <div className="relative z-10 mt-6 hidden lg:block">
            <div className="relative mx-auto h-[500px] w-full max-w-[1220px]">
              {/* Animated portrait container */}
              <motion.div
                variants={fadeInUp}
                className="absolute inset-x-0 bottom-[-13px] z-20 flex justify-center"
              >
                <div className="relative w-[505px] h-[505px]">
                  <div className="absolute inset-0 border border-[#42b75b]/45 bg-transparent rounded-[58%_42%_63%_37%/41%_55%_45%_59%]" />
                  <Image
                    src="/contact-portrait.png"
                    alt="Baman Prasad Guragain portrait"
                    width={860}
                    height={980}
                    className="absolute -bottom-1 left-1/2 h-auto w-full max-w-[560px] -translate-x-1/2 object-contain"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Orbit links around portrait */}
              {orbitLinks.map((item) => {
                const href = links[item.hrefKey];
                const external = href?.startsWith("http");

                return (
                  <motion.a
                    key={item.id}
                    variants={fadeInUp}
                    href={href}
                    onClick={(event) =>
                      executeCommand(event, href, item.executeText)
                    }
                    data-cursor="details"
                    data-cursor-label="Execute Module"
                    className={`absolute z-30 w-full max-w-[360px] ${item.className}`}
                    whileHover={{ y: -5, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="overflow-hidden rounded-2xl border border-[#3ea657]/45 bg-[#07130b]/86 shadow-[0_0_0_1px_rgba(57,255,20,0.08),0_0_28px_rgba(57,255,20,0.12)] transition-shadow hover:shadow-[0_0_0_1px_rgba(57,255,20,0.22),0_0_42px_rgba(57,255,20,0.22)]">
                      <div className="flex items-center border-b border-[#2a6038]/50 px-3 py-2">
                        <p className="text-[11px] tracking-[0.2em]">
                          {item.label}
                        </p>
                      </div>
                      <div className="px-3 py-3">
                        <p className="!text-[#9be6a8] text-xs">
                          {item.command}
                        </p>
                        <p className="section-title mt-1 !text-[#e7ffe9] text-[17px] leading-tight">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Mobile layout with stacked links */}
          <motion.div
            variants={staggerContainer(0.08)}
            className="relative z-10 mt-8 grid gap-4 lg:hidden"
          >
            <div className="mx-auto flex w-full justify-center">
              <div className="relative w-[385px] h-[385px]">
                <div className="absolute inset-0 border border-[#42b75b]/45 bg-transparent rounded-[58%_42%_63%_37%/41%_55%_45%_59%]" />
                <Image
                  src="/contact-portrait.png"
                  alt="Baman Prasad Guragain portrait"
                  width={760}
                  height={880}
                  className="absolute -bottom-1 left-1/2 h-auto w-full max-w-[380px] -translate-x-1/2 object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            {orbitLinks.map((item) => {
              const href = links[item.hrefKey];

              return (
                <motion.a
                  key={item.id}
                  variants={fadeInUp}
                  href={href}
                  onClick={(event) =>
                    executeCommand(event, href, item.executeText)
                  }
                  data-cursor="details"
                  data-cursor-label="Execute Module"
                  whileHover={{ y: -4 }}
                  className="overflow-hidden rounded-xl border border-[#2e8246]/45 bg-[#09130b]/85"
                >
                  <div className="flex items-center border-b border-[#245733]/50 px-3 py-2">
                    <p className="terminal-prompt text-[11px] tracking-[0.16em]">
                      {item.label}
                    </p>
                  </div>
                  <div className="px-3 py-3">
                    <p className="terminal-prompt !text-[#9be6a8] text-xs">
                      {item.command}
                    </p>
                    <p className="section-title mt-1 !text-[#e7ffe9] text-base leading-tight">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
