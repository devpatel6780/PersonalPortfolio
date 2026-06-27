"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ChatTeaserPanel } from "./ChatTeaserPanel";

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-[#f7f7fc] to-white dark:from-[#0a0a0f] dark:via-[#0f0a1f] dark:to-[#0a0a0f] py-32"
    >
      {/* Subtle ambient glow behind the diagram */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.14) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                background: "linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI Engineer
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: "clamp(1.35rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.3 }}
              className="text-gray-900 dark:text-white mb-4"
            >
              Building AI Systems That Think
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-xl mx-auto lg:mx-0"
            >
              I design retrieval pipelines, agent loops, and inference infrastructure with LangGraph, FAISS &amp; Ollama
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
            >
              <a
                href="#contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,212,255,0.6)]"
              >
                <span
                  className="relative z-10 flex items-center gap-2 text-white"
                  style={{ fontSize: "1.125rem", fontWeight: 600 }}
                >
                  Hire Me <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="#portfolio"
                className="group px-8 py-4 border-2 border-[#00d4ff] rounded-full hover:bg-[#00d4ff]/10 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
              >
                <span className="text-[#00d4ff]" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                  View My Work
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: live metrics panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="hidden lg:block"
          >
            <ChatTeaserPanel />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#00d4ff]/50 rounded-full flex justify-center pt-2 animate-scroll-hint">
          <div className="w-1 h-2 bg-[#00d4ff] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}