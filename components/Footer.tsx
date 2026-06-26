"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative py-12 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-white to-[#f7f7fc]" />

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
              Dev Patel
            </h3>
            <p className="text-gray-500 mt-2">Building AI Systems That Think</p>
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
                className="text-gray-500 hover:text-[#00d4ff] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Dev Patel. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <p>Built using Next.js &amp; Framer Motion</p>
          </div>
        </div>
      </div>
    </footer>
  );
}