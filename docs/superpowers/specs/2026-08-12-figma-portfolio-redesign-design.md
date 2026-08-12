# Portfolio redesign — Figma "Developer Portfolio Website Design" match

Date: 2026-08-12
Branch: `figma-portfolio-redesign` (based on `old-portfolio/main`, the codebase actually deployed to https://portfolio-mario-celzo.vercel.app/)
Figma source: https://www.figma.com/design/bM6mU6sg1EVZ1kQyyrMDDD/Developer-Portfolio-Website-Design--Community- (node `14:4`, frame "Web Design")

## Context

The user asked to rebuild their live portfolio to match a shared Figma community design. Two false starts were corrected before this spec:

1. The initial work happened in the `Newportfolio` repo's Vite app (`main` branch) — this is **not** what's deployed live.
2. The live site's source is a local `oldportfolio` branch, but that branch was 20 commits stale relative to `old-portfolio/main` (the actual deployed history — "v6 Tech design", cream accent, current Reply/Nepta role). The redesign branch was recreated from `old-portfolio/main`.

The live codebase (`src/app/App.tsx` + `Tx*` components + `content.tsx`) is a mature, bilingual (IT/EN), highly polished "terminal/dev-console" themed site with scroll-reveal animations, a sticky header with active-section tracking, an accent-color switcher, Vercel per-section analytics (virtual paths), and a Three.js ASCII hero effect. This is real engineering investment that must not be thrown away.

The Figma file only designs 5 sections (Header, Hero, "Experience with" logos, Projects × 2 cards, Experience × 3 rows, Footer) with placeholder content (generic bio, Google/Apple/Meta jobs, 2 dummy projects). The live site has 9 real sections and much richer content (4 work-history entries, 5 projects, 4 skill categories, education + certs + languages, 4 hobbies).

**Decision (user-approved): full visual match to Figma.** The terminal/monospace identity is replaced by Figma's visual language. The underlying engineering (content model, bilingual system, animations, analytics, accessibility) is preserved and re-skinned, and the Figma design system is extended (not literally copy-pasted) to cover the sections Figma didn't mock up, so the whole site reads as one coherent design instead of two clashing styles.

## Visual system

Replacing the current CSS theme (`src/styles/index.css`) with a system derived from the Figma tokens:

- **Background:** `#161513` (near-black, close to current `--bg` — kept as-is in spirit)
- **Typography:** Poppins (ExtraBold for headings/CTAs, SemiBold for buttons/labels, Light/Regular for body copy) replaces Instrument Serif (name/section titles) and JetBrains Mono (labels, buttons, terminal prefixes)
- **Section title gradients** (Figma's per-section colored gradient headings, extended consistently to sections Figma didn't design):
  - Hero emphasis text: orange→purple `linear-gradient(158deg, #FF8660 71.8%, #9A33FF 95.5%)`
  - Projects: orange `#FF8660 → #D5491D`
  - Experience: blue `#5BADFF → #1373D1`
  - Now / Stack / Education / Behind-the-keyboard: new but consistent gradients picked from the same warm/cool family (documented in the component during implementation) so every section keeps a distinct identity, matching Figma's pattern rather than inventing an unrelated system
- **Buttons:** pill-shaped (`rounded-full`), primary = filled white/cream, secondary = outlined, matching Figma's `Get In Touch` / `Download CV` pair
- **Cards:** dark (`#2a2a2a`), `18px` rounded corners, thumbnail image on top, bold uppercase caption bottom-left, small external-link glyph bottom-right — this becomes the shared card style for Projects (and is echoed, without a thumbnail, for other card-like content)

## What's removed vs kept

**Removed** (superseded by the Figma visual language):
- Instrument Serif italic name treatment, JetBrains Mono monospace labels/buttons
- `$` / `//` / `#` terminal-style text prefixes
- Three.js ASCII torus-knot hero background (`TxAscii3D`)
- Scramble/decode hover effect on the hero name
- 5-color accent switcher (`TxAccent`) — Figma's gradient system replaces the single-accent-variable approach
- CRT scanline overlay, corner-bracket hover decorations, cursor spotlight glow

**Kept** (re-skinned, not rewritten):
- `content.tsx` bilingual (IT/EN) data model and the IT/EN toggle in the header
- Scroll-reveal system (`useReveal` / `.reveal` / `IntersectionObserver`)
- Sticky header with active-section highlighting
- Vercel virtual-path per-section analytics (`useVirtualPaths`) and `trackEvent` calls
- All real content: 4 work-history entries, 5 projects, 4 skill columns, education + certs + languages, 4 passions, contact fields
- Responsive breakpoints and accessibility behavior (`prefers-reduced-motion`, focus rings)

## Section-by-section mapping

| Figma frame | Target component | Notes |
|---|---|---|
| Header | `TxHeader` | Restyled nav bar (Poppins, translucent dark bg per Figma). Keeps IT/EN toggle and full real nav (not just Figma's 4 items) since dropping sections would lose content. |
| Avatar + Title + About Me + Action Buttons | `TxHero` | Circular photo avatar (see Assets) with gradient blob backdrop, replaces terminal prompt/ASCII effect. Headline restyled with gradient emphasis. Two pill CTAs (email = "Get In Touch" equivalent, CV download). GitHub/LinkedIn links move out of the primary CTA row (footer/header only), matching Figma's 2-button hero. |
| Logos ("Experience With") | `TxHero` (sub-section) | Icon set swapped to Mario's real primary stack: Kubernetes, Docker, Terraform, Azure DevOps, React/TypeScript (5 icons, same visual slot as Figma's JS/Node/HTML/CSS/React row). |
| Projects Title + 2 Project cards | `TxWork` | Figma's 2-card layout becomes a responsive grid sized to the real 5 projects, using the same card chrome (thumbnail, rounded-18px, bold uppercase caption, view-icon). |
| Experience Title + Experience Section (3 rows) | `TxExperience` | Figma's 3-row flat list (logo + title + description + date range) replaces the current "deploy log" big-year layout. Real 4 entries (Reply/Nepta, Lutech, Università di Salerno, Susy & Tito). |
| Footer (Contact heading + blurb + email + social icons) | `TxContact` + `TxFooter` | Merged into one simpler block per Figma. Social icons swapped from Instagram/X/YouTube to GitHub/LinkedIn/Email. The existing contact field grid (role/company/location/languages) is kept but restyled to fit the simpler Figma footer look. |
| *(not in Figma)* | `TxNow`, `TxStack`, `TxEducation`, `TxBehind` | No direct mock — restyled using the same design system (Poppins, gradient section titles, card style) established above, so they don't look like a leftover different site. |

## Assets

- **Avatar:** Mario's real photo (already in `src/assets/`) in a circular frame with a colorful gradient blob behind it, recreating Figma's composition without using its generic cartoon character.
- **Tech logos ("Experience With"):** downloaded icon assets for Kubernetes, Docker, Terraform, Azure DevOps, React/TypeScript (from an open icon set, e.g. Simple Icons, matching the flat single-color style of Figma's row).
- **Experience company logos:** real official logos, per user request (not monogram placeholders):
  - Reply — official logo
  - Lutech — official logo
  - Nepta — official logo if available; Nepta is a smaller consulting/staffing firm, so if no clean official mark exists this falls back to a text wordmark styled to match
  - Università degli Studi di Salerno — public university crest/logo
  - Susy & Tito (family salon) — no official brand logo exists; falls back to a simple generic icon (e.g. storefront/scissors glyph) styled consistently with the other rows
  - Logos are downloaded as static assets into `public/assets/logos/` during implementation (not hot-linked), sized/cropped to match the geometry Figma uses for the Google/Apple/Meta marks
- **Project thumbnails:** reuse existing project cover assets already in the codebase; restyled only via the new card chrome.

## Out of scope

- No changes to Vercel Analytics/Speed Insights wiring, routing (`vercel.json` virtual paths), or the CV PDF content.
- No changes to `content.tsx`'s data *content* (copy stays the same) — only new fields if a component genuinely needs one (e.g. a logo asset path per experience entry).
- No new pages/routes — this is a single-page redesign.
- Accent color switcher removal is a visual decision covered above, not a re-litigation of the color system itself.

## Risks / open questions carried into implementation

- Company logo availability/format for Reply, Lutech, Nepta needs confirming when actually sourcing the assets — if an official SVG isn't cleanly available, the implementation will use the best available raster logo rather than a hand-redrawn one.
- Extending Figma's 2-gradient system to 4 additional section titles is a judgment call made during implementation; it should stay within the same warm/cool palette family established by the orange (Projects) and blue (Experience) gradients already in the design.
