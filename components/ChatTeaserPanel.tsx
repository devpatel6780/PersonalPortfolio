"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function ChatTeaserPanel() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat-widget"));
  };

  return (
    <div className="border border-border bg-surface p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
        </span>
        <span className="mono-label">Ask my AI assistant</span>
      </div>

      <div className="mb-5 space-y-2.5">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="ml-auto max-w-[85%] rounded-md bg-accent px-3.5 py-2 text-[13px] text-accent-fg"
        >
          What&apos;s your strongest project?
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mr-auto max-w-[92%] rounded-md bg-surface-hover px-3.5 py-2 text-[13px] leading-relaxed text-fg-muted"
        >
          CareerPilot — a multi-agent system with a truthfulness guard that
          catches fabricated resume claims before they ship...
        </motion.div>
      </div>

      <button
        onClick={openChat}
        className="group flex w-full items-center justify-between border border-border px-3.5 py-2.5 text-sm text-fg transition-colors hover:border-border-strong hover:bg-surface-hover"
      >
        <span>Try it</span>
        <ArrowUpRight className="h-4 w-4 text-fg-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}
