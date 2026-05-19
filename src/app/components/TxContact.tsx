// TxContact — Sezione contatto stile terminale
// Layout: box centrato con overline + titolo grande + lede + email + griglia campi

import type { Content } from "../content";

type ContactData = Content["contact"];
type Lang = "it" | "en";

interface Props {
  contact: ContactData;
  lang: Lang;
}

export function TxContact({ contact, lang }: Props) {
  const emailSubject = encodeURIComponent(
    lang === "it" ? "Opportunità DevOps — Mario Celzo" : "DevOps Opportunity — Mario Celzo"
  );

  return (
    <section id="contact" className="tx-contact">
      <div className="tx-contact__inner">

        {/* Body centrato: overline + titolo + lede + email clicabile */}
        <div className="tx-contact__body">
          {/* Overline: "open_to_opportunities" con prefisso $ accent */}
          <span className="tx-contact__overline">{contact.overline}</span>

          {/* Titolo grande in serif con seconda parola in corsivo accent */}
          <h2 className="tx-contact__title reveal">
            <span>{contact.title[0]}</span>{" "}
            <span className="italic">{contact.title[1]}</span>
          </h2>

          <p className="tx-contact__lede reveal">{contact.lede}</p>

          {/* Email grande in serif corsivo con underline */}
          <a
            className="tx-contact__email reveal"
            style={{ transitionDelay: "100ms" }}
            href={`mailto:${contact.email}?subject=${emailSubject}`}
          >
            {contact.email} →
          </a>
        </div>

        {/* Griglia 4 campi: email / linkedin / github / location */}
        <div className="tx-contact__grid">
          {contact.grid.map((f, i) => (
            <a
              key={i}
              className="tx-contact__field"
              href={f.href}
              target={f.href.startsWith("http") ? "_blank" : undefined}
              rel={f.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {/* Key in stile // prefisso */}
              <span className="k">{f.k}</span>
              {/* Valore in serif corsivo */}
              <span className="v italic">{f.v}</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
