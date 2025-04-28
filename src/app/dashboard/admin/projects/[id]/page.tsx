"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsThreeDotsVertical, BsArrowRight } from "react-icons/bs";
import {
  Menu,
  MenuItems,
  MenuItem,
  MenuButton,
  Transition,
} from "@headlessui/react";
import CloseProjectModal from "@/components/dashboard/modals/CloseProjectModal";
import LoadingModal from "@/components/dashboard/modals/LoadingModal";
import SuccessModal from "@/components/dashboard/modals/SuccessModal";

const ProjectDetails = () => {
  const [isCloseModalOpen, setIsCloseModalOpen] = React.useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  // Mock data - replace with actual data fetching
  const project = {
    name: "DeFi Guard",
    description:
      "A decentralized finance (DeFi) protection tool that scans for vulnerabilities in DeFi protocols and helps prevent hacks.",
    status: "Ongoing",
    tags: ["DeFi", "Storage", "NFTs"],
    prizePool: "$6,350.56",
    expiryDate: "25-04-2025",
    repositories: ["DeFi-Guard-Smartcontract", "DeFi-Guard-Smartcontract"],
    languages: [
      { name: "TypeScript", percentage: 45 },
      { name: "Python", percentage: 25 },
      { name: "Cairo", percentage: 20 },
      { name: "Rust", percentage: 10 },
    ],
    vulnerabilities: [
      {
        id: "8793",
        title: "Filename parameter on Home Page",
        severity: "Critical",
        score: 9.0,
        bounty: "$200",
        date: "3 Jan, 4:35 PM",
      },
      {
        id: "8793",
        title: "Filename parameter on Home Page",
        severity: "Critical",
        score: 9.0,
        bounty: "$200",
        date: "3 Jan, 4:35 PM",
      },
    ],
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
    <div className="p-6 bg-[#1A1A1A] min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard/admin/projects"
          className="text-gray-400 hover:text-white flex items-center gap-2"
        >
          ← Back to Project Overview
        </Link>
      </div>

      <div className="bg-[#1C1C1C] rounded-2xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#F2994A]/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#F2994A]">DG</span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">
                  {project.name}
                </h1>
                <span className="px-3 py-1 text-sm bg-[#007BFF] text-white rounded-full">
                  {project.status}
                </span>
              </div>
              <p className="text-gray-400 mt-2 max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>
          <Menu as="div" className="relative">
            <MenuButton className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
              <BsThreeDotsVertical className="w-5 h-5" />
            </MenuButton>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <MenuItems className="absolute right-0 mt-2 w-48 bg-[#2D2D2D] rounded-lg shadow-lg">
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-800" : ""
                      } block w-full text-left px-4 py-2 text-sm text-white`}
                    >
                      Edit Project
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-800" : ""
                      } block w-full text-left px-4 py-2 text-sm text-white`}
                    >
                      Increase Reward
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => setIsCloseModalOpen(true)}
                      className={`${
                        active ? "bg-gray-800" : ""
                      } block w-full text-left px-4 py-2 text-sm text-red-500`}
                    >
                      Close Project
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 text-sm bg-[#2D2D2D] rounded-lg text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex items-center gap-3 bg-[#2D2D2D] px-4 py-3 rounded-lg">
            <div className="p-2 bg-[#1A1A1A] rounded-lg">
              <svg
                className="w-6 h-6 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-.42 0-.76.34-.76.76v3.43c0 .42.34.76.76.76s.76-.34.76-.76v-3.43c0-.42-.34-.76-.76-.76zm0-3.14c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Prize Pool</p>
              <p className="text-white font-semibold">{project.prizePool}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#2D2D2D] px-4 py-3 rounded-lg">
            <div className="p-2 bg-[#1A1A1A] rounded-lg">
              <svg
                className="w-6 h-6 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Date of Expiry</p>
              <p className="text-white font-semibold">{project.expiryDate}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {project.repositories.map((repo) => (
            <a
              key={repo}
              href="#"
              className="flex items-center gap-2 px-4 py-2 bg-[#2D2D2D] rounded-lg text-white hover:bg-gray-700"
            >
              <BsGithub className="w-5 h-5" />
              {repo}
            </a>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Languages</h2>
          <div className="space-y-4">
            {project.languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-4">
                <div className="w-24">
                  <p className="text-white">{lang.name}</p>
                </div>
                <div className="flex-1 h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#007BFF]"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
                <div className="w-12">
                  <p className="text-gray-400">{lang.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-6">
            Vulnerabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {project.vulnerabilities.map((vuln) => (
              <div key={vuln.id} className="bg-[#2D2D2D] rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-400">#{vuln.id}</p>
                    <h3 className="text-white font-medium">{vuln.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{vuln.date}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs bg-red-500/20 text-red-500 rounded">
                      {vuln.severity}
                    </span>
                    <span className="text-white">{vuln.score}</span>
                  </div>
                  <p className="text-white">{vuln.bounty}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button className="bg-[#007BFF] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600">
              View All <BsArrowRight />
            </button>
          </div>
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

export default ProjectDetails;
