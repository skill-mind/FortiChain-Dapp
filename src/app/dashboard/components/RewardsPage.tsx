"use client";

import { useState } from "react";

import { Animation } from "@/motion/Animation";
import { ClaimRewardsView } from "./ClaimRewardsView";
import { RewardsStats } from "./RewardsStats";
import { RewardsTable } from "./RewardsTable";
import { ConfirmClaimView } from "./ConfirmClaimView";
import { TransactionSuccessModal } from "./TransactionSuccessModal";
import { useAccount } from "@starknet-react/core";

export type RewardItem = {
  id: string;
  projectName: string;
  severity: "Critical" | "High" | "Low";
  validationDate: string;
  reward: string;
  status: "Paid" | "Pending";
};

type View = "main" | "claim" | "confirm";

const truncateAddress = (address?: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const RewardsPage = () => {
  const [currentView, setCurrentView] = useState<View>("confirm");
  const { isConnected, address } = useAccount();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRewards, setSelectedRewards] = useState<RewardItem[]>([]);

  const rewardsData: RewardItem[] = [
    {
      id: "#243553",
      projectName: "FortiChain Security",
      severity: "Critical",
      validationDate: "29-02-2025",
      reward: "$50.13",
      status: "Paid",
    },
    {
      id: "#243553",
      projectName: "FortiChain Security",
      severity: "High",
      validationDate: "29-02-2025",
      reward: "$33.56",
      status: "Pending",
    },
    {
      id: "#243553",
      projectName: "FortiChain Security",
      severity: "High",
      validationDate: "29-03-2025",
      reward: "$400.56",
      status: "Pending",
    },
    {
      id: "#243553",
      projectName: "FortiChain Security",
      severity: "Low",
      validationDate: "29-02-2025",
      reward: "$13.12",
      status: "Paid",
    },
  ];

  const handleClaimRewards = () => {
    setCurrentView("claim");
  };

  const handleBackToMain = () => {
    setCurrentView("main");
  };

  const handleContinueToClaim = (selected: RewardItem[]) => {
    setSelectedRewards(selected);
    setCurrentView("confirm");
  };

  const handleBackToClaim = () => {
    setCurrentView("claim");
  };

  const handleConfirmClaim = () => {
    setShowSuccessModal(true);
  };

  const handleBackToRewards = () => {
    setShowSuccessModal(false);
    setCurrentView("main");
  };

  // Render the appropriate view based on the current state
  const renderView = () => {
    switch (currentView) {
      case "main":
        return (
          <Animation animationType="fade-in" key="main-view">
            <div className="mt-8">
              <RewardsStats
                totalEarnings="$5250.11"
                availableForWithdrawal="$250.11"
                onClaimRewards={handleClaimRewards}
              />
            </div>

            <div className="mt-8">
              <RewardsTable rewards={rewardsData} onViewClick={() => {}} />
            </div>
          </Animation>
        );
      case "claim":
        return (
          <ClaimRewardsView
            key="claim-view"
            rewards={rewardsData.filter((r) => r.status === "Pending")}
            onBack={handleBackToMain}
            onContinue={handleContinueToClaim}
          />
        );
      case "confirm":
        return (
          <ConfirmClaimView
            key="confirm-view"
            amount="$67.23"
            tokenAmount="254.32 STRK"
            recipientAddress={truncateAddress(address)}
            onBack={handleBackToClaim}
            onConfirm={handleConfirmClaim}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen  text-white p-4 md:p-6">
      {renderView()}

      {showSuccessModal && (
        <TransactionSuccessModal
          amount="5,321.11 STRK"
          dollarAmount="$234.11"
          onBackToPayouts={handleBackToRewards}
        />
      )}
    </div>
  );
};
