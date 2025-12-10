"use client";

import { motion } from "framer-motion";

/**
 * AuroraBackground - Sfondo animato con effetto aurora boreale
 * 
 * Crea un background dinamico con gradienti colorati che ruotano lentamente,
 * dando un effetto moderno e professionale alla hero section.
 */
export function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Aurora layers - rotating gradient blobs */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-20"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-[80px]" />
      </motion.div>

      {/* Secondary aurora layer - counter rotation */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] opacity-15"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-cyan-500/20 rounded-full blur-[90px]" />
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-pink-500/15 rounded-full blur-[70px]" />
      </motion.div>
    </div>
  );
}

export default AuroraBackground;
