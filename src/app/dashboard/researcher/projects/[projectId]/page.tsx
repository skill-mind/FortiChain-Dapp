"use client";

import { projects } from "../mockData";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Bookmark, FileCode } from "lucide-react";
import { useState } from "react";
import CardGrid from "@/app/dashboard/components/resuables/ReportCard";
import { motion } from "framer-motion";
import WriteAReport from "@/app/dashboard/components/resuables/WriteAReport";
import { IoLogoGithub } from "react-icons/io";
import ActionCard from "@/app/dashboard/components/ActionCard/ActionCard";
import ReportDiscussion from "@/app/dashboard/components/resuables/ReportDiscussion";
import WriteAReportWriteAReport from "@/app/dashboard/components/resuables/WriteAReport";

type Props = {
  params: {
    projectId: string;
  };
};

export default function ProjectDetailsPage({ params }: Props) {
  const projectId = Number(params.projectId);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  const [bookmark, setBookmark] = useState(false);
  const [showWriteReport, setShowWriteReport] = useState(false);
  const [showViewReport, setShowViewReport] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);

  const handleBookmark = () => setBookmark(!bookmark);

  const bookmarkIcon = bookmark ? (
    <Bookmark size={35} color="white" onClick={handleBookmark} />
  ) : (
    <Bookmark size={35} color="white" fill="white" onClick={handleBookmark} />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative text-white p-8"
    >
      <a
        href="/dashboard/researcher/projects"
        className="text-gray-400 mb-4 inline-block"
      >
        &larr; Go Back
      </a>

      {/* Project details */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-[#161113] flex flex-col gap-[35px] rounded-[20px] border border-[#464043] py-[40px] px-[28px]"
      >
        {/* Header */}
        <div className="flex items-center">
          <div className="flex flex-col w-full">
            <div className="flex items-center space-x-2 mb-4">
              <span
                className={`w-1 h-1 rounded-full ${
                  project.status === "Completed"
                    ? "bg-green-500"
                    : project.status === "Available"
                    ? "bg-blue-900"
                    : "bg-gray-400"
                }`}
              ></span>
              <span className="text-xs font-semibold text-gray-500">
                {project.status}
              </span>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={project.logo.logo} alt="" />
                <h1 className="text-[14px] md:text-[32px] font-[700]">
                  {project.title}
                </h1>
              </div>
              <div className="hidden md:flex bg-[#1F1F1F] rounded-xl px-4 py-2 text-[#6C6C6C] text-[11px] items-center gap-2">
                <span>Bounty Amount</span>
                <span className="w-[1px] h-4 bg-[#6C6C6C] inline-block"></span>
                <span className="text-[#fff] text-[14px]">{project.amount}</span>
              </div>
            </div>
            <div className="w-full">
              <div className="md:hidden mt-6 inline-flex bg-[#1F1F1F] rounded-xl px-4 py-2 text-[#6C6C6C] text-[11px] items-center gap-2">
                <span>Bounty Amount</span>
                <span className="w-[1px] h-4 bg-[#6C6C6C] inline-block"></span>
                <span className="text-[#fff] text-[14px]">
                  {project.amount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2">
          <span className="text-[#6C6C6C] text-[11px]">Deadline:</span>
          <div className="rounded-3xl px-4 py-1 bg-[#212121] text-[11px] text-gray-300">
            {project.deadline}
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#212121]"></div>

        {/* Description */}
        <motion.p className="text-[11px] text-[#6C6C6C]">Details</motion.p>
        <motion.p className="text-[14px] text-white">
          {project.description}
        </motion.p>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] text-[#6C6C6C]">Links</p>
          <div className="flex gap-6 flex-col md:flex-row items-start md:items-center">
            <div className="px-4 py-[3px] rounded-3xl text-[11px] bg-[#212121] border border-[#312F2F] flex items-center gap-2">
              <IoLogoGithub className="text-[#6C6C6C]" />
              Github Repo <ArrowUpRight size={15} color="#6C6C6C" />
            </div>
            <div className="px-4 py-[3px] rounded-3xl text-[11px] bg-[#212121] border border-[#312F2F] flex items-center gap-2">
              <FileCode size={15} color="#6C6C6C" />
              Contract Address <ArrowUpRight size={15} color="#6C6C6C" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Cards */}
      <div className="flex items-center flex-col md:flex-row justify-between mt-4 gap-4">
        <div className="bg-[#1F1F1F] p-4 w-full md:w-[33%] rounded-2xl">
          <ActionCard
            label="Write Report"
            buttonText="Start"
            onClick={() => setShowWriteReport(!showWriteReport)}
          />
        </div>
        <div className="bg-[#1F1F1F] p-4 w-full md:w-[33%] rounded-2xl">
          <ActionCard
            label="Discussions"
            buttonText="Chat with Validator"
            onClick={() => setShowDiscussion(!showDiscussion)}
          />
        </div>
        <div className="bg-[#1F1F1F] p-4 w-full md:w-[33%] rounded-2xl">
          <ActionCard
            label="Edit Report"
            buttonText="Edit"
            onClick={() => setShowViewReport(!showViewReport)}
          />
        </div>
      </div>

      {/* Inline Sections */}
      {showWriteReport && (
        <div className="mt-6">
          <WriteAReport projectId={projectId} />
        </div>
      )}
      {showViewReport && (
        <div className="mt-6">
          <CardGrid />
        </div>
      )}
      {showDiscussion && (
        <div className="mt-6">
          <ReportDiscussion />
        </div>
      )}
    </motion.div>
  );
}
