"use client";

import { useState } from "react";
import { ReportsList } from "./reports-list";
import { ReportDetail } from "./report-detail";
import { ProjectModal } from "./modals/project-modal";
import { ApprovePayoutModal } from "./modals/approve-payout-modal";
import { RequestInfoModal } from "./modals/request-info-modal";
import { RejectReportModal } from "./modals/reject-report-modal";
import { PayoutProcessingModal } from "./modals/payout-processing-modal";
import { PayoutSuccessModal } from "./modals/payout-success-modal";
import type { Report } from "../types";
import { PayoutFailedModal } from "./modals/payout-failed-modal";
import { RequestSentModal } from "./modals/request-sent-modal";
import { RejectSuccesModal } from "./modals/reject-success-modal";

function ReportsPage() {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Modal states
  const [showReportDetail, setShowReportDetail] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showApprovePayoutModal, setShowApprovePayoutModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [showRequestSentModal, setShowRequestSentModal] = useState(false);

  const [showRejectReportModal, setShowRejectReportModal] = useState(false);
  const [showRejectSuccessModal, setShowRejectSuccessModal] = useState(false);
  const [showPayoutProcessing, setShowPayoutProcessing] = useState(false);
  const [showPayoutSuccess, setShowPayoutSuccess] = useState(false);

  // Form states
  const [rewardAmount, setRewardAmount] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setShowReportDetail(true);
  };

  const handleApprovePayoutClick = () => {
    setShowApprovePayoutModal(true);
  };

  const handleApprovePayoutSubmit = () => {
    setShowApprovePayoutModal(false);
    setShowPayoutProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setShowPayoutProcessing(false);
      setShowPayoutSuccess(true);
    }, 2000);
  };

  const handleRequestMoreInfo = () => {
    setShowRequestInfoModal(true);
  };

  const handleSendInfoRequest = () => {
    setShowRequestInfoModal(false);
    setShowRequestSentModal(true);
    // Here you would handle the API call to send the request
  };

  const handleRejectReport = () => {
    setShowRejectReportModal(true);
  };

  const handleRejectReportSubmit = () => {
    setShowRejectReportModal(false);
    setShowReportDetail(false);
    setShowRejectSuccessModal(true);
    // Here you would handle the API call to reject the report
  };

  const handleViewProject = () => {
    setShowProjectModal(true);
  };

  const handleGoToDashboard = () => {
    setShowPayoutSuccess(false);
    setShowReportDetail(false);
    setShowRequestSentModal(false);
    setShowRejectSuccessModal(false);
  };

  const handleBackToReports = () => {
    setShowReportDetail(false);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="min-h-screen text-white">
      {/* Main Reports Page */}
      {!showReportDetail ? (
        <ReportsList
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          onReportClick={handleReportClick}
        />
      ) : (
        <ReportDetail
          report={selectedReport!}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
          onBackClick={handleBackToReports}
          onApprovePayoutClick={handleApprovePayoutClick}
          onViewProjectClick={handleViewProject}
          onRequestMoreInfoClick={handleRequestMoreInfo}
          onRejectReportClick={handleRejectReport}
        />
      )}

      {/* Modals */}
      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
      />

      <ApprovePayoutModal
        isOpen={showApprovePayoutModal}
        onClose={() => setShowApprovePayoutModal(false)}
        onSubmit={handleApprovePayoutSubmit}
        rewardAmount={rewardAmount}
        setRewardAmount={setRewardAmount}
        report={selectedReport}
      />

      <PayoutProcessingModal isOpen={showPayoutProcessing} />

      <PayoutSuccessModal
        isOpen={showPayoutSuccess}
        onClose={() => setShowPayoutSuccess(false)}
        onGoToDashboard={handleGoToDashboard}
      />

      {/* <PayoutFailedModal
        isOpen={showPayoutSuccess}
        onClose={() => setShowPayoutSuccess(false)}
        onGoToDashboard={handleGoToDashboard}
      /> */}

      <RequestInfoModal
        isOpen={showRequestInfoModal}
        onClose={() => setShowRequestInfoModal(false)}
        onSubmit={handleSendInfoRequest}
        additionalInfo={additionalInfo}
        setAdditionalInfo={setAdditionalInfo}
      />

      <RequestSentModal
        isOpen={showRequestSentModal}
        onClose={() => setShowRequestSentModal(false)}
        onGoToDashboard={handleGoToDashboard}
      />

      <RejectReportModal
        isOpen={showRejectReportModal}
        onClose={() => setShowRejectReportModal(false)}
        onSubmit={handleRejectReportSubmit}
        rejectReason={rejectReason}
        setRejectReason={setRejectReason}
      />

      <RejectSuccesModal
        isOpen={showRejectSuccessModal}
        onClose={() => setShowRejectSuccessModal(false)}
        onGoToDashboard={handleGoToDashboard}
      />
    </div>
  );
}

export default ReportsPage;
