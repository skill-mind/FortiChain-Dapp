"use client";

import { useParams } from "next/navigation";
import { ReportDetail } from "../components/report-detail";

export default function AdminReportDetailPage() {
  const params = useParams();
  const reportId = params.reportId as string;

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <ReportDetail
        reportId={reportId}
        onBackClick={handleBackClick}
      />
    </div>
  );
}
