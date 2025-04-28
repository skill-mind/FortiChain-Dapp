"use client";

import type React from "react";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { RewardItem } from "./RewardsPage";
import { Animation } from "@/motion/Animation";

interface ClaimRewardsViewProps {
  rewards: RewardItem[];
  onBack: () => void;
  onContinue: (selectedRewards: RewardItem[]) => void;
}

export function ClaimRewardsView({
  rewards,
  onBack,
  onContinue,
}: ClaimRewardsViewProps) {
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
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Rewards{" "}
        </button>
      </div>
      <div className="max-w-2xl mx-auto bg-[#1C1618] border border-[#464043] rounded-[20px] p-6 ">
        <h2 className="text-2xl  font-semibold text-center mb-8">
          Claim Reward
        </h2>

        <div className="mb-8">
          <h3 className="text-base font-medium mb-4">Select Rewards</h3>
          <div className="border-b border-neutral-800 mb-4"></div>

          {/* Header row with Select All and Total */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="checkbox"
              id="select-all"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-5 h-5 rounded appearance-none border border-neutral-600 bg-transparent checked:bg-[#0000FF] checked:border-[#0000FF] relative flex-shrink-0"
              style={{
                backgroundImage: selectAll
                  ? "url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\")"
                  : "",
                backgroundSize: "100% 100%",
              }}
            />
            <label htmlFor="select-all" className="text-sm w-[80px] ml-6">
              Select All
            </label>
            <span className="text-sm flex-1"></span>
            <span className="invisible px-3 py-1 rounded-full text-xs bg-transparent flex-shrink-0">
              Critical
            </span>
            <span className="text-sm  text-right ml-8">
              Total: ${totalAmount}
            </span>
          </div>
          {/* Reward items */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-1 gap-3"
              >
                <input
                  type="checkbox"
                  id={`reward-${index}`}
                  checked={isSelected(reward)}
                  onChange={() => handleSelectReward(reward)}
                  className="w-5 h-5 rounded appearance-none border border-neutral-600 bg-transparent checked:bg-[#0000FF] checked:border-[#0000FF] relative flex-shrink-0"
                  style={{
                    backgroundImage: isSelected(reward)
                      ? "url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\")"
                      : "",
                    backgroundSize: "100% 100%",
                  }}
                />
                <span className="text-sm w-[80px] ml-3">{reward.id}</span>
                <span className="text-sm flex-1">{reward.projectName}</span>
                <span className="px-3 py-1 rounded-full text-xs bg-[#E53935] text-white flex-shrink-0">
                  Critical
                </span>
                <span className="text-sm w-[60px] text-right sm:ml-8">
                  {reward.reward}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex">
          <button
            onClick={() => onContinue(selectedRewards)}
            disabled={selectedRewards.length === 0}
            className={`py-3 px-10 rounded-md font-medium text-sm ${
              selectedRewards.length === 0
                ? "bg-[#0000FF]/50 cursor-not-allowed"
                : "bg-[#0000FF] hover:bg-[#0000FF]/90 transition-colors"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </Animation>
  );
}
