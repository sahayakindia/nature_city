import Lenis from "lenis";

let instance = null;
export const getLenis = () => instance;

export function startLenis() {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  instance = lenis;
  /* the entrance gate may already be up when smooth scrolling starts: keep it stopped until the visitor enters */
  if (document.documentElement.classList.contains("is-gated")) lenis.stop();
  let raf;
  const loop = (time) => {
    lenis.raf(time);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    lenis.destroy();
    instance = null;
  };
}

export function scrollToTarget(target, opts = {}) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: -20, duration: 1.4, ...opts });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
export function scrollTop(immediate = true) {
  if (instance) instance.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
}
/* Several things can hold the page still (entrance gate, menu, enquiry pop-up, lightbox).
   Each holds its own lock, so one releasing never frees another. */
const owners = new Set();
export function lockScroll(lock, owner = "ui") {
  lock ? owners.add(owner) : owners.delete(owner);
  const locked = owners.size > 0;
  document.documentElement.classList.toggle("is-gated", locked);
  if (instance) locked ? instance.stop() : instance.start();
}
