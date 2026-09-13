"use client";

import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/#portfolio"
      className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-gray-500 transition-colors duration-200 hover:text-[#818cf8] dark:text-gray-400"
    >
      <span className="transition-transform duration-200 group-hover:-translate-x-1">
        ←
      </span>
      Back
    </Link>
  );
}
