"use client";
import React, { useState, useMemo } from "react";
import { reports, ReportData } from "../data";
import ResearcherDropdown from "@/app/dashboard/components/reports/ResearcherDropdown";
import LanguageDropdown from "@/app/dashboard/components/reports/LanguageDropdown";
import SeverityDropdown from "@/app/dashboard/components/reports/SeverityDropdown";
import ReportCard from "@/app/dashboard/components/reports/ReportCard";
import { Search } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface Props {
  dataIndex: number | null;
  setCurrentView: (view: number) => void;
  setDataIndex: (e: number | null) => void;
}

const mainContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const searchVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const dropdownsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const columnVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const indicatorVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      type: "spring",
      stiffness: 200,
    },
  },
};

const countVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
  },
};

const Report: React.FC<Props> = ({ setCurrentView, setDataIndex }) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<
    ReportData["severity"][]
  >([]);
  const [selectedResearcher, setSelectedResearcher] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleViewDetails = (index: number) => {
    setDataIndex(index);
    setCurrentView(1);
  };

  const uniqueResearchers = useMemo(() => {
    const researchers = new Set(reports.map((report) => report.researcher));
    return Array.from(researchers);
  }, []);

  const allLanguages = useMemo(() => {
    const languages = new Set(
      reports.flatMap((report) => report.language || [])
    );
    return Array.from(languages).length > 0
      ? Array.from(languages)
      : ["Python", "JavaScript", "Rust", "Cairo", "Solidity"];
  }, []);

  const allSeverities: ReportData["severity"][] = [
    "Critical",
    "High",
    "Medium",
    "Low",
  ];

  const filteredAndPartitionedReports = useMemo(() => {
    const filtered = reports.filter((report) => {
      const matchesSearch = report.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSeverity =
        selectedSeverity.length === 0 ||
        selectedSeverity.includes(report.severity);
      const matchesResearcher =
        selectedResearcher.length === 0 ||
        selectedResearcher.includes(report.researcher);
      const matchesLanguage =
        selectedLanguages.length === 0 ||
        (report.language &&
          report.language.some((lang) => selectedLanguages.includes(lang)));
      return (
        matchesSearch && matchesSeverity && matchesResearcher && matchesLanguage
      );
    });

    const pending = filtered.filter((r) => r.status === "Pending");
    const validated = filtered.filter((r) => r.status === "Validated");
    const rejected = filtered.filter((r) => r.status === "Rejected");

    return { pending, validated, rejected };
  }, [searchQuery, selectedSeverity, selectedResearcher, selectedLanguages]);

  return (
    <motion.div
      className="h-screen pb-16 overflow-y-auto text-white md:pb-20 lg:h-[720px] lg:pb-[100px] scrollbar-none"
      variants={mainContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex flex-col mb-8 md:flex-row md:items-center md:justify-between md:mb-12 lg:mb-[60px] gap-3 flex-wrap">
        <motion.div
          variants={searchVariants}
          className="relative flex items-center w-full max-w-xs mb-4 md:mb-0"
        >
          <Search className="w-4 h-4 text-[#B5B3B4] absolute left-2.5 md:w-5 md:h-5 md:left-3" />
          <input
            type="text"
            placeholder="Search"
            className="rounded-lg bg-[#161113] border border-[#464043] focus:outline-none focus:border-gray-500 placeholder:text-[#B5B3B4] w-full pl-10 pr-4 py-2 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        <motion.div
          variants={dropdownsContainerVariants}
          className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 lg:gap-[16px]"
        >
          <motion.div variants={dropdownVariants}>
            <ResearcherDropdown
              selectedResearchers={selectedResearcher}
              allResearchers={uniqueResearchers}
              onSelectChange={(researcher) => {
                setSelectedResearcher((prev) =>
                  prev.includes(researcher)
                    ? prev.filter((item) => item !== researcher)
                    : [...prev, researcher]
                );
              }}
            />
          </motion.div>

          <motion.div variants={dropdownVariants}>
            <LanguageDropdown
              selectedLanguages={selectedLanguages}
              allLanguages={allLanguages}
              onSelectChange={(language) => {
                setSelectedLanguages((prev) =>
                  prev.includes(language)
                    ? prev.filter((item) => item !== language)
                    : [...prev, language]
                );
              }}
            />
          </motion.div>

          <motion.div variants={dropdownVariants}>
            <SeverityDropdown
              selectedSeverities={selectedSeverity}
              allSeverities={allSeverities}
              onSelectChange={(severity) => {
                setSelectedSeverity((prev) =>
                  prev.includes(severity)
                    ? prev.filter((item) => item !== severity)
                    : [...prev, severity]
                );
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-[29px]">
        <motion.div
          variants={columnVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h3
            variants={headerVariants}
            className="text-sm font-semibold mb-4 flex items-center md:text-base lg:mb-[24px]"
          >
            <motion.span
              variants={indicatorVariants}
              className="w-2.5 h-2.5 bg-gray-500 rounded-full mr-1.5 md:w-3 md:h-3 md:mr-2"
            ></motion.span>
            Pending Review{" "}
            <motion.p
              variants={countVariants}
              className="text-[#B5B3B4] pl-1 text-xs md:text-sm"
            >
              ({filteredAndPartitionedReports.pending.length})
            </motion.p>
          </motion.h3>
          <div className="flex flex-col space-y-3 md:space-y-4">
            {filteredAndPartitionedReports.pending.map((report, index) => (
              <motion.div key={report.id + "-" + index} variants={cardVariants}>
                <ReportCard
                  report={report}
                  onClick={() => handleViewDetails(reports.indexOf(report))}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={columnVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h3
            variants={headerVariants}
            className="text-sm font-semibold mb-4 flex items-center md:text-base lg:mb-[24px]"
          >
            <motion.span
              variants={indicatorVariants}
              className="w-2.5 h-2.5 bg-green-500 rounded-full mr-1.5 md:w-3 md:h-3 md:mr-2"
            ></motion.span>
            Validated{" "}
            <motion.p
              variants={countVariants}
              className="text-[#B5B3B4] pl-1 text-xs md:text-sm"
            >
              ({filteredAndPartitionedReports.validated.length})
            </motion.p>
          </motion.h3>
          <div className="flex flex-col space-y-3 md:space-y-4">
            {filteredAndPartitionedReports.validated.map((report, index) => (
              <motion.div key={report.id + "-" + index} variants={cardVariants}>
                <ReportCard
                  report={report}
                  onClick={() => handleViewDetails(reports.indexOf(report))}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={columnVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h3
            variants={headerVariants}
            className="text-sm font-semibold mb-4 flex items-center md:text-base lg:mb-[24px]"
          >
            <motion.span
              variants={indicatorVariants}
              className="w-2.5 h-2.5 bg-red-500 rounded-full mr-1.5 md:w-3 md:h-3 md:mr-2"
            ></motion.span>
            Rejected{" "}
            <motion.p
              variants={countVariants}
              className="text-[#B5B3B4] pl-1 text-xs md:text-sm"
            >
              ({filteredAndPartitionedReports.rejected.length})
            </motion.p>
          </motion.h3>
          <div className="flex flex-col space-y-3 md:space-y-4">
            {filteredAndPartitionedReports.rejected.map((report, index) => (
              <motion.div key={report.id + "-" + index} variants={cardVariants}>
                <ReportCard
                  report={report}
                  onClick={() => handleViewDetails(reports.indexOf(report))}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Report;
