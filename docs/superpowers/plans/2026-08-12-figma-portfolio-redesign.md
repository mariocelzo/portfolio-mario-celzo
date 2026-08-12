# Figma Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the live portfolio (Vite + React, branch `figma-portfolio-redesign`, based on `old-portfolio/main`) to match the visual language of the Figma "Developer Portfolio Website Design" community file, while keeping the existing bilingual content model, scroll-reveal animations, sticky header, and Vercel analytics.

**Architecture:** Pure re-skin, no data/routing changes. A new modular CSS system (`src/styles/tx/*.css`) replaces the single 1320-line `src/styles/index.css`. Poppins replaces Instrument Serif + JetBrains Mono everywhere. Two components get real markup changes (`TxHero.tsx` for the avatar/gradient headline/pill CTAs, `TxExperience.tsx` for the flat logo-led list); the rest are CSS-only re-skins. Two files are deleted (`TxAscii3D.tsx`, `TxAccent.tsx`) along with their now-unused dependency (`three`).

**Tech Stack:** Vite 6, React 18, plain CSS (no Tailwind classes are used by the `Tx*` components — Tailwind is present in the repo but this design system is hand-written CSS, following the existing `src/styles/index.css` convention). No test framework is configured in this project (no `vitest`/`jest`, no `tsconfig.json` for a typecheck step) — verification per task is `pnpm build` (catches syntax errors and unresolved imports) plus a visual check in the dev server (`pnpm dev`), matching how this codebase has always been verified.

Design spec: [`docs/superpowers/specs/2026-08-12-figma-portfolio-redesign-design.md`](../specs/2026-08-12-figma-portfolio-redesign-design.md)

---

## File structure

