"use client";

import { motion } from "framer-motion";

const nodes = [
  { id: "query", label: "Query", sub: "user input" },
  { id: "retriever", label: "Retriever", sub: "FAISS + MMR" },
  { id: "generator", label: "Generator", sub: "Ollama / llama3.2" },
  { id: "evaluator", label: "Evaluator", sub: "confidence score" },
];

export function LoopDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 rounded-2xl p-8"
      style={{
        backgroundColor: "#0f0f16",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <p
        className="mb-8 font-mono text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "#818cf8" }}
      >
        Self-Correction Loop
      </p>

      {/* Forward path: nodes in a row */}
      <div className="flex items-center gap-0 overflow-x-auto">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center">
            {/* Node */}
            <div
              className="flex shrink-0 flex-col items-center gap-1 rounded-xl px-5 py-3.5"
              style={{
                backgroundColor: "#13131a",
                border:
                  node.id === "evaluator"
                    ? "1px solid rgba(129,140,248,0.25)"
                    : "1px solid rgba(255,255,255,0.07)",
                minWidth: 120,
              }}
            >
              <span
                className="font-mono text-xs font-medium"
                style={{ color: "#e2e2e5" }}
              >
                {node.label}
              </span>
              <span
                className="font-mono text-[9px] tracking-wider"
                style={{ color: "#52525b" }}
              >
                {node.sub}
              </span>
            </div>

            {/* Arrow between nodes (not after last) */}
            {i < nodes.length - 1 && (
              <div className="flex items-center px-2">
                <div
                  className="h-px w-8 shrink-0"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                />
                <span
                  className="font-mono text-xs shrink-0"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  →
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Feedback loop arc */}
      <div className="relative mt-0 pl-0">
        {/* Vertical drop from Evaluator */}
        <div className="ml-auto mt-0 flex items-start justify-end pr-0">
          <div className="relative flex flex-col items-end gap-0" style={{ width: "100%" }}>
            {/* Horizontal line back + label */}
            <div className="mt-4 flex w-full items-center">
              {/* Re-query label in the middle */}
              <div className="flex-1 relative">
                <div
                  className="h-px w-full"
                  style={{ background: "rgba(129,140,248,0.2)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="rounded px-2 py-0.5 font-mono text-[9px] tracking-wider"
                    style={{
                      backgroundColor: "#0c0c0f",
                      color: "#818cf8",
                      border: "1px solid rgba(129,140,248,0.2)",
                    }}
                  >
                    re-query (low confidence)
                  </span>
                </div>
              </div>
              <span
                className="shrink-0 font-mono text-xs"
                style={{ color: "rgba(129,140,248,0.5)" }}
              >
                ↑
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div
        className="mt-8 flex flex-wrap gap-6 border-t pt-5"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <LegendItem color="#e2e2e5" label="Forward pass — always executes" />
        <LegendItem color="#818cf8" label="Feedback loop — triggers on low confidence" />
      </div>
    </motion.div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-px w-6"
        style={{ background: color, opacity: color === "#818cf8" ? 0.5 : 0.25 }}
      />
      <span className="font-mono text-[9px] tracking-wider" style={{ color: "#52525b" }}>
        {label}
      </span>
    </div>
  );
}
