"use client";

import type React from "react";
import { useState } from "react";
import { Animation } from "@/motion/Animation";
import { ChevronDown,  CircleCheck, User } from "lucide-react";
import Image from "next/image";
import CoinBag from "../../../public/researcherIcon/moneyBag.svg";
import Starknet from "../../../public/researcherIcon/starknet.svg";

interface WithdrawalRequestProps {
  onSubmit: (amount: number) => void;
}

export const WithdrawalRequest: React.FC<WithdrawalRequestProps> = ({
  onSubmit,
}) => {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("STRK");
  const [address, setAddress] = useState("0x0596...0f3");
  const [isAddressValid, setIsAddressValid] = useState(true);
  const availableBalance = 2500;
  const minimumWithdrawal = 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      Number.parseFloat(amount) >= minimumWithdrawal &&
      Number.parseFloat(amount) <= availableBalance
    ) {
      onSubmit(Number.parseFloat(amount));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Animation delay={0.2} animationType="slide-up">
        <div className="bg-[#110D0F] rounded-[20px] border border-[#464043] p-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-col">
              <Image
                src={CoinBag}
                alt="moneybag"
                width={100}
                height={100}
                className="w-8"
              />
              <span className="text-white text-2xl font-bold">2,500</span>
              <p className="text-neutral-400 text-sm">
                Available For Withdrawal
              </p>
            </div>

            <div className="flex items-center gap-1 bg-black border border-neutral-800 rounded-lg px-3 py-1">
              <span className="text-white text-sm">Token:</span>
              <span className="text-white text-sm font-bold">STRK</span>
              <ChevronDown className="w-4 h-4 text-white ml-1" />
            </div>
          </div>
        </div>
      </Animation>

      <Animation delay={0.3} animationType="slide-up">
        <div className="bg-[#161113] rounded-[20px] border border-[#464043] overflow-hidden md:px-10 py-5">
          <div className="pb-5">
            <h2 className="text-xl font-semibold text-white text-center">
              Withdrawal Request
            </h2>
            <div className="border-t border-neutral-800 my-4"></div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="px-5 pb-5 w-full md:max-w-2xl md:mx-auto"
          >
            <div className="mb-6">
              <div className="bg-[#110D0F] rounded-[20px] p-6 border border-[#464043]">
                <label className="block text-white mb-2 text-lg">
                  Recepient
                </label>
                <div className="flex items-start gap-2 mt-5">
                  <User className="w-8 h-8" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white text-xl">{address}</span>
                      <span className="text-[#6B6668] text-[10px]">
                        Account Address
                      </span>
                    </div>
                    {isAddressValid && (
                      <div className="flex items-center gap-1 text-[#01A901]">
                        <CircleCheck className="w-4 h-4" />
                        <span className="text-base">Valid Address</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className=" bg-[#110D0F] rounded-[20px] p-6 border border-[#464043]">
              <label className="block text-white text-sm mb-2">
                Enter Withdrawal Amount:
              </label>
              <div className="flex flex-col md:flex-row gap-4 md:gap-2">
                <div className="relative bg-[#161113] border border-[#D3D1D2] px-1.5 py-1.5 rounded-lg flex items-center">
                  <Image
                    src={Starknet}
                    alt="strk icon"
                    width={100}
                    height={100}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 "
                  />
                  <select
                    className="appearance-none bg-white text-black rounded-lg py-0.5 pl-9 pr-6  outline-none w-full md:w-28"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  >
                    <option value="STRK">STRK</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 pointer-events-none" />
                </div>

                <input
                  type="tel"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-[#161113] border border-[#D3D1D2] rounded-lg py-3 px-4 text-white outline-none"
                />
              </div>
              <p className="text-sm text-neutral-400 mt-2">
                Minimum Withdrawal Amount:{" "}
                <span className="text-[#0000FF]">{minimumWithdrawal} STRK</span>
              </p>

              <button
                type="submit"
                disabled={
                  Number.parseFloat(amount) < minimumWithdrawal ||
                  Number.parseFloat(amount) > availableBalance
                }
                className={`w-full mt-8 py-3 rounded-lg text-white font-medium ${
                  Number.parseFloat(amount) >= minimumWithdrawal &&
                  Number.parseFloat(amount) <= availableBalance
                    ? "bg-[#0000FF] hover:bg-blue-700"
                    : "bg-[#0000FF]/50 cursor-not-allowed"
                }`}
              >
                Submit Withdrawal Request
              </button>
            </div>
          </form>
        </div>
      </Animation>
    </div>
  );
};
