"use client";
import { useState } from "react";
import { Animation } from "@/motion/Animation";
import { ChevronDown } from "lucide-react";
import type { RewardItem } from "./RewardsPage";

interface RewardsTableProps {
  rewards: RewardItem[];
  onViewClick: (id: string) => void;
}

export function RewardsTable({ rewards, onViewClick }: RewardsTableProps) {
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
      <div className="bg-[#110D0F] rounded-[20px] border border-[#464043] overflow-hidden">
        {/* Header with filters */}
        <div className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg sm:text-xl font-bold">Rewards</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <button className="w-full sm:w-auto px-3 py-1.5 sm:py-2 bg-[#0D0B0C] rounded-md text-xs sm:text-sm flex items-center justify-between gap-2">
                <span className="truncate">{securityFilter}</span>
                <ChevronDown size={16} />
              </button>
            </div>
            <div className="relative flex-1 sm:flex-none">
              <button className="w-full sm:w-auto px-3 py-1.5 sm:py-2 bg-[#0D0B0C] rounded-md text-xs sm:text-sm flex items-center justify-between gap-2">
                <span className="truncate">{statusFilter}</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0D0B0C] text-neutral-400 text-xs sm:text-sm">
              <tr>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">
                  Report ID
                </th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">
                  Project Name
                </th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">
                  Severity
                </th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">
                  Validation Date
                </th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Reward</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Status</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {rewards.map((reward, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#1A1618] transition-colors"
                >
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm">
                    {reward.id}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm">
                    {reward.projectName}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <span
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs ${getSeverityBadgeClass(
                        reward.severity
                      )}`}
                    >
                      {reward.severity}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm">
                    {reward.validationDate}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm">
                    {reward.reward}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <span
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs ${getStatusBadgeClass(
                        reward.status
                      )}`}
                    >
                      {reward.status}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <button
                      onClick={() => onViewClick(reward.id)}
                      className="text-blue-500 hover:text-blue-400 transition-colors text-xs sm:text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden divide-y divide-neutral-800">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="p-4 hover:bg-[#1A1618] transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium mb-1">{reward.id}</div>
                  <div className="text-sm text-neutral-300 mb-2">
                    {reward.projectName}
                  </div>
                </div>
                <button
                  onClick={() => onViewClick(reward.id)}
                  className="text-blue-500 hover:text-blue-400 transition-colors text-sm"
                >
                  View
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-neutral-400 mb-1">Severity</div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${getSeverityBadgeClass(
                      reward.severity
                    )}`}
                  >
                    {reward.severity}
                  </span>
                </div>
                <div>
                  <div className="text-neutral-400 mb-1">Status</div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeClass(
                      reward.status
                    )}`}
                  >
                    {reward.status}
                  </span>
                </div>
                <div>
                  <div className="text-neutral-400 mb-1">Validation Date</div>
                  <div>{reward.validationDate}</div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-1">Reward</div>
                  <div>{reward.reward}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Animation>
  );
}
