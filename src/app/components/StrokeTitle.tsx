import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION } from "../lib/gsap";

/*
 * Section title that draws itself: each letter's outline is traced, then the fill
 * wipes in line by line (after React Bits' StrokeText, reworked for multi-line
 * titles with mixed fonts).
 *
 * The real heading stays in the DOM and keeps wrapping responsively; its text is
 * only made transparent while an SVG copy — every word placed exactly where the
 * browser laid it out — plays on top. When the draw finishes the HTML text shows
 * again and the SVG fades away, so after that the title is plain text.
 * The heading's own nodes are never touched (measuring uses Ranges), so other
 * animations that hold references into it keep working. Anything marked
 * `data-stroke-skip` is left out of the drawing and stays visible.
 */
const SVG_NS = "http://www.w3.org/2000/svg";
let uid = 0;

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  strokeColor?: string;
  strokeWidth?: number;
  /** Seconds to trace one letter */
  drawDuration?: number;
  /** Extra wait before a line's fill starts wiping in */
  fillDelay?: number;
  /** Seconds between letters */
  stagger?: number;
  ease?: string;
  /** ScrollTrigger start */
  start?: string;
};

type Word = { chars: string[]; x: number; y: number; right: number; top: number; bottom: number; style: CSSStyleDeclaration; index: number };
type Line = { words: Word[]; left: number; right: number; top: number; bottom: number; first: number; last: number };

/** Every visible word of the heading, positioned relative to it, in reading order. */
function measureWords(el: HTMLElement): Word[] {
  const box = el.getBoundingClientRect();
  const ctx = document.createElement("canvas").getContext("2d")!;
  const range = document.createRange();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.parentElement?.closest("[data-stroke-skip], svg") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  const words: Word[] = [];
  let index = 0;

  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    const style = getComputedStyle(node.parentElement!);
    // A text range's box spans the font's ascent + descent, so the baseline sits `descent` above its bottom.
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const descent = ctx.measureText("Hg").fontBoundingBoxDescent;
    const text = node.data;
    let word: Word | null = null;

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (/\s/.test(ch)) {
        word = null;
        continue;
      }
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const r = Array.from(range.getClientRects()).find((rect) => rect.width > 0);
      if (!r) {
        word = null;
        continue;
      }
      const y = r.bottom - descent - box.top;
      if (!word || Math.abs(word.y - y) > 2) {
        word = { chars: [], x: r.left - box.left, y, right: 0, top: r.top - box.top, bottom: r.bottom - box.top, style, index };
        words.push(word);
      }
      word.chars.push(ch);
      word.right = r.right - box.left;
      index++;
    }
  }
  return words;
}

function groupLines(words: Word[]): Line[] {
  const lines: Line[] = [];
  for (const w of words) {
    let line = lines.find((l) => Math.abs(l.words[0].y - w.y) < 4);
    if (!line) {
      line = { words: [], left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity, first: Infinity, last: -Infinity };
      lines.push(line);
    }
    line.words.push(w);
    line.left = Math.min(line.left, w.x);
    line.right = Math.max(line.right, w.right);
    line.top = Math.min(line.top, w.top);
    line.bottom = Math.max(line.bottom, w.bottom);
    line.first = Math.min(line.first, w.index);
    line.last = Math.max(line.last, w.index + w.chars.length - 1);
  }
  return lines;
}

function svgText(w: Word, attrs: Record<string, string>) {
  const text = document.createElementNS(SVG_NS, "text");
  text.setAttribute("x", String(w.x));
  text.setAttribute("y", String(w.y));
  for (const [k, v] of Object.entries(attrs)) text.setAttribute(k, v);
  const s = text.style;
  s.fontFamily = w.style.fontFamily;
  s.fontSize = w.style.fontSize;
  s.fontWeight = w.style.fontWeight;
  s.fontStyle = w.style.fontStyle;
  s.letterSpacing = w.style.letterSpacing;
  s.fontKerning = w.style.fontKerning;
  return text;
}

