import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Cookie } from "lucide-react";
import { CONSENT_CHANGE_EVENT, OPEN_PREFERENCES_EVENT, readConsent, saveConsent } from "../lib/consent";

/* =============================================================================
   BANNER DE COOKIES + PREFERÊNCIAS

   · Aceitar e recusar têm o mesmo peso visual: esconder a recusa atrás de um
     link apagado é padrão enganoso para a ANPD.
   · No painel as categorias opcionais começam DESMARCADAS quando não há
     escolha salva — consentimento na LGPD é opt-in.
   · <dialog> nativo: foco preso, Esc fecha, resto da página inerte.
   · No HTML pré-renderizado o banner não existe (snapshot do servidor =
     "já escolheu"); ele aparece após a hidratação só para quem não escolheu.
   ========================================================================== */

const btn =
  "btn inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-2.5 text-[13px] font-medium transition-[opacity,background-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris";
const btnPrimary = `${btn} bg-tinta text-white hover:opacity-90`;
const btnSecondary = `${btn} border border-tinta/20 text-tinta hover:bg-nevoa/60`;

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
}

export default function CookieConsent(): ReactNode {
  const bannerOpen = useSyncExternalStore(
    subscribe,
    () => readConsent() === null,
    () => false
  );
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => {
      const saved = readConsent();
      setAnalytics(saved?.analytics ?? false);
      setMarketing(saved?.marketing ?? false);
      dialogRef.current?.showModal();
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  const decide = (a: boolean, m: boolean) => {
    saveConsent(a, m);
    dialogRef.current?.close();
  };

  return (
    <>
      {bannerOpen && (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-3 bottom-3 z-[60] rounded-3xl border border-tinta/10 bg-white p-5 text-tinta shadow-[0_24px_60px_-20px_rgba(30,27,46,0.45)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[400px]"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-nevoa text-iris">
              <Cookie className="h-4 w-4" />
            </span>
            <p className="font-display text-[15px] font-semibold">Usamos cookies com a sua licença</p>
          </div>
          <p className="mt-2.5 text-[13px] leading-[1.55] text-tinta/70">
            Os essenciais mantêm o site funcionando. Com a sua autorização, também usamos cookies de análise (Google
            Analytics) para entender como o site é usado. Detalhes na{" "}
            <a href="/termos-e-privacidade#cookies" className="text-iris underline underline-offset-2">
              política de cookies
            </a>
            .
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" className={btnSecondary} onClick={() => decide(false, false)}>
              Recusar
            </button>
            <button type="button" className={btnPrimary} onClick={() => decide(true, true)}>
              Aceitar todos
            </button>
          </div>
          <button
            type="button"
            className="mt-3 w-full cursor-pointer text-center text-[13px] text-tinta/70 underline underline-offset-2 hover:text-tinta"
            onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
          >
            Personalizar
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-prefs-title"
        className="m-auto w-[calc(100%-1.5rem)] max-w-lg rounded-3xl border border-tinta/10 bg-white p-6 text-tinta shadow-2xl backdrop:bg-tinta/50 backdrop:backdrop-blur-sm"
      >
        <h2 id="cookie-prefs-title" className="text-[20px] font-semibold">
          Preferências de cookies
        </h2>
        <p className="mt-1.5 text-[13px] leading-[1.55] text-tinta/70">
          Escolha o que autoriza. Dá para mudar a qualquer momento pelo link “Preferências de cookies” no rodapé.
        </p>
        <ul className="mt-5 flex flex-col gap-3">
          <Categoria
            titulo="Essenciais"
            descricao="Necessários para o site funcionar e para lembrar esta escolha. Sempre ativos."
            checked
            disabled
          />
          <Categoria
            titulo="Análise"
            descricao="Google Analytics: páginas visitadas e tempo de navegação, de forma agregada."
            checked={analytics}
            onChange={setAnalytics}
          />
          <Categoria
            titulo="Marketing"
            descricao="Medição de anúncios e remarketing. Hoje o site não usa, mas a escolha já vale se passar a usar."
            checked={marketing}
            onChange={setMarketing}
          />
        </ul>
        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button type="button" className={btnSecondary} onClick={() => decide(false, false)}>
            Recusar todos
          </button>
          <button type="button" className={btnSecondary} onClick={() => decide(analytics, marketing)}>
            Salvar escolha
          </button>
          <button type="button" className={btnPrimary} onClick={() => decide(true, true)}>
            Aceitar todos
          </button>
        </div>
      </dialog>
    </>
  );
}

function Categoria({
  titulo,
  descricao,
  checked,
  disabled,
  onChange,
}: {
  titulo: string;
  descricao: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <li>
      <label
        className={`flex items-start gap-3 rounded-2xl border border-tinta/10 bg-perola p-3.5 ${disabled ? "opacity-70" : "cursor-pointer"}`}
      >
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="flex flex-col gap-0.5">
          <span className="text-[14px] font-semibold">{titulo}</span>
          <span className="text-[12.5px] leading-[1.5] text-tinta/65">{descricao}</span>
        </span>
      </label>
    </li>
  );
}
