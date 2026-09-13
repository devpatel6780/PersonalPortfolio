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
        className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl"
      >
        {project.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.12 }}
        className="text-lg leading-relaxed text-gray-600 dark:text-gray-400"
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
          <p className="mb-1 font-mono text-[9px] tracking-widest uppercase text-gray-400 dark:text-gray-600">
            Year
          </p>
          <p className="font-mono text-sm text-gray-600 dark:text-gray-400">{project.year}</p>
        </div>
        <div className="h-8 w-px bg-black/10 dark:bg-white/10" />
        <div>
          <p className="mb-1 font-mono text-[9px] tracking-widest uppercase text-gray-400 dark:text-gray-600">
            Status
          </p>
          <p className="font-mono text-sm text-gray-600 dark:text-gray-400">{project.status}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
        className="mt-12 h-px origin-left bg-black/10 dark:bg-white/10"
      />
    </div>
  );
}
