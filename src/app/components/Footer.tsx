/**
 * Footer.tsx — chiusura della pagina con signature "System.exit(0)".
 *
 * - Bottoni ghost icon per GitHub / LinkedIn / Email
 * - Signature mono "System.exit(0)" + copyright + "Compiled with ..." subtitle
 * - Grid background a bassa opacità per coerenza estetica
 *
 * Riferimento design: bundle ContactFooter.jsx::Footer
 */
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { BrandButton } from "./brand/Primitives";

export function Footer() {
  return (
    <footer
      style={{
        borderTop:
          "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
        padding: "48px 0",
        position: "relative",
      }}
    >
      {/* Grid bg a bassa opacità come texture */}
      <div
        className="mc-grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      <div
        className="mc-container"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Social icons */}
        <div style={{ display: "flex", gap: 16 }}>
          <BrandButton
            variant="ghost"
            size="icon"
            href="https://github.com/mariocelzo"
            aria-label="GitHub"
          >
            <Github size={18} />
          </BrandButton>
          <BrandButton
            variant="ghost"
            size="icon"
            href="https://www.linkedin.com/in/mario-celzo-40917a2b9/"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </BrandButton>
          <BrandButton
            variant="ghost"
            size="icon"
            href="mailto:mariocelzo003@gmail.com"
            aria-label="Email"
          >
            <Mail size={18} />
          </BrandButton>
        </div>

        {/* Signature mono */}
        <div
          style={{ textAlign: "center", fontFamily: "var(--font-mono)" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              color:
                "color-mix(in oklab, var(--foreground) 80%, transparent)",
              marginBottom: 6,
            }}
          >
            <Terminal size={14} style={{ color: "var(--primary)" }} />{" "}
            System.exit(0)
          </div>
          <p
            style={{
              fontSize: 12,
              color: "var(--muted-foreground)",
              margin: 0,
            }}
          >
            © 2026 Mario Celzo. All rights reserved.
          </p>
          <p
            style={{
              fontSize: 10,
              color:
                "color-mix(in oklab, var(--muted-foreground) 60%, transparent)",
              marginTop: 8,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
            }}
          >
            Compiled with React · Tailwind v4 · Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
