// Enables client-side rendering
'use client';

// Imports GSAP ScrollTrigger plugin for scroll-based animations
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Imports GSAP animation library
import gsap from 'gsap';
// Imports React useEffect hook
import { useEffect } from 'react';

// Registers ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Motion layer component - handles all scroll-based animations and text scrambling
export const MotionLayer = () => {
  useEffect(() => {
    // Collects all elements with data-parallax attribute
    const triggers = gsap.utils.toArray<HTMLElement>('[data-parallax]');
    // Creates parallax animations for each element
    const animations = triggers.map((item) =>
      gsap.fromTo(
        item,
        { yPercent: 0 },
        {
          yPercent: Number(item.dataset.parallax ?? 10),
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        },
      ),
    );

    // Collects all panel elements
    const sectionPanels = gsap.utils.toArray<HTMLElement>('[data-panel]');
    // Creates fade/blur animations for panels
    const panelAnimations = sectionPanels.map((panel) =>
      gsap.fromTo(
        panel,
        { opacity: 0.78, y: 36, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 84%',
            end: 'top 50%',
            scrub: 0.55,
          },
        },
      ),
    );

    // Collects title tracking elements
    const titleTracks = gsap.utils.toArray<HTMLElement>('[data-title-track]');
    // Creates title tracking animations
    const trackAnimations = titleTracks.map((title) =>
      gsap.fromTo(
        title,
        { yPercent: 24 },
        {
          yPercent: -24,
          ease: 'none',
          scrollTrigger: {
            trigger: title,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        },
      ),
    );

    // Gets main element scope
    const scope = document.querySelector<HTMLElement>('main#top');
    // Checks for reduced motion preference
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Maps for text scrambling state
    const textTimers = new Map<Text, number>();
    const textByHost = new Map<HTMLElement, Text[]>();
    const baselineByNode = new WeakMap<Text, string>();
    // Character set for scramble effect
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_./-';
    const ANIMATION_MS = 1000;
    const TICK_MS = 33;

    // Scrambles text node with random characters
    const scrambleNode = (node: Text, original: string) => {
      if (reduceMotion) {
        node.nodeValue = original;
        return;
      }

      // Clears existing timer
      const previous = textTimers.get(node);
      if (previous) {
        window.clearInterval(previous);
      }

      // Sets up animation timer
      const startedAt = performance.now();
      const timer = window.setInterval(() => {
        const elapsed = performance.now() - startedAt;
        const progress = Math.min(elapsed / ANIMATION_MS, 1);
        const reveal = Math.floor(progress * original.length);

        const stable = original.slice(0, reveal);
        const scrambled = original
          .slice(reveal)
          .split('')
          .map((char) => (char === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('');

        node.nodeValue = stable + scrambled;

        if (progress >= 1) {
          node.nodeValue = original;
          window.clearInterval(timer);
          textTimers.delete(node);
        }
      }, TICK_MS);

      textTimers.set(node, timer);
    };

    // Intersection observer for text scrambling on scroll
    let textObserver: IntersectionObserver | null = null;

    if (scope) {
      // Creates tree walker to find text nodes
      const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
        acceptNode: (candidate) => {
          const parent = candidate.parentElement;
          const value = candidate.nodeValue;

          // Rejects empty or script/style elements
          if (!parent || !value || !value.trim()) {
            return NodeFilter.FILTER_REJECT;
          }

          if (parent.closest('[data-hacker-skip]')) {
            return NodeFilter.FILTER_REJECT;
          }

          const tag = parent.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        },
      });

      // Collects text nodes by parent element
      let current = walker.nextNode();
      while (current) {
        const node = current as Text;
        const parent = node.parentElement;
        if (parent) {
          const existing = textByHost.get(parent) ?? [];
          existing.push(node);
          textByHost.set(parent, existing);
        }
        current = walker.nextNode();
      }

      // Creates observer for intersection detection
      textObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const host = entry.target as HTMLElement;
            const nodes = textByHost.get(host);
            if (!nodes) {
              return;
            }

            // Starts scrambling when visible
            if (entry.isIntersecting) {
              nodes.forEach((node) => {
                const original = node.nodeValue ?? '';
                baselineByNode.set(node, original);
                scrambleNode(node, original);
              });
              return;
            }

            // Restores original text when not visible
            nodes.forEach((node) => {
              const original = baselineByNode.get(node) ?? node.nodeValue ?? '';
              const timer = textTimers.get(node);
              if (timer) {
                window.clearInterval(timer);
                textTimers.delete(node);
              }
              node.nodeValue = original;
            });
          });
        },
        {
          threshold: 0.32,
          rootMargin: '0px 0px -10% 0px',
        },
      );

      // Observes all parent elements
      textByHost.forEach((_, host) => textObserver?.observe(host));
    }

    // Cleanup on unmount
    return () => {
      animations.forEach((anim) => anim.kill());
      panelAnimations.forEach((anim) => anim.kill());
      trackAnimations.forEach((anim) => anim.kill());
      textTimers.forEach((timer) => window.clearInterval(timer));
      textObserver?.disconnect();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Returns null - this component only handles side effects
  return null;
};
