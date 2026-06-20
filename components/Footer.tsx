"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative py-12 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-[#0f0a1f]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -5 }}
          className="mx-auto mb-8 w-14 h-14 rounded-full flex items-center justify-center border-2 border-[#00d4ff] hover:bg-[#00d4ff]/20 transition-all"
        >
          <ArrowUp className="w-6 h-6 text-[#00d4ff]" />
        </motion.button>

        <div className="text-center space-y-6">
          <div>
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: 900,
                background: "linear-gradient(135deg, #00d4ff, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI/ENGINEER
            </h3>
            <p className="text-gray-400 mt-2">Building AI Systems That Think</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "About", href: "#about" },
              { name: "Services", href: "#services" },
              { name: "Portfolio", href: "#portfolio" },
              { name: "Experience", href: "#experience" },
              { name: "Education", href: "#education" },
              { name: "Tech Stack", href: "#tech-stack" },
              { name: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-[#00d4ff] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} AI Engineer. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <p className="flex items-center gap-1">
              Built with <Heart className="w-4 h-4 fill-[#ec4899] text-[#ec4899]" /> using Next.js &amp; Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}