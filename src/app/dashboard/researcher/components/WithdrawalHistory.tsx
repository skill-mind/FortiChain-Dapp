"use client";

import React from "react";
import { motion } from "framer-motion";

interface WithdrawalHistoryItem {
  id: string;
  date: string;
  project: string;
  to: string;
  amount: number;
  status: "Pending" | "Completed" | "Failed";
}

interface WithdrawalHistoryProps {
  withdrawals?: WithdrawalHistoryItem[];
}

const WithdrawalHistory: React.FC<WithdrawalHistoryProps> = ({
  withdrawals = [],
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 10)}...${address.slice(-10)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#10273E] text-[#0073E6]";
      case "Pending":
        return "bg-warning-background text-warning";
      case "Failed":
        return "bg-[#FF0000] text-white";
      default:
        return "bg-[#6C6C6C] text-white";
    }
  };

  // Sample data
  const sampleWithdrawals: WithdrawalHistoryItem[] = [
    {
      id: "1",
      date: "2024-01-20",
      project: "Smart contract audit",
      to: "0x6B8e6d5B34F3E9bF7dCD6aB2bF4D6B3A4D7cF3",
      amount: 2456.78,
      status: "Pending",
    },
    {
      id: "2",
      date: "2024-02-15",
      project: "Website redesign",
      to: "0x6B8e6d5B34F3E9bF7dCD6aB2bF4D6B3A4D7cF3",
      amount: 1123.45,
      status: "Pending",
    },
    {
      id: "3",
      date: "2024-04-05",
      project: "Data analysis report",
      to: "0x6B8e6d5B34F3E9bF7dCD6aB2bF4D6B3A4D7cF3",
      amount: 1200.00,
      status: "Completed",
    },
    {
      id: "4",
      date: "2024-06-18",
      project: "SEO optimization",
      to: "0x6B8e6d5B34F3E9bF7dCD6aB2bF4D6B3A4D7cF3",
      amount: 3450.00,
      status: "Completed",
    },
    {
      id: "5",
      date: "2024-09-25",
      project: "Content creation",
      to: "0x6B8e6d5B34F3E9bF7dCD6aB2bF4D6B3A4D7cF3",
      amount: 4500.00,
      status: "Pending",
    },
  ];

  const displayWithdrawals = withdrawals.length > 0 ? withdrawals : sampleWithdrawals;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-[#101011] rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-white text-lg font-medium mb-2">
          Withdrawal History
        </h3>
        <p className="text-[#6C6C6C] text-sm">
          View Total Amount Withdrawn
        </p>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#464043]">
              <th className="text-left text-[#6C6C6C] text-sm font-medium pb-3 px-2 sm:px-4">
                Date
              </th>
              <th className="text-left text-[#6C6C6C] text-sm font-medium pb-3 px-2 sm:px-4 min-w-[120px]">
                Project
              </th>
              <th className="text-left text-[#6C6C6C] text-sm font-medium pb-3 px-2 sm:px-4 w-[120px] sm:w-1/4">
                To
              </th>
              <th className="text-right text-[#6C6C6C] text-sm font-medium pb-3 px-2 sm:px-4 w-[80px] sm:w-auto">
                Amount
              </th>
              <th className="text-center text-[#6C6C6C] text-sm font-medium pb-3 px-2 sm:px-4 w-[90px] sm:w-auto">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {displayWithdrawals.map((withdrawal, index) => (
              <motion.tr
                key={withdrawal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="border-b border-[#2C2C2C] last:border-b-0"
              >
                <td className="py-3 sm:py-4 px-2 sm:px-4 text-white text-xs sm:text-sm">
                  <div className="whitespace-nowrap">{withdrawal.date}</div>
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-4 text-white text-xs sm:text-sm">
                  <div className="truncate max-w-[100px] sm:max-w-none" title={withdrawal.project}>
                    {withdrawal.project}
                  </div>
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-4 text-white text-xs sm:text-sm font-mono">
                  <div className="truncate" title={withdrawal.to}>
                    <span className="sm:hidden">{formatAddress(withdrawal.to)}</span>
                    <span className="hidden sm:inline">{withdrawal.to}</span>
                  </div>
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-[#0073E6] text-xs sm:text-sm font-medium">
                  <div className="whitespace-nowrap">{formatCurrency(withdrawal.amount)}</div>
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                  <span
                    className={`inline-block w-[70px] sm:w-[110px] px-2 sm:px-5 py-1 rounded-full text-xs font-normal ${getStatusColor(
                      withdrawal.status
                    )}`}
                  >
                    {withdrawal.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

    </motion.div>
  );
};

export default WithdrawalHistory;
