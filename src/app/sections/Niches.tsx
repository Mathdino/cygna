import { useRef } from "react";
import { Brush, Crown, Droplet, Eye, Flower2, Gem, Hand, Scissors, Smile, Sparkles, type LucideIcon } from "lucide-react";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION } from "../lib/gsap";

const ROW_A: [LucideIcon, string][] = [
  [Sparkles, "Clínicas de estética"],
  [Scissors, "Salões de beleza"],
  [Eye, "Lash designers"],
  [Hand, "Nail designers"],
  [Smile, "Design de sobrancelhas"],
];
const ROW_B: [LucideIcon, string][] = [
  [Gem, "Micropigmentação"],
  [Flower2, "Spas & massagem"],
  [Brush, "Maquiadoras"],
  [Droplet, "Depilação"],
  [Crown, "Barbearias"],
];

function Row({ items, className }: { items: [LucideIcon, string][]; className: string }) {
  // Items are rendered four times (two per half) so an xPercent: -50 loop is seamless on wide screens.
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className={`${className} flex w-max gap-3 will-change-transform sm:gap-4`}>
      {doubled.map(([Icon, label], i) => (
        <span
          key={i}
          aria-hidden={i >= items.length}
          className="inline-flex shrink-0 items-center gap-3 rounded-full border border-tinta/10 bg-white px-5 py-3 text-[15px] text-tinta/90 shadow-sm sm:px-6 sm:py-4 sm:text-[17px]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose text-iris">
            <Icon className="h-4 w-4" />
          </span>
          {label}
        </span>
      ))}
    </div>
  );
}

export default function Niches() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        // force3D keeps each row on its own GPU layer, so the loop only composites instead of repainting 40 pills.
        const loop = { duration: 40, ease: "none", repeat: -1, force3D: true, paused: true };
        const a = gsap.to(".row-a", { xPercent: -50, ...loop });
        const b = gsap.fromTo(".row-b", { xPercent: -50 }, { xPercent: 0, ...loop });
        // Park the playheads far from zero so a negative timeScale never hits the start.
        [a, b].forEach((t) => t.totalTime(t.duration() * 200));

        // Scroll velocity only moves a target; one ticker callback eases the real speed toward it (no tween per scroll frame).
        let speed = 1;
        let target = 1;
        let dir = 1;
        let lastScroll = 0;
        const tick = () => {
          if (performance.now() - lastScroll > 200) target = dir;
          const base = Math.abs(target) > Math.abs(speed) ? 0.25 : 0.05;
          speed += (target - speed) * (1 - Math.pow(1 - base, gsap.ticker.deltaRatio()));
          a.timeScale(speed);
          b.timeScale(speed);
        };

        // Only run while the section is on screen.
        const toggle = (on: boolean) => {
          [a, b].forEach((t) => (on ? t.play() : t.pause()));
          on ? gsap.ticker.add(tick) : gsap.ticker.remove(tick);
        };

        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => toggle(self.isActive),
          onUpdate: (self) => {
            dir = self.direction;
            target = dir * (1 + Math.min(Math.abs(self.getVelocity()) / 250, 6));
            lastScroll = performance.now();
          },
        });

        SplitText.create(".niches-title", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              autoAlpha: 0,
              y: 20,
              rotate: 4,
              stagger: 0.05,
              duration: 0.6,
              ease: "back.out(2)",
              scrollTrigger: { trigger: self.elements[0], start: "top 85%" },
            }),
        });

        return () => gsap.ticker.remove(tick);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="overflow-hidden py-16 sm:py-24" aria-label="Para quem a Cygna foi feita">
      <p className="niches-title mx-auto mb-8 max-w-2xl px-4 text-center text-[15px] text-tinta/70 sm:mb-10 sm:text-[17px]">
        Feito para quem vive de beleza — do studio de uma pessoa só à clínica com várias salas
      </p>
      <div className="flex flex-col gap-3 sm:gap-4">
        <Row items={ROW_A} className="row-a" />
        <Row items={ROW_B} className="row-b" />
      </div>
    </section>
  );
}
