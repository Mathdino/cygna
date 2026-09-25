import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, MOTION } from "../lib/gsap";

/*
 * Text filled with a slowly drifting gradient (after React Bits' GradientText,
 * driven by GSAP instead of motion). The gradient is 3x the text's width and its
 * position eases back and forth; the first colour is repeated at the end so a
 * non-yoyo loop is seamless. Without motion the gradient simply sits still.
 */
export const GRADIENT_LIGHT = ["#4A3F8F", "#A23B9E", "#C8472B"]; // Íris → magenta → coral, AA on Pérola/white
export const GRADIENT_DARK = ["#F3D6D2", "#FF7A59", "#E7E3F5"]; // Rosé → Bico → Névoa, for dark sections

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  colors?: string[];
  /** Seconds for one sweep */
  animationSpeed?: number;
  direction?: "horizontal" | "vertical" | "diagonal";
  pauseOnHover?: boolean;
  yoyo?: boolean;
};

export default function GradientText({
  as: Tag = "span",
  children,
  className = "",
  colors = GRADIENT_LIGHT,
  animationSpeed = 8,
  direction = "horizontal",
  pauseOnHover = false,
  yoyo = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const el = ref.current!;
        const axis = direction === "vertical" ? (p: number) => `50% ${p}%` : (p: number) => `${p}% 50%`;
        const state = { p: 0 };
        const tween = gsap.to(state, {
          p: 100,
          duration: animationSpeed,
          ease: yoyo ? "sine.inOut" : "none",
          repeat: -1,
          yoyo,
          onUpdate: () => {
            el.style.backgroundPosition = axis(state.p);
          },
        });
        if (!pauseOnHover) return;
        const pause = () => tween.pause();
        const play = () => tween.play();
        el.addEventListener("pointerenter", pause);
        el.addEventListener("pointerleave", play);
        return () => {
          el.removeEventListener("pointerenter", pause);
          el.removeEventListener("pointerleave", play);
        };
      });
    },
    { scope: ref, dependencies: [animationSpeed, direction, yoyo, pauseOnHover] }
  );

  const angle = direction === "horizontal" ? "to right" : direction === "vertical" ? "to bottom" : "to bottom right";
  const size = direction === "horizontal" ? "300% 100%" : direction === "vertical" ? "100% 300%" : "300% 300%";

  return (
    <Tag
      ref={ref}
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}, ${[...colors, colors[0]].join(", ")})`,
        backgroundSize: size,
        backgroundRepeat: "repeat",
        backgroundPosition: direction === "vertical" ? "50% 0%" : "0% 50%",
        WebkitBackgroundClip: "text",
      }}
    >
      {children}
    </Tag>
  );
}
