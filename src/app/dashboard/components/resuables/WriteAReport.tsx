"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { ChevronDownIcon, Redo, Undo, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { Account, byteArray, cairo } from "starknet";
import { ReportData, uploadToPinata } from "@/lib/utils";
import { writeContractWithStarknetJs } from "@/hooks/useBlockchain";
import { useAccount } from "@starknet-react/core";
import { Quill } from "react-quill";
import { renderToStaticMarkup } from "react-dom/server";


const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
if (typeof window !== "undefined") {
  const icons = Quill.import("ui/icons");

  icons["undo"] = renderToStaticMarkup(<Undo size={16} strokeWidth={2} />);
  icons["redo"] = renderToStaticMarkup(<Redo size={16} strokeWidth={2} />);
}
const modules = {
  toolbar: {
    container: [
      ['undo', 'redo'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    handlers: {
      undo: function () {
        // @ts-ignore
        this.quill.history.undo();
      },
      redo: function () {
        // @ts-ignore
        this.quill.history.redo();
      }
    }
  },
  history: {
    delay: 1000,
    maxStack: 100,
    userOnly: true
  }
};



const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script', 'blockquote', 'code-block',
  'list', 'bullet', 'indent',
  'align',
  'link', 'image', 'video',
  'clean'
];


type WriteAReportProps = {
  projectId?: number;
};

export default function WriteAReport({ projectId }: WriteAReportProps) {
  const [severityLevel] = useState([
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "High" },
    { id: 4, name: "Critical" },
  ]);
  const [categories] = useState([
    { id: 1, name: "Smart Contract" },
    { id: 2, name: "Frontend" },
    { id: 3, name: "Backend" },
    { id: 4, name: "Infrastructure" },
  ]);

  const [selectedLevel, setSelectedLevel] = useState(severityLevel[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showLevelOptions, setShowLevelOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const [contractReportId, setContractReportId] = useState<string>("");
  const [generatedReportId, setGeneratedReportId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [risk, setRisk] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { account } = useAccount();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLevelOptions(false);
        setShowCategoryOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
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
      const severityMap: { [key: string]: ReportData["severity"] | "" } = {
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

        if (contractResult && contractResult.result && contractResult.status) {
          setContractReportId(reportId);
          toast.dismiss();
          toast.success(
            `Report submitted to blockchain successfully! Report ID: ${reportId}`
          );
        } else {
          console.error("❌ Contract transaction failed:", contractResult);
          toast.dismiss();
          toast.error("Contract transaction failed. Please try again.");
        }
      } else if (account && !projectId) {
        toast.success(`Report uploaded to IPFS successfully! Hash: ${hash}`);
      } else {
        toast.error("Please connect your wallet to submit to blockchain.");
      }
    } catch (error: any) {
      console.error("Error submitting report:", error);
      toast.error(`Failed to submit report: ${error.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="flex flex-col w-full rounded-[20px] bg-[#1C1618] border px-6 py-8 border-[#464043] relative mt-6"
    >
      <h1 className="text-[24px] font-[700] text-white mb-6 leading-[36px]">
        Fortichain Security Vulnerability Report
      </h1>

      <p className="text-sm text-gray-400 mb-8">
        Submit your security findings and vulnerability reports
      </p>

      {/* Section 1 */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-3">
          Section 1 | <span className="text-gray-300">Description</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-[#161113] border border-[#464043] rounded-lg px-4 py-3 text-sm text-gray-300 outline-none"
          />
          {/* Severity Dropdown */}
          <div className="relative flex-1" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowLevelOptions(!showLevelOptions)}
              className="w-full bg-[#161113] border border-[#464043] rounded-lg px-4 py-3 text-sm flex justify-between items-center text-gray-300"
            >
              {selectedLevel.name}
              <ChevronDownIcon className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {showLevelOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute mt-2 w-full bg-[#161113] border border-[#464043] rounded-lg shadow-lg z-10"
                >
                  {severityLevel.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => {
                        setSelectedLevel(level);
                        setShowLevelOptions(false);
                      }}
                      className="px-4 py-2 text-left w-full hover:bg-[#1e1a1c] text-sm"
                    >
                      {level.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category Dropdown */}
          <div className="relative flex-1" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowCategoryOptions(!showCategoryOptions)}
              className="w-full bg-[#161113] border border-[#464043] rounded-lg px-4 py-3 text-sm flex justify-between items-center text-gray-300"
            >
              {selectedCategory.name}
              <ChevronDownIcon className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {showCategoryOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute mt-2 w-full bg-[#161113] border border-[#464043] rounded-lg shadow-lg z-10"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowCategoryOptions(false);
                      }}
                      className="px-4 py-2 text-left w-full hover:bg-[#1e1a1c] text-sm"
                    >
                      {cat.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          modules={modules}
          formats={formats}
          placeholder="Start typing..."
          className="bg-[#161113] text-gray-300 rounded-lg"
        />
      </div>

      {/* Section 2 */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-3">
          Section 2 | <span className="text-gray-300">Potential Risk</span>
        </h2>
        <ReactQuill
          theme="snow"
          value={risk}
          onChange={setRisk}
          modules={modules}
          formats={formats}
          placeholder="Start typing..."
          className="bg-[#161113] text-gray-300 rounded-lg"
        />
      </div>

      {/* Section 3 */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-3">
          Section 3 | <span className="text-gray-300">Recommendation</span>
        </h2>
        <ReactQuill
          theme="snow"
          value={recommendation}
          onChange={setRecommendation}
          modules={modules}
          formats={formats}
          placeholder="Start typing..."
          className="bg-[#161113] text-gray-300 rounded-lg"
        />
      </div>

      {/* Section 4 */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-3">
          Section 4 | <span className="text-gray-300">Attachments</span>
        </h2>
        <div className="border border-dashed border-[#464043] rounded-lg p-6 flex flex-col items-center justify-center">
          <p className="text-gray-400 mb-2 text-sm">
            Upload Vulnerability Assessments, Pen Test Results, And Compliance
            Reports
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-[#161113] px-4 py-2 rounded-md border border-[#464043] flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />{" "}
            {file ? file.name : "Drop your files here, or click to browse"}
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Supports PDF, DOC, DOCX up to 10MB
          </p>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="bg-gradient-to-r from-[#0000FF] to-[#0044FF] text-white text-[16px] font-[500] py-3 px-6 rounded-full hover:opacity-90 transition disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
      </div>
    </motion.div>
  );
}
