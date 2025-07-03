"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FundModal from "@/app/dashboard/components/payoutComponents/FundModal";
import SuccessModal from "@/app/dashboard/components/payoutComponents/SuccessModal";
import WithdrawSuccessModal from "../../components/payoutComponents/WithdrawSuccessModal";
import WithdrawModal from "@/app/dashboard/components/payoutComponents/WithdrawModal";
import TransactionTable from "@/app/dashboard/components/payoutComponents/TransactionTable";
import { motion } from "framer-motion";

import Image from "next/image";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import {useAccount} from "@starknet-react/core"

export default function PayoutPage() {
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isWithdrawSuccessModalOpen, setIsWithdrawSuccessModalOpen] =
    useState(false);
  const [successData, setSuccessData] = useState({
    amount: 0,
    strk: 0,
    usd: 0,
  });

  const { balance: walletBalance, symbol } = useTokenBalance();

  const handleFundEscrow = (amount: number, strk: number, usd: number) => {
    setIsEscrowModalOpen(false);
    setSuccessData({ amount, strk, usd });
    setIsSuccessModalOpen(true);
  };

  const handleWithdraw = (amount: number, strk: number, usd: number) => {
    setIsWithdrawModalOpen(false);
    setSuccessData({ amount, strk, usd });
    setIsWithdrawSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleCloseWithdrawSuccessModal = () => {
    setIsWithdrawSuccessModalOpen(false);
  };
  const {address} = useAccount()

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen bg-[#211a1d] text-white">
      <motion.div
        className="container mx-auto px-4 py-8 w-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <div className="flex overflow-x-auto pb-2 gap-4 mb-4 scrollbar-hide">
          <motion.button
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setIsEscrowModalOpen(true)}
            className="flex items-center gap-3 border border-[#464043] text-white font-medium py-3 px-4 rounded-lg transition-colors min-w-max"
          >
            <Image
              src="/Frame 1171276651.svg"
              alt="svgIMG"
              width={40}
              height={40}
            />

            <div className="flex flex-col text-left ml-1">
              <span className="text-s font-medium">Fund Escrow</span>{" "}
              <span className="text-xs text-gray-300 mt-1">
                Securely deposit bounty rewards from your wallet.
              </span>{" "}
            </div>
          </motion.button>

          <motion.button
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setIsWithdrawModalOpen(true)}
            className="flex items-center gap-3 border border-[#464043] text-white font-medium py-3 px-4 rounded-lg transition-colors min-w-max"
          >
            <Image
              src="/Frame 1171276651 (1).svg"
              alt="svgIMG"
              width={40}
              height={40}
            />

            <div className="flex flex-col text-left ml-1">
              <span className="text-s font-medium">
                Withdraw Available Funds
              </span>{" "}
              <span className="text-xs text-gray-300 mt-1">
                Transfer available funds to your wallet
              </span>{" "}
            </div>
          </motion.button>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {/* Card 1: Withdrawable Escrow */}
          <motion.div
            className="bg-[#110d0f] rounded-3xl p-6 border border-[#464043]"
            variants={cardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center w-10 h-10 mb-2">
              <Image
                src="/uil_money-withdrawal.svg"
                alt="money"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-bold">$243.21</h2>
            <p className="text-gray-300 mt-2">Withdrawable Escrow</p>
          </motion.div>

          {/* Card 2: Locked Bounties */}
          <motion.div
            className="bg-[#110d0f] rounded-3xl p-6 border border-[#464043]"
            variants={cardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center w-10 h-10 mb-2">
              <Image
                src="/mdi_cash-lock.svg"
                alt="money"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-bold">$5,257.12</h2>
            <p className="text-gray-300 mt-2">Locked Bounties</p>
          </motion.div>

          {/* Card 3: Wallet Balance */}
          <motion.div
            className="bg-[#110d0f] rounded-3xl p-6 border border-[#464043]"
            variants={cardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center w-10 h-10 mb-2">
              <Image
                src="/solar_wallet-bold.svg"
                alt="money"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-bold">$2,523.34</h2>
            <p className="text-gray-300 mt-2 flex justify-between items-center">
              Wallet Balance <span className="text-xs text-white">STRK</span>
            </p>
          </motion.div>

          {/* Card 4: Total Bounties Paid */}
          <motion.div
            className="bg-[#110d0f] rounded-3xl p-6 border border-[#464043]"
            variants={cardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center w-10 h-10 mb-2">
              <Image
                src="/healthicons_money-bag.svg"
                alt="money"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-bold">$2,523.34</h2>
            <p className="text-gray-300 mt-2">Total Bounties Paid</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-[#161113] border border-[#464043] rounded-lg p-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Transaction History</h2>
            <div className="flex items-center px-8 py-2 rounded-lg border border-[#464043] w-auto">
              <span>All</span>
              <ChevronDown size={22} className="ml-1" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <TransactionTable />
          </div>
        </motion.div>
      </motion.div>

      {isEscrowModalOpen && (
        <FundModal
          onClose={() => setIsEscrowModalOpen(false)}
          onSubmit={handleFundEscrow}
          walletBalance={walletBalance}
          tokenSymbol={symbol || "STRK"}
        />
      )}

      {isWithdrawModalOpen && (
        <WithdrawModal
          onClose={() => setIsWithdrawModalOpen(false)}
          onSubmit={handleWithdraw}
          withdrawableBalance={243.21}
          walletAddress={ address ?? ""}
        />
      )}

      {isSuccessModalOpen && (
        <SuccessModal
          onClose={handleCloseSuccessModal}
          amount={successData.strk}
          usdAmount={successData.usd}
        />
      )}

      {isWithdrawSuccessModalOpen && (
        <WithdrawSuccessModal
          onClose={handleCloseWithdrawSuccessModal}
          amount={successData.strk}
          usdAmount={successData.usd}
        />
      )}
    </div>
  );
}
