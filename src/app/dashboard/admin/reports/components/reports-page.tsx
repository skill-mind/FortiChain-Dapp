"use client"

import { useState } from "react"
import { ReportsList } from "./reports-list"
import { ReportDetail } from "./report-detail"
import type { Report } from "../types"

function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showReportDetail, setShowReportDetail] = useState(false)

  const handleReportClick = (report: Report) => {
    setSelectedReport(report)
    setShowReportDetail(true)
  }

  const handleBackClick = () => {
    setShowReportDetail(false)
  }

  return (
    <div className="min-h-screen text-white">
      {!showReportDetail ? (
        <ReportsList onReportClick={handleReportClick} />
      ) : (
        <ReportDetail report={selectedReport!} onBackClick={handleBackClick} />
      )}
    </div>
  )
}

export default ReportsPage
