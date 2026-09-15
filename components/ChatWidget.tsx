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
  const streamRef = useRef({ text: "", started: false });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    // Feature detection must run client-side after mount to avoid an SSR/hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      streamRef.current = { text: "", started: false };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        if (!streamRef.current.started) {
          streamRef.current.started = true;
          setLoading(false);
          setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
        }

        streamRef.current.text += chunk;
        const streamedText = streamRef.current.text;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: streamedText };
          return updated;
        });
      }

      const fullText = streamRef.current.text;
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
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] flex h-13 w-13 items-center justify-center rounded-full bg-accent text-accent-fg shadow-lg transition-transform hover:-translate-y-0.5"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Chat with an AI assistant trained on Dev's resume and projects"
            className="fixed bottom-24 right-6 z-[60] flex h-[min(520px,calc(100vh-10rem))] w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden border border-border bg-surface shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-accent">
                <Sparkles className="h-4 w-4 text-accent-fg" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-fg">Ask about Dev</p>
                <p className="text-[11px] text-fg-faint">RAG-powered · trained on his resume</p>
              </div>
              {voiceSupported && (
                <button
                  type="button"
                  onClick={toggleVoiceOutput}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg"
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
                  className={`max-w-[85%] rounded-md px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user" ? "ml-auto bg-accent text-accent-fg" : "mr-auto bg-surface-hover text-fg"
                  }`}
                >
                  {m.content}
                </div>
              ))}

              {loading && (
                <div className="mr-auto flex max-w-[85%] items-center gap-2 rounded-md bg-surface-hover px-4 py-2.5 text-sm text-fg-muted">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Thinking...
                </div>
              )}

              {error && (
                <p className="text-center text-xs text-[var(--color-danger)]" role="alert">
                  {error}
                </p>
              )}

              {messages.length === 1 && (
                <div className="flex flex-col gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-md border border-border px-3 py-2 text-left text-xs text-fg-muted transition-colors hover:border-border-strong hover:bg-surface-hover"
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
                  className="flex items-center gap-2 rounded-full border border-[var(--color-danger)]/40 px-3 py-1.5 text-xs text-[var(--color-danger)] transition-colors hover:bg-[var(--color-danger)]/10"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-danger)]" />
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
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Ask a question
              </label>
              <input
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask a question..."}
                disabled={isListening}
                className="flex-1 rounded-md border border-border bg-transparent px-4 py-2.5 text-sm text-fg placeholder-fg-faint outline-none transition-colors focus:border-accent disabled:opacity-60"
              />
              {voiceSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={loading}
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border transition-colors disabled:opacity-40 ${
                    isListening
                      ? "border-[var(--color-danger)] bg-[var(--color-danger)]/10"
                      : "border-border hover:bg-surface-hover"
                  }`}
                  aria-label={isListening ? "Stop listening" : "Ask with your voice"}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 animate-pulse text-[var(--color-danger)]" />
                  ) : (
                    <Mic className="w-4 h-4 text-fg-muted" />
                  )}
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-accent text-accent-fg transition-opacity disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
