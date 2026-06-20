import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { DetailHero } from "@/components/detail/DetailHero";
import { LoopDiagram } from "@/components/detail/LoopDiagram";
import { BackLink } from "@/components/detail/BackLink";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0c0c0f" }}>
      {/* Back nav */}
      <div className="mx-auto max-w-3xl px-6 pt-28">
        <BackLink />
      </div>

      <DetailHero project={project} />

      {/* Body */}
      <article className="mx-auto max-w-3xl px-6 pb-32">
        {project.slug === "rag-pipeline" && <LoopDiagram />}

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
                  className="flex items-start gap-3 text-sm leading-relaxed"
                  style={{ color: "#52525b" }}
                >
                  <span
                    style={{ color: "#818cf8" }}
                    className="mt-0.5 shrink-0"
                  >
                    ·
                  </span>
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
                  className="rounded-md px-3 py-1.5 font-mono text-xs tracking-wider"
                  style={{
                    backgroundColor: "rgba(129,140,248,0.08)",
                    color: "#818cf8",
                    border: "1px solid rgba(129,140,248,0.15)",
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
    <p
      className="font-mono text-[10px] tracking-[0.22em] uppercase"
      style={{ color: "#818cf8" }}
    >
      {children}
    </p>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <p className="mt-5 text-base leading-loose" style={{ color: "#52525b" }}>
        {body}
      </p>
    </div>
  );
}
