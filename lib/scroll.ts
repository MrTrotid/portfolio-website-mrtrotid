// Single smooth-scroll helper shared by all anchor navigation. Routes through
// the active Lenis instance when present so native scrollIntoView smooth
// scrolling never fights the Lenis wheel hijack; falls back to native smooth
// scroll when Lenis is disabled (reduced motion) or not yet initialized.
export const scrollToSelector = (selector: string) => {
  const section = document.querySelector(selector);
  if (!section) {
    return;
  }

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(section as HTMLElement, { offset: 0, duration: 1.2 });
    return;
  }

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
