// src/app/dashboard/payout/components/FundEscrowModal.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ChevronDown } from "lucide-react";

interface FundModalProps {
  onClose: () => void;
  onSubmit: (amount: number, strk: number, usd: number) => void;
  walletBalance: number;
  tokenSymbol: string;
}

export default function FundModal({
  onClose,
  onSubmit,
  walletBalance,
  tokenSymbol,
}: FundModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [usdEquivalent, setUsdEquivalent] = useState<number>(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);

      // Calculate USD equivalent (assuming conversion rate)
      const numValue = parseFloat(value) || 0;
      setUsdEquivalent(numValue * 0.573); // Example conversion rate
    }
  };

  const handleNextStep = () => {
    if (amount && parseFloat(amount) > 0) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (amount) {
      const numAmount = parseFloat(amount);
      onSubmit(numAmount, numAmount, usdEquivalent);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-[#211a1d] bg-opacity-80 backdrop-blur-md"></div>
      <button
        onClick={onClose}
        className="absolute top-6 left-6 text-gray-300 hover:text-white flex items-center z-20"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span>Back to Payouts</span>
      </button>
      <div className="relative bg-[#1b1618] border border-[#464043] rounded-2xl py-8 px-8 w-[90%] max-w-2xl z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">Fund Escrow</h2>
        </div>

        {step === 1 && (
          <div>
            <div className="mb-6 border bg-[#100d0e] rounded-lg border-[#464043] p-6">
              <label className="block text-white font-semibold mb-2">
                You Pay
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter Project Bounty Amount"
                  className="w-full bg-[#100d0e] text-white pt-4 text-xl placeholder:text-gray-600 placeholder:tracking-wide outline-none"
                />
                <hr className="my-4 border-gray-600" />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <button className="bg-white text-black rounded-lg px-3 py-1 flex items-center">
                    <Image
                      src="/token-branded_starknet.svg"
                      alt="strk logo"
                      width={20}
                      height={20}
                      className="mr-1"
                    />
                    <span className="font-medium uppercase">{tokenSymbol}</span>
                    <ChevronDown size={20} className="ml-1" />
                  </button>
                </div>
              </div>
              <div className="text-right text-gray-400 mt-2">
                Wallet Balance: {walletBalance.toLocaleString()}
              </div>
            </div>

            <button
              onClick={handleNextStep}
              disabled={
                !amount ||
                parseFloat(amount) <= 0 ||
                parseFloat(amount) > walletBalance
              }
              className={`w-full ${
                !amount ||
                parseFloat(amount) <= 0 ||
                parseFloat(amount) > walletBalance
                  ? "bg-gray-800 cursor-not-allowed"
                  : "bg-[#0000FF] hover:bg-[#1100ff] "
              } text-white font-medium py-4 rounded-lg transition-colors text-xl`}
            >
              Deposit
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-8">
              <div className="bg-[#121010] rounded-2xl p-6">
                <label className="block text-white font-semibold mb-4">
                  You Pay
                </label>
                <div className="flex justify-between items-center mb-6 p-2 border-b border-gray-600">
                  <div className="text-4xl font-bold text-white">{amount}</div>
                  <button className="bg-white text-black rounded-lg px-3 py-1 flex items-center">
                    <Image
                      src="/token-branded_starknet.svg"
                      alt="strk logo"
                      width={20}
                      height={20}
                    />
                    <span className="font-medium">STRK</span>
                    <ChevronDown size={20} className="ml-1" />
                  </button>
                </div>

                <div className="flex justify-between text-gray-400">
                  <div>Approx. ${usdEquivalent.toFixed(2)}</div>
                  <div>Wallet Balance: {walletBalance.toLocaleString()}</div>
                </div>
                <div className="text-gray-400 mt-3">
                  Gas Fee: 0.0001 STRK ($0.0001)
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#0000FF] hover:bg-[#1100ff] text-white font-medium py-4 rounded-lg transition-colors text-xl"
            >
              Deposit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
