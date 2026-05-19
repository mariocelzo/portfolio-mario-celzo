// App principale — Portfolio Mario Celzo v6 Tech
// Gestisce: lingua (IT/EN), accento colore, reveal scroll-based

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { C } from "./content";
import { TxHeader }     from "./components/TxHeader";
import { TxHero }       from "./components/TxHero";
import { TxNow }        from "./components/TxNow";
import { TxWork }       from "./components/TxWork";
import { TxExperience } from "./components/TxExperience";
import { TxStack }      from "./components/TxStack";
import { TxEducation }  from "./components/TxEducation";
import { TxBehind }     from "./components/TxBehind";
import { TxContact }    from "./components/TxContact";
import { TxFooter }     from "./components/TxFooter";

// Tipo lingua supportata
type Lang = "it" | "en";

// ──────────────────────────────────────────────────────────────
// Hook: lingua con persistenza localStorage
// ──────────────────────────────────────────────────────────────
function useLanguage(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const s = localStorage.getItem("mc-tx-lang");
      if (s === "it" || s === "en") return s;
    } catch { /* localStorage non disponibile (SSR / private) */ }
    return "it";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("mc-tx-lang", l); } catch { /* noop */ }
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return [lang, setLang];
}

// ──────────────────────────────────────────────────────────────
// Hook: IntersectionObserver per attivare le classi .reveal → .is-in
// Re-eseguito ogni volta che la lingua cambia (gli elementi vengono
// rimontati, quindi occorre ri-osservare)
// ──────────────────────────────────────────────────────────────
function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    // Crea l'observer con un margine inferiore per anticipare l'ingresso
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target); // fire-once
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );

    // Primo frame: verifica elementi già visibili e osserva gli altri
    const id = requestAnimationFrame(() => {
      document.querySelectorAll<Element>(".reveal").forEach((el) => {
        el.classList.remove("is-in");
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
          el.classList.add("is-in");
        } else {
          io.observe(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ──────────────────────────────────────────────────────────────
// App
// ──────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useLanguage();

  // Accento fisso "lime" per il portfolio reale (il tweaks panel non esiste qui)
  // Il colore viene impostato via data-accent sul tag <html> in index.html
  useReveal([lang]);

  const content = C[lang];

  return (
    <>
      {/* Header fisso in cima — terminal bar con lingua e CTA */}
      <TxHeader content={content} lang={lang} setLang={setLang} />

      <main>
        {/* Hero: nome grande, prompt terminale, pitch, CTA, meta */}
        <TxHero content={content} lang={lang} />

        {/* Now: attività corrente su Lutech/ERIT-DXL con panel laterale */}
        <TxNow now={content.now} />

        {/* Work: griglia progetti con cover SVG */}
        <TxWork work={content.work} />

        {/* Experience: deploy log cronologico */}
        <TxExperience exp={content.exp} />

        {/* Stack: 4 colonne di chip tecnologie */}
        <TxStack stack={content.stack} />

        {/* Education: percorso universitario + certificazioni + lingue */}
        <TxEducation edu={content.edu} />

        {/* Behind the keyboard: foto + 4 passion cards */}
        <TxBehind beyond={content.beyond} />

        {/* Contact: sezione terminale con email grande */}
        <TxContact contact={content.contact} lang={lang} />
      </main>

      {/* Footer: 3 colonne mono */}
      <TxFooter footer={content.footer} />

      {/* Vercel Analytics: invisibile, attivo solo in produzione */}
      <Analytics />
    </>
  );
}
