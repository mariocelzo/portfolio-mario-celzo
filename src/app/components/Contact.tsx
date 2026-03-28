import { Mail, MapPin, Phone, Send, TerminalSquare, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { motion } from "motion/react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─────────────────────────────────────────────────────────────
// CONFIGURAZIONE EMAILJS
// Per attivare il form:
//   1. Vai su https://www.emailjs.com e crea un account gratuito
//   2. Crea un "Email Service" collegato a Gmail (mariocelzo003@gmail.com)
//   3. Crea un "Email Template" con le variabili: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//   4. Copia i tuoi ID qui sotto
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // es. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // es. "template_xyz456"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // es. "abc123xyz"

// Stato del form: idle | loading | success | error
type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  // Riferimento al form per EmailJS sendForm
  const formRef = useRef<HTMLFormElement>(null);

  // Stato del processo di invio (idle, loading, success, error)
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");

    try {
      // Invia il form tramite EmailJS — usa i field name come variabili nel template
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset(); // Svuota il form dopo invio riuscito
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
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

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto items-start">
          {/* Colonna sinistra: info di contatto */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-mono font-bold mb-6 tracking-tight text-foreground">
              {"// Let's collaborate"}
            </motion.h3>
            <motion.p variants={itemVariants} className="text-muted-foreground mb-10 text-lg leading-relaxed font-mono text-[14px]">
              <span className="text-primary">{">"}</span> I'm currently seeking opportunities for junior DevOps or full-stack positions.
              Open to discussing architecture, CI/CD pipelines, or just connecting with fellow developers!
            </motion.p>

            <div className="space-y-4">
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

            <motion.div variants={itemVariants} className="mt-12">
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

          {/* Colonna destra: form di contatto stile terminale */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-xl overflow-hidden shadow-2xl relative z-10">
              {/* Barra superiore stile terminale */}
              <div className="h-10 border-b border-border/60 bg-muted/40 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="mx-auto flex items-center text-xs text-muted-foreground font-mono">
                  contact-form.json
                </div>
              </div>

              <Card className="p-6 md:p-8 border-none bg-transparent shadow-none rounded-none">
                {/* Messaggio di successo */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 mb-5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 font-mono text-sm"
                  >
                    <CheckCircle className="size-5 shrink-0" />
                    <span>Payload sent! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {/* Messaggio di errore */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 mb-5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-sm"
                  >
                    <AlertCircle className="size-5 shrink-0" />
                    <span>Transmission failed. Try again or email directly.</span>
                  </motion.div>
                )}

                {/* Form — i name degli input devono corrispondere alle variabili del template EmailJS */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 font-mono text-sm">
                  <div>
                    <label htmlFor="name" className="block text-primary font-bold mb-2">
                      "name":
                    </label>
                    {/* name="from_name" → variabile {{from_name}} nel template EmailJS */}
                    <Input
                      id="name"
                      name="from_name"
                      placeholder='"Enter your name"'
                      className="bg-background/50 border-border/60 focus:border-primary focus:ring-1 focus:ring-primary transition-all h-11 rounded-md px-3 font-mono text-sm"
                      required
                      disabled={status === "loading"}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-primary font-bold mb-2">
                      "email":
                    </label>
                    {/* name="from_email" → variabile {{from_email}} nel template EmailJS */}
                    <Input
                      id="email"
                      name="from_email"
                      type="email"
                      placeholder='"your@email.com"'
                      className="bg-background/50 border-border/60 focus:border-primary focus:ring-1 focus:ring-primary transition-all h-11 rounded-md px-3 font-mono text-sm"
                      required
                      disabled={status === "loading"}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-primary font-bold mb-2">
                      "subject":
                    </label>
                    {/* name="subject" → variabile {{subject}} nel template EmailJS */}
                    <Input
                      id="subject"
                      name="subject"
                      placeholder='"What is this regarding?"'
                      className="bg-background/50 border-border/60 focus:border-primary focus:ring-1 focus:ring-primary transition-all h-11 rounded-md px-3 font-mono text-sm"
                      required
                      disabled={status === "loading"}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-primary font-bold mb-2">
                      "message":
                    </label>
                    {/* name="message" → variabile {{message}} nel template EmailJS */}
                    <Textarea
                      id="message"
                      name="message"
                      placeholder='"Your message body..."'
                      rows={4}
                      className="bg-background/50 border-border/60 focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none rounded-md p-3 font-mono text-sm"
                      required
                      disabled={status === "loading"}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full gap-2 text-sm h-12 mt-6 rounded-md shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-mono font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {/* Cambia icona e testo in base allo stato dell'invio */}
                    {status === "loading" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Execute_POST
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