export default function StrokeTitle({
  as: Tag = "h2",
  className = "",
  children,
  strokeColor = "#4A3F8F",
  strokeWidth = 1.2,
  drawDuration = 1.3,
  fillDelay = 0.05,
  stagger = 0.028,
  ease = "power2.out",
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const el = ref.current!;
        let svg: SVGSVGElement | null = null;
        let tl: gsap.core.Timeline | null = null;
        let cancelled = false;
        const reveal = () => el.classList.remove("stroke-title-pending");
        el.classList.add("stroke-title-pending");

        const play = () => {
          const words = measureWords(el);
          if (!words.length) return reveal();
          const lines = groupLines(words);
          const box = el.getBoundingClientRect();
          const fontSize = Math.max(...words.map((w) => parseFloat(w.style.fontSize)));
          const dash = fontSize * 8;
          const pad = fontSize * 0.2;
          if (getComputedStyle(el).position === "static") el.style.position = "relative";

          svg = document.createElementNS(SVG_NS, "svg");
          svg.setAttribute("aria-hidden", "true");
          svg.setAttribute("class", "stroke-title-svg");
          svg.setAttribute("width", String(box.width));
          svg.setAttribute("height", String(box.height));
          svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
          const defs = document.createElementNS(SVG_NS, "defs");
          const fills = document.createElementNS(SVG_NS, "g");
          const strokes = document.createElementNS(SVG_NS, "g");
          svg.append(defs, fills, strokes);

          const wipes = lines.map((line) => {
            const id = `stroke-title-${++uid}`;
            const clip = document.createElementNS(SVG_NS, "clipPath");
            clip.id = id;
            const rect = document.createElementNS(SVG_NS, "rect");
            rect.setAttribute("x", String(line.left - pad));
            rect.setAttribute("y", String(line.top - pad));
            rect.setAttribute("width", "0");
            rect.setAttribute("height", String(line.bottom - line.top + pad * 2));
            clip.append(rect);
            defs.append(clip);
            const group = document.createElementNS(SVG_NS, "g");
            group.setAttribute("clip-path", `url(#${id})`);
            for (const w of line.words) {
              const text = svgText(w, { fill: w.style.color });
              text.textContent = w.chars.join("");
              group.append(text);
            }
            fills.append(group);
            return { rect, width: line.right - line.left + pad * 2, line };
          });

          const chars: SVGTSpanElement[] = [];
          for (const w of words) {
            const text = svgText(w, {
              fill: "none",
              stroke: strokeColor,
              "stroke-width": String(strokeWidth),
              "stroke-linejoin": "round",
              "stroke-linecap": "round",
            });
            for (const ch of w.chars) {
              const tspan = document.createElementNS(SVG_NS, "tspan");
              tspan.textContent = ch;
              text.append(tspan);
              chars.push(tspan);
            }
            strokes.append(text);
          }
          el.append(svg);

          gsap.set(chars, { attr: { "stroke-dasharray": dash, "stroke-dashoffset": dash } });
          tl = gsap.timeline({
            onComplete: () => {
              svg?.remove();
              svg = null;
            },
          });
          tl.to(chars, { attr: { "stroke-dashoffset": 0 }, duration: drawDuration, ease, stagger }, 0);
          // Each line's fill follows its own letters being traced
          for (const { rect, width, line } of wipes) {
            tl.to(
              rect,
              { attr: { width }, duration: (line.last - line.first) * stagger + 0.45, ease: "power1.inOut" },
              line.first * stagger + drawDuration * 0.5 + fillDelay
            );
          }
          // Hand back to the real text (identical under the fill), then let the outline fade off
          tl.add(reveal);
          tl.to(svg, { autoAlpha: 0, duration: 0.4, ease: "power1.out" });
        };

        const trigger = ScrollTrigger.create({
          trigger: el,
          start,
          once: true,
          onEnter: () => {
            // Measure only once the fonts are in, or the words would land where the fallback font put them
            document.fonts.ready.then(() => {
              if (!cancelled) play();
            });
          },
        });

        return () => {
          cancelled = true;
          trigger.kill();
          tl?.kill();
          svg?.remove();
          reveal();
        };
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
