"use client";

import type React from "react";

import { useState } from "react";
import { Animation } from "@/motion/Animation";
import { ArrowLeft } from "lucide-react";
import type { RewardItem } from "./RewardsPage";

interface ClaimRewardsViewProps {
  rewards: RewardItem[];
  onBack: () => void;
  onContinue: (selectedRewards: RewardItem[]) => void;
}

export const ClaimRewardsView: React.FC<ClaimRewardsViewProps> = ({
  rewards,
  onBack,
  onContinue,
}) => {
  const [selectedRewards, setSelectedRewards] = useState<RewardItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRewards([]);
    } else {
      setSelectedRewards([...rewards]);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectReward = (reward: RewardItem) => {
    if (
      selectedRewards.some(
        (r) => r.id === reward.id && r.reward === reward.reward
      )
    ) {
      setSelectedRewards(
        selectedRewards.filter(
          (r) => !(r.id === reward.id && r.reward === reward.reward)
        )
      );
    } else {
      setSelectedRewards([...selectedRewards, reward]);
    }
  };

  const isSelected = (reward: RewardItem) => {
    return selectedRewards.some(
      (r) => r.id === reward.id && r.reward === reward.reward
    );
  };

  const totalAmount = selectedRewards
    .reduce((sum, reward) => {
      return sum + Number.parseFloat(reward.reward.replace("$", ""));
    }, 0)
    .toFixed(2);

  return (
    <Animation animationType="fade-in">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Rewards
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-[#1A1618] rounded-[20px] p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Claim Reward</h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Select Rewards</h3>
          <div className="border-b border-neutral-800 mb-4"></div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="select-all"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-5 h-5 rounded border-neutral-600 bg-transparent accent-blue-500"
              />
              <label htmlFor="select-all" className="ml-2">
                Select All
              </label>
            </div>
            <div className="text-right">Total: ${totalAmount}</div>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {rewards.map((reward, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`reward-${index}`}
                    checked={isSelected(reward)}
                    onChange={() => handleSelectReward(reward)}
                    className="w-5 h-5 rounded border-neutral-600 bg-transparent accent-blue-500"
                  />
                  <label htmlFor={`reward-${index}`} className="ml-2">
                    <div className="flex items-center gap-4">
                      <span>{reward.id}</span>
                      <span>{reward.projectName}</span>
                    </div>
                  </label>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-red-500">
                    Critical
                  </span>
                  <span>{reward.reward}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onContinue(selectedRewards)}
          disabled={selectedRewards.length === 0}
          className={`w-full py-3 rounded-md font-medium ${
            selectedRewards.length === 0
              ? "bg-blue-600/50 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transition-colors"
          }`}
        >
          Continue
        </button>
      </div>
    </Animation>
  );
};
