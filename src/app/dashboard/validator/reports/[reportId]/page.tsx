"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { ReportDetail } from "../components/report-detail";

export default function ValidatorReportDetailPage() {
  const params = useParams();
  const reportId = params.reportId as string;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBackClick = () => {
    window.history.back();
  };

  const handleApprovePayoutClick = () => {
    console.log("Approve payout clicked for report:", reportId);
    // Add your payout approval logic here
  };

  const handleViewProjectClick = () => {
    console.log("View project clicked for report:", reportId);
    // Add your view project logic here
  };

  const handleRequestMoreInfoClick = () => {
    console.log("Request more info clicked for report:", reportId);
    // Add your request more info logic here
  };

  const handleRejectReportClick = () => {
    console.log("Reject report clicked for report:", reportId);
    // Add your reject report logic here
  };

  return (
    <div className="min-h-screen bg-[#161113] text-white">
      <ReportDetail
        reportId={reportId}
        isBookmarked={isBookmarked}
        onToggleBookmark={() => setIsBookmarked(!isBookmarked)}
        onBackClick={handleBackClick}
        onApprovePayoutClick={handleApprovePayoutClick}
        onViewProjectClick={handleViewProjectClick}
        onRequestMoreInfoClick={handleRequestMoreInfoClick}
        onRejectReportClick={handleRejectReportClick}
      />
    </div>
  );
}
