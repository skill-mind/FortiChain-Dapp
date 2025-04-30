"use client";
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Animation animationType="scale-up">
        <div className="bg-[#1A1618] rounded-[20px] w-full max-w-md p-4 sm:p-6 md:p-8 text-center border border-[#464043]">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Transaction Successful
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base mb-4 sm:mb-6">
            Your withdrawal of{" "}
            <span className="text-white font-semibold">
              {amount} ({dollarAmount})
            </span>{" "}
            has been processed successfully.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Funds will be sent to your wallet shortly.
          </p>

          <div className="border-b border-neutral-800 mb-4"></div>

          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-green-600 flex items-center justify-center">
              <Check size={24} className="sm:hidden" strokeWidth={3} />
              <Check size={32} className="hidden sm:block" strokeWidth={3} />
            </div>
          </div>

          <button
            onClick={onBackToPayouts}
            className="w-full py-2.5 sm:py-3 rounded-md font-medium bg-[#0000FF] hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Back to Payouts
          </button>
        </div>
      </Animation>
    </div>
  );
}
