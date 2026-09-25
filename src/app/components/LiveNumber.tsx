import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

type LiveNumberProps = {
  value: number;
  format?: (v: number) => string;
  className?: string;
  /** Intro count starts at value × introFrom (0 = from zero). */
  introFrom?: number;
  introDuration?: number;
  introDelay?: number;
};

const defaultFormat = (v: number) => Math.round(v).toLocaleString("pt-BR");

/**
 * Number that counts in on mount and glides to each new value afterwards.
 * GSAP writes the text node (React renders no children), so tweens and
 * re-renders never fight over it.
 */
export default function LiveNumber({
  value,
  format = defaultFormat,
  className = "",
  introFrom = 0,
  introDuration = 1.6,
  introDelay = 0,
}: LiveNumberProps) {
  const el = useRef<HTMLSpanElement>(null);
  const painted = useRef(value);
  const target = useRef(value);
  const introDone = useRef(false);
  const glide = useRef<gsap.core.Tween | null>(null);
  target.current = value;

  const write = (v: number) => {
    painted.current = v;
    if (el.current) el.current.textContent = format(v);
  };

  // Intro: always lands on the latest value, even if it changes mid-count
  useGSAP(() => {
    if (prefersReducedMotion()) {
      introDone.current = true;
      write(target.current);
      return;
    }
    introDone.current = false;
    const start = target.current * introFrom;
    const s = { p: 0 };
    write(start);
    gsap.to(s, {
      p: 1,
      duration: introDuration,
      delay: introDelay,
      ease: "power2.out",
      onUpdate: () => write(start + (target.current - start) * s.p),
      onComplete: () => {
        introDone.current = true;
      },
    });
  }, []);

  // Live updates after the intro. Previous glides are killed (not reverted) so nothing snaps back.
  useGSAP(
    () => {
      if (!introDone.current) return;
      glide.current?.kill();
      if (prefersReducedMotion()) {
        write(value);
        return;
      }
      const s = { v: painted.current };
      glide.current = gsap.to(s, { v: value, duration: 0.8, ease: "power3.out", onUpdate: () => write(s.v) });
      gsap.fromTo(el.current, { y: -3, scale: 1.06 }, { y: 0, scale: 1, duration: 0.5, ease: "back.out(3)" });
    },
    { dependencies: [value] }
  );

  return <span ref={el} className={`inline-block tabular-nums ${className}`} />;
}
