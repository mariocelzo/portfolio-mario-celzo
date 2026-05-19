// TxStack — Griglia 2×2 delle competenze tecniche
// Ogni cella: kicker + lead in corsivo + chip tecnologie

import type { Content } from "../content";
import { SectionHead } from "./TxNow";

type StackData = Content["stack"];

interface Props {
  stack: StackData;
}

export function TxStack({ stack }: Props) {
  return (
    <section id="stack" className="tx-section">
      <SectionHead no={stack.no} title={stack.title} cue={stack.cue} />

      <div className="tx-stack__grid">
        {stack.columns.map((col, i) => (
          <div
            className="tx-stack__col reveal"
            key={i}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {/* Kicker: identificatore categoria in stile comando */}
            <h5>{col.kicker}</h5>
            {/* Lead: frase descrittiva in Instrument Serif corsivo */}
            <p className="lead italic">{col.lead}</p>
            {/* Chip delle tecnologie */}
            <div className="tx-stack__chips">
              {col.chips.map((c, j) => (
                <span className="tx-chip" key={j}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
