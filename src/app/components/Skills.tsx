import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Code2, Database, Globe, Palette, Server, Wrench } from "lucide-react";
import { motion } from "motion/react";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    icon: Code2,
    skills: ["Python", "C", "Java", "React", "React Native", "Angular", "Next.js", "Flutter", "jQuery"]
  },
  {
    title: "Frontend & UI/UX",
    icon: Globe,
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap", "Material UI", "Wireframing", "Prototyping"]
  },
  {
    title: "Backend & Database",
    icon: Database,
    skills: ["SQL", "Cosmos DB", "Supabase", "Firebase", "REST APIs", "Node.js"]
  },
  {
    title: "Design & UX",
    icon: Palette,
    skills: ["Figma", "User Research", "Personas", "Accessibility", "Usability Testing"]
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "Docker", "Kubernetes", "Azure", "CI/CD", "GitHub Actions", "SonarCloud"]
  },
  {
    title: "Soft Skills",
    icon: Server,
    skills: ["Problem Solving", "Teamwork", "Adaptability", "Time Management", "Organization", "Communication"]
  }
];

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Skills & Technologies</h2>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <Card className="p-8 h-full hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgb(255,255,255,0.03)] transition-all duration-500 border-border/40 bg-card/60 backdrop-blur-xl rounded-[2rem] group flex flex-col">
                  <div className="flex items-center gap-5 mb-6 pb-6 border-b border-border/40">
                    <div className="p-3.5 rounded-2xl bg-secondary/50 text-foreground group-hover:bg-foreground group-hover:text-background transition-colors duration-500 shadow-sm">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="font-bold text-xl leading-tight tracking-tight text-foreground">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5 mt-auto">
                    {category.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-muted/50 text-foreground hover:bg-muted/80 transition-colors duration-300 rounded-full px-4 py-1.5 font-medium border border-border/40">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}