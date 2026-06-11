// TxHero — Sezione hero con prompt terminale, nome gigante, pitch e meta grid
// Il caret lampeggia via CSS animation (tx-blink)

import type { Content } from "../content";

// Freccia diagonale (↗) per link esterni
const ArrowUR = () => (
  <svg className="arr" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 3h6v6M3 9l6-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
  </svg>
);

// Freccia giù (↓) per il download CV
const ArrowDown = () => (
  <svg className="arr" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="round"/>
  </svg>
);

type Lang = "it" | "en";

interface Props {
  content: Content;
  lang: Lang;
}

export function TxHero({ content, lang }: Props) {
  const h = content.hero;
  const emailSubject = encodeURIComponent(
    lang === "it" ? "Opportunità DevOps — Mario Celzo" : "DevOps Opportunity — Mario Celzo"
  );

  return (
    <section id="top" className="tx-hero">

      {/* Riga prompt terminale: comando + pill status + pill location */}
      <div className="tx-hero__prompt reveal">
        <span>
          <code>{h.promptCmd}</code>
        </span>
        <span className="pill">
          <span className="dot" aria-hidden="true"></span>
          status: available
        </span>
        <span className="pill">loc: sarno (sa), it</span>
        <span className="pill">v6 · /tech</span>
      </div>

      {/* Nome grande con corsivo + caret terminale.
          Ogni parola è in un .word (overflow:hidden) e scivola su quando
          l'h1 riceve .is-in dal reveal observer — effetto slide-up mascherato */}
      <h1
        className="tx-hero__name reveal"
        style={{ transitionDelay: "60ms" }}
      >
        <span className="word">
          <span className="italic">{h.tagline[0]}</span>
        </span>{" "}
        <span className="word">
          <span>{h.tagline[1]}</span>
        </span>
        <span className="caret" aria-hidden="true"></span>
      </h1>

      {/* Riga ruolo in stile chiave=valore */}
      <p
        className="tx-hero__role reveal"
        style={{ transitionDelay: "120ms" }}
      >
        {h.role}
      </p>

      {/* Pitch con bordo sinistro accent */}
      <p
        className="tx-hero__pitch reveal"
        style={{ transitionDelay: "180ms" }}
      >
        {h.pitch}
      </p>

      {/* CTA buttons */}
      <div
        className="tx-hero__ctas reveal"
        style={{ transitionDelay: "240ms" }}
      >
        <a
          className="tx-btn tx-btn--primary"
          href={`mailto:${content.contact.email}?subject=${emailSubject}`}
        >
          <span className="sigil">$</span> {h.ctas.email}
        </a>
        <a
          className="tx-btn"
          href="https://github.com/mariocelzo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sigil">→</span> {h.ctas.github} <ArrowUR />
        </a>
        <a
          className="tx-btn"
          href="https://linkedin.com/in/mario-celzo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sigil">→</span> {h.ctas.linkedin} <ArrowUR />
        </a>
        <a
          className="tx-btn"
          href="/assets/CV-Mario-Celzo.pdf"
          download
        >
          <span className="sigil">↓</span> {h.ctas.cv} <ArrowDown />
        </a>
      </div>

      {/* Meta grid: role / company / location / languages */}
      <div
        className="tx-hero__meta reveal"
        style={{ transitionDelay: "300ms" }}
      >
        {h.meta.map((m, i) => (
          <div className="tx-hero__meta-item" key={i}>
            <span className="k">{m.k}</span>
            <span className="v">{m.v}</span>
          </div>
        ))}
      </div>

    </section>
  );
}
