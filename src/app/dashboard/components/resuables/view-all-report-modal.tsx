import { useState } from "react";
import { CheckCircle2, ChevronDown, ArrowLeft, User } from "lucide-react";
import Image from "next/image";
import { Animation } from "@/motion/Animation";
import Link from "next/link";

interface ReportData {
  id: string;
  projectName: string;
  primaryLanguage: string;
  severity: any;
  status: any;
  actionLink: string;
}

export default function ReportModal({
  onClose,
  report,
}: {
  onClose: () => void;
  report: ReportData[];
    }) {
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

      return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-[#211a1d] bg-opacity-80 backdrop-blur-md"></div>

          <button
            onClick={onClose}
            className="absolute top-4 sm:top-6 left-4 sm:left-6 text-gray-300 hover:text-white flex items-center z-20 text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="mr-1 sm:mr-2" />
            <span>Back to overview</span>
          </button>

          <div className="relative bg-[#1b1618] border border-[#464043] rounded-2xl w-[95%] max-w-screen-md z-10 max-h-[90vh] overflow-y-auto">
            {report.map((report, index) => (
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
        </div>
      );
    }
