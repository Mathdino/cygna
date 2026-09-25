import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

/*
 * Canvas grid of twinkling squares anchored to one edge and fading toward the
 * opposite one. In-house implementation that mirrors the public prop API and
 * defaults of React Bits' "Blinking Squares" (a Pro component we don't have a
 * license for), so it can be swapped for the official one later.
 *
 * Extension: `shape="swan"` lights up the cells that fall inside a swan
 * silhouette, which rises out of the grid on first paint.
 */
export type BlinkingSquaresProps = {
  /** Edge the grid is anchored to; it fades toward the opposite edge. */
  direction?: "right" | "left" | "top" | "bottom";
  /** Cells along the long axis (8–200). */
  gridSize?: number;
  /** Square fill per cell (0.05–0.98). */
  squareSize?: number;
  /** Position where squares start to appear (0–1, measured from the far edge). */
  fadeStart?: number;
  /** Position of full density (0–1). */
  fadeEnd?: number;
  /** Ramp curve sharpness (0.3–6). */
  falloff?: number;
  /** Minimum cell brightness (0–1). */
  minBrightness?: number;
  /** Twinkle cycles per second (0–4). */
  twinkleSpeed?: number;
  /** Twinkle oscillation strength (0–1). */
  twinkleStrength?: number;
  /** Master brightness (0–2). */
  intensity?: number;
  /** Master alpha (0–1). */
  opacity?: number;
  squareColor?: string;
  backgroundColor?: string;
  /** Device-pixel-ratio cap (1–3). */
  dpr?: number;
  /** Optional figure drawn with the squares. */
  shape?: "swan";
  /** Figure center, as fractions of the canvas width/height. */
  shapeX?: number;
  shapeY?: number;
  /** Figure size as a fraction of min(height, 60% of width). */
  shapeSize?: number;
  /** Several figures at once (overrides shapeX/shapeY/shapeSize). `flip` mirrors it horizontally. */
  figures?: { x: number; y: number; size: number; flip?: boolean }[];
  /** Fade in from both horizontal (or vertical) edges instead of one. */
  symmetric?: boolean;
  /** Brightness of the background grid when a figure is shown (0–1). */
  ambient?: number;
  className?: string;
};

