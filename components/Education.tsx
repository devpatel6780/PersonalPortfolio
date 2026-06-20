"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#1a0a2f] to-[#0a0a0f]" />

      <div className="relative z-10 max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ scale: 1.01 }}
          className="flex flex-col sm:flex-row items-start gap-6 p-8 rounded-3xl backdrop-blur-xl border border-white/10"
          style={{ background: "rgba(255, 255, 255, 0.05)" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #00d4ff20, #a855f710)",
              border: "2px solid rgba(0,212,255,0.3)",
            }}
          >
            <GraduationCap className="w-8 h-8 text-[#00d4ff]" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                Master of Science in Computer Science
              </h3>
              <span className="text-[#00d4ff]" style={{ fontWeight: 600 }}>
                May 2026
              </span>
            </div>
            <p className="text-[#a855f7] mb-4" style={{ fontWeight: 600 }}>
              University of Wisconsin–Milwaukee, Milwaukee, WI
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30">
              <span className="text-[#00d4ff]" style={{ fontWeight: 600 }}>
                GPA: 3.38 / 4.00
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
