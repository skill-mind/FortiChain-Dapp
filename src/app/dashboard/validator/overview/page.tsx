import React from "react";
// import Link from "next/link";
import { ActionButton } from "../../components/resuables/ActionButton";
import { StatCard } from "../../components/resuables/StatsCard";
import {
  RecentReports,
  ValidatorRanking,
} from "../../components/resuables/TableComponents";
import { RecentActivity } from "../../components/resuables/RecentActivity";
import Image from "next/image";
import walletIcon from "../../../../../public/validatorIcons/valAction.svg";
import imgOne from "../../../../../public/validatorIcons/valImgOne.svg";
import imgTwo from "../../../../../public/validatorIcons/valImgTwo.svg";
import imgThree from "../../../../../public/validatorIcons/valImgThree.svg";
import imgFour from "../../../../../public/validatorIcons/valImgFour.svg";

const Overview = () => {
  // Sample data for validator ranking
  const validatorData = [
    {
      rank: 1,
      validator: "0x1234...abcd",
      reportsValidated: 8,
      totalRewards: "$24,123.11",
    },
    {
      rank: 2,
      validator: "Daniel Ocheje",
      reportsValidated: 8,
      totalRewards: "$18,205.15",
    },
    {
      rank: 3,
      validator: "Aisha Murtala",
      reportsValidated: 7,
      totalRewards: "$16,355.11",
    },
    {
      rank: 4,
      validator: "Favour Stephen",
      reportsValidated: 7,
      totalRewards: "$12,804.78",
    },
  ];

  // Sample data for recent reports
  const reportsData = [
    {
      id: "#24084",
      projectName: "inheritX",
      primaryLanguage: "Cairo",
      severity: "Critical",
      status: "Approved",
      actionLink: "/dashboard/validator/reports",
    },
    {
      id: "#24084",
      projectName: "inheritX",
      primaryLanguage: "Cairo",
      severity: "Completed",
      status: "Rejected",
      actionLink: "/dashboard/validator/reports",
    },
    {
      id: "#24084",
      projectName: "inheritX",
      primaryLanguage: "Cairo",
      severity: "High",
      status: "Approved",
      actionLink: "/dashboard/validator/reports",
    },
    {
      id: "#24084",
      projectName: "inheritX",
      primaryLanguage: "Cairo",
      severity: "Completed",
      status: "Pending",
      actionLink: "/dashboard/validator/reports",
    },
  ];

  // Recent activity data
  const recentActivities = [
    {
      id: 1,
      title: "Account Created",
      subtitle: "Your account was successfully created",
      timestamp: "Today 4:55pm",
    },
    {
      id: 2,
      title: "Vulnerability Report Added to Bookmarks",
      subtitle: "Vulnerability report saved to Bookmark",
      timestamp: "Today 4:55pm",
    },
    {
      id: 3,
      title: "Reward Claimed",
      subtitle: "Rewards from reports claimed",
      timestamp: "Yesterday",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Top Section with Action Button and Disconnect Wallet */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <ActionButton
          icon={
            <Image src={walletIcon} alt="Wallet Icon" height={20} width={20} />
          }
          title="Withdraw Available Funds"
          description="Transfer available funds to your wallet"
          href="/withdraw"
          iconBgColor="bg-[#0000FF]"
          id={""}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Image src={imgOne} alt={"icon"} height={30} width={30} />}
          value={15}
          label="Pending Reports"
        />
        <StatCard
          icon={<Image src={imgTwo} alt={"icon"} height={30} width={30} />}
          value={8}
          label="Approved Reports"
        />
        <StatCard
          icon={<Image src={imgThree} alt={"icon"} height={30} width={30} />}
          value={1}
          label="Disputed Reports"
        />
        <StatCard
          icon={<Image src={imgFour} alt={"icon"} height={30} width={30} />}
          value="$1,525.11"
          label="Total Earnings"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="mb-6">
        <RecentActivity events={recentActivities} />
      </div>

      {/* Table Components */}
      <ValidatorRanking
        validators={validatorData}
        userRank={1}
        viewAllLink="/dashboard/admin/reports"
      />

      <div className="mt-6">
        <RecentReports
          reports={reportsData}
          viewAllLink="/dashboard/admin/reports"
        />
      </div>
    </div>
  );
};

export default Overview;
