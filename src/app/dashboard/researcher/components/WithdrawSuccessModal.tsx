"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

interface WithdrawSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  toAddress: string;
  transactionId: string;
}

const WithdrawSuccessModal: React.FC<WithdrawSuccessModalProps> = ({
  isOpen,
  onClose,
  amount,
  toAddress,
  transactionId,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTransactionId = (txId: string) => {
    return `${txId.slice(0, 6)}...${txId.slice(-5)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#101011] flex flex-col gap-6 rounded-lg w-full md:min-w-[509px] max-w-lg mx-4"
      >
        {/* Header with background pattern */}
        <div className="relative p-6 md:p-16 w-full"
          style={{
            backgroundImage: "url(/modal-hero.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative z-10 flex justify-center mb-6"
          >
            <Image src="/CheckFat.svg" alt="check" width={32} height={32} />
          </motion.div>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[#E2E2E2] mb-3 relative z-10"
            >
              Withdrawal Successful
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[#6C6C6C] text-xs relative z-10"
            >
              Your withdrawal has been processed and is being sent to your wallet.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className=""
          >
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[#6C6C6C]">Amount</span>
                <span className="text-white">
                  {formatCurrency(amount)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#6C6C6C]">To Address</span>
                <span className="text-white font-mono">
                  {formatAddress(toAddress)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#6C6C6C]">Transaction ID</span>
                <span className="text-white font-mono">
                  {formatTransactionId(transactionId)}
                </span>
              </div>
            </div>
          </motion.div>


          {/* Warning Message */}
          <div className="border border-[#373510] rounded-lg p-6">
            <p className="text-[#E2E2E2] text-sm leading-6">
              Your withdrawal typically takes 5-15 minutes to appear in your wallet.
              You can track the transaction using the ID above.
            </p>
          </div>

          {/* Return Button */}
          <button
            onClick={onClose}
            className="bg-[#1C1C1C]  border border-[#464043] text-white hover:bg-[#464043] transition-colors px-4 py-5 rounded-full text-sm w-full"
          >
            Return to dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WithdrawSuccessModal;
