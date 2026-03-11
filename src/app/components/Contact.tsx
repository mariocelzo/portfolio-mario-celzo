import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { motion } from "motion/react";

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thanks for your message! I'll get back to you soon.");
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Get In Touch</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.h3 variants={itemVariants} className="text-3xl font-bold mb-6 tracking-tight text-foreground">Let's work together</motion.h3>
            <motion.p variants={itemVariants} className="text-muted-foreground mb-10 text-lg leading-relaxed font-medium">
              I'm currently seeking opportunities for internships and junior developer positions. 
              Open to discussing projects, collaborations, or just connecting with fellow developers!
            </motion.p>
            
            <div className="space-y-5">
              <motion.div variants={itemVariants}>
                <Card className="p-5 flex items-center gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)] transition-all duration-300 border-border/40 bg-card/60 backdrop-blur-md rounded-3xl">
                  <div className="p-3.5 rounded-2xl bg-secondary/50 text-foreground border border-border/40">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground/80 mb-0.5">Email</p>
                    <a href="mailto:mariocelzo000@gmail.com" className="text-foreground text-base hover:opacity-70 transition-opacity font-medium">
                      mariocelzo000@gmail.com
                    </a>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="p-5 flex items-center gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)] transition-all duration-300 border-border/40 bg-card/60 backdrop-blur-md rounded-3xl">
                  <div className="p-3.5 rounded-2xl bg-secondary/50 text-foreground border border-border/40">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground/80 mb-0.5">Phone</p>
                    <a href="tel:+393283403546" className="text-foreground text-base hover:opacity-70 transition-opacity font-medium">
                      +39 328 340 3546
                    </a>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="p-5 flex items-center gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)] transition-all duration-300 border-border/40 bg-card/60 backdrop-blur-md rounded-3xl">
                  <div className="p-3.5 rounded-2xl bg-secondary/50 text-foreground border border-border/40">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground/80 mb-0.5">Location</p>
                    <p className="text-foreground text-base font-medium">Salerno, Italy (Remote Available)</p>
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-12">
              <h4 className="font-semibold mb-5 text-lg text-foreground">Interests & Hobbies</h4>
              <div className="flex flex-wrap gap-3">
                <div className="px-5 py-2.5 bg-background border border-border/40 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-foreground">🏎️ Formula 1</span>
                </div>
                <div className="px-5 py-2.5 bg-background border border-border/40 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-foreground">✈️ Travel</span>
                </div>
                <div className="px-5 py-2.5 bg-background border border-border/40 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-foreground">💻 Coding</span>
                </div>
                <div className="px-5 py-2.5 bg-background border border-border/40 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-foreground">🎮 Gaming</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-10 border-border/40 bg-card/60 backdrop-blur-xl shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_20px_40px_rgb(255,255,255,0.03)] rounded-[2.5rem]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2.5 text-foreground/90 pl-1">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" className="bg-background/50 border-border/40 focus:bg-background transition-colors h-12 rounded-2xl px-4" required />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2.5 text-foreground/90 pl-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your.email@example.com" className="bg-background/50 border-border/40 focus:bg-background transition-colors h-12 rounded-2xl px-4" required />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2.5 text-foreground/90 pl-1">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What's this about?" className="bg-background/50 border-border/40 focus:bg-background transition-colors h-12 rounded-2xl px-4" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2.5 text-foreground/90 pl-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell me about your project or opportunity..." 
                    rows={5}
                    className="bg-background/50 border-border/40 focus:bg-background transition-colors resize-none rounded-2xl p-4"
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full gap-2 text-base h-14 mt-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 font-medium">
                  <Send className="size-4" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}