**New files:**
- `src/styles/tx/tokens.css` — colors, gradients, font stack as CSS custom properties
- `src/styles/tx/base.css` — reset, body, scrollbar, shared primitives (`.tx-section`, `.tx-section__head`, `.tx-btn`, `.reveal`, focus-visible, reduced-motion)
- `src/styles/tx/header.css` — header bar
- `src/styles/tx/hero.css` — hero + marquee
- `src/styles/tx/work.css` — project cards
- `src/styles/tx/experience.css` — experience list + company logo badges
- `src/styles/tx/contact-footer.css` — contact block + footer bar
- `src/styles/tx/misc-sections.css` — Now / Stack / Education / Behind (sections Figma didn't design, re-skinned with the same tokens)
- `public/assets/logos/tech/{kubernetes,docker,terraform,azuredevops,react}.svg`
- `public/assets/logos/companies/{reply.svg,lutech.jpg,nepta.svg,unisa.png}`

**Modified files:**
- `index.html` — font links, remove accent script/scanline div, update meta description
- `src/styles/index.css` — becomes an import manifest for the files above
- `src/app/content.tsx` — add `logo?: string` to `ExpItem`, set it on 6 of 8 entries (IT+EN × 4 jobs, salon entry stays undefined)
- `src/app/components/TxHero.tsx` — remove terminal prompt/scramble/ASCII3D, add avatar + gradient headline + pill CTAs + tech logo row
- `src/app/components/TxExperience.tsx` — flat list with logo badge instead of big-year "deploy log" layout
- `src/app/components/TxContact.tsx` — add social icon row (mail/github/linkedin)
- `src/app/components/TxFooter.tsx` — remove `TxAccent` usage
- `package.json` — remove `three`, `@types/three`

**Deleted files:**
- `src/app/components/TxAscii3D.tsx`
- `src/app/components/TxAccent.tsx`

---

### Task 1: Fonts and document shell cleanup

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Swap the Google Fonts link from Instrument Serif + JetBrains Mono to Poppins**

In `index.html`, replace:
```html
    <!-- Google Fonts: Instrument Serif (per titoli eleganti) + JetBrains Mono (font monospazio principale) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```
with:
```html
    <!-- Google Fonts: Poppins — unico font del design system (Figma "Developer Portfolio Website Design") -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,600&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Remove the accent-switcher anti-FOUC script and the `data-accent` attribute**

Replace the `<html>` tag:
```html
<html lang="it" data-theme="dark" data-accent="mono">
```
with:
```html
<html lang="it" data-theme="dark">
```

Delete the entire anti-FOUC script block (the accent switcher is being removed in Task 9, so this localStorage read/whitelist has nothing left to do):
```html
    <script>
      try {
        var a = localStorage.getItem("mc-tx-accent");
        // Whitelist: un valore sconosciuto lascerebbe --accent indefinito
        // (nessuna regola CSS matcha) rompendo bottoni e accenti
        if (["mono", "lime", "cyan", "violet", "amber"].indexOf(a) !== -1) {
          document.documentElement.setAttribute("data-accent", a);
        }
      } catch (e) {}
    </script>
```

- [ ] **Step 3: Remove the CRT scanline overlay div**

In the `<body>`, replace:
```html
  <body>
    <div id="root"></div>
    <!-- Scanline overlay: effetto CRT/terminale, z-index alto, pointer-events:none -->
    <div class="tx-scan" aria-hidden="true"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
```
with:
```html
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
```

- [ ] **Step 4: Update the OG/Twitter description and JSON-LD wording that references the old "terminal style"**

Replace:
```html
    <meta property="og:image:alt" content="Mario Celzo — DevOps Engineer, portfolio in stile terminale" />
```
with:
```html
    <meta property="og:image:alt" content="Mario Celzo — DevOps Engineer, portfolio personale" />
```

(Leave `og:title`, `og:description`, `twitter:*`, JSON-LD, and `theme-color` untouched — they don't describe the visual style and don't need to change.)

- [ ] **Step 5: Verify**

Run: `pnpm build`
Expected: build succeeds (no output errors). `index.html` has no remaining references to `data-accent`, `mc-tx-accent`, or `tx-scan`.

```bash
grep -c "data-accent\|mc-tx-accent\|tx-scan" index.html
```
Expected: `0`

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "chore: swap fonts to Poppins, drop accent-switcher/scanline shell"
```

---

### Task 2: Design tokens and base primitives

**Files:**
- Create: `src/styles/tx/tokens.css`
- Create: `src/styles/tx/base.css`
- Modify: `src/styles/index.css`

- [ ] **Step 1: Create `src/styles/tx/tokens.css`**

```css
/* ============================================================
   DESIGN TOKENS — colori, gradienti, font.
   Sostituisce il vecchio sistema ad accento singolo (--accent
   selezionabile via data-accent) con i gradienti fissi del
   Figma "Developer Portfolio Website Design", estesi con la
   stessa logica alle sezioni che il Figma non copre.
   ============================================================ */

:root {
  /* Superfici */
  --bg:        #161513; /* sfondo pagina — valore esatto del frame Figma */
  --bg-card:   #2A2A2A; /* card progetti — valore esatto del Figma */
  --bg-soft:   #1C1B19; /* pannelli/hover, leggermente più chiaro di --bg */
  --bg-footer: #191919; /* footer/contact box — valore esatto del Figma */

  /* Testo */
  --ink:       #FFFFFF; /* testo primario */
  --ink-soft:  #C5C5C5; /* testo secondario — valore esatto del Figma */
  --ink-mute:  #8491A0; /* testo terziario/date — valore esatto del Figma */
  --rule:      rgba(255,255,255,0.12);
  --rule-soft: rgba(255,255,255,0.06);

  /* Stato (mantenuto: indicatore disponibilità nell'header, non nel Figma
     ma è un dettaglio funzionale minore, non uno scontro stilistico) */
  --positive: #7FFF6B;
  --positive-soft: rgba(127,255,107,0.12);

  /* Font — Poppins unico, come nel Figma */
  --font-sans: "Poppins", ui-sans-serif, system-ui, sans-serif;

  /* Gradienti sezione — coppia arancio (Projects) e blu (Experience) sono
     i valori esatti del Figma; le altre 4 sezioni (Now/Stack/Edu/Behind,
     non presenti nel Figma) usano nuove coppie nella stessa famiglia
     calda/fredda per restare coerenti col resto della pagina */
  --grad-hero:     linear-gradient(158deg, #FF8660 15%, #9A33FF 90%);
  --grad-work:     linear-gradient(180deg, #FF8660 0%,  #D5491D 100%);
  --grad-exp:      linear-gradient(180deg, #5BADFF 0%,  #1373D1 100%);
  --grad-now:      linear-gradient(180deg, #FF8660 0%,  #FF4D8D 100%);
  --grad-stack:    linear-gradient(180deg, #5EEAD4 0%,  #0EA5E9 100%);
  --grad-edu:      linear-gradient(180deg, #B388FF 0%,  #7C3AED 100%);
  --grad-behind:   linear-gradient(180deg, #FFD166 0%,  #F59E0B 100%);
  --grad-contact:  linear-gradient(158deg, #FF8660 15%, #9A33FF 90%); /* = --grad-hero, richiude il cerchio */
}
```

- [ ] **Step 2: Create `src/styles/tx/base.css`**

```css
/* ============================================================
   BASE — reset, tipografia, primitive condivise (bottoni a
   pillola, header di sezione con titolo a gradiente, animazioni
   reveal). Ogni componente Tx* si appoggia a queste classi.
   ============================================================ */

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
body {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink);
  background: var(--bg);
  overflow-x: hidden;
}
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
button { font: inherit; cursor: pointer; }
::selection { background: #9A33FF; color: #FFFFFF; }

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--bg-card); border: 2px solid var(--bg); }
::-webkit-scrollbar-thumb:hover { background: var(--ink-mute); }

.italic { font-style: italic; }

.wrap { max-width: 1240px; margin: 0 auto; padding: 0 32px; }

/* ──── Sezioni generiche: numero + titolo a gradiente + cue ──── */
.tx-section {
  padding: 72px 32px;
  max-width: 1240px;
  margin: 0 auto;
}
.tx-section__head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: end;
  gap: 32px;
  padding-bottom: 24px;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--rule);
}
.tx-section__no {
  font-size: 12px; font-weight: 600; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--ink-mute);
}
.tx-section__title {
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: clamp(32px, 5vw, 56px);
  line-height: 1.05; letter-spacing: -0.02em;
  margin: 0; color: var(--ink);
  text-transform: uppercase;
}
/* Seconda riga del titolo: gradiente colorato, un colore per sezione
   (ereditato via var(--grad-section), impostato dal wrapper di sezione) */
.tx-section__title .accent {
  background-image: var(--grad-section, var(--grad-hero));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.tx-section__cue {
  font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--ink-mute); text-align: right;
}
/* Ogni sezione dichiara il proprio gradiente — evita di dover
   duplicare .accent per ognuna */
#now      { --grad-section: var(--grad-now); }
#exp      { --grad-section: var(--grad-exp); }
#work     { --grad-section: var(--grad-work); }
#stack    { --grad-section: var(--grad-stack); }
#edu      { --grad-section: var(--grad-edu); }
/* Behind e Contact non usano <SectionHead>/.tx-section__title — hanno un
   proprio titolo (.tx-behind__title / .tx-contact__title) che applica
   var(--grad-behind) / var(--grad-contact) direttamente (vedi Task 9/10) */

@media (max-width: 720px) {
  .tx-section { padding: 56px 22px; }
  .tx-section__head { grid-template-columns: 1fr; gap: 8px; }
  .tx-section__cue { text-align: left; }
}

/* ──── Bottoni a pillola (Figma: "Get In Touch" pieno / "Download CV" outline) ──── */
.tx-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px;
  border-radius: 999px;
  font-family: var(--font-sans);
  font-size: 15px; font-weight: 600;
  border: 2px solid var(--ink);
  color: var(--ink);
  background: transparent;
  transition: transform 240ms cubic-bezier(0.16,1,0.3,1), opacity 240ms ease;
}
.tx-btn:hover { transform: translateY(-2px); opacity: 0.85; }
.tx-btn--primary {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}

/* Chip tag riutilizzato da Work/Stack */
.tx-chip {
  display: inline-flex; align-items: center;
  padding: 5px 12px;
  background: var(--bg-card);
  border: 1px solid var(--rule);
  border-radius: 999px;
  color: var(--ink-soft);
  font-family: var(--font-sans);
  font-size: 12px; font-weight: 500;
}

/* ──── Reveal animations (scroll-triggered via IntersectionObserver) ──── */
.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 700ms cubic-bezier(0.16,1,0.3,1),
              transform 700ms cubic-bezier(0.16,1,0.3,1);
}
.reveal.is-in { opacity: 1; transform: none; }

@keyframes tx-main-fade { from { opacity: 0; } to { opacity: 1; } }
main { animation: tx-main-fade 400ms ease; }

:focus-visible { outline: 2px solid #9A33FF; outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  main { animation: none; }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 3: Rewrite `src/styles/index.css` to import the new modular files**

Replace the entire file content with:
```css
@import './tailwind.css';

@import './tx/tokens.css';
@import './tx/base.css';
```

(The remaining `@import` lines for `header.css`, `hero.css`, `work.css`, `experience.css`, `contact-footer.css`, `misc-sections.css` are added at the end of each of those files' tasks below — adding them one at a time keeps every task buildable on its own instead of importing files that don't exist yet.)

- [ ] **Step 4: Verify**

Run: `pnpm build`
Expected: build succeeds. Run `pnpm dev`, open the site — page should render unstyled-but-functional (old `.tx-*` component class names now match nothing until later tasks add their CSS; this is expected at this checkpoint since we haven't touched the components yet — actually the OLD styling rules were only in `index.css`, which we just replaced, so the page will look broken/unstyled between Task 2 and Task 10). This is expected — the plan intentionally trades a temporarily-broken dev preview for buildable, reviewable, single-purpose commits. Confirm only that the build doesn't error and the browser console has no red errors about missing modules.

- [ ] **Step 5: Commit**

```bash
git add src/styles/tx/tokens.css src/styles/tx/base.css src/styles/index.css
git commit -m "feat: add design tokens and base primitives for Figma-matched redesign"
```

---

### Task 3: Header restyle

**Files:**
- Create: `src/styles/tx/header.css`
- Modify: `src/styles/index.css`

No `TxHeader.tsx` changes — its existing markup (`tx-header`, `tx-header__mark`, `tx-header__nav`, `tx-header__right`, `tx-lang`, `tx-cta`) already matches Figma's structural pattern (mark + centered nav + right-side actions); only the visual treatment changes.

- [ ] **Step 1: Create `src/styles/tx/header.css`**

```css
/* ──── Header sticky ──── */
.tx-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(22, 21, 19, 0.72); /* var(--bg) con opacità, come nel Figma (#222 @ 70%) */
  backdrop-filter: saturate(140%) blur(12px);
  -webkit-backdrop-filter: saturate(140%) blur(12px);
  border-bottom: 1px solid var(--rule);
}
.tx-header__inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 16px 32px;
  max-width: 1240px;
  margin: 0 auto;
  font-family: var(--font-sans);
  font-size: 14px;
}
.tx-header__mark { display: inline-flex; align-items: center; gap: 10px; color: var(--ink); }
.tx-header__mark .dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--positive);
  box-shadow: 0 0 8px var(--positive-soft);
  flex-shrink: 0;
  animation: tx-pulse 2.2s ease-in-out infinite;
}
@keyframes tx-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.tx-header__mark .you {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 17px;
}
.tx-header__mark .role {
  color: var(--ink-mute);
  font-size: 12px;
  font-weight: 500;
}
.tx-header__nav {
  display: flex; gap: 40px;
  justify-self: center;
  font-size: 14px; font-weight: 600;
  color: var(--ink);
}
.tx-header__nav a { position: relative; transition: opacity 200ms ease; text-transform: capitalize; }
.tx-header__nav a:hover { opacity: 0.7; }
.tx-header__nav a.is-active { color: transparent; background-image: var(--grad-hero); -webkit-background-clip: text; background-clip: text; }
.tx-header__right { display: flex; align-items: center; gap: 16px; }
.tx-lang { display: inline-flex; gap: 6px; font-size: 12px; font-weight: 600; }
.tx-lang button { background: transparent; border: 0; color: var(--ink-mute); font: inherit; padding: 4px 6px; }
.tx-lang button.is-active { color: var(--ink); }
.tx-lang span { color: var(--ink-mute); align-self: center; }
.tx-cta {
  display: inline-flex; align-items: center;
  padding: 10px 20px;
  border-radius: 999px;
  background: var(--ink);
  color: var(--bg);
  font-family: var(--font-sans);
  font-size: 13px; font-weight: 600;
  transition: transform 240ms cubic-bezier(0.16,1,0.3,1);
}
.tx-cta:hover { transform: translateY(-1px); }

