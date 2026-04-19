/**
 * FeatureSlides.tsx — sezione "cinematic marquee" tra Hero e About.
 *
 * Composta da:
 * - <Marquee /> : tagline grande "Software that scales / Infrastructure that doesn't blink"
 *   con kicker live dot.
 * - 4 × <Feature /> : pannelli full-width alternati (left/right) con:
 *     1. CI/CD pipeline (visual stages)
 *     2. Kubernetes cluster (griglia 3x3 di nodi pulsanti)
 *     3. Observability dashboard (bar chart p95)
 *     4. Frontend — code window + tech chips
 *
 * Tutto SVG/CSS puro — nessuna nuova dipendenza.
 * Riferimento design: bundle FeatureSlides.jsx
 */

/* ===== Marquee — tagline di apertura ===== */
function Marquee() {
  return (
    <section
      style={{
        padding: "160px 0",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--muted) 40%, var(--background)) 100%)",
      }}
    >
      <div
        className="mc-container"
        style={{ position: "relative", textAlign: "center" }}
      >
        {/* Kicker "Now playing — the work" con live dot verde */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 14px",
            borderRadius: 9999,
            background: "color-mix(in oklab, var(--card) 70%, transparent)",
            border: "1px solid color-mix(in oklab, var(--border) 50%, transparent)",
            backdropFilter: "blur(12px)",
            font: "500 12px var(--font-mono)",
            color: "var(--muted-foreground)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 9999,
              background: "#27C93F",
              boxShadow: "0 0 8px rgba(39,201,63,.7)",
            }}
          />
          Now playing — the work
        </div>

        {/* Headline cinematografica */}
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(48px, 7vw, 104px)",
            fontWeight: 700,
            letterSpacing: "-0.038em",
            lineHeight: 1.0,
            margin: "0 auto",
            maxWidth: 1000,
            textWrap: "balance",
          }}
        >
          Software that scales.
          <br />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontStyle: "italic",
              fontWeight: 500,
              background:
                "linear-gradient(90deg, var(--primary), color-mix(in oklab, var(--primary) 40%, var(--muted-foreground)))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Infrastructure that doesn't blink.
          </span>
        </h2>

        <p
          style={{
            fontSize: 20,
            lineHeight: 1.5,
            fontWeight: 500,
            color: "var(--muted-foreground)",
            marginTop: 32,
            maxWidth: 640,
            marginInline: "auto",
          }}
        >
          From first commit to blue-green deploy — every project on this page
          ships with a story, a pipeline, and a pager that never rings.
        </p>
      </div>
    </section>
  );
}

/* ===== Tipi + dati dei 4 pannelli ===== */
type FeatureVisualKey = "pipeline" | "k8s" | "dash" | "frontend";

type FeatureData = {
  kicker: string;
  title: string;
  copy: string;
  visual: FeatureVisualKey;
  bg: string;
  tone: "dark" | "light";
};

const features: FeatureData[] = [
  {
    kicker: "CI/CD",
    title: "Pipelines that think.",
    copy: "Build, test, scan, deploy — orchestrated in GitHub Actions with SonarCloud quality gates and zero-downtime rollouts.",
    visual: "pipeline",
    bg: "linear-gradient(135deg, #0A142F 0%, #1E2B4A 60%, #2A3B61 100%)",
    tone: "dark",
  },
  {
    kicker: "Kubernetes",
    title: "Clusters that heal themselves.",
    copy: "Self-orchestrating workloads on Azure AKS — autoscaling, rolling updates, observability baked in from day zero.",
    visual: "k8s",
    bg: "linear-gradient(135deg, #89CFF0 0%, #506182 100%)",
    tone: "light",
  },
  {
    kicker: "Observability",
    title: "Signal, not noise.",
    copy: "Dashboards that tell the real story. Metrics, logs, and traces unified into a single glass pane — so the 3am page never happens.",
    visual: "dash",
    bg: "linear-gradient(135deg, #0A142F 0%, #121B2F 100%)",
    tone: "dark",
  },
  {
    kicker: "Frontend",
    title: "Interfaces, shipped.",
    copy: "Typed React components, Angular dashboards for live infra, React Native on mobile — junior hands-on, learning fast, reviewing PRs with care.",
    visual: "frontend",
    bg: "linear-gradient(135deg, #F4F8FD 0%, #D1DDEB 60%, #89CFF0 100%)",
    tone: "light",
  },
];

