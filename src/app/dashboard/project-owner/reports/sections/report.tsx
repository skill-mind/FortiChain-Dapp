"use client";
import React, { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {mockReports} from "../data";
import {headerVariants, rowVariants, tableVariants, containerVariants} from "../animations";


interface Props {
  reportIndex: number | null;
  setCurrentView: (view: number) => void;
  setReportIndex: (index: number | null) => void;
}


const Report: React.FC<Props> = ({ setCurrentView, setReportIndex }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

 const handleViewVulnerabilities = (index: number) => {
  setReportIndex(index);
  setCurrentView(1); // Navigate to VulnerabilityReport page
};

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#01A901]";
      case "Ongoing":
        return "bg-[#2B2BFF]";
      case "Closed":
        return "bg-[#FF3737]";
      default:
        return "bg-gray-500";
    }
  };

  const filteredReports = useMemo(() => {
    return mockReports.filter((report) => {
      const matchesSearch = report.project.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "All" || report.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  return (
    <motion.div
      className="min-h-screen bg-[#161113] text-white p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={headerVariants}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
      >
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Reports</h1>
        
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-[#161113] border border-[#464043] rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#161113] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#464043] appearance-none pr-10 cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Closed">Closed</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        variants={tableVariants}
        className="bg-[#161113] rounded-lg overflow-hidden"
      >
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 p-4 bg-[#211A1D] text-gray-300 text-sm font-medium">
          <div>Project</div>
          <div>Vulnerabilities Found</div>
          <div>Total Bounty Paid</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-800">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              variants={rowVariants}
              className="grid grid-cols-5 gap-4 p-4 hover:bg-[#161113] transition-colors duration-200 items-center"
            >
              {/* Project */}
              <div className="text-white font-medium">
                {report.project}
              </div>

              {/* Vulnerabilities Found */}
              <div className="text-gray-300">
                {report.vulnerabilitiesFound}
              </div>

              {/* Total Bounty Paid */}
              <div className="text-gray-300">
                {report.totalBountyPaid}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>
              </div>

              {/* Action */}
              <div>
                <button
                  onClick={() => handleViewVulnerabilities(index)}
                  className="text-[#0000FF] hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                >
                  View Vulnerabilities
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 mt-12"
        >
          <p>No reports found matching your search criteria.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Report;