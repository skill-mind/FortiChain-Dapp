"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Animation } from "@/motion/Animation";
import WithdrawModal from "../payoutComponents/WithdrawModal";

interface ActionButtonProps {
  id: string | number;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  iconBgColor?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  id,
  icon,
  title,
  description,
  href,
  iconBgColor = "bg-[#0000FF]",
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (
    amount: number,
    numAmount: number,
    usdEquivalent: number
  ) => {
    // Handle the withdrawal submission here
    console.log({ amount, numAmount, usdEquivalent });
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-3 p-4 bg-none hover:bg-[#110D0F] rounded-lg border border-[#464043] transition-all"
      >
        <Animation delay={0.2 * Number(id)} animationType="slide-up">
          <div
            className={`p-2 rounded-md text-white flex items-center justify-center ${iconBgColor}`}
          >
            {icon}
          </div>
        </Animation>
        <Animation delay={0.3 * Number(id)} animationType="slide-up">
          <div className="flex flex-col">
            <h3 className="font-medium text-[16px] text-white">{title}</h3>
            <p className="text-[12px] text-neutral-400">{description}</p>
          </div>
        </Animation>
      </button>

      {showModal && (
        <WithdrawModal onClose={handleClose} onSubmit={handleSubmit}  />
      )}
    </>
  );
};
