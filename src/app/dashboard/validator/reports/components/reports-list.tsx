"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockReports } from "../data/mock-data";
import { getSeverityColor } from "../utils/helpers";
import type { Report } from "../types";
import { motion } from "framer-motion";

interface ReportsListProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  onReportClick: (report: Report) => void;
}

export function ReportsList({
  selectedTab,
  setSelectedTab,
  onReportClick,
}: ReportsListProps) {
  // Filter states
  const [assignedResearcher, setAssignedResearcher] = useState<string | null>(
    null
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="">
      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="w-full rounded-lg md:w-[450px]">
          <div className="relative rounded-lg py-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              placeholder="Search"
              className="bg-zinc-900 border-zinc-800 text-white pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-zinc-900 border-zinc-800 text-white"
              >
                Assigned Researcher <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 w-[200px] border-zinc-800 text-white">
              <div className="relative rounded-lg pb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  placeholder="Search"
                  className="bg-zinc-900 outline-none border-b border-zinc-800 text-white pl-10"
                />
              </div>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setAssignedResearcher("Python")}
              >
                Python{" "}
                {assignedResearcher === "Python" && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setAssignedResearcher("JavaScript")}
              >
                JavaScript{" "}
                {assignedResearcher === "JavaScript" && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setAssignedResearcher("Rust")}
              >
                Rust{" "}
                {assignedResearcher === "Rust" && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setAssignedResearcher("Cairo")}
              >
                Cairo{" "}
                {assignedResearcher === "Cairo" && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setAssignedResearcher("Solidity")}
              >
                Solidity{" "}
                {assignedResearcher === "Solidity" && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-zinc-900 border-zinc-800 text-white"
              >
                Select Languages <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 w-[180px] border-zinc-800 text-white">
              <div className="relative rounded-lg pb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  placeholder="Search"
                  className="bg-zinc-900 outline-none border-b border-zinc-800 text-white pl-10"
                />
              </div>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  if (selectedLanguages.includes("Python")) {
                    setSelectedLanguages(
                      selectedLanguages.filter((lang) => lang !== "Python")
                    );
                  } else {
                    setSelectedLanguages([...selectedLanguages, "Python"]);
                  }
                }}
              >
                Python{" "}
                {selectedLanguages.includes("Python") && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  if (selectedLanguages.includes("JavaScript")) {
                    setSelectedLanguages(
                      selectedLanguages.filter((lang) => lang !== "JavaScript")
                    );
                  } else {
                    setSelectedLanguages([...selectedLanguages, "JavaScript"]);
                  }
                }}
              >
                JavaScript{" "}
                {selectedLanguages.includes("JavaScript") && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  if (selectedLanguages.includes("Rust")) {
                    setSelectedLanguages(
                      selectedLanguages.filter((lang) => lang !== "Rust")
                    );
                  } else {
                    setSelectedLanguages([...selectedLanguages, "Rust"]);
                  }
                }}
              >
                Rust{" "}
                {selectedLanguages.includes("Rust") && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  if (selectedLanguages.includes("Cairo")) {
                    setSelectedLanguages(
                      selectedLanguages.filter((lang) => lang !== "Cairo")
                    );
                  } else {
                    setSelectedLanguages([...selectedLanguages, "Cairo"]);
                  }
                }}
              >
                Cairo{" "}
                {selectedLanguages.includes("Cairo") && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  if (selectedLanguages.includes("Solidity")) {
                    setSelectedLanguages(
                      selectedLanguages.filter((lang) => lang !== "Solidity")
                    );
                  } else {
                    setSelectedLanguages([...selectedLanguages, "Solidity"]);
                  }
                }}
              >
                Solidity{" "}
                {selectedLanguages.includes("Solidity") && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-zinc-900 border-zinc-800 text-white"
              >
                Severity <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-zinc-800 text-white">
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setSelectedSeverity("Critical")}
              >
                Critical{" "}
                {selectedSeverity === "Critical" && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setSelectedSeverity("High")}
              >
                High{" "}
                {selectedSeverity === "High" && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setSelectedSeverity("Medium")}
              >
                Medium{" "}
                {selectedSeverity === "Medium" && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setSelectedSeverity("Low")}
              >
                Low{" "}
                {selectedSeverity === "Low" && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full bg-inherit text-left"
      >
        <TabsList className="mb-6 text-white grid grid-cols-3 bg-inherit space-x-2 items-start justify-start text-left">
          <TabsTrigger value="pending" className="text-left space-x-2">
            <span className="w-2 h-2 p-1 bg-[#908C8E] rounded-3xl"></span>
            <span>Pending Review ({mockReports.pending.length})</span>
          </TabsTrigger>
          <TabsTrigger value="validated" className="text-left space-x-2">
            <span className="w-2 h-2 p-1 bg-[#01A901] rounded-3xl"></span>
            <span>Validated ({mockReports.validated.length})</span>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="text-left space-x-2">
            <span className="w-2 h-2 p-1 bg-[#FF3737] rounded-3xl"></span>
            <span>Rejected ({mockReports.rejected.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-0">
          
        <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockReports.pending.map((report, index) => (
              <motion.div
                key={report.id || index}
                variants={cardVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Card
                  className="bg-[#110D0F] border-[#464043] cursor-pointer hover:bg-[#110D0F] transition-colors"
                  onClick={() => onReportClick(report)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-400">{report.id}</span>
                      <span className="text-zinc-400">{report.date}</span>
                    </div>
                    <h3 className="text-white font-medium mb-4 line-clamp-2">
                      {report.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-medium ${getSeverityColor(
                            report.severity
                          )}`}
                        >
                          {report.severity}
                        </span>
                        <span className="text-white font-medium">
                          {report.cvssScore}
                        </span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400">
                          {report.researcher}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}{" "}
          </motion.div>
        </TabsContent>

        <TabsContent value="validated" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockReports.validated.map((report, index) => (
              <Card
                key={index}
                className="bg-zinc-900 border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors"
                onClick={() => onReportClick(report)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">{report.id}</span>
                    <span className="text-zinc-400">{report.date}</span>
                  </div>
                  <h3 className="text-white font-medium mb-4 line-clamp-2">
                    {report.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-medium ${getSeverityColor(
                        report.severity
                      )}`}
                    >
                      {report.severity}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {report.cvssScore}
                      </span>
                      <span className="text-zinc-400">{report.researcher}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockReports.rejected.map((report, index) => (
              <Card
                key={index}
                className="bg-zinc-900 border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors"
                onClick={() => onReportClick(report)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">{report.id}</span>
                    <span className="text-zinc-400">{report.date}</span>
                  </div>
                  <h3 className="text-white font-medium mb-4 line-clamp-2">
                    {report.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-medium ${getSeverityColor(
                        report.severity
                      )}`}
                    >
                      {report.severity}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {report.cvssScore}
                      </span>
                      <span className="text-zinc-400">{report.researcher}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
