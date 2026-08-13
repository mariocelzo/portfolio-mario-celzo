// TxOtherExp — Esperienze minori, elencate in forma compatta (senza logo/badge),
// separate dalla sezione Experience principale (che ora contiene solo i ruoli tech)

import type { Content } from "../content";

type OtherExpData = Content["otherExp"];

interface Props {
  otherExp: OtherExpData;
}

export function TxOtherExp({ otherExp }: Props) {
  return (
    <section className="tx-other-exp">
      <span className="tx-other-exp__label reveal">{otherExp.label}</span>
      <div className="tx-other-exp__list">
        {otherExp.items.map((it, i) => (
          <div className="tx-other-exp__row reveal" key={i} style={{ transitionDelay: `${i * 60}ms` }}>
            <span className="tx-other-exp__range">{it.range}</span>
            <div>
              <span className="tx-other-exp__title">{it.title}</span>
              <span className="tx-other-exp__org"> · {it.org}</span>
              <p className="tx-other-exp__body">{it.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
