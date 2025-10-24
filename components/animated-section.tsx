"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Componente AnimatedSection - Wrapper per sezioni con animazione fade-in + slide-up
 *
 * Stile: Apple-like - animazioni eleganti e subtili
 * Timing: Bilanciato (0.5-0.6s) - notevole ma non eccessivo
 *
 * @param children - Contenuto della sezione da animare
 * @param delay - Ritardo opzionale prima dell'animazione (default: 0)
 * @param className - Classi CSS aggiuntive
 * @param amount - Percentuale elemento visibile per trigger (default: 0.1 = 10%, molto reattivo)
 * @param margin - Margin per anticipare trigger (default: "0px 0px 100px 0px" = anticipa di 100px)
 */

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
  margin?: string;
}

export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
  amount = 0.1,  // Ridotto da 0.3 a 0.1 - molto più reattivo!
  margin = "0px 0px 100px 0px"  // Anticipa di 100px di default
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,      // Parte invisibile
        y: 30            // Parte 30px più in basso
      }}
      whileInView={{
        opacity: 1,      // Diventa completamente visibile
        y: 0             // Torna alla posizione originale
      }}
      viewport={{
        once: true,      // L'animazione avviene solo una volta
        amount: amount,  // Trigger quando X% dell'elemento è visibile (default 10%)
        margin: margin   // Anticipa il trigger (default 100px)
      }}
      transition={{
        duration: 0.6,   // Durata animazione: bilanciata
        delay: delay,    // Ritardo personalizzabile
        ease: [0.25, 0.1, 0.25, 1] // Easing curve in stile Apple (cubic-bezier)
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
