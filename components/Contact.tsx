"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;
type Status = "idle" | "sending" | "sent" | "error";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 20.45h3.56V9H3.56v11.45z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.74.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17v3.22c0 .3.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-fg placeholder-fg-faint outline-none backdrop-blur-md transition-all focus:border-accent focus:shadow-[0_0_0_1px_rgba(47,224,255,0.4),0_0_20px_-4px_rgba(47,224,255,0.5)]";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-28 md:py-36" ref={ref}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-accent-2-soft), transparent 70%)" }}
      />

      <div className="container-wide relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="glass-panel rounded-2xl p-8 md:p-10"
          >
            <h2 className="mb-6 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-fg">
              Have a system that needs building, fixing, or scaling?
            </h2>
            <p className="mb-10 max-w-md text-lg leading-relaxed text-fg-muted">
              I&apos;m open to remote roles and focused collaborations. The
              fastest way to reach me is directly — I read everything myself.
            </p>

            <div className="space-y-1">
              <a
                href="mailto:devp70431@gmail.com"
                className="group flex items-center justify-between border-t border-border py-4 text-fg transition-colors hover:text-accent"
              >
                <span>
                  <span className="mono-label mb-1 block">Email</span>
                  <span className="text-base">devp70431@gmail.com</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>

              <a
                href="https://www.linkedin.com/in/devrakeshpatel/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-t border-border py-4 text-fg transition-colors hover:text-accent"
              >
                <span className="flex items-center gap-3">
                  <LinkedinIcon className="h-4 w-4 text-fg-faint" />
                  <span className="text-base">LinkedIn</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>

              <a
                href="https://github.com/devpatel6780"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-y border-border py-4 text-fg transition-colors hover:text-accent"
              >
                <span className="flex items-center gap-3">
                  <GithubIcon className="h-4 w-4 text-fg-faint" />
                  <span className="text-base">GitHub</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="glass-panel space-y-5 rounded-2xl p-8 md:p-10"
          >
            <div>
              <label htmlFor="name" className="mono-label mb-2 block">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className={fieldClass}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mono-label mb-2 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className={fieldClass}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="mono-label mb-2 block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`${fieldClass} resize-none`}
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-primary w-full justify-center disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send message"}
              {status === "sending" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>

            <div aria-live="polite">
              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-[var(--color-success)]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Message sent — I&apos;ll get back to you soon.
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-[var(--color-danger)]"
                >
                  <AlertCircle className="h-4 w-4" />
                  Something went wrong — try emailing devp70431@gmail.com directly.
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
