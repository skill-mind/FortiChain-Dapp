"use client";
import React, { useState } from "react";

function ReportsApproved() {
  const [score] = useState("92.42");
  return (
    <div className="flex flex-col gap-y-3 text-[#E2E2E2]">
      <h4 className=" text-white">Report Stats</h4>
      <div className="bg-[#1C1C1C] rounded-lg p-6 min-h-[150px]">
        <h3 className="mb-6">Report Score</h3>

        <h2 className="mb-2 text-xl">{score}%</h2>
        <div className="bg-[#3D3636] h-[6px] rounded-full w-full">
          <div
            className={`h-full rounded-full bg-[#0073E6]`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-[#1C1C1C] rounded-lg p-6 min-h-[150px]">
        <h3 className="mb-6">Total Reports</h3>

        <h2 className="mb-2 text-xl">4</h2>
        <p className="text-[#6C6C6C]">1 pending review</p>
      </div>
      <div className="bg-[#1C1C1C] rounded-lg p-6 min-h-[150px]">
        <h3 className="mb-6">Approval Rate</h3>

        <h2 className="mb-2 text-xl">3/4</h2>
        <p className="text-[#6C6C6C]">Correct Report</p>
      </div>
    </div>
  );
}

export default ReportsApproved;
