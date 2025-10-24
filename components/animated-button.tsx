"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

/**
 * Componente AnimatedButton - Bottone con micro-interazioni accattivanti
 *
 * Stile: Apple-like - interazioni subtili ma notevoli che invogliano al click
 * Features:
 * - Scale effect al hover
 * - Tap feedback immediato
 * - Transizioni fluide
 *
 * @param children - Contenuto del bottone
 * @param className - Classi CSS aggiuntive
 * @param variant - Variante animazione: 'scale' (default) o 'lift'
 * @param ...props - Props HTML button standard (onClick, disabled, etc.)
 */

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  className?: string;
  variant?: "scale" | "lift";
}

export default function AnimatedButton({
  children,
  className = "",
  variant = "scale",
  ...props
}: AnimatedButtonProps) {
  // Varianti di animazione per diversi stili di bottone
  const variants = {
    scale: {
      hover: {
        scale: 1.05,        // Ingrandimento del 5%
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      },
      tap: {
        scale: 0.95         // Compressione al click per feedback tattile
      }
    },
    lift: {
      hover: {
        y: -4,              // Solleva il bottone di 4px
        scale: 1.02,        // Leggero ingrandimento
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      },
      tap: {
        y: -2,
        scale: 0.98
      }
    }
  };

  const selectedVariant = variants[variant];

  return (
    <motion.button
      whileHover={selectedVariant.hover}
      whileTap={selectedVariant.tap}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/**
 * AnimatedLink - Link con micro-interazioni (per link esterni, progetti, etc.)
 *
 * Come AnimatedButton ma per elementi <a>
 */

interface AnimatedLinkProps extends Omit<HTMLMotionProps<"a">, "children"> {
  children: ReactNode;
  className?: string;
  variant?: "scale" | "lift";
}

export function AnimatedLink({
  children,
  className = "",
  variant = "scale",
  ...props
}: AnimatedLinkProps) {
  const variants = {
    scale: {
      hover: { scale: 1.05 },
      tap: { scale: 0.95 }
    },
    lift: {
      hover: { y: -4, scale: 1.02 },
      tap: { y: -2, scale: 0.98 }
    }
  };

  const selectedVariant = variants[variant];

  return (
    <motion.a
      whileHover={selectedVariant.hover}
      whileTap={selectedVariant.tap}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}
