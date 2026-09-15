"use client";

import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/#work"
      className="group mono-label inline-flex items-center gap-2 transition-colors duration-200 hover:text-accent"
    >
      <span className="transition-transform duration-200 group-hover:-translate-x-1">
        ←
      </span>
      Back
    </Link>
  );
}
