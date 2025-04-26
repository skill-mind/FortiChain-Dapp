'use client'

import React from "react";
import { StatCard } from "../../components/resuables/StatsCard";
import { RecentActivity } from "../../components/resuables/RecentActivity";
import { Animation } from "@/motion/Animation";
import Image from "next/image";
import adminOne from "../../../../../public/adminIcon/adminStatsOne.svg";
import adminTwo from "../../../../../public/adminIcon/adminStatsTwo.svg";
import adminThree from "../../../../../public/adminIcon/adminStatsThree.svg";

// Example Stats Data
const stats = [
  {
    id: 1,
    icon: <Image src={adminOne} alt={"icon"} height={30} width={30} />,
    value: "15",
    label: "Validators Pending KYC Review",
  },
  {
    id: 2,
    icon: <Image src={adminTwo} alt={"icon"} height={30} width={30} />,
    value: "15",
    label: "Support Tickets Pending",
  },
  {
    id: 3,
    icon: <Image src={adminThree} alt={"icon"} height={30} width={30} />,
    value: "1",
    label: "Total Approved Validators",
  },
];

// Example Recent Events
const recentEvents = [
  {
    id: 1,
    title: "New Support Ticket Submitted",
    subtitle: "Support tickets are pending replies",
    timestamp: "Today 4:55pm",
  },
  {
    id: 2,
    title: "Validators Application",
    subtitle: "Multiple validators accounts are pending review",
    timestamp: "Today 4:55pm",
  },
  {
    id: 3,
    title: "Project Submissions",
    subtitle: "Multiple project submissions have been made",
    timestamp: "Yesterday",
  },
];

// Validators data
const validators = [
  {
    name: "Daniel Ochoja",
    walletAddress: "0×1234...abcd",
    reviewedProjects: 4,
    proficiency: "Python, Rust, C, C#",
    status: "Approved",
  },
  {
    name: "Aisha Muritala",
    walletAddress: "0×1234...abcd",
    reviewedProjects: 0,
    proficiency: "Typescript, Solidity",
    status: "Pending",
  },
  {
    name: "Favour Stephen",
    walletAddress: "0×1234...abcd",
    reviewedProjects: 0,
    proficiency: "Cairo, Go, Python",
    status: "Pending",
  },
  {
    name: "Favour Stephen",
    walletAddress: "0×1234...abcd",
    reviewedProjects: 4,
    proficiency: "Cairo, Go, Python",
    status: "Approved",
  },
];

const ValidatorsTable = () => {
  return (
    <div className="bg-[#161113] rounded-[20px] p-6 mt-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white text-[24px] font-[700]">Validators</h2>
        <div className="text-[#0000FF] hover:text-blue-400 cursor-pointer text-[18px]">
          View All
        </div>
      </div>

      {/* Desktop Table View (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="rounded-md p-5">
            <tr className="text-gray-400 text-[16px] border-b bg-[#211A1D] rounded-md h-[64px] border-gray-800">
              <th className="text-left font-normal pl-5">Name</th>
              <th className="text-center font-normal">Wallet Address</th>
              <th className="text-center font-normal">Reviewed Projects</th>
              <th className="text-left font-normal">Proficiency</th>
              <th className="text-left font-normal">Status</th>
              <th className="text-left font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {validators.map((validator, index) => (
              <tr key={index} className="border-b font-thin border-gray-800">
                <td className="py-4 text-white pl-5">
                  <Animation delay={0.2} animationType="slide-up">
                    {validator.name}
                  </Animation>
                </td>
                <td className="py-4 text-white text-center">
                  <Animation delay={0.4} animationType="slide-up">
                    {validator.walletAddress}
                  </Animation>
                </td>
                <td className="py-4 text-white text-center">
                  <Animation delay={0.6} animationType="slide-up">
                    {validator.reviewedProjects}
                  </Animation>
                </td>
                <td className="py-4 text-white">
                  <Animation delay={0.8} animationType="slide-up">
                    {validator.proficiency}
                  </Animation>
                </td>
                <td className="py-4">
                  <Animation delay={1} animationType="slide-up">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-[400] ${
                        validator.status === "Approved"
                          ? "bg-[#01A901] text-white"
                          : "bg-[#000055] text-white"
                      }`}
                    >
                      {validator.status}
                    </span>
                  </Animation>
                </td>
                <td className="py-4 cursor-pointer">
                  <Animation delay={1.2} animationType="slide-up">
                    <div className="flex gap-2 text-[#0000FF] text-[14px]">
                      View Profile
                    </div>
                  </Animation>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (visible only on mobile) */}
      <div className="md:hidden space-y-4">
        {validators.map((validator, index) => (
          <Animation key={index} delay={0.2 * index} animationType="slide-up">
            <div className="bg-[#211A1D] rounded-lg p-4 border border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-lg">
                  {validator.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-[12px] font-[400] ${
                    validator.status === "Approved"
                      ? "bg-[#01A901] text-white"
                      : "bg-[#000055] text-white"
                  }`}
                >
                  {validator.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Wallet Address:</span>
                  <span className="text-white">{validator.walletAddress}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Reviewed Projects:</span>
                  <span className="text-white">
                    {validator.reviewedProjects}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Proficiency:</span>
                  <span className="text-white">{validator.proficiency}</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <button className="text-[#0000FF] hover:text-blue-400 text-[14px]">
                  View Profile
                </button>
              </div>
            </div>
          </Animation>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
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
      <RecentActivity events={recentEvents} />

      {/* Validators Table */}
      <ValidatorsTable />
    </div>
  );
};

export default AdminDashboard;
