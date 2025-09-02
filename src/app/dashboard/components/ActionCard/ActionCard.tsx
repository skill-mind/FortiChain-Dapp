"use client";

import React from "react";

interface ActionCardProps {
  label: string;
  buttonText: string;
  onClick?: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ label, buttonText, onClick }) => {
  return (
    <div className="flex items-center  justify-between bg-[#1A1A1A] rounded-xl px-6 py-3 w-full max-w-md">
      <span className="text-[#E5E5E5] text-[12px]">{label}</span>
      <button
        onClick={onClick}
        className="px-6 py-1.5 rounded-full bg-[#212121] border border-[#2E2E2E] text-[#E5E5E5] text-[12px] hover:bg-[#2E2E2E] transition"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ActionCard;
