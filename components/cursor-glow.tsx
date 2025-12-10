"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CursorGlow - Effetto glow che segue il cursore
 * 
 * Aggiunge un effetto luminoso che segue il mouse,
 * creando un'esperienza interattiva e moderna.
 * Visibile solo su desktop (lg breakpoint).
 */
export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);

    globalThis.addEventListener("mousemove", moveCursor);
    globalThis.addEventListener("mouseleave", hideCursor);

    return () => {
      globalThis.removeEventListener("mousemove", moveCursor);
      globalThis.removeEventListener("mouseleave", hideCursor);
    };
  }, [cursorX, cursorY]);

  if (!isMounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Main glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 60%)",
        }}
      />
      
      {/* Inner brighter glow */}
      <motion.div
        className="absolute w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          background: "radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 60%)",
        }}
      />
    </motion.div>
  );
}

export default CursorGlow;
