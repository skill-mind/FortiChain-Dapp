"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Animation } from "@/motion/Animation";
import { ChevronDown } from "lucide-react";

// Sample data
const withdrawalHistoryData = [
  {
    transactionId: "TX123456789",
    amount: "$5,124.11",
    date: "24-01-2025",
    status: "Completed",
  },
  {
    transactionId: "TX123456789",
    amount: "$5,124.11",
    date: "24-01-2025",
    status: "Cancelled",
  },
  {
    transactionId: "TX123456789",
    amount: "$5,124.11",
    date: "24-01-2025",
    status: "Completed",
  },
  {
    transactionId: "TX123456789",
    amount: "$5,124.11",
    date: "24-01-2025",
    status: "Pending",
  },
  {
    transactionId: "TX123456789",
    amount: "$5,124.11",
    date: "24-01-2025",
    status: "Completed",
  },
];

export const WithdrawalHistory: React.FC = () => {
  const [filter, setFilter] = useState("All");

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#01A901]";
      case "Cancelled":
        return "bg-[#AE2727]";
      case "Pending":
        return "bg-[#0000FF]";
      default:
        return "bg-gray-500";
    }
  };

  const filteredData = useMemo(() => {
    return filter === "All"
      ? withdrawalHistoryData
      : withdrawalHistoryData.filter((item) => item.status === filter);
  }, [filter]);

  return (
    <Animation delay={0.4} animationType="slide-up">
      <div className="bg-[#110D0F] rounded-[20px] border border-neutral-800 overflow-hidden">
        <div className="p-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            Withdrawal History
          </h2>

          <div className="relative">
            <select
              className="bg-[#161113] border border-neutral-800 rounded-lg py-2 px-4 text-white text-sm outline-none appearance-none pr-8 relative"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#161113] text-neutral-400 text-sm border-t border-neutral-800">
                <th className="py-3 px-4 text-left">Transaction ID</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((transaction, index) => (
                <tr
                  key={index}
                  className="border-t border-neutral-800 hover:bg-[#1A1517]"
                >
                  <td className="py-3 px-4 text-white">
                    <Animation
                      delay={0.1 * (index + 1)}
                      animationType="slide-up"
                    >
                      {transaction.transactionId}
                    </Animation>
                  </td>
                  <td className="py-3 px-4 text-white">
                    <Animation
                      delay={0.1 * (index + 1)}
                      animationType="slide-up"
                    >
                      {transaction.amount}
                    </Animation>
                  </td>
                  <td className="py-3 px-4 text-white">
                    <Animation
                      delay={0.1 * (index + 1)}
                      animationType="slide-up"
                    >
                      {transaction.date}
                    </Animation>
                  </td>
                  <td className="py-3 px-4">
                    <Animation
                      delay={0.1 * (index + 1)}
                      animationType="slide-up"
                    >
                      <p
                        className={` w-20 h-6 py-1 rounded-full text-xs text-white text-center ${getStatusClass(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </p>
                    </Animation>
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
