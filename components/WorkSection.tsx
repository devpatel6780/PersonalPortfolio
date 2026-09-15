"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { ProjectModal } from "@/components/detail/ProjectModal";
import { RevealRule } from "@/components/ui/RevealRule";

const ease = [0.16, 1, 0.3, 1] as const;

export function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section id="work" className="relative py-28 md:py-36" ref={ref}>
        <div className="container-wide">
          <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg"
            >
              Selected work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mono-label"
            >
              {String(projects.length).padStart(2, "0")} case studies
            </motion.p>
          </div>

          <RevealRule />

          <div>
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease, delay: Math.min(index * 0.06, 0.3) }}
              >
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  className="group relative grid w-full grid-cols-[2.5rem_1fr] gap-x-4 gap-y-4 overflow-hidden border-b border-border py-8 pl-5 text-left transition-colors hover:bg-surface-hover md:grid-cols-[4rem_1fr_auto] md:items-center md:gap-x-8 md:py-10 md:pl-7"
                >
                  <span className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100" />

                  <span className="mono-label pt-1 text-fg-faint transition-colors duration-300 group-hover:text-accent md:pt-0">
                    {project.index}
                  </span>

                  <div className="min-w-0">
                    <p className="mono-label mb-2 text-fg-faint">{project.category}</p>
                    <h3 className="mb-2 text-xl font-semibold leading-snug tracking-tight text-fg transition-colors md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mb-4 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <span className="tabular text-sm font-medium text-fg">
                        {project.results[0].value}
                        <span className="ml-1.5 font-normal text-fg-faint">
                          {project.results[0].label}
                        </span>
                      </span>
                      <span className="hidden h-3 w-px bg-border sm:block" />
                      <span className="text-sm text-fg-faint">{project.stack.slice(0, 3).join(" · ")}</span>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center justify-between md:col-span-1 md:flex-col md:items-end md:gap-4">
                    <span className="mono-label text-fg-faint">{project.year} · {project.status}</span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-fg-faint transition-all duration-300 group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
