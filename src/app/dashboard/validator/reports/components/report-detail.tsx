"use client";

import { ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  vulnerabilityDescription,
  vulnerabilityImpact,
  stepsToReproduce,
  mitigationSteps,
} from "../data/mock-data";
import { getSeverityColor } from "../utils/helpers";
import type { Report } from "../types";
import poc1 from "../../../../../../public/poc1.svg";
import poc2 from "../../../../../../public/poc2.svg";
import poc3 from "../../../../../../public/poc3.svg";
import not_bookmark from "../../../../../../public/notbookmark.svg";
import bookmark from "../../../../../../public/bookmark.svg";
import Image from "next/image";

interface ReportDetailProps {
  report: Report;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onBackClick: () => void;
  onApprovePayoutClick: () => void;
  onViewProjectClick: () => void;
  onRequestMoreInfoClick: () => void;
  onRejectReportClick: () => void;
}

export function ReportDetail({
  report,
  isBookmarked,
  onToggleBookmark,
  onBackClick,
  onApprovePayoutClick,
  onViewProjectClick,
  onRequestMoreInfoClick,
  onRejectReportClick,
}: ReportDetailProps) {
  return (
    <div className="p-6 border border-[#464043] rounded-lg">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          className="text-white mr-2 text-xl"
          onClick={onBackClick}
        >
          <ArrowLeft className="h- w-16 mr-2" />
          Back to Reports
        </Button>
      </div>

      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold flex-1 pr-4">
          Local File Inclusion (LFI) on Home Page - {report.url}
        </h1>
        <button className="text-white w-10" onClick={onToggleBookmark}>
          {isBookmarked ? (
            <Image src={bookmark} alt="PoC Screenshot 1" className=" rounded" />
          ) : (
            <Image
              src={not_bookmark}
              alt="PoC Screenshot 1"
              className=" rounded"
            />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div>
          <h3 className="text-zinc-400 mb-2">Severity</h3>
          <span
            className={`px-3 py-1 rounded-md text-xs font-medium ${getSeverityColor(
              report.severity
            )}`}
          >
            {report.severity}
          </span>
        </div>
        <div>
          <h3 className="text-zinc-400 mb-2">CVSS Score</h3>
          <span className="text-white">{report.cvssScore}</span>
        </div>
        <div>
          <h3 className="text-zinc-400 mb-2">Vulnerable URL/Area</h3>
          <span className="text-white">{report.url} - Home Page</span>
        </div>
        <div>
          <h3 className="text-zinc-400 mb-2">Vulnerable Form/Parameter</h3>
          <span className="text-white">Broken Access Control</span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Vulnerability Description
        </h2>
        <p className="text-zinc-200">{vulnerabilityDescription}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Impact of Vulnerability</h2>
        <p className="text-zinc-200">{vulnerabilityImpact}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Steps to reproduce</h2>
        <ol className="list-decimal pl-5 space-y-2">
          {stepsToReproduce.map((step, index) => (
            <li key={index} className="text-zinc-200">
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Proof of Concept (PoC)</h2>
        <div className="flex items-center space-x-4 gap-4">
          <div className=" rounded-md p-2">
            <Image
              src={poc1}
              alt="PoC Screenshot 1"
              className="w-full h-auto rounded"
            />
          </div>
          <div className=" rounded-md p-2">
            <Image
              src={poc2}
              alt="PoC Screenshot 2"
              className="w-full h-auto rounded"
            />
          </div>
          <div className=" rounded-md p-2">
            <Image
              src={poc3}
              alt="PoC Screenshot 3"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Mitigation Steps for Local File Inclusion
        </h2>
        <ol className="list-decimal pl-5 space-y-2">
          {mitigationSteps.map((step, index) => (
            <li key={index} className="text-zinc-200">
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap gap-4 ml-10">
        <Button
          className="bg-[#0000FF] py-2 hover:bg-blue-700 text-white"
          onClick={onApprovePayoutClick}
        >
          Approve Payout
        </Button>
        <Button
          variant="outline"
          className="border-zinc-700 py-2 px-6 text-[#000] bg-white"
          onClick={onViewProjectClick}
        >
          View Project
        </Button>
        <Button
          variant="outline"
          className="border-zinc-700 py-2 text-white px-4 bg-zinc-800"
          onClick={onRequestMoreInfoClick}
        >
          Request More Info
        </Button>
        <Button
          variant="ghost"
          className="text-red-500 hover:text-red-400 hover:bg-zinc-800"
          onClick={onRejectReportClick}
        >
          Reject Report
        </Button>
      </div>
    </div>
  );
}
