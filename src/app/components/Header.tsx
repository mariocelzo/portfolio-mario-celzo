/**
 * Header.tsx — navbar "macOS dock" fluttuante in stile pill.
 *
 * Design:
 * - Pill glass fissa centrata in alto
 * - Logo "mario.sh" con icona terminale
 * - Nav centrale con voci mono (./about, ./experience, ...)
 * - Indicatore "active" evidenzia la sezione corrente mentre scrolli
 * - Toggle tema (next-themes) a destra
 *
 * Riferimento design: bundle Header.jsx
 */
import { Terminal, Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  smoothScrollTo,
  useActiveSection,
} from "./brand/Primitives";

// Voci del nav — l'id deve matchare l'id della <section> corrispondente
const NAV_ITEMS = [
  { name: "about", id: "about" },
  { name: "experience", id: "experience" },
  { name: "skills", id: "skills" },
  { name: "projects", id: "projects" },
  { name: "contact", id: "contact" },
] as const;

export function Header() {
  // Next-themes: fino a mount facciamo rendering "neutro" per evitare mismatch SSR/CSR
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS.map((i) => i.id));

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (resolvedTheme ?? theme) === "dark";

  // onNav chiamato sia dal desktop che dal mobile menu
  const onNav = (id: string) => {
    smoothScrollTo(id);
    setMobileOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        // pointerEvents none sull'header + auto sulla pill → i click passano ai contenuti sotto
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 10px 8px 16px",
          borderRadius: 9999,
          background: "color-mix(in oklab, var(--card) 70%, transparent)",
          backdropFilter: "saturate(180%) blur(28px)",
          WebkitBackdropFilter: "saturate(180%) blur(28px)",
          border: "1px solid color-mix(in oklab, var(--border) 50%, transparent)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,.4) inset, 0 20px 40px -12px rgba(10,20,47,.25), 0 2px 6px -1px rgba(10,20,47,.08)",
        }}
      >
        {/* Logo mario.sh — clicca per tornare in cima */}
        <button
          onClick={() => onNav("top")}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 10px",
            borderRadius: 9999,
            font: "700 13px var(--font-mono)",
            color: "var(--foreground)",
            letterSpacing: "-0.01em",
          }}
        >
          <Terminal size={14} />
          mario.sh
        </button>

        {/* Separator */}
        <span
          style={{
            width: 1,
            height: 18,
            background: "color-mix(in oklab, var(--border) 70%, transparent)",
          }}
        />

        {/* Nav desktop — nascosta sotto 720px via .mc-nav-desktop */}
        <nav
          className="mc-nav-desktop"
          style={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          {NAV_ITEMS.map((it) => {
            const isActive = active === it.id;
            return (
              <button
                key={it.id}
                onClick={() => onNav(it.id)}
                style={{
                  border: "none",
                  background: isActive
                    ? "color-mix(in oklab, var(--primary) 12%, transparent)"
                    : "transparent",
                  cursor: "pointer",
                  padding: "7px 14px",
                  borderRadius: 9999,
                  font: "500 13px var(--font-mono)",
                  color: isActive
                    ? "var(--primary)"
                    : "color-mix(in oklab, var(--foreground) 70%, transparent)",
                  transition: "background .25s var(--ease-out-expo), color .25s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background =
                      "color-mix(in oklab, var(--muted) 60%, transparent)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                ./{it.name}
              </button>
            );
          })}
        </nav>

        <span
          style={{
            width: 1,
            height: 18,
            background: "color-mix(in oklab, var(--border) 70%, transparent)",
          }}
        />

        {/* Theme toggle — usa next-themes, mostra placeholder finché non è montato */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
          style={{
            width: 34,
            height: 34,
            borderRadius: 9999,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--foreground)",
            transition: "background .2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "color-mix(in oklab, var(--muted) 60%, transparent)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {mounted ? (
            isDark ? <Sun size={15} /> : <Moon size={15} />
          ) : (
            <Sun size={15} style={{ opacity: 0 }} />
          )}
        </button>

        {/* Hamburger mobile — visibile solo sotto 720px */}
        <button
          className="mc-nav-mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            display: "none", // default hidden, override via CSS
            width: 34,
            height: 34,
            borderRadius: 9999,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--foreground)",
          }}
        >
          {mobileOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>

      {/* Pannello mobile — appare sotto la pill quando hamburger aperto */}
      {mobileOpen && (
        <div
          style={{
            pointerEvents: "auto",
            position: "absolute",
            top: 72,
            left: 20,
            right: 20,
            padding: 16,
            borderRadius: 16,
            background: "color-mix(in oklab, var(--card) 92%, transparent)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
            boxShadow: "var(--shadow-2xl)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_ITEMS.map((it) => (
            <button
              key={it.id}
              onClick={() => onNav(it.id)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: "10px 14px",
                textAlign: "left",
                borderRadius: 10,
                font: "500 14px var(--font-mono)",
                color: "var(--foreground)",
              }}
            >
              <span style={{ color: "var(--primary)", marginRight: 8 }}>&gt;</span>
              {it.name}
            </button>
          ))}
        </div>
      )}

      {/* Piccolo inline CSS — toggle visibility del mobile toggle */}
      <style>{`
        .mc-nav-mobile-toggle { display: none !important; }
        @media (max-width: 720px) {
          .mc-nav-mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
