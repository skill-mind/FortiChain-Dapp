import React from "react";
import { CircleDollarSignIcon, DollarSign, FolderOpen } from "lucide-react";
import ReportAlerts from "./components/ReportAlerts";
import AuditStats from "./components/AuditStats";
import PerformanceSnapshot from "./components/PerformanceSnapshot";
import OverviewCardExpandable from "../../components/resuables/OverviewCardExpandable";

function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <OverviewCardExpandable
        stat={{
          label: "Reports Available",
          value: "17",
          badgeText: "+6 this month",
          icon: <FolderOpen />,
        }}
        badgeStyle="text-[#1BC100] bg-[#153710]"
        children={<ReportAlerts />}
      />
      <OverviewCardExpandable
        stat={{
          label: "Audits Made",
          value: "5",
          badgeText: "+1 this month",
          icon: <FolderOpen />,
        }}
        badgeStyle="text-[#1BC100] bg-[#153710]"
        children={<AuditStats />}
      />
      <OverviewCardExpandable
        stat={{
          label: "Token Earnings",
          value: "$7,847 USDC",
          badgeText: "Total rewards",
          icon: <CircleDollarSignIcon />,
        }}
        badgeStyle="bg-[#320D35] text-[#BB00C1]"
        children={<PerformanceSnapshot />}
      />
    </div>
  );
}

export default page;
