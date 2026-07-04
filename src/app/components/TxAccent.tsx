// TxAccent — Selettore del colore accento (5 pallini nel footer)
// Applica data-accent sull'<html> e persiste la scelta in localStorage.
// I colori sono definiti in index.css sotto :root[data-accent="..."].

import { useEffect, useState } from "react";

const ACCENTS = ["mono", "lime", "cyan", "violet", "amber"] as const;
type Accent = (typeof ACCENTS)[number];

function isAccent(v: string | null): v is Accent {
  return v !== null && (ACCENTS as readonly string[]).includes(v);
}

export function TxAccent() {
  const [accent, setAccent] = useState<Accent>(() => {
    try {
      const s = localStorage.getItem("mc-tx-accent");
      if (isAccent(s)) return s;
    } catch { /* localStorage non disponibile */ }
    return "mono";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
    try { localStorage.setItem("mc-tx-accent", accent); } catch { /* noop */ }
  }, [accent]);

  return (
    <div className="tx-accent" role="group" aria-label="Colore accento">
      {ACCENTS.map((a) => (
        <button
          key={a}
          type="button"
          className={`tx-accent__dot${a === accent ? " is-active" : ""}`}
          data-accent-value={a}
          onClick={() => setAccent(a)}
          aria-label={`Accento ${a}`}
          aria-pressed={a === accent}
          title={a}
        />
      ))}
    </div>
  );
}
