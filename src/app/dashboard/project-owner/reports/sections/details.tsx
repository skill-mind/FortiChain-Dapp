"use client";
import React, { useState } from "react";
import { reports, ReportData } from "../data";
import { ArrowLeft,  X } from "lucide-react";
import {
  poc1,
  poc2,
  dollars,
  github,
  calendar,
  cairo,
  python,
  rust,
  ts,
} from "../../../../../../public";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  mainContainerVariants,
  backButtonVariants,
  titleContainerVariants,
  titleVariants,
  metadataContainerVariants,
  metadataItemVariants,
  sectionVariants,
  sectionTitleVariants,
  sectionContentVariants,
  pocImageVariants,
  buttonVariants,
  modalItemVariants,
} from "../animations";
import { Modal } from "@/app/dashboard/components/resuables/Modal";

interface Props {
  vulnerabilityIndex: number | null;
  setCurrentView: (view: number) => void;
}

const Details: React.FC<Props> = ({ vulnerabilityIndex, setCurrentView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const report: ReportData | undefined =
    vulnerabilityIndex !== null ? reports[vulnerabilityIndex] : undefined;

  const handleBackToVulnerabilityReport = () => {
    setCurrentView(1);
  };

  if (!report) {
    return (
      <div className="p-4 bg-gray-900 text-white min-h-screen">
        No report selected.
      </div>
    );
  }

  return (
    <motion.main
      variants={mainContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        variants={backButtonVariants}
        className="text-white mb-4 flex items-center hover:text-white transition-colors md:mb-6"
        onClick={handleBackToVulnerabilityReport}
      >
        <ArrowLeft className="w-5 h-5 mr-1.5 md:w-6 md:h-6 md:mr-2" /> Back to Vulnerability Report
      </motion.button>

      <div className="text-white bg-[#1C1618] p-4 border border-[#464043] rounded-[8px] h-[calc(100vh-200px)] overflow-y-auto scrollbar-none md:p-6 md:rounded-[10px] lg:p-10 lg:h-[660px] lg:pb-[20px] lg:rounded-[12px]">
        <motion.div
          variants={titleContainerVariants}
          className="pb-4 mb-4 md:pb-5 md:mb-5 lg:pb-6 lg:mb-6"
        >
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <motion.h2
              variants={titleVariants}
              className="text-lg font-bold md:text-xl lg:text-2xl"
            >
              {report.title}
            </motion.h2>
            <motion.div variants={buttonVariants}>
              <div className="bg-[#AAAAFF] text-[#0000FF] px-3 py-1 rounded-md text-sm font-semibold">
                $200
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={metadataContainerVariants}
            className="flex flex-col gap-4 mt-6 text-xs md:flex-row md:gap-6 md:mt-8 md:text-sm lg:space-x-6 lg:gap-10 lg:mt-9"
          >
            <motion.div
              variants={metadataItemVariants}
              className="flex flex-col gap-2 text-white md:gap-3"
            >
              <p className="text-sm md:text-base lg:text-[18px]">Severity</p>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-semibold mr-1.5 md:px-4 md:py-2 md:text-xs md:mr-2 ${report.severity === "Critical"
                    ? "bg-red-600"
                    : report.severity === "High"
                      ? "bg-orange-600"
                      : report.severity === "Medium"
                        ? "bg-blue-600"
                        : "bg-gray-600"
                  }`}
              >
                {report.severity}
              </span>
            </motion.div>
            <motion.div
              variants={metadataItemVariants}
              className="flex flex-col gap-2 text-white md:gap-3"
            >
              <p className="text-sm md:text-base lg:text-[18px]">CVSS Score</p>
              <span className="text-white font-semibold">{report.score}</span>
            </motion.div>
            <motion.div
              variants={metadataItemVariants}
              className="flex flex-col gap-2 text-white md:gap-3"
            >
              <p className="text-sm md:text-base lg:text-[18px]">
                Vulnerable URL/Area:
              </p>
              <a
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {report.url || "N/A"}
              </a>
            </motion.div>
            <motion.div
              variants={metadataItemVariants}
              className="flex flex-col gap-2 text-white md:gap-3"
            >
              <p className="text-sm md:text-base lg:text-[18px]">
                Vulnerable Form/Parameter
              </p>
              <span className="text-white font-semibold">
                Broken Access Control
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="flex flex-col gap-5 md:gap-6 lg:gap-7"
        >
          <motion.section
            variants={sectionContentVariants}
            className="mb-4 md:mb-5 lg:mb-6"
          >
            <motion.h3
              variants={sectionTitleVariants}
              className="text-base font-semibold mb-2 md:text-lg md:mb-3 lg:text-xl"
            >
              Vulnerability Description
            </motion.h3>
            <div className="text-white text-sm md:text-base">
              <p>{report.description || "No description provided."}</p>
            </div>
          </motion.section>

          <motion.section
            variants={sectionContentVariants}
            className="mb-4 md:mb-5 lg:mb-6"
          >
            <motion.h3
              variants={sectionTitleVariants}
              className="text-base font-semibold mb-2 md:text-lg md:mb-3 lg:text-xl"
            >
              Impact of Vulnerability
            </motion.h3>
            <div className="text-white text-sm md:text-base">
              <p>{report.impact || "No impact details provided."}</p>
            </div>
          </motion.section>

          <motion.section
            variants={sectionContentVariants}
            className="mb-4 md:mb-5 lg:mb-6"
          >
            <motion.h3
              variants={sectionTitleVariants}
              className="text-base font-semibold mb-2 md:text-lg md:mb-3 lg:text-xl"
            >
              Steps to Reproduce
            </motion.h3>
            <div className="text-white text-sm md:text-base">
              {report.stepsToReproduce && report.stepsToReproduce.length > 0 ? (
                <ol className="list-decimal pl-4 space-y-1.5 md:pl-5 md:space-y-2">
                  {report.stepsToReproduce.map((step, index) => (
                    <motion.li
                      key={index}
                      variants={sectionContentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {step}
                    </motion.li>
                  ))}
                </ol>
              ) : (
                <p>No steps to reproduce provided.</p>
              )}
            </div>
          </motion.section>

          <motion.section
            variants={sectionContentVariants}
            className="mb-4 md:mb-5 lg:mb-6"
          >
            <motion.h3
              variants={sectionTitleVariants}
              className="text-base font-semibold mb-2 md:text-lg md:mb-3 lg:text-xl"
            >
              Proof of Concept (PoC)
            </motion.h3>
            <div className="flex flex-col gap-3 md:flex-row md:gap-4 lg:gap-[18px]">
              <motion.div variants={pocImageVariants}>
                <Image
                  src={poc1}
                  alt="poc 1"
                  width={120}
                  height={80}
                  objectFit="cover"
                  className="rounded-md w-full md:w-[150px]"
                />
              </motion.div>
              <motion.div variants={pocImageVariants}>
                <Image
                  src={poc2}
                  alt="poc 2"
                  width={120}
                  height={80}
                  objectFit="cover"
                  className="rounded-md w-full md:w-[150px]"
                />
              </motion.div>
              <motion.div variants={pocImageVariants}>
                <Image
                  src={poc2}
                  alt="poc 3"
                  width={120}
                  height={80}
                  objectFit="cover"
                  className="rounded-md w-full md:w-[150px]"
                />
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            variants={sectionContentVariants}
            className="mb-4 md:mb-5 lg:mb-6"
          >
            <motion.h3
              variants={sectionTitleVariants}
              className="text-base font-semibold mb-2 md:text-lg md:mb-3 lg:text-xl"
            >
              Mitigation Steps for {report.title}
            </motion.h3>
            <div className="text-white text-sm max-w-[900px] md:text-base">
              {report.mitigation && report.mitigation.length > 0 ? (
                <ol className="list-decimal pl-4 space-y-1.5 md:pl-5 md:space-y-2">
                  {report.mitigation.map((step, index) => (
                    <motion.li
                      key={index}
                      variants={sectionContentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {step}
                    </motion.li>
                  ))}
                </ol>
              ) : (
                <p>No mitigation steps provided.</p>
              )}
            </div>
          </motion.section>
        </motion.div>

      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <motion.div
          variants={modalItemVariants}
          className="flex justify-between items-start mb-3 md:mb-4"
        >
          <div className="flex items-center">
            <p className="bg-[#BC8522] text-2xl rounded-[8px] font-bold h-max px-1.5 mr-1.5 md:text-3xl md:px-2 md:mr-2 lg:text-[40px] lg:rounded-[10px]">
              DG
            </p>
            <h2 className="text-xl font-bold md:text-2xl lg:text-[32px]">
              DeFi Guard
            </h2>
          </div>
          <button
            className="text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsModalOpen(false)}
          >
            <X className="w-6 h-6 text-white md:w-7 md:h-7" />
          </button>
        </motion.div>
        <motion.p
          variants={modalItemVariants}
          className="text-white mb-3 text-sm md:mb-4 md:text-base"
        >
          A decentralized finance (DeFi) protection tool that scans for
          vulnerabilities in DeFi protocols and helps prevent hacks.
        </motion.p>
        <motion.div
          variants={modalItemVariants}
          className="flex flex-wrap gap-1.5 mb-3 md:gap-2 md:mb-4"
        >
          <span className="border border-gray-600 bg-white text-black font-bold px-2 py-0.5 rounded-md text-[10px] md:px-3 md:py-1 md:text-sm">
            DeFi
          </span>
          <span className="border border-gray-600 bg-white text-black font-bold px-2 py-0.5 rounded-md text-[10px] md:px-3 md:py-1 md:text-sm">
            Storage
          </span>
          <span className="border border-gray-600 bg-white text-black font-bold px-2 py-0.5 rounded-md text-[10px] md:px-3 md:py-1 md:text-sm">
            NFTs
          </span>
        </motion.div>
        <motion.div
          variants={modalItemVariants}
          className="mb-3 flex flex-col gap-3 md:flex-row md:gap-4 md:mb-4 lg:gap-5"
        >
          <div className="flex items-center gap-1.5 border border-[#464043] p-1.5 px-2 rounded-[4px] md:p-2 md:px-3 lg:px-[12px] lg:rounded-[6px]">
            <Image
              src={dollars}
              alt="dollars"
              width={16}
              height={16}
              className="md:w-5 md:h-5"
            />
            <p className="text-white text-xs font-semibold md:text-[13px]">
              Prize Pool: <span className="ml-1">$6,350,556</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 border border-[#464043] p-1.5 px-2 rounded-[4px] md:p-2 md:px-3 lg:px-[12px] lg:rounded-[6px]">
            <Image
              src={calendar}
              alt="calendar"
              width={16}
              height={16}
              className="md:w-5 md:h-5"
            />
            <p className="text-white text-xs font-semibold md:text-[13px]">
              Date of Expiry: <span>25-04-2025</span>
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={modalItemVariants}
          className="mb-3 flex flex-col gap-3 md:flex-row md:gap-4 md:mb-4 lg:gap-5"
        >
          <div className="flex items-center gap-1.5 border border-[#464043] p-1.5 px-2 rounded-[4px] md:p-2 md:px-3 lg:px-[12px] lg:rounded-[6px]">
            <Image
              src={github}
              alt="github"
              width={16}
              height={16}
              className="md:w-5 md:h-5"
            />
            <p className="text-white text-xs font-semibold md:text-[13px]">
              DeFi-Guard-Smartcontract
            </p>
          </div>
          <div className="flex items-center gap-1.5 border border-[#464043] p-1.5 px-2 rounded-[4px] md:p-2 md:px-3 lg:px-[12px] lg:rounded-[6px]">
            <Image
              src={github}
              alt="github"
              width={16}
              height={16}
              className="md:w-5 md:h-5"
            />
            <p className="text-white text-xs font-semibold md:text-[13px]">
              DeFi-Guard-Smartcontract
            </p>
          </div>
        </motion.div>
        <motion.div variants={modalItemVariants}>
          <h3 className="font-medium text-lg mb-3 mt-6 md:text-xl md:mb-4 md:mt-8 lg:text-2xl lg:mt-10">
            Languages
          </h3>
          <div>
            <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10">
              <div className="flex items-center gap-1.5 md:gap-2">
                <Image
                  src={ts}
                  alt="typescript"
                  width={16}
                  height={16}
                  className="md:w-5 md:h-5"
                />
                <p className="text-sm md:text-base">TypeScript</p>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Image
                  src={python}
                  alt="python"
                  width={16}
                  height={16}
                  className="md:w-5 md:h-5"
                />
                <p className="text-sm md:text-base">Python</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 md:gap-6 md:mt-4 lg:gap-10 lg:mt-5">
              <div className="flex items-center gap-1.5 md:gap-2">
                <Image
                  src={cairo}
                  alt="cairo"
                  width={16}
                  height={16}
                  className="md:w-5 md:h-5"
                />
                <p className="text-sm md:text-base">Cairo</p>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Image
                  src={rust}
                  alt="rust"
                  width={16}
                  height={16}
                  className="md:w-5 md:h-5"
                />
                <p className="text-sm md:text-base">Rust</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>
    </motion.main>
  );
};

export default Details;
