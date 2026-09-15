"use client";

import { ArrowUp } from "lucide-react";

const links = [
  { name: "Work", href: "#work" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-border py-12">
      <div className="container-wide flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-sm font-medium text-fg">
            Dev Patel<span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-fg-faint">AI Engineer — multi-agent systems &amp; retrieval</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:gap-2">
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <p className="text-xs text-fg-faint">© {new Date().getFullYear()} Dev Patel</p>
        </div>
      </div>
    </footer>
  );
}
