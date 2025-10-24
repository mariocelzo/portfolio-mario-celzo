"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Componente AnimatedCard - Card con animazione stagger + hover effect
 *
 * Stile: Apple-like - animazioni eleganti con stagger per liste di card
 * Features:
 * - Fade-in + slide-up quando entra in viewport
 * - Hover effect: leggero lift + shadow
 * - Tap effect: leggera compressione al click
 *
 * @param children - Contenuto della card
 * @param index - Indice della card per calcolare il delay dello stagger
 * @param className - Classi CSS aggiuntive
 */

interface AnimatedCardProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

export default function AnimatedCard({
  children,
  index = 0,
  className = ""
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        amount: 0.2  // Trigger più sensibile per le card
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,  // Stagger: ogni card appare 0.1s dopo la precedente
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{
        y: -8,           // Solleva la card di 8px
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      }}
      whileTap={{
        scale: 0.98     // Leggera compressione al click
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedCardContainer - Container per liste di card con stagger orchestrato
 *
 * Wrapper che coordina l'animazione di tutte le card figlie
 * Usa questo quando hai una lista di card che devono apparire in sequenza
 *
 * @param children - Lista di AnimatedCard
 * @param className - Classi CSS aggiuntive
 */

interface AnimatedCardContainerProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedCardContainer({
  children,
  className = ""
}: AnimatedCardContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,  // Delay tra ogni card
        delayChildren: 0.2     // Delay prima che inizi lo stagger
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
