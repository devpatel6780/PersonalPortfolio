"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP Engineering, DataFlow AI",
    avatar: "👩‍💻",
    rating: 5,
    text: "The RAG pipeline they built cut our hallucination rate dramatically. The self-correction loop was the missing piece we didn't know we needed — it just works, even on edge cases we hadn't tested.",
  },
  {
    name: "Marcus Webb",
    role: "CTO, Northstar Labs",
    avatar: "👨‍💼",
    rating: 5,
    text: "Migrating our agent orchestration to LangGraph under their guidance cut our token costs by nearly 40% while improving task success rate. Rare to find someone who understands both the ML and the infra side.",
  },
  {
    name: "Priya Raman",
    role: "Head of ML, Vertex Systems",
    avatar: "👩‍🔬",
    rating: 5,
    text: "Their eval harness caught regressions we would have shipped straight to production. Having that safety net changed how confidently our whole team ships prompt changes now.",
  },
  {
    name: "James Okafor",
    role: "Founder, Lighthouse AI",
    avatar: "👨‍🚀",
    rating: 5,
    text: "We needed local inference for compliance reasons and assumed we'd sacrifice quality. The local-first architecture they designed proved that wrong — same quality, zero data egress.",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => setCurrentIndex((p) => (p + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#1a0a2f] to-[#0a0a0f]" />

      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
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
            What People Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] mx-auto mb-6" />
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Feedback from teams I&apos;ve built AI systems with
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative p-12 rounded-3xl backdrop-blur-xl border border-white/10"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-24 h-24 text-[#00d4ff]" />
            </div>

            <div className="relative z-10">
              <div className="flex gap-1 mb-6 justify-center">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#00d4ff] text-[#00d4ff]" />
                ))}
              </div>

              <p className="text-gray-200 text-xl md:text-2xl text-center mb-8 leading-relaxed italic max-w-4xl mx-auto">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{ background: "linear-gradient(135deg, #00d4ff, #a855f7)" }}
                >
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="text-left">
                  <div className="text-white" style={{ fontWeight: 700, fontSize: "1.125rem" }}>
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-[#00d4ff]">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-2 border-[#00d4ff] flex items-center justify-center hover:bg-[#00d4ff]/20 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-[#00d4ff]" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all ${
                    index === currentIndex ? "w-8 h-3 bg-[#00d4ff]" : "w-3 h-3 bg-white/20 hover:bg-white/40"
                  } rounded-full`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-2 border-[#00d4ff] flex items-center justify-center hover:bg-[#00d4ff]/20 transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-[#00d4ff]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}