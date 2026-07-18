// TxSpotlight — Glow radiale sottile che segue il cursore su tutto il sito.
// Aggiorna due CSS custom properties via rAF: il gradiente è definito in CSS.
// Disattivato su touch (hover:none) e con prefers-reduced-motion.

import { useEffect, useRef } from "react";

export function TxSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo dispositivi con puntatore vero e senza riduzione animazioni
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let x = 0, y = 0;

    const update = () => {
      const el = ref.current;
      if (el) {
        el.style.setProperty("--spot-x", `${x}px`);
        el.style.setProperty("--spot-y", `${y}px`);
      }
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="tx-spotlight" aria-hidden="true" />;
}
