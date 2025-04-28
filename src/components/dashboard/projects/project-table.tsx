"use client";

import React from "react";

import { Animation } from "@/motion/Animation";
import Link from "next/link";
import { Input } from "@headlessui/react";

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

const TableHeaders = [
  "Name",
  "Category",
  "Bounty Allocated",
  "Bounty Paid",
  "Status",
  "Action",
];

const ProjectTable = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
        return "bg-[#2B2BFF]";
      case "Completed":
        return "bg-[#28A745]";
      case "Closed":
        return "bg-[#FF3737]";
      default:
        return "bg-[#6C757D]";
    }
  };
  return (
    <div className="bg-[#161113] rounded-[20px] p-6 mt-8">
      <div className="flex gap-2 md:justify-between items-center mb-8">
        <div className="w-full ">
          <h2 className="text-white flex text-[24px] font-[700]">Projects</h2>
        </div>
        <div className="flex gap-4 justify-between ">
          <div className="relative w-full ">
            <Input
              type="text"
              placeholder="Search"
              className=" w-full pl-8 md:pr-10 py-2 border border-[#464043] bg-transparent text-white placeholder:text-[#B5B3B4] placeholder:text-[1rem] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="w-6 h-6 text-gray-400 absolute left-1 top-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select className=" w-full px-4 bg-[#161113] py-2 border border-[#464043] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ">
            <option value="all">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
  <table className="w-full">
    <thead className="rounded-md p-5">
      <tr className="text-white text-[16px] border-b bg-[#211A1D] rounded-md h-[64px] rounded-t-2xl border-gray-800">
        {TableHeaders.map((header, idx) => (
          <th
            key={header + idx}
            className={`text-left ${
              idx + 1 === 1 ? "pl-5" : ""
            } `}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {projects.map((project, index) => {
        const { id, name, category, bountyAllocated, bountyPaid, status } = project;
        return (
          <tr
            key={id}
            className="border-b font-thin border-gray-800 text-white space-x-7"
          >
            <td className="py-4 text-white pl-5 min-w-[930px]:hidden">
              <Animation delay={0.2} animationType="slide-up">
                {name}
              </Animation>
            </td>
            <td className="py-4 text-white min-w-[930px]:hidden">
              <Animation delay={0.4} animationType="slide-up">
                {category}
              </Animation>
            </td>
            <td className="py-4 text-white min-w-[930px]:hidden">
              <Animation delay={0.6} animationType="slide-up">
                ${bountyAllocated}
              </Animation>
            </td>
            {/* These columns will be hidden at 930px */}
            <td className="py-4 text-white min-w-[930px]:hidden">
              <Animation delay={0.8} animationType="slide-up">
                {bountyPaid === "N/A" ? "N/A" : `$${bountyPaid}`}
              </Animation>
            </td>
            <td className="py-4 min-w-[930px]:hidden">
              <Animation delay={1} animationType="slide-up">
                <span
                  className={`px-3 py-1 rounded-full text-sm text-white ${getStatusColor(
                    status
                  )}`}
                >
                  {project.status}
                </span>
              </Animation>
            </td>
            <td className="py-4 cursor-pointer min-w-[930px]:hidden">
              <Animation delay={1.2} animationType="slide-up">
                <div className="flex gap-2 text-[#0000FF] text-[14px]">
                  <Link
                    href={`/dashboard/admin/projects/${name}`}
                    className="text-[#007BFF] hover:underline text-sm"
                  >
                    View
                  </Link>
                </div>
              </Animation>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

      {/* Mobile Card View (visible only on mobile) */}
      <div className="md:hidden space-y-4">
        {projects.map((project, index) => {
          const { id, name, category, bountyPaid, bountyAllocated, status } =
            project;
          return (
            <Animation key={id} delay={0.2 * index} animationType="slide-up">
              <div className="bg-[#211A1D] rounded-lg p-4 border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium text-lg">{name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-[12px] font-[400] ${getStatusColor(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bounty:</span>
                    <span className="text-white">${bountyAllocated}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Bounty Paid:</span>
                    <span className="text-white">
                      {bountyPaid === "N/A" ? "N/A" : `$${bountyPaid}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{category}</span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button className="text-[#0000FF] hover:text-blue-400 text-[14px]">
                  <Link
                    href={`/dashboard/admin/projects/${name}`}
                    className="text-[#007BFF] hover:underline text-sm"
                  >
                    View
                  </Link>
                  </button>
                </div>
              </div>
            </Animation>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTable;
