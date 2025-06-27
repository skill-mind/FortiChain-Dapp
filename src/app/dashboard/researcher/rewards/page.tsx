"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, User } from "lucide-react";
import Image from "next/image";
import { useAccount } from "@starknet-react/core"; // ✅ Import StarkNet wallet hook

export function WithdrawalRequest({
  onSubmit,
  withdrawableBalance = 11235.01,
}: {
  onSubmit: (amount: number, numAmount: number, usdEquivalent: number) => void;
  withdrawableBalance?: number;
}) {
  const [amount, setAmount] = useState("");
  const [usdEquivalent, setUsdEquivalent] = useState(0);

  const { account } = useAccount(); // ✅ Get connected account

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);
      const numValue = parseFloat(value) || 0;
      setUsdEquivalent(numValue * 0.573);
    }
  };

  const handleSubmit = () => {
    if (amount) {
      const numAmount = parseFloat(amount);
      onSubmit?.(numAmount, numAmount, usdEquivalent);
    }
  };

  const handleMaxAmount = () => {
    setAmount(withdrawableBalance.toString());
    setUsdEquivalent(withdrawableBalance * 0.573);
  };

  return (
    <div className="bg-[#110D0F] border border-gray-800 rounded-2xl p-4 sm:p-6">
      <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4">
        Recipient
      </h3>
      <div className="flex items-center">
        <User size={18} className="text-white mr-2" />
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="text-white text-base sm:text-lg font-medium">
              {account?.address
                ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
                : "Not connected"}
            </span>
            <span className="text-gray-500 sm:ml-2 text-xs sm:text-sm mt-1 sm:mt-0">
              Account Address
            </span>
          </div>
          <div className="flex items-center text-green-500 mt-1">
            <CheckCircle2 size={16} className="mr-2" />
            <span className="text-sm">Valid Address</span>
          </div>
        </div>
      </div>

      <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4 mt-6">
        Amount
      </h3>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter Withdrawal Amount"
          className="flex-1 min-w-0 bg-transparent text-white text-xl placeholder:text-gray-600 font-medium outline-none py-2"
        />
        <button className="bg-white text-black rounded-lg px-2 py-1 w-fit sm:px-3 sm:w-28 text-md sm:text-sm flex items-center justify-center">
          <Image
            src="/token-branded_starknet.svg"
            alt="strk logo"
            width={18}
            height={18}
            className="mr-1"
          />
          <span className="font-medium">STRK</span>
          <ChevronDown size={18} className="ml-1" />
        </button>
      </div>

      <div className="flex justify-between items-center mt-3 sm:mt-4">
        <div className="text-gray-500 text-sm sm:text-base">
          {amount && parseFloat(amount) > 0
            ? `Approx. $${usdEquivalent.toFixed(2)}`
            : ""}
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="invisible">Placeholder</div>
          <div className="text-gray-500 text-sm sm:text-base">
            Escrow Balance: {withdrawableBalance.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={!amount || parseFloat(amount) <= 0}
          className={`w-full ${
            !amount || parseFloat(amount) <= 0
              ? "bg-gray-800 cursor-not-allowed"
              : "bg-[#0000FF] hover:bg-[#1100ff]"
          } text-white font-medium py-3 sm:py-4 rounded-lg transition-colors text-lg sm:text-xl`}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}
