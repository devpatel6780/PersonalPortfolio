"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What are you currently working on?",
  "What's your strongest project?",
  "What's your tech stack?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hey, I'm Dev! Well — an AI version of me, trained on my resume and projects. Ask me anything about my experience, skills, or work.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setError(null);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: nextMessages.slice(-6) }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Couldn't reach the assistant — try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #00d4ff, #a855f7)",
          boxShadow: "0 0 30px rgba(0,212,255,0.4)",
        }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[60] w-[min(380px,calc(100vw-3rem))] h-[min(520px,calc(100vh-10rem))] rounded-3xl border border-white/10 backdrop-blur-xl flex flex-col overflow-hidden"
            style={{ background: "rgba(10,10,15,0.95)" }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 border-b border-white/10"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #00d4ff, #a855f7)" }}
              >
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm" style={{ fontWeight: 700 }}>
                  Ask about Dev
                </p>
                <p className="text-[11px] text-gray-400">RAG-powered · trained on his resume</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user" ? "ml-auto" : "mr-auto"
                  }`}
                  style={
                    m.role === "user"
                      ? { background: "linear-gradient(135deg, #00d4ff, #a855f7)", color: "white" }
                      : { background: "rgba(255,255,255,0.06)", color: "#e5e7eb" }
                  }
                >
                  {m.content}
                </div>
              ))}

              {loading && (
                <div
                  className="mr-auto max-w-[85%] rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#9ca3af" }}
                >
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Thinking...
                </div>
              )}

              {error && (
                <p className="text-xs text-center" style={{ color: "#f87171" }}>
                  {error}
                </p>
              )}

              {messages.length === 1 && (
                <div className="flex flex-col gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-left text-xs px-3 py-2 rounded-xl border border-white/10 text-gray-300 hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/5 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 p-3 border-t border-white/10"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/30 transition-all"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all"
                style={{ background: "linear-gradient(135deg, #00d4ff, #a855f7)" }}
                aria-label="Send"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
