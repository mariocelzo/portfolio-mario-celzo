"use client";

import { motion } from "framer-motion";

/**
 * Componente AnimatedSkillBar - Barra di progresso animata per skills
 *
 * Stile: Apple-like - barra che si riempie fluidamente quando diventa visibile
 * Features:
 * - Fade-in del container
 * - Animazione progress bar da 0 a valore target
 * - Animazione percentuale che appare dopo la barra
 * - Stagger quando usato in liste
 *
 * @param name - Nome della skill
 * @param level - Livello di competenza (0-100)
 * @param icon - Emoji/icona della skill (opzionale)
 * @param index - Indice per stagger effect (opzionale)
 * @param className - Classi CSS aggiuntive
 */

interface AnimatedSkillBarProps {
  name: string;
  level: number;
  icon?: string;
  index?: number;
  className?: string;
}

export default function AnimatedSkillBar({
  name,
  level,
  icon,
  index = 0,
  className = ""
}: AnimatedSkillBarProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        amount: 0.5  // Trigger quando metà dell'elemento è visibile
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,  // Stagger: ogni skill appare con 0.08s di ritardo
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {/* Nome skill e percentuale */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="font-medium text-foreground">{name}</span>
        </div>

        {/* Percentuale animata - appare dopo un delay */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.08 + 0.5,  // Appare dopo che la barra inizia a riempirsi
            ease: "easeOut"
          }}
          className="text-sm text-muted-foreground font-semibold"
        >
          {level}%
        </motion.span>
      </div>

      {/* Barra di progresso */}
      <div className="h-2.5 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-primary/90 to-primary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,        // Durata riempimento barra
            delay: index * 0.08 + 0.2,  // Piccolo delay dopo il fade-in
            ease: [0.25, 0.46, 0.45, 0.94]  // Easing naturale per progress bar
          }}
        />
      </div>
    </motion.div>
  );
}

/**
 * AnimatedSkillBarContainer - Container per liste di skill bars con stagger orchestrato
 *
 * Wrapper che coordina l'animazione di tutte le skill bars
 *
 * @param children - Lista di AnimatedSkillBar
 * @param className - Classi CSS aggiuntive
 */

interface AnimatedSkillBarContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSkillBarContainer({
  children,
  className = ""
}: AnimatedSkillBarContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,   // Delay tra ogni skill bar
        delayChildren: 0.1       // Delay prima che inizi lo stagger
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
