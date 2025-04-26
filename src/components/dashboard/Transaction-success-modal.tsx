"use client";

import type React from "react";
import { Animation } from "@/motion/Animation";
import Image from "next/image";
import Check from "../../../public/researcherIcon/check.svg";


interface TransactionSuccessModalProps {
  amount: number;
  onClose: () => void;
}

export const TransactionSuccessModal: React.FC<
  TransactionSuccessModalProps
> = ({ amount, onClose }) => {
  // Calculate USD value (example conversion rate)
  const usdValue = (amount * 0.07).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 p-4 md:ml-60">
      <Animation animationType="scale-up">
        <div className="bg-[#161113] rounded-[20px] border border-neutral-800 w-full mx-auto mt-32 md:mt-40 max-w-[600px] p-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Transaction Successful
          </h2>

          <p className="text-neutral-300 font-light mb-6">
            Your withdrawal of{" "}
            <span className="text-white font-bold">
              {amount.toLocaleString()} STRK (${usdValue})
            </span>{" "}
            has been processed successfully.
            Funds will be sent to your wallet shortly.
          </p>

          <div className="flex justify-center my-8">
            <Animation animationType="scale-up" delay={0.3}>
              <Image src={Check} alt="check" width={80} height={100} />
            </Animation>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-[#0000FF] hover:bg-blue-700 text-white font-medium"
          >
            Back to Rewards
          </button>
        </div>
      </Animation>
    </div>
  );
};
