import { Github, Linkedin, Mail, Download, Terminal, Code2, GitBranch, TerminalSquare } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
// Import locale dell'immagine profilo (già inclusa negli assets del progetto)
import profilePic from "../../assets/f867b45042a06e7a23ba35ed122025885f6d57dd.png";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="top" className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-background pt-20">
      {/* Developer Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Subtle Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Gap ridotto su mobile per evitare eccessivo spazio verticale tra i due blocchi */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Content — slides in from left on load */}
          <motion.div
            className="flex-1 max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start"
            variants={containerVariants}
            initial={{ opacity: 0, x: -72 }}
            animate="visible"
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          >
            <motion.div variants={itemVariants}>
              {/* Testo del badge ridotto su schermi piccoli e troncato per evitare overflow orizzontale */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/50 border border-border/50 font-mono text-xs sm:text-sm text-primary mb-6 shadow-sm backdrop-blur-md max-w-full overflow-hidden">
                <Terminal className="size-4 shrink-0" />
                <span className="truncate">$ ./start-devops-journey.sh</span>
              </div>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-6 text-foreground leading-[1.1]">
              Architecting <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 font-mono italic">Infrastructure.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed font-medium">
              I build resilient cloud environments, microservices, and automated pipelines. <br className="hidden lg:block" />
              Turning coffee into scalable systems.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <Button size="lg" className="gap-2 rounded-md font-mono px-8 shadow-lg hover:-translate-y-1 transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-base" onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Code2 className="size-5" />
                Initialize_Contact
              </Button>
              <Button size="lg" variant="outline" className="gap-2 rounded-md font-mono px-8 shadow-sm hover:bg-secondary/80 transition-all duration-300 border-border/60 h-14 text-base bg-background/50 backdrop-blur-sm" asChild>
                {/* Download diretto del CV dalla cartella public */}
                <a href="/cv-mario-celzo.pdf" download="CV-Mario-Celzo.pdf">
                  <Download className="size-5" />
                  CV.pdf
                </a>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 justify-center lg:justify-start">
              <Button variant="ghost" size="icon" className="rounded-md hover:bg-secondary transition-colors h-12 w-12 border border-transparent hover:border-border/50" asChild>
                <a href="https://github.com/mariocelzo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="size-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-md hover:bg-secondary transition-colors h-12 w-12 border border-transparent hover:border-border/50" asChild>
                <a href="https://linkedin.com/in/mario-celzo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="size-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content (Terminal Window & Profile Pic) — slides in from right */}
          {/* padding-bottom per dare spazio al badge foto profilo che sporge -bottom-6 */}
          <motion.div
            className="flex-1 w-full max-w-lg relative mt-10 lg:mt-0 pb-12 lg:pb-8"
            initial={{ opacity: 0, x: 72 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            {/* IDE / Terminal Window */}
            <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-xl overflow-hidden shadow-2xl relative z-10">
              
              {/* Window Chrome */}
              <div className="h-10 border-b border-border/60 bg-muted/40 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="mx-auto flex items-center text-xs text-muted-foreground font-mono">
                  <GitBranch className="size-3 mr-1.5" /> main ~ profile.yml
                </div>
              </div>
              
              {/* Code Body */}
              <div className="p-6 md:p-8 font-mono text-[13px] md:text-sm text-left overflow-hidden">
                <p className="mb-2"><span className="text-muted-foreground">---</span></p>
                <p className="mb-1"><span className="text-primary font-bold">apiVersion:</span> <span className="text-foreground">v1</span></p>
                <p className="mb-1"><span className="text-primary font-bold">kind:</span> <span className="text-foreground">Developer</span></p>
                <p className="mb-1"><span className="text-primary font-bold">metadata:</span></p>
                <p className="mb-1 pl-4"><span className="text-primary font-bold">name:</span> <span className="text-foreground">"Mario Celzo"</span></p>
                <p className="mb-1 pl-4"><span className="text-primary font-bold">role:</span> <span className="text-foreground">"Jr DevOps & Frontend Engineer"</span></p>
                <p className="mb-1 pl-4"><span className="text-primary font-bold">company:</span> <span className="text-foreground">"Lutech"</span></p>
                <p className="mb-1"><span className="text-primary font-bold">spec:</span></p>
                <p className="mb-1 pl-4"><span className="text-primary font-bold">stack:</span></p>
                <p className="mb-1 pl-8"><span className="text-muted-foreground">-</span> <span className="text-foreground">Kubernetes</span></p>
                <p className="mb-1 pl-8"><span className="text-muted-foreground">-</span> <span className="text-foreground">Docker</span></p>
                <p className="mb-1 pl-8"><span className="text-muted-foreground">-</span> <span className="text-foreground">Azure</span></p>
                <p className="mb-1 pl-8"><span className="text-muted-foreground">-</span> <span className="text-foreground">React / TypeScript</span></p>
                <p className="mb-1 pl-8"><span className="text-muted-foreground">-</span> <span className="text-foreground">Angular</span></p>
                <p className="mb-1 pl-8"><span className="text-muted-foreground">-</span> <span className="text-foreground">CI/CD</span></p>
                <div className="mt-4 flex items-center text-foreground font-semibold">
                  <TerminalSquare className="size-4 mr-2 text-primary" />
                  <p>root@mario:~$ <span className="animate-pulse font-normal">_</span></p>
                </div>
              </div>
            </div>

            {/* Overlapping Profile Pic Badge */}
            <motion.div 
              className="absolute -bottom-6 -left-6 md:-left-12 z-20 p-2 bg-background/80 backdrop-blur-xl border border-border/60 rounded-2xl shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 120 }}
            >
              <ImageWithFallback
                src={profilePic}
                alt="Mario Celzo"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl border border-border/50"
              />
              {/* Green status dot — "online" indicator overlaid on top-right of photo */}
              <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#27C93F] border-2 border-background shadow-[0_0_0_1px_rgba(39,201,63,.4),0_0_10px_rgba(39,201,63,.5)]" />
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}