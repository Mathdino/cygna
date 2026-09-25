import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

type GaugeProps = {
  value: number;
  color?: string;
  showLabels?: boolean;
  min?: string;
  max?: string;
  /** Delay before the first fill-in (seconds). */
  introDelay?: number;
};

const TICKS = 40;
const CX = 100;
const CY = 100;
const R = 80;
const INACTIVE = "#DAD5EC";

/**
 * Tick-arc gauge. After mount GSAP owns the tick colors and the label, so value
 * changes glide between states instead of snapping.
 */
export default function Gauge({ value, color = "#4A3F8F", showLabels = false, min, max, introDelay = 0.9 }: GaugeProps) {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<SVGTextElement>(null);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const painted = useRef(value);
  const target = useRef(value);
  const tint = useRef(color);
  const introDone = useRef(false);
  const glide = useRef<gsap.core.Tween | null>(null);
  const initial = useRef(value).current;
  target.current = value;
  tint.current = color;

  const paint = (v: number) => {
    painted.current = v;
    const n = Math.round((v / 100) * TICKS);
    lines.current.forEach((l, i) => l?.setAttribute("stroke", i < n ? tint.current : INACTIVE));
    if (label.current) label.current.textContent = `${Math.round(v)}%`;
  };

  // Intro fill from zero; always lands on the latest value
  useGSAP(() => {
    if (prefersReducedMotion()) {
      introDone.current = true;
      paint(target.current);
      return;
    }
    introDone.current = false;
    const s = { p: 0 };
    paint(0);
    gsap.to(s, {
      p: 1,
      duration: 1.4,
      delay: introDelay,
      ease: "power2.out",
      onUpdate: () => paint(target.current * s.p),
      onComplete: () => {
        introDone.current = true;
      },
    });
  }, []);

  // Live updates. Previous glides are killed (not reverted) so nothing snaps back.
  useGSAP(
    () => {
      if (!introDone.current) return;
      glide.current?.kill();
      if (prefersReducedMotion()) {
        paint(value);
        return;
      }
      const s = { v: painted.current };
      glide.current = gsap.to(s, { v: value, duration: 0.9, ease: "power3.inOut", onUpdate: () => paint(s.v) });
      if (label.current) {
        gsap.fromTo(label.current, { scale: 1.12, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
      }
    },
    { scope: root, dependencies: [value, color] }
  );

  const ticks = Array.from({ length: TICKS }, (_, i) => {
    const angle = Math.PI + (i / (TICKS - 1)) * Math.PI;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return (
      <line
        key={i}
        ref={(el) => {
          lines.current[i] = el;
        }}
        x1={CX + (R - 10) * cos}
        y1={CY + (R - 10) * sin}
        x2={CX + R * cos}
        y2={CY + R * sin}
        // Initial paint only; GSAP updates the attribute afterwards
        stroke={i < Math.round((initial / 100) * TICKS) ? color : INACTIVE}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    );
  });

  return (
    <div ref={root} className="mx-auto w-full" style={{ maxWidth: 260 }}>
      <svg viewBox="0 0 200 120" className="w-full" role="img" aria-label={`${value}%`}>
        {ticks}
        <text ref={label} x={100} y={105} textAnchor="middle" fontSize={22} fontWeight={600} fill="#1E1B2E">
          {initial}%
        </text>
      </svg>
      {showLabels && (
        <div className="-mt-1 flex justify-between px-1 text-[11px] text-tinta/60">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
