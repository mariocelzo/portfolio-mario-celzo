"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"

type TypewriterProps = {
  texts: string[]
  className?: string
  typingSpeed?: number // ms per char while typing
  deleteSpeed?: number // ms per char while deleting
  pauseBeforeDelete?: number // ms to wait after typing full text
  pauseBeforeType?: number // ms to wait before starting next text
  loop?: boolean
}

export default function Typewriter({
  texts,
  className,
  typingSpeed = 70,
  deleteSpeed = 45,
  pauseBeforeDelete = 1500,
  pauseBeforeType = 400,
  loop = true,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timerRef = useRef<number | null>(null)

  const currentText = useMemo(() => texts[index % texts.length] ?? "", [index, texts])

  useEffect(() => {
    // Respect Reduced Motion: instantly show full text without animating
    const reduceMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) {
      setDisplayed(currentText)
      return
    }

    // Clear previous timer on effect re-run
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }

    const isComplete = displayed === currentText
    const isEmpty = displayed.length === 0

    let delay = typingSpeed
    let nextText = displayed

    if (!isDeleting) {
      if (!isComplete) {
        nextText = currentText.slice(0, displayed.length + 1)
        delay = typingSpeed
      } else {
        delay = pauseBeforeDelete
        // After a pause, start deleting
        timerRef.current = window.setTimeout(() => setIsDeleting(true), delay)
        return
      }
    } else {
      if (!isEmpty) {
        nextText = currentText.slice(0, displayed.length - 1)
        delay = deleteSpeed
      } else {
        // Finished deleting; move to next index (or stop if no loop)
        if (!loop && index >= texts.length - 1) {
          setIsDeleting(false)
          setDisplayed(currentText)
          return
        }
        delay = pauseBeforeType
        timerRef.current = window.setTimeout(() => {
          setIsDeleting(false)
          setIndex((i) => (i + 1) % texts.length)
        }, delay)
        return
      }
    }

    timerRef.current = window.setTimeout(() => setDisplayed(nextText), delay)
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [currentText, deleteSpeed, displayed, loop, pauseBeforeDelete, pauseBeforeType, texts.length, typingSpeed, isDeleting, index])

  return (
    <span className={className} aria-live="polite" aria-label={currentText}>
      <span className="typewriter">{displayed}</span>
    </span>
  )
}

