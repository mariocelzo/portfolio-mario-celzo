/**
 * Skills.tsx — "docker inspect skills" section.
 *
 * 6 card responsive (auto-fit 320px min) che mostrano categorie di skill:
 * Languages & Frameworks, Frontend & UI, Backend & Data, Design & UX,
 * DevOps & Tools, Soft Skills. Ognuna ha un'icona Lucide nella card header
 * e chip mono per ogni skill.
 *
 * Riferimento design: bundle Skills.jsx
 */
import {
  TerminalSquare,
  Code2,
  Database,
  Globe,
  Palette,
  Server,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";
import { Pill } from "./brand/Primitives";

type Category = {
  title: string;
  icon: ComponentType<{ size?: number }>;
  skills: string[];
};

const categories: Category[] = [
  {
    title: "Languages_&_Frameworks",
    icon: Code2,
    skills: [
      "Python",
      "C",
      "Java",
      "React",
      "React Native",
      "Angular",
      "Next.js",
      "Flutter",
      "jQuery",
    ],
  },
  {
    title: "Frontend_&_UI",
    icon: Globe,
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "Wireframing",
    ],
  },
  {
    title: "Backend_&_Data",
    icon: Database,
    skills: ["SQL", "Cosmos DB", "Supabase", "Firebase", "REST APIs", "Node.js"],
  },
  {
    title: "Design_&_UX",
    icon: Palette,
    skills: [
      "Figma",
      "User Research",
      "Personas",
      "Accessibility",
      "Usability Testing",
    ],
  },
  {
    title: "DevOps_&_Tools",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Kubernetes",
      "Azure",
      "CI/CD",
      "GitHub Actions",
      "SonarCloud",
    ],
  },
  {
    title: "Soft_Skills",
    icon: Server,
    skills: [
      "Problem Solving",
      "Teamwork",
      "Adaptability",
      "Time Management",
      "Organization",
      "Communication",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="mc-section">
      {/* Glow + grid bg per atmosfera */}
      <div className="mc-glow-primary" style={{ top: -300, right: -300 }} />
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
          <Pill icon={TerminalSquare}>docker inspect skills</Pill>
          <h2 className="mc-section-title">Technical Stack</h2>
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
          {categories.map((cat, i) => {
            const Ic = cat.icon;
            return (
              <div
                key={i}
                className="mc-card"
                style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Accent gradient superiore — firma di ogni card */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background:
                      "linear-gradient(90deg, color-mix(in oklab, var(--primary) 40%, transparent), transparent)",
                  }}
                />

                {/* Header icon + titolo */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 20,
                    paddingBottom: 20,
                    borderBottom:
                      "1px solid color-mix(in oklab, var(--border) 40%, transparent)",
                  }}
                >
                  <div
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      background:
                        "color-mix(in oklab, var(--secondary) 50%, transparent)",
                      color: "var(--primary)",
                      border:
                        "1px solid color-mix(in oklab, var(--border) 40%, transparent)",
                    }}
                  >
                    <Ic size={20} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      fontSize: 16,
                      letterSpacing: "-0.01em",
                      margin: 0,
                    }}
                  >
                    {cat.title}
                  </h3>
                </div>

                {/* Chip skills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        background: "color-mix(in oklab, var(--muted) 50%, transparent)",
                        color: "color-mix(in oklab, var(--foreground) 80%, transparent)",
                        border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
                        borderRadius: 6,
                        padding: "4px 12px",
                        fontFamily: "var(--font-mono)",
                        fontSize: 13,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
