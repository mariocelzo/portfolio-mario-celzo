import { ExternalLink, Github, Globe, Box, Code2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

const projects = [
  {
    title: "TARGET",
    year: "2024",
    description: "Platform for students to buy/sell university notes with social features. Built with a team of 3 using Agile methodology with strong focus on UX/UI design.",
    image: "https://images.unsplash.com/photo-1758270704025-0e1a1793e1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZHlpbmclMjBzdHVkZW50cyUyMG5vdGVzfGVufDF8fHx8MTc3MzI1NTgyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["UX/UI Design", "Agile", "Social Platform", "Figma"],
    featured: true,
    github: "https://github.com/MarioCelzo/target-platform",
    demo: "https://target-platform.vercel.app"
  },
  {
    title: "NearBite",
    year: "2025",
    description: "Cross-platform mobile app for restaurant reviews with real-time updates, Google Maps integration, and AI-powered recommendations with modern fluid animations.",
    image: "https://images.unsplash.com/photo-1760888549280-4aef010720bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbW9iaWxlJTIwYXBwJTIwcGhvbmUlMjBmb29kfGVufDF8fHx8MTc3MzI1NTgyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React Native", "Expo", "AI", "Google Maps API"],
    featured: true,
    github: "https://github.com/MarioCelzo/nearbite",
    demo: "https://nearbite.vercel.app"
  },
  {
    title: "BiblioFlow",
    year: "2023",
    description: "Intelligent university library management system with sensor-based study post tracking, interactive dashboard, and focus on accessibility and sustainability.",
    image: "https://images.unsplash.com/photo-1762512346990-22d810fe4252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMG1vZGVybiUyMHJlYWRpbmd8ZW58MXx8fHwxNzczMjU1ODIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Human Computation", "IoT", "Dashboard", "Accessibility"],
    featured: true,
    github: "https://github.com/MarioCelzo/biblioflow",
    demo: "https://biblioflow.vercel.app"
  },
  {
    title: "BODY-LIFE",
    year: "2023",
    description: "Complete fitness app with social features and Human-Machine Interaction monitoring. Includes interactive dashboard, personalized workouts, and full UX/UI design in Figma.",
    image: "https://images.unsplash.com/photo-1591311630200-ffa9120a540f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXBwJTIwbW9iaWxlJTIwd29ya291dHxlbnwxfHx8fDE3NzMyNTU4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "Java", "Figma", "Wireframing"],
    featured: false,
    github: "https://github.com/MarioCelzo/body-life"
  },
  {
    title: "PetClinic Dependability",
    year: "2023",
    description: "Software dependability analysis for Spring PetClinic with fault injection using Chaos Monkey, FMEA, reliability analysis, and complete DevOps CI/CD pipeline.",
    image: "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwZGF0YSUyMGNlbnRlcnxlbnwxfHx8fDE3NzMxNzgxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["DevOps", "CI/CD", "Docker", "SonarCloud", "GitHub Actions"],
    featured: false,
    github: "https://github.com/MarioCelzo/petclinic-dependability"
  }
];

export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="projects" className="py-24 bg-muted/20 relative">
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/50 border border-border/50 font-mono text-sm text-primary mb-4 shadow-sm">
            <Box className="size-4" />
            <span>kubectl get deployments</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Deployed Work</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono text-sm">
            {"// A collection of microservices, apps, and platforms I've built."}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card className="h-full flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border-border/60 bg-card/60 backdrop-blur-xl rounded-xl group relative">
                {/* Simulated Container Header */}
                <div className="h-8 bg-muted/50 border-b border-border/60 flex items-center px-3 gap-2">
                  <Code2 className="size-3 text-muted-foreground" />
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{project.title.toLowerCase()}.yaml</span>
                </div>

                <div className="aspect-[16/10] relative overflow-hidden bg-background">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:grayscale-[20%] transition-all duration-700 ease-out"
                  />
                  {project.featured && (
                    <div className="absolute top-3 right-3 z-20 bg-background/90 backdrop-blur-md text-primary px-2.5 py-1 rounded-md text-[10px] font-mono font-bold shadow-sm border border-border/60 uppercase tracking-wider">
                      ★ Active
                    </div>
                  )}
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-grow bg-card/50">
                  <div className="flex items-start justify-between mb-4 gap-2">
                    <h3 className="text-xl font-bold leading-tight tracking-tight text-foreground">{project.title}</h3>
                    <Badge variant="outline" className="font-mono text-xs shrink-0 rounded-md border-border/60 bg-background">
                      v{project.year}.0
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-6 text-sm flex-grow leading-relaxed font-mono">
                    <span className="text-primary mr-1">{">"}</span>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] font-mono bg-secondary/50 text-foreground/80 border border-border/60 rounded px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    {project.demo ? (
                      <Button size="sm" variant="default" className="flex-1 gap-2 rounded-md shadow-sm hover:shadow-md transition-shadow font-mono text-xs font-semibold" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <Globe className="size-3.5" />
                          [Live_Demo]
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="secondary" className="flex-1 gap-2 rounded-md shadow-sm font-mono text-xs opacity-50 cursor-not-allowed hover:bg-secondary">
                        <Globe className="size-3.5" />
                        [Private_Repo]
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="gap-2 shrink-0 rounded-md hover:bg-secondary/50 border-border/60" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
                        <Github className="size-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto font-mono text-sm">
            {"/* Looking for more academic projects in Algorithms, Databases, Web Programming, and OS? */"}
          </p>
          <Button variant="outline" size="lg" className="rounded-md shadow-sm hover:-translate-y-1 transition-all border-border/60 font-mono text-sm px-8 bg-background/50 backdrop-blur-sm" asChild>
            <a href="https://github.com/mariocelzo" target="_blank" rel="noopener noreferrer">
              <Github className="size-4 mr-2" />
              cd ~/github/repositories
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}