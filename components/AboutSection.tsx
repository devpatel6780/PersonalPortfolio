"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "LangGraph & Agents", level: 95 },
  { name: "RAG & Vector Retrieval", level: 92 },
  { name: "Local Inference (Ollama)", level: 90 },
  { name: "Python & FastAPI", level: 93 },
  { name: "Prompt Engineering", level: 88 },
  { name: "MLOps & Deployment", level: 85 },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#1a0a2f] to-[#0a0a0f]" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <h3 className="mb-6" style={{ fontSize: "2rem", fontWeight: 700, color: "#00d4ff" }}>
                AI Engineer
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I build AI systems that hold up under real workloads — retrieval
                pipelines, agentic loops, and inference infrastructure where
                correctness is the only metric that matters.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I tend to build local-first with Ollama and FAISS, then graduate
                to cloud infra when the use case demands it. My focus is on
                systems that self-correct instead of silently failing.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full">
                  <span className="text-[#00d4ff]" style={{ fontWeight: 600 }}>
                    Production AI Systems
                  </span>
                </div>
                <div className="px-4 py-2 bg-[#a855f7]/10 border border-[#a855f7]/30 rounded-full">
                  <span className="text-[#a855f7]" style={{ fontWeight: 600 }}>
                    Agentic Architectures
                  </span>
                </div>
                <div className="px-4 py-2 bg-[#ec4899]/10 border border-[#ec4899]/30 rounded-full">
                  <span className="text-[#ec4899]" style={{ fontWeight: 600 }}>
                    Local-First Inference
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-white" style={{ fontWeight: 600, fontSize: "1.125rem" }}>
                    {skill.name}
                  </span>
                  <span className="text-[#00d4ff]" style={{ fontWeight: 600 }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#a855f7] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}