import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  ScrambleTextPlugin,
  DrawSVGPlugin,
  Flip,
  Draggable,
  InertiaPlugin,
  MotionPathPlugin
);

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip, Draggable, useGSAP };

export const MOTION = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
export const MOBILE_MOTION = "(max-width: 767px) and (prefers-reduced-motion: no-preference)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Counts an element up to its `data-count` value. The final value is already
 * rendered in markup, so reduced-motion visitors (who never call this) see it as-is.
 */
export function countUp(el: HTMLElement, vars: gsap.TweenVars = {}) {
  const end = parseFloat(el.dataset.count ?? "0");
  const decimals = Number(el.dataset.decimals ?? 0);
  const prefix = el.dataset.prefix ?? "";
  const suffix = el.dataset.suffix ?? "";
  const format = (v: number) =>
    prefix +
    v.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
    suffix;
  const state = { v: 0 };
  el.textContent = format(0);
  return gsap.to(state, {
    v: end,
    duration: 1.6,
    ease: "power2.out",
    ...vars,
    onUpdate: () => {
      el.textContent = format(state.v);
    },
  });
}

if (import.meta.env.DEV && typeof window !== "undefined") {
  Object.assign(window, { gsap, ScrollTrigger, ScrollSmoother });
}
