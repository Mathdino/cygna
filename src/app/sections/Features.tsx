import { useRef, type ReactNode } from "react";
import {
  BarChart3,
  Bell,
  CalendarCheck,
  Cake,
  ClipboardList,
  CreditCard,
  Gift,
  Package,
  Store,
  Wallet,
  FileText,
  Link2,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, MOTION, FINE_POINTER, countUp } from "../lib/gsap";
import WaveMarquee, { type WaveItem } from "../components/WaveMarquee";
import StrokeTitle from "../components/StrokeTitle";
import GradientText from "../components/GradientText";

function Bento({ className = "", icon, title, text, children }: { className?: string; icon: ReactNode; title: string; text: string; children: ReactNode }) {
  return (
    <article
      className={`bento group relative overflow-hidden rounded-3xl border border-tinta/10 bg-white p-6 sm:p-7 ${className}`}
    >
      {/* Pointer spotlight; --mx/--my are set by GSAP on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(74,63,143,0.10), transparent 60%)" }}
      />
      <div className="relative">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose text-iris">{icon}</span>
        <h3 className="mt-4 text-[20px] font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 max-w-md text-[14px] leading-relaxed text-tinta/70">{text}</p>
      </div>
      <div className="relative mt-6">{children}</div>
    </article>
  );
}

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const BOOKED: Record<string, string> = {
  "0-0": "Manicure",
  "0-2": "Cílios",
  "1-1": "Limpeza de pele",
  "1-3": "Escova",
  "2-0": "Sobrancelha",
  "2-2": "Gel",
  "2-3": "Cílios",
  "3-1": "Drenagem",
  "3-2": "Pé e mão",
  "4-0": "Coloração",
  "4-1": "Cílios",
  "4-3": "Nail art",
  "5-0": "Maquiagem",
  "5-1": "Escova",
  "5-2": "Cílios",
  "5-3": "Unhas",
};

function AgendaMock() {
  return (
    <div className="relative grid grid-cols-6 gap-1.5 [perspective:600px] sm:gap-2">
      <span className="agenda-now pointer-events-none invisible absolute inset-x-0 z-10" aria-hidden="true"> 
      </span>
      {DAYS.map((d, di) => (
        <div key={d} className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-center text-[11px] text-tinta/60">{d}</span>
          {[0, 1, 2, 3].map((s) => {
            const label = BOOKED[`${di}-${s}`];
            return (
              <div key={s} className="relative h-10 rounded-lg bg-nevoa/70 sm:h-12">
                {label && (
                  <span className="slot absolute inset-0 flex items-center justify-center rounded-lg bg-iris px-1 text-center text-[9px] font-medium leading-tight text-white sm:text-[11px]">
                    {label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ChatMock() {
  return (
    <div className="chat flex h-[168px] flex-col justify-end gap-2 rounded-2xl bg-[#efe7dc] p-3">
      <div className="bubble max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[12px] shadow-sm">
        Oi, Ana! Lembrando do seu horário amanhã às 14h — Volume brasileiro.
      </div>
      <div className="bubble flex gap-2 self-start">
        <span className="rounded-full bg-white px-3 py-1 text-[12px] font-medium text-success shadow-sm">Confirmar</span>
        <span className="rounded-full bg-white px-3 py-1 text-[12px] text-tinta/70 shadow-sm">Remarcar</span>
      </div>
      <div className="bubble max-w-[70%] self-end rounded-2xl rounded-br-sm bg-[#d9fdd3] px-3 py-2 text-[12px] shadow-sm">
        Confirmado! Até amanhã
      </div>
    </div>
  );
}

const CHECKS = ["Alergias e sensibilidades", "Uso de ácidos nos últimos 30 dias", "Assinatura da cliente", "Fotos de antes e depois"];

function AnamneseMock() {
  return (
    <ul className="flex flex-col gap-2.5">
      {CHECKS.map((c) => (
        <li key={c} className="check-row flex items-center gap-3 rounded-xl border border-tinta/5 bg-perola px-3 py-2.5 text-[13px]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="#4A3F8F" />
            <path className="check-path" d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {c}
        </li>
      ))}
    </ul>
  );
}

const BARS = [42, 58, 50, 72, 64, 88, 96];

function FinanceMock() {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="finance-total text-[28px] font-semibold tracking-tight" data-count="18450" data-prefix="R$ ">
          R$ 18.450
        </span>
        <span className="text-[12px] text-success">+22% no mês</span>
      </div>
      <div className="mt-4 flex h-28 items-end gap-2">
        {BARS.map((h, i) => (
          <div
            key={i}
            className="bar flex-1 origin-bottom rounded-t-md"
            style={{ height: `${h}%`, background: i === BARS.length - 1 ? "#4A3F8F" : "#F3D6D2" }}
          />
        ))}
      </div>
    </div>
  );
}

function LoyaltyMock() {
  return (
    <div className="rounded-2xl bg-tinta p-4 text-white">
      <div className="flex items-center justify-between text-[12px] text-white/70">
        <span>Cartão fidelidade · Juliana</span>
        <span>8/10</span>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className={`flex aspect-square items-center justify-center rounded-full ${
              i < 8 ? "stamp bg-rose text-iris" : "border border-dashed border-white/30"
            }`}
          >
            {i < 8 && <Gift className="h-3.5 w-3.5" />}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-white/70">Faltam 2 para ganhar uma manutenção grátis</p>
    </div>
  );
}

const EXTRAS: WaveItem[] = [
  { icon: <Link2 className="h-4 w-4" />, label: "Link na bio do Instagram", text: "A cliente vê seus horários livres e agenda direto do perfil." },
  { icon: <CreditCard className="h-4 w-4" />, label: "Sinal via Pix", text: "O horário só fica reservado depois que o sinal é pago." },
  { icon: <Package className="h-4 w-4" />, label: "Estoque de produtos", text: "Baixa a cada atendimento e avisa antes de um produto acabar." },
  { icon: <Cake className="h-4 w-4" />, label: "Aniversariantes do mês", text: "Parabéns com cupom pelo WhatsApp, no dia certo." },
  { icon: <Store className="h-4 w-4" />, label: "Várias unidades", text: "Agenda e caixa de cada unidade, e o total de todas juntas." },
  { icon: <BarChart3 className="h-4 w-4" />, label: "Relatórios por serviço", text: "Veja quais serviços e profissionais mais faturam no mês." },
  { icon: <FileText className="h-4 w-4" />, label: "Contratos e termos", text: "Termos assinados no celular e guardados na ficha da cliente." },
  { icon: <Wallet className="h-4 w-4" />, label: "Controle de caixa", text: "Entradas, saídas e saldo do dia atualizados a cada atendimento." },
];

export default function Features() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION, () => {
        // Cards enter in batches as they reach the viewport
        gsap.set(".bento", { autoAlpha: 0, y: 60 });
        ScrollTrigger.batch(".bento", {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", overwrite: true }),
        });

        const at = (selector: string) => ({ trigger: selector, start: "top 75%" });

        // Agenda: the week fills up, the "now" line sweeps, slots flip out and it books again — forever
        gsap
          .timeline({
            repeat: -1,
            repeatDelay: 0.4,
            repeatRefresh: true,
            scrollTrigger: { ...at(".bento-agenda"), toggleActions: "play pause resume pause" },
          })
          .fromTo(
            ".slot",
            { scale: 0, autoAlpha: 0, rotationX: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(2.2)", stagger: { each: 0.08, from: "random" } }
          )
          .fromTo(".agenda-now", { top: "0%", autoAlpha: 0 }, { top: "100%", autoAlpha: 1, duration: 2.4, ease: "none" }, "-=0.6")
          .to(".slot", { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, stagger: { each: 0.03, grid: "auto", from: "start" } }, "<0.2")
          .to(".agenda-now", { autoAlpha: 0, duration: 0.3 })
          .to(".slot", { rotationX: 90, autoAlpha: 0, duration: 0.3, ease: "power2.in", stagger: { each: 0.04, from: "random" } }, "+=1.2");

        // WhatsApp: conversation loops
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.2, scrollTrigger: { ...at(".bento-chat"), toggleActions: "play pause resume pause" } })
          .from(".bubble", { autoAlpha: 0, y: 14, scale: 0.9, transformOrigin: "left bottom", stagger: 0.8, duration: 0.4, ease: "back.out(2)" })
          .to(".bubble", { autoAlpha: 0, y: -10, stagger: 0.05, duration: 0.3 }, "+=2");

        // Anamnese: checkmarks draw in sequence
        gsap
          .timeline({ scrollTrigger: at(".bento-anamnese") })
          .from(".check-row", { autoAlpha: 0, x: -20, stagger: 0.15, duration: 0.4 })
          .from(".check-path", { drawSVG: 0, stagger: 0.15, duration: 0.35, ease: "power2.out" }, 0.2);

        // Financeiro: bars grow, total counts up
        gsap.from(".bar", { scaleY: 0, stagger: 0.07, duration: 0.7, ease: "power3.out", scrollTrigger: at(".bento-finance") });
        const total = document.querySelector<HTMLElement>(".finance-total");
        if (total) countUp(total, { scrollTrigger: at(".bento-finance") });

        // Fidelidade: stamps punch in
        gsap.from(".stamp", {
          scale: 0,
          rotate: -45,
          stagger: 0.08,
          duration: 0.45,
          ease: "back.out(3)",
          scrollTrigger: at(".bento-loyalty"),
        });

      });

      // 3D tilt + spotlight, only for real mouse pointers
      mm.add(FINE_POINTER, () => {
        const cleanups = gsap.utils.toArray<HTMLElement>(".bento").map((card) => {
          gsap.set(card, { transformPerspective: 900 });
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            ry((px - 0.5) * 8);
            rx((0.5 - py) * 8);
            card.style.setProperty("--mx", `${px * 100}%`);
            card.style.setProperty("--my", `${py * 100}%`);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          return () => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          };
        });
        return () => cleanups.forEach((fn) => fn());
      });
    },
    { scope: root }
  );

  return (
    <section id="recursos" ref={root} className="px-3 sm:px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-6xl text-center">
          <GradientText className="text-[14px] font-semibold tracking-wide">
            Recursos
          </GradientText>
          <StrokeTitle
            className="features-title mt-5 t-display"
          >
            Tudo que seu negócio de beleza precisa, <span className="accent-italic">em um só lugar</span>
          </StrokeTitle>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-6">
          <Bento
            className="bento-agenda md:col-span-2 lg:col-span-4"
            icon={<CalendarCheck className="h-5 w-5" />}
            title="Agenda online 24h"
            text="Suas clientes escolhem serviço, profissional e horário pelo link — até de madrugada. Sem conflito de horário, sem mensagem perdida."
          >
            <AgendaMock />
          </Bento>
          <Bento
            className="bento-chat lg:col-span-2"
            icon={<Bell className="h-5 w-5" />}
            title="Lembretes no WhatsApp"
            text="Confirmação com um toque, 24h antes. Faltas despencam."
          >
            <ChatMock />
          </Bento>
          <Bento
            className="bento-anamnese lg:col-span-2"
            icon={<ClipboardList className="h-5 w-5" />}
            title="Anamnese digital"
            text="Ficha, termo assinado no celular e fotos de evolução guardadas por cliente."
          >
            <AnamneseMock />
          </Bento>
          <Bento
            className="bento-finance lg:col-span-2"
            icon={<Wallet className="h-5 w-5" />}
            title="Financeiro e comissões"
            text="Caixa do dia, contas a pagar e comissão de cada profissional calculada sozinha."
          >
            <FinanceMock />
          </Bento>
          <Bento
            className="bento-loyalty md:col-span-2 lg:col-span-2"
            icon={<Gift className="h-5 w-5" />}
            title="Pacotes e fidelidade"
            text="Venda pacotes de sessões e premie quem volta. Saldo controlado automaticamente."
          >
            <LoyaltyMock />
          </Bento>
        </div>

        <WaveMarquee items={EXTRAS} />
      </div>
    </section>
  );
}
