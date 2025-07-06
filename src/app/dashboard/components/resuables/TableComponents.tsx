// TableComponents.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Animation } from "@/motion/Animation";
import { Modal } from "./Modal";
import WithdrawModal from "../payoutComponents/WithdrawModal";
import ReportModal from "./view-all-report-modal";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

// ----------------- ValidatorRanking Component -----------------

interface ValidatorData {
  rank: number;
  validator: string;
  reportsValidated: number;
  totalRewards: string;
}

interface ValidatorRankingProps {
  userRank: number;
  validators: ValidatorData[];
  viewAllLink?: string;
}

export const ValidatorRanking: React.FC<ValidatorRankingProps> = ({
  userRank,
  validators,
  viewAllLink = "#",
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#161113] rounded-lg border p-3 border-neutral-800 overflow-hidden">
        <div className="p-5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Validator Ranking
            </h2>
            <p className="text-sm font-thin">Your Rank: #{userRank}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[#0000FF] hover:text-blue-400 text-sm"
          >
            View Full List
          </button>
        </div>

        {!isMobile ? (
          // Desktop view - Table layout
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#211A1D] text-neutral-400 text-sm border-t border-neutral-800">
                  <th className="py-3 px-5 text-left">Rank</th>
                  <th className="py-3 px-5 text-left">Validator</th>
                  <th className="py-3 px-5 text-left">Reports Validated</th>
                  <th className="py-3 px-5 text-left">Total Rewards ($)</th>
                </tr>
              </thead>
              <tbody>
                {validators.map((validator) => (
                  <tr
                    key={validator.rank}
                    className="border-t border-neutral-800 bg-[#161113]"
                  >
                    <td className="py-3 px-5 text-white">
                      <Animation
                        duration={0.4 * validator.rank}
                        animationType="slide-up"
                      >
                        {validator.rank}
                      </Animation>
                    </td>
                    <td className="py-3 px-5 text-white">
                      <Animation
                        duration={0.4 * validator.rank}
                        animationType="slide-up"
                      >
                        {validator.validator}
                      </Animation>
                    </td>
                    <td className="py-3 px-5 text-white">
                      <Animation
                        duration={0.4 * validator.rank}
                        animationType="slide-up"
                      >
                        {validator.reportsValidated}
                      </Animation>
                    </td>
                    <td className="py-3 px-5 text-white">
                      <Animation
                        duration={0.4 * validator.rank}
                        animationType="slide-up"
                      >
                        {validator.totalRewards}
                      </Animation>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Mobile view - Card layout
          <div className="px-3 space-y-4">
            {validators.map((validator) => (
              <Animation
                key={validator.rank}
                duration={0.4 * validator.rank}
                animationType="slide-up"
              >
                <div className="bg-[#211A1D] p-4 rounded-lg border border-neutral-800">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-medium">Rank</span>
                    <span className="text-white">{validator.rank}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-medium">Validator</span>
                    <span className="text-white">{validator.validator}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-medium">Reports</span>
                    <span className="text-white">
                      {validator.reportsValidated}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Rewards</span>
                    <span className="text-white">{validator.totalRewards}</span>
                  </div>
                </div>
              </Animation>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Full Validator Ranking"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#211A1D] text-neutral-400 text-sm border-t border-neutral-800">
                <th className="py-3 px-5 text-left">Rank</th>
                <th className="py-3 px-5 text-left">Validator</th>
                <th className="py-3 px-5 text-left">Reports Validated</th>
                <th className="py-3 px-5 text-left">Total Rewards ($)</th>
              </tr>
            </thead>
            <tbody>
              {validators.map((validator) => (
                <tr
                  key={validator.rank}
                  className="border-t border-neutral-800 hover:bg-[#211A1D] transition-colors"
                >
                  <td className="py-3 px-5 text-white">{validator.rank}</td>
                  <td className="py-3 px-5 text-white">
                    {validator.validator}
                  </td>
                  <td className="py-3 px-5 text-white">
                    {validator.reportsValidated}
                  </td>
                  <td className="py-3 px-5 text-white">
                    {validator.totalRewards}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

// ----------------- RecentReports Component -----------------

interface ReportData {
  id: string;
  projectName: string;
  primaryLanguage: string;
  severity: any;
  status: any;
  actionLink: string;
}

interface RecentReportsProps {
  reports: ReportData[];
  viewAllLink?: string;
}

export const RecentReports: React.FC<RecentReportsProps> = ({
  reports,
  viewAllLink = "#",
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWithdrawSubmit = (
    amount: number,
    numAmount: number,
    usdEquivalent: number
  ) => {
    // Handle the withdrawal submission
    console.log({ amount, numAmount, usdEquivalent });
    setIsModalOpen(false);
  };

  // Helper function to get the appropriate color for severity badges
  const getSeverityClass = (severity: ReportData["severity"]) => {
    switch (severity) {
      case "Critical":
        return "bg-[#AE2727]";
      case "High":
        return "bg-[#FF7337]";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-blue-500";
      case "Completed":
        return "bg-[#908C8E]";
      default:
        return "bg-gray-500";
    }
  };

  // Helper function to get the appropriate color for status badges
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-[#01A901]";
      case "Rejected":
        return "bg-[#AE2727]";
      case "Pending":
        return "bg-[#0000FF]";
      case "Completed":
        return "bg-[#908C8E]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <div className="bg-[#161113] rounded-lg p-3 border border-neutral-800 overflow-hidden mt-6">
        <div className="p-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Recent Reports</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[#0000FF] hover:text-blue-400 text-sm"
          >
            View All
          </button>
        </div>

        {!isMobile ? (
          // Desktop view - Table layout
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#211A1D] text-neutral-400 text-sm border-t border-neutral-800">
                  <th className="py-3 px-4 text-left">Report ID</th>
                  <th className="py-3 px-4 text-left">Project Name</th>
                  <th className="py-3 px-4 text-left">Primary Language</th>
                  <th className="py-3 px-4 text-left">Severity</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr
                    key={index}
                    className="border-t border-neutral-800 bg-[#161113]"
                  >
                    <td className="py-3 px-4 text-white">
                      <Animation delay={0.4} animationType="slide-up">
                        {report.id}
                      </Animation>
                    </td>
                    <td className="py-3 px-4 text-white">
                      <Animation delay={0.4} animationType="slide-up">
                        {report.projectName}
                      </Animation>
                    </td>
                    <td className="py-3 px-4 text-white">
                      <Animation delay={0.4} animationType="slide-up">
                        {report.primaryLanguage}
                      </Animation>
                    </td>
                    <td className="py-3 px-4">
                      <Animation delay={0.4} animationType="slide-up">
                        <div
                          className={`px-3  py-1 rounded-full text-xs text-center w-[90px] text-white ${getSeverityClass(
                            report.severity
                          )}`}
                        >
                          {report.severity}
                        </div>
                      </Animation>
                    </td>
                    <td className="py-3 px-4">
                      <Animation delay={0.4} animationType="slide-up">
                        <div
                          className={`px-3 py-1 rounded-full text-xs text-center w-[90px] text-white ${getStatusClass(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </div>
                      </Animation>
                    </td>
                    <td className="py-3 px-4">
                      <Animation delay={0.4} animationType="slide-up">
                        <Link
                          href={report.actionLink}
                          className="text-[#0000FF] hover:text-blue-400"
                        >
                          View Details
                        </Link>
                      </Animation>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Mobile view - Card layout
          <div className="px-3 space-y-4">
            {reports.map((report, index) => (
              <Animation key={index} delay={0.4} animationType="slide-up">
                <div className="bg-[#211A1D] p-4 rounded-lg border border-neutral-800">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-neutral-400 text-sm">Report ID</span>
                    <span className="text-white">{report.id}</span>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-neutral-400 text-sm">Project</span>
                    <span className="text-white">{report.projectName}</span>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-neutral-400 text-sm">Language</span>
                    <span className="text-white">{report.primaryLanguage}</span>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-neutral-400 text-sm">Severity</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs text-white ${getSeverityClass(
                        report.severity
                      )}`}
                    >
                      {report.severity}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-neutral-400 text-sm">Status</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs text-white ${getStatusClass(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </div>

                  <div className="mt-2 text-center">
                    <Link
                      href={report.actionLink}
                      className="text-[#0000FF] hover:text-blue-400 inline-block w-full py-2 border border-[#0000FF] rounded-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </Animation>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <ReportModal onClose={() => setIsModalOpen(false)} report={reports} />
      )}
    </>
  );
};
