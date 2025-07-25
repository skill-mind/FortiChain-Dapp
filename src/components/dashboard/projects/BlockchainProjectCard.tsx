"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { DollarSign, Calendar, Github } from "lucide-react";

type Props = {
  project: Project;
};

export const BlockchainProjectCard: React.FC<Props> = ({ project }) => {
  const shortenText = (text: string, max: number) => {
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const last = cut.lastIndexOf(" ");
    return last > 0 ? `${cut.slice(0, last)}…` : `${cut}…`;
  };

  // Get top 2 languages for progress bar
  const topLanguages = project.languages?.slice(0, 2) || [];

  return (
    <div className="block col-span-12 sm:col-span-6 lg:col-span-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#110D0F] text-white p-6 rounded-2xl border border-gray-700 w-full max-w-md h-full flex flex-col"
      >
        {/* Logo + Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-white font-bold text-lg">
              {project.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-semibold">{project.name}</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-sm text-gray-400 mb-6 min-h-[54px] leading-5 flex-grow"
        >
          {project.description
            ? shortenText(project.description, 150)
            : "No description available"}
        </motion.p>

        {/* Amount & Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex items-center gap-[13px] text-sm mb-4"
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span>${project.bountyAllocated}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                project.status === "Ongoing"
                  ? "bg-blue-500"
                  : project.status === "Completed"
                  ? "bg-green-500"
                  : project.status === "Paused"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />
            <span className="text-xs">{project.status}</span>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-wrap gap-2 mb-4"
        >
          <span className="bg-transparent border-[#464043] border text-xs py-1 px-3 rounded-full">
            {project.category}
          </span>
          {project.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-transparent border-[#464043] border text-xs py-1 px-3 rounded-full"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Languages Progress Bar */}
        {topLanguages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="w-full h-6 rounded-full overflow-hidden"
          >
            <div className="flex h-full w-full">
              {topLanguages.map((lang, index) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-center text-xs px-2 font-bold text-white transition-all duration-500 ease-in-out"
                  style={{
                    flexBasis: `${lang.percentage}%`,
                    backgroundColor: lang.color || "#6B7280",
                  }}
                >
                  <span className="truncate">{lang.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Repository Link */}
        {project.repository && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mt-4 pt-4 border-t border-gray-700"
          >
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              <span>View Repository</span>
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
