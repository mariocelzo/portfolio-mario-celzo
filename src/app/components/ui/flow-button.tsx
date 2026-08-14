// FlowButton — bottone a pillola con animazione "flow": al passaggio del
// mouse il bordo si allarga in cerchio pieno (colore chiaro), il testo
// scorre a destra e la freccia destra esce mentre una nuova freccia entra
// da sinistra. Adattato da un componente shadcn/Next.js: rimosso "use client"
// (qui siamo su Vite, non Next.js) e ricolorato per il tema scuro del sito
// (var(--ink)/var(--bg) al posto dei colori chiari fissi dell'originale).
//
// Supporta sia <button> (onClick puro) sia <a> (href/download, es. link CV):
// basta passare `href` per renderizzare un link invece di un bottone.

import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type CommonProps = {
  text: string;
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type FlowButtonProps = AsButton | AsAnchor;

const SHARED_CLASS =
  "group relative inline-flex items-center gap-1 overflow-hidden rounded-[999px] " +
  "border-2 border-[var(--ink)] bg-transparent px-7 py-[13px] text-[15px] font-semibold " +
  "text-[var(--ink)] cursor-pointer transition-[border-radius,border-color] " +
  "duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent " +
  "hover:rounded-[14px] active:scale-[0.97]";

function FlowButtonContent({ text }: { text: string }) {
  return (
    <>
      {/* Freccia sinistra: entra da fuori al hover */}
      <ArrowRight
        aria-hidden="true"
        className="pointer-events-none absolute left-[-25%] z-[2] h-4 w-4 stroke-[var(--ink)] transition-all duration-[700ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-4 group-hover:stroke-[var(--bg)]"
      />
      {/* Testo: scorre a destra al hover, colore passa a --bg sul cerchio chiaro */}
      <span className="relative z-[1] -translate-x-3 text-[var(--ink)] transition-all duration-[700ms] ease-out group-hover:translate-x-3 group-hover:text-[var(--bg)]">
        {text}
      </span>
      {/* Cerchio che si espande a riempire il bottone */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ink)] opacity-0 transition-all duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:h-[220px] group-hover:w-[220px] group-hover:opacity-100"
      />
      {/* Freccia destra: esce verso fuori al hover */}
      <ArrowRight
        aria-hidden="true"
        className="pointer-events-none absolute right-4 z-[2] h-4 w-4 stroke-[var(--ink)] transition-all duration-[700ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[-25%] group-hover:stroke-[var(--bg)]"
      />
    </>
  );
}

export function FlowButton(props: FlowButtonProps) {
  const { text, className, ...rest } = props;
  const cls = [SHARED_CLASS, className].filter(Boolean).join(" ");

  if ("href" in props && props.href !== undefined) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={cls} {...anchorRest} href={props.href}>
        <FlowButtonContent text={text} />
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} {...buttonRest}>
      <FlowButtonContent text={text} />
    </button>
  );
}
