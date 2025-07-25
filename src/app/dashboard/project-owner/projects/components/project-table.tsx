"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Project } from "@/types/project";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectViewDialog } from "@/components/dashboard/projects/ProjectViewDialog";

interface ProjectsTableProps {
  projects: Project[];
  type: string;
  fundModal: () => void;
}

export function ProjectsTable({
  projects,
  type = "view",
  fundModal = () => {},
}: ProjectsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Get unique categories from projects
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  // Filter projects based on search term and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || project.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="bg-[#161113] rounded-md overflow-x-scroll">
        {/* Ensure Table and its sub-components are imported correctly */}
        <Table className="bg-[#161113]">
          <TableHeader className="bg-[#211A1D]">
            <TableRow className="border-gray-800 hover:bg-[#211A1D]">
              <TableHead className="text-gray-400 py-5 px-2 sm:px-4">
                Name
              </TableHead>
              <TableHead className="text-gray-400 py-5 px-2 sm:px-4">
                Category
              </TableHead>
              <TableHead className="text-gray-400 py-5 px-2 sm:px-4">
                Bounty Allocated
              </TableHead>
              <TableHead className="text-gray-400 py-5 px-2 sm:px-4">
                Bounty Paid
              </TableHead>
              <TableHead className="text-gray-400 py-5 px-2 sm:px-4">
                Status
              </TableHead>
              <TableHead className="text-gray-400 py-5 px-2 sm:px-4">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project, index) => (
              <motion.tr
                key={project.id}
                className="border-b border-[#464043] hover:bg-[#222]" // Apply hover background
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <TableCell className="py-5 px-2 sm:px-4 font-medium text-white">
                  {project.name}
                </TableCell>
                <TableCell className="py-5 px-2 sm:px-4 text-gray-300">
                  {project.category}
                </TableCell>
                <TableCell className="py-5 px-2 sm:px-4 text-gray-300">
                  ${project.bountyAllocated}
                </TableCell>
                <TableCell className="py-5 px-2 sm:px-4 text-gray-300">
                  {project.bountyPaid ? `$${project.bountyPaid}` : "N/A"}
                </TableCell>
                <TableCell className="py-5 px-2 sm:px-4">
                  <span
                    className={`px-[23px] py-1 rounded-full text-xs flex items-center justify-center max-w-[87px] ${
                      project.status.toLowerCase() === "completed"
                        ? "bg-[#01A901]"
                        : project.status.toLowerCase() === "ongoing"
                        ? "bg-[#2B2BFF]" // Changed from #2B2BFF to match the "IN_PROGRESS" color
                        : project.status.toLowerCase() === "expired"
                        ? "bg-[#908C8E]" // Matched "OPEN" color for "expired"
                        : "bg-[#FF3737]" // Fallback for other statuses, like "rejected"
                    }`}
                  >
                    <div>{project.status.replace("_", " ")} </div>
                    {/* Replace underscore for display */}
                  </span>
                </TableCell>
                {type == "view" && (
                  <TableCell className="py-2 px-2 sm:px-4 text-[#0000FF]">
                    <ViewProjectButton projectId={project.id} />
                  </TableCell>
                )}
                {type == "fund" && (
                  <TableCell className="py-2 px-2 sm:px-4 text-[#0000FF]">
                    <Button
                      onClick={fundModal}
                      className="text-white text-sm sm:text-base"
                    >
                      Fund
                    </Button>
                  </TableCell>
                )}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>{" "}
    </div>
  );
}

function ViewProjectButton({ projectId }: { projectId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[#0000FF] hover:underline text-sm sm:text-base"
      >
        View
      </button>
      <ProjectViewDialog
        projectId={projectId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onViewReports={() => {
          // Handle view reports action
          console.log("View reports for project:", projectId);
        }}
        onCloseProject={() => {
          // Handle close project action
          console.log("Close project:", projectId);
        }}
      />
    </>
  );
}
