// TxEducation — Formazione accademica + certificazioni + lingue
// Layout: colonna principale (percorso) + sidebar (certs + lingue)

import type { Content } from "../content";
import { SectionHead } from "./TxNow";

type EduData = Content["edu"];

interface Props {
  edu: EduData;
}

export function TxEducation({ edu }: Props) {
  return (
    <section id="edu" className="tx-section">
      <SectionHead no={edu.no} title={edu.title} cue={edu.cue} />

      <div className="tx-edu">

        {/* Colonna principale: percorso accademico */}
        <div className="reveal">
          {edu.items.map((it, i) => (
            <div className="tx-edu__row" key={i}>
              {/* Anno in stile monospace muted */}
              <span className="year">{it.year}</span>
              <div>
                {/* Titolo in serif corsivo */}
                <h4 className="title">{it.title}</h4>
                <span className="org">{it.org}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar: certificazioni + lingue */}
        <aside
          className="tx-edu__side reveal"
          style={{ transitionDelay: "120ms" }}
        >
          {/* Certificazioni con checkmark verde */}
          <h4>{edu.certsTitle}</h4>
          <div className="certs">
            {edu.certs.map((c, i) => (
              <div className="cert" key={i}>
                <span>{c.name}</span>
                <span className="yr">{c.yr}</span>
              </div>
            ))}
          </div>

          {/* Lingue con livello */}
          <h4>{edu.langsTitle}</h4>
          <div className="langs">
            {edu.langs.map((l, i) => (
              <div className="lang" key={i}>
                <span className="name italic">{l.name}</span>
                <span className="level">{l.level}</span>
              </div>
            ))}
          </div>
        </aside>

      </div>
    </section>
  );
}
