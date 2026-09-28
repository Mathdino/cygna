import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, Draggable, useGSAP, DESKTOP_MOTION, MOBILE_MOTION } from "../lib/gsap";

/*
 * Feature chips gliding along a straight, endless track. Scroll velocity speeds
 * it up, hovering slows it down, and the track can be grabbed and thrown sideways.
 * Chips rise into place when the strip first comes into view.
 * Hovering (or focusing / tapping) a chip lifts it and opens it in place to show a
 * one-line benefit; its neighbours slide aside to make room.
 * Without motion it falls back to a plain wrapped list (duplicates hidden).
 */
const COPIES = 3;
const GAP = 16;
const IRIS = "#4A3F8F";

export type WaveItem = { icon: ReactNode; label: string; text: string };

export default function WaveMarquee({ items }: { items: WaveItem[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const el = root.current!;
        el.classList.add("is-live");
        const chips = gsap.utils.toArray<HTMLElement>(".wave-chip", el);
        const setX = chips.map((c) => gsap.quickSetter(c, "x", "px"));
        const setY = chips.map((c) => gsap.quickSetter(c, "y", "px"));
        const setS = chips.map((c) => gsap.quickSetter(c, "scale"));
        const setO = chips.map((c) => gsap.quickSetter(c, "opacity"));

        // Animated per-chip state read by the ticker: how open it is and how far it has risen in.
        const open = chips.map(() => ({ v: 0, w: 0, h: 0 }));
        const entered = chips.map(() => ({ v: 0 }));
        const xNow = chips.map(() => 0);

        // Closed and open sizes of each chip. The button gets explicit px sizes so it can tween between them.
        let closed: { w: number; h: number }[] = [];
        let opened: { w: number; h: number }[] = [];
        let total = 0;
        let maxW = 0;
        const measure = () => {
          closed = [];
          opened = [];
          chips.forEach((chip) => {
            const btn = chip.querySelector<HTMLElement>(".chip-btn")!;
            const desc = chip.querySelector<HTMLElement>(".chip-desc")!;
            gsap.set(btn, { width: "auto", height: "auto" });
            desc.style.display = "none";
            closed.push({ w: btn.offsetWidth, h: btn.offsetHeight });
            desc.style.display = "";
            opened.push({ w: Math.max(btn.offsetWidth, closed[closed.length - 1].w), h: btn.offsetHeight });
          });
          chips.forEach((chip, i) => {
            const o = open[i];
            o.w = (opened[i].w - closed[i].w) * o.v;
            o.h = (opened[i].h - closed[i].h) * o.v;
            gsap.set(chip.querySelector(".chip-btn"), { width: closed[i].w + o.w, height: closed[i].h + o.h });
          });
          total = closed.reduce((sum, c) => sum + c.w + GAP, 0);
          maxW = Math.max(...opened.map((c) => c.w));
        };
        measure();

        const flow = { speed: 70 };
        let boost = 0;
        let offset = 0;
        let running = false;

        const tick = (_time: number, deltaMs: number) => {
          if (!running) return;
          const dt = Math.min(deltaMs, 50) / 1000;
          offset += (flow.speed + boost) * dt;
          boost *= 0.92;
          const base = el.clientHeight * 0.5;
          const span = total + open.reduce((sum, o) => sum + o.w, 0);
          const wrap = gsap.utils.wrap(-maxW - GAP, span - maxW - GAP);

          let acc = 0;
          chips.forEach((_, i) => {
            const w = closed[i].w + open[i].w;
            const h = closed[i].h + open[i].h;
            const x = wrap(acc - offset);
            const lift = open[i].v;
            const e = entered[i].v;
            xNow[i] = x;
            setX[i](x);
            // Chips stay centred on the track; open ones lift a little, entering ones rise from below.
            setY[i](base - h / 2 - lift * 6 + (1 - e) * 40);
            setS[i](1 + lift * 0.04);
            setO[i](gsap.utils.clamp(0, 1, e * 1.6));
            acc += w + GAP;
          });
        };
        gsap.ticker.add(tick);

        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            running = self.isActive;
          },
          onUpdate: (self) => {
            boost = Math.min(700, Math.abs(self.getVelocity()) * 0.3);
          },
        });

        // Rise-in, left to right across what is on screen
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            const W = el.clientWidth || 1;
            gsap.to(entered, {
              v: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              stagger: (i) => gsap.utils.clamp(0, 1, xNow[i] / W) * 0.6,
            });
          },
        });

        // Open / close a chip in place
        const toggles = chips.map((chip, i) => {
          const btn = chip.querySelector<HTMLElement>(".chip-btn")!;
          const icon = chip.querySelector<HTMLElement>(".chip-icon")!;
          const glyph = icon.firstElementChild;
          const words = chip.querySelectorAll(".chip-word");
          let isOpen = false;
          return (want: boolean) => {
            if (want === isOpen) return;
            isOpen = want;
            btn.setAttribute("aria-expanded", String(want));
            gsap.set(chip, { zIndex: want ? 5 : 1 });
            const o = open[i];
            const dw = opened[i].w - closed[i].w;
            const dh = opened[i].h - closed[i].h;
            gsap.to(o, {
              v: want ? 1 : 0,
              duration: want ? 0.55 : 0.4,
              ease: want ? "back.out(1.4)" : "power3.inOut",
              overwrite: true,
              onUpdate: () => {
                o.w = dw * o.v;
                o.h = dh * o.v;
                btn.style.width = `${closed[i].w + o.w}px`;
                btn.style.height = `${closed[i].h + o.h}px`;
              },
            });
            gsap.to(btn, {
              borderColor: want ? "rgba(74,63,143,0.35)" : "rgba(30,27,46,0.1)",
              boxShadow: want ? "0 22px 40px -18px rgba(74,63,143,0.55)" : "0 10px 24px -14px rgba(30,27,46,0.35)",
              duration: 0.4,
              overwrite: "auto",
            });
            gsap.to(icon, { backgroundColor: want ? IRIS : "#E7E3F5", color: want ? "#fff" : IRIS, duration: 0.3, overwrite: "auto" });
            if (want) {
              gsap.fromTo(glyph, { rotation: -25, scale: 0.6 }, { rotation: 0, scale: 1, duration: 0.6, ease: "elastic.out(1.1, 0.45)", overwrite: true });
              gsap.fromTo(words, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, stagger: 0.025, duration: 0.35, delay: 0.12, ease: "power2.out", overwrite: true });
            } else {
              gsap.to(words, { autoAlpha: 0, duration: 0.15, overwrite: true });
            }
          };
        });
        chips.forEach((chip) => gsap.set(chip.querySelectorAll(".chip-word"), { autoAlpha: 0 }));

        // Mouse opens on hover; touch opens on tap (one at a time); keyboard opens on focus.
        const closeAll = (except?: number) => toggles.forEach((t, k) => k !== except && t(false));
        const listeners = chips.map((chip, i) => {
          const btn = chip.querySelector<HTMLElement>(".chip-btn")!;
          let tapped = false;
          const enter = (e: PointerEvent) => e.pointerType !== "touch" && toggles[i](true);
          const leave = (e: PointerEvent) => e.pointerType !== "touch" && toggles[i](false);
          const down = (e: PointerEvent) => {
            tapped = e.pointerType === "touch";
          };
          const click = () => {
            if (!tapped) return;
            const wasOpen = btn.getAttribute("aria-expanded") === "true";
            closeAll(i);
            toggles[i](!wasOpen);
          };
          const focus = () => btn.matches(":focus-visible") && toggles[i](true);
          const blur = () => toggles[i](false);
          chip.addEventListener("pointerenter", enter);
          chip.addEventListener("pointerleave", leave);
          btn.addEventListener("pointerdown", down);
          btn.addEventListener("click", click);
          btn.addEventListener("focus", focus);
          btn.addEventListener("blur", blur);
          return () => {
            chip.removeEventListener("pointerenter", enter);
            chip.removeEventListener("pointerleave", leave);
            btn.removeEventListener("pointerdown", down);
            btn.removeEventListener("click", click);
            btn.removeEventListener("focus", focus);
            btn.removeEventListener("blur", blur);
          };
        });

        // Grab the track and throw it; the proxy's x only feeds the shared offset.
        const proxy = document.createElement("div");
        let lastX = 0;
        const follow = function (this: Draggable) {
          offset -= this.x - lastX;
          lastX = this.x;
        };
        const [drag] = Draggable.create(proxy, {
          type: "x",
          trigger: el,
          inertia: true,
          dragClickables: true,
          minimumMovement: 6,
          cursor: "grab",
          activeCursor: "grabbing",
          onPress() {
            lastX = this.x;
          },
          onDragStart: () => closeAll(),
          onDrag: follow,
          onThrowUpdate: follow,
        });

        const calm = () => gsap.to(flow, { speed: 10, duration: 0.6, ease: "power2.out" });
        const resume = () => gsap.to(flow, { speed: 70, duration: 0.9, ease: "power2.inOut" });
        el.addEventListener("pointerenter", calm);
        el.addEventListener("pointerleave", resume);
        el.addEventListener("focusin", calm);
        el.addEventListener("focusout", resume);
        window.addEventListener("resize", measure);
        document.fonts?.ready.then(measure);

        return () => {
          gsap.ticker.remove(tick);
          drag.kill();
          listeners.forEach((fn) => fn());
          el.removeEventListener("pointerenter", calm);
          el.removeEventListener("pointerleave", resume);
          el.removeEventListener("focusin", calm);
          el.removeEventListener("focusout", resume);
          window.removeEventListener("resize", measure);
          el.classList.remove("is-live");
          gsap.set(chips, { clearProps: "transform,opacity,zIndex" });
          gsap.set(gsap.utils.toArray(".chip-btn, .chip-icon, .chip-word, .chip-icon > *", el), { clearProps: "all" });
        };
      });

      // Phones: the straight track never fitted, so the chips are a snap carousel instead.
      // Whichever card sits in the middle of the screen opens itself; the others stay closed.
      mm.add(MOBILE_MOTION, () => {
        const el = root.current!;
        el.classList.add("is-carousel");
        const list = el.querySelector<HTMLElement>(".wave-list")!;
        const chips = gsap.utils.toArray<HTMLElement>(".wave-chip:not(.wave-dup)", el);

        let frame = 0;
        let current = 0;
        const sync = () => {
          frame = 0;
          const mid = list.scrollLeft + list.clientWidth / 2;
          let best = 0;
          let bestGap = Infinity;
          chips.forEach((chip, i) => {
            const gap = Math.abs(chip.offsetLeft + chip.offsetWidth / 2 - mid);
            if (gap < bestGap) {
              bestGap = gap;
              best = i;
            }
          });
          current = best;
          chips.forEach((chip, i) => {
            const isOpen = i === best;
            chip.classList.toggle("is-open", isOpen);
            chip.querySelector(".chip-btn")!.setAttribute("aria-expanded", String(isOpen));
          });
        };
        const queue = () => {
          if (!frame) frame = requestAnimationFrame(sync);
        };
        list.addEventListener("scroll", queue, { passive: true });
        window.addEventListener("resize", queue);
        document.fonts?.ready.then(queue);
        sync();

        const centre = (chip: HTMLElement) =>
          list.scrollTo({ left: chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });

        // Runs on its own: one card every STEP_MS, bouncing back at the ends instead of
        // sweeping all the way home. Sleeps while the strip is off screen or the tab is
        // in the background, and stands down for HOLD_MS whenever the visitor takes over.
        const STEP_MS = 3000;
        const HOLD_MS = 6000;
        let direction = 1;
        let onScreen = false;
        let heldUntil = 0;
        const step = () => {
          if (!onScreen || document.hidden || Date.now() < heldUntil) return;
          if (current >= chips.length - 1) direction = -1;
          else if (current <= 0) direction = 1;
          const next = gsap.utils.clamp(0, chips.length - 1, current + direction);
          if (next === current) return;
          current = next;
          centre(chips[next]);
        };
        const timer = window.setInterval(step, STEP_MS);

        const hold = () => {
          heldUntil = Date.now() + HOLD_MS;
        };
        list.addEventListener("pointerdown", hold);
        list.addEventListener("touchstart", hold, { passive: true });
        list.addEventListener("wheel", hold, { passive: true });

        const watcher = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting), { threshold: 0.35 });
        watcher.observe(el);

        // Tapping a card brings it to the middle, which is what opens it.
        const taps = chips.map((chip) => {
          const btn = chip.querySelector<HTMLElement>(".chip-btn")!;
          const onTap = () => {
            hold();
            centre(chip);
          };
          btn.addEventListener("click", onTap);
          btn.addEventListener("focus", onTap);
          return () => {
            btn.removeEventListener("click", onTap);
            btn.removeEventListener("focus", onTap);
          };
        });

        return () => {
          if (frame) cancelAnimationFrame(frame);
          clearInterval(timer);
          watcher.disconnect();
          list.removeEventListener("scroll", queue);
          list.removeEventListener("pointerdown", hold);
          list.removeEventListener("touchstart", hold);
          list.removeEventListener("wheel", hold);
          window.removeEventListener("resize", queue);
          taps.forEach((fn) => fn());
          chips.forEach((chip) => {
            chip.classList.remove("is-open");
            chip.querySelector(".chip-btn")!.setAttribute("aria-expanded", "false");
          });
          el.classList.remove("is-carousel");
        };
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="wave-marquee mt-10" aria-label="Mais recursos">
      <ul className="wave-list flex flex-wrap justify-center gap-2 sm:gap-3">
        {Array.from({ length: COPIES }, (_, copy) =>
          items.map(({ icon, label, text }) => (
            <li key={`${copy}-${label}`} aria-hidden={copy > 0 || undefined} className={`wave-chip ${copy > 0 ? "wave-dup" : ""}`}>
              <button
                type="button"
                tabIndex={copy > 0 ? -1 : undefined}
                aria-expanded={false}
                className="chip-btn flex flex-col items-start overflow-hidden rounded-[22px] border border-tinta/10 bg-white py-2 pl-2 pr-4 text-left text-[13px] text-tinta/85 shadow-[0_10px_24px_-14px_rgba(30,27,46,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <span className="chip-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-nevoa text-iris">{icon}</span>
                  <span className="font-medium">{label}</span>
                </span>
                <span className="chip-desc block w-[230px] pb-1 pl-9 pt-1 text-[12px] leading-snug text-tinta/65">
                  {text.split(" ").map((word, k) => (
                    <span key={k} className="chip-word inline-block">
                      {word}&nbsp;
                    </span>
                  ))}
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
