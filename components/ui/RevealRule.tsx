"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/** A thin rule that draws itself in on scroll — the same "calibration line"
 * motif repeated under every section heading, so the sections read as one
 * instrument rather than independently styled blocks. */
export function RevealRule({ delay = 0.2, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease, delay }}
      className={`h-px w-full origin-left bg-border ${className}`}
    />
  );
}
