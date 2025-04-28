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
import SuccessModal from "@/components/dashboard/modals/SuccessModal";

interface IProject {
  name: string;
  description: string;
  status: string;
  tags: string[];
  prizePool: string;
  expiryDate: string;
  repositories: string[];
  languages: { name: string; percentage: number }[];
  vulnerabilities: {
    id: string;
    title: string;
    severity: string;
    score: number;
    bounty: string;
    date: string;
  }[];
}

const ProjectDetails = () => {
  const [isCloseModalOpen, setIsCloseModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  // Mock data - replace with actual data fetching
  const project: IProject = {
    name: "DeFi Guard",
    description:
      "A decentralized finance (DeFi) protection tool that scans for vulnerabilities in DeFi protocols and helps prevent hacks.",
    status: "Ongoing",
    tags: ["DeFi", "Storage", "NFTs"],
    prizePool: "6,350.56",
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
    setIsLoading(true);
    // Mock API call - replace with actual API call
    await new Promise((resolve) =>
      setTimeout(() => {
        setIsCloseModalOpen(false);
        setIsLoading(false);
        setIsSuccessModalOpen(true);
        resolve(null);
      }, 5000)
    );
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard/admin/projects"
          className="text-gray-400 hover:text-white flex items-center gap-2"
        >
          ← Back to Project Overview
        </Link>
      </div>

      <div className="border border-[#464043] bg-[#161113]  p-4 rounded-lg">
        <div className="flex justify-between mb-2 ">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 p-8 rounded-lg bg-[#BC8522] flex items-center justify-center">
              <span className="text-3xl font-extrabold text-[#fff]">DG</span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">
                  {project.name}
                </h1>
                <span className="px-3 py-1 text-sm bg-[#2B2BFF] text-white rounded-full">
                  {project.status}
                </span>
              </div>
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
                  {({ focus }) => (
                    <button
                      className={`${
                        focus ? "bg-gray-800" : ""
                      } block w-full text-left px-4 py-2 text-sm text-white`}
                    >
                      Edit Project
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`${
                        focus ? "bg-gray-800" : ""
                      } block w-full text-left px-4 py-2 text-sm text-white`}
                    >
                      Increase Reward
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => setIsCloseModalOpen(true)}
                      className={`${
                        focus ? "bg-gray-800" : ""
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
        <p className="text-white mt-6 mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6 mt-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 text-sm bg-[#fff] rounded-lg text-black font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 mb-4">
          <div className="flex items-center gap-3 border border-[#464043] px-4 py-2 rounded-lg">
            <div className="p-2 bg-[#1A1A1A] rounded-lg">
              <Image
                src={"/adminIcon/pool.svg"}
                alt="coin"
                width={15}
                height={15}
              />
            </div>
            <div className="flex gap-2 text-sm text-white font-semibold">
              <p className="text-sm ">Prize Pool</p>
              <p>{project.prizePool}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border border-[#464043] px-4 py-2 rounded-lg">
            <div className="p-2 bg-[#1A1A1A] rounded-lg">
              <Image
                src={"/adminIcon/date.svg"}
                alt="coin"
                width={10}
                height={10}
              />
            </div>
            <div className="flex gap-2 text-sm text-white font-semibold">
              <p className="text-sm ">Date of Expiry</p>
              <p>{project.expiryDate}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          {project.repositories.map((repo) => (
            <a
              key={repo}
              href="#"
              className="flex items-center gap-2 px-4 py-2 border border-[#464043] rounded-lg text-white hover:bg-gray-700"
            >
              <BsGithub className="w-5 h-5" />
              {repo}
            </a>
          ))}
        </div>

        <div className="mb-8 flex flex-col items-start">
          <h2 className="text-xl font-semibold text-white mb-6">Languages</h2>
          <div className="grid grid-cols-2 gap-4">
            {project.languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2">
                <div className="flex gap-2 items-center">
                  <div className="text-lg">
                    <p className="text-white">{lang.name}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-400/50">{lang.percentage}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-6">
            Vulnerabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {project.vulnerabilities.map((vuln) => (
              <div
                key={vuln.id}
                className="bg-[#110D0F] border border-[#464043]  flex flex-col gap-4 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-400">#{vuln.id}</p>
                  <p className="text-sm text-gray-400">{vuln.date}</p>
                </div>
                <h3 className="text-white font-medium">{vuln.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs bg-[#AE2727] text-white rounded-lg">
                      {vuln.severity}
                    </span>
                    <span className="text-white">{vuln.score.toFixed(1)}</span>
                  </div>
                  <p className="text-white">{vuln.bounty}</p>
                </div>
              </div>
            ))}
            <div className="h-full w-full">
              <button className="h-full w-full  justify-center  bg-[#0000AA] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                <Link
                  href="/dashboard/admin/projects"
                  className="text-wgite hover:text-white flex items-center gap-2"
                >
                  View All <BsArrowRight />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CloseProjectModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onConfirm={handleConfirmClose}
        isLoading={isLoading}
      />
      {/* 
      <LoadingModal
        isOpen={isLoadingModalOpen}
        title="Close Project"
        message="We are processing your request. This may take a few moments."
      /> */}

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
