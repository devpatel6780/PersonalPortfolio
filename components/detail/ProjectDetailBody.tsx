import type { Project } from "@/lib/projects";

export function ProjectDetailBody({ project }: { project: Project }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {project.results.map((result) => (
          <div key={result.label} className="border border-border px-3 py-4 text-center">
            <div className="tabular mb-1 text-base font-semibold text-accent md:text-lg">
              {result.value}
            </div>
            <div className="mono-label">{result.label}</div>
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
              <li key={h} className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted">
                <span className="mt-0.5 shrink-0 text-accent">·</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionLabel>Stack</SectionLabel>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="border border-border px-3 py-1.5 font-mono text-xs tracking-wide text-fg-muted">
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
  return <p className="mono-label">{children}</p>;
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div className="border border-border p-5 md:p-6">
      <SectionLabel>{label}</SectionLabel>
      <p className="mt-3 text-sm leading-loose text-fg-muted md:text-base">{body}</p>
    </div>
  );
}
