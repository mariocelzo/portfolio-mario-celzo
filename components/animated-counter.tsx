"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AnimatedCounter - Contatore animato con effetto count-up
 * 
 * Mostra un numero che conta da 0 al valore finale quando
 * entra nel viewport. Ideale per statistiche e achievements.
 */
interface AnimatedCounterProps {
  readonly value: number;
  readonly suffix?: string;
  readonly prefix?: string;
  readonly duration?: number;
  readonly label: string;
  readonly icon: ReactNode;
  readonly className?: string;
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "",
  duration = 2,
  label,
  icon,
  className
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const incrementTime = Math.max((duration * 1000) / end, 10);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "text-center p-6 rounded-2xl bg-card border border-border",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "transition-all duration-300 group",
        className
      )}
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
        {icon}
      </div>
      <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        {prefix}{count}{suffix}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </motion.div>
  );
}

/**
 * StatsGrid - Container per una griglia di statistiche animate
 */
interface StatsGridProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function StatsGrid({ children, className }: StatsGridProps) {
  return (
    <div className={cn(
      "grid gap-4 grid-cols-2 md:grid-cols-4",
      className
    )}>
      {children}
    </div>
  );
}

/**
 * FloatingBadge - Badge fluttuante con animazione
 * 
 * Ideale per evidenziare achievements o status.
 */
interface FloatingBadgeProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

export function FloatingBadge({ children, className, delay = 0 }: FloatingBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-primary/10 text-primary text-sm font-medium",
        "border border-primary/20",
        className
      )}
    >
      <motion.span
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

export default AnimatedCounter;
