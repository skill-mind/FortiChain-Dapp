"use client";

import { motion } from "framer-motion"; // import framer motion
import { SearchIcon } from "lucide-react";
import { ProjectCard } from "../../components/resuables/ProjectCard";
import { projects } from "./mockData";

const Projects = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-auto"
    >
      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex justify-between items-center w-full mb-5"
      >
        <div className="flex items-center py-[8px] px-[14px] rounded-[8px] bg-[#161113] border border-[#464043] gap-[8px]">
          <SearchIcon color="#6B6668" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="placeholder:text-[13px] text-[#B5B3B4] font-[500] w-full bg-transparent outline-none border-none"
          />
        </div>
        <div className="flex gap-3">
          <select
            className="bg-transparent border outline-none rounded-[4px] py-[8px] px-[14px] text-[13px] font-[500] border-[#464043]"
          >
            <option className="text-black" value="">Select Languages</option>
            <option className="text-black" value="">TypeScript</option>
            <option className="text-black" value="">JavaScript</option>
            <option className="text-black" value="">Solidity</option>
            <option className="text-black" value="">Cairo</option>
            <option className="text-black" value="">Rust</option>
          </select>
          <select
            className="bg-transparent border outline-none rounded-[4px] py-[4px] px-[8px] text-[13px] font-[500] border-[#464043]"
          >
            <option className="text-black" value="">Select Category</option>
            <option className="text-black" value="">Defi</option>
            <option className="text-black" value="">Plankton</option>
            <option className="text-black" value="">FortiChain</option>
            <option className="text-black" value="">FortiChain Clone</option>
          </select>
        </div>
      </motion.div>

      {/* Project Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-12 gap-5 w-full"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Projects;
