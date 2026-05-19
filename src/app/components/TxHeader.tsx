// TxHeader — Header sticky in stile terminal bar
// Contiene: mark (nome + ruolo), nav centrale, toggle lingua, CTA

import type { Content } from "../content";

type Lang = "it" | "en";

interface Props {
  content: Content;
  lang: Lang;
  setLang: (l: Lang) => void;
}

// Scroll smooth verso una sezione con offset per l'header fisso
function scrollTo(e: React.MouseEvent, id: string) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

export function TxHeader({ content, lang, setLang }: Props) {
  const emailSubject = encodeURIComponent(
    lang === "it" ? "Opportunità DevOps — Mario Celzo" : "DevOps Opportunity — Mario Celzo"
  );

  return (
    <header className="tx-header">
      <div className="tx-header__inner">

        {/* Mark: dot disponibilità + nome in serif + ruolo */}
        <div className="tx-header__mark">
          <span className="dot" aria-hidden="true"></span>
          <span className="you italic">mario.celzo</span>
          <span className="role">junior devops · sarno (sa), it</span>
        </div>

        {/* Navigazione centrale con slash decorative */}
        <nav className="tx-header__nav" aria-label="Sezioni portfolio">
          {content.nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => scrollTo(e, n.id)}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Destra: toggle IT/EN + CTA button */}
        <div className="tx-header__right">
          <div className="tx-lang" role="group" aria-label="Lingua">
            <button
              onClick={() => setLang("it")}
              className={lang === "it" ? "is-active" : ""}
              aria-pressed={lang === "it"}
            >
              IT
            </button>
            <span aria-hidden="true">/</span>
            <button
              onClick={() => setLang("en")}
              className={lang === "en" ? "is-active" : ""}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>

          <a
            className="tx-cta"
            href={`mailto:${content.contact.email}?subject=${emailSubject}`}
          >
            {content.cta}
          </a>
        </div>

      </div>
    </header>
  );
}
