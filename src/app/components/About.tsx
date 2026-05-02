/**
 * About.tsx
 *
 * "Who I am" section with a terminal-framed portrait photo and personal info card.
 *
 * Changes from original:
 * - Replaced Unsplash workspace image with the local profile photo
 * - Terminal window title updated to "mario.jpeg"
 * - Removed primary/10 overlay; replaced with a bottom gradient for legibility
 * - Added EXIF-style metadata strip at bottom of photo (ISO · aperture · location)
 * - Left column animation: slide from left (x:-72) instead of scale
 * - Right column animation: slide from right (x:72) instead of y:30
 * - Aspect ratio changed from 4/3 to 4/5 to better frame the portrait orientation
 *
 * Both animations use ease-out-expo cubic-bezier [0.16, 1, 0.3, 1].
 */

import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { Terminal, Database, Workflow } from "lucide-react";
// Local profile photo — same asset used in Hero
import profilePic from "../../assets/f867b45042a06e7a23ba35ed122025885f6d57dd.png";

// Ease-out-expo shared bezier for consistent cinematic feel
const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section header — animated fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/50 border border-border/50 font-mono text-sm text-primary mb-4 shadow-sm">
            <Terminal className="size-4" />
            <span>cat whoami.md</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">About Me</h2>
        </motion.div>

        {/* Two-column grid: portrait left, text right */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto">

          {/* Left column — profile photo in terminal window frame, slides from left */}
          <motion.div
            initial={{ opacity: 0, x: -72 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 1, ease: EXPO }}
            className="relative mb-8 sm:mb-0"
          >
            {/* Terminal chrome wrapper around portrait photo */}
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-border/60 bg-card/60 backdrop-blur-xl flex flex-col">
              {/* macOS-style title bar */}
              <div className="h-10 border-b border-border/60 bg-muted/40 flex items-center px-4 gap-2 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                {/* Updated filename to match local profile asset */}
                <div className="mx-auto flex items-center text-xs text-muted-foreground font-mono">
                  mario.jpeg
                </div>
              </div>

              {/* Image container — fills remaining height, positioned for overlay */}
              <div className="w-full h-full relative">
                {/* Profile photo — local asset, portrait orientation */}
                <ImageWithFallback
                  src={profilePic}
                  alt="Mario Celzo"
                  className="w-full h-full object-cover"
                />

                {/* Bottom gradient — ensures EXIF strip text is legible over any photo */}
                <div
                  className="absolute inset-x-0 bottom-0 z-10"
                  style={{
                    height: 80,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
                  }}
                />

                {/* EXIF-style metadata strip — adds photographic authenticity */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    right: 12,
                    zIndex: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 8,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,.8)',
                  }}
                >
                  <span>ISO 100 · f/1.8</span>
                  <span>Salerno, IT</span>
                </div>
              </div>
            </div>

            {/* Floating icon badges — decorative, hidden on mobile to avoid overflow */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:block absolute -bottom-6 -right-6 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border/60 shadow-lg text-primary"
            >
              <Workflow className="size-6" />
            </motion.div>
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden sm:block absolute -top-6 -left-6 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border/60 shadow-lg text-primary"
            >
              <Database className="size-6" />
            </motion.div>
          </motion.div>

          {/* Right column — text content, slides from right */}
          <motion.div
            initial={{ opacity: 0, x: 72 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 1, ease: EXPO, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-6 font-mono">
              <p className="text-[15px] text-foreground/80 leading-relaxed">
                <span className="text-primary font-bold">{">"}</span> I'm a passionate{" "}
                <span className="text-primary font-bold">Junior DevOps Engineer</span> currently
                pursuing my Master's degree in Software Engineering & IT Management at the University
                of Salerno. I specialize in building resilient infrastructures and automated pipelines.
              </p>

              <p className="text-[15px] text-foreground/80 leading-relaxed">
                <span className="text-primary font-bold">{">"}</span> My journey in tech is driven by
                curiosity and a desire to optimize systems. I thrive in creating cloud-native
                environments, containerizing applications with Docker & Kubernetes, and ensuring
                seamless deployments using Agile methodologies.
              </p>
            </div>

            {/* Stats grid card */}
            <Card className="p-6 bg-card/40 backdrop-blur-md border-border/60 shadow-sm rounded-xl font-mono text-sm">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground mb-1">{"// location"}</p>
                  <p className="font-semibold text-foreground">Italy (Remote)</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{"// status"}</p>
                  <p className="font-semibold text-foreground">Active_Deploy</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{"// education"}</p>
                  <p className="font-semibold text-foreground">MSc. Software Eng.</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{"// langs"}</p>
                  <p className="font-semibold text-foreground">[IT, EN, AR]</p>
                </div>
              </div>
            </Card>

            {/* Traits as CLI flags */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="px-4 py-2 bg-secondary/50 rounded-md border border-border/60 backdrop-blur-sm">
                <p className="text-xs font-mono font-medium text-foreground">--flags="Problem Solving"</p>
              </div>
              <div className="px-4 py-2 bg-secondary/50 rounded-md border border-border/60 backdrop-blur-sm">
                <p className="text-xs font-mono font-medium text-foreground">--flags="Team Collaboration"</p>
              </div>
              <div className="px-4 py-2 bg-secondary/50 rounded-md border border-border/60 backdrop-blur-sm">
                <p className="text-xs font-mono font-medium text-foreground">--flags="Agile Methodology"</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
