import { useRef } from "react";
import { BadgeCheck, CalendarPlus, Check, MessageCircle, QrCode, Star } from "lucide-react";
import { gsap, useGSAP, MOTION } from "../lib/gsap";
import StrokeTitle from "../components/StrokeTitle";
import GradientText from "../components/GradientText";

const AGENDA = [
  { time: "09:00", name: "Renata S.", service: "Limpeza de pele", color: "#4A3F8F" },
  { time: "10:30", name: "Patrícia M.", service: "Coloração + escova", color: "#FF7A59" },
  { time: "13:00", name: "Ana Luiza", service: "Volume brasileiro", color: "#2E8B6E" },
  { time: "14:30", name: "Beatriz C.", service: "Alongamento em gel", color: "#8C82C7" },
  { time: "16:00", name: "Larissa P.", service: "Design + henna", color: "#E3A72F" },
  { time: "17:30", name: "Fernanda O.", service: "Pé e mão", color: "#E7A9A1" },
];

const TOASTS = [
  { icon: CalendarPlus, title: "Nova reserva", text: "Beatriz · Gel · Sex 14:30" },
  { icon: QrCode, title: "Pix recebido", text: "R$ 50,00 de sinal" },
  { icon: BadgeCheck, title: "Confirmado", text: "Ana respondeu no WhatsApp" },
];

const POINTS = [
  "Veja o dia, a semana e cada profissional",
  "Encaixe, remarque e bloqueie horários com um toque",
  "Receba avisos de cada nova reserva e pagamento",
];

export default function AppShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        // Phone settles from a tilted 3D pose as the section scrolls in
        gsap.fromTo(
          ".phone",
          { rotateX: 28, rotateZ: -6, scale: 0.86, y: 80, transformPerspective: 1200 },
          {
            rotateX: 0,
            rotateZ: 0,
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: 1 },
          }
        );

        // Agenda rows arrive one by one like push notifications (drop in + buzz), hold, then the day refills
        const rows = gsap.utils.toArray<HTMLElement>(".agenda-row");
        const agenda = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.6,
          scrollTrigger: { trigger: ".phone", start: "top 70%", end: "bottom top", toggleActions: "play pause resume pause" },
        });
        rows.forEach((row, i) => {
          const at = i * 0.45;
          agenda
            .fromTo(
              row,
              { autoAlpha: 0, y: -24, scale: 0.94 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.8)" },
              at
            )
            .to(row, { x: 2, duration: 0.05, repeat: 3, yoyo: true, ease: "sine.inOut" }, at + 0.5);
        });
        agenda.to(rows, { autoAlpha: 0, y: 12, duration: 0.35, stagger: 0.05, ease: "power2.in" }, "+=3");

        // Notifications cycle inside the phone while it is on screen
        const toasts = gsap.utils.toArray<HTMLElement>(".toast");
        const loop = gsap.timeline({
          repeat: -1,
          scrollTrigger: { trigger: ".phone", start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" },
        });
        toasts.forEach((t) => {
          loop
            .fromTo(t, { autoAlpha: 0, y: -28, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" })
            .to(t, { autoAlpha: 0, y: -12, duration: 0.35, ease: "power2.in" }, "+=1.8");
        });

        gsap.from(".showcase-copy > *", {
          autoAlpha: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".showcase-copy", start: "top 80%" },
        });

        gsap.from(".float-chip", {
          autoAlpha: 0,
          scale: 0.6,
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out(2.5)",
          scrollTrigger: { trigger: ".phone", start: "top 60%" },
        });
        // Gentle idle bob on the chips (on an inner wrapper so it doesn't fight the parallax)
        gsap.to(".float-bob", {
          y: "random(-10, 10)",
          rotate: "random(-3, 3)",
          duration: "random(2, 3.5)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="overflow-hidden px-3 sm:px-4 py-10">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div className="showcase-copy px-5">
          <GradientText className="text-[14px] font-semibold tracking-wide">
            No celular
          </GradientText>
          <StrokeTitle
            className="mt-5 t-display"
          >
            Seu negócio inteiro <span className="accent-italic">na palma da mão</span>
          </StrokeTitle>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-tinta/70">
            Entre um atendimento e outro, abra o app e veja tudo: quem vem, quem pagou, quem confirmou.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-iris text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex justify-center py-6">
          {/* Floating chips — data-speed drives ScrollSmoother parallax */}
          <div data-speed="1.15" className="absolute left-0 top-10 z-10 hidden sm:block lg:-left-6">
            <div className="float-chip">
              <div className="float-bob flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg">
                <Star className="h-4 w-4 fill-iris text-iris" />
                <span className="text-[13px] font-medium">4,9 de avaliação</span>
              </div>
            </div>
          </div>
          <div data-speed="0.85" className="absolute bottom-16 right-0 z-10 hidden sm:block lg:-right-4">
            <div className="float-chip">
              <div className="float-bob flex items-center gap-2 rounded-2xl bg-tinta px-4 py-3 text-white shadow-lg">
                <MessageCircle className="h-4 w-4 text-[#25d366]" />
                <span className="text-[13px]">32 lembretes enviados hoje</span>
              </div>
            </div>
          </div>
          <div data-speed="1.3" className="absolute bottom-4 left-4 z-10 hidden md:block">
            <div className="float-chip">
              <div className="float-bob rounded-2xl bg-rose px-4 py-3 shadow-lg">
                <span className="block text-[11px] text-tinta/70">Faturamento hoje</span>
                <span className="block text-[18px] font-semibold">R$ 1.280</span>
              </div>
            </div>
          </div>

          <div className="phone relative w-[290px] rounded-[46px] bg-tinta p-3 shadow-2xl sm:w-[310px]">
            <div className="relative h-[600px] overflow-hidden rounded-[36px] bg-nevoa">
              <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-tinta" />

              <div className="absolute inset-x-3 top-11 z-10 h-[64px]">
                {TOASTS.map((t, i) => (
                  <div
                    key={t.title}
                    className={`toast absolute inset-0 flex items-center gap-3 rounded-2xl bg-white/95 px-3 shadow-md backdrop-blur ${
                      i > 0 ? "invisible opacity-0" : ""
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-iris text-white">
                      <t.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12px] font-semibold">{t.title}</span>
                      <span className="block truncate text-[12px] text-tinta/60">{t.text}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="px-4 pt-32">
                <div className="flex items-baseline justify-between">
                  <span className="text-[20px] font-semibold tracking-tight">Hoje</span>
                  <span className="text-[12px] text-tinta/60">Sexta, 26 set</span>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {AGENDA.map((a) => (
                    <li key={a.time} className="agenda-row flex items-center gap-3 rounded-2xl bg-white p-2.5">
                      <span className="w-11 text-[12px] font-semibold text-tinta/80">{a.time}</span>
                      <span className="h-8 w-1 rounded-full" style={{ background: a.color }} />
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium">{a.service}</span>
                        <span className="block text-[11px] text-tinta/60">{a.name}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
