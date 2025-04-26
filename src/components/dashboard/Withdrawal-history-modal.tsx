"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Animation } from "@/motion/Animation";
import { X, ChevronDown, Search } from "lucide-react";

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

interface WithdrawalHistoryModalProps {
  onClose: () => void;
}

export const WithdrawalHistoryModal: React.FC<WithdrawalHistoryModalProps> = ({
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Amount: High to Low");
  const [statusFilter, setStatusFilter] = useState("All Status");

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
    let filtered = [...withdrawalHistoryData];

    // Apply status filter
    if (statusFilter !== "All Status") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOrder === "Amount: High to Low") {
      filtered.sort((a, b) => {
        const amountA = Number.parseFloat(
          a.amount.replace("$", "").replace(",", "")
        );
        const amountB = Number.parseFloat(
          b.amount.replace("$", "").replace(",", "")
        );
        return amountB - amountA;
      });
    } else if (sortOrder === "Amount: Low to High") {
      filtered.sort((a, b) => {
        const amountA = Number.parseFloat(
          a.amount.replace("$", "").replace(",", "")
        );
        const amountB = Number.parseFloat(
          b.amount.replace("$", "").replace(",", "")
        );
        return amountA - amountB;
      });
    } else if (sortOrder === "Date: Newest") {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortOrder === "Date: Oldest") {
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    return filtered;
  }, [searchTerm, sortOrder, statusFilter]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 md:ml-60">
      <Animation animationType="scale-up">
        <div className="bg-[#110D0F] rounded-[20px] border border-neutral-800 w-full max-w-5xl mt-10 md:mt-32 mx-auto max-h-[90vh] overflow-hidden p-5">
          <div className="flex justify-between items-center p-5">
            <h2 className="text-xl font-semibold text-white">
              Withdrawal History
            </h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-auto flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[60%] bg-[#161113] border border-neutral-800 rounded-lg py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#0000FF]"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <select
                  className="appearance-none bg-[#161113] border border-neutral-800 rounded-lg py-2 pl-4 pr-10 text-white text-sm focus:outline-none focus:border-[#0000FF] w-full md:w-48"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="Amount: High to Low">
                    Amount: High to Low
                  </option>
                  <option value="Amount: Low to High">
                    Amount: Low to High
                  </option>
                  <option value="Date: Newest">Date: Newest</option>
                  <option value="Date: Oldest">Date: Oldest</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 pointer-events-none" />
              </div>

              <div className="relative w-full md:w-auto">
                <select
                  className="appearance-none bg-[#161113] border border-neutral-800 rounded-lg py-2 pl-4 pr-10 text-white text-sm focus:outline-none focus:border-[#0000FF] w-full md:w-36"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All Status">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#211A1D] text-neutral-400 text border-t border-neutral-800">
                  <th className="py-3 px-4 text-left">Transaction ID</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((transaction, index) => (
                    <tr
                      key={index}
                      className="border-t border-neutral-800 hover:bg-[#1A1517] text-sm"
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
                            className={` h-6 py-1 rounded-[20px] text-center text-xs text-white ${getStatusClass(
                              transaction.status
                            )}`}
                          >
                            {transaction.status}
                          </p>
                        </Animation>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-neutral-400"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Animation>
    </div>
  );
};
