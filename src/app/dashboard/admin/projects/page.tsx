"use client";

import React from "react";
import Image from "next/image";
import { StatCard } from "../../components/resuables/StatsCard";
import ProjectTable from "@/components/dashboard/projects/project-table";
import { useProjectsList } from "@/hooks/useProjectsList";
import { useContractFetch } from "@/hooks/useBlockchain";
import { FORTICHAIN_ABI } from "@/app/abi/fortichain-abi";

const Projects = () => {
  const { projects: allProjects, loading: projectsLoading } =
    useProjectsList("in_progress");
  const { projects: completedProjects } = useProjectsList("completed");

  // Get total projects count from blockchain
  const { readData: totalProjectsData } = useContractFetch(
    FORTICHAIN_ABI,
    "total_projects",
    []
  );

  // Calculate stats
  const totalProjects = totalProjectsData
    ? Number(totalProjectsData)
    : allProjects.length + completedProjects.length;
  const activeBounties = allProjects.length;
  const totalBountyPaid = [...allProjects, ...completedProjects]
    .filter((p) => p.bountyPaid)
    .reduce((sum, p) => sum + parseFloat(p.bountyPaid!.replace(/,/g, "")), 0);

  // Dynamic Stats Data
  const stats = [
    {
      id: 1,
      icon: (
        <Image
          src={"/adminIcon/project-card1icon.svg"}
          alt={"icon"}
          height={30}
          width={30}
        />
      ),
      value: totalProjects.toString(),
      label: "Total Number of Projects",
    },
    {
      id: 2,
      icon: (
        <Image
          src={"/adminIcon/project-card2icon.svg"}
          alt={"icon"}
          height={30}
          width={30}
        />
      ),
      value: activeBounties.toString(),
      label: "Active bounties",
    },
    {
      id: 3,
      icon: (
        <Image
          src={"/adminIcon/money-bag.svg"}
          alt={"icon"}
          height={30}
          width={30}
        />
      ),
      value: `$${totalBountyPaid.toLocaleString()}`,
      label: "Total Bounty Paid",
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="[&>div]:flex [&>div]:flex-col [&>div]:items-stretch [&>div]:h-full"
          >
            <StatCard
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          </div>
        ))}
        {/* <div className="bg-white rounded-lg p-4 flex flex-col justify-between h-full">
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full">
              <Image
                src={"/adminIcon/tip.svg"}
                alt={"icon"}
                height={30}
                width={30}
              />
            </div>
            <div>
              <h3 className="font-semibold text-black mb-1">Tip</h3>
              <p className="text-sm text-gray-600">
                All funds in escrow are refundable if no valid reports are
                submitted before the deadline.
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="flex justify-end">
        {/* <button className="px-6 py-3 bg-[#0000FF] text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 ">
          <span className="text-[1rem]">+</span>
          <h2>Add Project</h2>
        </button> */}
      </div>

      {/* Projects Section */}
      <div className="rounded-lg">
        <div className="space-y-4">
          <ProjectTable />
        </div>
      </div>
    </div>
  );
};

export default Projects;
