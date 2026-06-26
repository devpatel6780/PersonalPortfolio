"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function ChatTeaserPanel() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat-widget"));
  };

  return (
    <div
      className="rounded-3xl border border-black/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
      style={{ background: "rgba(255,255,255,0.8)" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
        </span>
        <span className="text-xs text-gray-500" style={{ letterSpacing: "0.05em" }}>
          ONLINE — TALK TO MY AI ASSISTANT
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="ml-auto max-w-[80%] rounded-2xl px-4 py-2.5 text-sm text-white"
          style={{ background: "linear-gradient(135deg, #00d4ff, #a855f7)" }}
        >
          What's your strongest project?
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mr-auto max-w-[85%] rounded-2xl px-4 py-2.5 text-sm text-gray-700"
          style={{ background: "rgba(10,10,15,0.04)" }}
        >
          My self-correcting RAG pipeline — it grades its own retrievals and
          re-queries when confidence drops, cutting hallucinations 63%...
        </motion.div>
      </div>

      <button
        onClick={openChat}
        className="group w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#00d4ff]/30 hover:bg-[#00d4ff]/5 transition-all"
      >
        <Sparkles className="w-4 h-4 text-[#00d4ff]" />
        <span className="text-[#00d4ff] text-sm" style={{ fontWeight: 600 }}>
          Try asking me something
        </span>
        <ArrowRight className="w-4 h-4 text-[#00d4ff] group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
