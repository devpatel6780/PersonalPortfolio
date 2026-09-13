import type { Project } from "@/lib/projects";

export function ProjectDetailBody({ project }: { project: Project }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {project.results.map((result) => (
          <div
            key={result.label}
            className="rounded-2xl border border-black/10 px-3 py-4 text-center dark:border-white/10"
            style={{ background: "var(--glass-tint)" }}
          >
            <div className="mb-1 font-mono text-base font-semibold text-[#818cf8] md:text-lg">
              {result.value}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {result.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8">
        <Section label="The Problem" body={project.detail.problem} />
        <Section label="The Approach" body={project.detail.approach} />
        <Section label="Outcome" body={project.detail.outcome} />

        <div>
          <SectionLabel>Highlights</SectionLabel>
          <ul className="mt-4 space-y-2.5">
            {project.detail.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
              >
                <span className="mt-0.5 shrink-0 text-[#818cf8]">·</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionLabel>Stack</SectionLabel>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border px-3 py-1.5 font-mono text-xs tracking-wider"
                style={{
                  backgroundColor: "rgba(129,140,248,0.08)",
                  color: "#818cf8",
                  borderColor: "rgba(129,140,248,0.15)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#818cf8]">
      {children}
    </p>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div
      className="rounded-2xl border border-black/10 p-5 dark:border-white/10 md:p-6"
      style={{ background: "var(--glass-tint-soft)" }}
    >
      <SectionLabel>{label}</SectionLabel>
      <p className="mt-3 text-sm leading-loose text-gray-600 dark:text-gray-400 md:text-base">{body}</p>
    </div>
  );
}
