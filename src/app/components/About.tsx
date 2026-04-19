/**
 * About.tsx — "cat whoami.md" section.
 *
 * Layout:
 * - Colonna sinistra: finestra "terminal" con foto profilo (aspect 4:5)
 *   + due icone flottanti (Workflow, Database) come badge glass.
 * - Colonna destra: paragrafi con prompt ">", card info (location/status/
 *   education/langs) e "--flags=" chip dei soft skills.
 *
 * Riferimento design: bundle About.jsx
 */
import { Terminal, Workflow, Database } from "lucide-react";
import { Pill, WindowChrome } from "./brand/Primitives";

export function About() {
  return (
    <section id="about" className="mc-section">
      {/* Grid background a bassa opacità come texture */}
      <div
        className="mc-grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />
      <div className="mc-container" style={{ position: "relative" }}>
        {/* Pill + titolo */}
        <div className="mc-section__head">
          <Pill icon={Terminal}>cat whoami.md</Pill>
          <h2 className="mc-section-title">About Me</h2>
        </div>

        <div
          className="mc-about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            maxWidth: 1100,
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          {/* ===== Terminal window con foto ===== */}
          <div style={{ position: "relative" }}>
            <div
              className="mc-window"
              style={{
                aspectRatio: "4/5",
                boxShadow:
                  "0 40px 80px -20px rgba(10,20,47,.35), 0 10px 20px -6px rgba(10,20,47,.15)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <WindowChrome title="mario.jpeg" />
              <div
                style={{
                  flex: 1,
                  position: "relative",
                  overflow: "hidden",
                  background: "#0A142F",
                }}
              >
                {/* Foto profilo — dal /public */}
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
                {/* Gradiente in basso per migliorare leggibilità metadata EXIF */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(10,20,47,.35) 100%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Metadata EXIF finte — in stile fotocamera */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    right: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.8)",
                  }}
                >
                  <span>ISO 100 · f/1.8</span>
                  <span>Salerno, IT</span>
                </div>
              </div>
            </div>

            {/* Icona flottante — badge Workflow */}
            <div
              className="mc-float"
              style={{
                position: "absolute",
                bottom: -24,
                right: -24,
                padding: 16,
                background: "color-mix(in oklab, var(--background) 90%, transparent)",
                backdropFilter: "blur(12px)",
                border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
                borderRadius: 14,
                boxShadow: "var(--shadow-lg)",
                color: "var(--primary)",
              }}
            >
              <Workflow size={26} />
            </div>
            {/* Icona flottante — badge Database (animationDelay sfalsato) */}
            <div
              className="mc-float"
              style={{
                position: "absolute",
                top: -24,
                left: -24,
                padding: 16,
                background: "color-mix(in oklab, var(--background) 90%, transparent)",
                backdropFilter: "blur(12px)",
                border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
                borderRadius: 14,
                boxShadow: "var(--shadow-lg)",
                color: "var(--primary)",
                animationDelay: "1s",
              }}
            >
              <Database size={26} />
            </div>
          </div>

          {/* ===== Copy + card info + flag chips ===== */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Paragrafi con prompt ">" */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 15,
                lineHeight: 1.7,
                color: "color-mix(in oklab, var(--foreground) 80%, transparent)",
              }}
            >
              <p style={{ margin: "0 0 16px 0" }}>
                <span style={{ color: "var(--primary)", fontWeight: 700 }}>&gt;</span>{" "}
                I'm a passionate{" "}
                <strong style={{ color: "var(--primary)" }}>Junior DevOps Engineer</strong>{" "}
                pursuing my Master's in Software Engineering &amp; IT Management at
                Università degli Studi di Salerno. I specialize in building
                resilient infrastructures and automated pipelines.
              </p>
              <p style={{ margin: 0 }}>
                <span style={{ color: "var(--primary)", fontWeight: 700 }}>&gt;</span>{" "}
                My journey is driven by curiosity and a desire to optimize systems
                — cloud-native environments, containerization with Docker &amp;
                Kubernetes, seamless deployments with Agile.
              </p>
            </div>

            {/* Card info 2x2 — location/status/education/langs */}
            <div
              style={{
                padding: 24,
                borderRadius: 12,
                border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
                background: "color-mix(in oklab, var(--card) 40%, transparent)",
                backdropFilter: "blur(12px)",
                fontFamily: "var(--font-mono)",
                fontSize: 14,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                }}
              >
                {[
                  ["location", "Italy (Remote)"],
                  ["status", "Active_Deploy"],
                  ["education", "MSc. Software Eng."],
                  ["langs", "[IT, EN]"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div
                      style={{
                        color: "var(--muted-foreground)",
                        marginBottom: 4,
                      }}
                    >
                      {`// ${k}`}
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "var(--foreground)",
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flag chips — soft skills in stile CLI flags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Problem Solving", "Team Collaboration", "Agile Methodology"].map(
                (f) => (
                  <div
                    key={f}
                    style={{
                      padding: "8px 16px",
                      background: "color-mix(in oklab, var(--secondary) 50%, transparent)",
                      border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
                      borderRadius: 10,
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {`--flags="${f}"`}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
