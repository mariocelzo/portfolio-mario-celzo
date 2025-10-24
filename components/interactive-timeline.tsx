"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Trophy,
  Briefcase,
  Laptop,
  Smartphone,
  Car,
  Calendar,
  MapPin,
  ChevronRight,
  Code
} from "lucide-react"
import { cn } from "@/lib/utils"

// Definizione dei tipi per gli eventi della timeline
type TimelineEventType = "education" | "work" | "project"

interface TimelineEvent {
  id: string
  type: TimelineEventType
  title: string
  subtitle: string
  location?: string
  date: string
  dateStart: Date // Per ordinamento cronologico
  description: string
  icon: React.ElementType
  color: string
  tags?: string[]
  link?: string
}

// Dati della timeline - unisce educazione, esperienze e progetti in ordine cronologico
// Ordinamento: dal più vecchio al più recente per mostrare la progressione del percorso
const timelineEvents: TimelineEvent[] = [
  {
    id: "parrucchieri",
    type: "work" as TimelineEventType,
    title: "Assistente Gestione Salone",
    subtitle: "Parrucchieri Susy&Tito",
    location: "Attività di famiglia",
    date: "Estate 2018-2019",
    dateStart: new Date("2018-06-01"),
    description: "Gestione prenotazioni, relazioni con clienti, controllo inventario e procedure operative. Sviluppate competenze in servizio clienti, multitasking e gestione dello stress.",
    icon: Briefcase,
    color: "bg-orange-500",
    tags: ["Customer Service", "Team Management", "Problem Solving"]
  },
  {
    id: "liceo",
    type: "education" as TimelineEventType,
    title: "Diploma Liceo Scientifico",
    subtitle: "Liceo Scientifico Tito Lucrezio Caro",
    location: "Sarno (SA), Italia",
    date: "2017 - 2022",
    dateStart: new Date("2017-09-01"),
    description: "Diploma di maturità scientifica con solido background in materie STEM, fondamentale per sviluppare approccio analitico e logico alla risoluzione dei problemi.",
    icon: Trophy,
    color: "bg-yellow-500",
    tags: ["Matematica", "Fisica", "Informatica"]
  },
  {
    id: "target",
    type: "project" as TimelineEventType,
    title: "TARGET - Piattaforma E-commerce",
    subtitle: "Progetto Universitario",
    date: "2024",
    dateStart: new Date("2024-01-01"),
    description: "Piattaforma di compravendita tra privati sviluppata con React, Next.js e Firebase. Sistema completo con autenticazione, gestione annunci e chat in tempo reale.",
    icon: Laptop,
    color: "bg-green-500",
    tags: ["React", "Next.js", "TypeScript", "Firebase"],
    link: "https://v0-target-svp6klexsij.vercel.app/"
  },
  {
    id: "bodylife",
    type: "project" as TimelineEventType,
    title: "BODYLIFE - Fitness App",
    subtitle: "Progetto IUM",
    date: "2025",
    dateStart: new Date("2025-01-01"),
    description: "App mobile per monitoraggio fitness e peso, con focus su UI/UX design intuitivo e esperienza utente ottimizzata.",
    icon: Smartphone,
    color: "bg-blue-500",
    tags: ["React Native", "Expo", "Figma"],
    link: "https://body-life-teal.vercel.app/"
  },
  {
    id: "adas",
    type: "project" as TimelineEventType,
    title: "ADAS Testing & Analysis",
    subtitle: "Progetto di Tesi",
    date: "2025",
    dateStart: new Date("2025-02-01"),
    description: "Pipeline completa per testing di sistemi ADAS: gestione dataset, valutazione modelli di visione (lane/vehicle detection), metriche di accuratezza e automazione report.",
    icon: Car,
    color: "bg-purple-500",
    tags: ["Python", "OpenCV", "PyTorch", "Docker"],
    link: "https://github.com/mariocelzo/adas_testing"
  },
  {
    id: "laurea",
    type: "education" as TimelineEventType,
    title: "Laurea Triennale in Informatica",
    subtitle: "Università degli Studi di Salerno",
    location: "Fisciano (SA), Italia",
    date: "2022 - 2025",
    dateStart: new Date("2025-09-01"), // Data modificata per posizionare dopo i progetti nella timeline
    description: "Percorso accademico incentrato su Programmazione, Algoritmi, Basi di Dati, Ingegneria del Software e Interazione Uomo-Macchina. Attualmente al 90% del completamento con focus su sistemi ADAS per la tesi.",
    icon: BookOpen,
    color: "bg-blue-500",
    tags: ["Java", "Python", "SQL", "Software Engineering"]
  },
  {
    id: "corso-attuale",
    type: "education" as TimelineEventType,
    title: "Ingegneria del Software e IT Management",
    subtitle: "Università degli Studi di Salerno",
    location: "Fisciano (SA), Italia",
    date: "Oggi - In corso",
    dateStart: new Date("2025-10-01"), // Data fissa per evitare hydration mismatch - sempre l'ultimo
    description: "Corso di specializzazione avanzato focalizzato su metodologie di sviluppo software, architetture enterprise, gestione progetti IT, DevOps e best practices per lo sviluppo di sistemi software scalabili e manutenibili.",
    icon: Code,
    color: "bg-indigo-500",
    tags: ["Software Architecture", "Project Management", "DevOps", "Agile"]
  }
].sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime()) // Ordine cronologico: dal più vecchio al più recente

