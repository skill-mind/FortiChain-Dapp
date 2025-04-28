"use client";

import { projects } from "../mockData";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Bookmark, SquarePen } from "lucide-react";
import { useState } from "react";
import CardGrid from "@/app/dashboard/components/resuables/ReportCard";
import { motion } from "framer-motion";
import WriteAReport from "@/app/dashboard/components/resuables/WriteAReport";

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
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <div
              className={`${project.logo.bgColor} text-white font-[800] text-[40px] px-2  rounded-xl`}
            >
              {project.logo.text}
            </div>
            <h1 className="text-[32px] font-[700]">{project.title}</h1>
          </div>
          <button type="button">{bookmarkIcon}</button>
        </motion.div>

        {/* Project description */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[300] text-[18px] text-white"
        >
          {project.description}
        </motion.p>

        {/* Tags, Prize Pool, Deadline, Repository */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white text-black text-[13px] font-[600] border-[#464043] py-1 px-3 rounded-[5px]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-[13px] text-sm">
            <div className="flex items-center gap-2 border border-[#464043] rounded-[5px] py-[4px] px-[8px] text-[13px] font-[600]">
              <Image
                src={"/researcherIcon/moneyBag.svg"}
                alt="Money bag logo"
                width={20}
                height={20}
              />
              Prize Pool: {project.amount}
            </div>

            <div className="flex items-center gap-2 border border-[#464043] rounded-[5px] py-[4px] px-[8px] text-[13px] font-[600]">
              <Image
                src={"/researcherIcon/deadLine.svg"}
                alt="deadline"
                width={20}
                height={20}
              />
              Deadline: {project.deadline}
            </div>
          </div>

          {/* Repository */}
          <div className="flex items-center gap-[13px] text-sm">
            {project.repository?.map((repo) => (
              <div
                key={repo.name}
                className="flex items-center gap-2 border border-[#464043] rounded-[5px] py-[4px] px-[8px] text-[13px] font-[600]"
              >
                <Image
                  src={"/researcherIcon/github.svg"}
                  alt="repository"
                  width={20}
                  height={20}
                />
                <span>{repo.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col gap-2"
        >
          <h2 className="text-xl font-semibold mb-2">Languages</h2>
          <div className="grid grid-cols-2 gap-4">
            {project.language && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(project.language).map(
                  ([languageName, languageData]) => (
                    <div key={languageName} className="flex items-center gap-3">
                      <Image
                        width={24}
                        height={24}
                        src={languageData.logo}
                        alt={`${languageName} logo`}
                        className="w-6 h-6"
                      />
                      <span className="capitalize font-semibold">
                        {languageName}
                      </span>
                      <span className="text-[#6B6668] text-[12px] font-[600]">
                        {languageData.percentage}%
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3 }}
          className="mt-8 flex items-center gap-4"
        >
          {/* Write a Report */}
          <button
            onClick={handleOpenWriteModal}
            type="button"
            className="bg-[#0000FF] rounded-[10px] px-[16px] py-[10px] hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <span className="text-[16px] font-[400]">Write a Report</span>
            <SquarePen />
          </button>

          {/* View Report */}
          {report.length > 0 && (
            <button
              onClick={handleOpenViewModal}
              type="button"
              className="bg-transparent rounded-[10px] px-[16px] py-[10px] hover:bg-blue-700 border border-[#0000FF] text-white flex items-center gap-2"
            >
              <span className="text-[16px] font-[400]">View Report</span>
            </button>
          )}
        </motion.div>
      </motion.div>

      {/* Modals */}
      <WriteAReport isOpen={isWriteModalOpen} onClose={handleCloseWriteModal} />
      <CardGrid isOpen={isViewModalOpen} onClose={handleCloseViewModal} />
    </motion.div>
  );
}