@media (max-width: 1100px) { .tx-header__mark .role { display: none; } }
@media (max-width: 920px) { .tx-header__nav { display: none; } }
```

- [ ] **Step 2: Add the import to `src/styles/index.css`**

```css
@import './tailwind.css';

@import './tx/tokens.css';
@import './tx/base.css';
@import './tx/header.css';
```

- [ ] **Step 3: Verify**

Run: `pnpm build` — expect success. Run `pnpm dev`, confirm the header renders as a translucent rounded-free bar with the IT/EN toggle and CTA button visible (rest of the page still unstyled — expected until later tasks).

- [ ] **Step 4: Commit**

```bash
git add src/styles/tx/header.css src/styles/index.css
git commit -m "style: restyle header to match Figma"
```

---

### Task 4: Source the "Experience With" tech icons

**Files:**
- Create: `public/assets/logos/tech/kubernetes.svg`
- Create: `public/assets/logos/tech/docker.svg`
- Create: `public/assets/logos/tech/terraform.svg`
- Create: `public/assets/logos/tech/azuredevops.svg`
- Create: `public/assets/logos/tech/react.svg`

These 5 icons replace Figma's JS/Node/HTML/CSS/React row with Mario's real primary stack, sourced from Simple Icons (open, single-color brand glyphs, exact CDN URLs verified reachable during planning).

- [ ] **Step 1: Download the 5 icons**

```bash
mkdir -p public/assets/logos/tech
curl -sL -o public/assets/logos/tech/kubernetes.svg  "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/kubernetes.svg"
curl -sL -o public/assets/logos/tech/docker.svg       "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docker.svg"
curl -sL -o public/assets/logos/tech/terraform.svg    "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/terraform.svg"
curl -sL -o public/assets/logos/tech/azuredevops.svg  "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/azuredevops.svg"
curl -sL -o public/assets/logos/tech/react.svg        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg"
```

- [ ] **Step 2: Verify all 5 downloaded as real SVGs**

```bash
for f in public/assets/logos/tech/*.svg; do file "$f"; done
```
Expected: all 5 lines say `SVG Scalable Vector Graphics image` (not `HTML document` — that would mean the CDN returned an error page instead of the icon).

- [ ] **Step 3: Commit**

```bash
git add public/assets/logos/tech
git commit -m "chore: add tech stack icons for hero logo row"
```

---

### Task 5: Hero rewrite

**Files:**
- Modify: `src/app/components/TxHero.tsx`
- Create: `src/styles/tx/hero.css`
- Modify: `src/styles/index.css`
- Delete: `src/app/components/TxAscii3D.tsx`
- Modify: `package.json` (remove `three`, `@types/three`)

- [ ] **Step 1: Rewrite `src/app/components/TxHero.tsx`**

```tsx
// TxHero — Sezione hero: avatar in cornice circolare, headline con gradiente,
// pitch, due CTA a pillola, riga tech loghi ("Experience With").
// Sostituisce il vecchio prompt terminale + effetto ASCII 3D + scramble.

import type { Content } from "../content";
import { trackEvent } from "../lib/track";
import profilePhoto from "../../assets/f867b45042a06e7a23ba35ed122025885f6d57dd.png";

// Le 5 tecnologie principali di Mario, al posto della riga generica
// JS/Node/HTML/CSS/React del Figma originale
const TECH_LOGOS = [
  { name: "Kubernetes", src: "/assets/logos/tech/kubernetes.svg" },
  { name: "Docker", src: "/assets/logos/tech/docker.svg" },
  { name: "Terraform", src: "/assets/logos/tech/terraform.svg" },
  { name: "Azure DevOps", src: "/assets/logos/tech/azuredevops.svg" },
  { name: "React", src: "/assets/logos/tech/react.svg" },
];

type Lang = "it" | "en";

interface Props {
  content: Content;
  lang: Lang;
}

export function TxHero({ content, lang }: Props) {
  const h = content.hero;
  const emailSubject = encodeURIComponent(
    lang === "it" ? "Opportunità DevOps — Mario Celzo" : "DevOps Opportunity — Mario Celzo"
  );

  return (
    <section id="top" className="tx-hero">

      {/* Avatar: foto reale in cornice circolare con blob sfumato dietro,
          al posto del personaggio illustrato generico del Figma */}
      <div className="tx-hero__avatar reveal">
        <span className="tx-hero__avatar-blob" aria-hidden="true"></span>
        <img src={profilePhoto} alt="Mario Celzo" />
      </div>

      {/* Titolo grande, seconda riga con parola in gradiente (var(--grad-hero)) */}
      <h1 className="tx-hero__title reveal" style={{ transitionDelay: "60ms" }}>
        <span>{h.tagline[0]}</span> <span className="accent">{h.tagline[1]}</span>
      </h1>

      {/* Pitch */}
      <p className="tx-hero__pitch reveal" style={{ transitionDelay: "120ms" }}>
        {h.pitch}
      </p>

      {/* CTA a pillola: primaria (email) + secondaria (CV) — le stesse due
          del Figma "Get In Touch" / "Download CV". GitHub/LinkedIn restano
          raggiungibili dal footer/contact, non qui, per rispecchiare la
          hero a 2 bottoni del Figma */}
      <div className="tx-hero__ctas reveal" style={{ transitionDelay: "180ms" }}>
        <a
          className="tx-btn tx-btn--primary"
          href={`mailto:${content.contact.email}?subject=${emailSubject}`}
          onClick={() => trackEvent("email_click", { from: "hero" })}
        >
          {h.ctas.email}
        </a>
        <a
          className="tx-btn"
          href="/assets/CV-Mario-Celzo.pdf"
          download
          onClick={() => trackEvent("cv_download", { from: "hero" })}
        >
          {h.ctas.cv}
        </a>
      </div>

      {/* Riga tech loghi, equivalente a "EXPERIENCE WITH" del Figma */}
      <div className="tx-hero__stack reveal" style={{ transitionDelay: "240ms" }}>
        <span className="tx-hero__stack-label">
          {lang === "it" ? "esperienza con" : "experience with"}
        </span>
        <div className="tx-hero__stack-logos">
          {TECH_LOGOS.map((t) => (
            <img key={t.name} src={t.src} alt={t.name} title={t.name} loading="lazy" />
          ))}
        </div>
      </div>

    </section>
  );
}
```

- [ ] **Step 2: Delete `src/app/components/TxAscii3D.tsx`**

```bash
git rm src/app/components/TxAscii3D.tsx
```

- [ ] **Step 3: Remove the now-unused `three` dependency**

In `package.json`, remove these two lines:
```json
    "three": "^0.184.0",
