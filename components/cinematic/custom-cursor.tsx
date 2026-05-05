// Enables client-side rendering
"use client";

// Imports Framer Motion hooks for cursor animation
import { motion, useMotionValue, useSpring } from "framer-motion";
// Imports React hooks
import { useEffect, useRef, useState } from "react";

// Custom cursor component - themed cursor that follows mouse
export const CustomCursor = () => {
  // State for cursor enabled (fine pointer)
  const [enabled, setEnabled] = useState(false);
  // State for interactive element hover
  const [interactive, setInteractive] = useState(false);
  // State for cursor label text
  const [label, setLabel] = useState("");
  // Refs for state that needs to be accessed in listeners
  const interactiveRef = useRef(false);
  const labelRef = useRef("");
  // Motion values for cursor position
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Spring animation for smooth cursor movement
  const smoothX = useSpring(x, { damping: 38, stiffness: 780, mass: 0.14 });
  const smoothY = useSpring(y, { damping: 38, stiffness: 780, mass: 0.14 });

  useEffect(() => {
    // Checks if user can scroll down
    const canScrollDown = () =>
      window.scrollY + window.innerHeight <
      document.documentElement.scrollHeight - 10;

    // Resolves cursor label based on hovered element
    const resolveLabel = (target: Element | null) => {
      if (!target) {
        return canScrollDown() ? "Scroll" : "";
      }

      // Check for explicit label attribute
      const explicitLabel = target.getAttribute("data-cursor-label");
      if (explicitLabel) {
        return explicitLabel;
      }

      // Check for cursor type attribute
      const cursorType = target.getAttribute("data-cursor");
      if (cursorType === "project") {
        return "View Project";
      }
      if (cursorType === "details") {
        return "View Details";
      }

       // Check for anchor links
       if (target instanceof HTMLAnchorElement) {
         const href = target.getAttribute("href") ?? "";
         if (href === "#top") {
           return "Back to Top";
         }
         if (href.startsWith("#")) {
           return "Scroll";
         }
         return "Open Link";
       }

      // Check for buttons
      if (
        target instanceof HTMLButtonElement ||
        target.getAttribute("role") === "button"
      ) {
        return "View Details";
      }

      return canScrollDown() ? "Scroll" : "";
    };

    // Checks for fine pointer device
    const query = window.matchMedia("(pointer: fine)");
    const update = () => {
      setEnabled(query.matches);
      document.body.classList.toggle("themed-cursor", query.matches);
      document.documentElement.classList.toggle("themed-cursor", query.matches);
    };
    update();
    query.addEventListener("change", update);

     // Mouse move handler - updates cursor position with bounds checking
     const move = (event: MouseEvent) => {
       // Bounds checking - hide cursor if outside viewport
       const isOutsideX = event.clientX < 0 || event.clientX > window.innerWidth;
       const isOutsideY = event.clientY < 0 || event.clientY > window.innerHeight;
       
       if (isOutsideX || isOutsideY) {
         x.set(-100);
         y.set(-100);
         return;
       }
       
       x.set(event.clientX);
       y.set(event.clientY);
      const target = event.target;
      // Finds closest interactive element
      const hot =
        target instanceof Element
          ? target.closest(
              '[data-cursor-label],[data-cursor],a,button,[role="button"],input,textarea,select,label',
            )
          : null;
      const nextInteractive = Boolean(hot);
      if (nextInteractive !== interactiveRef.current) {
        interactiveRef.current = nextInteractive;
        setInteractive(nextInteractive);
      }

      // Updates label
      const nextLabel = resolveLabel(hot);
      if (nextLabel !== labelRef.current) {
        labelRef.current = nextLabel;
        setLabel(nextLabel);
      }
    };

    // Updates scroll hint label on scroll
    const updateScrollHint = () => {
      setLabel((current) => {
        if (current !== "Scroll" && current !== "") {
          return current;
        }
        const next = canScrollDown() ? "Scroll" : "";
        labelRef.current = next;
        return next;
      });
    };

     // Mouse leave handler - hides cursor when mouse leaves window
     const leave = (event: MouseEvent) => {
       // Only hide cursor if mouse actually left the window
       if (
         event.relatedTarget === null ||
         !(event.relatedTarget instanceof Node) ||
         !document.body.contains(event.relatedTarget as Node)
       ) {
         x.set(-100);
         y.set(-100);
         setInteractive(false);
         interactiveRef.current = false;
         setLabel("");
         labelRef.current = "";
       }
     };

    // Event listeners
       window.addEventListener("mousemove", move);
       window.addEventListener("scroll", updateScrollHint, { passive: true });
       window.addEventListener("resize", updateScrollHint);
       document.addEventListener("mouseout", leave);
       updateScrollHint();

    // Cleanup
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", updateScrollHint);
      window.removeEventListener("resize", updateScrollHint);
      document.removeEventListener("mouseout", leave);
      document.body.classList.remove("themed-cursor");
      document.documentElement.classList.remove("themed-cursor");
    };
  }, [x, y]);

  // Returns null if cursor disabled
  if (!enabled) {
    return null;
  }

  return (
    <>
      {/* Cursor dot with glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#39ff14]/70 bg-[#8fff7a] md:block"
        animate={{
          width: interactive ? 13 : 11,
          height: interactive ? 13 : 11,
          opacity: 0.95,
          boxShadow: interactive
            ? "0 0 22px rgba(57,255,20,0.62)"
            : "0 0 14px rgba(57,255,20,0.44)",
          scale: 1,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        style={{ x: smoothX, y: smoothY }}
      />
      {/* Cursor label */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[81] hidden md:block"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          animate={{ opacity: label ? 1 : 0, y: label ? 0 : -2 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        >
          <span className="ml-5 mt-4 inline-block whitespace-nowrap align-sub text-[14px] uppercase tracking-[0.08em] text-[#dfffe3] [font-family:var(--font-ndot57)]">
            {label}
          </span>
        </motion.div>
      </motion.div>
    </>
  );
};
