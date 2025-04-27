import React from "react";
import { Animation } from "@/motion/Animation";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  iconBgColor?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  //   iconBgColor = "bg-neutral-800",
}) => {
  return (
    <div className="p-5 bg-[#110D0F] rounded-[20px] border border-neutral-800 cursor-pointer">
      <Animation delay={0.2} animationType="slide-up">
        <div className={`w-10 h-10   flex items-center`}>{icon}</div>
      </Animation>
      <Animation delay={0.4} animationType="slide-up">
        <div className="text-[28px] font-bold text-white mb-1">{value}</div>
      </Animation>

      <Animation delay={0.6} animationType="slide-up">
        <div className="text-[14px] font-thin text-neutral-400">{label}</div>
      </Animation>
    </div>
  );
};
