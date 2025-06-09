import React from "react";
import { ClipboardList, Shield, BarChart3, Wallet, Users } from "lucide-react";
import { ActionButton } from "../../components/resuables/ActionButton";
import { StatCard } from "../../components/resuables/StatsCard";
import { RecentActivity } from "../../components/resuables/RecentActivity";
import Image from "next/image";
import infoOne from "../../../../../public/overviewIcons/infoOne.svg";
import infoTwo from "../../../../../public/overviewIcons/infoTwo.svg";
import infoThree from "../../../../../public/overviewIcons/infoThree.svg";
import statsOne from "../../../../../public/overviewIcons/statsOne.svg";
import statsTwo from "../../../../../public/overviewIcons/statsTwo.svg";
import statsThree from "../../../../../public/overviewIcons/statsThree.svg";
import statsFour from "../../../../../public/overviewIcons/statsFour.svg";
import { ProjectOwnerActionButton } from "../../components/resuables/ProjectOwnerActionButton";

const Overview = () => {
  const actionButtons = [
    {
      id: 1,
      icon: <Image src={infoOne} alt={"icon"} height={20} width={20} />,
      title: "Register Project",
      description: "Submit your smart contract for security review",
      href: "/dashboard/project-owner/projects",
      iconBgColor: "bg-[#0000FF]",
    },
    {
      id: 2,
      icon: <Image src={infoTwo} alt={"icon"} height={20} width={20} />,
      title: "Fund Escrow",
      description: "Securely deposit bounty rewards",
      href: "/dashboard/project-owner/projects",
      iconBgColor: "bg-[#0000FF]",
    },
    {
      id: 3,
      icon: <Image src={infoThree} alt={"icon"} height={20} width={20} />,
      title: "View Reports",
      description: "Track vulnerability findings in real time",
      href: "/dashboard/project-owner/reports",
      iconBgColor: "bg-[#0000FF]",
    },
  ];

  const stats = [
    {
      id: 1,
      icon: <Image src={statsOne} alt={"icon"} height={30} width={30} />,
      value: 5,
      label: "Total Number of Projects",
    },
    {
      id: 2,
      icon: <Image src={statsTwo} alt={"icon"} height={30} width={30} />,
      value: 5,
      label: "Total Vulnerabilities Found",
    },
    {
      id: 3,
      icon: <Image src={statsThree} alt={"icon"} height={30} width={30} />,
      value: "$2,523.34",
      label: "Total Bounties Paid",
    },
    {
      id: 4,
      icon: <Image src={statsFour} alt={"icon"} height={30} width={30} />,
      value: 5,
      label: "Active Bounties",
    },
  ];
  const recentEvents = [
    {
      id: 1,
      title: "Project Registered",
      subtitle: "Your Project SkillNet has been submitted for security review",
      timestamp: "Today 4:15pm",
    },
    {
      id: 2,
      title: "Reported Vulnerabilities",
      subtitle: "Security reports have been submitted by researchers",
      timestamp: "Today 2:35pm",
    },
    {
      id: 3,
      title: "Reported Vulnerabilities",
      subtitle: "Security reports have been submitted by researchers",
      timestamp: "Yesterday",
    },
  ];

  return (
    <div>
      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {actionButtons.map((btn) => (
          <ProjectOwnerActionButton
            id={btn.id}
            key={btn.id}
            icon={btn.icon}
            title={btn.title}
            description={btn.description}
            href={btn.href}
            iconBgColor={btn.iconBgColor}
          />
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mb-6">
        <RecentActivity events={recentEvents} />
      </div>
    </div>
  );
};

export default Overview;
