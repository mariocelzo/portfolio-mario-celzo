"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Funzione per gestire il cambio tema con animazione smooth
  const handleThemeChange = () => {
    setIsAnimating(true)

    // Aggiungi classe per transizione smooth su tutto il documento
    document.documentElement.classList.add('theme-transition')

    // Cambia il tema
    setTheme(theme === "light" ? "dark" : "light")

    // Rimuovi la classe dopo l'animazione
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
      setIsAnimating(false)
    }, 500)
  }

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
    )
  }

  // Determina il tema corrente considerando anche la preferenza di sistema
  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <button
      onClick={handleThemeChange}
      disabled={isAnimating}
      className="relative w-10 h-10 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden disabled:opacity-50"
      aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
      title={`Current: ${currentTheme} mode`}
    >
      {/* Background gradient animato */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Container per le icone con animazione flip */}
      <div className="relative z-10 flex items-center justify-center w-full h-full perspective-1000">
        {/* Icona Moon (dark mode) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            currentTheme === "light"
              ? "opacity-0 rotate-180 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Moon className="w-5 h-5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
        </div>

        {/* Icona Sun (light mode) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            currentTheme === "light"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-180 scale-0"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Sun className="w-5 h-5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
        </div>
      </div>

      {/* Ripple effect on click */}
      <span className="absolute inset-0 rounded-lg">
        <span className="absolute inset-0 rounded-lg bg-primary/20 scale-0 group-active:scale-100 opacity-0 group-active:opacity-100 transition-all duration-300" />
      </span>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    </button>
  )
}
