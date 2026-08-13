// TxContact — Sezione contatto stile terminale
// Layout: box centrato con overline + titolo grande + lede + email + griglia campi

import { Mail, Github, Linkedin } from "lucide-react";
import type { Content } from "../content";
import { trackEvent } from "../lib/track";

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
            onClick={() => trackEvent("email_click", { from: "contact" })}
          >
            {contact.email} →
          </a>

          {/* Icone social: mail/github/linkedin, al posto di Instagram/X/YouTube
              del Figma (che Mario non usa) */}
          <div className="tx-contact__social reveal" style={{ transitionDelay: "140ms" }}>
            <a
              href={`mailto:${contact.email}?subject=${emailSubject}`}
              aria-label="Email"
              onClick={() => trackEvent("email_click", { from: "contact_social" })}
            >
              <Mail size={20} strokeWidth={1.75} />
            </a>
            <a
              href="https://github.com/mariocelzo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              onClick={() => trackEvent("github_click", { from: "contact_social" })}
            >
              <Github size={20} strokeWidth={1.75} />
            </a>
            <a
              href="https://linkedin.com/in/mario-celzo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onClick={() => trackEvent("linkedin_click", { from: "contact_social" })}
            >
              <Linkedin size={20} strokeWidth={1.75} />
            </a>
          </div>
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
              onClick={() => trackEvent("contact_field_click", { field: f.k })}
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
