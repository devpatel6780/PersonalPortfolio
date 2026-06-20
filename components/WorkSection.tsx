"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Award, Users } from "lucide-react";
import { projects } from "@/lib/projects";

export function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#1a0a2f] to-[#0a0a0f]" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 800,
              background: "linear-gradient(135deg, #00d4ff, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Portfolio &amp; Case Studies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] mx-auto mb-6" />
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Real systems, real metrics — AI engineering that holds up in production
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              className="group relative p-8 rounded-3xl backdrop-blur-xl border border-white/10 overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="mb-6">
                  <span
                    className="px-4 py-1 rounded-full text-sm border"
                    style={{
                      background: "rgba(0, 212, 255, 0.1)",
                      borderColor: "rgba(0, 212, 255, 0.3)",
                      color: "#00d4ff",
                      fontWeight: 600,
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                <h3 className="mb-4 text-white" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>

                <div className="grid grid-cols-3 gap-4">
                  {project.results.map((result, i) => {
                    const Icon = [TrendingUp, Award, Users][i % 3];
                    return (
                      <div
                        key={result.label}
                        className="text-center p-4 rounded-2xl"
                        style={{ background: "rgba(255, 255, 255, 0.05)" }}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-2 text-[#00d4ff]" />
                        <div
                          className="mb-1"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            background: "linear-gradient(135deg, #00d4ff, #a855f7)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {result.value}
                        </div>
                        <div className="text-gray-400 text-xs">{result.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs border border-white/10 text-gray-300"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}