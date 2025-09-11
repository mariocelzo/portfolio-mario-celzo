"use client"

import type React from "react"
import { CSSProperties, HTMLAttributes, useMemo, useRef } from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  maxTilt?: number // degrees
  scale?: number // scale on hover
}

export default function Tilt({ children, className = "", maxTilt = 8, scale = 1.01, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const motionOK = useMemo(() => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  function onMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!motionOK) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width // 0..1
    const py = (e.clientY - rect.top) / rect.height // 0..1
    const rx = (0.5 - py) * maxTilt
    const ry = (px - 0.5) * maxTilt
    const transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
    el.style.transform = transform
    ;(el as any).style.setProperty('--px', String(px))
    ;(el as any).style.setProperty('--py', String(py))
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  const style: CSSProperties = {
    transformStyle: 'preserve-3d',
    transition: 'transform 200ms ease',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {/* highlight sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: 'radial-gradient(200px 150px at calc(var(--px, 0.5) * 100%) calc(var(--py, 0.2) * 100%), hsl(var(--foreground) / 0.06), transparent 60%)',
          transform: 'translateZ(1px)'
        }}
      />
      {children}
    </div>
  )
}
