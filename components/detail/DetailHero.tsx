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
        className="mono-label mb-5 text-accent"
      >
        {project.index} — {project.category}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.05 }}
        className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-fg md:text-5xl"
      >
        {project.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.12 }}
        className="text-lg leading-relaxed text-fg-muted"
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
          <p className="mono-label mb-1">Year</p>
          <p className="font-mono text-sm text-fg-muted">{project.year}</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div>
          <p className="mono-label mb-1">Status</p>
          <p className="font-mono text-sm text-fg-muted">{project.status}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
        className="mt-12 h-px origin-left bg-gradient-to-r from-accent via-accent-2/50 to-transparent"
      />
    </div>
  );
}
