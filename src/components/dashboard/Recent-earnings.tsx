"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Animation } from "@/motion/Animation";
import { Search } from "lucide-react";

// Sample data
const earningsData = [
  {
    projectName: "SecureChain",
    reportId: "12345",
    rewardEarned: "50 STRK",
    date: "04/10",
    status: "Paid",
  },
  {
    projectName: "NFTShield",
    reportId: "12345",
    rewardEarned: "50 STRK",
    date: "04/10",
    status: "Pending",
  },
  {
    projectName: "SecureChain",
    reportId: "12345",
    rewardEarned: "50 STRK",
    date: "04/10",
    status: "Failed",
  },
  {
    projectName: "DeFIGuard",
    reportId: "12345",
    rewardEarned: "50 STRK",
    date: "04/10",
    status: "Paid",
  },
  {
    projectName: "NFTShield",
    reportId: "12345",
    rewardEarned: "50 STRK",
    date: "04/10",
    status: "Paid",
  },
];

export const RecentEarnings: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-[#01A901]";
      case "Failed":
        return "bg-[#AE2727]";
      case "Pending":
        return "bg-[#0000FF]";
      default:
        return "bg-gray-500";
    }
  };

  const filteredData = useMemo(() => {
    return earningsData
      .filter((item) => filter === "All" || item.status === filter)
      .filter(
        (item) =>
          searchTerm === "" ||
          item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.reportId.includes(searchTerm)
      );
  }, [filter, searchTerm]);

  return (
    <div className="bg-[#110D0F] rounded-[20px] border border-neutral-800 overflow-hidden p-5">
      <div className="pb-5  flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Animation delay={0.2} animationType="slide-up">
          <h2 className="text-2xl font-semibold text-white">
            Recent Earnings Activity
          </h2>
        </Animation>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Animation delay={0.3} animationType="slide-up">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#161113] border border-neutral-800 rounded-lg py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#0000FF]"
              />
            </div>
          </Animation>

          <Animation delay={0.4} animationType="slide-up">
            <select
              className="bg-[#161113] border border-neutral-800 rounded-lg py-2 px-4 text-white text-sm focus:outline-none focus:border-[#0000FF]"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </Animation>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#211A1D] text-neutral-400 text-base border-t border-neutral-800">
              <th className="py-3 px-4 text-left">Project Name</th>
              <th className="py-3 px-4 text-left">Report ID</th>
              <th className="py-3 px-4 text-left">Reward Earned</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((earning, index) => (
                <tr
                  key={index}
                  className="border-t border-neutral-800 hover:bg-[#1A1517] text-sm"
                >
                  <td className="py-3 px-4 text-white">
                    <Animation
                      delay={0.2 * (index + 1)}
                      animationType="slide-up"
                    >
                      {earning.projectName}
                    </Animation>
                  </td>
                  <td className="py-3 px-4 text-white">
                    <Animation
                      delay={0.2 * (index + 1)}
                      animationType="slide-up"
                    >
                      {earning.reportId}
                    </Animation>
                  </td>
                  <td className="py-3 px-4 text-white">
                    <Animation
                      delay={0.2 * (index + 1)}
                      animationType="slide-up"
                    >
                      {earning.rewardEarned}
                    </Animation>
                  </td>
                  <td className="py-3 px-4 text-white">
                    <Animation
                      delay={0.2 * (index + 1)}
                      animationType="slide-up"
                    >
                      {earning.date}
                    </Animation>
                  </td>
                  <td className="py-3 px-4">
                    <Animation
                      delay={0.2 * (index + 1)}
                      animationType="slide-up"
                    >
                      <p
                        className={` h-6 py-1 text-center rounded-[20px] text-xs text-white ${getStatusClass(
                          earning.status
                        )}`}
                      >
                        {earning.status}
                      </p>
                    </Animation>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-neutral-400">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
