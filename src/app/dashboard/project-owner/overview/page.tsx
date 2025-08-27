import StatCard from "@/app/dashboard/components/resuables/StatCard";
import { CircleDollarSign, FileText, FolderOpen } from "lucide-react";
import ReportHistory from "./components/ReportHistory";

const dummy_stats = [
  {
    label: "Total Allocated Bounty",
    value: "12",
    icon: <FolderOpen />,
    progression: "+2 this month",
  },
  {
    label: "In Progress Audit",
    value: "1",
    icon: <FileText />,
    progression: "Requires attention",
  },
  {
    label: "Completed Audit",
    value: "2",
    icon: <CircleDollarSign />,
    progression: "Closed",
  },
  {
    label: "Active Researchers",
    value: "2",
    icon: <CircleDollarSign />,
    progression: "+1 this month",
  },
];
function page() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {dummy_stats.map((stat, id) => (
          <StatCard stat={stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
        <ReportHistory />
        <div className="p-6 bg-[#101011] rounded-lg">
          <h3>Note:</h3>
          <p className="text-[#6C6C6C] mb-6">Quick tips to get you started.</p>

          <ul className="flex flex-col gap-y-2 list-disc ml-3 text-sm leading-6">
            <li>Please fund the audit with USDC on Starknet chain.</li>
            <li>
              Security researchers and validators can proceed with the audit
              once there's an adequate bounty amount.
            </li>
            <li>
              It would be helpful to set a reasonable timeframe for the audit.
            </li>
            <li>
              After the audit is completed, reports will be shared to guide the
              developers of the audited project in making any necessary changes.
            </li>
            <li>You can download the audit certificate on successful audit</li>
            <li>Make your audit smart contract github repo public</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
