"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MetricConfig {
  label: string;
  unit: string;
  min: number;
  max: number;
  decimals?: number;
  color: string;
}

const METRICS: MetricConfig[] = [
  { label: "Requests / sec", unit: "", min: 110, max: 185, color: "#00d4ff" },
  { label: "P95 Latency", unit: "ms", min: 180, max: 340, color: "#a855f7" },
  { label: "Retrieval Accuracy", unit: "%", min: 91, max: 97.5, decimals: 1, color: "#4ade80" },
];

const WINDOW = 10;

function randomWalk(prev: number, min: number, max: number) {
  const range = max - min;
  const delta = (Math.random() - 0.5) * range * 0.25;
  return Math.min(max, Math.max(min, prev + delta));
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 26 - ((v - min) / span) * 22;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 30" className="w-full h-7" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 3px ${color}90)` }}
      />
    </svg>
  );
}

export function LiveMetricsPanel() {
  const [histories, setHistories] = useState<number[][]>(() =>
    METRICS.map((m) => Array.from({ length: WINDOW }, () => (m.min + m.max) / 2))
  );
  const [queriesToday, setQueriesToday] = useState(18420);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistories((prev) =>
        prev.map((hist, i) => {
          const m = METRICS[i];
          const next = randomWalk(hist[hist.length - 1], m.min, m.max);
          return [...hist.slice(1), next];
        })
      );
      setQueriesToday((q) => q + Math.floor(Math.random() * 4) + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full max-w-sm mx-auto rounded-3xl p-6 backdrop-blur-xl border border-white/10"
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ade80]" />
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-[#4ade80]">
          Live
        </span>
      </div>
      <p className="text-gray-400 text-xs mb-5">RAG pipeline — production metrics</p>

      <div className="space-y-5">
        {METRICS.map((m, i) => {
          const value = histories[i][histories[i].length - 1];
          return (
            <div key={m.label}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-gray-400 text-xs">{m.label}</span>
                <motion.span
                  key={Math.round(value * 10)}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  className="text-white font-mono text-sm font-semibold"
                >
                  {value.toFixed(m.decimals ?? 0)}
                  {m.unit}
                </motion.span>
              </div>
              <Sparkline values={histories[i]} color={m.color} />
            </div>
          );
        })}

        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-gray-400 text-xs">Queries today</span>
          <span className="text-white font-mono text-sm font-semibold">
            {queriesToday.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
