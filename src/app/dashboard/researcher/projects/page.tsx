"use client";

import { motion } from "framer-motion"; // import framer motion
import { SearchIcon, AlertCircle } from "lucide-react";
import { BlockchainProjectCard } from "@/components/dashboard/projects/BlockchainProjectCard";
import { useProjectsList } from "@/hooks/useProjectsList";
import { useState, useMemo } from "react";

const Projects = () => {
  const { projects, loading, error, refetch } = useProjectsList("in_progress");
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage =
        !languageFilter ||
        project.languages?.some((lang) => lang.name === languageFilter);
      const matchesCategory =
        !categoryFilter || project.category === categoryFilter;

      return matchesSearch && matchesLanguage && matchesCategory;
    });
  }, [projects, searchTerm, languageFilter, categoryFilter]);

  // Get unique categories and languages for filters
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return Array.from(cats);
  }, [projects]);

  const languages = useMemo(() => {
    const langs = new Set<string>();
    projects.forEach((p) => {
      p.languages?.forEach((lang) => langs.add(lang.name));
    });
    return Array.from(langs);
  }, [projects]);

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
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="placeholder:text-[13px] text-[#B5B3B4] font-[500] w-full bg-transparent outline-none border-none"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="bg-transparent border outline-none rounded-[4px] py-[8px] px-[14px] text-[13px] font-[500] border-[#464043]"
          >
            <option className="text-black" value="">
              All Languages
            </option>
            {languages.map((lang) => (
              <option key={lang} className="text-black" value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-transparent border outline-none rounded-[4px] py-[4px] px-[8px] text-[13px] font-[500] border-[#464043]"
          >
            <option className="text-black" value="">
              All Categories
            </option>
            {categories.map((category) => (
              <option key={category} className="text-black" value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-400">Loading projects...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center py-12 text-red-400">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Error loading projects: {error}</span>
          <button
            onClick={refetch}
            className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Project Cards */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-12 gap-5 w-full"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <BlockchainProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-12 text-center py-12 text-gray-400">
              No projects found matching your criteria.
            </div>
          )}
        </motion.div>
      )}
    </motion.section>
  );
};

export default Projects;
