// TxExperience — Lista esperienza in stile Figma: logo aziendale + titolo +
// org + descrizione a sinistra, range date a destra. Sostituisce il vecchio
// layout "deploy log" con anno grande.

import { Scissors } from "lucide-react";
import type { Content } from "../content";
import { SectionHead } from "./TxNow";

type ExpData = Content["exp"];

interface Props {
  exp: ExpData;
}

export function TxExperience({ exp }: Props) {
  return (
    <section id="exp" className="tx-section">
      <SectionHead no={exp.no} title={exp.title} cue={exp.cue} />

      <div className="tx-exp__list">
        {exp.items.map((it, i) => (
          <div
            className="tx-exp__row reveal"
            key={i}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {/* Badge logo: immagine reale se presente, altrimenti icona
                generica (caso del salone di famiglia, senza logo ufficiale) */}
            <div className="tx-exp__logo">
              {it.logo ? (
                <img src={it.logo} alt={it.org} loading="lazy" />
              ) : (
                <Scissors size={20} strokeWidth={1.75} aria-hidden="true" />
              )}
            </div>

            <div className="tx-exp__main">
              <div className="tx-exp__title">
                <h4>{it.title}</h4>
                {it.badge && (
                  <span className={`badge${it.badge === "ACTIVE" ? "" : " badge--done"}`}>
                    {it.badge}
                  </span>
                )}
              </div>
              <span className="tx-exp__org">{it.org}</span>
              <p className="tx-exp__body">{it.body}</p>
              {/* Elenco puntato dei risultati/dettagli tecnici (dati già
                  presenti in content.tsx ma non ancora renderizzati nel
                  nuovo layout piatto) */}
              {it.bullets.length > 0 && (
                <ul className="tx-exp__bullets">
                  {it.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="tx-exp__range">
              <span>{it.range}</span>
              <span className="year">{it.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
