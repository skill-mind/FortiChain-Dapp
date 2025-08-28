"use client";
import React, { useState } from "react";

function PerformanceSnapshot() {
  const [reputation] = useState("91");
  return (
    <div className="flex flex-col gap-y-3 text-[#E2E2E2]">
      <h4 className=" text-white">Performance Snapshot</h4>
      <div className="bg-[#1C1C1C] rounded-lg p-6 min-h-[150px]">
        <h3 className="mb-6">Rank</h3>

        <h2 className="mb-2 text-xl">#23</h2>
        <p className="text-[#6C6C6C]">Out of 247 validators</p>
      </div>
      <div className="bg-[#1C1C1C] rounded-lg p-6 min-h-[150px]">
        <h3 className="mb-6">Reputation</h3>

        <h2 className="mb-2 text-xl">{reputation}%</h2>
        <div className="bg-[#3D3636] h-[6px] rounded-full w-full">
          <div
            className={`h-full rounded-full bg-[#0073E6]`}
            style={{ width: `${reputation}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceSnapshot;
