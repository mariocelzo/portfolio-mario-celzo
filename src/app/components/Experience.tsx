import { Briefcase, Calendar, GraduationCap } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

const education = [
  {
    degree: "Master's Degree in Software Engineering & IT Management",
    institution: "Università degli Studi di Salerno",
    period: "2025 - Present",
    description: "Advanced studies in software engineering, IT management, and modern development practices.",
  },
  {
    degree: "Bachelor's Degree in Computer Science",
    institution: "Università degli Studi di Salerno",
    period: "2022 - Dec. 2025",
    description: "Comprehensive foundation in computer science, algorithms, data structures, and software development.",
  },
  {
    degree: "Scientific High School Diploma",
    institution: "Liceo Tito Lucrezio Caro",
    period: "2017 - 2022",
    description: "Strong foundation in mathematics, sciences, and analytical thinking.",
  }
];

const experiences = [
  {
    title: "Junior DevOps Engineer",
    company: "Lutech",
    period: "Jan 2026 - Present",
    description: "Working as a DevOps Engineer managing infrastructure, deployments, and occasionally assisting with frontend development.",
    responsibilities: [
      "Building and maintaining CI/CD pipelines",
      "Creating, managing, and fixing Kubernetes clusters",
      "Docker containerization and microservices management",
      "Frontend development tasks and dashboards using Angular",
      "Learning and implementing Microsoft Azure and Cosmos DB"
    ]
  },
  {
    title: "Salon Management Assistant",
    company: "Perceberi Seby'Chic",
    period: "Summer 2018-2019",
    description: "Family business activity managing customer service and operations.",
    responsibilities: [
      "Customer service and promotions management",
      "Inventory control and stock management",
      "Multitasking during peak hours",
      "Shift management and opening procedures"
    ]
  }
];

const certifications = [
  "AI Fundamentals Course",
  "Git & GitHub Basics",
  "React Development"
];

export function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="experience" className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Education & Experience</h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Education Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-8 flex items-center gap-4 text-foreground">
              <div className="p-3 rounded-2xl bg-secondary/50 text-foreground border border-border/40 backdrop-blur-sm">
                <GraduationCap className="size-6" />
              </div>
              Education
            </motion.h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-border/0 before:via-border/80 before:to-border/0">
              {education.map((edu, index) => (
                <motion.div key={index} variants={itemVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-secondary text-foreground shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2.5 h-2.5 bg-foreground/60 rounded-full"></div>
                  </div>
                  <Card className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] p-7 md:p-8 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgb(255,255,255,0.03)] transition-all duration-500 border-border/40 bg-card/60 backdrop-blur-xl rounded-[2rem]">
                    <div className="flex flex-col mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-3 text-sm font-medium bg-muted/50 w-fit px-3 py-1 rounded-full">
                        <Calendar className="size-4" />
                        <span>{edu.period}</span>
                      </div>
                      <h4 className="text-xl font-bold leading-tight tracking-tight text-foreground">{edu.degree}</h4>
                      <p className="text-foreground/60 font-medium text-sm mt-2">{edu.institution}</p>
                    </div>
                    <p className="text-muted-foreground/90 text-sm leading-relaxed">{edu.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Work Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 text-foreground">
              <div className="p-3 rounded-2xl bg-secondary/50 text-foreground border border-border/40 backdrop-blur-sm">
                <Briefcase className="size-6" />
              </div>
              Work Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card key={index} className="p-8 md:p-10 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgb(255,255,255,0.03)] transition-all duration-500 border-border/40 bg-card/60 backdrop-blur-xl rounded-[2.5rem]">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
                    <div className="flex items-start gap-5 mb-4 md:mb-0">
                      <div className="p-4 rounded-2xl bg-secondary/50 text-foreground hidden md:block border border-border/40">
                        <Briefcase className="size-6" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold tracking-tight text-foreground">{exp.title}</h4>
                        <p className="text-foreground/60 font-medium mt-2">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-2 rounded-full text-sm font-medium shrink-0">
                      <Calendar className="size-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 mb-8 leading-relaxed text-lg">{exp.description}</p>
                  
                  <div className="space-y-4 bg-muted/30 p-6 rounded-3xl border border-border/20">
                    <p className="font-semibold text-sm text-foreground uppercase tracking-wider">Key Responsibilities</p>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground/90 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-1.5 shrink-0"></div>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 text-foreground">
              <div className="p-3 rounded-2xl bg-secondary/50 text-foreground border border-border/40 backdrop-blur-sm">
                <div className="size-6 flex items-center justify-center font-bold">★</div>
              </div>
              Certifications
            </h3>
            <Card className="p-8 border-border/40 bg-card/60 backdrop-blur-xl rounded-[2rem] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgb(255,255,255,0.03)] transition-all duration-500">
              <div className="flex flex-wrap gap-3.5">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center text-sm py-2.5 px-5 shadow-sm bg-background border border-border/60 hover:bg-muted/50 transition-colors rounded-full font-medium text-foreground/80">
                    <span className="text-foreground mr-2.5">✓</span> {cert}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}