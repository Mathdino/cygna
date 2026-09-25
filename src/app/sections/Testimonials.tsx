import { useRef } from "react";
import { MoveHorizontal, Quote, Star } from "lucide-react";
import { gsap, Draggable, useGSAP, MOTION } from "../lib/gsap";
import StrokeTitle from "../components/StrokeTitle";
import GradientText from "../components/GradientText";

// Illustrative testimonials — swap for real customer quotes (with permission) before launch.
const QUOTES = [
  {
    name: "Juliana Martins",
    role: "Lash designer · Curitiba",
    text: "Eu passava a noite respondendo mensagem. Hoje a cliente marca pelo link e o lembrete sai sozinho. Minhas faltas quase zeraram.",
  },
  {
    name: "Studio Bella Nails",
    role: "Nail designers · Recife",
    text: "Com três meninas atendendo, a comissão era sempre briga. Agora cada uma vê o que tem a receber no fim do dia.",
  },
  {
    name: "Dra. Camila Duarte",
    role: "Clínica de estética · Belo Horizonte",
    text: "A anamnese digital com foto de evolução deixou a clínica muito mais profissional. As pacientes percebem.",
  },
  {
    name: "Rafaela Souza",
    role: "Designer de sobrancelhas · São Paulo",
    text: "O retoque de 30 dias já sai marcado. Parece bobeira, mas aumentou muito meu retorno.",
  },
  {
    name: "Salão Espaço Vivá",
    role: "Salão de beleza · Porto Alegre",
    text: "Trocamos agenda de papel, planilha e caderno de caixa por uma coisa só. A recepção agradece.",
  },
  {
    name: "Mariana Lopes",
    role: "Micropigmentadora · Goiânia",
    text: "O sinal via Pix mudou meu negócio. Quem paga o sinal aparece — simples assim.",
  },
];

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trackEl = track.current!;
      const cards = gsap.utils.toArray<HTMLElement>(".quote-card", trackEl);
      // Viewport has 24px side padding, so the usable width is clientWidth - 48.
      const minX = () => Math.min(0, viewport.current!.clientWidth - 48 - trackEl.scrollWidth);
      const bounds = () => ({ minX: minX(), maxX: 0 });
      const snapTo = (v: number) => {
        const points = [...cards.map((c) => cards[0].offsetLeft - c.offsetLeft), minX()];
        return gsap.utils.clamp(minX(), 0, gsap.utils.snap(points, v));
      };

      // Draggable works for everyone (it's user-driven), inertia gives it a natural throw.
      const [drag] = Draggable.create(trackEl, {
        type: "x",
        bounds: bounds(),
        inertia: true,
        edgeResistance: 0.85,
        dragClickables: true,
        cursor: "grab",
        activeCursor: "grabbing",
        snap: { x: snapTo },
        onPress() {
          gsap.to(".quote-card", { scale: 0.98, duration: 0.2 });
        },
        onRelease() {
          gsap.to(".quote-card", { scale: 1, duration: 0.3, ease: "back.out(2)" });
        },
      });

      const onResize = () => drag.applyBounds(bounds());
      window.addEventListener("resize", onResize);

      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from(".quote-card", {
          autoAlpha: 0,
          x: 120,
          rotate: 3,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: viewport.current, start: "top 80%" },
        });
        gsap.from(".testi-head > *", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.7,
          scrollTrigger: { trigger: ".testi-head", start: "top 85%" },
        });
        gsap.to(".drag-hint", { x: 8, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });

      return () => {
        window.removeEventListener("resize", onResize);
        drag.kill();
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} className="overflow-hidden py-20 sm:py-28">
      <div className="testi-head mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <GradientText className="text-[14px] font-semibold tracking-wide">
            Quem usa, indica
          </GradientText>
          <StrokeTitle
            className="mt-5 max-w-2xl t-display"
          >
            Profissionais que <span className="accent-italic">recuperaram</span> o próprio tempo
          </StrokeTitle>
        </div>
        <p className="flex items-center gap-2 text-[14px] text-tinta/60">
          <MoveHorizontal className="drag-hint h-4 w-4" /> Arraste para ver mais
        </p>
      </div>

      <div ref={viewport} className="mx-auto mt-12 max-w-6xl px-6">
        <div ref={track} className="flex w-max gap-4 sm:gap-5">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="quote-card flex w-[82vw] shrink-0 select-none flex-col rounded-3xl border border-tinta/10 bg-white p-7 sm:w-[380px]"
            >
              <Quote className="h-7 w-7 text-rose" />
              <div className="mt-3 flex gap-0.5" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-iris text-iris" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[16px] leading-relaxed text-tinta/90">“{q.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose text-[14px] font-semibold text-iris">
                  {q.name
                    .split(" ")
                    .filter((w) => w.length > 2)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-[14px] font-semibold">{q.name}</span>
                  <span className="block text-[12px] text-tinta/60">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
