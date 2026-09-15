"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { RevealRule } from "@/components/ui/RevealRule";

const ease = [0.16, 1, 0.3, 1] as const;

const timeline = [
  {
    year: "Apr 2026 — Present",
    title: "AI Engineer Intern",
    company: "Tempus AI",
    description:
      "Building RAG-based semantic search and LLM inference pipelines for healthcare question-answering applications.",
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
    achievements: [
      "90.63% accuracy with EfficientNet-B3 & MobileNetV3",
      "Attention modules (P_scSE, ECA) + MixUp, ROI extraction",
      "Grad-CAM interpretability analysis for explainable AI",
    ],
  },
  {
    year: "Apr 2022 — Jul 2024",
    title: "Junior ML Engineer",
    company: "HCL Technologies",
    description:
      "Built end-to-end ML pipelines and deployment systems for business analytics applications.",
    achievements: [
      "5–10% model performance gains via feature engineering & tuning",
      "REST API deployment with Flask/FastAPI for real-time inference",
      "Docker + CI/CD automation for reproducible model training",
    ],
  },
  {
    year: "May 2026",
    title: "M.S. Computer Science",
    company: "University of Wisconsin–Milwaukee",
    description: "GPA 3.38 / 4.00.",
    achievements: [],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative border-t border-border py-28 md:py-36" ref={ref}>
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-16 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg"
        >
          Experience
        </motion.h2>

        <RevealRule />

        <div className="space-y-4 pt-8">
          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: index * 0.07 }}
              className="glass-panel relative grid gap-3 rounded-2xl p-6 md:grid-cols-[13rem_1fr] md:gap-8 md:p-8"
            >
              <p className="mono-label flex items-center gap-2 pt-1">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
                {item.year}
              </p>

              <div>
                <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
                  <span className="text-sm text-fg-faint">{item.company}</span>
                </div>
                <p className="mb-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">{item.description}</p>
                {item.achievements.length > 0 && (
                  <ul className="space-y-1.5">
                    {item.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start gap-2.5 text-sm text-fg-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-faint" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
