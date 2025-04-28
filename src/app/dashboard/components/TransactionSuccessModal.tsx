"use client";

import type React from "react";
import { Animation } from "@/motion/Animation";
import { Check } from "lucide-react";

interface TransactionSuccessModalProps {
  amount: string;
  dollarAmount: string;
  onBackToPayouts: () => void;
}

export function TransactionSuccessModal({
  amount,
  dollarAmount,
  onBackToPayouts,
}: TransactionSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Animation animationType="scale-up">
        <div className="bg-[#1A1618] rounded-[20px] w-full max-w-md mx-4 p-8 text-center border border-[#464043]">
          <h2 className="text-2xl font-bold mb-4">Transaction Successful</h2>

          <p className="text-neutral-300 mb-6">
            Your withdrawal of{" "}
            <span className="text-white font-semibold">
              {" "}
              {amount} ({dollarAmount})
            </span>{" "}
            has been processed successfully.
            <br />
            Funds will be sent to your wallet shortly.
          </p>
          <div className="border-b border-neutral-800 mb-4"></div>

          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-lg bg-green-600 flex items-center justify-center">
              <Check size={32} strokeWidth={3} />
            </div>
          </div>

          <button
            onClick={onBackToPayouts}
            className="w-full py-3 rounded-md font-medium bg-[#0000FF] hover:bg-blue-700 transition-colors"
          >
            Back to Payouts
          </button>
        </div>
      </Animation>
    </div>
  );
}
