"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-10 h-10 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icons */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-primary transition-all duration-300 group-hover:scale-110" />
        ) : (
          <Sun className="w-5 h-5 text-primary transition-all duration-300 group-hover:scale-110" />
        )}
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  )
}
