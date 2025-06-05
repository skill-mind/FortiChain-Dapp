// src/app/dashboard/payout/components/TransactionTable.tsx
"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
}

export default function TransactionTable() {
  // Sample data - in a real application, this would come from an API
  const transactions: Transaction[] = [
    {
      id: "#4422",
      date: "24-01-2025",
      type: "Deposit to Escrow",
      amount: 5124.11,
      status: "Completed",
    },
    {
      id: "#4422",
      date: "24-01-2025",
      type: "Withdrawal from Escrow",
      amount: 5124.11,
      status: "Completed",
    },
    {
      id: "#4422",
      date: "24-01-2025",
      type: "Withdrawal from Escrow",
      amount: 5124.11,
      status: "Completed",
    },
    {
      id: "#4422",
      date: "24-01-2025",
      type: "Auto top-up from wallet",
      amount: 5124.11,
      status: "Completed",
    },
    {
      id: "#4422",
      date: "24-01-2025",
      type: "Bounty Payment",
      amount: 5124.11,
      status: "Completed",
    },
  ];

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#211a1d] text-white">
            <th className="py-4 px-4 text-left">Date</th>
            <th className="py-4 px-4 text-left">Transaction ID</th>
            <th className="py-4 px-4 text-left">Type</th>
            <th className="py-4 px-4 text-left">Amount</th>
            <th className="py-4 px-4 text-left">Status</th>
          </tr>
        </thead>
        <motion.tbody
          initial="hidden" // Initial state for all children (rows)
          animate="visible" // Animate to visible state on mount
          variants={containerVariants} // Apply container variants for staggering
        >
          {transactions.map((transaction, index) => (
            <motion.tr
              key={index} // It's generally better to use a unique ID from transaction if available
              className="border-b border-gray-800 text-white"
              variants={rowVariants} // Apply row-specific variants
              transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }} // Duration for each row's animation
            >
              <td className="py-4 px-4">{transaction.date}</td>
              <td className="py-4 px-4">{transaction.id}</td>
              <td className="py-4 px-4">{transaction.type}</td>
              <td className="py-4 px-4">
                ${transaction.amount.toLocaleString()}
              </td>
              <td className="py-4 px-4">
                <div
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
                    transaction.status === "Completed"
                      ? "bg-[#01A901] text-white"
                      : transaction.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {/* Corrected logic: only render the status string */}
                  {transaction.status}
                </div>
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
}
