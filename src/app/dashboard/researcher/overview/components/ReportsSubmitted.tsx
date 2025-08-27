import { Clock } from "lucide-react";
import React from "react";

const dummy_alerts = [
  {
    title: "Smart contract audit",
    priority: "high",
    time_passed: "30 mins ago",
  },
  {
    title: "Smart contract audit",
    priority: "medium",
    time_passed: "1 hour ago",
  },
  {
    title: "Smart contract audit",
    priority: "low",
    time_passed: "1 day ago",
  },
];

function AlertCard({
  alert,
}: {
  alert: {
    title: string;
    priority: string;
    time_passed: string;
  };
}) {
  function priority_class() {
    if (alert.priority === "high") {
      return "bg-[#401D1D] text-[#EF4343]";
    }
    if (alert.priority === "medium") {
      return "bg-[#373510] text-[#C1B700]";
    }
    if (alert.priority === "low") {
      return "bg-[#10273E] text-[#0073E6]";
    }
  }
  return (
    <div className="p-6 flex flex-col gap-y-3 bg-[#1C1C1C] rounded-lg">
      <div className="border-b border-b-[#343434] flex justify-between pb-6 items-center mb-3">
        <p className="font-medium text-[#E2E2E2]">{alert.title}</p>
        <div
          className={`py-[6px] px-3  rounded-full text-xs  capitalize ${priority_class()}`}
        >
          Priority: {alert.priority}
        </div>
      </div>
      <div className="flex items-center gap-x-1 text-[#6C6C6C]">
        <Clock />
        <span>{alert.time_passed}</span>
      </div>
    </div>
  );
}

function ReportsSubmitted() {
  return (
    <div className="flex flex-col gap-y-3">
      <h4 className=" text-white">New Project Alerts</h4>
      {dummy_alerts.map((alert, id) => (
        <AlertCard alert={alert} />
      ))}
      <button
        className="mt-6 p-[2px] rounded-full"
        style={{
          background: "linear-gradient(90deg, #212121 0%, #312F2F 100%)",
        }}
      >
        <div className="bg-[#1C1C1C] py-4 text-[#E2E2E2] rounded-full">
          Go to Projects
        </div>
      </button>
    </div>
  );
}

export default ReportsSubmitted;
