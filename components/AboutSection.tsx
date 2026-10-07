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
            className="section-title"
          >
            About
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="glass-panel premium-panel max-w-2xl space-y-6 p-8 text-lg leading-relaxed text-fg-muted md:p-10"
          >
            <p>
              I build machine learning systems from data preparation and model
              training through evaluation and inference. My core tools are Python
              and PyTorch, with an emphasis on reproducible experiments, scalable
              training pipelines, and clear measures of model quality.
            </p>
            <p>
              As a Graduate Research Assistant at UW-Milwaukee, I developed a
              dual-backbone CNN that achieved 90.63% accuracy on medical images,
              supported by GPU training, attention modules, and Grad-CAM analysis.
              My projects extend that engineering approach to multi-agent career
              assistance, LangGraph observability, retrieval evaluation, and
              voice-generated presentation videos.
            </p>
            <p className="text-fg">
              Based in Farmington Hills, Michigan, with an M.S. in Computer Science
              from the University of Wisconsin-Milwaukee. I&apos;m open to AI/ML
              engineering roles and collaborations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
