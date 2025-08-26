import React from "react";

function StatCard({
  stat,
}: {
  stat: {
    label: string;
    value: string;
    icon: React.ReactNode;
    progression: string;
  };
}) {
  return (
    <div className="p-6 bg-[#101011] rounded-lg flex justify-between text-[#E2E2E2]">
      <div>
        <h3 className="capitalize text-base mb-[27px]">{stat.label}</h3>

        <h2 className="text-[24px] mb-2">{stat.value}</h2>

        <div className="bg-[#153710] rounded-full py-1 px-3 text-[#1BC100] text-xs">
          {stat.progression}
        </div>
      </div>

      <div className="text-[#6C6C6C]">{stat.icon}</div>
    </div>
  );
}

export default StatCard;
