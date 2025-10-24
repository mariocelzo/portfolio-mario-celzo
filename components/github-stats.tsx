"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Github,
  GitBranch,
  Star,
  Users,
  Code,
  TrendingUp,
  ExternalLink,
  Activity
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Tipi per le risposte dell'API GitHub
interface GitHubUser {
  login: string
  name: string
  bio: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  html_url: string
}

interface GitHubRepo {
  name: string
  stargazers_count: number
  language: string | null
  fork: boolean
}

interface LanguageStats {
  [language: string]: number
}

interface GitHubStatsData {
  user: GitHubUser | null
  totalStars: number
  languages: LanguageStats
  topLanguages: Array<{ name: string; percentage: number; color: string }>
  isLoading: boolean
  error: string | null
}

// Mappa dei colori per i linguaggi di programmazione (basata su GitHub)
const languageColors: { [key: string]: string } = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Shell: "#89e051"
}

export function GitHubStats({ username = "mariocelzo" }: { username?: string }) {
  const [stats, setStats] = useState<GitHubStatsData>({
    user: null,
    totalStars: 0,
    languages: {},
    topLanguages: [],
    isLoading: true,
    error: null
  })

  useEffect(() => {
    // Funzione per fetchare i dati dall'API GitHub con gestione errori migliorata
    const fetchGitHubData = async () => {
      try {
        setStats(prev => ({ ...prev, isLoading: true, error: null }))

        // Fetch user data con headers per migliorare rate limiting
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        })

        // Gestione errori specifici
        if (userResponse.status === 403) {
          throw new Error("Rate limit API GitHub raggiunto. Riprova tra qualche minuto.")
        }
        if (userResponse.status === 404) {
          throw new Error("Utente GitHub non trovato")
        }
        if (!userResponse.ok) {
          throw new Error(`Errore ${userResponse.status}: Impossibile recuperare i dati utente`)
        }

        const userData: GitHubUser = await userResponse.json()

        // Fetch repositories (massimo 100 per non sovraccaricare)
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        )

        if (reposResponse.status === 403) {
          throw new Error("Rate limit API GitHub raggiunto. Riprova tra qualche minuto.")
        }
        if (!reposResponse.ok) {
          throw new Error(`Errore ${reposResponse.status}: Impossibile recuperare le repository`)
        }

        const reposData: GitHubRepo[] = await reposResponse.json()

        // Calcola il totale delle stelle (escludendo i fork)
        const totalStars = reposData
          .filter(repo => !repo.fork)
          .reduce((acc, repo) => acc + repo.stargazers_count, 0)

        // Calcola le statistiche dei linguaggi
        const languageStats: LanguageStats = {}
        reposData.forEach(repo => {
          if (repo.language && !repo.fork) {
            languageStats[repo.language] = (languageStats[repo.language] || 0) + 1
          }
        })

        // Ordina i linguaggi per frequenza e calcola le percentuali
        const totalRepos = Object.values(languageStats).reduce((a, b) => a + b, 0)
        const topLanguages = Object.entries(languageStats)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5) // Top 5 linguaggi
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / totalRepos) * 100),
            color: languageColors[name] || "#8b949e"
          }))

        setStats({
          user: userData,
          totalStars,
          languages: languageStats,
          topLanguages,
          isLoading: false,
          error: null
        })
      } catch (error) {
        console.error("Errore nel caricamento delle stats GitHub:", error)
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Errore sconosciuto"
        }))
      }
    }

    fetchGitHubData()
  }, [username])

  // Loading skeleton
  if (stats.isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Error state con pulsante retry
  if (stats.error || !stats.user) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <Github className="w-12 h-12 text-destructive/50" />
            <p className="text-destructive font-medium">
              {stats.error || "Impossibile caricare le statistiche GitHub"}
            </p>
            <p className="text-sm text-muted-foreground max-w-md">
              {stats.error?.includes("Rate limit")
                ? "L'API di GitHub ha un limite di 60 richieste all'ora. Riprova più tardi o visita direttamente il profilo GitHub."
                : "Si è verificato un errore nel caricamento dei dati. Controlla la connessione e riprova."}
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              Riprova
            </button>
            <Link
              href="https://github.com/mariocelzo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors text-sm inline-flex items-center gap-2"
            >
              Visita Profilo GitHub <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { user, totalStars, topLanguages } = stats

  // Calcola gli anni su GitHub
  const yearsOnGitHub = new Date().getFullYear() - new Date(user.created_at).getFullYear()

  return (
    <div className="space-y-4">
      {/* Header con info utente - Versione compatta */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Avatar con bordo animato - Ridotto */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%] rounded-full animate-gradient-x blur-sm" />
            <img
              src={user.avatar_url}
              alt={user.name}
              className="relative w-12 h-12 rounded-full border-2 border-background"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <Github className="w-5 h-5" />
              {user.name}
            </h3>
            <p className="text-sm text-muted-foreground">@{user.login}</p>
          </div>
        </div>
        <Link
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        >
          Vedi Profilo <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Grid delle statistiche principali - Layout più compatto */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        {/* Repository Pubbliche - Versione compatta */}
        <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Repository
            </CardTitle>
            <GitBranch className="w-3 h-3 text-primary" />
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="text-2xl font-bold text-primary">{user.public_repos}</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Pubbliche</p>
          </CardContent>
        </Card>

        {/* Stelle Totali - Versione compatta */}
        <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border hover:border-yellow-500/50">
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Stelle
            </CardTitle>
            <Star className="w-3 h-3 text-yellow-500" />
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="text-2xl font-bold text-yellow-500">{totalStars}</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Totali</p>
          </CardContent>
        </Card>

        {/* Followers - Versione compatta */}
        <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border hover:border-green-500/50">
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Followers
            </CardTitle>
            <Users className="w-3 h-3 text-green-500" />
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="text-2xl font-bold text-green-500">{user.followers}</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Seguaci</p>
          </CardContent>
        </Card>

        {/* Anni su GitHub - Versione compatta */}
        <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border hover:border-purple-500/50">
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Esperienza
            </CardTitle>
            <Activity className="w-3 h-3 text-purple-500" />
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="text-2xl font-bold text-purple-500">{yearsOnGitHub}+</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Anni</p>
          </CardContent>
        </Card>
      </div>

      {/* Linguaggi più usati - Versione compatta in una sola card */}
      <Card className="border hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-primary text-base">
            <Code className="w-4 h-4" />
            Linguaggi Più Usati
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topLanguages.slice(0, 3).map((lang, index) => (
            <div key={lang.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="font-medium">{lang.name}</span>
                </div>
                <span className="text-muted-foreground">{lang.percentage}%</span>
              </div>
              {/* Progress bar animata - Ridotta */}
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-1000 ease-out rounded-full"
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                    transitionDelay: `${index * 100}ms`
                  }}
                />
              </div>
            </div>
          ))}

          {/* Tags dei linguaggi rimanenti */}
          {topLanguages.length > 3 && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
              {topLanguages.slice(3).map(lang => (
                <Badge
                  key={lang.name}
                  variant="outline"
                  className="px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    borderColor: lang.color,
                    color: lang.color
                  }}
                >
                  {lang.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
