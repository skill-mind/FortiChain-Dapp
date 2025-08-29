"use client";

import FundProject from "@/components/dashboard/upload-project/FundProject";
import SubmitNewProject from "@/components/dashboard/upload-project/SubmitNewProject";
import SummaryAndUpload from "@/components/dashboard/upload-project/SummaryAndUpload";
import React, { useState } from "react";

export type TabType = "submit" | "fund" | "summary";

function UploadProject() {
  const [activeTab, setActiveTab] = useState<TabType>("submit");

  const tabs = [
    { name: "submit", title: "Submit New Project" },
    { name: "fund", title: "Fund Project" },
    { name: "summary", title: "Summary & Upload" },
  ];

  const activeIndex = tabs.findIndex((t) => t.name === activeTab);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center items-center gap-[21px]">
        {tabs.map((item, index) => (
          <div key={item.name} className="flex flex-col gap-[10px]">
            <div>{item.title}</div>
            <div
              className={`rounded-[100px] h-[6px] transition-colors duration-300 ${
                index <= activeIndex ? "bg-[#0073E6]" : "bg-[#1C1C1C]"
              }`}
            ></div>
          </div>
        ))}
      </div>

      <div>
        {activeTab === tabs[0].name && (
          <SubmitNewProject setActiveTab={setActiveTab} />
        )}
        {activeTab === tabs[1].name && (
          <FundProject setActiveTab={setActiveTab} />
        )}
        {activeTab === tabs[2].name && (
          <SummaryAndUpload setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}

export default UploadProject;
