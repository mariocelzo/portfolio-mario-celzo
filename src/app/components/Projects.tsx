/**
 * Projects.tsx — "kubectl get deployments" section.
 *
 * 5 card con gradient visuals:
 *  - TARGET, NearBite, BiblioFlow, BODY-LIFE, PetClinic Dependability
 * Ogni card ha:
 *  - card__header con codice YAML
 *  - visual con gradient + label centrale
 *  - version badge, tag chip
 *  - bottoni: [Live_Demo] o [Demo_Soon] + GitHub icon
 *
 * NOTE BACKEND preservate:
 *  - Link GitHub reali
 *  - NearBite con demoSoon:true → mostra [Demo_Soon] disabilitato
 *  - PetClinic senza demo → solo GitHub
 *
 * Riferimento design: bundle Projects.jsx
 */
import { Box, Code2, Globe, Github } from "lucide-react";
import { BrandButton, Pill, VersionBadge } from "./brand/Primitives";

type Project = {
  title: string;
  year: string;
  description: string;
  tags: string[];
  featured?: boolean;
  demo?: string;
  demoSoon?: boolean;
  github: string;
  gradient: string;
};

const projects: Project[] = [
  {
    title: "TARGET",
    year: "2024",
    description:
      "Platform for students to buy/sell university notes with social features. Team of 3, Agile, strong UX/UI focus.",
    tags: ["UX/UI Design", "Agile", "Social Platform", "Figma"],
    featured: true,
    demo: "https://v0-target-svp6klexsij.vercel.app",
    github: "https://github.com/mariocelzo/Target",
    gradient: "linear-gradient(135deg, #2A3B61, #89CFF0)",
  },
  {
    title: "NearBite",
    year: "2025",
    description:
      "Cross-platform mobile app for restaurant reviews with real-time updates, Google Maps, and AI recommendations.",
    tags: ["React Native", "Expo", "AI", "Google Maps API"],
    featured: true,
    demoSoon: true,
    github: "https://github.com/mariocelzo/resturant-finder",
    gradient: "linear-gradient(135deg, #0A142F, #506182)",
  },
  {
    title: "BiblioFlow",
    year: "2023",
    description:
      "University library management with sensor-based study-post tracking, dashboard, accessibility & sustainability focus.",
    tags: ["Human Computation", "IoT", "Next.js", "PWA", "Accessibility"],
    featured: true,
    demo: "https://biblioflow-app.vercel.app",
    github: "https://github.com/mariocelzo/biblioflow-app",
    gradient: "linear-gradient(135deg, #506182, #D1DDEB)",
  },
  {
    title: "BODY-LIFE",
    year: "2023",
    description:
      "Fitness app with social features and HMI monitoring. Interactive dashboard, workouts, full UX/UI in Figma.",
    tags: ["React", "Java", "Figma", "Wireframing"],
    github: "https://github.com/mariocelzo/body-life",
    demo: "https://body-life-teal.vercel.app",
    gradient: "linear-gradient(135deg, #1E2B4A, #829EC2)",
  },
  {
    title: "PetClinic Dependability",
    year: "2023",
    description:
      "Software dependability analysis for Spring PetClinic — fault injection, FMEA, reliability analysis, DevOps pipeline.",
    tags: ["DevOps", "CI/CD", "Docker", "SonarCloud", "GitHub Actions"],
    github: "https://github.com/mariocelzo/petclinic-dependability-analysis",
    gradient: "linear-gradient(135deg, #0A142F, #2A3B61)",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="mc-section"
      style={{ background: "color-mix(in oklab, var(--muted) 20%, transparent)" }}
    >
      <div className="mc-container" style={{ position: "relative" }}>
        <div className="mc-section__head">
          <Pill icon={Box}>kubectl get deployments</Pill>
          <h2 className="mc-section-title">Deployed Work</h2>
          <p className="mc-comment" style={{ fontSize: 14, margin: 0 }}>
            A collection of microservices, apps, and platforms I've built.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {projects.map((p, i) => (
            <div
              key={i}
              className="mc-card"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* Header della card — nome file YAML */}
              <div className="mc-card__header">
                <Code2 size={12} /> <span>{p.title.toLowerCase()}.yaml</span>
              </div>

              {/* Visual con gradient + titolo centrato */}
              <div
                style={{
                  aspectRatio: "16/10",
                  background: p.gradient,
                  position: "relative",
                }}
              >
                {/* Highlight diagonale per dare profondità */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15), transparent 60%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: 28,
                    color: "rgba(255,255,255,0.92)",
                    letterSpacing: "-0.02em",
                    textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {p.title}
                </div>
                {/* Badge "★ ACTIVE" per i progetti featured */}
                {p.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "color-mix(in oklab, var(--card) 90%, transparent)",
                      backdropFilter: "blur(10px)",
                      color: "var(--primary)",
                      padding: "4px 10px",
                      borderRadius: 6,
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 700,
                      border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    ★ ACTIVE
                  </div>
                )}
              </div>

              {/* Body della card */}
              <div
                style={{
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {p.title}
                  </h3>
                  <VersionBadge>v{p.year}.0</VersionBadge>
                </div>

                <p
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: 13,
                    flexGrow: 1,
                    lineHeight: 1.6,
                    fontFamily: "var(--font-mono)",
                    marginBottom: 20,
                  }}
                >
                  <span style={{ color: "var(--primary)", marginRight: 4 }}>&gt;</span>
                  {p.description}
                </p>

                {/* Tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 24,
                  }}
                >
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        background: "color-mix(in oklab, var(--secondary) 50%, transparent)",
                        color: "color-mix(in oklab, var(--foreground) 80%, transparent)",
                        border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
                        borderRadius: 4,
                        padding: "2px 8px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons — demo / demoSoon / solo GitHub */}
                <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
                  {p.demo ? (
                    <BrandButton
                      size="sm"
                      variant="primary"
                      href={p.demo}
                      style={{ flex: 1 }}
                    >
                      <Globe size={14} /> [Live_Demo]
                    </BrandButton>
                  ) : p.demoSoon ? (
                    <BrandButton
                      size="sm"
                      variant="secondary"
                      disabled
                      style={{ flex: 1, opacity: 0.6, cursor: "not-allowed" }}
                    >
                      <Globe size={14} /> [Demo_Soon]
                    </BrandButton>
                  ) : null}
                  <BrandButton
                    size="sm"
                    variant="outline"
                    href={p.github}
                    aria-label="GitHub"
                    style={{ padding: "0 12px" }}
                  >
                    <Github size={16} />
                  </BrandButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA finale — cd ~/github/repositories */}
        <div style={{ marginTop: 80, textAlign: "center" }}>
          <p className="mc-comment" style={{ fontSize: 14, marginBottom: 24 }}>
            Looking for more academic projects in Algorithms, Databases, Web
            Programming, and OS?
          </p>
          <BrandButton
            variant="outline"
            size="lg"
            href="https://github.com/mariocelzo"
          >
            <Github size={16} /> cd ~/github/repositories
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
