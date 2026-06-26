"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles, Mic, MicOff, Volume2, VolumeX } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface SpeechRecognitionResultLike {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionResultLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | undefined {
  return (
    (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition ??
    (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition
  );
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
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const lastInputWasVoiceRef = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    setVoiceSupported(Boolean(getSpeechRecognitionCtor() && "speechSynthesis" in window));
    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    const handleOpenRequest = () => setOpen(true);
    window.addEventListener("open-chat-widget", handleOpenRequest);
    return () => window.removeEventListener("open-chat-widget", handleOpenRequest);
  }, []);

  const speak = (text: string, onEnd?: () => void) => {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.02;
    if (onEnd) utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoiceOutput = () => {
    setVoiceEnabled((enabled) => {
      if (enabled) window.speechSynthesis?.cancel();
      return !enabled;
    });
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognitionCtor = getSpeechRecognitionCtor();
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) sendMessage(transcript, true);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const sendMessage = async (text: string, viaVoice = false) => {
    if (!text.trim() || loading) return;
    lastInputWasVoiceRef.current = viaVoice;
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

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }

      if (!res.body) {
        setError("Couldn't reach the assistant — try again in a moment.");
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let started = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        if (!started) {
          started = true;
          setLoading(false);
          setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
        }

        fullText += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: fullText };
          return updated;
        });
      }

      if (fullText) {
        const withFollowUp = `${fullText}\n\nDo you have any further questions?`;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: withFollowUp };
          return updated;
        });
        speak(withFollowUp, () => {
          if (lastInputWasVoiceRef.current) toggleListening();
        });
      }
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
          boxShadow: "0 8px 30px rgba(0,212,255,0.35)",
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
            className="fixed bottom-24 right-6 z-[60] w-[min(380px,calc(100vw-3rem))] h-[min(520px,calc(100vh-10rem))] rounded-3xl border border-black/10 backdrop-blur-xl flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            style={{ background: "rgba(255,255,255,0.97)" }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 border-b border-black/10"
              style={{ background: "rgba(10,10,15,0.02)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #00d4ff, #a855f7)" }}
              >
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>
                  Ask about Dev
                </p>
                <p className="text-[11px] text-gray-500">RAG-powered · trained on his resume</p>
              </div>
              {voiceSupported && (
                <button
                  type="button"
                  onClick={toggleVoiceOutput}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-black/5 transition-all flex-shrink-0"
                  aria-label={voiceEnabled ? "Mute voice replies" : "Unmute voice replies"}
                  title={voiceEnabled ? "Voice replies on" : "Voice replies off"}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              )}
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
                      : { background: "rgba(10,10,15,0.04)", color: "#1f2937" }
                  }
                >
                  {m.content}
                </div>
              ))}

              {loading && (
                <div
                  className="mr-auto max-w-[85%] rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2"
                  style={{ background: "rgba(10,10,15,0.04)", color: "#6b7280" }}
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
                      className="text-left text-xs px-3 py-2 rounded-xl border border-black/10 text-gray-600 hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/5 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isListening && (
              <div className="flex justify-center pb-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-red-400/40 text-red-500 hover:bg-red-400/10 transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  Done talking
                </button>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 p-3 border-t border-black/10"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask a question..."}
                disabled={isListening}
                className="flex-1 px-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/10 text-gray-900 text-sm placeholder-gray-400 focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/30 transition-all disabled:opacity-60"
              />
              {voiceSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={loading}
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all border"
                  style={
                    isListening
                      ? { background: "rgba(239,68,68,0.15)", borderColor: "#ef4444" }
                      : { background: "rgba(10,10,15,0.03)", borderColor: "rgba(10,10,15,0.1)" }
                  }
                  aria-label={isListening ? "Stop listening" : "Ask with your voice"}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 text-red-400 animate-pulse" />
                  ) : (
                    <Mic className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              )}
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
