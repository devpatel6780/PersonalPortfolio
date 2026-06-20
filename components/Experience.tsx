"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Award, Target } from "lucide-react";

const timeline = [
  {
    year: "Apr 2026 — Present",
    title: "AI Engineer Intern",
    company: "Tempus AI, United States",
    description:
      "Building RAG-based semantic search and LLM inference pipelines for healthcare question-answering applications.",
    icon: Briefcase,
    achievements: [
      "RAG semantic search workflows with FAISS & Pinecone embeddings",
      "FastAPI inference pipelines for LLM-powered Q&A",
      "AWS SageMaker deployment + MLflow experiment tracking",
    ],
  },
  {
    year: "Jul 2025 — Mar 2026",
    title: "Research Assistant",
    company: "University of Wisconsin–Milwaukee",
    description:
      "Researched deep learning models for medical image classification, with a focus on explainability and minority-class performance.",
    icon: Award,
    achievements: [
      "90.63% accuracy with EfficientNet-B3 & MobileNetV3",
      "Attention modules (P_scSE, ECA) + MixUp, ROI extraction",
      "Grad-CAM interpretability analysis for explainable AI",
    ],
  },
  {
    year: "Apr 2022 — Jul 2024",
    title: "Junior ML Engineer",
    company: "HCL Technologies, India",
    description:
      "Built end-to-end ML pipelines and deployment systems for business analytics applications.",
    icon: Target,
    achievements: [
      "5–10% model performance gains via feature engineering & tuning",
      "REST API deployment with Flask/FastAPI for real-time inference",
      "Docker + CI/CD automation for reproducible model training",
    ],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a1f] to-[#0a0a0f]" />

      <div className="relative z-10 max-w-5xl mx-auto" ref={ref}>
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
            Experience &amp; Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] mx-auto mb-6" />
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            A track record of shipping AI systems that hold up in production
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00d4ff] via-[#a855f7] to-[#ec4899]" />

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  <div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10"
                    style={{
                      background: "linear-gradient(135deg, #00d4ff, #a855f7)",
                      boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)",
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className={`ml-24 md:ml-0 md:w-5/12 ${isLeft ? "md:pr-16" : "md:pl-16"}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="p-6 rounded-2xl backdrop-blur-xl border border-white/10"
                      style={{ background: "rgba(255, 255, 255, 0.05)" }}
                    >
                      <div className="text-[#00d4ff] mb-2" style={{ fontWeight: 600 }}>
                        {item.year}
                      </div>
                      <h3 className="text-white mb-1" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                        {item.title}
                      </h3>
                      <div className="text-[#a855f7] mb-4" style={{ fontWeight: 600 }}>
                        {item.company}
                      </div>
                      <p className="text-gray-400 mb-4">{item.description}</p>
                      <ul className="space-y-2">
                        {item.achievements.map((achievement) => (
                          <li key={achievement} className="flex items-start gap-2">
                            <span className="text-[#00d4ff] mt-1">▸</span>
                            <span className="text-gray-300 text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}