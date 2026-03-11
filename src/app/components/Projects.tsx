import { ExternalLink, Github, Globe } from "lucide-react";
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
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Work</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my journey in software engineering.
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
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(255,255,255,0.05)] transition-all duration-500 border-border/40 bg-card/50 backdrop-blur-sm rounded-3xl">
                <div className="aspect-[16/10] relative overflow-hidden bg-muted group p-2">
                  <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-sm">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  {project.featured && (
                    <div className="absolute top-5 right-5 bg-background/80 backdrop-blur-md text-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-border/50">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="text-xl font-bold leading-tight tracking-tight">{project.title}</h3>
                    <Badge variant="secondary" className="font-mono text-xs shrink-0 rounded-full bg-secondary/50">{project.year}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6 text-sm flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-transparent border-border/60 rounded-full font-medium text-foreground/80">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    {project.demo ? (
                      <Button size="sm" variant="default" className="flex-1 gap-2 rounded-full shadow-sm hover:shadow-md transition-shadow font-medium" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <Globe className="size-3.5" />
                          Live Demo
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="secondary" className="flex-1 gap-2 rounded-full shadow-sm font-medium opacity-50 cursor-not-allowed hover:bg-secondary">
                        <Globe className="size-3.5" />
                        Internal Repo
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="gap-2 shrink-0 rounded-full hover:bg-secondary/50 border-border/60" asChild>
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
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg">
            Looking for more academic projects in Algorithms, Databases, Web Programming, and Operating Systems?
          </p>
          <Button variant="outline" size="lg" className="rounded-full shadow-sm hover:shadow-md transition-all border-border/60 font-medium px-8" asChild>
            <a href="https://github.com/mariocelzo" target="_blank" rel="noopener noreferrer">
              <Github className="size-4 mr-2" />
              View All on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}