```
(from `dependencies`) and:
```json
    "@types/three": "^0.184.1",
```
(from `devDependencies`).

Then run:
```bash
pnpm install
```

- [ ] **Step 4: Create `src/styles/tx/hero.css`**

```css
/* ──── Hero ──── */
.tx-hero {
  padding: 72px 32px 64px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Avatar circolare con blob sfumato dietro (sostituisce l'illustrazione
   generica del Figma con la foto reale) */
.tx-hero__avatar {
  position: relative;
  width: 220px; height: 220px;
  margin-bottom: 32px;
}
.tx-hero__avatar-blob {
  position: absolute;
  inset: -16px;
  border-radius: 50%;
  background: var(--grad-hero);
  filter: blur(2px);
  opacity: 0.9;
  z-index: 0;
}
.tx-hero__avatar img {
  position: relative;
  z-index: 1;
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--bg);
}

.tx-hero__title {
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: clamp(36px, 6vw, 56px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
  color: var(--ink);
}

.tx-hero__pitch {
  max-width: 56ch;
  font-size: 17px; line-height: 1.6; font-weight: 300;
  color: var(--ink-soft);
  margin: 0 0 32px;
}

.tx-hero__ctas { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-bottom: 56px; }

.tx-hero__stack { display: flex; flex-direction: column; align-items: center; gap: 20px; }
.tx-hero__stack-label {
  font-size: 13px; font-weight: 600; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--ink-mute);
}
.tx-hero__stack-logos { display: flex; align-items: center; gap: 32px; flex-wrap: wrap; justify-content: center; }
.tx-hero__stack-logos img { width: 36px; height: 36px; opacity: 0.9; transition: opacity 200ms ease, transform 200ms ease; }
.tx-hero__stack-logos img:hover { opacity: 1; transform: translateY(-2px); }

@media (max-width: 720px) {
  .tx-hero { padding: 48px 22px 48px; }
  .tx-hero__avatar { width: 160px; height: 160px; }
}

/* ──── Marquee ticker ──── */
.tx-marquee {
  overflow: hidden;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  padding: 13px 0;
  background: var(--bg-soft);
  position: relative;
  mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
}
.tx-marquee__track { display: flex; gap: 0; width: max-content; animation: tx-marquee 36s linear infinite; will-change: transform; }
.tx-marquee:hover .tx-marquee__track { animation-play-state: paused; }
.tx-marquee__item {
  display: inline-flex; align-items: center; gap: 28px;
  padding-right: 28px;
  font-size: 12px; font-weight: 500; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--ink-mute);
  white-space: nowrap;
}
.tx-marquee__item::after { content: "✦"; opacity: 0.5; font-size: 9px; }
@keyframes tx-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

@media (prefers-reduced-motion: reduce) {
  .tx-marquee__track { animation: none; }
}
```

- [ ] **Step 5: Add the import to `src/styles/index.css`**

```css
@import './tailwind.css';

@import './tx/tokens.css';
@import './tx/base.css';
@import './tx/header.css';
@import './tx/hero.css';
```

- [ ] **Step 6: Verify**

Run: `pnpm build` — expect success (no reference to `TxAscii3D` or `three` remains).

```bash
grep -rn "TxAscii3D\|from \"three\"\|from 'three'" src/
```
Expected: no output.

Run `pnpm dev`, open the site: hero should show the circular photo with a soft gradient ring behind it, the two-line title with the second word in the orange→purple gradient, pitch text, two pill buttons, and the 5 tech icons row.

- [ ] **Step 7: Commit**

```bash
git add src/app/components/TxHero.tsx src/styles/tx/hero.css src/styles/index.css package.json pnpm-lock.yaml
git commit -m "feat: rebuild hero with avatar, gradient headline and pill CTAs"
```

---

### Task 6: Projects restyle

**Files:**
- Create: `src/styles/tx/work.css`
- Modify: `src/styles/index.css`

CSS-only — `TxWork.tsx` markup (badges, title/repo-link row, description, tag chips) stays as-is; it's richer than Figma's minimal card and that extra info (year, level, tags, description) is worth keeping. Only the chrome changes to Figma's rounded-18px dark card look.

- [ ] **Step 1: Create `src/styles/tx/work.css`**

```css
/* ──── Work grid (progetti) — chrome arrotondato in stile Figma ──── */
.tx-work__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}
.tx-work__card {
  grid-column: span 3;
  display: flex; flex-direction: column;
  background: var(--bg-card);
  border-radius: 18px;
  overflow: hidden;
  transition: transform 360ms cubic-bezier(0.16,1,0.3,1);
}
.tx-work__card:hover { transform: translateY(-4px); }
.tx-work__card.span-2 { grid-column: span 2; }
.tx-work__media {
  position: relative; aspect-ratio: 16 / 10;
  overflow: hidden; background: var(--bg-soft);
}
.tx-work__media img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 700ms cubic-bezier(0.16,1,0.3,1);
}
.tx-work__card:hover .tx-work__media img { transform: scale(1.05); }
.tx-work__media .num, .tx-work__media .yr, .tx-work__media .lvl {
  position: absolute;
  font-family: var(--font-sans);
  font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 4px 10px; border-radius: 999px;
  background: rgba(22,21,19,0.78);
  backdrop-filter: blur(4px);
  color: var(--ink);
}
.tx-work__media .num { top: 12px; left: 12px; }
.tx-work__media .yr  { top: 12px; right: 12px; }
.tx-work__media .lvl { bottom: 12px; left: 12px; background: var(--ink); color: var(--bg); font-weight: 700; }
.tx-work__body { padding: 22px 24px 24px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.tx-work__body .head { display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: baseline; }
.tx-work__body h3 {
  font-family: var(--font-sans); font-weight: 800; text-transform: uppercase;
  font-size: clamp(18px, 2vw, 22px); line-height: 1.1; margin: 0; color: var(--ink);
}
.tx-work__body .head .repo {
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: transparent; background-image: var(--grad-work); -webkit-background-clip: text; background-clip: text;
  display: inline-flex; align-items: center; gap: 4px; white-space: nowrap;
}
.tx-work__body p { font-size: 13px; line-height: 1.55; color: var(--ink-soft); margin: 0; }
.tx-work__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; padding-top: 12px; border-top: 1px solid var(--rule-soft); }
.tx-work__tags .tx-chip { font-size: 10px; padding: 3px 10px; }

