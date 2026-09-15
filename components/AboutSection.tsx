"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative border-t border-border py-28 md:py-36" ref={ref}>
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg"
          >
            About
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="max-w-2xl space-y-6 text-lg leading-relaxed text-fg-muted"
          >
            <p>
              I&apos;m an AI/ML engineer who cares less about whether a system feels
              impressive in a demo and more about whether it can be measured, and
              whether it holds up once it&apos;s measured. That habit — an eval
              harness before a launch post — runs through every project I ship.
            </p>
            <p>
              My background spans healthcare ML research at UW–Milwaukee,
              enterprise deployment work at HCL Technologies, and hands-on LLM
              application engineering, now continuing at Tempus AI. Across all
              of it, the throughline is the same: retrieval and agent systems
              built with Python, PyTorch, LangChain, and FastAPI, shipped with
              enough MLOps discipline to trust in production.
            </p>
            <p className="text-fg">
              Based remotely, open to roles and collaborations where the bar
              for &quot;does this actually work&quot; is higher than the demo.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
