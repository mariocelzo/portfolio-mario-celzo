"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * BentoItem - Singola cella del Bento Grid
 * 
 * Card animata con hover effects per il layout Bento.
 * Supporta diverse dimensioni tramite className.
 */
interface BentoItemProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly index?: number;
}

export function BentoItem({ children, className, index = 0 }: BentoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-card border border-border",
        "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
        "transition-all duration-300",
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      
      <div className="relative z-10 h-full p-6">
        {children}
      </div>
    </motion.div>
  );
}

/**
 * BentoGrid - Container per layout Bento
 * 
 * Grid responsivo che dispone le BentoItem in un layout moderno.
 */
interface BentoGridProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      "grid gap-4 auto-rows-[minmax(180px,auto)]",
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      className
    )}>
      {children}
    </div>
  );
}

/**
 * BentoCard - Card preconfigurata per contenuti comuni
 * 
 * Versione con icona, titolo e descrizione già strutturati.
 */
interface BentoCardProps {
  readonly icon: ReactNode;
  readonly title: string;
  readonly description: string;
  readonly className?: string;
  readonly index?: number;
  readonly children?: ReactNode;
}

export function BentoCard({ icon, title, description, className, index = 0, children }: BentoCardProps) {
  return (
    <BentoItem className={className} index={index}>
      <div className="flex flex-col h-full">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground flex-grow">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </BentoItem>
  );
}

export default BentoGrid;
