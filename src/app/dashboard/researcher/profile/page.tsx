"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import ProfileStats from "../components/ProfileStats";
import WithdrawalHistory from "../components/WithdrawalHistory";
import WithdrawModal from "../components/WithdrawModal";
import WithdrawSuccessModal from "../components/WithdrawSuccessModal";
import { useAccount } from "@starknet-react/core";

const Profile = () => {
  const { address } = useAccount();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successData, setSuccessData] = useState({
    amount: 0,
    transactionId: "",
    toAddress: "",
  });


  const profileData = {
    bountyReward: 9650,
    paidOut: 5000,
    availableForWithdrawal: 3650,
  };

  const handleWithdraw = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleWithdrawSuccess = (amount: number, transactionId: string, toAddress: string) => {
    setSuccessData({ amount, transactionId, toAddress });
    setIsWithdrawModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-auto p-3 md:p-6 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Wallet Information */}
        {/* <WalletInfo /> */}

        {/* Profile Stats Cards */}
        <ProfileStats
          bountyReward={profileData.bountyReward}
          paidOut={profileData.paidOut}
          availableForWithdrawal={profileData.availableForWithdrawal}
          onWithdraw={handleWithdraw}
        />

        {/* Withdrawal History */}
        <WithdrawalHistory />

        {/* Withdraw Modal */}
        <WithdrawModal
          isOpen={isWithdrawModalOpen}
          onClose={() => setIsWithdrawModalOpen(false)}
          onSuccess={handleWithdrawSuccess}
          availableBalance={profileData.availableForWithdrawal}
          walletAddress={address}
        />

        {/* Success Modal */}
        <WithdrawSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleCloseSuccessModal}
          amount={successData.amount}
          toAddress={successData.toAddress}
          transactionId={successData.transactionId}
        />
      </div>
    </motion.section>
  );
};

export default Profile;
