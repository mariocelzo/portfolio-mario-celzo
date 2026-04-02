import { Mail, MapPin, Phone, TerminalSquare } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

export function Contact() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Intestazione sezione */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/50 border border-border/50 font-mono text-sm text-primary mb-4 shadow-sm">
            <TerminalSquare className="size-4" />
            <span>curl -X POST /api/contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Establish Connection</h2>
        </motion.div>

        {/* Contenuto centrato: testo + info di contatto + interessi */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <motion.h3 variants={itemVariants} className="text-2xl font-mono font-bold mb-6 tracking-tight text-foreground">
            {"// Let's collaborate"}
          </motion.h3>
          <motion.p variants={itemVariants} className="text-muted-foreground mb-10 leading-relaxed font-mono text-[14px]">
            <span className="text-primary">{">"}</span> I'm currently seeking opportunities for junior DevOps or full-stack positions.
            Open to discussing architecture, CI/CD pipelines, or just connecting with fellow developers!
          </motion.p>

          {/* Card contatti: email, telefono, location */}
          <div className="space-y-4 mb-12">
            <motion.div variants={itemVariants}>
              <Card className="p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300 border-border/60 bg-card/40 backdrop-blur-md rounded-xl font-mono text-sm group">
                <div className="p-2.5 rounded-md bg-secondary/50 text-primary border border-border/60 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="size-4" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">"email":</p>
                  <a href="mailto:mariocelzo003@gmail.com" className="text-foreground hover:text-primary transition-colors">
                    "mariocelzo003@gmail.com"
                  </a>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300 border-border/60 bg-card/40 backdrop-blur-md rounded-xl font-mono text-sm group">
                <div className="p-2.5 rounded-md bg-secondary/50 text-primary border border-border/60 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone className="size-4" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">"phone":</p>
                  <a href="tel:+393283403546" className="text-foreground hover:text-primary transition-colors">
                    "+39 328 340 3546"
                  </a>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300 border-border/60 bg-card/40 backdrop-blur-md rounded-xl font-mono text-sm group">
                <div className="p-2.5 rounded-md bg-secondary/50 text-primary border border-border/60 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">"location":</p>
                  <p className="text-foreground">"Salerno, Italy (Remote)"</p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Interessi personali */}
          <motion.div variants={itemVariants}>
            <h4 className="font-mono font-bold mb-4 text-primary text-sm">{"/* Interests */"}</h4>
            <div className="flex flex-wrap gap-2">
              {["🏎️ Formula 1", "✈️ Travel", "💻 System Design", "🎮 Gaming"].map((interest, i) => (
                <div key={i} className="px-3 py-1.5 bg-secondary/30 border border-border/60 rounded-md shadow-sm">
                  <span className="text-xs font-mono text-foreground/80">{interest}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
