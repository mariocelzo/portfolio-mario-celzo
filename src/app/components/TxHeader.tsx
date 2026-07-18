// TxHeader — Header sticky in stile terminal bar
// Contiene: mark (nome + ruolo), nav centrale con sezione attiva, toggle lingua, CTA

import { useEffect, useState } from "react";
import type { Content } from "../content";
import { trackEvent } from "../lib/track";

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

  // Sezione attualmente visibile — evidenziata nella nav con underline accent.
  // Il rootMargin restringe la "finestra" di rilevamento alla fascia centrale
  // del viewport, così una sola sezione è attiva alla volta.
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    content.nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [content]);

  return (
    <header className="tx-header">
      <div className="tx-header__inner">

        {/* Mark: dot disponibilità + nome in serif + ruolo */}
        <div className="tx-header__mark">
          <span className="dot" aria-hidden="true"></span>
          <span className="you italic">mario.celzo</span>
          <span className="role">devops engineer · sarno (sa), it</span>
        </div>

        {/* Navigazione centrale con slash decorative + sezione attiva evidenziata */}
        <nav className="tx-header__nav" aria-label="Sezioni portfolio">
          {content.nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => scrollTo(e, n.id)}
              className={active === n.id ? "is-active" : ""}
              aria-current={active === n.id ? "true" : undefined}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Destra: toggle IT/EN + CTA button */}
        <div className="tx-header__right">
          <div className="tx-lang" role="group" aria-label="Lingua">
            <button
              onClick={() => { setLang("it"); trackEvent("lang_switch", { to: "it" }); }}
              className={lang === "it" ? "is-active" : ""}
              aria-pressed={lang === "it"}
            >
              IT
            </button>
            <span aria-hidden="true">/</span>
            <button
              onClick={() => { setLang("en"); trackEvent("lang_switch", { to: "en" }); }}
              className={lang === "en" ? "is-active" : ""}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>

          <a
            className="tx-cta"
            href={`mailto:${content.contact.email}?subject=${emailSubject}`}
            onClick={() => trackEvent("email_click", { from: "header" })}
          >
            {content.cta}
          </a>
        </div>

      </div>
    </header>
  );
}
