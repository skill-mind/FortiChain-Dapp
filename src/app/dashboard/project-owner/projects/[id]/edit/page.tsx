import { EditProject } from "../../components/edit-project";

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="flex min-h-screen">
      <EditProject id={params.id} />
    </main>
  );
}
