"use client";

import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/#work"
      className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200"
      style={{ color: "#52525b" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.color = "#818cf8")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.color = "#52525b")
      }
    >
      <span className="transition-transform duration-200 group-hover:-translate-x-1">
        ←
      </span>
      Back
    </Link>
  );
}
