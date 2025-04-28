"use client";

import type React from "react";
import { useState } from "react";
import { Animation } from "@/motion/Animation";

import { ChevronDown } from "lucide-react";
import { RewardItem } from "./RewardsPage";

interface RewardsTableProps {
  rewards: RewardItem[];
  onViewClick: (id: string) => void;
}

export const RewardsTable: React.FC<RewardsTableProps> = ({
  rewards,
  onViewClick,
}) => {
  const [securityFilter, setSecurityFilter] = useState("All Security");
  const [statusFilter, setStatusFilter] = useState("All Payment Status");

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500";
      case "High":
        return "bg-orange-500";
      case "Low":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500";
      case "Pending":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Animation delay={0.8} animationType="fade-in">
      <div className="bg-[#110D0F] rounded-[20px] border border-neutral-800 overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Rewards</h2>
          <div className="flex gap-3">
            <div className="relative">
              <button className="px-3 py-2 bg-[#0D0B0C] rounded-md text-sm flex items-center gap-2">
                {securityFilter}
                <ChevronDown size={16} />
              </button>
            </div>
            <div className="relative">
              <button className="px-3 py-2 bg-[#0D0B0C] rounded-md text-sm flex items-center gap-2">
                {statusFilter}
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0D0B0C] text-neutral-400 text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Report ID</th>
                <th className="py-3 px-4 text-left">Project Name</th>
                <th className="py-3 px-4 text-left">Severity</th>
                <th className="py-3 px-4 text-left">Validation Date</th>
                <th className="py-3 px-4 text-left">Reward</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {rewards.map((reward, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#1A1618] transition-colors"
                >
                  <td className="py-4 px-4">{reward.id}</td>
                  <td className="py-4 px-4">{reward.projectName}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getSeverityBadgeClass(
                        reward.severity
                      )}`}
                    >
                      {reward.severity}
                    </span>
                  </td>
                  <td className="py-4 px-4">{reward.validationDate}</td>
                  <td className="py-4 px-4">{reward.reward}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeClass(
                        reward.status
                      )}`}
                    >
                      {reward.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => onViewClick(reward.id)}
                      className="text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Animation>
  );
};
