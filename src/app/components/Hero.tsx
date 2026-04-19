/**
 * Hero.tsx — landing section con terminal YAML window + foto fluttuante.
 *
 * Layout:
 * - Colonna sinistra: pill "$ ./start-devops-journey.sh", H1 con gradient mono italic,
 *   sottotitolo, CTA primary (Initialize_Contact) + outline (CV.pdf download),
 *   social icon buttons (GitHub/LinkedIn).
 * - Colonna destra: "mac window" con contenuto YAML (profile.yml) e foto profilo
 *   fluttuante in un Apple-style rounded frame.
 *
 * Riferimento design: bundle Hero.jsx
 * Backend preservato: CV scarica /cv-mario-celzo.pdf, link GitHub reale.
 */
import {
  Terminal,
  Code2,
  Download,
  Github,
  Linkedin,
  GitBranch,
  TerminalSquare,
} from "lucide-react";
import {
  BrandButton,
  Pill,
  WindowChrome,
  smoothScrollTo,
} from "./brand/Primitives";
import type { ReactNode } from "react";

// Helper per una riga YAML "key: value"
function KV({ k, children }: { k: string; children?: ReactNode }) {
  return (
    <>
      <span style={{ color: "var(--primary)", fontWeight: 700 }}>{k}:</span>{" "}
      <span>{children}</span>
    </>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      {/* Grid background con mask radiale — signature motif */}
      <div
        className="mc-grid-bg mc-grid-mask"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />
      {/* Glow primary per "illuminare" la sezione dall'angolo */}
      <div className="mc-glow-primary" style={{ top: -200, right: -200 }} />

      <div className="mc-container" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="mc-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* ===== Colonna sinistra — copy ===== */}
          <div style={{ maxWidth: 680 }} className="mc-animate-fade-up">
            <Pill icon={Terminal}>$ ./start-devops-journey.sh</Pill>

            <h1
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(40px, 5vw, 72px)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.0,
                margin: "28px 0 28px 0",
                position: "relative",
                zIndex: 2,
              }}
            >
              Architecting
              <br />
              {/* Parola chiave in mono italic con gradient text */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  background:
                    "linear-gradient(90deg, var(--primary) 0%, color-mix(in oklab, var(--primary) 55%, transparent) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Infrastructure.
              </span>
            </h1>

            <p
              style={{
                fontSize: 20,
                color: "var(--muted-foreground)",
                lineHeight: 1.55,
                margin: "0 0 40px 0",
                fontWeight: 500,
                maxWidth: 520,
                textWrap: "pretty",
              }}
            >
              I build resilient cloud environments, microservices, and automated
              pipelines. Turning coffee into scalable systems.
            </p>

            {/* CTA primari */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 32,
              }}
            >
              <BrandButton
                variant="primary"
                size="lg"
                onClick={() => smoothScrollTo("contact")}
              >
                <Code2 size={18} /> Initialize_Contact
              </BrandButton>
              {/* CV download: link invariato dal backend — /public/cv-mario-celzo.pdf */}
              <BrandButton
                variant="outline"
                size="lg"
                href="/cv-mario-celzo.pdf"
                download="CV-Mario-Celzo.pdf"
              >
                <Download size={18} /> CV.pdf
              </BrandButton>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 12 }}>
              <BrandButton
                variant="ghost"
                size="icon"
                href="https://github.com/mariocelzo"
                aria-label="GitHub"
              >
                <Github size={20} />
              </BrandButton>
              <BrandButton
                variant="ghost"
                size="icon"
                href="https://www.linkedin.com/in/mario-celzo-40917a2b9/"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </BrandButton>
            </div>
          </div>

          {/* ===== Colonna destra — YAML terminal window + foto ===== */}
          <div
            style={{ position: "relative", paddingBottom: 40 }}
            className="mc-animate-fade-up"
          >
            <div className="mc-window" style={{ boxShadow: "var(--shadow-2xl)" }}>
              <WindowChrome
                title={
                  <>
                    <GitBranch size={12} /> main ~ profile.yml
                  </>
                }
              />
              <div
                style={{
                  padding: 32,
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  lineHeight: 1.8,
                }}
              >
                <div style={{ color: "var(--muted-foreground)", marginBottom: 8 }}>
                  ---
                </div>
                <div><KV k="apiVersion">v1</KV></div>
                <div><KV k="kind">Developer</KV></div>
                <div><KV k="metadata" /></div>
                <div style={{ paddingLeft: 16 }}><KV k="name">"Mario Celzo"</KV></div>
                <div style={{ paddingLeft: 16 }}><KV k="role">"Jr DevOps Engineer"</KV></div>
                <div style={{ paddingLeft: 16 }}><KV k="company">"Lutech"</KV></div>
                <div><KV k="spec" /></div>
                <div style={{ paddingLeft: 16 }}><KV k="stack" /></div>
                <div style={{ paddingLeft: 32 }}>
                  <span style={{ color: "var(--muted-foreground)" }}>-</span> Kubernetes
                </div>
                <div style={{ paddingLeft: 32 }}>
                  <span style={{ color: "var(--muted-foreground)" }}>-</span> Docker
                </div>
                <div style={{ paddingLeft: 32 }}>
                  <span style={{ color: "var(--muted-foreground)" }}>-</span> Azure
                </div>
                <div style={{ paddingLeft: 32 }}>
                  <span style={{ color: "var(--muted-foreground)" }}>-</span> CI/CD
                </div>
                {/* Prompt finale con cursor lampeggiante */}
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontWeight: 600,
                  }}
                >
                  <TerminalSquare size={16} style={{ color: "var(--primary)" }} />
                  root@mario:~$ <span className="mc-blink">_</span>
                </div>
              </div>
            </div>

            {/* Foto profilo fluttuante — frame glass rounded */}
            <div
              className="mc-float"
              style={{
                position: "absolute",
                bottom: -32,
                left: -32,
                padding: 6,
                background: "color-mix(in oklab, var(--background) 85%, transparent)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid color-mix(in oklab, var(--border) 50%, transparent)",
                borderRadius: 28,
                boxShadow:
                  "0 30px 60px -20px rgba(10,20,47,.35), 0 8px 20px -6px rgba(10,20,47,.15)",
              }}
            >
              <div
                style={{
                  width: 136,
                  height: 136,
                  borderRadius: 22,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Foto profilo dal /public — preservato dal backend */}
                <img
                  src="/favicon.png"
                  alt="Mario Celzo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {/* Highlight interno per effetto "vetrino lucidato" */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    boxShadow:
                      "inset 0 0 0 1px rgba(255,255,255,.2), inset 0 1px 0 rgba(255,255,255,.3)",
                    borderRadius: 22,
                    pointerEvents: "none",
                  }}
                />
              </div>
              {/* Status dot verde in alto a destra — "active" */}
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  width: 14,
                  height: 14,
                  borderRadius: 9999,
                  background: "#27C93F",
                  border: "3px solid var(--background)",
                  boxShadow:
                    "0 0 0 1px rgba(39,201,63,.4), 0 0 12px rgba(39,201,63,.6)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
