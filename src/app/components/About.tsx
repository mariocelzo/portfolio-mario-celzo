import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { Terminal, Database, Server, Workflow } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
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
        
        {/* Gap ridotto su mobile per compensare la mancanza dei badge floating nascosti */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto">
          {/* mb-8 aggiunto su mobile per dare spazio al badge -bottom-6 che sporge dalla card immagine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-8 sm:mb-0"
          >
            {/* Terminal Window Wrapper for Image */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-border/60 bg-card/60 backdrop-blur-xl flex flex-col">
              <div className="h-10 border-b border-border/60 bg-muted/40 flex items-center px-4 gap-2 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="mx-auto flex items-center text-xs text-muted-foreground font-mono">
                  workspace.jpg
                </div>
              </div>
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBsYXB0b3AlMjBuaWdodHxlbnwxfHx8fDE3NzMxNjEwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Coding workspace"
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
            </div>
            
            {/* Badge floating: nascosti su mobile per evitare overflow/scroll orizzontale, visibili da sm in su */}
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

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6 font-mono">
              <p className="text-[15px] text-foreground/80 leading-relaxed">
                <span className="text-primary font-bold">{">"}</span> I'm a passionate <span className="text-primary font-bold">Junior DevOps Engineer</span> currently pursuing my Master's degree in 
                Software Engineering & IT Management at the University of Salerno. 
                I specialize in building resilient infrastructures and automated pipelines.
              </p>
              
              <p className="text-[15px] text-foreground/80 leading-relaxed">
                <span className="text-primary font-bold">{">"}</span> My journey in tech is driven by curiosity and a desire to optimize systems. 
                I thrive in creating cloud-native environments, containerizing applications with Docker & Kubernetes, 
                and ensuring seamless deployments using Agile methodologies.
              </p>
            </div>

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
                  <p className="font-semibold text-foreground">[IT, EN]</p>
                </div>
              </div>
            </Card>

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