@media (max-width: 900px) {
  .tx-work__grid { grid-template-columns: 1fr 1fr; }
  .tx-work__card, .tx-work__card.span-2 { grid-column: span 1; }
}
@media (max-width: 540px) {
  .tx-work__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Add the import to `src/styles/index.css`** (append after `hero.css`)

```css
@import './tx/work.css';
```

- [ ] **Step 3: Verify**

Run: `pnpm build` — expect success. `pnpm dev`, confirm project cards render with 18px rounded corners and dark `#2A2A2A` background.

- [ ] **Step 4: Commit**

```bash
git add src/styles/tx/work.css src/styles/index.css
git commit -m "style: restyle project cards to Figma rounded-card chrome"
```

---

### Task 7: Source real company logos for the Experience section

**Files:**
- Create: `public/assets/logos/companies/reply.svg`
- Create: `public/assets/logos/companies/lutech.jpg`
- Create: `public/assets/logos/companies/nepta.svg`
- Create: `public/assets/logos/companies/unisa.png`

Per the user's explicit request, these are the four employers/institution's **real official logos** (not placeholder monograms), sourced and verified reachable during planning:
- Reply — official wordmark+swirl SVG (Wikimedia Commons, uploaded directly from Reply DE in 2025)
- Lutech — official wordmark JPEG (Wikimedia Commons, "own work" upload of the Lutech logo)
- Nepta — SVG pulled directly from nepta.it's own site header
- Università degli Studi di Salerno — official white-on-transparent PNG crest, pulled directly from unisa.it

The 5th experience entry (the family salon "Susy & Tito") has no official logo online — it falls back to a `lucide-react` `Scissors` icon at render time (handled in Task 8), so no asset is needed for it.

- [ ] **Step 1: Download the 4 logos**

```bash
mkdir -p public/assets/logos/companies
curl -sL -o public/assets/logos/companies/reply.svg  "https://upload.wikimedia.org/wikipedia/commons/9/94/Reply_Logo.svg"
curl -sL -o public/assets/logos/companies/lutech.jpg "https://upload.wikimedia.org/wikipedia/commons/b/b2/Logo_Lutech.jpg"
curl -sL -o public/assets/logos/companies/nepta.svg  "https://www.nepta.it/images/logo-header.svg"
curl -sL -o public/assets/logos/companies/unisa.png  "https://web.unisa.it/uploads/rescue/logo-bianco-centrato1.png"
```

- [ ] **Step 2: Verify all 4 downloaded as real images (not HTML error pages)**

```bash
for f in public/assets/logos/companies/*; do file "$f"; done
```
Expected:
```
public/assets/logos/companies/lutech.jpg: JPEG image data ...
public/assets/logos/companies/nepta.svg:  SVG Scalable Vector Graphics image
public/assets/logos/companies/reply.svg:  SVG Scalable Vector Graphics image (XML text)
public/assets/logos/companies/unisa.png:  PNG image data ...
```
If any file instead reports `HTML document text`, the source URL served an error page — stop and re-source that one logo (check the company's current homepage for its logo asset path) before continuing; do not silently ship a broken image.

- [ ] **Step 3: Commit**

```bash
git add public/assets/logos/companies
git commit -m "chore: add real company/university logos for experience section"
```

---

### Task 8: Experience restyle with company logos

**Files:**
- Modify: `src/app/content.tsx`
- Modify: `src/app/components/TxExperience.tsx`
- Create: `src/styles/tx/experience.css`
- Modify: `src/styles/index.css`

- [ ] **Step 1: Add an optional `logo` field to `ExpItem` in `src/app/content.tsx`**

Change:
```ts
export interface ExpItem {
  year: string; range: string; badge: string | null;
  title: string; org: string; body: string;
  bullets: string[];
}
```
to:
```ts
export interface ExpItem {
  year: string; range: string; badge: string | null;
  title: string; org: string; body: string;
  bullets: string[];
  /** Percorso del logo aziendale reale (assente per il salone di famiglia,
      che non ha un logo ufficiale — il componente mostra un'icona generica) */
  logo?: string;
}
```

- [ ] **Step 2: Set `logo` on the 4 Italian `exp.items` entries**

In the `it` object's `exp.items` array, add a `logo` field to each of the first 3 entries (the 4th, "Susy & Tito", is left without one):

```ts
      { year: "2026", range: "18 Lug — Present", badge: "ACTIVE",
        title: "DevOps Engineer · External Consultant", org: "Reply · via Nepta",
        logo: "/assets/logos/companies/reply.svg",
        body: "Consulente esterno Nepta in Reply. Il progetto è coperto da NDA — il mestiere resta: CI/CD, Kubernetes, automazione, e la produzione che non deve fermarsi.",
        bullets: [
          "IaC: provisioning con Terraform, configuration management con Ansible",
          "Pipeline CI/CD e workflow GitOps per applicazioni containerizzate su Kubernetes",
          "Automazione operativa: scripting Bash/Python, monitoring & observability cloud",
          "Dettagli del progetto: [REDACTED] — NDA",
        ],
      },
      { year: "2026", range: "Gen — 18 Lug", badge: "SHIPPED",
        title: "Junior DevOps Engineer", org: "Lutech SpA · CrossDev Team",
        logo: "/assets/logos/companies/lutech.jpg",
        body: "Sul progetto ERIT-DXL per Edenred Italia. Pipeline, microservizi, DevSecOps, backend Java e frontend Angular. Sei mesi densi, chiusi con un deploy pulito.",
        bullets: [
          "Pipeline CI/CD in YAML su Azure DevOps — build, test, deploy",
          "5 microservizi su Azure Kubernetes Service (AKS)",
          "Gestione cluster AKS: deploy Helm-based e approccio GitOps",
          "DevSecOps: Qualys WAS + Dependency Track",
          "Migrazione Azure Cache for Redis → Azure Managed Redis",
          "Backend Java e frontend Angular sui microservizi",
          "Sviluppo componenti Angular con Storybook",
          "Upgrade Angular 14 → 21 sulle applicazioni frontend",
          "Documentazione docs-as-code: Markdown in Git, review via PR, publish in pipeline",
          "Kafka / Event Hub, CQRS, dead-letter retries, SendGrid",
        ],
      },
      { year: "2025", range: "Dicembre", badge: null,
        title: "Laurea Triennale in Informatica", org: "Università degli Studi di Salerno",
        logo: "/assets/logos/companies/unisa.png",
        body: "Tesi: Progettazione e sviluppo di un tool per l'estrazione automatizzata e l'analisi di scenari in simulazioni CARLA e BeamNG per sistemi ADAS/ADS.",
        bullets: [
          "Tesi: scenario extraction tool per simulazioni CARLA / BeamNG (ADAS/ADS)",
          "Algoritmi e strutture dati, basi di dati, sistemi operativi",
          "Progetti full-stack & mobile (TARGET, BODY-LIFE, BiblioFlow)",
        ],
      },
      { year: "2019", range: "Estati '18 — '19", badge: null,
        title: "Assistente gestione salone", org: "Susy & Tito · attività di famiglia",
        body: "Il primo posto in cui ho imparato il multitasking sotto pressione, la pazienza con le persone, l'importanza dell'ordine.",
        bullets: [
          "Servizio clienti e gestione prenotazioni",
          "Controllo inventario e igiene degli spazi",
          "Multitasking nelle ore di punta",
          "Gestione incassi, apertura e chiusura",
        ],
      },
```

- [ ] **Step 3: Set `logo` on the 4 English `exp.items` entries the same way**

Apply the identical 3 `logo:` line additions (same paths) to the corresponding entries in the `en` object's `exp.items` array — the English entries have the same structure (`title: "DevOps Engineer · External Consultant"`, `"Junior DevOps Engineer"`, `"BSc in Computer Science"`, `"Salon assistant"`), just with English copy. Add:
- `logo: "/assets/logos/companies/reply.svg"` to the Reply/Nepta entry
- `logo: "/assets/logos/companies/lutech.jpg"` to the Lutech entry
- `logo: "/assets/logos/companies/unisa.png"` to the "BSc in Computer Science" entry
- No `logo` field on the "Salon assistant" entry

- [ ] **Step 4: Rewrite `src/app/components/TxExperience.tsx`**

```tsx
// TxExperience — Lista esperienza in stile Figma: logo aziendale + titolo +
// org + descrizione a sinistra, range date a destra. Sostituisce il vecchio
// layout "deploy log" con anno grande.

import { Scissors } from "lucide-react";
import type { Content } from "../content";
import { SectionHead } from "./TxNow";

type ExpData = Content["exp"];

interface Props {
  exp: ExpData;
}

export function TxExperience({ exp }: Props) {
  return (
    <section id="exp" className="tx-section">
      <SectionHead no={exp.no} title={exp.title} cue={exp.cue} />

      <div className="tx-exp__list">
        {exp.items.map((it, i) => (
          <div
            className="tx-exp__row reveal"
            key={i}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {/* Badge logo: immagine reale se presente, altrimenti icona
                generica (caso del salone di famiglia, senza logo ufficiale) */}
            <div className="tx-exp__logo">
              {it.logo ? (
                <img src={it.logo} alt={it.org} loading="lazy" />
              ) : (
                <Scissors size={20} strokeWidth={1.75} aria-hidden="true" />
              )}
            </div>

            <div className="tx-exp__main">
              <div className="tx-exp__title">
                <h4>{it.title}</h4>
                {it.badge && (
                  <span className={`badge${it.badge === "ACTIVE" ? "" : " badge--done"}`}>
                    {it.badge}
                  </span>
                )}
              </div>
              <span className="tx-exp__org">{it.org}</span>
              <p className="tx-exp__body">{it.body}</p>
            </div>

            <div className="tx-exp__range">
              <span>{it.range}</span>
              <span className="year">{it.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `src/styles/tx/experience.css`**

```css
/* ──── Experience — lista piatta con badge logo aziendale ──── */
.tx-exp__list { display: flex; flex-direction: column; }
.tx-exp__row {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 24px; align-items: start;
  padding: 28px 0;
  border-top: 1px solid var(--rule);
}
.tx-exp__row:last-child { border-bottom: 1px solid var(--rule); }

/* Badge bianco arrotondato: ospita loghi di qualunque colore/sfondo con
   contrasto costante sul tema scuro (Reply/Nepta/Lutech/Unisa hanno tutti
   il logo su sfondo chiaro o trasparente) */
.tx-exp__logo {
  width: 56px; height: 56px;
  border-radius: 14px;
  background: #FFFFFF;
  display: grid; place-items: center;
  padding: 10px;
  flex-shrink: 0;
  color: var(--bg);
}
.tx-exp__logo img { width: 100%; height: 100%; object-fit: contain; }

.tx-exp__title { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.tx-exp__title h4 {
  font-family: var(--font-sans); font-weight: 700;
  font-size: clamp(18px, 2vw, 22px); line-height: 1.2;
  margin: 0; color: var(--ink);
}
.tx-exp__org {
  display: block; margin-top: 4px;
  font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--ink-mute);
}
.tx-exp__body { margin: 10px 0 0; font-size: 14px; line-height: 1.6; color: var(--ink-soft); max-width: 62ch; }

.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 3px 10px; border-radius: 999px;
  background: var(--positive-soft); color: var(--positive);
  font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
}
.badge::before { content: "●"; animation: tx-pulse 1.6s ease-in-out infinite; }
.badge--done { background: rgba(255,255,255,0.08); color: var(--ink-soft); }
.badge--done::before { content: "✓"; animation: none; }

.tx-exp__range {
  text-align: right; white-space: nowrap;
  font-size: 13px; font-weight: 600; color: var(--ink);
}
.tx-exp__range .year { display: block; font-size: 12px; font-weight: 500; color: var(--ink-mute); margin-top: 2px; }

@media (max-width: 720px) {
  .tx-exp__row { grid-template-columns: 44px 1fr; gap: 16px; }
  .tx-exp__logo { width: 44px; height: 44px; border-radius: 10px; }
  .tx-exp__range { grid-column: 1 / -1; text-align: left; margin-top: 8px; }
}
```

- [ ] **Step 6: Add the import to `src/styles/index.css`** (append after `work.css`)

```css
@import './tx/experience.css';
```

- [ ] **Step 7: Verify**

Run: `pnpm build` — expect success.

```bash
grep -n "logo:" src/app/content.tsx | wc -l
```
Expected: `6` (3 entries × 2 languages).

Run `pnpm dev`, confirm the Experience section shows 4 rows each with a white rounded badge (Reply/Lutech/Unisa logos visible, Susy & Tito row shows a scissors icon instead) and the date range right-aligned.

- [ ] **Step 8: Commit**

```bash
git add src/app/content.tsx src/app/components/TxExperience.tsx src/styles/tx/experience.css src/styles/index.css
git commit -m "feat: restyle experience list with real company logos"
```

---

### Task 9: Contact and footer restyle

**Files:**
- Modify: `src/app/components/TxContact.tsx`
- Modify: `src/app/components/TxFooter.tsx`
- Create: `src/styles/tx/contact-footer.css`
- Modify: `src/styles/index.css`
- Delete: `src/app/components/TxAccent.tsx`

- [ ] **Step 1: Add a social icon row to `src/app/components/TxContact.tsx`**

Add the import at the top:
```tsx
import { Mail, Github, Linkedin } from "lucide-react";
```

Add a social icon row right after the closing `</a>` of the big email link and before the `{/* Griglia 4 campi */}` comment:
```tsx
          {/* Icone social: mail/github/linkedin, al posto di Instagram/X/YouTube
              del Figma (che Mario non usa) */}
          <div className="tx-contact__social reveal" style={{ transitionDelay: "140ms" }}>
            <a
              href={`mailto:${contact.email}?subject=${emailSubject}`}
              aria-label="Email"
              onClick={() => trackEvent("email_click", { from: "contact_social" })}
            >
              <Mail size={20} strokeWidth={1.75} />
            </a>
            <a
              href="https://github.com/mariocelzo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              onClick={() => trackEvent("github_click", { from: "contact_social" })}
            >
              <Github size={20} strokeWidth={1.75} />
            </a>
            <a
              href="https://linkedin.com/in/mario-celzo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onClick={() => trackEvent("linkedin_click", { from: "contact_social" })}
            >
              <Linkedin size={20} strokeWidth={1.75} />
            </a>
          </div>
```

(Leave the rest of `TxContact.tsx` — overline, title, lede, email link, `tx-contact__grid` — unchanged; only CSS treatment changes for those.)

- [ ] **Step 2: Remove `TxAccent` from `src/app/components/TxFooter.tsx`**

Remove the import:
```tsx
import { TxAccent } from "./TxAccent";
```

Replace:
```tsx
      {/* Destra: switcher colore accento + "built in italy" */}
      <div className="tx-footer__r tx-footer__r--flex">
        <TxAccent />
        <span>{footer.r}</span>
      </div>
```
with:
```tsx
      {/* Destra: "built in italy" */}
      <div className="tx-footer__r">
        <span>{footer.r}</span>
      </div>
```

- [ ] **Step 3: Delete `src/app/components/TxAccent.tsx`**

```bash
git rm src/app/components/TxAccent.tsx
```

- [ ] **Step 4: Create `src/styles/tx/contact-footer.css`**

```css
/* ──── Contact — box scuro in stile "Footer" del Figma ──── */
.tx-contact { padding: 72px 32px; max-width: 1240px; margin: 0 auto; }
.tx-contact__inner {
  background: var(--bg-footer);
  border-radius: 24px;
  overflow: hidden;
}
.tx-contact__body { padding: 56px 48px; text-align: center; }
.tx-contact__overline {
  display: inline-flex; align-items: center;
  font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--ink-mute); margin-bottom: 20px;
}
.tx-contact__title {
  font-family: var(--font-sans); font-weight: 800;
  font-size: clamp(32px, 6vw, 56px); line-height: 1.1;
  margin: 0 0 20px; color: var(--ink);
}
.tx-contact__title .italic {
  font-style: normal;
  background-image: var(--grad-contact);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.tx-contact__lede { max-width: 52ch; margin: 0 auto 28px; font-size: 15px; line-height: 1.6; color: var(--ink-soft); }
.tx-contact__email {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--font-sans); font-weight: 700;
  font-size: clamp(20px, 3vw, 28px);
  color: var(--ink);
  padding-bottom: 4px;
  border-bottom: 2px solid var(--ink);
}
.tx-contact__social { display: flex; justify-content: center; gap: 20px; margin-top: 28px; }
.tx-contact__social a {
  width: 44px; height: 44px; border-radius: 50%;
  display: grid; place-items: center;
  border: 1px solid var(--rule);
  color: var(--ink);
  transition: transform 220ms ease, border-color 220ms ease;
}
.tx-contact__social a:hover { transform: translateY(-2px); border-color: var(--ink); }

