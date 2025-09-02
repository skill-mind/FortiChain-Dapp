"use client";

import { motion } from "framer-motion";
import type { Project } from "../../researcher/projects/mockData";
import Image from "next/image";
import Link from "next/link";

type Props = {
  project: Project;
};

export const ProjectCard: React.FC<Props> = ({ project }) => {
  const shortenText = (text: string, max: number) => {
    if (!text) return "";
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const last = cut.lastIndexOf(" ");
    return last > 0 ? `${cut.slice(0, last)}…` : `${cut}…`;
  };

  return (
    <Link
      href={`/dashboard/researcher/projects/${project.id}`}
      className="block col-span-12 sm:col-span-6 lg:col-span-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#110D0F] text-white p-6 rounded-2xl border border-gray-700 w-full max-w-md"
      >
        <div>
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

        </div>
        {/* Logo + Title + Priority */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl overflow-hidden">
              {project.logo.logo ? (
                <Image
                  src={project.logo.logo}
                  alt={project.title}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              ) : (
                <div
                  className={`${project.logo.bgColor} text-white font-bold w-12 h-12 flex items-center justify-center rounded-xl`}
                >
                  {project.logo.text}
                </div>
              )}
            </div>
            <h2 className=" font-semibold text-sm">{project.title}</h2>
          </div>

          {/* Priority badge */}
          <span
            className={`px-3 py-1 rounded-full text-[9px] font-semibold whitespace-nowrap flex items-center justify-center
    ${project.priority === "High"
                ? "bg-[#401D1D] text-[#EF4343]"
                : project.priority === "Medium"
                  ? "bg-[#373510] text-[#C1B700]"
                  : "bg-[#10273E] text-[#0073E6]" // Low
              }`}
          >
            {`Priority: ${project.priority}`}
          </span>


        </div>
        <div className="h-[1px] w-full bg-gray-700 mb-4"></div>

        {/* Amount, Deadline, Status */}
        <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
          {project.amount && (
            <div className="flex items-center gap-2">
              <Image
                src="/researcherIcon/moneyBag.svg"
                alt="Money bag"
                width={15}
                height={15}
              />
              {project.amount}
            </div>
          )}
          <div className="flex items-center justify-between w-full gap-2">
            {/* Left side: Deadline */}
            <div className="flex items-center gap-2">
              <span className="text-[#6C6C6C] text-[11px]">Deadline:</span>
              <div className="rounded-3xl px-4 py-1 bg-[#212121] text-[11px] text-gray-300">
                {project.deadline}
              </div>
            </div>

            {/* Right side: Button */}
            <Link href={`/dashboard/researcher/projects/${project.id}`}>
              <div className="rounded-3xl px-4 py-1 bg-[#212121] text-[13px] text-gray-300 cursor-pointer hover:bg-[#333] transition">
                View Details
              </div>
            </Link>
          </div>


        </div>


      </motion.div>
    </Link>
  );
};
