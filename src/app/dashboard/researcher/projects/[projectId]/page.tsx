"use client";

import { projects } from "../mockData";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Bookmark, FileCode, SquarePen } from "lucide-react";
import { useState } from "react";
import CardGrid from "@/app/dashboard/components/resuables/ReportCard";
import { motion } from "framer-motion";
import WriteAReport from "@/app/dashboard/components/resuables/WriteAReport";
import { IoLogoGithub } from "react-icons/io";
import ActionCard from "@/app/dashboard/components/ActionCard/ActionCard";
import ReportDiscussion from "@/app/dashboard/components/resuables/ReportDiscussion";

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
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const handleOpenChatModal = () => setIsChatModalOpen(true);
  const handleCloseChatModal = () => setIsChatModalOpen(false);

  const handleBookmark = () => setBookmark(!bookmark);
  const handleOpenWriteModal = () => setIsWriteModalOpen(true);
  const handleCloseWriteModal = () => setIsWriteModalOpen(false);

  const handleOpenViewModal = () => setIsViewModalOpen(true);
  const handleCloseViewModal = () => setIsViewModalOpen(false);

  const bookmarkIcon = bookmark ? (
    <Bookmark size={35} color="white" onClick={handleBookmark} />
  ) : (
    <Bookmark size={35} color="white" fill="white" onClick={handleBookmark} />
  );

  const report = ["fhf"];

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

      {/* Main project details */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-[#161113] flex flex-col gap-[35px] rounded-[20px] border border-[#464043] py-[40px] px-[28px]"
      >
        {/* Project header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex  items-center"
        >
          <div className="flex flex-col w-full">
            <div className="flex items-center space-x-2 mb-4">
              <span
                className={`w-1 h-1 rounded-full ${project.status === "Completed"
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
                <h1 className="text-[14px] md:text-[32px] font-[700]">{project.title}</h1>
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
                <span className="text-[#fff] text-[14px]">{project.amount}</span>
              </div>
              <div></div>
            </div>
          </div>
        </motion.div>
        <div className="flex items-center gap-2">
          <span className="text-[#6C6C6C] text-[11px]">Deadline:</span>
          <div className="rounded-3xl px-4 py-1 bg-[#212121] text-[11px] text-gray-300">
            {project.deadline}
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#212121]"></div>
        {/* Project description */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className=" text-[11px] text-[#6C6C6C] mb-[-18px]"
        >
          Details
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className=" text-[14px] text-white mb-[-18px]"
        >
          {project.description}
        </motion.p>

        {/* Priority, Prize Pool, Deadline, Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="flex flex-col gap-3"
        >
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className=" text-[11px] text-[#6C6C6C]"
          >
            Links
          </motion.p>
          <div className="flex gap-6 flex-col md:flex-row  items-start md:items-center">
            <div className="px-4 py-[3px] rounded-3xl text-[11px]  bg-[#212121] border border-[#312F2F] flex items-center gap-2"><IoLogoGithub className="text-[#6C6C6C]" />Github Repo <ArrowUpRight size={15} color="#6C6C6C" /></div>
            <div className="px-4 py-[3px] rounded-3xl text-[11px] bg-[#212121] border border-[#312F2F] flex items-center gap-2"><FileCode size={15} color="#6C6C6C" />Contract Address <ArrowUpRight size={15} color="#6C6C6C" /></div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="flex flex-col gap-3"
        >
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className=" text-[11px] text-[#6C6C6C]"
          >
            Rewards
          </motion.p>
          <div className="flex gap-6 items-center">
            Rewards would be paid on successful completion by validator
          </div>
        </motion.div>

      </motion.div>
      <div className="flex items-center flex-col md:flex-row justify-between mt-4 gap-4">
        <div className="bg-[#1F1F1F] p-4 w-full md:w-[33%] rounded-2xl">
          <ActionCard
            label="Write Report"
            buttonText="Start"
            onClick={handleOpenWriteModal}
          />
        </div>
        <div className="bg-[#1F1F1F] p-4 w-full md:w-[33%] rounded-2xl">
          <ActionCard
            label="Discussions"
            buttonText="Chat with Validator"
            onClick={handleOpenChatModal}
          />

        </div>
        <div className="bg-[#1F1F1F] p-4 w-full md:w-[33%] rounded-2xl">
          <ActionCard
            label="Edit Report"
            buttonText="Edit"
            onClick={handleOpenViewModal}
          />
        </div>
      </div>
      {/* Modals */}
      <WriteAReport isOpen={isWriteModalOpen} onClose={handleCloseWriteModal} projectId={projectId} />
      <CardGrid isOpen={isViewModalOpen} onClose={handleCloseViewModal} />
      {isChatModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-[#161113] rounded-2xl w-full h-full p-6 relative">
      <button
        onClick={handleCloseChatModal}
        className="absolute top-3 right-3 text-gray-400 hover:text-white"
      >
        ✕
      </button>
      <ReportDiscussion />
    </div>
  </div>
)}


    </motion.div>
  );
}
