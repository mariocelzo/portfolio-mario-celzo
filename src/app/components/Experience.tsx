/**
 * Experience.tsx — "git log --oneline" section.
 *
 * Tre "branch" in stile git log:
 *  1. feature/career       → card esperienze lavorative
 *  2. feature/education    → timeline commit-dot verticale
 *  3. docs/certs           → chip certificazioni
 *
 * Riferimento design: bundle Experience.jsx
 */
import { Terminal, GitBranch, GitCommit, Calendar, Check } from "lucide-react";
import { Pill } from "./brand/Primitives";

/* ===== Dati hardcoded — stessi del bundle ===== */
const experiences = [
  {
    title: "Junior DevOps Engineer",
    company: "Lutech",
    period: "Jan 2026 - Present",
    description:
      "Managing infrastructure, deployments, and occasionally assisting with frontend development.",
    responsibilities: [
      "Building and maintaining CI/CD pipelines",
      "Creating, managing, and fixing Kubernetes clusters",
      "Docker containerization and microservices",
      "Frontend dashboards using Angular",
      "Microsoft Azure and Cosmos DB",
    ],
  },
  {
    title: "Salon Management Assistant",
    company: "Perceberi Seby'Chic",
    period: "Summer 2018-2019",
    description: "Family business managing customer service and operations.",
    responsibilities: [
      "Customer service and promotions",
      "Inventory control and stock",
      "Multitasking during peak hours",
      "Shift management and opening procedures",
    ],
  },
];

const education = [
  {
    degree: "Master's Degree in Software Engineering & IT Management",
    institution: "Università degli Studi di Salerno",
    period: "2025 - Present",
    description:
      "Advanced studies in software engineering, IT management, and modern development practices.",
  },
  {
    degree: "Bachelor's Degree in Computer Science",
    institution: "Università degli Studi di Salerno",
    period: "2022 - Dec. 2025",
    description:
      "Comprehensive foundation in computer science, algorithms, and software development.",
  },
  {
    degree: "Scientific High School Diploma",
    institution: "Liceo Tito Lucrezio Caro",
    period: "2017 - 2022",
    description:
      "Strong foundation in mathematics, sciences, and analytical thinking.",
  },
];

const certs = ["AI Fundamentals Course", "Git & GitHub Basics", "React Development"];

export function Experience() {
  return (
    <section
      id="experience"
      className="mc-section"
      style={{ background: "color-mix(in oklab, var(--muted) 30%, transparent)" }}
    >
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
        <div className="mc-section__head">
          <Pill icon={Terminal}>git log --oneline</Pill>
          <h2 className="mc-section-title">Timeline &amp; Experience</h2>
        </div>

        <div
          style={{
            maxWidth: 880,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 80,
          }}
        >
          {/* ===== Branch feature/career — esperienze ===== */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 32,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <GitBranch size={22} style={{ color: "var(--primary)" }} />
              <span>
                branch:{" "}
                <span style={{ color: "var(--primary)" }}>feature/career</span>
              </span>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {experiences.map((e, i) => (
                <div
                  key={i}
                  className="mc-card"
                  style={{ padding: 32, position: "relative" }}
                >
                  {/* Bordo sinistro primary — signature del brand */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 3,
                      height: "100%",
                      background:
                        "color-mix(in oklab, var(--primary) 40%, transparent)",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 16,
                      marginBottom: 20,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 700,
                          letterSpacing: "-0.015em",
                          marginBottom: 4,
                        }}
                      >
                        {e.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--primary)",
                          fontSize: 14,
                        }}
                      >
                        @ {e.company}
                      </div>
                    </div>
                    {/* Chip periodo con icona calendario */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 12px",
                        background:
                          "color-mix(in oklab, var(--muted) 50%, transparent)",
                        border:
                          "1px solid color-mix(in oklab, var(--border) 40%, transparent)",
                        borderRadius: 10,
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: "var(--muted-foreground)",
                      }}
                    >
                      <Calendar size={14} />
                      {e.period}
                    </div>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "color-mix(in oklab, var(--foreground) 80%, transparent)",
                      marginBottom: 20,
                    }}
                  >
                    <span style={{ color: "var(--primary)" }}>&gt;</span>{" "}
                    {e.description}
                  </p>

                  {/* Box "Responsibilities" */}
                  <div
                    style={{
                      padding: 20,
                      background:
                        "color-mix(in oklab, var(--background) 50%, transparent)",
                      borderRadius: 10,
                      border:
                        "1px solid color-mix(in oklab, var(--border) 40%, transparent)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                    }}
                  >
                    <div
                      style={{
                        color: "var(--primary)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        fontSize: 11,
                        marginBottom: 12,
                      }}
                    >
                      {"// Responsibilities"}
                    </div>
                    <ul
                      className="mc-resp-grid"
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px 24px",
                      }}
                    >
                      {e.responsibilities.map((r, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            color:
                              "color-mix(in oklab, var(--muted-foreground) 90%, transparent)",
                          }}
                        >
                          <span style={{ color: "var(--primary)", marginTop: 2 }}>
                            -
                          </span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Branch feature/education — timeline verticale ===== */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 32,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <GitBranch size={22} style={{ color: "var(--primary)" }} />
              <span>
                branch:{" "}
                <span style={{ color: "var(--primary)" }}>feature/education</span>
              </span>
            </h3>
            <div style={{ position: "relative" }}>
              {/* Linea verticale che collega i commit dot */}
              <div
                style={{
                  position: "absolute",
                  left: 23,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "color-mix(in oklab, var(--border) 60%, transparent)",
                }}
              />
              {education.map((ed, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 32,
                    marginBottom: 24,
                    position: "relative",
                  }}
                >
                  {/* Commit dot */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      border: "4px solid var(--background)",
                      background: "var(--secondary)",
                      color: "var(--primary)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <GitCommit size={18} />
                  </div>
                  <div className="mc-card" style={{ flex: 1, padding: 20 }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "4px 10px",
                        background:
                          "color-mix(in oklab, var(--muted) 50%, transparent)",
                        border:
                          "1px solid color-mix(in oklab, var(--border) 40%, transparent)",
                        borderRadius: 8,
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--muted-foreground)",
                        marginBottom: 10,
                      }}
                    >
                      <Calendar size={12} />
                      {ed.period}
                    </div>
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                      }}
                    >
                      {ed.degree}
                    </div>
                    <div
                      style={{
                        color: "var(--primary)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        marginTop: 6,
                      }}
                    >
                      @ {ed.institution}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: "var(--muted-foreground)",
                        marginTop: 12,
                      }}
                    >
                      // {ed.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Branch docs/certs — chip certificazioni ===== */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 32,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <GitBranch size={22} style={{ color: "var(--primary)" }} />
              <span>
                branch:{" "}
                <span style={{ color: "var(--primary)" }}>docs/certs</span>
              </span>
            </h3>
            <div className="mc-card" style={{ padding: 24 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {certs.map((c) => (
                  <div
                    key={c}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 16px",
                      background: "var(--background)",
                      border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
                      borderRadius: 10,
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      color: "color-mix(in oklab, var(--foreground) 80%, transparent)",
                    }}
                  >
                    <span style={{ color: "var(--primary)" }}>
                      <Check size={14} />
                    </span>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
