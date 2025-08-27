import React from "react";
import { CircleDollarSignIcon, DollarSign, FolderOpen } from "lucide-react";
import OverviewCardExpandable from "../../components/resuables/OverviewCardExpandable";
import ReportsSubmitted from "./components/ReportsSubmitted";
import ReportsApproved from "./components/ReportsApproved";
import TokenEarnings from "./components/TokenEarnings";

function page() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <OverviewCardExpandable
        stat={{
          label: "Reports Submitted",
          value: "4",
          progression: "+2 this month",
          icon: <FolderOpen />,
        }}
        children={<ReportsSubmitted />}
      />
      <OverviewCardExpandable
        stat={{
          label: "Reports Approved",
          value: "3",
          progression: "Good",
          icon: <FolderOpen />,
        }}
        children={<ReportsApproved />}
      />
      <OverviewCardExpandable
        stat={{
          label: "Token Earnings",
          value: "$9,650 USDC",
          progression: "Total rewards",
          icon: <CircleDollarSignIcon />,
        }}
        children={<TokenEarnings />}
      />
    </div>
  );
}

export default page;
