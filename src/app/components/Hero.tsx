import { Github, Linkedin, Mail, Download, Cloud, Database, Box, Server } from "lucide-react";
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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-12, 12, -12],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="top" className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-background pt-20">
      {/* Background Glows (Apple style) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Left Content */}
          <motion.div 
            className="flex-1 max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6 shadow-sm border border-border/50 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Junior DevOps Engineer @ Lutech
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-6 text-foreground leading-[1.1]">
              Hi, I'm <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Mario Celzo.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed font-medium">
              I build resilient cloud infrastructure, microservices, and automated pipelines. Passionate about Kubernetes, Docker, and seamless deployments.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <Button size="lg" className="gap-2 rounded-full px-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-base" onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Mail className="size-5" />
                Contact Me
              </Button>
              <Button size="lg" variant="outline" className="gap-2 rounded-full px-8 shadow-sm hover:bg-secondary/80 transition-all duration-300 border-border/60 h-14 text-base bg-background/50 backdrop-blur-sm" asChild>
                <a href="https://mario-celzo.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Download className="size-5" />
                  Resume
                </a>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 justify-center lg:justify-start">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary transition-colors h-12 w-12 border border-transparent hover:border-border/50" asChild>
                <a href="https://github.com/mariocelzo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="size-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary transition-colors h-12 w-12 border border-transparent hover:border-border/50" asChild>
                <a href="https://linkedin.com/in/mario-celzo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="size-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content (Image with floating icons) */}
          <motion.div 
            className="flex-1 relative w-full max-w-md lg:max-w-lg flex justify-center lg:justify-end mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            {/* Main Image Container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl transform scale-110"></div>
              
              <motion.div 
                className="w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-8 border-background/50 shadow-2xl relative z-10 bg-background/20 backdrop-blur-sm p-2"
                variants={floatingVariants}
                initial="initial"
                animate="animate"
              >
                <ImageWithFallback 
                  src={profilePic} 
                  alt="Mario Celzo" 
                  className="w-full h-full object-cover rounded-[2rem] md:rounded-[2.5rem]"
                />
              </motion.div>

              {/* Floating Tech Icons */}
              <motion.div 
                className="absolute -top-6 -left-6 z-20 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-border/50 text-primary"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Cloud className="size-8" />
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 -right-10 z-20 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-border/50 text-primary"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Box className="size-8" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-8 left-10 z-20 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-border/50 text-primary"
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <Server className="size-8" />
              </motion.div>

              <motion.div 
                className="absolute -bottom-2 -right-2 z-20 bg-background/80 backdrop-blur-md p-3 rounded-xl shadow-lg border border-border/50 text-primary"
                animate={{ y: [8, -8, 8], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <Database className="size-6" />
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}