export function InteractiveTimeline() {
  const [activeEvent, setActiveEvent] = useState<string | null>(null)
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Intersection Observer per animare gli eventi quando entrano nel viewport
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = entry.target.getAttribute("data-event-id")
            if (eventId) {
              setVisibleEvents((prev) => new Set(prev).add(eventId))
            }
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
      }
    )

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  // Osserva gli elementi della timeline quando vengono montati
  useEffect(() => {
    const elements = document.querySelectorAll("[data-event-id]")
    elements.forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => {
      elements.forEach((el) => {
        observerRef.current?.unobserve(el)
      })
    }
  }, [])

  // Mappa dei colori per tipo di evento
  const getTypeColor = (type: TimelineEventType) => {
    switch (type) {
      case "education":
        return "border-blue-500"
      case "work":
        return "border-orange-500"
      case "project":
        return "border-green-500"
      default:
        return "border-primary"
    }
  }

  // Mappa delle etichette per tipo di evento
  const getTypeLabel = (type: TimelineEventType) => {
    switch (type) {
      case "education":
        return "Istruzione"
      case "work":
        return "Esperienza"
      case "project":
        return "Progetto"
    }
  }

  return (
    <div className="relative">
      {/* Legenda Filtri */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        <Badge variant="outline" className="border-blue-500 text-blue-500 bg-blue-500/10">
          <BookOpen className="w-3 h-3 mr-1" />
          Istruzione
        </Badge>
        <Badge variant="outline" className="border-green-500 text-green-500 bg-green-500/10">
          <Laptop className="w-3 h-3 mr-1" />
          Progetti
        </Badge>
        <Badge variant="outline" className="border-orange-500 text-orange-500 bg-orange-500/10">
          <Briefcase className="w-3 h-3 mr-1" />
          Esperienze
        </Badge>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Linea verticale centrale */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

        {/* Eventi della timeline */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => {
            const isVisible = visibleEvents.has(event.id)
            const isActive = activeEvent === event.id
            const Icon = event.icon

            return (
              <div
                key={event.id}
                data-event-id={event.id}
                className={cn(
                  "relative transition-all duration-700 ease-out",
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Layout responsive: mobile = sinistra, desktop = alternato */}
                <div className={cn(
                  "flex items-center gap-4 md:gap-8",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}>
                  {/* Spaziatore per layout desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Pallino indicatore sulla timeline */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                        event.color,
                        "text-white shadow-lg",
                        isActive && "scale-125 ring-4 ring-primary/30"
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Linea di connessione al card */}
                    <div className={cn(
                      "hidden md:block absolute top-1/2 w-8 h-0.5 bg-border",
                      index % 2 === 0 ? "left-full" : "right-full"
                    )} />
                  </div>

                  {/* Card con contenuto dell'evento */}
                  <div className="flex-1 md:w-1/2">
                    <Card
                      className={cn(
                        "border-2 transition-all duration-300 cursor-pointer hover:shadow-xl",
                        getTypeColor(event.type),
                        isActive ? "shadow-xl scale-105" : "hover:scale-102"
                      )}
                      onMouseEnter={() => setActiveEvent(event.id)}
                      onMouseLeave={() => setActiveEvent(null)}
                      onClick={() => {
                        if (event.link) {
                          window.open(event.link, "_blank")
                        }
                      }}
                    >
                      <CardContent className="p-6 space-y-3">
                        {/* Header con tipo e data */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <Badge variant="outline" className={cn("text-xs", getTypeColor(event.type))}>
                            {getTypeLabel(event.type)}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {event.date}
                          </div>
                        </div>

                        {/* Titolo e sottotitolo */}
                        <div>
                          <h3 className="font-bold text-lg text-primary mb-1 flex items-center gap-2">
                            {event.title}
                            {event.link && (
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">{event.subtitle}</p>
                          {event.location && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </div>
                          )}
                        </div>

                        {/* Descrizione */}
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {event.description}
                        </p>

                        {/* Tags tecnologie */}
                        {event.tags && event.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {event.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs px-2 py-0.5"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Indicatore link esterno */}
                        {event.link && (
                          <div className="text-xs text-primary/70 flex items-center gap-1 pt-1">
                            <ChevronRight className="w-3 h-3" />
                            Clicca per visualizzare
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Fade out alla fine della timeline */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
