import React from "react";
import AdminOverviewStats from "./components/AdminOverviewStats";
import RevenueChart from "./components/RevenueChart";
import UserGrowthChart from "./components/UserGrowthChart";
import RecentActivity from "./components/RecentActivity";
import ProjectSeverityDist from "./components/ProjectSeverityDist";

function page() {
  return (
    <div className="flex flex-col gap-y-3">
      <AdminOverviewStats />
      <div className="grid grid-cols-2 gap-x-3">
        <RevenueChart />
        <UserGrowthChart />
      </div>
      <div className="grid grid-cols-2 gap-x-3">
        <ProjectSeverityDist />
        <RecentActivity />
      </div>
    </div>
  );
}

export default page;
