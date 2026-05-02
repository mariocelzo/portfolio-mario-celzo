/**
 * Header.tsx
 *
 * Redesigned navigation — macOS dock pill (desktop) + mobile top bar + dropdown.
 *
 * Desktop: always-visible centered pill floating at top of page.
 *   - Contains wordmark, nav links, theme toggle.
 *   - Active section is tracked via IntersectionObserver and highlighted in primary color.
 *
 * Mobile (≤700px): full-width top bar with hamburger menu + slide-down dropdown.
 *   - Dock pill is hidden on small screens via CSS.
 *   - Mobile bar uses backdrop-blur for a frosted-glass look.
 *
 * Uses next-themes directly (no ThemeToggle wrapper needed).
 */

import { Menu, X, Terminal, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Tracks which section id is currently in view
  const [active, setActive] = useState('top');
  const { theme, setTheme } = useTheme();
  const dark = theme === 'dark';

  /**
   * IntersectionObserver — watches each section and sets `active` as the user scrolls.
   * rootMargin crops top/bottom so the section must be well into view to trigger.
   */
  useEffect(() => {
    const ids = ['about', 'experience', 'skills', 'projects', 'contact'];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-38% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const navItems = [
    { name: 'about', id: 'about' },
    { name: 'experience', id: 'experience' },
    { name: 'skills', id: 'skills' },
    { name: 'projects', id: 'projects' },
    { name: 'contact', id: 'contact' },
  ];

  /**
   * go(id) — smooth scroll helper used by both desktop pill and mobile dropdown.
   * Offsets the scroll target by header height so section headings aren't hidden.
   */
  const go = (id: string) => {
    setIsMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = window.innerWidth < 700 ? 64 : 72;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* ── Desktop dock pill ─────────────────────────────────────────────
          Centered frosted-glass pill. Hidden on mobile via CSS at bottom. */}
      <header
        className="dock-header"
        style={{
          position: 'fixed',
          top: 20,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 8px 7px 14px',
            borderRadius: 9999,
            background: 'color-mix(in oklab, var(--card) 72%, transparent)',
            backdropFilter: 'saturate(200%) blur(28px)',
            WebkitBackdropFilter: 'saturate(200%) blur(28px)',
            border: '1px solid color-mix(in oklab, var(--border) 50%, transparent)',
            boxShadow:
              '0 1px 0 rgba(255,255,255,.35) inset, 0 16px 40px -12px rgba(10,20,47,.22), 0 2px 6px rgba(10,20,47,.06)',
          }}
        >
          {/* Wordmark button — scrolls back to top */}
          <button
            onClick={() => go('top')}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '5px 8px',
              borderRadius: 9999,
              font: '700 13px var(--font-mono)',
              color: 'var(--foreground)',
              letterSpacing: '-0.01em',
            }}
          >
            <Terminal size={13} /> mario.sh
          </button>

          {/* Vertical divider between wordmark and nav */}
          <span
            style={{
              width: 1,
              height: 16,
              background: 'color-mix(in oklab, var(--border) 60%, transparent)',
              flexShrink: 0,
            }}
          />

          {/* Navigation links — active section highlighted in primary color */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navItems.map((it) => {
              const isAct = active === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => go(it.id)}
                  style={{
                    border: 'none',
                    background: isAct
                      ? 'color-mix(in oklab, var(--primary) 11%, transparent)'
                      : 'transparent',
                    cursor: 'pointer',
                    padding: '6px 13px',
                    borderRadius: 9999,
                    font: '500 12px var(--font-mono)',
                    color: isAct
                      ? 'var(--primary)'
                      : 'color-mix(in oklab, var(--foreground) 65%, transparent)',
                    transition: 'background .2s, color .2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isAct)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        'color-mix(in oklab, var(--muted) 55%, transparent)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isAct)
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }}
                >
                  ./{it.name}
                </button>
              );
            })}
          </nav>

          {/* Vertical divider between nav and theme toggle */}
          <span
            style={{
              width: 1,
              height: 16,
              background: 'color-mix(in oklab, var(--border) 60%, transparent)',
              flexShrink: 0,
            }}
          />

          {/* Theme toggle button — switches between sun and moon icon */}
          <button
            onClick={() => setTheme(dark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            style={{
              width: 32,
              height: 32,
              borderRadius: 9999,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--foreground)',
              transition: 'background .2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                'color-mix(in oklab, var(--muted) 55%, transparent)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')
            }
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </header>

      {/* ── Mobile top bar ────────────────────────────────────────────────
          Full-width frosted bar shown only on ≤700px.
          Hidden by default — displayed via CSS below. */}
      <div
        className="mobile-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'none', // overridden to flex by media query
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'color-mix(in oklab, var(--background) 85%, transparent)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom:
            '1px solid color-mix(in oklab, var(--border) 50%, transparent)',
        }}
      >
        {/* Wordmark */}
        <button
          onClick={() => go('top')}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            font: '700 14px var(--font-mono)',
            color: 'var(--foreground)',
          }}
        >
          <Terminal size={14} /> mario.sh
        </button>

        {/* Right controls: theme toggle + hamburger */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => setTheme(dark ? 'light' : 'dark')}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--foreground)',
            }}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setIsMenuOpen((o) => !o)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border:
                '1px solid color-mix(in oklab, var(--border) 60%, transparent)',
              background:
                'color-mix(in oklab, var(--card) 60%, transparent)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--foreground)',
            }}
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ──────────────────────────────────────────
          Slides in below the mobile bar when hamburger is toggled.
          Active section item gets primary color. */}
      {isMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: 61,
            left: 0,
            right: 0,
            zIndex: 49,
            background:
              'color-mix(in oklab, var(--background) 95%, transparent)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom:
              '1px solid color-mix(in oklab, var(--border) 50%, transparent)',
            padding: '8px 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {navItems.map((it) => (
            <button
              key={it.id}
              onClick={() => go(it.id)}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 12px',
                borderRadius: 10,
                font: '500 15px var(--font-mono)',
                color: active === it.id ? 'var(--primary)' : 'var(--foreground)',
                textAlign: 'left',
                borderBottom:
                  '1px solid color-mix(in oklab, var(--border) 40%, transparent)',
              }}
            >
              <span style={{ color: 'var(--primary)', opacity: 0.7 }}>{'>'}</span>{' '}
              ./{it.name}
            </button>
          ))}
        </div>
      )}

      {/* Responsive visibility rules for dock vs mobile bar */}
      <style>{`
        @media (max-width: 700px) {
          .dock-header { display: none !important; }
          .mobile-bar { display: flex !important; }
        }
      `}</style>
    </>
  );
}
