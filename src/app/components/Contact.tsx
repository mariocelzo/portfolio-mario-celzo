/**
 * Contact.tsx — "curl -X POST /api/contact" section.
 *
 * Sezione contatto centrata (max-width 640px):
 *  - Pill + titolo "Establish Connection"
 *  - Paragrafo intro con prompt ">"
 *  - 3 card info con icona box: email / phone / location (formato JSON `"key": "value"`)
 *  - Chip "Interests" con emoji
 *
 * Niente form — solo info dirette (mailto/tel).
 *
 * Riferimento design: bundle ContactFooter.jsx::Contact
 */
import { TerminalSquare, Mail, Phone, MapPin } from "lucide-react";
import type { ComponentType } from "react";
import { Pill } from "./brand/Primitives";

// Tupla [Icon, key JSON, value, href opzionale]
type Info = [ComponentType<{ size?: number }>, string, string, string | null];

const infos: Info[] = [
  [Mail, "email", "mariocelzo003@gmail.com", "mailto:mariocelzo003@gmail.com"],
  [Phone, "phone", "+39 328 340 3546", "tel:+393283403546"],
  [MapPin, "location", "Salerno, Italy (Remote)", null],
];

const interests = ["🏎️ Formula 1", "✈️ Travel", "💻 System Design", "🎮 Gaming"];

export function Contact() {
  return (
    <section id="contact" className="mc-section">
      {/* Grid background + glow per atmosfera terminale */}
      <div
        className="mc-grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />
      <div className="mc-glow-primary" style={{ top: 0, left: "40%" }} />

      <div className="mc-container" style={{ position: "relative" }}>
        <div className="mc-section__head">
          <Pill icon={TerminalSquare}>curl -X POST /api/contact</Pill>
          <h2 className="mc-section-title">Establish Connection</h2>
        </div>

        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {/* Heading "commento" in stile codice */}
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            {"// Let's collaborate"}
          </h3>

          {/* Paragrafo intro con prompt ">" */}
          <p
            style={{
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            <span style={{ color: "var(--primary)" }}>&gt;</span> I'm currently
            seeking opportunities for junior DevOps or full-stack positions.
            Open to discussing architecture, CI/CD pipelines, or connecting with
            fellow developers!
          </p>

          {/* Card info contatto in formato JSON */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginBottom: 48,
            }}
          >
            {infos.map(([Ic, k, v, href], i) => (
              <div
                key={i}
                className="mc-card"
                style={{
                  padding: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {/* Box icona con background secondary */}
                <div
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    background:
                      "color-mix(in oklab, var(--secondary) 50%, transparent)",
                    border:
                      "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
                    color: "var(--primary)",
                  }}
                >
                  <Ic size={18} />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>
                  <div
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: 11,
                      marginBottom: 2,
                    }}
                  >
                    "{k}":
                  </div>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        color: "var(--foreground)",
                        textDecoration: "none",
                      }}
                    >
                      "{v}"
                    </a>
                  ) : (
                    <div>"{v}"</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Interests come commento C-style + chip emoji */}
          <h4
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: "var(--primary)",
              fontSize: 14,
              marginBottom: 14,
            }}
          >
            {"/* Interests */"}
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {interests.map((int) => (
              <div
                key={int}
                style={{
                  padding: "6px 12px",
                  background:
                    "color-mix(in oklab, var(--secondary) 30%, transparent)",
                  border:
                    "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
                  borderRadius: 10,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                }}
              >
                {int}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
