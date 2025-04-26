// ActivityItem.tsx
import { Check } from "lucide-react";
import React from "react";
import { Animation } from "@/motion/Animation";

interface ActivityItemProps {
  title: string;
  subtitle: string;
  timestamp: string;
  isLast?: boolean;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  subtitle,
  timestamp,
  isLast = false,
}) => {
  return (
    <Animation delay={0.2} animationType="slide-up">
      <div className="flex">
        {/* Timeline connector */}
        <div className="relative flex flex-col items-center mr-4">
          <div className="rounded-full  bg-[#AAAAFF] hover:bg-[#5555ba] cursor-pointer  w-6 h-6 flex items-center justify-center z-10">
            <Check color="black" size={15} />
          </div>
          {!isLast && (
            <div className="h-[260px] w-px bg-neutral-700 absolute top-6"></div>
          )}
        </div>

        {/* Content */}
        <div className="pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <h4 className="font-thin text-[18px] text-white">{title}</h4>
            <span className="p-[2px] bg-[#8080FF] rounded-full"></span>{" "}
            <span className="text-[10px] text-neutral-500">{timestamp}</span>
          </div>
          <p className="text-sm text-neutral-400 mt-1 text-[11px]">
            {subtitle}
          </p>
        </div>
      </div>
    </Animation>
  );
};
