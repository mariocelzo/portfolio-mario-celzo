"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Briefcase,
  Code,
  Users,
  BookOpen,
  Gamepad,
  Car,
  Globe,
  Laptop,
  Smartphone,
  ChevronDown,
  LinkIcon,
  Trophy,
  Star,
  Award,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  Zap,
  Target,
  Lightbulb,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { RevealOnScroll } from "@/components/reveal-on-scroll"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const parallaxOffset = scrollY * 0.4

  // Skill data with proficiency levels
  const skills = [
    { name: "Java", level: 70, icon: "☕", category: "Programming" },
    { name: "Python", level: 80, icon: "🐍", category: "Programming" },
    { name: "React", level: 80, icon: "⚛️", category: "Frontend" },
    { name: "Next.js", level: 70, icon: "⚡", category: "Frontend" },
    { name: "JavaScript", level: 80, icon: "🟨", category: "Programming" },
    { name: "SQL", level: 75, icon: "🗄️", category: "Database" },
    { name: "Git", level: 85, icon: "📚", category: "Tools" },
    { name: "Figma", level: 50, icon: "🎨", category: "Design" },
    { name: "Mobile Dev", level: 60, icon: "📱", category: "Development" },
  ]

  // Achievement badges
  const achievements = [
    { title: "Problem Solver", description: "Resolved 50+ complex bugs", icon: Target, color: "bg-blue-500" },
    { title: "Team Player", description: "Led 3 successful projects", icon: Users, color: "bg-green-500" },
    { title: "Fast Learner", description: "Mastered 5 new technologies", icon: Zap, color: "bg-yellow-500" },
    { title: "Innovator", description: "Implemented creative solutions", icon: Lightbulb, color: "bg-purple-500" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm">
        <nav className="container flex h-16 items-center justify-between">
          <Link href="#" className="text-2xl font-bold text-primary" prefetch={false}>
            Mario Celzo
          </Link>
          <ul className="hidden md:flex gap-6">
            <li>
              <Link href="#about" className="hover:text-primary transition-colors" prefetch={false}>
                Su di me
              </Link>
            </li>
            <li>
              <Link href="#education" className="hover:text-primary transition-colors" prefetch={false}>
                Istruzione
              </Link>
            </li>
            <li>
              <Link href="#skills" className="hover:text-primary transition-colors" prefetch={false}>
                Competenze
              </Link>
            </li>
            <li>
              <Link href="#projects" className="hover:text-primary transition-colors" prefetch={false}>
                Progetti
              </Link>
            </li>
            <li>
              <Link href="#experience" className="hover:text-primary transition-colors" prefetch={false}>
                Esperienza
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-primary transition-colors" prefetch={false}>
                Contatti
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="container py-12 space-y-24">
        {/* Hero Section with Parallax */}
        <section
          id="hero"
          className="relative flex flex-col items-center justify-center min-h-[90vh] text-center space-y-6 pt-12 pb-8 overflow-hidden"
        >
          {/* Parallax background element */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/10 z-0"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          ></div>
          {/* Radial gradient overlay for more depth */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background"></div>

          {/* Content of the hero section (z-10 to be above parallax background) */}
          <RevealOnScroll animation="animate-fade-in" delay="delay-0" className="relative z-10">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg">
              <Image
                src="/images/mario-celzo.jpeg"
                alt="Mario Celzo"
                width={160}
                height={160}
                className="object-cover object-center-[50%_30%]"
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-100" className="relative z-10">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-foreground drop-shadow-lg">
              Mario Celzo
            </h1>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-200" className="relative z-10">
            <p className="text-3xl md:text-4xl text-primary font-semibold drop-shadow-md">Software Developer</p>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-300" className="relative z-10">
            <p className="max-w-3xl text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Appassionato di tecnologia e innovazione, mi dedico con perseveranza al completamento della mia Laurea in
              Informatica. Pronto a mettere in pratica le mie conoscenze e a contribuire con soluzioni creative e
              funzionali.
            </p>
          </RevealOnScroll>
          
          {/* Achievement badges in hero */}
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-400" className="relative z-10">
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {achievements.map((achievement, index) => (
                <Badge key={index} className={`${achievement.color} text-white border-0 px-3 py-1`}>
                  <achievement.icon className="w-3 h-3 mr-1" />
                  {achievement.title}
                </Badge>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll animation="animate-fade-in-up" delay="delay-500" className="relative z-10">
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                <Link href="#projects" prefetch={false}>
                  Esplora i miei Progetti
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg">
                <Link href="#contact" prefetch={false}>
                  Assumimi Ora
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-bounce" delay="delay-800" className="relative z-10 pt-12">
            <ChevronDown className="w-10 h-10 text-primary" />
          </RevealOnScroll>
        </section>

        <Separator className="bg-border" />

        {/* About Me Section */}
        <section id="about" className="space-y-8 scroll-mt-16">
          <RevealOnScroll animation="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">Su di me</h2>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-200">
            <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01]">
              <CardContent className="pt-6 text-lg md:text-xl text-foreground leading-relaxed">
                <p>
                  Attualmente frequento il corso di Laurea Triennale in Informatica presso l&apos;Università di Salerno.
                  Questa fase della mia formazione è dedicata all&apos;acquisizione di solide basi teoriche e pratiche,
                  con un focus particolare su algoritmi, strutture dati, programmazione orientata agli oggetti e
                  ingegneria del software.
                </p>
                <p className="mt-4">
                  La mia priorità è completare il percorso accademico con la massima dedizione, per poi inserirmi
                  rapidamente nel mondo professionale. Sono entusiasta all&apos;idea di applicare concretamente le
                  conoscenze maturate e di affrontare nuove sfide nel campo dello sviluppo software e
                  dell&apos;innovazione tecnologica.
                </p>
                
                {/* Key highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-primary">Obiettivo Chiaro</h3>
                    <p className="text-sm text-muted-foreground">Completare la laurea e inserirmi nel mondo del lavoro</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-primary">Crescita Costante</h3>
                    <p className="text-sm text-muted-foreground">Apprendimento continuo e sviluppo delle competenze</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-primary">Innovazione</h3>
                    <p className="text-sm text-muted-foreground">Soluzioni creative e approccio problem-solving</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </RevealOnScroll>
        </section>

        <Separator className="bg-border" />

        {/* Education Section */}
        <section id="education" className="space-y-8 scroll-mt-16">
          <RevealOnScroll animation="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">Istruzione e Formazione</h2>
          </RevealOnScroll>
          <div className="grid gap-6 md:grid-cols-2">
            <RevealOnScroll animation="animate-fade-in-up" delay="delay-200">
              <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-primary">Laurea Triennale in Informatica</CardTitle>
                      <p className="text-muted-foreground">2022 - 2025 | UNIVERSITÀ DEGLI STUDI DI SALERNO</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-foreground">
                  <p>
                    Percorso accademico incentrato su: Programmazione (Java, Python, C++), Sistemi Operativi, Basi di
                    Dati, Reti di Calcolatori, Ingegneria del Software, Interazione Uomo-Macchina.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>In corso - 90% completato</span>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
            <RevealOnScroll animation="animate-fade-in-up" delay="delay-300">
              <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-primary">Diploma Liceo Scientifico</CardTitle>
                      <p className="text-muted-foreground">2017 - 2022 | LICEO SCIENTIFICO TITO LUCREZIO CARO, SARNO(SA)</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-foreground">
                  <p>
                    Diploma di maturità scientifica, con un solido background in materie STEM, che ha fornito le basi
                    per un approccio analitico e logico.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Completato con successo</span>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>
        </section>

        <Separator className="bg-border" />

        {/* Skills Section */}
        <section id="skills" className="space-y-8 scroll-mt-16">
          <RevealOnScroll animation="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">Competenze</h2>
          </RevealOnScroll>
          
          {/* Interactive Skills Grid */}
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-200">
            <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-primary text-center">Competenze Tecniche</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="space-y-2 cursor-pointer transition-all duration-300 hover:scale-105"
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{skill.icon}</span>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className={`h-2 transition-all duration-500 ${
                          activeSkill === skill.name ? 'scale-105' : ''
                        }`}
                      />
                      <div className="text-xs text-muted-foreground">{skill.category}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </RevealOnScroll>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RevealOnScroll animation="animate-fade-in-up" delay="delay-300">
              <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Users className="w-6 h-6" /> Soft Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-foreground space-y-2">
                  <p>
                    <strong>Problem Solving:</strong> Abilità affinata nella risoluzione di bug complessi e
                    nell&apos;ottimizzazione di algoritmi.
                  </p>
                  <p>
                    <strong>Lavoro di squadra:</strong> Esperienza nel coordinamento di team e nell&apos;uso di
                    strumenti collaborativi come GitHub.
                  </p>
                  <p>
                    <strong>Adattabilità:</strong> Capacità di apprendere rapidamente nuove tecnologie e di gestire
                    cambiamenti in contesti dinamici.
                  </p>
                  <p>
                    <strong>Empatia:</strong> Attitudine all&apos;ascolto attivo e alla comprensione delle esigenze
                    altrui, facilitando la collaborazione.
                  </p>
                  <p>
                    <strong>Etica del lavoro:</strong> Forte senso di responsabilità e dedizione nel bilanciare studio,
                    progetti e impegni personali.
                  </p>
                </CardContent>
              </Card>
            </RevealOnScroll>
            <RevealOnScroll animation="animate-fade-in-up" delay="delay-400">
              <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <BookOpen className="w-6 h-6" /> Lingue
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-foreground space-y-2">
                  <p>
                    <strong>Italiano:</strong> Madrelingua
                  </p>
                  <p>
                    <strong>Inglese:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Ascolto: B2</li>
                    <li>Lettura: B1</li>
                    <li>Produzione orale: B1</li>
                    <li>Interazione orale: B2</li>
                    <li>Scrittura: B1</li>
                  </ul>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>
        </section>

        <Separator className="bg-border" />

        {/* Projects Section */}
        <section id="projects" className="space-y-8 scroll-mt-16">
          <RevealOnScroll animation="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">Progetti</h2>
          </RevealOnScroll>
          <div className="grid gap-6 md:grid-cols-2">
            <RevealOnScroll animation="animate-fade-in-up" delay="delay-200">
              <Card className="bg-card border-border group hover:shadow-primary/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-center justify-center w-full h-32 bg-muted rounded-md mb-4">
                    <Laptop className="w-20 h-20 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-primary">TARGET (2024)</CardTitle>
                    <Badge className="bg-green-500 text-white">Live</Badge>
                  </div>
                  <p className="text-muted-foreground">Piattaforma di compravendita tra privati</p>
                </CardHeader>
                <CardContent className="text-foreground space-y-3">
                  <p>
                    Piattaforma ispirata a Vinted e Subito, sviluppata per l&apos;esame di Ingegneria del Software.
                    Facilita la compravendita tra privati con funzionalità di creazione annunci, ricerca prodotti e
                    gestione vendite. Ho migliorato le mie competenze in collaborazione e progettazione centrata
                    sull&apos;utente.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                    >
                      <Link href="https://github.com/mariocelzo/Target" target="_blank" prefetch={false}>
                        <Github className="w-4 h-4 mr-2" /> GitHub
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                    >
                      <Link href="https://v0-target-svp6klexsij.vercel.app/" target="_blank" prefetch={false}>
                        <LinkIcon className="w-4 h-4 mr-2" /> Link al sito
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
            <RevealOnScroll animation="animate-fade-in-up" delay="delay-300">
              <Card className="bg-card border-border group hover:shadow-primary/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-center justify-center w-full h-32 bg-muted rounded-md mb-4">
                    <Smartphone className="w-20 h-20 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-primary">BODYLIFE (2025)</CardTitle>
                    <Badge className="bg-blue-500 text-white">Live</Badge>
                  </div>
                  <p className="text-muted-foreground">App per amanti del fitness</p>
                </CardHeader>
                <CardContent className="text-foreground space-y-3">
                  <p>
                    Sviluppata per il corso di Interazione Uomo-Macchina, Body Life è un&apos;app intuitiva per
                    monitorare peso e attività fisica. Il lavoro di squadra ha rafforzato le mie competenze
                    collaborative e organizzative.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                    >
                      <Link
                        href="https://www.figma.com/design/FgrYVoi37erhxvlGQEtiBm/Gym-App--Community-?node-id=0-1&p=f"
                        target="_blank"
                        prefetch={false}
                      >
                        <LinkIcon className="w-4 h-4 mr-2" /> Link al prototipo
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                    >
                      <Link href="https://body-life-teal.vercel.app/" target="_blank" prefetch={false}>
                        <LinkIcon className="w-4 h-4 mr-2" /> Link al progetto
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>
        </section>

        <Separator className="bg-border" />

        {/* Work Experience Section */}
        <section id="experience" className="space-y-8 scroll-mt-16">
          <RevealOnScroll animation="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">Esperienza Lavorativa</h2>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-200">
            <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Briefcase className="w-6 h-6" /> Assistente gestione salone
                </CardTitle>
                <p className="text-muted-foreground">
                  Estati 2018-2019 | Presso l&apos;attività di famiglia Parrucchieri Susy&Tito
                </p>
              </CardHeader>
              <CardContent className="text-foreground space-y-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Servizio clienti:</strong> Gestione prenotazioni e relazioni con pubblico eterogeneo.
                  </li>
                  <li>
                    <strong>Responsabilità operativa:</strong> Controllo inventario prodotti e igiene degli spazi.
                  </li>
                  <li>
                    <strong>Adattabilità:</strong> Lavoro sotto pressione in orari di punta con multitasking.
                  </li>
                  <li>
                    <strong>Affidabilità:</strong> Gestione incassi e procedure di apertura/chiusura attività.
                  </li>
                </ul>
                <p className="pt-2 font-semibold">
                  Competenze chiave sviluppate: Orientamento al cliente | Gestione tempi/stress | Precisione operativa
                </p>
              </CardContent>
            </Card>
          </RevealOnScroll>
        </section>

        <Separator className="bg-border" />

        {/* Hobbies Section */}
        <section id="hobbies" className="space-y-8 scroll-mt-16">
          <RevealOnScroll animation="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">Hobby e Interessi</h2>
          </RevealOnScroll>
          <div className="grid gap-6 md:grid-cols-3">
            <RevealOnScroll animation="animate-fade-in-up" delay="delay-200">
              <Card className="bg-card border-border text-center p-6 hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01]">
                <Car className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-primary">Formula 1</CardTitle>
                <CardContent className="text-foreground pt-2">
                  Passione che coltivo sin da piccolo analizzando strategie di gara e dinamiche tecniche, sviluppando
                  pensiero critico e capacità decisionali sotto pressione.
                </CardContent>
              </Card>
            </RevealOnScroll>
            <RevealOnScroll animation="animate-fade-in-up" delay="delay-300">
              <Card className="bg-card border-border text-center p-6 hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01]">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-primary">Tecnologia e Innovazione</CardTitle>
                <CardContent className="text-foreground pt-2">
                  Sempre aggiornato sulle ultime tendenze tech, con sperimentazione pratica di hardware/software per
                  affinare l&apos;apprendimento continuo.
                </CardContent>
              </Card>
            </RevealOnScroll>
            <RevealOnScroll animation="animate-fade-in-up" delay="delay-400">
              <Card className="bg-card border-border text-center p-6 hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01]">
                <Gamepad className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-primary">Videogiochi</CardTitle>
                <CardContent className="text-foreground pt-2">
                  Hobby sviluppato fin dall&apos;infanzia che potenzia problem solving creativo e capacità di
                  collaborazione in team dinamici.
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>
        </section>

        <Separator className="bg-border" />

        {/* Call to Action Section */}
        <section className="space-y-8 scroll-mt-16">
          <RevealOnScroll animation="animate-fade-in-up">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 text-center p-12">
              <CardContent className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-primary">Pronto per la prossima sfida?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Sono entusiasto di portare la mia passione per la tecnologia e il problem-solving nel vostro team. 
                  Insieme possiamo creare soluzioni innovative che fanno la differenza.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                    <Link href="#contact" prefetch={false}>
                      Contattami Ora
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg">
                    <Link href="/CV_Celzo_Mario.pdf" target="_blank" prefetch={false}>
                      Scarica CV
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </RevealOnScroll>
        </section>

        <Separator className="bg-border" />

        {/* Contact Section */}
        <section id="contact" className="space-y-8 scroll-mt-16">
          <RevealOnScroll animation="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">Contatti</h2>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-200">
            <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01]">
              <CardContent className="pt-6 grid gap-4 text-lg text-foreground">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-primary" />
                  <Link href="tel:3385403836" className="hover:underline" prefetch={false}>
                    3385403836
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <Link href="mailto:mariocelzo003@gmail.com" className="hover:underline" prefetch={false}>
                    mariocelzo003@gmail.com
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-6 h-6 text-primary" />
                  <Link
                    href="https://github.com/mariocelzo"
                    target="_blank"
                    className="hover:underline"
                    prefetch={false}
                  >
                    mariocelzo
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  <span>Via Bracigliano n56 Sarno(Sa)</span>
                </div>
              </CardContent>
            </Card>
          </RevealOnScroll>
        </section>
      </main>

      <footer className="bg-card border-t border-border py-8 text-center text-muted-foreground text-sm">
        <p>
          Autorizzo il trattamento dei miei dati personali presenti nel CV ai sensi dell&apos;art. 13 d. Igs. 30 giugno
          2003 n. 196 &apos;Codice in materia di protezione dei dati personali&apos; e dell&apos;art. 13 GDPR 679/16 -
          &apos;Regolamento europeo sulla protezione dei dati personali&apos;.
        </p>
        <p className="mt-2">Sarno 27/06/2025</p>
        <p className="mt-1 font-semibold text-foreground">Mario Celzo</p>
      </footer>
    </div>
  )
}
