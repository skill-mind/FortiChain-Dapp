import StatCard from "@/app/dashboard/components/resuables/StatCard";
import { CircleDollarSign, FileText, FolderOpen } from "lucide-react";

const dummy_stats = [
  {
    label: "Total Projects",
    value: "24",
    icon: <FolderOpen />,
    badgeText: "+12% from last month",
  },
  {
    label: "Active Validators",
    value: "18,429",
    icon: <FileText />,
    badgeText: "+8% from last month",
  },
  {
    label: "Active Researchers",
    value: "247",
    icon: <CircleDollarSign />,
    badgeText: "+5.4% from yesterday",
  },
  {
    label: "Total Revenue",
    value: "$700K",
    icon: <CircleDollarSign />,
    badgeText: "+0.2% this quarter",
  },
  {
    label: "Vulnerabilities Found",
    value: "24",
    icon: <FolderOpen />,
    badgeText: "+12% from last month",
  },
  {
    label: "Avg Completion Time",
    value: "24",
    icon: <FolderOpen />,
    badgeText: "+12% from last month",
  },
];

function AdminOverviewStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {dummy_stats.map((stat, id) => (
        <StatCard
          key={id}
          stat={stat}
          badgeStyle="bg-[#153710] text-[#1BC100]"
        />
      ))}
    </div>
  );
}

export default AdminOverviewStats;
