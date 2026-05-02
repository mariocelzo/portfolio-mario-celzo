/**
 * FeatureSlides.tsx
 *
 * Cinematic Apple-style feature showcase inserted between Hero and About.
 * Contains:
 *   - Marquee: big centered tagline section with "Now playing" pill badge
 *   - 4 FeatureCards: alternating layout cards with inline visuals
 *     (pipeline, kubernetes grid, observability dashboard, frontend stack)
 *
 * Animations use ease-out-expo cubic-bezier for cinematic scroll reveals.
 * All visual sub-components are self-contained and use CSS variables from theme.css.
 */

import { motion } from "motion/react";

// Ease-out-expo bezier — used across all animation transitions for cinematic feel
const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─────────────────────────────────────────────
// Marquee — big centered tagline with pill badge
// ─────────────────────────────────────────────
function Marquee() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80, scale: 0.993 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.1, ease: EXPO }}
      className="relative overflow-hidden"
      style={{
        padding: 'clamp(80px, 12vw, 160px) 0',
        background:
          'linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--muted) 40%, var(--background)) 100%)',
      }}
    >
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* "Now playing" status pill — shows the section is actively featured */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 14px',
            borderRadius: 9999,
            background: 'color-mix(in oklab, var(--card) 70%, transparent)',
            border: '1px solid color-mix(in oklab, var(--border) 50%, transparent)',
            backdropFilter: 'blur(12px)',
            font: '500 11px var(--font-mono)',
            color: 'var(--muted-foreground)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase' as const,
            marginBottom: 28,
          }}
        >
          {/* Green pulse dot — "live" indicator */}
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 9999,
              background: '#27C93F',
              boxShadow: '0 0 8px rgba(39,201,63,.7)',
              display: 'inline-block',
            }}
          />
          Now playing — the work
        </div>

        {/* Primary headline — responsive fluid font sizing */}
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(36px, 6.5vw, 96px)',
            fontWeight: 700,
            letterSpacing: '-0.038em',
            lineHeight: 1.0,
            margin: '0 auto',
            maxWidth: 1000,
          }}
        >
          Software that scales.
          <br />
          {/* Gradient italic mono line — differentiates infrastructure focus */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontStyle: 'italic',
              fontWeight: 500,
              background:
                'linear-gradient(90deg, var(--primary), color-mix(in oklab, var(--primary) 40%, var(--muted-foreground)))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Infrastructure that doesn't blink.
          </span>
        </h2>

        {/* Subheading — concise pipeline-to-deploy narrative */}
        <p
          style={{
            fontSize: 'clamp(15px, 2vw, 19px)',
            lineHeight: 1.55,
            fontWeight: 500,
            color: 'var(--muted-foreground)',
            margin: '28px auto 0',
            maxWidth: 600,
          }}
        >
          From first commit to blue-green deploy — every project ships with a story, a pipeline, and a pager that never rings.
        </p>
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────
// Feature card data — defines all 4 showcase cards
// Each has: kicker label, title, copy, visual key, gradient bg, tone (dark/light)
// ─────────────────────────────────────────────
const features = [
  {
    kicker: 'CI/CD',
    title: 'Pipelines that think.',
    copy: 'Build, test, scan, deploy — orchestrated in GitHub Actions with SonarCloud quality gates and zero-downtime rollouts.',
    visual: 'pipeline',
    bg: 'linear-gradient(135deg, #0A142F 0%, #1E2B4A 60%, #2A3B61 100%)',
    tone: 'dark',
  },
  {
    kicker: 'Kubernetes',
    title: 'Clusters that heal themselves.',
    copy: 'Self-orchestrating workloads on Azure AKS — autoscaling, rolling updates, observability baked in from day zero.',
    visual: 'k8s',
    bg: 'linear-gradient(135deg, #89CFF0 0%, #506182 100%)',
    tone: 'light',
  },
  {
    kicker: 'Observability',
    title: 'Signal, not noise.',
    copy: 'Metrics, logs, and traces unified into a single pane — so the 3am page never happens.',
    visual: 'dash',
    bg: 'linear-gradient(135deg, #0A142F 0%, #121B2F 100%)',
    tone: 'dark',
  },
  {
    kicker: 'Frontend',
    title: 'Interfaces, shipped.',
    copy: 'Typed React + TypeScript components, Angular dashboards for live infra, React Native on mobile — junior hands-on, learning fast.',
    visual: 'frontend',
    bg: 'linear-gradient(135deg, #F4F8FD 0%, #D1DDEB 60%, #89CFF0 100%)',
    tone: 'light',
  },
];

// ─────────────────────────────────────────────
// PipelineVisual — CI/CD stage list with numbered steps
// Mimics a terminal output of sequential pipeline stages
// ─────────────────────────────────────────────
function PipelineVisual() {
  const stages = ['build', 'test', 'scan', 'deploy'];
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {stages.map((s, i) => (
          <div
            key={s}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 18px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.11)',
              backdropFilter: 'blur(14px)',
              borderRadius: 12,
              font: '500 13px var(--font-mono)',
              color: 'rgba(240,246,252,.9)',
            }}
          >
            {/* Step index badge with increasing opacity to imply progress */}
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                flexShrink: 0,
                background: `linear-gradient(135deg, rgba(137,207,240,${0.25 + i * 0.18}), rgba(137,207,240,${0.08 + i * 0.12}))`,
                border: '1px solid rgba(137,207,240,.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              {i + 1}
            </div>
            <span>$ ./{s}.sh</span>
            {/* Green checkmark — all stages passing */}
            <span style={{ marginLeft: 'auto', fontSize: 11, color: '#27C93F' }}>✓</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// K8sVisual — 3×3 pulsing node grid representing a Kubernetes cluster
// Each node pulses asynchronously to convey live orchestration
// ─────────────────────────────────────────────
function K8sVisual() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,64px)',
          gridTemplateRows: 'repeat(3,64px)',
          gap: 14,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              borderRadius: 14,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // CSS animation references the @keyframes nodeP injected in index.css
              animation: `nodeP ${2 + (i % 4) * 0.4}s ease-in-out ${i * 0.14}s infinite`,
            }}
          >
            {/* Node dot — white glowing point representing a pod */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: '#fff',
                boxShadow: '0 0 10px rgba(255,255,255,.8)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DashVisual — P95 latency bar chart with live indicator
// Fake metrics to show observability aesthetic
// ─────────────────────────────────────────────
function DashVisual() {
  const bars = [60, 78, 45, 82, 55, 90, 65, 72, 48, 85];
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: 32,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(14px)',
          padding: '20px 20px 16px',
        }}
      >
        {/* Dashboard header row with metric label and live dot */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
            font: '500 10px var(--font-mono)',
            color: 'rgba(240,246,252,.65)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
          }}
        >
          <span>p95 latency</span>
          <span style={{ color: '#27C93F' }}>● live</span>
        </div>

        {/* Bar chart — each bar width is 1fr, height driven by % value */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 140 }}>
          {bars.map((v, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${v}%`,
                background:
                  'linear-gradient(180deg, rgba(137,207,240,.9), rgba(137,207,240,.25))',
                borderRadius: 4,
                border: '1px solid rgba(137,207,240,.35)',
              }}
            />
          ))}
        </div>

        {/* Axis labels: min / avg / max */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 12,
            font: '500 10px var(--font-mono)',
            color: 'rgba(240,246,252,.55)',
          }}
        >
          <span>42ms</span>
          <span style={{ color: '#F0F6FC' }}>avg 68ms</span>
          <span>118ms</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FrontendVisual — fake code window + tech chip pills
// Represents the frontend engineering stack in visual form
// ─────────────────────────────────────────────
function FrontendVisual() {
  // Tech chips: each chip has a label and a brand color dot
  const chips = [
    { label: 'React', color: '#61DAFB' },
    { label: 'TypeScript', color: '#3178C6' },
    { label: 'Angular', color: '#DD0031' },
    { label: 'React Native', color: '#61DAFB' },
    { label: 'Next.js', color: '#0A142F' },
    { label: 'Tailwind', color: '#38BDF8' },
    { label: 'Vite', color: '#646CFF' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {/* Fake code editor window with macOS traffic-light dots */}
        <div
          style={{
            borderRadius: 14,
            background: 'rgba(10,20,47,0.94)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 16px 32px -8px rgba(10,20,47,.5)',
            overflow: 'hidden',
          }}
        >
          {/* Window title bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '9px 12px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 9999,
                background: '#FF5F56',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 9999,
                background: '#FFBD2E',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 9999,
                background: '#27C93F',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                marginLeft: 'auto',
                font: '500 10px var(--font-mono)',
                color: 'rgba(255,255,255,.45)',
              }}
            >
              Dashboard.tsx
            </span>
          </div>

          {/* Syntax-highlighted code snippet */}
          <div
            style={{
              padding: '14px 16px',
              font: '500 12px var(--font-mono)',
              lineHeight: 1.7,
              color: '#F0F6FC',
            }}
          >
            <div>
              <span style={{ color: '#89CFF0' }}>const</span>{' '}
              <span style={{ color: '#fff' }}>Dashboard</span> = () =&gt; {'{'}
            </div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: '#89CFF0' }}>const</span> [data] ={' '}
              <span style={{ color: '#FFBD2E' }}>useQuery</span>&lt;
              <span style={{ color: '#89CFF0' }}>Metric[]</span>&gt;();
            </div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: '#89CFF0' }}>return</span> &lt;
              <span style={{ color: '#FFBD2E' }}>Chart</span> data={'{data}'} /&gt;;
            </div>
            <div>{'}'}</div>
          </div>
        </div>

        {/* Tech stack chips — brand-colored dot + label pill */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {chips.map((c) => (
            <div
              key={c.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '6px 11px',
                background: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(10,20,47,0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: 9999,
                font: '500 11px var(--font-mono)',
                color: '#0A142F',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 9999,
                  background: c.color,
                  boxShadow: `0 0 6px ${c.color}90`,
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
              {c.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FeatureCard — full-bleed cinematic split card
// Text side alternates left/right based on index (odd = flipped)
// Visual side renders the matching inline component
// ─────────────────────────────────────────────
function FeatureCard({ f, i }: { f: (typeof features)[0]; i: number }) {
  // Odd-index cards flip the column order for visual rhythm
  const flipped = i % 2 === 1;
  const fg = f.tone === 'dark' ? '#F0F6FC' : '#0A142F';
  const muted = f.tone === 'dark' ? 'rgba(240,246,252,.68)' : 'rgba(10,20,47,.6)';

  return (
    <motion.section
      initial={{ opacity: 0, y: 100, scale: 0.965 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.2, ease: EXPO }}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(40px, 8vw, 96px) 0' }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div
          className="feature-inner"
          style={{
            borderRadius: 'clamp(18px, 3vw, 32px)',
            background: f.bg,
            overflow: 'hidden',
            boxShadow:
              '0 40px 80px -20px rgba(10,20,47,.35), 0 8px 16px -4px rgba(10,20,47,.12)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: 'clamp(360px, 48vw, 520px)',
            alignItems: 'stretch',
          }}
        >
          {/* Text side — kicker + headline + description */}
          <div
            style={{
              padding: 'clamp(36px, 5vw, 72px) clamp(28px, 5vw, 64px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              order: flipped ? 2 : 1,
              color: fg,
            }}
          >
            {/* Kicker — monospace label like "./ci-cd" */}
            <div
              style={{
                font: '500 11px var(--font-mono)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                color: muted,
                marginBottom: 16,
              }}
            >
              ./{f.kicker.toLowerCase()}
            </div>

            {/* Card title — fluid font sizing */}
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(26px, 3.5vw, 52px)',
                fontWeight: 700,
                letterSpacing: '-0.028em',
                lineHeight: 1.08,
                margin: '0 0 18px 0',
                color: fg,
              }}
            >
              {f.title}
            </h3>

            {/* Card body copy */}
            <p
              style={{
                fontSize: 'clamp(14px, 1.6vw, 18px)',
                lineHeight: 1.55,
                fontWeight: 500,
                color: muted,
                margin: 0,
              }}
            >
              {f.copy}
            </p>
          </div>

          {/* Visual side — contains the inline diagram/animation */}
          <div
            style={{
              order: flipped ? 1 : 2,
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.04)',
              borderLeft: flipped ? 'none' : '1px solid rgba(255,255,255,0.08)',
              borderRight: flipped ? '1px solid rgba(255,255,255,0.08)' : 'none',
              minHeight: 280,
            }}
          >
            {f.visual === 'pipeline' && <PipelineVisual />}
            {f.visual === 'k8s' && <K8sVisual />}
            {f.visual === 'dash' && <DashVisual />}
            {f.visual === 'frontend' && <FrontendVisual />}
          </div>
        </div>
      </div>

      {/* Responsive overrides: collapse to single column on small screens, hide visual */}
      <style>{`
        .feature-inner { grid-template-columns: 1fr 1fr; }
        @media(max-width: 680px) {
          .feature-inner { grid-template-columns: 1fr !important; }
          .feature-inner > div:last-child { display: none; }
        }
      `}</style>
    </motion.section>
  );
}

// ─────────────────────────────────────────────
// FeatureSlides — public export
// Renders Marquee + 4 FeatureCards in sequence
// Inserted between Hero and About in App.tsx
// ─────────────────────────────────────────────
export function FeatureSlides() {
  return (
    <>
      <Marquee />
      {features.map((f, i) => (
        <FeatureCard key={i} f={f} i={i} />
      ))}
    </>
  );
}
