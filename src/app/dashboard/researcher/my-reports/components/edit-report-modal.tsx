"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { X, File, Trash2 } from "lucide-react";
import type { Project } from "./types";
import { StatusBadge } from "./status-badge";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { useToast } from "@/hooks/use-toast";

interface EditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export const EditReportModal: React.FC<EditReportModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [reportTitle, setReportTitle] = useState(project.report.reportTitle);
  const [severity, setSeverity] = useState(project.report.severity);
  const [category, setCategory] = useState(project.report.category);
  const [description, setDescription] = useState(
    project.report.reportDescription
  );
  const [potentialRisk, setPotentialRisk] = useState(
    project.report.reportPotentialRisk
  );
  const [recommendations, setRecommendations] = useState(
    project.report.reportRecommendations
  );
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    files.forEach((file) => {
      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB. Please select a smaller file.`,
          variant: "destructive",
        });
        return;
      }

      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type. Please upload PDF, DOC, DOCX, or TXT files.`,
          variant: "destructive",
        });
        return;
      }

      setUploadedFiles((prev) => [...prev, file]);
    });

    if (files.length > 0) {
      toast({
        title: "Files uploaded",
        description: `${files.length} file(s) have been successfully uploaded.`,
      });
    }
  };

  // Remove uploaded file
  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    toast({
      title: "File removed",
      description: "File has been removed from the upload list.",
    });
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!isOpen) return null;

  const sections = [
    { id: 1, title: "Description" },
    { id: 2, title: "Potential Risk" },
    { id: 3, title: "Recommendation" },
    { id: 4, title: "Attachments" },
  ];

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full rounded-[8px] max-w-none h-full flex gap-y-4 flex-col">
        {/* Header */}
        <div className="px-5 py-3 border-[1px] border-[#1F1F1F] rounded-[8px] sticky top-0 bg-[#101011] z-10">
          <div className="flex items-center justify-between mb-4">
            <StatusBadge
              size="sm"
              className="pl-0"
              status={project.available ? "Available" : "Unavailable"}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-[#E2E2E2] bg-[#1C1C1C] rounded-full px-[8px] shadow-md hover:bg-[#1C1C1C] hover:text-[#E2E2E2]"
            >
              <X className="h-[14px] w-[14px] m-0 p-0" />
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row gap-y-6 lg:items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-0 m-0 rounded-[8px] overflow-hidden">
                <Image
                  src={project?.logo}
                  className="h-10 w-10"
                  alt={project.title}
                  width={40}
                  height={40}
                />
              </div>
              <h2 className="text-base font-semibold text-[#E2E2E2]">
                {project.title}
              </h2>
            </div>
            <div className="flex items-center border-[1px] w-fit border-[#1F1F1F] bg-[#1C1C1C] rounded-[8px] py-3 px-6">
              <p className="text-sm text-[#6C6C6C] border-r-[1px] border-[#6C6C6C] pr-4">
                Bounty amount
              </p>
              <p className="text-[#E2E2E2] text-[18px] font-medium pl-4">
                {project.bounty}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-2 mb-4 border-b-[1px] pb-6 border-[#1F1F1F]">
            <p className="text-xs text-[#6C6C6C]">Deadline :</p>
            <p className="text-[#E2E2E2] bg-[#1C1C1C] [#E2E2E2]space-nowrap py-2 px-3 text-xs rounded-full">
              {project.deadline}
            </p>
          </div>

          {/* Project Details */}
          <div className="mb-6">
            <p className="text-[#6C6C6C] mb-2">Details</p>
            <p className="text-sm text-[#E2E2E2] leading-relaxed mb-4">
              {project.report.details}
            </p>

            <p className="text-[#6C6C6C] mb-2">Links</p>
            <div className="flex flex-col lg:flex-row gap-y-3 gap-4 mb-4">
              <Button
                variant="outline"
                size="sm"
                className="text-[#E2E2E2] w-fit md:w-auto border-0 hover:border-0 hover:text-inherit bg-gradient-to-r rounded-full p-0.5 hover:text-[#E2E2E2] from-[#212121] to-[#312F2F] "
              >
                <div className="px-3 py-3 w-full h-full flex gap-x-2 items-center bg-[#1C1C1C] justify-center rounded-full text-inherit">
                  <Image
                    src="/researcherIcon/githubstyled.svg"
                    alt={`${project?.title}'s github`}
                    width={18}
                    height={18}
                    className="h-4 w-4 "
                  />
                  GitHub Repo
                  <Image
                    src="/researcherIcon/arrow-right.svg"
                    alt="external"
                    width={10}
                    height={10}
                    className="h-[9px] w-[9px] "
                  />
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[#E2E2E2] w-fit md:w-auto border-0 hover:border-0 hover:text-inherit bg-gradient-to-r rounded-full p-0.5 hover:text-[#E2E2E2] from-[#212121] to-[#312F2F] "
              >
                <div className="px-3 py-3 w-full h-full font-normal flex gap-x-2 items-center bg-[#1C1C1C] justify-center rounded-full text-inherit">
                  <Image
                    src="/researcherIcon/code.svg"
                    alt={`${project?.title}'s Contract Address`}
                    width={18}
                    height={18}
                    className="h-4 w-4 "
                  />
                  Contract Address
                  <Image
                    src="/researcherIcon/arrow-right.svg"
                    alt="external"
                    width={10}
                    height={10}
                    className="h-[9px] w-[9px] "
                  />
                </div>
              </Button>
            </div>

            <p className="text-[#6C6C6C] mb-4">Rewards</p>
            <p className="text-sm text-[#E2E2E2] mb-4">
              Rewards would be paid on successful completion by validator.
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full justify-between">
          <div className=" border-[1px] border-[#1F1F1F] bg-[#101011] p-6 rounded-[8px]">
            <div className="flex items-center justify-between rounded-[8px] py-3 px-4 bg-[#141414]">
              <p className="text-[#E2E2E2] text-sm md:text-[16px] font-[600]">
                Write Report
              </p>
              <Button
                variant="outline"
                size="sm"
                className="text-[#E2E2E2] w-auto md:w-auto border-0 hover:border-0 hover:text-inherit bg-gradient-to-r rounded-full p-0.5 hover:text-[#E2E2E2] from-[#212121] to-[#312F2F] "
              >
                <div className="px-8 py-3 w-full h-full flex gap-x-2 items-center bg-[#1C1C1C] justify-center rounded-full text-inherit">
                  Start
                </div>
              </Button>
            </div>
          </div>
          <div className=" border-[1px] border-[#1F1F1F] bg-[#101011] p-6 rounded-[8px]">
            <div className="flex items-center justify-between gap-x-4 rounded-[8px] py-3 px-4 bg-[#141414]">
              <p className="text-[#E2E2E2]  text-sm md:text-[16px] font-[600]">
                Discussions
              </p>
              <Button
                variant="outline"
                size="sm"
                className="text-[#E2E2E2] w-auto md:w-auto border-0 hover:border-0 hover:text-inherit bg-gradient-to-r rounded-full p-0.5 hover:text-[#E2E2E2] from-[#212121] to-[#312F2F] "
              >
                <div className="px-3 lg:px-8 py-3 w-full h-full flex gap-x-2 items-center bg-[#1C1C1C] justify-center rounded-full text-inherit">
                  Chat with validator
                </div>
              </Button>
            </div>
          </div>
          <div className=" border-[1px] border-[#1F1F1F] bg-[#101011] p-6 rounded-[8px]">
            <div className="flex items-center justify-between rounded-[8px] py-3 px-4 bg-[#141414]">
              <p className="text-[#E2E2E2] text-sm md:text-[16px] font-[600]">
                Edit Report
              </p>
              <Button
                variant="outline"
                size="sm"
                className="text-[#E2E2E2] w-auto border-0 hover:border-0 hover:text-inherit bg-gradient-to-r rounded-full p-0.5 hover:text-[#E2E2E2] from-[#212121] to-[#312F2F] "
              >
                <div className="px-8 py-3 w-full h-full flex gap-x-2 items-center bg-[#1C1C1C] justify-center rounded-full text-inherit">
                  Edit
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Editing Report Section */}
        <div className="flex-1 flex flex-col border-[1px] border-[#1F1F1F] bg-[#101011] rounded-[8px] px-4">
          <div className="flex items-center justify-between rounded-[8px] py-3">
            <p className="text-[#E2E2E2] text-xl font-[500] pb-4 w-full pt-2 border-b-[1px] border-[#1F1F1F] leading-[150%]">
              Editing Report
            </p>
          </div>
          <div className="">
            <div className="flex items-center justify-between w-fit rounded-[8px] py-2 md:py-3 px-3 border-[1px] border-[#1F1F1F] bg-[#1C1C1C]">
              <span className="text-xs text-[#6C6C6C] mr-2"> Section 1 |</span>{" "}
              Description
            </div>
          </div>
          {/* Report Title and Dropdowns */}
          <div className="py-6 border-[#1F1F1F]">
            <div className="grid grid-cols-1 xl:grid-cols-4 h-full xl:h-[60px] gap-4 xl:gap-8 items-center">
              <Input
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="flex-1 rounded-full  h-[60px] xl:h-full py-3 px-6 xl:col-span-2 border-[#1F1F1F] text-[#E2E2E2]"
              />
              <Select
                value={severity}
                onValueChange={(v) =>
                  setSeverity(v as Project["report"]["severity"])
                }
              >
                <SelectTrigger className="w-full h-[60px] xl:h-full rounded-full px-8 bg-transparent border-[#1F1F1F] text-[#E2E2E2]">
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent className="bg-[#101011] rounded-[8px] py-1 px-1 border-[#1F1F1F]">
                  <SelectItem
                    value="Low"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#141414] focus:text-[#E2E2E2] rounded-full"
                  >
                    <span className="flex flex-row items-center gap-x-2.5">
                      <div className="h-2 w-[2px] bg-[#0073E6]"></div> Low
                    </span>
                  </SelectItem>
                  <SelectItem
                    value="Medium"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#141414] focus:text-[#E2E2E2] rounded-full"
                  >
                    <span className="flex flex-row items-center gap-x-2.5">
                      <div className="h-2 w-[2px] bg-[#C1B700]"></div> Medium
                    </span>
                  </SelectItem>
                  <SelectItem
                    value="High"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#141414] focus:text-[#E2E2E2] rounded-full"
                  >
                    <span className="flex flex-row items-center gap-x-2.5">
                      <div className="h-2 w-[2px] bg-[#EF4343]"></div> High
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full h-[60px] xl:h-full rounded-full bg-transparent px-8 border-[#1F1F1F] text-[#E2E2E2]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#101011] rounded-[8px] p-1 border-[#1F1F1F]">
                  <SelectItem
                    value="Logic Error"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#101011] focus:text-[#E2E2E2] rounded-full"
                  >
                    Logic Error
                  </SelectItem>
                  <SelectItem
                    value="Security"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#141414] focus:text-[#E2E2E2] rounded-full"
                  >
                    Security
                  </SelectItem>
                  <SelectItem
                    value="Performance"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#141414] focus:text-[#E2E2E2] rounded-full"
                  >
                    Performance
                  </SelectItem>
                  <SelectItem
                    value="Compliance"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#141414] focus:text-[#E2E2E2] rounded-full"
                  >
                    Compliance
                  </SelectItem>
                  <SelectItem
                    value="Re-entrancy"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#141414] focus:text-[#E2E2E2] rounded-full"
                  >
                    Re-entrancy
                  </SelectItem>
                  <SelectItem
                    value="Access Control"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#141414] focus:text-[#E2E2E2] rounded-full"
                  >
                    Access Control
                  </SelectItem>
                  <SelectItem
                    value="Gas Optimization"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#141414] focus:text-[#E2E2E2] rounded-full"
                  >
                    Gas Optimization
                  </SelectItem>
                  <SelectItem
                    value="Best practices"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#141414] focus:text-[#E2E2E2] rounded-full"
                  >
                    Best practices
                  </SelectItem>
                  <SelectItem
                    value="Others"
                    className="text-[#E2E2E2] h-[60px] px-6 flex flex-row items-center justify-between hover:bg-[#101011] focus:bg-[#141414] focus:text-[#E2E2E2] rounded-full"
                  >
                    Others
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Rich Text Editor for Description */}
          <RichTextEditor
            value={description}
            onChange={setDescription}
            placeholder="Enter your report description..."
            minHeight="500px"
          />
          <div className="mt-4">
            <div className="flex items-center justify-between w-fit rounded-[8px] py-2 md:py-3 px-3 border-[1px] border-[#1F1F1F] bg-[#1C1C1C]">
              <span className="text-xs text-[#6C6C6C] mr-2"> Section 2 |</span>{" "}
              Potential Risk
            </div>
          </div>

          {/* Rich Text Editor for Potential Risk */}
          <RichTextEditor
              value={potentialRisk}
            onChange={setPotentialRisk}
              placeholder="Enter potential risks..."
            minHeight="500px"
            className="mt-4"
          />
          <div className="mt-4">
            <div className="flex items-center justify-between w-fit rounded-[8px] py-2 md:py-3 px-3 border-[1px] border-[#1F1F1F] bg-[#1C1C1C]">
              <span className="text-xs text-[#6C6C6C] mr-2"> Section 3 |</span>{" "}
              Recommendations
            </div>
          </div>
          {/* Rich Text Editor for Recommendations */}
          <RichTextEditor
              value={recommendations}
            onChange={setRecommendations}
              placeholder="Enter recommendations..."
            minHeight="500px"
            className="mt-4"
            />
          <div className="my-4">
            <div className="flex items-center justify-between w-fit rounded-[8px] py-2 md:py-3 px-3 border-[1px] border-[#1F1F1F] bg-[#1C1C1C]">
              <span className="text-xs text-[#6C6C6C] mr-2"> Section 4 |</span>{" "}
              Attachments
            </div>
          </div>
          <div className="text-left flex flex-col justify-center">
            <p className="text-[#6C6C6C] mb-6">
              Upload Vulnerability Assessments, Pen Test Results, And Compliance
              Reports.
            </p>

            {/* File Upload Area */}
            <div
              className="border-2 border-dashed border-[#1F1F1F] flex items-center flex-col gap-y-3 rounded-[8px] p-12 bg-transparent hover:border-[#3B82F6] transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image
                src="/researcherIcon/UploadSimple.svg"
                width={24}
                height={24}
                alt="Upload image"
              />
              <div>
                <p className="text-[#E2E2E2] mb-2">
                  Drop your files here, or click to browse
                </p>
                <p className="text-[#6C6C6C] text-xs mb-4">
                  Supports PDF, DOC, DOCX, TXT Up To 10MB
                </p>
              </div>
              <Button
                type="button"
                className="bg-[#1F1F1F] rounded-full text-[#E2E2E2] hover:bg-[#2A2A2A]"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Upload File
              </Button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="text-[#E2E2E2] text-sm font-medium mb-3">
                  Uploaded Files ({uploadedFiles.length})
                </h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#1C1C1C] border border-[#1F1F1F] rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <File className="h-4 w-4 text-[#6C6C6C]" />
                        <div>
                          <p className="text-[#E2E2E2] text-sm font-medium">
                            {file.name}
                          </p>
                          <p className="text-[#6C6C6C] text-xs">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Update Button */}
          <div className="py-8 border-t border-[#1F1F1F]">
            <Button
              variant="outline"
              size="lg"
              className="text-[#E2E2E2] w-full md:w-auto border-0 hover:border-0 hover:text-inherit rounded-full p-0.5 lg:h-[60px] h-[50px]"
              style={{
                background:
                  "linear-gradient(90deg,  hsla(210, 59%, 40%, 1), hsla(210, 59%, 15%, 1)",
              }}
            >
              <div
                className="px-16 xl:px-24 py-3 w-full h-full flex font-normal gap-x-2 items-center justify-center rounded-full text-inherit text-sm"
                style={{
                  background:
                    "linear-gradient(90deg, hsla(215, 80%, 17%, 1), hsla(216, 95%, 55%, 1)",
                }}
              >
                Update Report
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
