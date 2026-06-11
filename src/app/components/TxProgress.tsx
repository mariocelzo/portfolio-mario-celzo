// TxProgress — Barra di progresso scroll fissata in cima alla pagina
// Aggiorna scaleX via rAF per restare fluida senza re-render React

import { useEffect, useRef } from "react";

export function TxProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = barRef.current;
      if (el) {
        // Percentuale di scroll: posizione corrente / altezza scrollabile totale
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        el.style.transform = `scaleX(${p})`;
      }
      raf = 0;
    };

    // Throttle via requestAnimationFrame: max un update per frame
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // posizione iniziale

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={barRef} className="tx-progress" aria-hidden="true" />;
}