.tx-contact__grid { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--rule); }
.tx-contact__field { padding: 22px 20px; border-right: 1px solid var(--rule); text-align: left; }
.tx-contact__field:last-child { border-right: 0; }
.tx-contact__field .k {
  font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--ink-mute); margin-bottom: 6px; display: block;
}
.tx-contact__field .v { font-family: var(--font-sans); font-weight: 600; font-size: 15px; color: var(--ink); font-style: normal; }

@media (max-width: 720px) {
  .tx-contact { padding: 56px 22px; }
  .tx-contact__body { padding: 40px 22px; }
  .tx-contact__grid { grid-template-columns: 1fr 1fr; }
  .tx-contact__field:nth-child(2) { border-right: 0; }
  .tx-contact__field:nth-child(odd) { border-bottom: 1px solid var(--rule); }
}

/* ──── Footer bar ──── */
.tx-footer {
  padding: 20px 32px 32px;
  max-width: 1240px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr 1fr;
  gap: 16px; align-items: center;
  font-size: 11px; font-weight: 500; letter-spacing: 0.06em;
  color: var(--ink-mute);
}
.tx-footer__c { text-align: center; }
.tx-footer__r { text-align: right; }
.tx-footer a { color: var(--ink-soft); }
.tx-footer a:hover { color: var(--ink); }

