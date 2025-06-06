"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { mockReports, reportStats } from "../data/mock-data";
import type { Report } from "../types";
import report1 from "../../../../../../public/reports1.svg";
import report2 from "../../../../../../public/reports2.svg.svg";
import report3 from "../../../../../../public/reports3.svg";
import report4 from "../../../../../../public/reports4.svg";
import Image from "next/image";
import { Animation } from "@/motion/Animation"; // Import the Animation component
import { motion } from "framer-motion";

interface ReportsListProps {
  onReportClick: (report: Report) => void;
}

export function ReportsList({ onReportClick }: ReportsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<string | null>(null);
  const [reviewerFilter, setReviewerFilter] = useState<string | null>(null);

  // Get unique projects and reviewers for filters
  const projects = Array.from(
    new Set(mockReports.all.map((report) => report.projectName))
  );
  const reviewers = Array.from(
    new Set(mockReports.all.map((report) => report.reviewedBy))
  );

  // Data for stats cards to make mapping easier for animation
  const statsCardsData = [
    {
      id: "total",
      icon: report1,
      value: reportStats.total,
      label: "Total Reports Submitted",
      delay: 0.1,
    },
    {
      id: "approved",
      icon: report2,
      value: reportStats.approved,
      label: "Approved Reports",
      delay: 0.2,
    },
    {
      id: "pending",
      icon: report3,
      value: reportStats.pending,
      label: "Reports Pending Approval",
      delay: 0.3,
    },
    {
      id: "rejected",
      icon: report4,
      value: reportStats.rejected,
      label: "Rejected Reports",
      delay: 0.4,
    },
  ];

  return (
    <div className="">
      {" "}
      {/* Base container from your original code */}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCardsData.map((stat) => (
          <Animation key={stat.id} delay={stat.delay} animationType="slide-up">
            <Card className="bg-[#110D0F] space-y-3 text-white border-[#464043] p-4">
              <div className="flex flex-col space-y-3 items-start">
                <div className="mr-3">
                  <Image src={stat.icon} alt="icon" />
                </div>
                <div>
                  <div className="text-4xl font-bold">{stat.value}</div>
                </div>
              </div>
              <div className="text-sm text-zinc-400">{stat.label}</div>
            </Card>
          </Animation>
        ))}
      </div>
      {/* Reports Table Section */}
      <div className="bg-[#161113] border border-[#464043] rounded-lg p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Reports</h2>

          <div className="flex gap-2">
            <div className="bg-[bg-[#161113] relative border border-[#464043] rounded-lg px-2 py-1">
              <Input
                placeholder="Search project name, or validator name"
                className="bg-[#161113] border-none py-5 ml-4 text-white w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute cursor-pointer left-2 top-4">
                <Search width={16} height={16} />
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-[#161113] border border-[#464043] py-5 text-white"
              >
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="bg-[#161113] border border-[#464043] py-5 text-white"
              >
                Select Project <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="bg-[#161113] border border-[#464043] py-5 text-white"
              >
                Reviewed By <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#211A1D] rounded-lg py-2">
              <tr className="border-b border-zinc-800 rounded-lg">
                <th className="text-left py-3 px-4 text-zinc-400 font-medium  text-[#f6f6f6] py-5">
                  Report ID
                </th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium  text-[#f6f6f6] py-5">
                  Project Name
                </th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium  text-[#f6f6f6] py-5">
                  Reviewed By
                </th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium  text-[#f6f6f6] py-5">
                  Submitted By
                </th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium  text-[#f6f6f6] py-5">
                  Bounty
                </th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium  text-[#f6f6f6] py-5">
                  Reviewer Reward
                </th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium  text-[#f6f6f6] py-5">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium  text-[#f6f6f6] py-5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {mockReports.all.map((report, index) => (
                <motion.tr
                  key={index}
                  className="border-b hover:bg-[#211A1a] border-zinc-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.4,
                    ease: "easeOut",
                  }}
                >
                  <td className="py-5 px-4">{report.id}</td>
                  <td className="py-5 px-4">{report.projectName}</td>
                  <td className="py-5 px-4">
                    <a href="#" className="text-blue-500 hover:underline">
                      {report.reviewedBy}
                    </a>
                  </td>
                  <td className="py-5 px-4">
                    <a href="#" className="text-blue-500 hover:underline">
                      {report.submittedBy}
                    </a>
                  </td>
                  <td className="py-5 px-4">{report.bounty || "N/A"}</td>
                  <td className="py-5 px-4">
                    {report.reviewerReward || "N/A"}
                  </td>
                  <td className="py-5 px-4">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-medium ${
                        report.status === "Approved"
                          ? "bg-green-600 text-white"
                          : report.status === "Rejected"
                          ? "bg-red-600 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-5 px-4">
                    <Button
                      variant="link"
                      className="text-blue-500 hover:underline p-0 h-auto"
                      onClick={() => onReportClick(report)}
                    >
                      View
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
