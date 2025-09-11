"use client"

import React from "react"

type Item = { id: string; label: string }

export default function SpotlightNav({ active, items }: { active: string; items: Item[] }) {
  const onClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <aside className="hidden md:block fixed right-4 top-1/2 -translate-y-1/2 z-40">
      <nav className="flex flex-col gap-3 p-2 rounded-full bg-card/70 border border-border backdrop-blur-sm">
        {items.map((s) => {
          const isActive = active === s.id
          return (
            <button
              key={s.id}
              onClick={() => onClick(s.id)}
              aria-label={s.label}
              className="group relative w-3.5 h-3.5 rounded-full transition-all"
            >
              <span
                className={
                  `absolute inset-0 m-auto w-2.5 h-2.5 rounded-full ` +
                  (isActive ? 'bg-primary shadow-[0_0_0_4px] shadow-primary/20' : 'bg-muted')
                }
              />
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs px-2 py-1 rounded bg-card border border-border text-foreground opacity-0 translate-x-2 transition-all pointer-events-none group-hover:opacity-100 group-hover:translate-x-0">
                {s.label}
              </span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