@media (max-width: 720px) {
  .tx-footer { grid-template-columns: 1fr; text-align: left; }
  .tx-footer__c, .tx-footer__r { text-align: left; }
}
```

- [ ] **Step 5: Add the import to `src/styles/index.css`** (append after `experience.css`)

```css
@import './tx/contact-footer.css';
```

- [ ] **Step 6: Verify**

Run: `pnpm build` — expect success.

```bash
grep -rn "TxAccent" src/
```
Expected: no output.

Run `pnpm dev`, confirm the Contact box is a rounded dark card with overline/title/lede/email + 3 circular social icons (mail/github/linkedin) below the email, the field grid below that, and the footer bar has no color-dot switcher.

- [ ] **Step 7: Commit**

```bash
git add src/app/components/TxContact.tsx src/app/components/TxFooter.tsx src/styles/tx/contact-footer.css src/styles/index.css
git commit -m "feat: restyle contact/footer, drop accent-color switcher"
```

---

### Task 10: Restyle Now, Stack, Education, Behind (sections not in the Figma file)

**Files:**
- Create: `src/styles/tx/misc-sections.css`
- Modify: `src/styles/index.css`

CSS-only — these 4 sections have no Figma mockup, so they're re-skinned with the tokens/primitives already established (Poppins, gradient section titles via `--grad-now` / `--grad-stack` / `--grad-edu` / `--grad-behind` already wired up in `base.css`'s per-id selectors) rather than left in the old monospace/serif style. No `TxNow.tsx` / `TxStack.tsx` / `TxEducation.tsx` / `TxBehind.tsx` markup changes are needed — their class names (`tx-now__*`, `tx-stack__*`, `tx-edu__*`, `tx-behind__*`) stay the same.

- [ ] **Step 1: Create `src/styles/tx/misc-sections.css`**

```css
/* ──── Now — "in produzione" ──── */
.tx-now { display: grid; grid-template-columns: 1.4fr 1fr; gap: 56px; align-items: start; }
.tx-now__main p { font-size: 15px; line-height: 1.65; color: var(--ink-soft); margin: 0 0 14px; max-width: 64ch; }
.tx-now__main p strong { color: var(--ink); font-weight: 700; }
.tx-now__lead { font-family: var(--font-sans) !important; font-weight: 700 !important; font-size: clamp(20px, 2.4vw, 28px) !important; line-height: 1.3 !important; color: var(--ink) !important; margin-bottom: 20px !important; }
.tx-now__bullets { margin-top: 24px; display: grid; border-top: 1px solid var(--rule); }
.tx-now__bullet { display: grid; grid-template-columns: 40px auto 1fr; gap: 14px; align-items: start; padding: 14px 0; border-bottom: 1px solid var(--rule-soft); font-size: 14px; line-height: 1.55; }
.tx-now__bullet .ix { font-size: 11px; font-weight: 600; color: var(--ink-mute); padding-top: 4px; }
.tx-now__bullet .check { width: 16px; height: 16px; border-radius: 5px; border: 1px solid var(--positive); background: var(--positive-soft); display: grid; place-items: center; color: var(--positive); font-size: 11px; margin-top: 1px; }
.tx-now__bullet .text { color: var(--ink-soft); }
.tx-now__bullet .text strong { color: var(--ink); font-weight: 700; }
.tx-now__panel { padding: 0; background: var(--bg-card); border-radius: 16px; overflow: hidden; position: sticky; top: 88px; }
.tx-panel__bar { display: grid; grid-template-columns: auto 1fr auto; gap: 10px; align-items: center; padding: 12px 16px; background: var(--bg-soft); font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--ink-mute); }
.tx-panel__lights { display: flex; gap: 5px; }
.tx-panel__lights span { width: 9px; height: 9px; border-radius: 50%; background: var(--rule); }
.tx-panel__bar .file { color: var(--ink-soft); }
.tx-panel__body { padding: 22px; }
.tx-panel__body h4 { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); margin: 0 0 12px; }
.tx-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 22px; }
.tx-panel__divider { border-top: 1px dashed var(--rule); margin: 18px 0; }
.tx-panel__body dl { margin: 0; display: grid; grid-template-columns: 90px 1fr; gap: 8px 14px; font-size: 13px; }
.tx-panel__body dt { font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--ink-mute); align-self: center; }
.tx-panel__body dd { margin: 0; color: var(--ink-soft); }

@media (max-width: 900px) {
  .tx-now { grid-template-columns: 1fr; gap: 32px; }
  .tx-now__panel { position: static; }
}

/* ──── Stack ──── */
.tx-stack__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
.tx-stack__col { padding: 24px 28px 24px 0; border-top: 1px solid var(--rule); }
.tx-stack__col:nth-child(odd) { border-right: 1px solid var(--rule); }
.tx-stack__col:nth-child(even) { padding-left: 28px; padding-right: 0; }
.tx-stack__col h5 { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-mute); margin: 0 0 8px; }
.tx-stack__col .lead { font-family: var(--font-sans); font-weight: 500; font-style: normal; font-size: 17px; line-height: 1.3; color: var(--ink); margin: 0 0 16px; max-width: 30ch; }
.tx-stack__chips { display: flex; flex-wrap: wrap; gap: 6px; }

@media (max-width: 720px) {
  .tx-stack__grid { grid-template-columns: 1fr; }
  .tx-stack__col, .tx-stack__col:nth-child(odd), .tx-stack__col:nth-child(even) { padding: 22px 0; border-right: 0; }
}

