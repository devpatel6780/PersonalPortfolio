"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ChatTeaserPanel } from "./ChatTeaserPanel";

const ease = [0.16, 1, 0.3, 1] as const;

const readout = [
  { value: "6", label: "Shipped & research projects" },
  { value: "0.95", label: "Hit@5 on a hand-labeled eval set" },
  { value: "M.S.", label: "Computer Science, UW-Milwaukee" },
  { value: "Michigan", label: "Based in Farmington Hills" },
];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[min(920px,100svh)] w-full overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <Image
        src="/hero-systems.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-art pointer-events-none select-none object-cover object-center"
      />
      <div
        aria-hidden
        className="hero-overlay pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
      />

      <div className="container-wide relative z-10">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start xl:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mono-label mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3 py-2 text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-live)]" />
              AI/ML Engineer / Deep learning & ML systems
            </motion.p>

            <h1 className="max-w-4xl text-[clamp(2.65rem,6vw,5.35rem)] font-semibold leading-[1.02] tracking-normal text-fg">
              {["Production AI systems", "with measurable proof."].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.09 }}
                    className="block"
                  >
                    {i === 1 ? (
                      <>
                        with measurable{" "}
                        <span
                          className="bg-clip-text text-transparent"
                          style={{
                            backgroundImage: "linear-gradient(120deg, var(--color-accent), var(--color-accent-2))",
                          }}
                        >
                          proof.
                        </span>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted"
            >
              I&apos;m Dev Patel, an AI/ML engineer building deep learning workflows
              and production ML systems with Python and PyTorch. My work spans
              medical image classification, multi-agent applications, and RAG
              pipelines, with reproducible experiments and measurable results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#work" className="btn btn-primary group">
                View selected work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-12 grid gap-3 text-sm text-fg-muted sm:grid-cols-3"
            >
              {["Eval-first development", "Production API delivery", "Clear technical writing"].map((item) => (
                <span key={item} className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  {item}
                </span>
              ))}
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
          className="glass-panel premium-panel mt-20 grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0"
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
