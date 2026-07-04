// TxFooter — Footer minimalista a 3 colonne mono
// Sinistra: copyright/torna-su, centro: versione + orologio live, destra: "built in italy"

import { useEffect, useState } from "react";
import type { Content } from "../content";

type FooterData = Content["footer"];

interface Props {
  footer: FooterData;
}

// Orologio live sull'ora di Sarno (Europe/Rome) — tocco da status bar terminale
function useClock(): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("it-IT", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      timeZone: "Europe/Rome",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function TxFooter({ footer }: Props) {
  const clock = useClock();

  return (
    <footer className="tx-footer">
      {/* Il copyright è anche un link "torna su" */}
      <div>
        <a href="#top">{footer.l} ↑</a>
      </div>
      {/* Centro: versione + orologio live di Sarno */}
      <div className="tx-footer__c">
        {footer.c} · sarno {clock}
      </div>
      <div className="tx-footer__r">{footer.r}</div>
    </footer>
  );
}
