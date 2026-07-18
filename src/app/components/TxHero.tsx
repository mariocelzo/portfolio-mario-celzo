// TxHero — Sezione hero con prompt terminale, nome gigante, pitch e meta grid
// Il caret lampeggia via CSS animation (tx-blink)

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { Content } from "../content";
import { trackEvent } from "../lib/track";

// Effetto Three.js lazy: il chunk three viene scaricato solo dopo il primo render
const TxAscii3D = lazy(() => import("./TxAscii3D").then(m => ({ default: m.TxAscii3D })));

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

// TypedCmd — il comando del prompt si "digita" da solo carattere per carattere,
// come in un vero terminale. Con prefers-reduced-motion appare subito intero.
function TypedCmd({ text }: { text: string }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(text.length);
      return;
    }
    setN(0);
    // ~55ms a carattere, con un piccolo ritardo iniziale da "invio comando"
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      id = setInterval(() => {
        setN((v) => {
          if (v >= text.length) { clearInterval(id); return v; }
          return v + 1;
        });
      }, 55);
    }, 350);
    return () => { clearTimeout(start); if (id) clearInterval(id); };
  }, [text]);

  return (
    <code>
      {text.slice(0, n)}
      <span className="type-cursor" aria-hidden="true"></span>
    </code>
  );
}

// Effetto decode: al passaggio del mouse le lettere del nome si rimescolano
// in caratteri casuali stile terminale e si "decodificano" da sinistra a destra
const SCRAMBLE_CHARS = "#$%&/=?_:;*+<>";

function useScramble(text: string): [string, () => void] {
  const [display, setDisplay] = useState(text);
  const running = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  // Riallinea il display quando il testo cambia (es. cambio lingua)
  useEffect(() => setDisplay(text), [text]);

  // Cleanup allo smontaggio: senza questo l'interval continuerebbe a
  // girare (e a chiamare setState) dopo un cambio lingua a metà animazione
  useEffect(() => () => clearInterval(intervalRef.current), []);

  const scramble = () => {
    if (running.current) return; // già in corso — niente doppioni
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    running.current = true;
    let frame = 0;
    intervalRef.current = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / 2); // ogni lettera si fissa dopo 2 frame
      let out = "";
      for (let i = 0; i < text.length; i++) {
        out += i < revealed
          ? text[i]
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setDisplay(out);
      if (revealed >= text.length) {
        clearInterval(intervalRef.current);
        setDisplay(text);
        running.current = false;
      }
    }, 45);
  };

  return [display, scramble];
}

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

  // Decode effect sulle due parole del nome, attivato insieme in hover
  const [word1, scramble1] = useScramble(h.tagline[0]);
  const [word2, scramble2] = useScramble(h.tagline[1]);
  const scrambleName = () => { scramble1(); scramble2(); };

  return (
    <section id="top" className="tx-hero">

      {/* Torus knot ASCII 3D dietro al contenuto (z-index 0, lato destro) */}
      <Suspense fallback={null}>
        <TxAscii3D />
      </Suspense>

      {/* Riga prompt terminale: comando auto-digitato + pill status + pill location */}
      <div className="tx-hero__prompt reveal">
        <span>
          <TypedCmd text={h.promptCmd} />
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
        onMouseEnter={scrambleName}
        aria-label={`${h.tagline[0]} ${h.tagline[1]}`}
      >
        <span className="word">
          <span className="italic">{word1}</span>
        </span>{" "}
        <span className="word">
          <span>{word2}</span>
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
          onClick={() => trackEvent("email_click", { from: "hero" })}
        >
          <span className="sigil">$</span> {h.ctas.email}
        </a>
        <a
          className="tx-btn"
          href="https://github.com/mariocelzo"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("github_click", { from: "hero" })}
        >
          <span className="sigil">→</span> {h.ctas.github} <ArrowUR />
        </a>
        <a
          className="tx-btn"
          href="https://linkedin.com/in/mario-celzo"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("linkedin_click", { from: "hero" })}
        >
          <span className="sigil">→</span> {h.ctas.linkedin} <ArrowUR />
        </a>
        <a
          className="tx-btn"
          href="/assets/CV-Mario-Celzo.pdf"
          download
          onClick={() => trackEvent("cv_download", { from: "hero" })}
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
