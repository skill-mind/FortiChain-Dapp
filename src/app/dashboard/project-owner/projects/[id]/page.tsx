import { ProjectDetail } from "../components/project-detail";

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="flex min-h-screen">
      <ProjectDetail id={params.id} />
    </main>
  );
}
