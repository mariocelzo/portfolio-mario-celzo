"use client"

import { useEffect, useMemo, useState } from "react"
import { useTheme } from "next-themes"

type CommandItem = {
  id: string
  label: string
  hint?: string
  action: () => void
  group?: string
}

export function CommandPalette() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  // Sections present in this page
  const sections: CommandItem[] = [
    { id: "about", label: "Vai a: Su di me", group: "Sezioni", action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "education", label: "Vai a: Istruzione", group: "Sezioni", action: () => document.getElementById("education")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "skills", label: "Vai a: Competenze", group: "Sezioni", action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "projects", label: "Vai a: Progetti", group: "Sezioni", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "experience", label: "Vai a: Esperienza", group: "Sezioni", action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "contact", label: "Vai a: Contatti", group: "Sezioni", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
  ]

  const actions: CommandItem[] = [
    { id: "github", label: "Apri GitHub", hint: "g", group: "Azioni", action: () => window.open("https://github.com/mariocelzo", "_blank") },
    { id: "cv", label: "Scarica CV", hint: "d", group: "Azioni", action: () => window.open("/CV_MARIO_CELZO.pdf", "_blank") },
    { id: "theme", label: theme === "dark" ? "Tema: chiaro" : "Tema: scuro", group: "Azioni", action: () => setTheme(theme === "dark" ? "light" : "dark") },
  ]

  const items = useMemo(() => [...sections, ...actions], [theme])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return items
    return items
      .map(it => ({
        item: it,
        score: (it.label.toLowerCase().includes(q) ? 2 : 0) + (it.id.toLowerCase().includes(q) ? 1 : 0),
      }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(x => x.item)
  }, [query, items])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k"
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault()
        setOpen(v => !v)
      }
      if (open) {
        if (e.key === "Escape") setOpen(false)
      }
      // quick hotkeys when open
      if (open && !e.metaKey && !e.ctrlKey) {
        if (e.key.toLowerCase() === "g") actions.find(a => a.id === "github")?.action()
        if (e.key.toLowerCase() === "d") actions.find(a => a.id === "cv")?.action()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, actions])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative max-w-xl mx-auto mt-24">
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
          <div className="px-4 py-3 border-b border-border">
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cerca: ‘Progetti’, ‘GitHub’, ‘Tema’…"
              className="w-full bg-transparent outline-none text-base placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-[50vh] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-4 text-muted-foreground">Nessun risultato</div>
            ) : (
              <ul>
                {filtered.map((it, idx) => (
                  <li key={it.id}>
                    <button
                      onClick={() => { it.action(); setOpen(false) }}
                      className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors flex items-center justify-between"
                    >
                      <span className="text-sm">
                        <span className="text-muted-foreground mr-2">{it.group ?? ""}</span>
                        {it.label}
                      </span>
                      {it.hint && (
                        <span className="text-[10px] px-2 py-1 rounded bg-muted text-muted-foreground border border-border">
                          {it.hint}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="px-4 py-2 text-xs text-muted-foreground border-t border-border">
            Suggerimento: premi Cmd/Ctrl + K per aprire
          </div>
        </div>
      </div>
    </div>
  )
}

