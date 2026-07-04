// TxExperience — Deploy log cronologico dell'esperienza professionale
// Ogni row ha: anno grande in corsivo + titolo + org + badge + body + bullets

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

      <div>
        {exp.items.map((it, i) => (
          <div
            className="tx-exp__row reveal"
            key={i}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {/* Colonna sinistra: anno + range date */}
            <div className="tx-exp__year">
              <span className="y italic">{it.year}</span>
              <span className="rng">{it.range}</span>
            </div>

            {/* Colonna destra: titolo + badge + corpo + bullets */}
            <div className="tx-exp__main">
              <div className="tx-exp__title">
                <h4>{it.title}</h4>
                <span className="org">{it.org}</span>
                {/* Badge stato: ACTIVE (verde pulsante) per il lavoro corrente,
                    altri valori (es. SHIPPED) in variante crema statica */}
                {it.badge && (
                  <span className={`badge${it.badge === "ACTIVE" ? "" : " badge--done"}`}>
                    {it.badge}
                  </span>
                )}
              </div>

              <div className="tx-exp__body">
                <p>{it.body}</p>
                <ul>
                  {it.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
