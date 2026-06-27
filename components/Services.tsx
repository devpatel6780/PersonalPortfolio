"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, GitBranch, Share2, Server, Globe, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "RAG Pipeline Design",
    description:
      "Retrieval-augmented systems with FAISS/Chroma vector stores, hybrid search, and self-correcting feedback loops.",
    color: "#00d4ff",
  },
  {
    icon: GitBranch,
    title: "Agent Architectures",
    description:
      "LangGraph state machines and multi-step agent loops that plan, act, evaluate, and retry — not just single-shot prompts.",
    color: "#a855f7",
  },
  {
    icon: Share2,
    title: "Local Inference",
    description:
      "Ollama, llama.cpp, and vLLM deployments that keep data on-prem without sacrificing latency or quality.",
    color: "#ec4899",
  },
  {
    icon: Server,
    title: "Inference Infrastructure",
    description:
      "FastAPI services, streaming endpoints, and Docker deployments built to handle real production traffic.",
    color: "#00d4ff",
  },
  {
    icon: Globe,
    title: "API & Integration",
    description:
      "Clean REST/SSE interfaces that make AI systems easy to integrate into existing product surfaces.",
    color: "#a855f7",
  },
  {
    icon: BarChart3,
    title: "Evaluation & MLOps",
    description:
      "Grounding metrics, hallucination tracking, and deployment pipelines that catch regressions before users do.",
    color: "#ec4899",
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f7f7fc] to-white dark:from-[#0a0a0f] dark:via-[#0f0a1f] dark:to-[#0a0a0f]" />

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
            Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto">
            End-to-end AI systems work — from retrieval design to production deployment
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 rounded-3xl backdrop-blur-xl border border-black/10 dark:border-white/10 transition-all cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:shadow-none"
                style={{ background: "var(--glass-bg)" }}
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${service.color}40, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                      border: `2px solid ${service.color}40`,
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: service.color }} />
                  </div>

                  <h3
                    className="mb-4 text-gray-900 dark:text-white group-hover:text-[#00d4ff] transition-colors"
                    style={{ fontSize: "1.5rem", fontWeight: 700 }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}