type Cell = {
  x: number;
  y: number;
  ramp: number;
  base: number;
  phase: number;
  rate: number;
  strength: number;
  delay: number;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Swan facing left, drawn inside an s×s box at (ox, oy). */
function drawSwan(ctx: CanvasRenderingContext2D, ox: number, oy: number, s: number) {
  const P = (x: number, y: number): [number, number] => [ox + x * s, oy + y * s];
  ctx.save();
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Body resting on the water, with a raised wing and an upturned tail
  ctx.beginPath();
  ctx.moveTo(...P(0.3, 0.78));
  ctx.bezierCurveTo(...P(0.3, 0.95), ...P(0.8, 0.98), ...P(0.94, 0.8));
  ctx.bezierCurveTo(...P(0.99, 0.72), ...P(1.0, 0.6), ...P(0.96, 0.5));
  ctx.bezierCurveTo(...P(0.9, 0.58), ...P(0.86, 0.62), ...P(0.8, 0.6));
  ctx.bezierCurveTo(...P(0.72, 0.46), ...P(0.52, 0.44), ...P(0.44, 0.62));
  ctx.bezierCurveTo(...P(0.4, 0.7), ...P(0.34, 0.72), ...P(0.3, 0.78));
  ctx.fill();

  // S-shaped neck
  ctx.lineWidth = 0.085 * s;
  ctx.beginPath();
  ctx.moveTo(...P(0.34, 0.76));
  ctx.bezierCurveTo(...P(0.18, 0.62), ...P(0.44, 0.44), ...P(0.36, 0.26));
  ctx.bezierCurveTo(...P(0.32, 0.14), ...P(0.2, 0.1), ...P(0.17, 0.2));
  ctx.stroke();

  // Head and beak
  ctx.beginPath();
  ctx.arc(...P(0.19, 0.19), 0.06 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(...P(0.16, 0.15));
  ctx.lineTo(...P(0.03, 0.27));
  ctx.lineTo(...P(0.18, 0.24));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function BlinkingSquares({
  direction = "right",
  gridSize = 52,
  squareSize = 0.57,
  fadeStart = 0.65,
  fadeEnd = 1,
  falloff = 1.25,
  minBrightness = 0.55,
  twinkleSpeed = 1.4,
  twinkleStrength = 0.94,
  intensity = 1,
  opacity = 1,
  squareColor = "#BB29FF",
  backgroundColor = "#000000",
  dpr = 1.5,
  shape,
  shapeX = 0.8,
  shapeY = 0.4,
  shapeSize = 0.55,
  ambient = 0.45,
  figures,
  symmetric = false,
  className = "",
}: BlinkingSquaresProps) {
  const figuresKey = JSON.stringify(figures ?? null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    let cells: Cell[] = [];
    let square = 0;
    let visible = true;
    let start: number | null = reduced ? -Infinity : null;

    // Rasterise the figures at low resolution and return an alpha lookup
    const figureMask = (w: number, h: number) => {
      if (!shape) return null;
      const list = figures ?? [{ x: shapeX, y: shapeY, size: shapeSize, flip: false }];
      const scale = 0.5;
      const mw = Math.max(1, Math.round(w * scale));
      const mh = Math.max(1, Math.round(h * scale));
      const off = document.createElement("canvas");
      off.width = mw;
      off.height = mh;
      const octx = off.getContext("2d")!;
      const boxes = list.map((f) => {
        const size = f.size * Math.min(h, w * 0.6) * scale;
        const ox = f.x * mw - size / 2;
        const oy = f.y * mh - size / 2;
        octx.save();
        if (f.flip) {
          octx.translate(ox * 2 + size, 0);
          octx.scale(-1, 1);
        }
        drawSwan(octx, ox, oy, size);
        octx.restore();
        return { ox, oy, size };
      });
      const data = octx.getImageData(0, 0, mw, mh).data;
      return {
        inside: (x: number, y: number) => {
          const px = Math.min(mw - 1, Math.max(0, Math.round(x * scale)));
          const py = Math.min(mh - 1, Math.max(0, Math.round(y * scale)));
          return data[(py * mw + px) * 4 + 3] > 110;
        },
        // 0 at the figure's bottom, 1 at its top — used to make it rise from the water
        height: (x: number, y: number) => {
          const b = boxes.find((bx) => x * scale >= bx.ox && x * scale <= bx.ox + bx.size) ?? boxes[0];
          return clamp01((b.oy + b.size - y * scale) / b.size);
        },
      };
    };

    const layout = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, dpr);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * ratio));
      canvas.height = Math.max(1, Math.round(h * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const cell = Math.max(w, h) / gridSize;
      square = cell * squareSize;
      const inset = (cell - square) / 2;
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      const span = Math.max(0.0001, fadeEnd - fadeStart);
      const mask = figureMask(w, h);

      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // 0 at the far edge, 1 at the anchor edge
          const u = (c + 0.5) / cols;
          const v = (r + 0.5) / rows;
          const horizontal = direction === "right" || direction === "left";
          const t = symmetric
            ? Math.max(horizontal ? u : v, 1 - (horizontal ? u : v))
            : direction === "right"
              ? u
              : direction === "left"
                ? 1 - u
                : direction === "bottom"
                  ? v
                  : 1 - v;
          const edge = Math.pow(clamp01((t - fadeStart) / span), falloff);
          const cx = (c + 0.5) * cell;
          const cy = (r + 0.5) * cell;
          const inFigure = mask?.inside(cx, cy) ?? false;
          const ramp = inFigure ? 1 : mask ? edge * ambient : edge;
          if (ramp <= 0.001) continue;
          cells.push({
            x: c * cell + inset,
            y: r * cell + inset,
            ramp,
            base: inFigure ? 0.82 + 0.18 * Math.random() : minBrightness + (1 - minBrightness) * Math.random(),
            phase: Math.random() * Math.PI * 2,
            rate: 0.6 + Math.random() * 0.8, // desynchronise the twinkle
            strength: inFigure ? twinkleStrength * 0.35 : twinkleStrength,
            delay: inFigure ? 0.4 + mask!.height(cx, cy) * 1.4 + Math.random() * 0.25 : Math.random() * 1.2,
          });
        }
      }
    };

    const draw = (time: number) => {
      if (start === null) start = time;
      const elapsed = time - start;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.globalAlpha = 1;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = squareColor;
      const master = intensity * opacity;
      const omega = Math.PI * 2 * twinkleSpeed;
      for (const cell of cells) {
        const reveal = clamp01((elapsed - cell.delay) / 0.45);
        if (reveal <= 0) continue;
        const wave = 0.5 + 0.5 * Math.sin(time * omega * cell.rate + cell.phase);
        const twinkle = 1 - cell.strength * wave;
        const a = clamp01(cell.ramp * cell.base * twinkle * master * reveal);
        if (a < 0.01) continue;
        ctx.globalAlpha = a;
        ctx.fillRect(cell.x, cell.y, square, square);
      }
    };

    layout();
    draw(reduced ? 0 : gsap.ticker.time);

    const tick = (time: number) => {
      if (visible) draw(time);
    };
    if (!reduced) gsap.ticker.add(tick);

    const ro = new ResizeObserver(() => {
      layout();
      draw(gsap.ticker.time);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
    };
  }, [
    direction,
    gridSize,
    squareSize,
    fadeStart,
    fadeEnd,
    falloff,
    minBrightness,
    twinkleSpeed,
    twinkleStrength,
    intensity,
    opacity,
    squareColor,
    backgroundColor,
    dpr,
    shape,
    shapeX,
    shapeY,
    shapeSize,
    ambient,
    figuresKey,
    symmetric,
  ]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
