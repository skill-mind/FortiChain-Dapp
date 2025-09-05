"use client";

import { motion } from "framer-motion";
import { ChevronDown, Check, Filter } from "lucide-react";
import { ProjectCard } from "../../components/resuables/ProjectCard";
import { projects } from "./mockData";
import { useState } from "react";
import Foot from "@/components/foot";

const Projects = () => {
  const [filter, setFilter] = useState("Available");
  const [open, setOpen] = useState(false);

  // Filter projects by status
  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  const options = ["All", "Available", "Assigned"];

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Content */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex-grow h-auto"
      >
        {/* Dropdown + Filter Badge Row */}
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="flex items-center w-full mb-5 gap-4 justify-between md:justify-start"
  >
  {/* Dropdown */}
  <div className="relative w-3/4 sm:w-[220px]">
    <button
      onClick={() => setOpen(!open)}
      className="flex justify-between items-center w-full h-[40px] px-4 rounded-full bg-[#161113] border border-[#464043] text-sm text-[#B5B3B4]"
    >
      {filter}
      <ChevronDown
        className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        size={16}
      />
    </button>

    {/* Dropdown Menu */}
    {open && (
      <div className="absolute mt-2 w-full bg-[#161113] border border-[#464043] rounded-[8px] py-2 z-50 shadow-lg">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => {
              setFilter(option);
              setOpen(false);
            }}
            className={`flex items-center justify-between px-4 py-2 cursor-pointer text-sm rounded-md ${
              filter === option
                ? "bg-[#1F1A1C] text-white"
                : "text-[#B5B3B4] hover:bg-[#1F1A1C]"
            }`}
          >
            {option}
            {filter === option && <Check size={14} />}
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Active Filter Badge */}
  <div className="flex items-center gap-2 h-[40px] px-3 rounded-full bg-[#161113] border border-[#464043] text-[#B5B3B4] text-sm font-medium">
    <Filter size={16} className="text-[#B5B3B4]" />
    <span className="text-xs text-[#B5B3B4]">1</span>
  </div>
</motion.div>


        {/* Project Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-12 gap-5 w-full"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Projects;
