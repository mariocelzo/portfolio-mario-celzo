"use client"

import React from "react"
import { Palette } from "lucide-react"

type Accent = { id: string; name: string; hsl: string }

const ACCENTS: Accent[] = [
  { id: 'blue', name: 'Blue', hsl: '221 83% 53%' },
  { id: 'purple', name: 'Purple', hsl: '262 83% 60%' },
  { id: 'pink', name: 'Pink', hsl: '330 81% 60%' },
  { id: 'orange', name: 'Orange', hsl: '24 95% 53%' },
  { id: 'green', name: 'Green', hsl: '142 71% 45%' },
  { id: 'red', name: 'Red', hsl: '0 84% 60%' },
]

const STORAGE_KEY = 'accent-hsl'

export default function AccentPicker() {
  const [open, setOpen] = React.useState(false)
  const [current, setCurrent] = React.useState<string | null>(null)

  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      applyAccent(saved)
      setCurrent(saved)
    } else {
      setCurrent(getComputedStyle(document.documentElement).getPropertyValue('--primary').trim())
    }
  }, [])

  function applyAccent(hsl: string) {
    const root = document.documentElement
    root.style.setProperty('--primary', hsl)
    root.style.setProperty('--ring', hsl)
  }

  function choose(accent: Accent) {
    applyAccent(accent.hsl)
    setCurrent(accent.hsl)
    localStorage.setItem(STORAGE_KEY, accent.hsl)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Accent color"
        className="w-10 h-10 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 grid place-items-center"
      >
        <Palette className="w-5 h-5 text-primary" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 p-3 rounded-xl bg-card border border-border shadow-xl z-50 w-56">
          <div className="text-xs text-muted-foreground mb-2">Accent color</div>
          <div className="grid grid-cols-6 gap-2">
            {ACCENTS.map(a => (
              <button
                key={a.id}
                onClick={() => choose(a)}
                title={a.name}
                className="w-7 h-7 rounded-full border border-border hover:scale-105 transition-transform"
                style={{ backgroundColor: `hsl(${a.hsl})` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

