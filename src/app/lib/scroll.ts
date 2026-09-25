import { gsap, ScrollSmoother, prefersReducedMotion } from "./gsap";

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(el, true, "top top");
  } else if (prefersReducedMotion()) {
    el.scrollIntoView();
  } else {
    gsap.to(window, { duration: 1.1, ease: "power3.inOut", scrollTo: { y: el } });
  }
}
