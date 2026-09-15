import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/lib/projects";
import { DetailHero } from "@/components/detail/DetailHero";
import { BackLink } from "@/components/detail/BackLink";
import { ProjectDetailBody } from "@/components/detail/ProjectDetailBody";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-bg">
      {/* Back nav */}
      <div className="mx-auto max-w-3xl px-6 pt-28">
        <BackLink />
      </div>

      <DetailHero project={project} />

      {/* Body */}
      <article className="mx-auto max-w-3xl px-6 pb-32">
        <ProjectDetailBody project={project} />
      </article>
    </main>
  );
}
