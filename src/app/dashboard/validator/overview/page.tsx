import React from "react";
import OverviewCard from "./components/OverviewCard";
import { CircleDollarSignIcon, DollarSign, FolderOpen } from "lucide-react";
import ReportAlerts from "./components/ReportAlerts";
import AuditStats from "./components/AuditStats";
import PerformanceSnapshot from "./components/PerformanceSnapshot";

function page() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <OverviewCard
        stat={{
          label: "Reports Available",
          value: "17",
          progression: "+6 this month",
          icon: <FolderOpen />,
        }}
        children={<ReportAlerts />}
      />
      <OverviewCard
        stat={{
          label: "Audits Made",
          value: "5",
          progression: "+1 this month",
          icon: <FolderOpen />,
        }}
        children={<AuditStats />}
      />
      <OverviewCard
        stat={{
          label: "Token Earnings",
          value: "$7,847 USDC",
          progression: "Total rewards",
          icon: <CircleDollarSignIcon />,
        }}
        children={<PerformanceSnapshot />}
      />
    </div>
  );
}

export default page;
