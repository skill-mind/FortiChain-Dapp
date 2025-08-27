import React from "react";

function OverviewCardExpandable({
  stat,
  children,
}: {
  stat: {
    label: string;
    value: string;
    progression: string;
    icon: React.ReactNode;
  };
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-[#101011] rounded-lg  text-[#E2E2E2] flex flex-col gap-y-6">
      <div className="flex justify-between">
        <div>
          <h3 className="capitalize text-base mb-[27px]">{stat.label}</h3>

          <h2 className="text-[24px] mb-2">{stat.value}</h2>

          <div className="bg-[#153710] rounded-full py-1 px-3 text-[#1BC100] text-xs w-fit">
            {stat.progression}
          </div>
        </div>

        <div className="text-[#6C6C6C] w-fit">{stat.icon}</div>
      </div>
      {children}
    </div>
  );
}

export default OverviewCardExpandable;
