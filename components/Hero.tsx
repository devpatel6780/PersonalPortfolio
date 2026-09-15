"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ChatTeaserPanel } from "./ChatTeaserPanel";
import { MagneticButton } from "./ui/MagneticButton";

const ease = [0.16, 1, 0.3, 1] as const;

const readout = [
  { value: "6", label: "Shipped & research projects" },
  { value: "0.95", label: "Hit@5 on a hand-labeled eval set" },
  { value: "M.S.", label: "Computer Science, UW–Milwaukee" },
  { value: "Remote", label: "Open to opportunities" },
];

const pipeline = ["Ingest", "Retrieve", "Score", "Generate", "Evaluate"];

export function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="container-wide">
        <div className="grid gap-12 xl:grid-cols-[1fr_320px] xl:items-start xl:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mono-label mb-7 flex items-center gap-2.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
              </span>
              AI Engineer — Multi-agent systems &amp; retrieval
            </motion.p>

            <h1 className="max-w-4xl text-[clamp(2.6rem,6vw,5.25rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-fg">
              {["I build AI systems", "that show their work."].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.09 }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
              className="mt-7 max-w-lg text-lg leading-relaxed text-fg-muted"
            >
              Multi-agent architectures, retrieval pipelines, and inference infrastructure —
              graded against golden sets and documented failure modes, not eyeballed.
              Currently building healthcare RAG at Tempus AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <a href="#work" className="btn btn-primary group">
                  View selected work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </MagneticButton>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-14 overflow-x-auto"
            >
              <div className="flex min-w-max items-center">
                {pipeline.map((stage, i) => (
                  <div key={stage} className="flex items-center">
                    <div className="flex flex-col items-center gap-2.5">
                      <span className="relative flex h-2 w-2 items-center justify-center">
                        {i === pipeline.length - 1 && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                        )}
                        <span
                          className={`relative inline-flex h-2 w-2 rounded-full ${
                            i === pipeline.length - 1 ? "bg-accent" : "bg-fg-faint"
                          }`}
                        />
                      </span>
                      <span className="mono-label whitespace-nowrap">{stage}</span>
                    </div>
                    {i < pipeline.length - 1 && <span className="mx-3 h-px w-10 bg-border sm:w-16" />}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            className="hidden xl:block"
          >
            <ChatTeaserPanel />
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 divide-x divide-y divide-border border border-border sm:grid-cols-4 sm:divide-y-0"
        >
          {readout.map((item) => (
            <div key={item.label} className="px-5 py-5">
              <dt className="mono-label mb-2">{item.label}</dt>
              <dd className="tabular text-2xl font-semibold text-fg">{item.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
