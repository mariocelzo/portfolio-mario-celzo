/**
 * Contact.tsx
 *
 * Establish Connection section — contact info cards + interests.
 *
 * Animation updates:
 * - Section wrapper: y:60 + scale fade-in
 * - Contact info cards alternate left/right based on index:
 *     even → x:-72 (from left)
 *     odd  → x:72  (from right)
 * - Stagger delay: i * 0.1s
 * - All transitions: duration 1s, ease-out-expo [0.16, 1, 0.3, 1]
 */

import { Mail, MapPin, Phone, TerminalSquare } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

// Ease-out-expo for cinematic reveals
const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];
const VP = { once: true, margin: "0px 0px -20% 0px" } as const;

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

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
            <TerminalSquare className="size-4" />
            <span>curl -X POST /api/contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Establish Connection
          </h2>
        </motion.div>

        {/* Centered content column */}
        <div className="max-w-2xl mx-auto">
          {/* Intro heading */}
          <motion.h3
            initial={{ opacity: 0, x: -72 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 1, ease: EXPO }}
            className="text-2xl font-mono font-bold mb-6 tracking-tight text-foreground"
          >
            {"// Let's collaborate"}
          </motion.h3>

          {/* Intro copy */}
          <motion.p
            initial={{ opacity: 0, x: 72 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 1, ease: EXPO, delay: 0.05 }}
            className="text-muted-foreground mb-10 leading-relaxed font-mono text-[14px]"
          >
            <span className="text-primary">{">"}</span> I'm currently seeking opportunities for
            junior DevOps or full-stack positions. Open to discussing architecture, CI/CD pipelines,
            or just connecting with fellow developers!
          </motion.p>

          {/* Contact info cards — alternate left/right reveal */}
          <div className="space-y-4 mb-12">
            {[
              {
                icon: Mail,
                label: '"email":',
                content: (
                  <a
                    href="mailto:mariocelzo003@gmail.com"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    "mariocelzo003@gmail.com"
                  </a>
                ),
              },
              {
                icon: Phone,
                label: '"phone":',
                content: (
                  <a
                    href="tel:+393283403546"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    "+39 328 340 3546"
                  </a>
                ),
              },
              {
                icon: MapPin,
                label: '"location":',
                content: <p className="text-foreground">"Salerno, Italy (Remote)"</p>,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -72 : 72 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ duration: 1, ease: EXPO, delay: i * 0.1 }}
                >
                  <Card className="p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300 border-border/60 bg-card/40 backdrop-blur-md rounded-xl font-mono text-sm group">
                    <div className="p-2.5 rounded-md bg-secondary/50 text-primary border border-border/60 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-0.5">{item.label}</p>
                      {item.content}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Interests — fade in from below */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 1, ease: EXPO, delay: 0.3 }}
          >
            <h4 className="font-mono font-bold mb-4 text-primary text-sm">{"/* Interests */"}</h4>
            <div className="flex flex-wrap gap-2">
              {["🏎️ Formula 1", "✈️ Travel", "💻 System Design", "🎮 Gaming"].map((interest, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 bg-secondary/30 border border-border/60 rounded-md shadow-sm"
                >
                  <span className="text-xs font-mono text-foreground/80">{interest}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