/* ===== Un pannello feature — alternato left/right ===== */
function Feature({ f, i }: { f: FeatureData; i: number }) {
  const flipped = i % 2 === 1;
  const fg = f.tone === "dark" ? "#F0F6FC" : "#0A142F";
  const muted = f.tone === "dark" ? "rgba(240,246,252,.7)" : "rgba(10,20,47,.65)";

  return (
    <section
      style={{
        padding: "112px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="mc-container">
        <div
          className="mc-feature-card"
          style={{
            borderRadius: 32,
            background: f.bg,
            overflow: "hidden",
            boxShadow:
              "0 40px 80px -20px rgba(10,20,47,.35), 0 10px 20px -6px rgba(10,20,47,.15)",
            minHeight: 520,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "stretch",
            position: "relative",
          }}
        >
          {/* Testo del pannello */}
          <div
            style={{
              padding: "72px 64px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              order: flipped ? 2 : 1,
              color: fg,
            }}
          >
            <div
              style={{
                font: "500 11px var(--font-mono)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: muted,
                marginBottom: 20,
              }}
            >
              ./{f.kicker.toLowerCase()}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(36px, 4.2vw, 56px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                margin: "0 0 20px 0",
                color: fg,
                textWrap: "balance",
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.55,
                fontWeight: 500,
                color: muted,
                margin: 0,
                maxWidth: 440,
                textWrap: "pretty",
              }}
            >
              {f.copy}
            </p>
          </div>

          {/* Visual del pannello — SVG/CSS */}
          <div
            style={{
              order: flipped ? 1 : 2,
              position: "relative",
              overflow: "hidden",
              background: "rgba(255,255,255,0.03)",
              borderLeft: flipped ? "none" : "1px solid rgba(255,255,255,0.08)",
              borderRight: flipped ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}
          >
            {f.visual === "pipeline" && <PipelineVisual />}
            {f.visual === "k8s" && <K8sVisual />}
            {f.visual === "dash" && <DashVisual />}
            {f.visual === "frontend" && <FrontendVisual />}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Visual 1 — Pipeline CI/CD (4 stages stacked) ===== */
function PipelineVisual() {
  const stages = ["build", "test", "scan", "deploy"];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {stages.map((s, i) => (
          <div
            key={s}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 20px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(14px)",
              borderRadius: 14,
              font: "500 14px var(--font-mono)",
              color: "rgba(240,246,252,.9)",
            }}
          >
            {/* Numero dello stage */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: `linear-gradient(135deg, rgba(137,207,240,${0.3 + i * 0.2}), rgba(137,207,240,${0.1 + i * 0.2}))`,
                border: "1px solid rgba(137,207,240,.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {i + 1}
            </div>
            <span>$ ./{s}.sh</span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#27C93F" }}>
              ✓ passed
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Visual 2 — Kubernetes griglia 3x3 ===== */
function K8sVisual() {
  const nodes = Array.from({ length: 9 });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 72px)",
          gridTemplateRows: "repeat(3, 72px)",
          gap: 16,
        }}
      >
        {nodes.map((_, i) => (
          <div
            key={i}
            style={{
              borderRadius: 14,
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(12px)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // Animazione pulsante sfasata per ogni nodo
              animation: `mc-pulse ${2 + (i % 4) * 0.4}s ease-in-out ${i * 0.15}s infinite`,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#fff",
                boxShadow: "0 0 12px rgba(255,255,255,.8)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Visual 3 — Dashboard p95 latency ===== */
function DashVisual() {
  const bars = [60, 78, 45, 82, 55, 90, 65, 72, 48, 85];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: 48,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 18,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(14px)",
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
            font: "500 11px var(--font-mono)",
            color: "rgba(240,246,252,.7)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span>p95 latency · last 1h</span>
          <span style={{ color: "#27C93F" }}>● live</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 6,
            height: 180,
          }}
        >
          {bars.map((v, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${v}%`,
                background:
                  "linear-gradient(180deg, rgba(137,207,240,.9), rgba(137,207,240,.3))",
                borderRadius: 4,
                border: "1px solid rgba(137,207,240,.4)",
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 16,
            font: "500 11px var(--font-mono)",
            color: "rgba(240,246,252,.6)",
          }}
        >
          <span>42ms</span>
          <span style={{ color: "#F0F6FC" }}>avg 68ms</span>
          <span>118ms</span>
        </div>
      </div>
    </div>
  );
}

/* ===== Visual 4 — Frontend code window + tech chips ===== */
function FrontendVisual() {
  const chips = [
    { label: "React", color: "#61DAFB" },
    { label: "TypeScript", color: "#3178C6" },
    { label: "Angular", color: "#DD0031" },
    { label: "React Native", color: "#61DAFB" },
    { label: "Next.js", color: "#0A142F" },
    { label: "Tailwind", color: "#38BDF8" },
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Mini code window Dashboard.tsx */}
        <div
          style={{
            borderRadius: 16,
            background: "rgba(10,20,47,0.92)",
            border: "1px solid rgba(10,20,47,0.2)",
            boxShadow: "0 20px 40px -10px rgba(10,20,47,.4)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: 9999, background: "#FF5F56" }} />
            <span style={{ width: 10, height: 10, borderRadius: 9999, background: "#FFBD2E" }} />
            <span style={{ width: 10, height: 10, borderRadius: 9999, background: "#27C93F" }} />
            <span
              style={{
                marginLeft: "auto",
                font: "500 11px var(--font-mono)",
                color: "rgba(255,255,255,.5)",
              }}
            >
              Dashboard.tsx
            </span>
          </div>
          <div
            style={{
              padding: 18,
              font: "500 13px var(--font-mono)",
              lineHeight: 1.65,
              color: "#F0F6FC",
            }}
          >
            <div>
              <span style={{ color: "#89CFF0" }}>const</span>{" "}
              <span style={{ color: "#fff" }}>Dashboard</span> = () =&gt; {"{"}
            </div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: "#89CFF0" }}>const</span> [data] ={" "}
              <span style={{ color: "#FFBD2E" }}>useQuery</span>&lt;
              <span style={{ color: "#89CFF0" }}>Metric</span>[]&gt;();
            </div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: "#89CFF0" }}>return</span> &lt;
              <span style={{ color: "#FFBD2E" }}>Chart</span> data={"{data}"} /&gt;;
            </div>
            <div>{"}"}</div>
          </div>
        </div>

        {/* Chip tecnologie */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {chips.map((c) => (
            <div
              key={c.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 12px",
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(10,20,47,0.1)",
                backdropFilter: "blur(12px)",
                borderRadius: 9999,
                font: "500 12px var(--font-mono)",
                color: "#0A142F",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: c.color,
                  boxShadow: `0 0 8px ${c.color}80`,
                }}
              />
              {c.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Export principale ===== */
export function FeatureSlides() {
  return (
    <>
      <Marquee />
      {features.map((f, i) => (
        <Feature key={i} f={f} i={i} />
      ))}
    </>
  );
}
