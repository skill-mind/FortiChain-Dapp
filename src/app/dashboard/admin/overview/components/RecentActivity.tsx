import React from "react";

function RecentActivity() {
  const dummy_activity = [
    {
      title: "Smart contract update deployed",
      time: "2 hours ago",
    },
    {
      title: "High dispute resolution queue",
      time: "15 mins ago",
    },
    {
      title: "Token issuance completed",
      time: "5 minutes ago",
    },
    {
      title: "Scheduled maintenance planned",
      time: "1 hour ago",
    },
    {
      title: "Token issuance completed",
      time: "5 minutes ago",
    },
    {
      title: "Token issuance completed",
      time: "5 minutes ago",
    },
  ];
  return (
    <div className="w-full p-6 bg-[#101011] rounded-lg">
      <h4 className="text-base font-medium text-white mb-6">Recent Activity</h4>

      <div className="flex flex-col h-[320px] overflow-y-auto">
        {dummy_activity.map((activity, i) => (
          <div
            className="flex items-center gap-x-2 py-3 border-b border-b-[#1F1F1F]"
            key={i}
          >
            <div className="w-2 h-2 bg-[#0073E6] rounded-full"></div>
            <div>
              <h4 className="text-[#E2E2E2]">{activity.title}</h4>
              <h5 className="text-[#6C6C6C]">{activity.time}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
