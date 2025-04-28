"use client";

import React from "react";

import ProjectCard from "@/components/dashboard/projects/ProjectCard";
import CloseProjectModal from "@/components/dashboard/modals/CloseProjectModal";
import LoadingModal from "@/components/dashboard/modals/LoadingModal";
import SuccessModal from "@/components/dashboard/modals/SuccessModal";
import Image from "next/image";
import { StatCard } from "../../components/resuables/StatsCard";
import ProjectTable from "@/components/dashboard/projects/project-table";

// import ProjectCardOne from "../../../../"

const Projects = () => {
  const [isCloseModalOpen, setIsCloseModalOpen] = React.useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const [selectedProjectId, setSelectedProjectId] = React.useState<
    string | null
  >(null);

  // Mock data - replace with actual data fetching
  const projects = [
    {
      id: "1",
      name: "SkillNet",
      category: "DeFi",
      bountyAllocated: "5,200.13",
      bountyPaid: "5,124.11",
      status: "Completed" as const,
    },
    {
      id: "2",
      name: "SkillNet",
      category: "DeFi",
      bountyAllocated: "5,200.44",
      bountyPaid: "N/A",
      status: "Ongoing" as const,
    },
    {
      id: "3",
      name: "SkillNet",
      category: "DeFi",
      bountyAllocated: "5,200.11",
      bountyPaid: "2,600.23",
      status: "Closed" as const,
    },
    {
      id: "4",
      name: "SkillNet",
      category: "DeFi",
      bountyAllocated: "5,200.11",
      bountyPaid: "N/A",
      status: "Ongoing" as const,
    },
  ];

  // Example Stats Data
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
      value: "5",
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
      value: "5",
      label: "Active bounties",
    },
  ];

  const handleCloseProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsCloseModalOpen(true);
  };

  const handleConfirmClose = async () => {
    setIsCloseModalOpen(false);
    setIsLoadingModalOpen(true);

    // Mock API call - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoadingModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="p-6 bg-transparent min-h-screen">
      {/* Tip Section */}
      {/* <div className="absolute top-6 right-6 bg-white rounded-lg p-4 w-80">
        <div className="flex items-start gap-2">
          <div className="p-1 rounded-full bg-[#007BFF]">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-black mb-1">Tip</h3>
            <p className="text-sm text-gray-600">
              All funds in escrow are refundable if no valid reports are
              submitted before the deadline.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div> */}

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
          />
        ))}
        <div className="bg-white rounded-lg p-4 ">
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
          <div className="flex justify-end items-stretch">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-3 bg-[#0000FF] text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 ">
          <span className="text-[1rem]">+</span>
          <h2>Add Project</h2>
        </button>
      </div>

      {/* Projects Section */}
      <div className="bg-[#1C1C1C] rounded-lg">
        <div className="space-y-4">
          <ProjectTable />
        </div>
      </div>

      <CloseProjectModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onConfirm={handleConfirmClose}
      />

      <LoadingModal
        isOpen={isLoadingModalOpen}
        title="Close Project"
        message="We are processing your request. This may take a few moments."
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Project Closed Successfully"
        message="Your project has been closed. No new vulnerability reports can be submitted, and remaining bounties will be processed accordingly."
      />
    </div>
  );
};

export default Projects;
