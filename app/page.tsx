"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
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
  Linkedin,
  Play,
  ExternalLink,
  Eye,
  GitBranch,
  Database,
  Cpu,
  Shield,
  Rocket,
  Sparkles,
  Copy,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandPalette } from "@/components/command-palette"
import Tilt from "@/components/tilt"
import SpotlightNav from "@/components/spotlight-nav"
import React from "react"
import Typewriter from "@/components/typewriter"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [isMounted, setIsMounted] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [showParticles, setShowParticles] = useState(false)
  const [projectFilter, setProjectFilter] = useState<string>('All')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Track active section for navigation highlighting
      const sections = ['hero', 'about', 'education', 'skills', 'projects', 'experience', 'hobbies', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeSection, isMounted])

  const parallaxOffset = scrollY * 0.3
  const smoothScrollY = scrollY * 0.5

  // Skill data with proficiency levels
  const skills = [
    { name: "Java", level: 70, icon: "☕", category: "Programming" },
    { name: "Python", level: 80, icon: "🐍", category: "Programming" },
    { name: "React", level: 80, icon: "⚛️", category: "Frontend" },
    { name: "Next.js", level: 70, icon: "⚡", category: "Frontend" },
    { name: "Angular", level: 50, icon: "🔺", category: "Frontend" },
    { name: "JavaScript", level: 80, icon: "🟨", category: "Programming" },
    { name: "SQL", level: 75, icon: "🗄️", category: "Database" },
    { name: "Git", level: 85, icon: "📚", category: "Tools" },
    { name: "Testing & Maintenance", level: 70, icon: "🔧", category: "Development" },
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

  // Enhanced project data with interactive features
  const projects = [
    {
      id: "target",
      title: "TARGET",
      year: "2024",
      category: 'Web',
      description: "Piattaforma di compravendita tra privati",
      fullDescription: "Piattaforma ispirata a Vinted e Subito, sviluppata per l'esame di Ingegneria del Software. Facilita la compravendita tra privati con funzionalità di creazione annunci, ricerca prodotti e gestione vendite. Ho migliorato le mie competenze in collaborazione e progettazione centrata sull'utente.",
      image: "/images/target-preview.jpg",
      icon: Laptop,
      badge: "Live",
      badgeColor: "bg-green-500",
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
      features: ["User Authentication", "Product Listings", "Search & Filters", "Real-time Chat", "User Profiles"],
      github: "https://github.com/mariocelzo/Target",
      liveUrl: "https://v0-target-svp6klexsij.vercel.app/",
      demoUrl: "https://v0-target-svp6klexsij.vercel.app/",
      stats: { features: "15+", components: "50+", rating: "4.8" }
    },
    {
      id: "bodylife",
      title: "BODYLIFE",
      year: "2025",
      category: 'Mobile',
      description: "App per amanti del fitness",
      fullDescription: "Sviluppata per il corso di Interazione Uomo-Macchina, Body Life è un'app intuitiva per monitorare peso e attività fisica. Il lavoro di squadra ha rafforzato le mie competenze collaborative e organizzative.",
      image: "/images/bodylife-preview.jpg",
      icon: Smartphone,
      badge: "Live",
      badgeColor: "bg-blue-500",
      techStack: ["React Native", "Expo", "Figma", "TypeScript", "Local Storage"],
      features: ["Fitness Tracking", "Progress Analytics", "Goal Setting", "Nutrition Log", "UI/UX Design"],
      github: null,
      liveUrl: "https://body-life-teal.vercel.app/",
      demoUrl: "https://www.figma.com/design/FgrYVoi37erhxvlGQEtiBm/Gym-App--Community-?node-id=0-1&p=f",
      stats: { screens: "8+", features: "12+", rating: "4.6" }
    }
    ,
    {
      id: "adas",
      title: "ADAS Testing",
      year: "2025",
      category: 'Thesis',
      description: "Tesi sperimentale su sistemi ADAS e pipeline di testing",
      fullDescription: "Progetto di tesi focalizzato sul testing di sistemi ADAS (Advanced Driver Assistance Systems). Include pipeline per valutazione di modelli di visione (lane/vehicle detection), gestione dataset, metriche di accuratezza e automazione dei report.",
      image: "/images/adas-preview.jpg",
      icon: Car,
      badge: "Thesis",
      badgeColor: "bg-purple-500",
      techStack: ["Python", "OpenCV", "PyTorch", "Jupyter", "Docker"],
      features: ["Dataset Management", "Model Evaluation", "Metrics & Reports", "Automation Scripts", "Visualization"],
      github: "https://github.com/mariocelzo/adas_testing",
      liveUrl: "https://github.com/mariocelzo/adas_testing",
      demoUrl: "https://github.com/mariocelzo/adas_testing",
      stats: { experiments: "20+", modules: "6+", rating: "4.7" }
    },
    {
      id: "nearbite",
      title: "NearBite",
      year: "2025",
      category: 'Web',
      description: "Piattaforma per trovare i migliori locali vicino a te",
      fullDescription: "NearBite è una piattaforma innovativa sia per cellulare che per web che permette di trovare i migliori locali vicino alla propria posizione. Utilizzando algoritmi di AI avanzati, l'app impara dalle scelte degli utenti e consiglia i locali che potrebbero preferire maggiormente nelle vicinanze, offrendo un'esperienza personalizzata e intelligente.",
      image: "/images/nearbite-preview.jpg",
      icon: Globe,
      badge: "Prototype",
      badgeColor: "bg-orange-500",
      techStack: ["TypeScript", "React", "Supabase", "AI Algorithms", "Responsive Design"],
      features: ["Location-based Search", "AI Recommendations", "Mobile & Web App", "User Preference Learning", "Local Discovery"],
      github: "https://github.com/mariocelzo/resturant-finder",
      liveUrl: "https://github.com/mariocelzo/resturant-finder",
      demoUrl: "https://github.com/mariocelzo/resturant-finder",
      stats: { features: "10+", components: "25+", rating: "4.5" }
    }
  ]

  const categories = ['All', 'Web', 'Mobile', 'Thesis'] as const
  const filteredProjects = projects.filter(p => projectFilter === 'All' ? true : p.category === projectFilter)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Particle Effects */}
      {showParticles && (
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${Math.random() * 3 + 4}s`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Scroll Progress Bar */}
      {isMounted && (
        <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
          <div
            className="h-full progress-gradient transition-all duration-300 ease-out"
            style={{
              width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
            }}
          ></div>
        </div>
      )}
      
      <header className="sticky top-0 z-50 w-full border-b border-border liquid-glass">
        <nav className="container flex h-16 items-center justify-between">
          <Link href="#" className="text-2xl font-bold text-primary gradient-text font-display" prefetch={false}>
            Mario Celzo
          </Link>
          <div className="flex items-center gap-6">
            <ul className="hidden md:flex gap-6">
              <li>
                <Link 
                  href="#about" 
                  className={`transition-all duration-300 relative group ${
                    activeSection === 'about' ? 'text-primary' : 'hover:text-primary'
                  }`} 
                  prefetch={false}
                >
                  Su di me
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === 'about' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#education" 
                  className={`transition-all duration-300 relative group ${
                    activeSection === 'education' ? 'text-primary' : 'hover:text-primary'
                  }`} 
                  prefetch={false}
                >
                  Istruzione
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === 'education' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#skills" 
                  className={`transition-all duration-300 relative group ${
                    activeSection === 'skills' ? 'text-primary' : 'hover:text-primary'
                  }`} 
                  prefetch={false}
                >
                  Competenze
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === 'skills' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#projects" 
                  className={`transition-all duration-300 relative group ${
                    activeSection === 'projects' ? 'text-primary' : 'hover:text-primary'
                  }`} 
                  prefetch={false}
                >
                  Progetti
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === 'projects' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#experience" 
                  className={`transition-all duration-300 relative group ${
                    activeSection === 'experience' ? 'text-primary' : 'hover:text-primary'
                  }`} 
                  prefetch={false}
                >
                  Esperienza
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === 'experience' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#contact" 
                  className={`transition-all duration-300 relative group ${
                    activeSection === 'contact' ? 'text-primary' : 'hover:text-primary'
                  }`} 
                  prefetch={false}
                >
                  Contatti
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </li>
            </ul>
            <Button
              onClick={() => setShowParticles(!showParticles)}
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0"
              title={showParticles ? "Hide particles" : "Show particles"}
            >
              <Sparkles className={`w-5 h-5 ${showParticles ? 'text-primary' : 'text-muted-foreground'}`} />
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Command Palette (Cmd/Ctrl + K) */}
      <CommandPalette />

      {/* Spotlight side navigation */}
      <SpotlightNav
        active={activeSection}
        items={[
          { id: 'hero', label: 'Home' },
          { id: 'about', label: 'Su di me' },
          { id: 'education', label: 'Istruzione' },
          { id: 'skills', label: 'Competenze' },
          { id: 'projects', label: 'Progetti' },
          { id: 'experience', label: 'Esperienza' },
          { id: 'hobbies', label: 'Hobby' },
          { id: 'contact', label: 'Contatti' },
        ]}
      />

      <main className="container py-12 space-y-24">
        {/* Hero Section with Parallax */}
        <section
          id="hero"
          className="relative flex flex-col items-center justify-center min-h-[90vh] text-center space-y-6 pt-12 pb-8 overflow-hidden"
          onMouseMove={(e) => {
            const el = e.currentTarget as HTMLElement
            const r = el.getBoundingClientRect()
            const mx = (e.clientX - r.left) / r.width
            const my = (e.clientY - r.top) / r.height
            el.style.setProperty('--mx', String(mx))
            el.style.setProperty('--my', String(my))
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.removeProperty('--mx')
            el.style.removeProperty('--my')
          }}
        >
          {/* Parallax background element */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/10 z-0"
            style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
          ></div>
          {/* Floating geometric shapes for visual interest */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div 
              className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full opacity-30"
              style={{ transform: `translateY(${parallaxOffset * 0.3}px) rotate(${scrollY * 0.05}deg) scale(${1 + scrollY * 0.0001})` }}
            ></div>
            <div 
              className="absolute top-40 right-20 w-24 h-24 border border-primary/30 rounded-lg opacity-40"
              style={{ transform: `translateY(${parallaxOffset * 0.4}px) rotate(${-scrollY * 0.08}deg) scale(${1 + scrollY * 0.00008})` }}
            ></div>
            <div 
              className="absolute bottom-40 left-20 w-20 h-20 border border-primary/25 opacity-30"
              style={{ transform: `translateY(${parallaxOffset * 0.2}px) rotate(${scrollY * 0.12}deg) scale(${1 + scrollY * 0.00012})` }}
            ></div>
          </div>
          {/* Enhanced radial gradient overlay */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-background/40 to-background"></div>
          {/* Cursor spotlight overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                'radial-gradient(220px 220px at calc(var(--mx, 0.5) * 100%) calc(var(--my, 0.5) * 100%), hsl(var(--primary) / 0.16), transparent 60%)',
              transition: 'background-position 120ms ease-out'
            }}
          />

          {/* Content of the hero section (z-10 to be above parallax background) */}
          <RevealOnScroll animation="animate-fade-in" delay="delay-0" className="relative z-10">
            <Tilt className="relative rounded-full" maxTilt={10} scale={1.02}>
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <Image
                  src="/images/mario-celzo.jpeg"
                  alt="Mario Celzo"
                  width={160}
                  height={160}
                  className="object-cover object-center-[50%_30%]"
                />
              </div>
            </Tilt>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-100" className="relative z-10">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg font-display gradient-text gradient-text-animated">
              <Typewriter texts={["Mario Celzo"]} pauseBeforeDelete={2400} />
            </h1>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-200" className="relative z-10">
            <p className="text-3xl md:text-4xl font-semibold drop-shadow-md gradient-text font-display">
              <Typewriter
                texts={["Software Developer", "Frontend Developer", "Mobile Developer"]}
                typingSpeed={60}
                deleteSpeed={40}
                pauseBeforeDelete={2000}
                pauseBeforeType={300}
              />
            </p>
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
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg btn-glow">
                <Link href="#projects" prefetch={false}>
                  Esplora i miei Progetti
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg btn-glow">
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
            <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01] card-elevate">
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
              <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01] card-elevate">
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
                    Percorso accademico incentrato su: Programmazione (Java, Python, C, C#), Sistemi Operativi, Basi di
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
              <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01] card-elevate">
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
            <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 card-elevate">
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
              <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01] card-elevate">
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
              <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01] card-elevate">
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

        {/* Enhanced Projects Section */}
        <section id="projects" className="space-y-8 scroll-mt-16">
          <RevealOnScroll animation="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">Progetti</h2>
          </RevealOnScroll>
          {/* Category Filters */}
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-100">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  size="sm"
                  variant="outline"
                  className={`px-4 ${projectFilter === cat ? 'border-primary text-primary bg-primary/10' : 'text-muted-foreground'}`}
                  onClick={() => setProjectFilter(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </RevealOnScroll>
          <div className="grid gap-8 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <RevealOnScroll key={project.id} animation="animate-fade-in-up" delay={`delay-${(index + 2) * 100}`}>
                <Tilt className="relative rounded-xl">
                  <Card 
                    className="project-card bg-card border-border group cursor-pointer card-elevate relative"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-center w-full h-40 bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-4 relative overflow-hidden">
                        <project.icon className="w-24 h-24 text-primary z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-primary">{project.title} ({project.year})</CardTitle>
                          <Badge className={`${project.badgeColor} text-white`}>{project.badge}</Badge>
                        </div>
                        <Eye className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardHeader>
                    <CardContent className="text-foreground space-y-4">
                      <p className="text-sm leading-relaxed">{project.fullDescription}</p>
                      
                      {/* Tech Stack */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-primary">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, techIndex) => (
                            <Badge 
                              key={techIndex} 
                              variant="outline" 
                              className="tech-badge text-xs border-primary/30 text-primary/80 hover:bg-primary/10"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Project Stats */}
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-primary">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        {project.github && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Link href={project.github} target="_blank" prefetch={false}>
                              <Github className="w-4 h-4 mr-2" /> GitHub
                            </Link>
                          </Button>
                        )}
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Link href={project.liveUrl} target="_blank" prefetch={false}>
                            <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Tilt>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <Separator className="bg-border" />

        {/* Work Experience Section */}
        <section id="experience" className="space-y-8 scroll-mt-16">
          <RevealOnScroll animation="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">Esperienza Lavorativa</h2>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-fade-in-up" delay="delay-200">
            <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01] card-elevate">
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
              <Card className="bg-card border-border text-center p-6 hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01] card-elevate">
                <Car className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-primary">Formula 1</CardTitle>
                <CardContent className="text-foreground pt-2">
                  Passione che coltivo sin da piccolo analizzando strategie di gara e dinamiche tecniche, sviluppando
                  pensiero critico e capacità decisionali sotto pressione.
                </CardContent>
              </Card>
            </RevealOnScroll>
            <RevealOnScroll animation="animate-fade-in-up" delay="delay-300">
              <Card className="bg-card border-border text-center p-6 hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01] card-elevate">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-primary">Tecnologia e Innovazione</CardTitle>
                <CardContent className="text-foreground pt-2">
                  Sempre aggiornato sulle ultime tendenze tech, con sperimentazione pratica di hardware/software per
                  affinare l&apos;apprendimento continuo.
                </CardContent>
              </Card>
            </RevealOnScroll>
            <RevealOnScroll animation="animate-fade-in-up" delay="delay-400">
              <Card className="bg-card border-border text-center p-6 hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01] card-elevate">
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
                    <Link href="/CV_MARIO_CELZO.pdf" target="_blank" prefetch={false}>
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
            <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.01] card-elevate">
              <CardContent className="pt-6 grid gap-4 text-lg text-foreground">
                <div className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <EmailCopy />
                </div>
                <div className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Github className="w-5 h-5 text-primary" />
                  </div>
                  <Link
                    href="https://github.com/mariocelzo"
                    target="_blank"
                    className="hover:text-primary transition-colors font-medium"
                    prefetch={false}
                  >
                    github.com/mariocelzo
                  </Link>
                </div>
                <div className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <Link
                    href="https://www.linkedin.com/in/mario-celzo-40917a2b9/"
                    target="_blank"
                    className="hover:text-primary transition-colors font-medium"
                    prefetch={false}
                  >
                    linkedin.com/in/mario-celzo
                  </Link>
                </div>
              </CardContent>
            </Card>
          </RevealOnScroll>
        </section>
      </main>

      {/* Interactive Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="modal-overlay absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />
          <div className="modal-content relative bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const project = projects.find(p => p.id === selectedProject)
              if (!project) return null
              
              return (
                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <project.icon className="w-8 h-8 text-primary" />
                      <div>
                        <h2 className="text-2xl font-bold text-primary">{project.title}</h2>
                        <p className="text-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProject(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </Button>
                  </div>

                  {/* Project Image/Preview */}
                  <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                    <project.icon className="w-32 h-32 text-primary/50" />
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">About the Project</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Key Features</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="tech-badge border-primary/30 text-primary"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Project Statistics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{value}</div>
                          <div className="text-sm text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    {project.github && (
                      <Button asChild className="flex-1">
                        <Link href={project.github} target="_blank" prefetch={false}>
                          <Github className="w-4 h-4 mr-2" /> View Code
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={project.liveUrl} target="_blank" prefetch={false}>
                        <Play className="w-4 h-4 mr-2" /> Live Demo
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {isMounted && scrollY > 500 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <ChevronDown className="w-6 h-6 mx-auto transform rotate-180" />
        </button>
      )}

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

function EmailCopy() {
  const [copied, setCopied] = React.useState(false)
  const email = "mariocelzo003@gmail.com"
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }
  return (
    <div className="flex items-center gap-2">
      <Link href={`mailto:${email}`} className="hover:text-primary transition-colors font-medium" prefetch={false}>
        {email}
      </Link>
      <button
        onClick={onCopy}
        aria-label="Copia email"
        className="text-xs px-2 py-1 rounded border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
      >
        <Copy className="w-3 h-3" /> {copied ? 'Copiato!' : 'Copia'}
      </button>
    </div>
  )
}
