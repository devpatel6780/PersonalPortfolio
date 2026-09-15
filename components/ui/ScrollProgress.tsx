"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundImage: "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))",
        boxShadow: "0 0 10px 0 var(--color-accent)",
        transformOrigin: "0%",
        zIndex: 9997,
        opacity: 0.9,
      }}
    />
  );
}
