import { Card } from "./ui/card";
import { Code2, Database, Globe, Palette, Server, Wrench, TerminalSquare } from "lucide-react";
import { motion } from "motion/react";

const skillCategories = [
  {
    title: "Languages_&_Frameworks",
    icon: Code2,
    skills: ["Python", "C", "Java", "React", "React Native", "Angular", "Next.js", "Flutter", "jQuery"]
  },
  {
    title: "Frontend_&_UI",
    icon: Globe,
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap", "Material UI", "Wireframing"]
  },
  {
    title: "Backend_&_Data",
    icon: Database,
    skills: ["SQL", "Cosmos DB", "Supabase", "Firebase", "REST APIs", "Node.js"]
  },
  {
    title: "Design_&_UX",
    icon: Palette,
    skills: ["Figma", "User Research", "Personas", "Accessibility", "Usability Testing"]
  },
  {
    title: "DevOps_&_Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "Docker", "Kubernetes", "Azure", "CI/CD", "GitHub Actions", "SonarCloud"]
  },
  {
    title: "Soft_Skills",
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

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
            <span>docker inspect skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Technical Stack</h2>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <Card className="p-6 h-full hover:shadow-[0_10px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border-border/60 bg-card/60 backdrop-blur-xl rounded-xl group flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-transparent group-hover:from-primary transition-all duration-500"></div>
                  
                  <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border/40">
                    <div className="p-2.5 rounded-lg bg-secondary/50 text-primary border border-border/40 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-mono font-bold text-lg leading-tight tracking-tight text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto font-mono text-sm">
                    {category.skills.map((skill, idx) => (
                      <span key={idx} className="bg-muted/50 text-foreground/80 hover:text-primary hover:border-primary/50 transition-colors duration-300 rounded-md px-3 py-1 border border-border/60">
                        {skill}
                      </span>
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