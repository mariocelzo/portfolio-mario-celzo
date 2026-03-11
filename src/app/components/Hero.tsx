import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import profilePic from "figma:asset/f867b45042a06e7a23ba35ed122025885f6d57dd.png";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="top" className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Glows (Apple style) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <div className="relative p-1 rounded-full bg-gradient-to-b from-primary/20 to-transparent">
              <ImageWithFallback 
                src={profilePic} 
                alt="Mario Celzo" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-background shadow-xl"
              />
            </div>
          </motion.div>
          
          <div className="mb-10">
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">Mario Celzo</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium tracking-tight">
              Junior Developer & Student
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Passionate about software development and UX/UI design. Currently pursuing a Master's in Software Engineering & IT Management, 
              focused on practical learning and professional growth.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center mb-12">
            <Button size="lg" className="gap-2 rounded-full px-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300" onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <Mail className="size-4" />
              Get In Touch
            </Button>
            <Button size="lg" variant="outline" className="gap-2 rounded-full px-8 shadow-sm hover:bg-secondary/50 transition-all duration-300 border-border/60" asChild>
              <a href="https://mario-celzo.vercel.app" target="_blank" rel="noopener noreferrer">
                <Download className="size-4" />
                View Full CV
              </a>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 justify-center">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 transition-colors h-12 w-12" asChild>
              <a href="https://github.com/mariocelzo" target="_blank" rel="noopener noreferrer">
                <Github className="size-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 transition-colors h-12 w-12" asChild>
              <a href="https://linkedin.com/in/mario-celzo" target="_blank" rel="noopener noreferrer">
                <Linkedin className="size-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}