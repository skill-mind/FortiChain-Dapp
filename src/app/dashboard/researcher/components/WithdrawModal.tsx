"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, transactionId: string, toAddress: string) => void;
  availableBalance: number;
  walletAddress?: string;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  availableBalance,
  walletAddress,
}) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  const handleWithdraw = async () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 10 || numAmount > availableBalance) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockTransactionId = "0x1a2b" + Math.random().toString(36).substring(2, 10);
      const toAddress = walletAddress || "0x6B8e6d5B34F3E9bF7dCD6aB2bF4D6B3A4D7cF3";

      onSuccess(numAmount, mockTransactionId, toAddress);
      setIsLoading(false);
      setAmount("");
    }, 2000);
  };

  const isValidAmount = () => {
    const numAmount = parseFloat(amount);
    return numAmount >= 10 && numAmount <= availableBalance;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#101011] flex flex-col gap-6 border border-[#1F1F1F] p-6 rounded-lg w-full md:min-w-[509px] max-w-lg mx-4"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-white text-xl font-semibold">Withdraw to wallet</h2>
            <p className="text-[#6C6C6C] text-sm mt-3">
              Transfer Your Funds To An External Wallet Address
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#6C6C6C] rounded-full p-1.5 bg-[#1C1C1C] hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Available Balance */}
        <div className="bg-[#1C1C1C] border border-[#1F1F1F] rounded-md p-6 flex items-center justify-between">
          <p className="text-[#6C6C6C] text-xs md:text-sm">
            Available to withdraw
          </p>
          <h2 className="text-white text-2xl md:text-3xl font-normal">
            {formatCurrency(availableBalance)}
          </h2>
        </div>

        {/* Amount Input */}
        <div className="">
          <label className="block text-white mb-2">
            Amount (USD)
          </label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="w-full bg-[#101011] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white text-lg placeholder-[#6C6C6C] focus:outline-none focus:border-[#FFFFFF] transition-colors"
            />
          </div>
          <p className="text-[#6C6C6C] text-sm mt-2">
            Minimum withdrawal is $10
          </p>
        </div>

        {/* Warning Message */}
        <div className="border border-[#373510] rounded-lg p-6">
          <p className="text-[#E2E2E2] text-sm leading-6">
            Verify your connected wallet address is correct. Transactions cannot be reversed.
          </p>
        </div>

        <div className="flex flex-col flex-1 justify-end">
          <button
            onClick={handleWithdraw}
            disabled={!isValidAmount() || isLoading}
            style={{
              background: isValidAmount() && !isLoading ?
                "linear-gradient(90deg, #10273E 0%, #2A67A4 100%)"
                : "bg-[#464043]"
            }}
            className={`p-[2px] mt-3 md:mt-0 rounded-full shrink-0 ${isValidAmount() && !isLoading ? "bg-[#0000FF] hover:bg-[#1100ff] text-white" : "bg-[#464043] text-[#6C6C6C] cursor-not-allowed"}`}
          >
            <span
              className="block py-4 px-6 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #1D74F9 16.06%, #092650 100%)"
              }}
            >
              {isLoading ? "Processing..." : "Withdraw"}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WithdrawModal;
