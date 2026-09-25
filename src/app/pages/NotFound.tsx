import { ArrowRight } from "lucide-react";
import { SEGMENTOS, segmentoPath } from "../data/segmentos";
import { PageShell } from "./ui";

/* 404 de verdade: o servidor responde com status 404 (ErrorDocument no .htaccess)
   e a página sai com noindex. Página 200 vazia seria soft 404. */
export function NotFoundPage() {
  const atalhos = [
    { label: "Página inicial", href: "/" },
    ...SEGMENTOS.map((s) => ({ label: s.label, href: segmentoPath(s) })),
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contato" },
  ];
  return (
    <PageShell path="/404">
      <div className="p-3 sm:p-4">
        <section className="rounded-3xl bg-white px-5 pb-16 pt-32 text-center sm:px-10">
          <p className="font-display text-[88px] font-semibold leading-none tracking-tight text-iris/20">404</p>
          <h1 className="mt-4 t-display">Esta página não existe</h1>
          <p className="mx-auto mt-4 max-w-md text-[16px] text-tinta/70">O endereço pode ter mudado ou sido digitado errado. Estes caminhos levam ao que as pessoas mais procuram:</p>
          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
            {atalhos.map((a) => (
              <li key={a.href}>
                <a href={a.href} className="inline-flex items-center gap-1.5 rounded-full border border-tinta/10 bg-perola px-4 py-2 text-[14px] text-tinta/80 transition-colors hover:border-iris/40 hover:text-iris">
                  {a.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="h-10" />
    </PageShell>
  );
}
