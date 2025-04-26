"use client";

import { useState } from "react";
import { Animation } from "@/motion/Animation";
import { Wallet, DollarSign, History, ArrowLeft } from "lucide-react";
import { RecentEarnings } from "@/components/dashboard/Recent-earnings";
import { TransactionSuccessModal } from "@/components/dashboard/Transaction-success-modal";
import { WithdrawalHistory } from "@/components/dashboard/Withdrawal-history";
import { WithdrawalHistoryModal } from "@/components/dashboard/Withdrawal-history-modal";
import { WithdrawalRequest } from "@/components/dashboard/Withdrawal-request";
import { StatCard } from "../../components/resuables/StatsCard";

export default function RewardPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"rewards" | "withdraw">("rewards");

  const handleWithdrawalSubmit = (amount: number) => {
    setWithdrawalAmount(amount);
    setShowSuccessModal(true);
  };

  return (
    <div className="flex flex-col gap-6 md:p-6">
      {activeTab === "rewards" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Animation delay={0.2} animationType="slide-up">
              <StatCard
                icon={<Wallet className="w-6 h-6 text-white" />}
                value="2,500 STRK"
                label="Total Rewards Earned:"
              />
            </Animation>

            <Animation delay={0.3} animationType="slide-up">
              <StatCard
                icon={<DollarSign className="w-6 h-6 text-white" />}
                value="150 STRK"
                label="Pending Withdrawal"
              />
            </Animation>

            <Animation delay={0.4} animationType="slide-up">
              <button
                className="p-5 bg-[#0000FF] rounded-[20px] w-full h-full border-[0.5px] border-[#464043] cursor-pointer flex items-center justify-center gap-5"
                onClick={() => setActiveTab("withdraw")}
              >
                <span className="text-2xl font-bold text-white">
                  Withdraw Funds
                </span>
                <span className="text-white text-xl">→</span>
              </button>
            </Animation>
          </div>

          <Animation delay={0.5} animationType="slide-up">
            <div className="flex justify-end items-center mt-5 mb-5">
              <button
                className="flex gap-2 items-center text-white cursor-pointer"
                onClick={() => setShowHistoryModal(true)}
              >
                <History className="w-5 h-5" />
                <span>View Withdrawal History</span>
              </button>
            </div>
            <RecentEarnings />
          </Animation>
        </>
      ) : (
        <Animation delay={0.2} animationType="fade-in">
          <div className="flex flex-col gap-6">
            <button
              onClick={() => setActiveTab("rewards")}
              className="flex items-center gap-3 text-white cursor-pointer"
            >
              <ArrowLeft />
              <span>Go Back</span>
            </button>
            <WithdrawalRequest onSubmit={handleWithdrawalSubmit} />
            <WithdrawalHistory />
          </div>
        </Animation>
      )}

      {showSuccessModal && withdrawalAmount && (
        <TransactionSuccessModal
          amount={withdrawalAmount}
          onClose={() => {
            setShowSuccessModal(false);
            setActiveTab("rewards");
          }}
        />
      )}

      {showHistoryModal && (
        <WithdrawalHistoryModal onClose={() => setShowHistoryModal(false)} />
      )}
    </div>
  );
}
