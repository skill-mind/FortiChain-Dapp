"use client";

import { motion } from "framer-motion"; // import framer motion
import type { Project } from "../../researcher/projects/mockData";
import Image from "next/image";
import Link from "next/link";

type Props = {
  project: Project;
};

export const ProjectCard: React.FC<Props> = ({ project }) => {
  function shortenText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }

    const shortened = text.slice(0, maxLength);
    const lastSpaceIndex = shortened.lastIndexOf(" ");

    if (lastSpaceIndex > 0) {
      return `${shortened.slice(0, lastSpaceIndex)}...`;
    }

    return `${shortened}...`;
  }

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
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-4 mb-4"
        >
          <div
            className={`${project.logo.bgColor} text-black font-bold p-3 rounded-full`}
          >
            {project.logo.text}
          </div>
          <h2 className="text-xl font-semibold">{project.title}</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-sm text-gray-400 mb-6 min-h-[54px] leading-5"
        >
          {shortenText(project.description, 150)}
        </motion.p>

        {/* Amount and Deadline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex items-center gap-[13px] text-sm mb-4"
        >
          <div className="flex items-center gap-2">
            <Image
              src={"/researcherIcon/moneyBag.svg"}
              alt="Money bag logo"
              width={15}
              height={15}
            />{" "}
            {project.amount}
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={"/researcherIcon/deadLine.svg"}
              alt="deadline"
              width={15}
              height={15}
            />{" "}
            Deadline: {project.deadline}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-transparent border-[#464043] border text-xs py-1 px-3 rounded-full"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Dynamic Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="w-full h-6 rounded-full overflow-hidden"
        >
          <div className="flex h-full -space-x-3 w-full">
            <div
              className={`${project.progress.firstColor} flex items-center justify-between text-xs px-3 font-bold text-white transition-all duration-500 ease-in-out`}
              style={{ flexBasis: `${project.progress.firstPercentage}%` }}
            >
              <span>{project.progress.firstIcon}</span>{" "}
              <span>{project.progress.firstPercentage}%</span>
            </div>
            <div
              className={`${project.progress.secondColor} flex items-center justify-between rounded-full px-2 text-xs font-bold text-white transition-all duration-500 ease-in-out`}
              style={{ flexBasis: `${project.progress.secondPercentage}%` }}
            >
              <span>{project.progress.secondIcon}</span>{" "}
              <span>{project.progress.secondPercentage}%</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};
