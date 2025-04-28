"use client";

import type React from "react";
import { Animation } from "@/motion/Animation";
import { Check } from "lucide-react";

interface TransactionSuccessModalProps {
  amount: string;
  dollarAmount: string;
  onBackToPayouts: () => void;
}

export const TransactionSuccessModal: React.FC<
  TransactionSuccessModalProps
> = ({ amount, dollarAmount, onBackToPayouts }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Animation animationType="scale-up">
        <div className="bg-[#1A1618] rounded-[20px] w-full max-w-md mx-4 p-8 text-center border border-neutral-800">
          <h2 className="text-2xl font-bold mb-4">Transaction Successful</h2>

          <p className="text-neutral-300 mb-6">
            Your withdrawal of {amount} ({dollarAmount}) has been processed
            successfully.
            <br />
            Funds will be sent to your wallet shortly.
          </p>

          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-lg bg-green-500 flex items-center justify-center">
              <Check size={32} strokeWidth={3} />
            </div>
          </div>

          <button
            onClick={onBackToPayouts}
            className="w-full py-3 rounded-md font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Back to Payouts
          </button>
        </div>
      </Animation>
    </div>
  );
};
