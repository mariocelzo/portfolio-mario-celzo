// TxHero — Sezione hero: avatar in cornice circolare, headline con gradiente,
// pitch, due CTA a pillola, riga tech loghi ("Experience With").
// Sostituisce il vecchio prompt terminale + effetto ASCII 3D + scramble.

import type { Content } from "../content";
import { trackEvent } from "../lib/track";
// Versione compressa (600px lato lungo, JPEG q75) dell'originale 2.4MB/3088x2316:
// l'avatar è renderizzato solo a 220px/160px in pagina, quindi il file raw
// causava un chunk enorme in build ed era probabile LCP. Originale lasciato
// intatto in assets come sorgente canonica.
import profilePhoto from "../../assets/mario-avatar.jpg";

// Le 5 tecnologie principali di Mario, al posto della riga generica
// JS/Node/HTML/CSS/React del Figma originale
const TECH_LOGOS = [
  { name: "Kubernetes", src: "/assets/logos/tech/kubernetes.svg" },
  { name: "Docker", src: "/assets/logos/tech/docker.svg" },
  { name: "Terraform", src: "/assets/logos/tech/terraform.svg" },
  { name: "Azure DevOps", src: "/assets/logos/tech/azuredevops.svg" },
  { name: "React", src: "/assets/logos/tech/react.svg" },
];

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

  return (
    <section id="top" className="tx-hero">

      {/* Avatar: foto reale in cornice circolare con blob sfumato dietro,
          al posto del personaggio illustrato generico del Figma */}
      <div className="tx-hero__avatar reveal">
        <span className="tx-hero__avatar-blob" aria-hidden="true"></span>
        <img src={profilePhoto} alt="Mario Celzo" />
      </div>

      {/* Titolo grande, seconda riga con parola in gradiente (var(--grad-hero)) */}
      <h1 className="tx-hero__title reveal" style={{ transitionDelay: "60ms" }}>
        <span>{h.tagline[0]}</span> <span className="accent">{h.tagline[1]}</span>
      </h1>

      {/* Pitch */}
      <p className="tx-hero__pitch reveal" style={{ transitionDelay: "120ms" }}>
        {h.pitch}
      </p>

      {/* CTA a pillola: primaria (email) + secondaria (CV) — le stesse due
          del Figma "Get In Touch" / "Download CV". GitHub/LinkedIn restano
          raggiungibili dal footer/contact, non qui, per rispecchiare la
          hero a 2 bottoni del Figma */}
      <div className="tx-hero__ctas reveal" style={{ transitionDelay: "180ms" }}>
        <a
          className="tx-btn tx-btn--primary"
          href={`mailto:${content.contact.email}?subject=${emailSubject}`}
          onClick={() => trackEvent("email_click", { from: "hero" })}
        >
          {h.ctas.email}
        </a>
        <a
          className="tx-btn"
          href="/assets/CV-Mario-Celzo.pdf"
          download
          onClick={() => trackEvent("cv_download", { from: "hero" })}
        >
          {h.ctas.cv}
        </a>
      </div>

      {/* Riga tech loghi, equivalente a "EXPERIENCE WITH" del Figma */}
      <div className="tx-hero__stack reveal" style={{ transitionDelay: "240ms" }}>
        <span className="tx-hero__stack-label">
          {lang === "it" ? "esperienza con" : "experience with"}
        </span>
        <div className="tx-hero__stack-logos">
          {TECH_LOGOS.map((t) => (
            <img key={t.name} src={t.src} alt={t.name} title={t.name} loading="lazy" />
          ))}
        </div>
      </div>

    </section>
  );
}
