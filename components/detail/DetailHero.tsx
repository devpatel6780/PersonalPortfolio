"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const ease = [0.16, 1, 0.3, 1] as const;

export function DetailHero({ project }: { project: Project }) {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-16 pt-14">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="mb-5 font-mono text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "#818cf8" }}
      >
        {project.index} — {project.category}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.05 }}
        className="mb-6 text-4xl font-semibold leading-tight tracking-tight md:text-5xl"
        style={{ color: "#e2e2e5" }}
      >
        {project.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.12 }}
        className="text-lg leading-relaxed"
        style={{ color: "#52525b" }}
      >
        {project.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 flex items-center gap-6"
      >
        <div>
          <p
            className="mb-1 font-mono text-[9px] tracking-widest uppercase"
            style={{ color: "#374151" }}
          >
            Year
          </p>
          <p className="font-mono text-sm" style={{ color: "#52525b" }}>
            {project.year}
          </p>
        </div>
        <div
          className="h-8 w-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <div>
          <p
            className="mb-1 font-mono text-[9px] tracking-widest uppercase"
            style={{ color: "#374151" }}
          >
            Status
          </p>
          <p className="font-mono text-sm" style={{ color: "#52525b" }}>
            {project.status}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
        className="mt-12 h-px origin-left"
        style={{ background: "rgba(255,255,255,0.07)" }}
      />
    </div>
  );
}
