"use client";

import type React from "react";
import { useState } from "react";
import { Animation } from "@/motion/Animation";
import { ArrowLeft, User, Check, Loader2 } from "lucide-react";

interface ConfirmClaimViewProps {
  amount: string;
  tokenAmount: string;
  recipientAddress: string;
  onBack: () => void;
  onConfirm: () => void;
}

export const ConfirmClaimView: React.FC<ConfirmClaimViewProps> = ({
  amount,
  tokenAmount,
  recipientAddress,
  onBack,
  onConfirm,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleTransfer = () => {
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      onConfirm();
    }, 2000); // 2 second delay to show loading state
  };

  return (
    <Animation animationType="fade-in">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Project Overview
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-[#1A1618] rounded-[20px] p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Claim Reward</h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">
            Amount: {amount} ({tokenAmount})
          </h3>

          <div className="mt-6">
            <h4 className="text-sm text-neutral-400 mb-2">Recepient</h4>
            <div className="bg-[#110D0F] rounded-md p-4 border border-neutral-800">
              <div className="flex items-center gap-3">
                <User size={20} />
                <div>
                  <div className="flex items-center gap-2">
                    <span>{recipientAddress}</span>
                    <span className="text-xs text-neutral-400">
                      Account Address
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <Check size={12} />
                    </div>
                    <span className="text-xs text-green-500">
                      Valid Address
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onBack}
            disabled={isLoading}
            className="py-3 rounded-md font-medium bg-white/10 hover:bg-white/20 transition-colors text-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleTransfer}
            disabled={isLoading}
            className="py-3 rounded-md font-medium bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              "Transfer to Wallet"
            )}
          </button>
        </div>
      </div>
    </Animation>
  );
};
