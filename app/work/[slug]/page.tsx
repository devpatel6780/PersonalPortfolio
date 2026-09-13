import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { DetailHero } from "@/components/detail/DetailHero";
import { BackLink } from "@/components/detail/BackLink";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Back nav */}
      <div className="mx-auto max-w-3xl px-6 pt-28">
        <BackLink />
      </div>

      <DetailHero project={project} />

      {/* Body */}
      <article className="mx-auto max-w-3xl px-6 pb-32">
        {/* Results */}
        <div className="grid grid-cols-3 gap-4">
          {project.results.map((result) => (
            <div
              key={result.label}
              className="rounded-2xl border border-black/10 px-4 py-5 text-center dark:border-white/10"
              style={{ background: "var(--glass-tint)" }}
            >
              <div className="mb-1 font-mono text-lg font-semibold text-[#818cf8] md:text-xl">
                {result.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {result.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-14">
          <Section label="The Problem" body={project.detail.problem} />
          <Section label="The Approach" body={project.detail.approach} />
          <Section label="Outcome" body={project.detail.outcome} />

          {/* Highlights */}
          <div>
            <SectionLabel>Highlights</SectionLabel>
            <ul className="mt-5 space-y-3">
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

          {/* Stack */}
          <div>
            <SectionLabel>Stack</SectionLabel>
            <div className="mt-5 flex flex-wrap gap-2">
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
      </article>
    </main>
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
    <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10 md:p-8" style={{ background: "var(--glass-tint-soft)" }}>
      <SectionLabel>{label}</SectionLabel>
      <p className="mt-4 text-base leading-loose text-gray-600 dark:text-gray-400">{body}</p>
    </div>
  );
}
