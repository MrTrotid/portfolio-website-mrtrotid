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

// Motion layer component - handles scroll-based parallax/panel animations.
// Text scrambling is intentionally NOT done here: per-heading scramble is
// already handled by HackerType instances, so a second global TreeWalker +
// IntersectionObserver pass over every text node only duplicated that cost.
export const MotionLayer = () => {
  useEffect(() => {
    // Skips all scroll animation setup for reduced-motion users
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let cancelled = false;
    const cleanups: Array<() => void> = [];

    // Defers heavy ScrollTrigger setup until the browser is idle so it never
    // blocks first paint / interaction on initial load
    const idleCallback =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback.bind(window)
        : (callback: () => void) => window.setTimeout(callback, 200);
    const cancelIdle =
      typeof window.cancelIdleCallback === 'function'
        ? window.cancelIdleCallback.bind(window)
        : (id: number) => window.clearTimeout(id);

    const idleId = idleCallback(() => {
      if (cancelled) {
        return;
      }

      // Collects all elements with data-parallax attribute
      const triggers = gsap.utils.toArray<HTMLElement>('[data-parallax]');
      // Creates parallax animations for each element (transform-only)
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
      // Creates fade/rise animations for panels (opacity + transform only;
      // blur() tweens force repaints on every scroll frame, so avoid them)
      const panelAnimations = sectionPanels.map((panel) =>
        gsap.fromTo(
          panel,
          { opacity: 0.78, y: 36 },
          {
            opacity: 1,
            y: 0,
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

      ScrollTrigger.refresh();

      cleanups.push(() => {
        animations.forEach((anim) => anim.kill());
        panelAnimations.forEach((anim) => anim.kill());
        trackAnimations.forEach((anim) => anim.kill());
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      });
    });

    // Cleanup on unmount
    return () => {
      cancelled = true;
      cancelIdle(idleId as unknown as number);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  // Returns null - this component only handles side effects
  return null;
};
