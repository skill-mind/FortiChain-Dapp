"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAccount, useDisconnect } from "@starknet-react/core";

const WalletInfo: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-10)}`;
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (!isConnected || !address) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-white text-lg font-medium">Ebube</h3>
            <span className="bg-[#10273E] text-[#0073E6] text-xs px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <p className="text-[#6C6C6C] text-sm font-mono">
            {formatAddress(address)}
          </p>
        </div>
        <button
          onClick={handleDisconnect}
          className="bg-[#1C1C1C]  border border-[#464043] text-white hover:bg-[#464043] transition-colors px-4 py-2 rounded-full text-sm w-fit"
        >
          Disconnect Wallet
        </button>
      </div>
    </motion.div>
  );
};

export default WalletInfo;
