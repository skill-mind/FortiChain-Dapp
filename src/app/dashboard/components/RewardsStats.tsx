"use client";

import type React from "react";
import { Animation } from "@/motion/Animation";
import { Wallet, DollarSign, ArrowRight } from "lucide-react";
import imgFour from "../../../../public/validatorIcons/valImgFour.svg";

import Image from "next/image";
import StatsCard from "@/components/dashboard/projects/StatsCard";

interface RewardsStatsProps {
  totalEarnings: string;
  availableForWithdrawal: string;
  onClaimRewards: () => void;
}

export function RewardsStats({
  totalEarnings,
  availableForWithdrawal,
  onClaimRewards,
}: RewardsStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        icon={<Image src={imgFour} alt={"icon"} height={30} width={30} />}
        value={totalEarnings}
        label="Total Earnings"
      />

      <StatsCard
        icon={<Image src={imgFour} alt={"icon"} height={30} width={30} />}
        value={availableForWithdrawal}
        label="Available for Withdrawal"
      />

      <Animation delay={0.6} animationType="slide-up">
        <button
          onClick={onClaimRewards}
          className="h-full w-full bg-[#0000FF] border border-white transition-colors rounded-[20px] flex items-center justify-center gap-2 text-white font-medium p-5"
        >
          <span>Claim Rewards</span>
          <ArrowRight size={20} />
        </button>
      </Animation>
    </div>
  );
}
