import React from "react";
import {
  File,
  Clock,
  CheckCircle,
  AlertTriangle,
  BadgeDollarSign,
} from "lucide-react";
import { StatCard } from "../../components/resuables/StatsCard";
import { RecentReports } from "../../components/resuables/TableComponents";
import { Announcements } from "../../components/resuables/AnnoucmentSection";
import Image from "next/image";
import statsOne from "../../../../../public/researcherIcon/reStatsOne.svg";
import statsTwo from "../../../../../public/researcherIcon/reSttatsTwo.svg";
import statsThree from "../../../../../public/researcherIcon/reStatsThree.svg";
import statsFour from "../../../../../public/researcherIcon/reStatsFour.svg";
import statsFive from "../../../../../public/researcherIcon/reStatsFive.svg";
import hourglass from "../../../../../public/researcherIcon/hourGlass.svg";
import calendar from "../../../../../public/researcherIcon/calendarImg.svg";

const Overview = () => {
  // Data for stat cards
  const statCardsData = [
    {
      icon: <Image src={statsOne} alt={"icon"} height={30} width={30} />,
      value: "15",
      label: "Total Reports Submitted",
    },
    {
      icon: <Image src={statsTwo} alt={"icon"} height={30} width={30} />,
      value: "15",
      label: "Pending Reviews",
    },
    {
      icon: <Image src={statsThree} alt={"icon"} height={30} width={30} />,
      value: "8",
      label: "Approved Reports",
    },
    {
      icon: <Image src={statsFour} alt={"icon"} height={30} width={30} />,
      value: "1",
      label: "Disputed Reports",
    },
    {
      icon: <Image src={statsFive} alt={"icon"} height={30} width={30} />,
      value: "$1,525.11",
      label: "Total Earnings",
    },
  ];

  // Data for recent reports table
  const reportsData = [
    {
      id: "#24084",
      projectName: "InheritX",
      primaryLanguage: "Cairo",
      severity: "Critical",
      status: "Approved",
      actionLink: "/dashboard/validator/reports",
    },
    {
      id: "#24084",
      projectName: "InheritX",
      primaryLanguage: "Cairo",
      severity: "Critical",
      status: "Rejected",
      actionLink: "/dashboard/validator/reports",
    },
    {
      id: "#24084",
      projectName: "InheritX",
      primaryLanguage: "Cairo",
      severity: "High",
      status: "Approved",
      actionLink: "/dashboard/validator/reports",
    },
    {
      id: "#24084",
      projectName: "InheritX",
      primaryLanguage: "Cairo",
      severity: "Critical",
      status: "Pending",
      actionLink: "/dashboard/validator/reports",
    },
  ];

  // Data for announcements section
  const announcementsData = [
    {
      type: "rejected",
      title: "[Rejected Report]",
      description:
        "The vulnerability report for Project name... that you submitted have been rejected",
      actionLink: "/view-report/1",
      authorIcon: <Image src={hourglass} alt={"icon"} height={20} width={20} />,
      timeAgo: "2 mins ago",
    },
    {
      type: "bounty",
      title: "[Bounty Paid Out]",
      description:
        "Project name... has been approved and your bounty has been paid",
      actionLink: "/view-bounty/1",
      authorIcon: <Image src={calendar} alt={"icon"} height={20} width={20} />,
      timeAgo: "1 hour ago",
    },
    {
      type: "new",
      title: "[New Project]",
      description:
        "A new project have been created, take a look and check out vulnerabilities",
      actionLink: "/view-project/1",
      authorIcon: <Image src={hourglass} alt={"icon"} height={20} width={20} />,
      timeAgo: "30 mins ago",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCardsData.map((card, index) => (
          <StatCard
            key={index}
            icon={card.icon}
            value={card.value}
            label={card.label}
          />
        ))}
      </div>

      {/* Recent Reports Section */}
      <div className="mt-6">
        <RecentReports reports={reportsData} viewAllLink="/reports" />
      </div>

      {/* Announcements Section */}
      <div className="mt-6">
        <Announcements
          announcements={announcementsData}
          viewAllLink="/announcements"
        />
      </div>
    </div>
  );
};

export default Overview;
