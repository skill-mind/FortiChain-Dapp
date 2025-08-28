import React from "react";
import { CircleDollarSignIcon, DollarSign, FolderOpen } from "lucide-react";
import OverviewCardExpandable from "../../components/resuables/OverviewCardExpandable";
import ReportsSubmitted from "./components/ReportsSubmitted";
import ReportsApproved from "./components/ReportsApproved";
import TokenEarnings from "./components/TokenEarnings";

function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <OverviewCardExpandable
        stat={{
          label: "Reports Submitted",
          value: "4",
          badgeText: "+2 this month",
          icon: <FolderOpen />,
        }}
        badgeStyle="text-[#1BC100] bg-[#153710]"
        children={<ReportsSubmitted />}
      />
      <OverviewCardExpandable
        stat={{
          label: "Reports Approved",
          value: "3",
          badgeText: "Good",
          icon: <FolderOpen />,
        }}
        badgeStyle="bg-[#10273E] text-[#0073E6]"
        children={<ReportsApproved />}
      />
      <OverviewCardExpandable
        stat={{
          label: "Token Earnings",
          value: "$9,650 USDC",
          badgeText: "Total rewards",
          icon: <CircleDollarSignIcon />,
        }}
        badgeStyle="bg-[#320D35] text-[#BB00C1]"
        children={<TokenEarnings />}
      />
    </div>
  );
}

export default page;
