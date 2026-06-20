"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Brain, Cpu, MessageSquare, Database, Cloud, Settings, Server, Terminal } from "lucide-react";

const categories = [
  {
    icon: Code2,
    title: "Programming",
    color: "#00d4ff",
    items: ["Python", "SQL"],
  },
  {
    icon: Brain,
    title: "Machine Learning",
    color: "#a855f7",
    items: ["Scikit-learn", "XGBoost", "Pandas", "NumPy"],
  },
  {
    icon: Cpu,
    title: "Deep Learning",
    color: "#ec4899",
    items: ["PyTorch", "TensorFlow"],
  },
  {
    icon: MessageSquare,
    title: "NLP / LLM",
    color: "#00d4ff",
    items: ["Hugging Face", "OpenAI API", "LangChain", "Prompt Engineering", "RAG", "Semantic Search"],
  },
  {
    icon: Settings,
    title: "Data Engineering",
    color: "#a855f7",
    items: ["ETL Pipelines", "Data Workflows", "Feature Engineering"],
  },
  {
    icon: Database,
    title: "Databases",
    color: "#ec4899",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    icon: Database,
    title: "Vector DB",
    color: "#00d4ff",
    items: ["FAISS", "Pinecone"],
  },
  {
    icon: Cloud,
    title: "Cloud",
    color: "#a855f7",
    items: ["AWS S3", "AWS EC2", "AWS SageMaker", "Azure ML"],
  },
  {
    icon: Server,
    title: "MLOps",
    color: "#ec4899",
    items: ["MLflow", "CI/CD", "Docker"],
  },
  {
    icon: Server,
    title: "Deployment",
    color: "#00d4ff",
    items: ["FastAPI", "REST APIs", "Model Deployment", "Inference Pipelines"],
  },
  {
    icon: Terminal,
    title: "Other",
    color: "#a855f7",
    items: ["Git", "GitHub Actions", "Linux", "Spark"],
  },
];

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech-stack" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a1f] to-[#0a0a0f]" />

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
            Tech Stack
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] mx-auto mb-6" />
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Tools and platforms I use across the ML lifecycle — from data to deployment
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl backdrop-blur-xl border border-white/10 transition-all"
                style={{ background: "rgba(255, 255, 255, 0.05)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${category.color}15`,
                      border: `1px solid ${category.color}40`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: category.color }} />
                  </div>
                  <h3 className="text-white" style={{ fontSize: "1.05rem", fontWeight: 700 }}>
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs text-gray-300 border border-white/10"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
