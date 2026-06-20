"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        <article
          className="relative overflow-hidden transition-all duration-300"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Accent line — grows on hover */}
          <div
            className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100"
            style={{ backgroundColor: "#818cf8" }}
          />

          <div className="grid grid-cols-[80px_1fr] gap-0 py-10 pl-6 pr-0 md:grid-cols-[120px_1fr_auto]">
            {/* Left col: number */}
            <div className="flex flex-col justify-between pt-1">
              <span
                className="font-mono text-xs tracking-widest"
                style={{ color: "#818cf8" }}
              >
                {project.index}
              </span>
              <span
                className="mt-4 font-mono text-[10px] tracking-widest uppercase hidden md:block"
                style={{ color: "#3f3f46" }}
              >
                {project.year}
              </span>
            </div>

            {/* Center col: content */}
            <div className="flex flex-col gap-4">
              <div>
                <p
                  className="mb-2 font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "#3f3f46" }}
                >
                  {project.category}
                </p>
                <h3
                  className="text-2xl font-semibold leading-tight tracking-tight transition-colors duration-200 md:text-3xl"
                  style={{ color: "#fafafa" }}
                >
                  {project.title}
                </h3>
              </div>

              <p
                className="max-w-lg text-sm leading-7"
                style={{ color: "#52525b" }}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded px-2 py-0.5 font-mono text-[10px] tracking-wider"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      color: "#52525b",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right col: arrow */}
            <div className="hidden items-start justify-end pr-6 pt-1 md:flex">
              <motion.span
                className="flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  color: "#3f3f46",
                }}
                whileHover={{
                  borderColor: "rgba(129,140,248,0.4)",
                  color: "#818cf8",
                  backgroundColor: "rgba(129,140,248,0.08)",
                }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
