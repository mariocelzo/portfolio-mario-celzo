import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">About Me</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-border/40 bg-muted/50 p-2">
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBsYXB0b3AlMjBuaWdodHxlbnwxfHx8fDE3NzMxNjEwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Coding workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/5 rounded-full blur-[60px] -z-10"></div>
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-secondary/10 rounded-full blur-[60px] -z-10"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-lg text-foreground/80 leading-relaxed font-medium">
                I'm a passionate Junior Developer currently pursuing my Master's degree in 
                Software Engineering & IT Management at the University of Salerno. 
                I specialize in full-stack development with a strong focus on UX/UI design 
                and user-centered applications.
              </p>
              
              <p className="text-lg text-foreground/80 leading-relaxed font-medium">
                My journey in software development has been driven by curiosity and a desire 
                to create meaningful digital experiences. I'm particularly interested in 
                practical DevOps, cloud-native development, and building applications 
                that solve real-world problems. I thrive in collaborative environments 
                using Agile methodologies.
              </p>
            </div>

            <Card className="p-8 bg-card/50 backdrop-blur-xl border-border/40 shadow-sm rounded-3xl">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-1.5 font-medium">Location</p>
                  <p className="font-semibold text-foreground">Italy (Remote)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1.5 font-medium">Status</p>
                  <p className="font-semibold text-foreground">Graduate Student</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1.5 font-medium">Education</p>
                  <p className="font-semibold text-foreground">Master's in Software Eng.</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1.5 font-medium">Languages</p>
                  <p className="font-semibold text-foreground">IT, EN (B2), AR (B2)</p>
                </div>
              </div>
            </Card>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="px-5 py-2.5 bg-secondary/30 rounded-full border border-border/40 backdrop-blur-sm">
                <p className="text-sm font-medium text-foreground">🎯 Problem Solving</p>
              </div>
              <div className="px-5 py-2.5 bg-secondary/30 rounded-full border border-border/40 backdrop-blur-sm">
                <p className="text-sm font-medium text-foreground">🤝 Team Collaboration</p>
              </div>
              <div className="px-5 py-2.5 bg-secondary/30 rounded-full border border-border/40 backdrop-blur-sm">
                <p className="text-sm font-medium text-foreground">🚀 Quick Learner</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}