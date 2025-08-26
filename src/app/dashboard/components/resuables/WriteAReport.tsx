"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { ChevronDownIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { ReportData, uploadToPinata } from "@/lib/utils";
import toast from "react-hot-toast";
import { writeContractWithStarknetJs } from "@/hooks/useBlockchain";
import { Account, byteArray, cairo } from "starknet";
import { useAccount } from "@starknet-react/core";
import { has } from "lodash";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    ["header", "font", "size"],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
  "code-block",
];

type WriteAReportProps = {
  isOpen: boolean;
  onClose: () => void;
  projectId?: number;
};

export default function WriteAReport({
  isOpen,
  onClose,
  projectId,
}: WriteAReportProps) {
  const [value, setValue] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const [contractReportId, setContractReportId] = useState<string>("");
  const [generatedReportId, setGeneratedReportId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");

  const [severityLevel] = useState([
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "High" },
    { id: 4, name: "Critical" },
  ]);
  const [selectedLevel, setSelectedLevel] = useState(severityLevel[0]);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { account } = useAccount();

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleSelect = (level: { id: number; name: string }) => {
    setSelectedLevel(level);
    setShowOptions(false);
  };

  const generateUniqueId = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `RPT-${timestamp}-${random}`.toUpperCase();
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    

    setIsSubmitting(true);

    try {
      const severityMap: { [key: string]: ReportData["severity"] } = {
        Low: "low",
        Medium: "high",
        High: "high",
        Critical: "critical",
      };

      const reportId = generateUniqueId();
      setGeneratedReportId(reportId);

      const reportData: ReportData = {
        id: reportId,
        name: title.trim(),
        severity: severityMap[selectedLevel.name] || "low",
        status: "pending",
      };

      const hash = await uploadToPinata(reportData);
      setIpfsHash(hash);
      toast.success(`Report uploaded to IPFS! Hash: ${hash}`);

      console.log({
        reportData,
        projectId,
        account,
        hash,
      }, 'hash');

      if (account && projectId) {
        toast.loading("Submitting to contract...");

        const contractArgs = {
          project_id: cairo.uint256(projectId),
          report_uri: byteArray.byteArrayFromString(hash),
        };

        const contractResult = await writeContractWithStarknetJs(
          account as Account,
          "submit_report",
          contractArgs
        );


        console.log({
          contractResult
        }, 'result');

        if (contractResult && contractResult.result && contractResult.status) {
          setContractReportId(reportId);
          setIsSubmitted(true);
          toast.dismiss();
          toast.success(
            `Report submitted to blockchain successfully! Report ID: ${reportId}`
          );
        } else {
          console.error(
            "❌ WriteAReport: Contract transaction failed:",
            contractResult
          );
          toast.dismiss();
          toast.error("Contract transaction failed. Please try again.");
        }
      } else if (account && !projectId) {
        setIsSubmitted(true);
        toast.success(`Report uploaded to IPFS successfully! Hash: ${hash}`);
      } else {
        toast.error("Please connect your wallet to submit to blockchain.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      // setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setIpfsHash("");
    setContractReportId("");
    setGeneratedReportId("");
    setTitle("");
    setProject("");
    setValue("");
    setPreviewMode(false);
    setSelectedLevel(severityLevel[0]);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) {
    return null;
  }
  return (
    <div className="min-h-screen bg-[#110D0F] text-white p-10 bg-[#504F4F0F] top-0 inset-0 backdrop-blur-lg z-50 w-full fixed">
      {!isSubmitted ? (
        <div className="flex w-full h-full relative justify-center items-center">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="flex flex-col w-full rounded-[30px] bg-[#1C1618] border px-[32px] py-[26px] border-[#464043] relative max-w-6xl"
          >
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 80 }}
              className="text-[32px] font-[800] text-white text-center"
            >
              Write a Report
            </motion.h1>

            <button
              type="button"
              className="absolute top-5 right-5 text-white"
              onClick={onClose}
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
              className="flex flex-col gap-5 mt-10"
            >
              {/* Report Title */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
                className="flex flex-col gap-2"
              >
                <label htmlFor="title" className="text-[14px] font-[600]">
                  Report Title
                </label>
                <input
                  className="outline-none border py-[14px] px-[8px] text-[#B5B3B4] text-[13px] rounded-[8px] font-[500] bg-[#161113]"
                  type="text"
                  id="title"
                  placeholder="Give your report a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </motion.div>

              {/* Project and Severity Level */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
                className="flex flex-col md:flex-row w-full gap-2"
              >
                {/* Project Input */}
                <div className="flex flex-col gap-2 md:w-3/5 w-full">
                  <label htmlFor="project" className="text-[14px] font-[600]">
                    Project
                  </label>
                  <input
                    className="outline-none border py-[14px] px-[8px] text-[#B5B3B4] text-[13px] rounded-[8px] font-[500] bg-[#161113]"
                    type="text"
                    id="project"
                    placeholder="Project Name"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                  />
                </div>

                {/* Severity Level Dropdown */}
                <div
                  className="flex flex-col gap-2 md:w-2/5 w-full"
                  ref={dropdownRef}
                >
                  <label htmlFor="level" className="text-[14px] font-[600]">
                    Severity Level
                  </label>
                  <div className="relative bg-[#161113] border border-[#D3D1D2] text-[#B5B3B4] rounded-[8px] text-[13px] font-[500] py-[4px] px-[8px] flex justify-between items-center w-full">
                    <span>{selectedLevel.name}</span>

                    <button
                      type="button"
                      onClick={toggleOptions}
                      className="p-2 rounded-md hover:bg-[#2a2527] transition"
                    >
                      <ChevronDownIcon className="w-6 h-6" />
                    </button>

                    <AnimatePresence>
                      {showOptions && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-2 left-0 w-full bg-[#161113] border border-[#D3D1D2] rounded-md shadow-lg z-10"
                        >
                          {severityLevel.map((level) => (
                            <button
                              key={level.id}
                              type="button"
                              onClick={() => handleSelect(level)}
                              className="px-4 py-2 hover:bg-[#1e1a1c] transition-all cursor-pointer w-full text-left bg-transparent"
                            >
                              {level.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Quill Editor */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 80 }}
                className="flex flex-col gap-3"
              >
                <h2 className="text-sm font-medium text-white">Report Body</h2>
                <div className="flex w-full items-start justify-between bg-[#161113] p-3 rounded-md">
                  <div className="w-full">
                    {!previewMode ? (
                      <div className="w-full">
                        <ReactQuill
                          theme="snow"
                          value={value}
                          onChange={setValue}
                          modules={modules}
                          formats={formats}
                          placeholder="Describe Vulnerabilities Found and Suggest a fix"
                        />
                      </div>
                    ) : (
                      <div className="p-4 min-h-[120px] bg-[#161113] text-gray-300 rounded-md overflow-y-auto prose prose-invert max-w-none">
                        <div>{value}</div>
                      </div>
                    )}
                  </div>
                  <div className="pl-4">
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="bg-[#161113] border border-[#464043] text-white text-sm py-2 px-4 rounded-md hover:bg-[#1e1a1c] transition"
                    >
                      {previewMode ? "Edit" : "Preview"}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
                className="mt-6"
              >
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-[#0000FF] text-white text-[16px] font-[400] py-2 px-4 rounded-md hover:bg-[#7272f5] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading to IPFS...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      ) : (
        // ✅ Success Modal
        <div className="w-full h-full flex bg-[#504F4F0F] inset-0 backdrop-blur-lg z-50 justify-center items-center absolute top-0 left-0">
          <div className="max-w-[538px] w-full h-auto bg-[#211A1D] border border-[#464043] rounded-[10px] p-[20px] gap-[10px]">
            <div className="flex flex-col items-center gap-[10px]">
              <h1 className="text-[28px] font-[800] text-white text-center">
                Report Submitted Successfully
              </h1>
              <p className="text-[16px] font-[300] mb-6 border-b w-full text-center border-[#282527]">
                Your report has been submitted.
              </p>
              <Image
                src={"/researcherIcon/check.svg"}
                alt="check"
                width={40}
                height={40}
                className="mb-6"
              />
              <button
                type="button"
                onClick={handleGoBack}
                className="bg-[#0000FF] text-white w-fit text-[16px] font-[400] py-2 px-8 rounded-md hover:bg-[#7272f5] transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
