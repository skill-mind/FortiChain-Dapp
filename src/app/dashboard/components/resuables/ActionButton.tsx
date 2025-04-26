// ActionButton.tsx
import React from "react";
import Link from "next/link";
import { Animation } from "@/motion/Animation";

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
  return (
    <Link
      href={href}
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
    </Link>
  );
};
