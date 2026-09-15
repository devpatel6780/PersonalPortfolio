"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const capabilities = [
  {
    title: "Retrieval & search",
    description:
      "RAG pipelines and hybrid search over FAISS, Pinecone, and Chroma — evaluated with Hit@k and MRR against a golden set, not eyeballed.",
  },
  {
    title: "Agent architectures",
    description:
      "LangGraph state machines and multi-step agent loops that plan, act, and retry — each subgraph independently testable.",
  },
  {
    title: "Inference infrastructure",
    description:
      "FastAPI services, streaming endpoints, and Docker deployments, with local inference via Ollama when data can't leave the device.",
  },
  {
    title: "Evaluation & MLOps",
    description:
      "Golden-set harnesses, groundedness scoring, and regression tests that catch failure modes before they reach production.",
  },
];

const toolkit: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Python", "SQL", "TypeScript"] },
  { category: "LLM / NLP", items: ["LangChain", "LangGraph", "Hugging Face", "Prompt Engineering", "RAG"] },
  { category: "ML / DL", items: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost"] },
  { category: "Vector & data stores", items: ["FAISS", "Pinecone", "ChromaDB", "PostgreSQL", "MongoDB"] },
  { category: "Serving", items: ["FastAPI", "REST", "SSE", "Docker"] },
  { category: "Cloud & MLOps", items: ["AWS SageMaker", "AWS EC2/S3", "Azure ML", "MLflow", "CI/CD"] },
];

export function Capabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="capabilities" className="relative border-t border-border py-28 md:py-36" ref={ref}>
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-16 max-w-xl text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg"
        >
          What I build, and what it&apos;s built with
        </motion.h2>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-10">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: index * 0.08 }}
                className="flex gap-5 border-t border-border pt-5"
              >
                <span className="mono-label pt-0.5">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-fg">{cap.title}</h3>
                  <p className="max-w-md text-[15px] leading-relaxed text-fg-muted">{cap.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
          >
            <p className="mono-label mb-6">Toolkit</p>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {toolkit.map((group) => (
                <div key={group.category}>
                  <dt className="mb-2 text-sm font-medium text-fg">{group.category}</dt>
                  <dd className="text-[14px] leading-relaxed text-fg-muted">
                    {group.items.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
