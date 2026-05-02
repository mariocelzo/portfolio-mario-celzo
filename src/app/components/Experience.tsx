/**
 * Experience.tsx
 *
 * Timeline & Experience section — work history, education, certifications.
 *
 * Animation updates:
 * - Section wrapper: y:60 + scale fade-in
 * - Experience cards: slide from left (x:-72) with index-based stagger delay
 * - Education rows: alternate x:-72 (even) / x:72 (odd) for timeline rhythm
 * - All transitions use ease-out-expo [0.16, 1, 0.3, 1], duration 1s
 * - viewport margin: "0px 0px -20% 0px" — triggers at 20% inside viewport bottom
 */

import { Calendar, GraduationCap, Terminal, GitCommit, GitBranch } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

// Ease-out-expo bezier for cinematic scroll reveals
const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];
// Shared viewport config — triggers animation when element is 20% inside from bottom
const VP = { once: true, margin: "0px 0px -20% 0px" } as const;

const education = [
  {
    degree: "Master's Degree in Software Engineering & IT Management",
    institution: "Università degli Studi di Salerno",
    period: "2025 - Present",
    description: "Advanced studies in software engineering, IT management, and modern development practices.",
  },
  {
    degree: "Bachelor's Degree in Computer Science",
    institution: "Università degli Studi di Salerno",
    period: "2022 - Dec. 2025",
    description: "Comprehensive foundation in computer science, algorithms, data structures, and software development.",
  },
  {
    degree: "Scientific High School Diploma",
    institution: "Liceo Tito Lucrezio Caro",
    period: "2017 - 2022",
    description: "Strong foundation in mathematics, sciences, and analytical thinking.",
  },
];

const experiences = [
  {
    title: "Junior DevOps Engineer",
    company: "Lutech",
    period: "Jan 2026 - Present",
    description:
      "Working as a DevOps Engineer managing infrastructure, deployments, and occasionally assisting with frontend development.",
    responsibilities: [
      "Building and maintaining CI/CD pipelines",
      "Creating, managing, and fixing Kubernetes clusters",
      "Docker containerization and microservices management",
      "Frontend development tasks and dashboards using Angular",
      "Learning and implementing Microsoft Azure and Cosmos DB",
    ],
  },
  {
    title: "Salon Management Assistant",
    company: "Perceberi Seby'Chic",
    period: "Summer 2018-2019",
    description: "Family business activity managing customer service and operations.",
    responsibilities: [
      "Customer service and promotions management",
      "Inventory control and stock management",
      "Multitasking during peak hours",
      "Shift management and opening procedures",
    ],
  },
];

const certifications = [
  "AI Fundamentals Course",
  "Git & GitHub Basics",
  "React Development",
];

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.995 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VP}
          transition={{ duration: 1, ease: EXPO }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/50 border border-border/50 font-mono text-sm text-primary mb-4 shadow-sm">
            <Terminal className="size-4" />
            <span>git log --oneline</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Timeline & Experience
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-20">

          {/* ── Work Experience ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.995 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VP}
            transition={{ duration: 1, ease: EXPO }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-mono font-bold mb-8 flex items-center gap-3 text-foreground">
              <GitBranch className="size-6 text-primary" />
              <span>
                branch: <span className="text-primary">feature/career</span>
              </span>
            </h3>

            <div className="space-y-8">
              {/* Each experience card slides from the left with a staggered delay */}
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -72 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ duration: 1, ease: EXPO, delay: index * 0.1 }}
                >
                  <Card className="p-5 md:p-8 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 border-border/60 bg-card/60 backdrop-blur-xl rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                      <div className="flex items-start gap-4 mb-4 md:mb-0">
                        <div>
                          <h4 className="text-2xl font-bold tracking-tight text-foreground mb-1">
                            {exp.title}
                          </h4>
                          <div className="flex items-center gap-2 text-primary font-mono text-sm">
                            <span>@ {exp.company}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 border border-border/40 px-3 py-1.5 rounded-md font-mono text-xs shrink-0 shadow-sm">
                        <Calendar className="size-3" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-foreground/80 mb-6 leading-relaxed font-mono text-[14px]">
                      <span className="text-primary">{">"}</span> {exp.description}
                    </p>

                    <div className="space-y-3 bg-background/50 p-5 rounded-lg border border-border/40 font-mono text-sm">
                      <p className="font-semibold text-primary uppercase tracking-wider text-xs">
                        {"// Responsibilities"}
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground/90">
                            <span className="text-primary mt-0.5">-</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Education ───────────────────────────────────────────────── */}
          <div className="pt-8">
            <motion.h3
              initial={{ opacity: 0, y: 60, scale: 0.995 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VP}
              transition={{ duration: 1, ease: EXPO }}
              className="text-2xl font-mono font-bold mb-8 flex items-center gap-3 text-foreground"
            >
              <GitBranch className="size-6 text-primary" />
              <span>
                branch: <span className="text-primary">feature/education</span>
              </span>
            </motion.h3>

            {/* Timeline line + alternating cards: even rows from left, odd rows from right */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.4rem] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-border/60">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -72 : 72 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ duration: 1, ease: EXPO, delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-secondary text-primary shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <GitCommit className="size-5" />
                  </div>
                  <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 hover:shadow-lg transition-all duration-300 border-border/60 bg-card/60 backdrop-blur-xl rounded-xl">
                    <div className="flex flex-col mb-3">
                      <div className="flex items-center gap-2 text-muted-foreground mb-3 font-mono text-xs bg-muted/50 border border-border/40 w-fit px-2 py-1 rounded-md">
                        <Calendar className="size-3" />
                        <span>{edu.period}</span>
                      </div>
                      <h4 className="text-lg font-bold leading-tight tracking-tight text-foreground">
                        {edu.degree}
                      </h4>
                      <p className="text-primary font-mono text-xs mt-2">@ {edu.institution}</p>
                    </div>
                    <p className="text-muted-foreground/90 text-sm leading-relaxed font-mono mt-3">
                      {"//"} {edu.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Certifications ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.995 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VP}
            transition={{ duration: 1, ease: EXPO }}
            className="pt-8"
          >
            <h3 className="text-2xl font-mono font-bold mb-8 flex items-center gap-3 text-foreground">
              <GitBranch className="size-6 text-primary" />
              <span>
                branch: <span className="text-primary">docs/certs</span>
              </span>
            </h3>
            <Card className="p-6 border-border/60 bg-card/60 backdrop-blur-xl rounded-xl">
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm py-2 px-4 shadow-sm bg-background border border-border/60 hover:bg-secondary/50 transition-colors rounded-md font-mono text-foreground/80"
                  >
                    <span className="text-primary mr-2">✓</span> {cert}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
