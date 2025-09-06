"use client";

import React from "react";
import { motion } from "framer-motion";
import WalletInfo from "../components/WalletInfo";

interface ProfileStatsProps {
  bountyReward: number;
  paidOut: number;
  availableForWithdrawal: number;
  onWithdraw: () => void;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  bountyReward,
  paidOut,
  availableForWithdrawal,
  onWithdraw,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      {/* Bounty Reward Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#101011] rounded-md flex flex-col justify-start gap-6 p-6 md:min-h-[344px] border border-[#1F1F1F]"
      >
        <h3 className="text-white text-lg font-medium mb-4">Bounty Reward</h3>
        <div className="bg-[#1C1C1C] border border-[#1F1F1F] rounded-md p-6">
          <p className="text-[#6C6C6C] text-sm mb-3">
            Total amount made from bounty
          </p>
          <h2 className="text-white mt-6 text-3xl font-normal">
            {formatCurrency(bountyReward)}
          </h2>

        </div>
        <WalletInfo />
      </motion.div>

      {/* Paid Out Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#101011] rounded-md flex flex-col justify-start gap-6 p-6 md:min-h-[344px] border border-[#1F1F1F]"
      >
        <h3 className="text-white text-lg font-medium mb-4">Paid Out</h3>
        <div className="bg-[#1C1C1C] border border-[#1F1F1F] rounded-md p-6">
          <p className="text-[#6C6C6C] text-sm mb-3">
            Total amount withdrawn
          </p>
          <h2 className="text-white mt-6 text-3xl font-normal">
            {formatCurrency(paidOut)}
          </h2>

        </div>
      </motion.div>

      {/* Available Bounty for Withdrawal Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-[#101011] rounded-md flex flex-col justify-start gap-6 p-6 md:min-h-[344px] border border-[#1F1F1F]"
      >
        <h3 className="text-white text-lg font-medium mb-4">
          Available Bounty for Withdrawal
        </h3>
        <div className="bg-[#1C1C1C] border border-[#1F1F1F] rounded-md p-6">
          <p className="text-[#6C6C6C] text-sm mb-3">
            Available to withdraw
          </p>
          <h2 className="text-white mt-6 text-3xl font-normal">
            {formatCurrency(availableForWithdrawal)}
          </h2>
        </div>

        <div className="flex flex-col flex-1 justify-end">
          <button
            onClick={onWithdraw}
            style={{
              background:
                "linear-gradient(90deg, #10273E 0%, #2A67A4 100%)"
            }}
            className="p-[2px] mt-3 md:mt-0 rounded-full shrink-0"
          >
            <span
              className="block py-4 px-6 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #1D74F9 16.06%, #092650 100%)"
              }}
            >
              Withdraw
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileStats;
