"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectDetailBody } from "./ProjectDetailBody";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 py-10 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-black/10 shadow-2xl dark:border-white/10"
            style={{ background: "var(--glass-bg-strong)" }}
          >
            {/* Gradient header — distinct per project */}
            <div
              className={`relative overflow-hidden bg-gradient-to-br ${project.gradient} px-6 py-9 md:px-9 md:py-11`}
            >
              <span className="pointer-events-none absolute -right-2 -top-8 select-none font-mono text-[140px] font-bold leading-none text-white/10">
                {project.index}
              </span>

              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="relative mb-3 font-mono text-[10px] tracking-[0.2em] uppercase text-white/70">
                {project.category} · {project.status}
              </p>
              <h2 className="relative max-w-md text-2xl font-semibold text-white md:text-3xl">
                {project.title}
              </h2>
              <p className="relative mt-3 max-w-md text-sm leading-relaxed text-white/80">
                {project.description}
              </p>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-6 md:p-8">
              <ProjectDetailBody project={project} />

              <Link
                href={`/work/${project.slug}`}
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#818cf8] transition-colors hover:text-[#a855f7]"
              >
                View full case study
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
