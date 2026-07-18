// TxWork — Griglia dei progetti selezionati
// Layout: 6 colonne, le prime 2 card ne occupano 3, le restanti 2 ognuna

import type { Content } from "../content";
import { SectionHead } from "./TxNow";
import { trackEvent } from "../lib/track";

type WorkData = Content["work"];

interface Props {
  work: WorkData;
}

// Freccia diagonale per link esterni
const ArrowUR = () => (
  <svg className="arr" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 3h6v6M3 9l6-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
  </svg>
);

export function TxWork({ work }: Props) {
  return (
    <section id="work" className="tx-section">
      <SectionHead no={work.no} title={work.title} cue={work.cue} />

      <div className="tx-work__grid">
        {work.items.map((p, i) => (
          <article
            key={i}
            className={`tx-work__card reveal ${p.span}`}
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {/* Cover image con badge overlay */}
            <div className="tx-work__media">
              <img
                src={p.cover}
                alt={p.name}
                loading="lazy"
                decoding="async"
              />
              {/* Badge numero progetto */}
              <span className="num">
                N. {String(i + 1).padStart(2, "0")} / {String(work.items.length).padStart(2, "0")}
              </span>
              {/* Anno */}
              <span className="yr">{p.year}</span>
              {/* Livello (es. MAGISTRALE, B.SC.) con sfondo accent */}
              <span className="lvl">{p.level}</span>
            </div>

            {/* Body: titolo + link + descrizione + tags */}
            <div className="tx-work__body">
              <div className="head">
                <h3>{p.name}</h3>
                {/* Link figma, demo, repo allineati a destra */}
                <div style={{ display: "flex", gap: 14, alignItems: "baseline", whiteSpace: "nowrap" }}>
                  {p.figma && (
                    <a
                      className="repo"
                      href={p.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("project_click", { project: p.name, kind: "figma" })}
                    >
                      figma
                    </a>
                  )}
                  {p.demo && (
                    <a
                      className="repo"
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("project_click", { project: p.name, kind: "demo" })}
                    >
                      {work.demoLbl}
                    </a>
                  )}
                  <a
                    className="repo"
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("project_click", { project: p.name, kind: "repo" })}
                  >
                    {work.repoLbl} <ArrowUR />
                  </a>
                </div>
              </div>

              <p>{p.desc}</p>

              {/* Tag tecnologie */}
              <div className="tx-work__tags">
                {p.tags.map((t, j) => (
                  <span className="tx-chip" key={j}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
