"use client";
import React, { useState } from "react";

function AuditStats() {
  const [accuracy] = useState("92.42");
  return (
    <div className="flex flex-col gap-y-3 text-[#E2E2E2]">
      <h4 className=" text-white">Audit Stats</h4>
      <div className="bg-[#1C1C1C] rounded-lg p-6 min-h-[150px]">
        <h3 className="mb-6">Overall Accuracy</h3>

        <h2 className="mb-2 text-xl">{accuracy}%</h2>
        <div className="bg-[#3D3636] h-[6px] rounded-full w-full">
          <div
            className={`h-full rounded-full bg-[#0073E6]`}
            style={{ width: `${accuracy}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-[#1C1C1C] rounded-lg p-6 min-h-[150px]">
        <h3 className="mb-6">Total Votes</h3>

        <h2 className="mb-2 text-xl">4</h2>
        <p className="text-[#6C6C6C]">1 pending review</p>
      </div>
      <div className="bg-[#1C1C1C] rounded-lg p-6 min-h-[150px]">
        <h3 className="mb-6">Success Rate</h3>

        <h2 className="mb-2 text-xl">5/5</h2>
      </div>
    </div>
  );
}

export default AuditStats;
