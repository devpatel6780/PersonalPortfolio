"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "4+ yrs", label: "Hands-on ML/AI experience" },
  { value: "6", label: "Real shipped AI projects" },
  { value: "M.S.", label: "Computer Science, UW–Milwaukee" },
  { value: "Remote", label: "Open to opportunities" },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f9f7fd] to-white dark:from-[#0a0a0f] dark:via-[#1a0a2f] dark:to-[#0a0a0f]" />

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
              className="relative p-8 rounded-3xl backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:shadow-none"
              style={{ background: "var(--glass-bg)" }}
            >
              <h3 className="mb-6" style={{ fontSize: "2rem", fontWeight: 700, color: "#00d4ff" }}>
                AI/ML Engineer
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                I build end-to-end machine learning and LLM-powered
                applications — RAG systems, semantic search, and scalable
                inference pipelines — with Python, PyTorch, Hugging Face,
                LangChain, and FastAPI.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                My background spans healthcare ML research, enterprise
                deployment, and hands-on LLM application work, with a
                consistent focus on MLOps, prompt engineering, and shipping
                AI systems that are actually production-ready.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full">
                  <span className="text-[#00d4ff]" style={{ fontWeight: 600 }}>
                    RAG &amp; Semantic Search
                  </span>
                </div>
                <div className="px-4 py-2 bg-[#a855f7]/10 border border-[#a855f7]/30 rounded-full">
                  <span className="text-[#a855f7]" style={{ fontWeight: 600 }}>
                    Agentic Systems
                  </span>
                </div>
                <div className="px-4 py-2 bg-[#ec4899]/10 border border-[#ec4899]/30 rounded-full">
                  <span className="text-[#ec4899]" style={{ fontWeight: 600 }}>
                    MLOps &amp; Deployment
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="rounded-2xl p-6 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-none"
                style={{ background: "var(--glass-bg)" }}
              >
                <div
                  className="mb-2"
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #00d4ff, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm leading-snug">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
