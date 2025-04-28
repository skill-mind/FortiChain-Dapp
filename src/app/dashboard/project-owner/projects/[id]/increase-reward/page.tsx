import { IncreaseReward } from "../../components/increase-reword";

export default function IncreaseRewardPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="flex min-h-screen">
      <IncreaseReward id={params.id} />
    </main>
  );
}
