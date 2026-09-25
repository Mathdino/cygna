import { memo, useCallback, useRef, useState, type ReactNode } from "react";
import { CalendarDays, Check, ChevronDown, Clock, MousePointer2, TrendingUp, X } from "lucide-react";
import Gauge from "./Gauge";
import LiveNumber from "./LiveNumber";
import { gsap, ScrollTrigger, useGSAP, MOTION, prefersReducedMotion } from "../lib/gsap";

const IRIS = "#4A3F8F";
const SUCCESS = "#2E8B6E";
const WARNING = "#E3A72F";

const brl = (v: number) => `R$ ${Math.round(v).toLocaleString("pt-BR")}`;

/* ── Small animated building blocks ───────────────────────────────────── */

/** Two-option switch with a sliding pill. Controlled so the demo can flip it on its own. */
function Toggle({ options, active, onChange }: { options: [string, string]; active: 0 | 1; onChange: (i: 0 | 1) => void }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".toggle-ind", {
        xPercent: active * 100,
        duration: prefersReducedMotion() ? 0 : 0.45,
        ease: "power3.inOut",
      });
    },
    { scope: root, dependencies: [active] }
  );
  return (
    <div ref={root} className="relative mt-4 flex rounded-full bg-nevoa/70 p-1" role="tablist">
      <span className="toggle-ind absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm" />
      {options.map((opt, i) => (
        <button
          key={opt}
          type="button"
          role="tab"
          aria-selected={active === i}
          onClick={() => onChange(i as 0 | 1)}
          className={`relative z-10 flex-1 rounded-full px-3 py-1.5 font-sans text-[12px] transition-colors duration-300 ${
            active === i ? "font-medium text-tinta" : "text-tinta/60"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/** Re-plays a small pop whenever `k` changes (skips the first render). */
function Pop({ k, children, className = "" }: { k: string | number; children: ReactNode; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (prefersReducedMotion()) return;
      gsap.fromTo(el.current, { scale: 0.8, autoAlpha: 0.4 }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: "back.out(2.5)" });
    },
    { dependencies: [k] }
  );
  return (
    <span ref={el} className={`inline-flex ${className}`}>
      {children}
    </span>
  );
}

function CardHeader({ title, period }: { title: string; period: string }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <Pop k={title} className="font-medium text-iris">
        {title}
      </Pop>
      <span className="text-tinta/60">{period}</span>
    </div>
  );
}

/**
 * Count-in settings for a card's big number: the first mount counts from zero after
 * the hero intro; once the mode has switched, remounts roll in quickly from ~85%.
 */
function useCountIn(mode: 0 | 1, delay: number) {
  const initial = useRef(mode);
  const switched = useRef(false);
  if (mode !== initial.current) switched.current = true;
  return switched.current
    ? { introFrom: 0.85, introDuration: 0.7, introDelay: 0 }
    : { introFrom: 0, introDuration: 1.6, introDelay: delay };
}

/* ── Card 1: agendamentos / faturamento ───────────────────────────────── */

function BookingsCard({ bookings, mode, onMode, introDelay }: { bookings: number; mode: 0 | 1; onMode: (m: 0 | 1) => void; introDelay: number }) {
  const root = useRef<HTMLDivElement>(null);
  const prev = useRef(bookings);
  const countIn = useCountIn(mode, introDelay);

  // "+1" bubble every time a booking lands
  useGSAP(
    () => {
      if (bookings > prev.current && !prefersReducedMotion()) {
        gsap.fromTo(".plus-one", { y: 6, autoAlpha: 0 }, { y: -12, autoAlpha: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(".plus-one", { autoAlpha: 0, duration: 0.4, delay: 0.9 });
      }
      prev.current = bookings;
    },
    { scope: root, dependencies: [bookings] }
  );

  const lastMonth = 414;
  const revenue = 18450 + (bookings - 486) * 95;
  const occupancy = Math.min(99, 92 + Math.floor((bookings - 486) / 2));
  const revenueGoal = Math.min(99, Math.round((revenue / 24000) * 100));
  const growth = bookings - lastMonth;
  const pct = Math.round((growth / lastMonth) * 100);

  const big =
    mode === 0 ? (
      <LiveNumber key="b" value={bookings} {...countIn} />
    ) : (
      <LiveNumber key="r" value={revenue} format={brl} {...countIn} />
    );
  const pill = mode === 0 ? `+${growth} (${pct}%)` : `+${Math.round(((revenue - 15380) / 15380) * 100)}%`;

  return (
    <div ref={root} className="dash-card rounded-2xl bg-white p-5">
      <CardHeader title={mode === 0 ? "Agendamentos" : "Faturamento"} period="Este mês" />
      <div className="relative mt-3 flex items-center gap-2">
        <span className="relative whitespace-nowrap text-[28px] font-semibold leading-none text-tinta">
          {big}
          <span className="plus-one invisible absolute -right-6 -top-2 rounded-full bg-iris px-1.5 py-0.5 text-[11px] font-semibold text-white">
            +1
          </span>
        </span>
        <Pop k={pill} className="shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-success/10 px-2 py-0.5 text-[11px] text-success">
          <TrendingUp className="h-3 w-3" />
          {pill}
        </Pop>
      </div>
      <p className="mt-1 text-[12px] text-tinta/60">Comparado ao mês passado</p>
      <p className="mt-4 text-center text-[12px] text-tinta/80">
        <Pop k={mode}>{mode === 0 ? "Ocupação da agenda" : "Meta de faturamento"}</Pop>
      </p>
      <div className="mt-2">
        <Gauge
          value={mode === 0 ? occupancy : revenueGoal}
          showLabels
          min={mode === 0 ? `${Math.round((320 * occupancy) / 100)}h` : `R$ ${(revenue / 1000).toFixed(1).replace(".", ",")}k`}
          max={mode === 0 ? "320h" : "R$ 24k"}
          introDelay={introDelay}
        />
      </div>
      <Toggle options={["Ocupação", "Faturamento"]} active={mode} onChange={onMode} />
    </div>
  );
}

/* ── Card 2: formulário que se preenche sozinho ───────────────────────── */

const CLIENTS = [
  { service: "Volume brasileiro (cílios)", pro: "Camila Rocha", date: "26/09", time: "14:30", name: "Ana" },
  { service: "Alongamento em gel", pro: "Bianca Lima", date: "26/09", time: "16:00", name: "Beatriz" },
  { service: "Limpeza de pele profunda", pro: "Dra. Renata", date: "27/09", time: "09:30", name: "Carla" },
  { service: "Design de sobrancelha + henna", pro: "Camila Rocha", date: "27/09", time: "11:00", name: "Júlia" },
  { service: "Pé e mão + esmaltação", pro: "Bianca Lima", date: "27/09", time: "15:30", name: "Fernanda" },
];

function Select({ label, value, field }: { label: string; value: string; field: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] text-tinta/80">{label}</span>
      <div className={`f-box f-${field} flex items-center justify-between overflow-hidden rounded-lg border border-tinta/10 px-3 py-2 text-[13px] text-tinta`}>
        <span className="f-val block truncate">{value}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-tinta/60" />
      </div>
    </div>
  );
}

function Field({ label, value, icon, field }: { label: string; value: string; icon: ReactNode; field: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] text-tinta/80">{label}</span>
      <div className={`f-box f-${field} flex items-center gap-2 rounded-lg border border-tinta/10 px-3 py-2 text-[13px]`}>
        <span className="text-tinta/40">{icon}</span>
        <span className="f-val tabular-nums text-tinta">{value}</span>
      </div>
    </div>
  );
}

const BookingFormCard = memo(function BookingFormCard({ onBooked }: { onBooked: () => void }) {
  const card = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const root = card.current!;
        const q = gsap.utils.selector(root);
        const cursor = q(".f-cursor")[0];
        const toast = q(".f-toast")[0];
        const at = (el: Element) => {
          const r = el.getBoundingClientRect();
          const c = root.getBoundingClientRect();
          return { x: r.left - c.left + r.width * 0.72, y: r.top - c.top + r.height * 0.55 };
        };

        let running = false;
        let current: gsap.core.Timeline | null = null;
        let index = 1;

        const cycle = contextSafe!(() => {
          const c = CLIENTS[index % CLIENTS.length];
          index++;
          const tl = gsap.timeline({ onComplete: () => (running ? cycle() : (current = null)) });
          current = tl;

          const click = (box: Element) => {
            tl.to(cursor, { x: () => at(box).x, y: () => at(box).y, duration: 0.65, ease: "power2.inOut" })
              .to(cursor, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1 })
              .to(box, { borderColor: IRIS, boxShadow: "0 0 0 3px rgba(74,63,143,0.15)", duration: 0.15 }, "<");
          };
          const release = (box: Element) =>
            tl.to(box, { borderColor: "rgba(30,27,46,0.1)", boxShadow: "0 0 0 0px rgba(74,63,143,0)", duration: 0.3 });

          tl.to(cursor, { autoAlpha: 1, duration: 0.25 });
          // Dropdowns: old value slides up, new one slides in
          for (const [field, text] of [["service", c.service], ["pro", c.pro]] as const) {
            const box = q(`.f-${field}`)[0];
            const val = box.querySelector(".f-val")!;
            click(box);
            tl.to(val, { yPercent: -110, autoAlpha: 0, duration: 0.2, ease: "power2.in" })
              .call(() => {
                val.textContent = text;
              })
              .fromTo(val, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false });
            release(box);
          }
          // Date and time: digits roll into place
          for (const [field, text] of [["date", c.date], ["time", c.time]] as const) {
            const box = q(`.f-${field}`)[0];
            click(box);
            tl.to(box.querySelector(".f-val"), { duration: 0.6, scrambleText: { text, chars: "0123456789", speed: 0.8 } });
            release(box);
          }
          // Submit
          const submit = q(".f-submit")[0];
          tl.to(cursor, { x: () => at(submit).x, y: () => at(submit).y, duration: 0.6, ease: "power2.inOut" })
            .to(cursor, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1 })
            .to(submit, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 }, "<")
            .call(() => {
              q(".f-toast-name")[0].textContent = c.name;
              onBooked();
            })
            .fromTo(toast, { autoAlpha: 0, y: 18, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false })
            .from(q(".f-toast-check"), { scale: 0, rotate: -90, duration: 0.4, ease: "back.out(3)" }, "<0.1")
            .to(cursor, { autoAlpha: 0, duration: 0.3 }, "<")
            .to(toast, { autoAlpha: 0, y: -8, duration: 0.3 }, "+=1.8")
            .to({}, { duration: 0.8 });
        });

        gsap.set(cursor, { x: () => root.clientWidth * 0.6, y: () => root.clientHeight + 20 });

        // Only run while the dashboard is on screen; start after the intro settles
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            running = self.isActive;
            if (running) {
              if (current) current.resume();
              else gsap.delayedCall(2.4, () => running && !current && cycle());
            } else current?.pause();
          },
        });
      });
    },
    { scope: card }
  );

  const c = CLIENTS[0];
  return (
    <div ref={card} className="dash-card relative flex flex-col gap-3 overflow-hidden rounded-2xl bg-white p-5">
      <Select label="Serviço" value={c.service} field="service" />
      <Select label="Profissional" value={c.pro} field="pro" />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Data" value={c.date} field="date" icon={<CalendarDays className="h-3.5 w-3.5" />} />
        <Field label="Horário" value={c.time} field="time" icon={<Clock className="h-3.5 w-3.5" />} />
      </div>
      <div className="mt-1 flex items-center gap-4">
        <button type="button" className="f-submit rounded-lg px-5 py-2 text-[13px] font-medium text-white" style={{ backgroundColor: IRIS }}>
          Agendar
        </button>
        <button type="button" className="text-[13px] text-tinta/80 underline underline-offset-2">
          Cancelar
        </button>
        <button type="button" aria-label="Fechar" className="ml-auto text-tinta/60 hover:text-tinta">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="f-toast invisible absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-xl bg-tinta px-4 py-3 text-white shadow-lg">
        <span className="f-toast-check flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success">
          <Check className="h-4 w-4" />
        </span>
        <span className="text-[12px] leading-tight">
          <strong className="block text-[13px]">
            Agendado para <span className="f-toast-name">Ana</span>
          </strong>
          Lembrete programado no WhatsApp
        </span>
      </div>

      <MousePointer2
        className="f-cursor pointer-events-none invisible absolute left-0 top-0 z-20 h-5 w-5 fill-tinta text-white drop-shadow"
        aria-hidden="true"
      />
    </div>
  );
});

/* ── Card 3: faltas evitadas / remarcações ────────────────────────────── */

const FEED = [
  "Ana confirmou · agora",
  "Lembrete enviado para Júlia",
  "Beatriz remarcou para sex, 16h",
  "Carla confirmou · há 1 min",
  "Fernanda confirmou · há 2 min",
];

function FeedTicker() {
  const root = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const line = root.current!.querySelector(".feed-line")!;
        let i = 0;
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.8, delay: 2, scrollTrigger: { trigger: root.current, toggleActions: "play pause resume pause" } })
          .to(line, { yPercent: -100, autoAlpha: 0, duration: 0.3, ease: "power2.in" })
          .call(() => {
            i = (i + 1) % FEED.length;
            line.textContent = FEED[i];
          })
          .fromTo(line, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out" });
      });
    },
    { scope: root }
  );
  return (
    <p ref={root} className="mt-2 flex h-5 items-center gap-2 overflow-hidden text-[12px] text-tinta/80">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
        <span className="relative h-2 w-2 rounded-full bg-success" />
      </span>
      <span className="feed-line block truncate">{FEED[0]}</span>
    </p>
  );
}

function NoShowCard({ saved, mode, onMode, introDelay }: { saved: number; mode: 0 | 1; onMode: (m: 0 | 1) => void; introDelay: number }) {
  const rescheduled = 9 + Math.floor((saved - 38) / 3);
  const confirmRate = Math.min(94, 68 + (saved - 38));
  const rescheduleRate = Math.min(40, 14 + Math.floor((saved - 38) / 3));
  const pill = mode === 0 ? `+${saved - 26}` : `+${rescheduled - 7}`;
  const countIn = useCountIn(mode, introDelay);

  return (
    <div className="dash-card rounded-2xl bg-white p-5">
      <CardHeader title={mode === 0 ? "Faltas evitadas" : "Remarcações"} period="30 dias" />
      <div className="mt-3 flex items-center gap-2">
        <span className="whitespace-nowrap text-[28px] font-semibold leading-none text-tinta">
          {mode === 0 ? <LiveNumber key="s" value={saved} {...countIn} /> : <LiveNumber key="r" value={rescheduled} {...countIn} />}
        </span>
        <Pop k={pill} className="items-center gap-1 rounded-full bg-nevoa/70 px-2 py-0.5 text-[11px] text-tinta/70">
          <TrendingUp className="h-3 w-3" />
          {pill}
        </Pop>
      </div>
      <p className="mt-1 text-[12px] text-tinta/60">
        {mode === 0 ? "Lembretes confirmados no WhatsApp" : "Remarcados pela própria cliente"}
      </p>
      <FeedTicker />
      <div className="mt-3">
        <Gauge value={mode === 0 ? confirmRate : rescheduleRate} color={mode === 0 ? SUCCESS : WARNING} introDelay={introDelay} />
      </div>
      <Toggle options={["Confirmados", "Remarcados"]} active={mode} onChange={onMode} />
    </div>
  );
}

/* ── Orchestration ────────────────────────────────────────────────────── */

export default function DashboardPreview() {
  const root = useRef<HTMLDivElement>(null);
  const [bookings, setBookings] = useState(486);
  const [saved, setSaved] = useState(38);
  const [bookMode, setBookMode] = useState<0 | 1>(0);
  const [showMode, setShowMode] = useState<0 | 1>(0);
  const introDelay = 1;

  const onBooked = useCallback(() => {
    setBookings((b) => b + 1);
  }, []);

  // Ambient life: modes flip on their own and no-shows avoided tick up, only while on screen
  useGSAP(
    (_ctx, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        let running = false;
        const every = (seconds: number, fn: () => void) => {
          const loop = contextSafe!(() => {
            if (running) fn();
            gsap.delayedCall(seconds, loop);
          });
          gsap.delayedCall(seconds, loop);
        };
        every(8, () => setBookMode((m) => (m === 0 ? 1 : 0)));
        every(9.5, () => setShowMode((m) => (m === 0 ? 1 : 0)));
        every(5.5, () => setSaved((s) => s + 1));
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            running = self.isActive;
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="dash-outer px-3 sm:px-4">
      <div className="dash-tray mx-auto w-full max-w-[960px] rounded-3xl border border-white/70 bg-nevoa/90 p-2 shadow-[0_40px_80px_-30px_rgba(30,27,46,0.35)] backdrop-blur-md sm:p-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          <BookingsCard bookings={bookings} mode={bookMode} onMode={setBookMode} introDelay={introDelay} />
          <BookingFormCard onBooked={onBooked} />
          <NoShowCard saved={saved} mode={showMode} onMode={setShowMode} introDelay={introDelay} />
        </div>
      </div>
    </div>
  );
}
