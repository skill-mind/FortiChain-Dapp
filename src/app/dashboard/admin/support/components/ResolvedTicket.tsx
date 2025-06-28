"use client";

import Image from "next/image";
import pdf from "../../../../../../public/adminIcon/pdf.svg";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface ResolvedTicketProps {
  onClose: () => void;
}

export default function ResolvedTicket({ onClose }: ResolvedTicketProps) {
  const contentVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-[#161113] border border-neutral-800 rounded-lg p-6 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-[24px] sm:text-xl font-semibold text-white">
              Issue with MetaConnect Wallet - Transaction Stuck
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white ml-4"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-2 mb-10 mt-5">
          <button className="bg-green-600 text-white px-3 py-1 rounded-[40px] text-sm sm:text-base hover:bg-green-700">
            Resolved
          </button>
          <button className="bg-[#161113] border border-neutral-800 text-white px-3 py-1 rounded-[40px] text-sm sm:text-base hover:bg-gray-500">
            Vulnerability Reports
          </button>
        </div>

        <motion.div
          className="text-gray-300 text-sm sm:text-base mb-4"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="mb-6" variants={itemVariants}>
            Hello Support Team,
          </motion.p>
          <motion.p className="mb-4" variants={itemVariants}>
            I tried sending ETH from my MetaConnect Wallet to another address,
            but the transaction has been stuck as "pending" for over an hour. I
            used the recommended gas fees, but it still hasn't gone through. My
            wallet address is 0x1234abcd5678efgh9012jklmnopqrstuvwx, and the
            transaction hash is
            0xa1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef.
          </motion.p>
          <motion.p variants={itemVariants}>
            I've tried refreshing and reconnecting my wallet, but the issue
            persists. Can you help me resolve this?
          </motion.p>
        </motion.div>

        <motion.div
          className="mb-4"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-gray-300 text-sm sm:text-base mb-2"
            variants={itemVariants}
          >
            2 attachments
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <motion.div
              variants={itemVariants}
              className="overflow-hidden rounded-lg"
            >
              <Image
                src={pdf}
                alt="PDF Icon"
                width={250}
                height={250}
                className=" hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className=" overflow-hidden rounded-lg"
            >
              <Image
                src={pdf}
                alt="PDF Icon"
                width={250}
                height={250}
                className=" hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>
        </motion.div>

        <hr className="bg-[#161113] border border-neutral-800 my-6" />

        <h3 className="text-gray-300 text-sm sm:text-base font-semibold mb-4">
          Your Reply
        </h3>
        <div className="bg-[#161113] border border-neutral-800 rounded-md p-4 mb-4">
          <p className="text-gray-300 text-sm sm:text-base">
            Thank you for reaching out. We've looked into your transaction, and
            it appears to be stuck due to low gas fees or network congestion.
            Here's what you can do to resolve it:
          </p>
          <ul className="list-disc list-inside text-gray-300 text-sm sm:text-base mt-2">
            <li>
              Speed Up the Transaction - If your wallet allows, try increasing
              the gas fee and resubmitting the transaction.
            </li>
          </ul>
          <p className="text-gray-300 text-sm sm:text-base mt-2">
            If you need assistance with these steps, let us know. We're happy to
            guide you through the process!
          </p>
        </div>

        <div className="flex mt-6">
          <button
            onClick={onClose}
            className="bg-[#6B6668] text-gray-400 px-4 py-2 rounded-md text-sm sm:text-base hover:bg-gray-500"
          >
            Ticket Closed
          </button>
        </div>
      </div>
    </div>
  );
}
