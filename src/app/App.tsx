// App principale — Portfolio Mario Celzo v6 Tech
// Gestisce: lingua (IT/EN), accento colore, reveal scroll-based

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
// Speed Insights: raccoglie i Core Web Vitals reali dei visitatori su Vercel
import { SpeedInsights } from "@vercel/speed-insights/react";
import { C } from "./content";
import { TxHeader }     from "./components/TxHeader";
import { TxHero }       from "./components/TxHero";
import { TxMarquee }    from "./components/TxMarquee";
import { TxProgress }   from "./components/TxProgress";
import { TxSpotlight }  from "./components/TxSpotlight";
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
// ──────────────────────────────────────────────────────────────
// Pagine virtuali per Vercel Analytics (piano Hobby)
// Il piano gratuito conta le pageview per percorso: aggiornando l'URL
// via replaceState quando una sezione entra in vista, ogni sezione
// diventa una "pagina" nel dashboard (/exp, /work, ...) senza Pro.
// Bonus: gli URL /exp, /work ecc. sono condivisibili (rewrite in vercel.json).
// ──────────────────────────────────────────────────────────────
const SECTION_IDS = ["now", "exp", "work", "stack", "edu", "contact"];

function useVirtualPaths(deps: unknown[] = []) {
  // Al primo caricamento: se l'URL è un deep link a una sezione, scrollaci
  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, "");
    if (!SECTION_IDS.includes(path)) return;
    // Piccolo ritardo per aspettare layout e font.
    // behavior "instant" (non "auto"): con html{scroll-behavior:smooth}
    // "auto" diventerebbe uno scroll animato dall'alto — qui si atterra diretti
    const id = setTimeout(() => {
      const el = document.getElementById(path);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      }
    }, 150);
    return () => clearTimeout(id);
  }, []);

  // Osserva le sezioni: quando una domina il viewport, aggiorna il percorso.
  // replaceState non inquina la history (il tasto back resta sano) e
  // viene intercettato dallo script di Vercel Analytics come pageview.
  useEffect(() => {
    // Anti-pageview-fantasma: durante gli scroll animati (click nav, smooth
    // scroll) le sezioni intermedie entrano brevemente nella banda. L'observer
    // aggiorna solo il percorso "pendente"; il commit via replaceState avviene
    // 250ms dopo l'ULTIMO evento di scroll — cioè solo a scroll fermo.
    let pending: string | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const commit = () => {
      if (pending && window.location.pathname !== pending) {
        // Preserva la query string: i parametri UTM (?utm_source=...)
        // devono sopravvivere allo scroll per l'attribuzione in Analytics
        history.replaceState(null, "", pending + window.location.search);
      }
    };
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(commit, 250);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          pending = e.target.id === "top" ? "/" : `/${e.target.id}`;
          schedule();
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    ["top", ...SECTION_IDS].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    // Ogni evento di scroll rimanda il commit: finché si scrolla, niente pageview
    const onScroll = () => { if (pending) schedule(); };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Easter egg: banner ASCII in console per chi apre i DevTools —
// se sei arrivato fin qui, probabilmente sei il tipo di persona giusta
function useConsoleEgg() {
  useEffect(() => {
    console.log(
      "%c\n" +
      "  ┌─────────────────────────────────────────┐\n" +
      "  │  $ whoami                               │\n" +
      "  │  > mario.celzo — devops engineer        │\n" +
      "  │                                         │\n" +
      "  │  $ cat /etc/motd                        │\n" +
      "  │  > Se stai leggendo qui, parliamo. :)   │\n" +
      "  │  > mariocelzo003@gmail.com              │\n" +
      "  └─────────────────────────────────────────┘\n",
      "color:#7FFF6B; font-family:monospace;"
    );
  }, []);
}

export default function App() {
  const [lang, setLang] = useLanguage();
  useConsoleEgg();
  // Pagine virtuali per Analytics: ri-osserva le sezioni al cambio lingua
  // (main viene rimontato con key={lang})
  useVirtualPaths([lang]);

  // Accento fisso "lime" per il portfolio reale (il tweaks panel non esiste qui)
  // Il colore viene impostato via data-accent sul tag <html> in index.html
  useReveal([lang]);

  const content = C[lang];

  return (
    <>
      {/* Barra di progresso scroll in cima alla pagina */}
      <TxProgress />

      {/* Spotlight: glow sottile che segue il cursore (solo desktop) */}
      <TxSpotlight />

      {/* Header fisso in cima — terminal bar con lingua e CTA */}
      <TxHeader content={content} lang={lang} setLang={setLang} />

      {/* key={lang}: rimonta il contenuto al cambio lingua attivando il fade CSS */}
      <main key={lang}>
        {/* Hero: nome grande, prompt terminale, pitch, CTA, meta,
            con il torus knot ASCII 3D (Three.js) come sfondo */}
        <TxHero content={content} lang={lang} />

        {/* Marquee ticker con le keyword tecniche */}
        <TxMarquee />

        {/* Now: attività corrente su Lutech/ERIT-DXL con panel laterale */}
        <TxNow now={content.now} />

        {/* Experience: deploy log cronologico (prima dei progetti) */}
        <TxExperience exp={content.exp} />

        {/* Work: griglia progetti con cover SVG */}
        <TxWork work={content.work} />

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

      {/* Vercel Analytics + Speed Insights: invisibili, attivi solo in produzione */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