/* ──── Education ──── */
.tx-edu { display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: start; }
.tx-edu__row { display: grid; grid-template-columns: 130px 1fr; gap: 20px; padding: 18px 0; border-top: 1px solid var(--rule); }
.tx-edu__row:last-child { border-bottom: 1px solid var(--rule); }
.tx-edu__row .year { font-size: 12px; font-weight: 600; color: var(--ink-mute); padding-top: 4px; }
.tx-edu__row .title { font-family: var(--font-sans); font-weight: 700; font-style: normal; font-size: 19px; line-height: 1.25; color: var(--ink); margin: 0 0 4px; }
.tx-edu__row .org { font-size: 12px; font-weight: 500; color: var(--ink-mute); }
.tx-edu__side h4 { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-mute); margin: 0 0 12px; }
.tx-edu__side .certs { display: grid; margin-bottom: 26px; border-top: 1px dashed var(--rule); }
.tx-edu__side .cert { display: grid; grid-template-columns: 22px 1fr auto; gap: 12px; padding: 10px 0; border-bottom: 1px dashed var(--rule); font-size: 13px; color: var(--ink-soft); }
.tx-edu__side .cert::before { content: "✓"; color: var(--positive); font-size: 12px; }
.tx-edu__side .cert .yr { color: var(--ink-mute); font-size: 11px; }
.tx-edu__side .langs { display: grid; border-top: 1px dashed var(--rule); }
.tx-edu__side .lang { display: grid; grid-template-columns: 1fr auto; gap: 12px; padding: 10px 0; border-bottom: 1px dashed var(--rule); font-size: 13px; align-items: baseline; }
.tx-edu__side .lang .name { font-family: var(--font-sans); font-weight: 600; font-style: normal; font-size: 15px; color: var(--ink); }
.tx-edu__side .lang .level { color: var(--ink-mute); font-size: 11px; }

@media (max-width: 900px) { .tx-edu { grid-template-columns: 1fr; gap: 32px; } }

/* ──── Behind the keyboard ──── */
.tx-behind { padding: 72px 32px; max-width: 1240px; margin: 0 auto; }
.tx-behind__inner { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 48px; align-items: start; }
.tx-behind__media { position: relative; aspect-ratio: 4 / 5; overflow: hidden; border-radius: 20px; background: var(--bg-card); }
.tx-behind__media img { width: 100%; height: 100%; object-fit: cover; }
.tx-behind__media .corner { position: absolute; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink); background: rgba(22,21,19,0.78); backdrop-filter: blur(4px); padding: 4px 10px; border-radius: 999px; }
.tx-behind__media .corner.tl { top: 12px; left: 12px; }
.tx-behind__media .corner.tr { top: 12px; right: 12px; }
.tx-behind__photoCap { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%); color: var(--ink); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; display: flex; justify-content: space-between; gap: 12px; }
.tx-behind__copy { display: flex; flex-direction: column; gap: 18px; }
.tx-behind__title { font-family: var(--font-sans); font-weight: 800; font-size: clamp(32px, 4.8vw, 48px); line-height: 1.1; margin: 0; color: var(--ink); text-transform: uppercase; }
.tx-behind__title .italic { font-style: normal; background-image: var(--grad-behind); -webkit-background-clip: text; background-clip: text; color: transparent; }
.tx-behind__bio p { font-size: 14px; line-height: 1.65; color: var(--ink-soft); margin: 0 0 12px; max-width: 60ch; }
.tx-behind__grid { margin-top: 8px; display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--rule); }
.tx-behind__item { padding: 18px 22px 18px 0; border-bottom: 1px solid var(--rule); }
.tx-behind__item:nth-child(odd) { border-right: 1px solid var(--rule); }
.tx-behind__item:nth-child(even) { padding-left: 22px; padding-right: 0; }
.tx-behind__item:nth-last-child(-n+2) { border-bottom: 0; }
.tx-behind__item .tag { font-size: 10px; font-weight: 600; color: var(--ink-mute); display: block; margin-bottom: 4px; }
.tx-behind__item h4 { font-family: var(--font-sans); font-weight: 700; font-style: normal; font-size: 19px; margin: 0 0 4px; color: var(--ink); }
.tx-behind__item p { font-size: 13px; line-height: 1.55; color: var(--ink-soft); margin: 0; }

@media (max-width: 900px) {
  .tx-behind { padding: 56px 22px; }
  .tx-behind__inner { grid-template-columns: 1fr; gap: 28px; }
  .tx-behind__media { aspect-ratio: 4 / 3; }
}
@media (max-width: 540px) {
  .tx-behind__grid { grid-template-columns: 1fr; }
  .tx-behind__item:nth-child(odd) { border-right: 0; }
  .tx-behind__item:nth-child(even) { padding-left: 0; }
  .tx-behind__item:nth-last-child(-n+2) { border-bottom: 1px solid var(--rule); }
  .tx-behind__item:last-child { border-bottom: 0; }
}
```

- [ ] **Step 2: Add the import to `src/styles/index.css`** (append after `contact-footer.css` — this is the last import)

```css
@import './tx/misc-sections.css';
```

- [ ] **Step 3: Verify**

Run: `pnpm build` — expect success.

Run `pnpm dev` and visually check all 9 sections in order (Hero → Marquee → Now → Experience → Work → Stack → Education → Behind → Contact → Footer): every section title's second line should show a distinct colored gradient, all cards/panels use rounded corners and Poppins, and nothing still looks like the old monospace/serif terminal theme.

- [ ] **Step 4: Commit**

```bash
git add src/styles/tx/misc-sections.css src/styles/index.css
git commit -m "style: restyle Now/Stack/Education/Behind to match new design system"
```

---

### Task 11: Final integration check

**Files:** none (verification only)

- [ ] **Step 1: Full clean build**

```bash
rm -rf dist
pnpm build
```
Expected: exits 0, `dist/` is produced.

- [ ] **Step 2: Check for leftover dead references**

```bash
grep -rln "Instrument Serif\|JetBrains Mono\|TxAscii3D\|TxAccent\|tx-scan\|data-accent" src/ index.html
```
Expected: no output (empty). If anything matches, it's a task from above that wasn't fully applied — go back and finish it.

- [ ] **Step 3: Visual QA pass in the browser**

```bash
pnpm dev
```
Open the printed local URL and walk through, both in Italian and after clicking `EN`:
- Header: sticky, translucent, nav highlights the active section while scrolling, IT/EN toggle works, "scrivimi"/"get in touch" CTA opens a mailto link
- Hero: circular photo avatar with gradient ring, two-line gradient headline, 2 pill buttons both clickable (email opens mail client, CV downloads a PDF), 5 tech icons visible
- Experience: 4 rows, 3 with real logos (Reply, Lutech, Unisa) and 1 with the scissors icon, badges (ACTIVE/SHIPPED) visible
- Work: project grid with rounded cards, all links open in a new tab
- Contact: rounded dark box, mail/github/linkedin icons work
- No console errors (check via browser devtools)

- [ ] **Step 4: Commit the final state if anything was fixed in Steps 2-3**

```bash
git add -A
git commit -m "fix: final integration cleanup after redesign QA pass"
```

(Skip this commit if Steps 2-3 found nothing to fix.)

---

## Notes carried over from the spec (not addressed by this plan)

- `public/og.png` (the Open Graph preview image) still shows the old terminal-style hero visually — regenerating it is a manual screenshot/export step outside this plan's scope, per the design spec's "Out of scope" section.
- No changes to `vercel.json`, Vercel Analytics/Speed Insights wiring, or the CV PDF content — confirmed untouched by every task above.
