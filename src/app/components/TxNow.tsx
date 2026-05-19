// TxNow — "Now, in produzione" — sezione che descrive il lavoro attuale
// Layout: colonna principale testo + panel laterale sticky con stack e metadata

import type { Content } from "../content";

type NowData = Content["now"];

interface Props {
  now: NowData;
}

// Header sezione riutilizzabile: numero + titolo + cue
function SectionHead({ no, title, cue }: { no: string; title: [string, string]; cue: string }) {
  return (
    <header className="tx-section__head reveal">
      <span className="tx-section__no">{no}</span>
      <h2 className="tx-section__title">
        <span>{title[0]}</span>{" "}
        <span className="italic">{title[1]}</span>
      </h2>
      <span className="tx-section__cue">{cue}</span>
    </header>
  );
}

export function TxNow({ now }: Props) {
  return (
    <section id="now" className="tx-section">
      <SectionHead no={now.no} title={now.title} cue={now.cue} />

      <div className="tx-now">

        {/* Colonna principale: lead + paragrafi + bullets */}
        <div className="tx-now__main reveal">
          {/* Lead in stile kubectl */}
          <p className="tx-now__lead">{now.lead}</p>

          {/* Paragrafi descrittivi */}
          <div>
            {now.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Bullets con indice, checkbox verde e testo */}
          <div className="tx-now__bullets">
            {now.bullets.map((b, i) => (
              <div className="tx-now__bullet" key={i}>
                <span className="ix">{b.ix}</span>
                {/* Checkbox stile terminale */}
                <span className="check" aria-hidden="true">✓</span>
                <span className="text">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel laterale sticky: traffic lights + stack + metadata */}
        <aside
          className="tx-now__panel reveal"
          style={{ transitionDelay: "120ms" }}
        >
          {/* Barra titolo stile editor con traffic lights macOS */}
          <div className="tx-panel__bar">
            <span className="tx-panel__lights" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="file">{now.panelFile}</span>
            <span className="meta">{now.panelMeta}</span>
          </div>

          <div className="tx-panel__body">
            {/* Stack corrente come chip */}
            <h4>{now.panelTitle}</h4>
            <div className="tx-chips">
              {now.stack.map((s, i) => (
                <span className="tx-chip" key={i}>{s}</span>
              ))}
            </div>

            <div className="tx-panel__divider"></div>

            {/* Metadata progetto come definition list */}
            <h4>{now.panelDataTitle}</h4>
            <dl>
              {now.data.map((m, i) => (
                <div key={i} style={{ display: "contents" }}>
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

      </div>
    </section>
  );
}

// Re-esporta SectionHead per uso in altri componenti
export { SectionHead };
