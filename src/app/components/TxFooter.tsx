// TxFooter — Footer minimalista a 3 colonne mono
// Sinistra: copyright, centro: versione, destra: "built in italy"

import type { Content } from "../content";

type FooterData = Content["footer"];

interface Props {
  footer: FooterData;
}

export function TxFooter({ footer }: Props) {
  return (
    <footer className="tx-footer">
      <div>{footer.l}</div>
      <div className="tx-footer__c">{footer.c}</div>
      <div className="tx-footer__r">{footer.r}</div>
    </footer>
  );
}
