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

interface ProjectsTableProps {
  projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
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
      <div className="bg-[#1A1A1A] rounded-md border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-[#1A1A1A]">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Category</TableHead>
              <TableHead className="text-gray-400">Bounty Allocated</TableHead>
              <TableHead className="text-gray-400">Bounty Paid</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow
                key={project.id}
                className="border-gray-800 hover:bg-[#222]"
              >
                <TableCell className="font-medium text-white">
                  {project.name}
                </TableCell>
                <TableCell className="text-gray-300">
                  {project.category}
                </TableCell>
                <TableCell className="text-gray-300">
                  ${project.bountyAllocated}
                </TableCell>
                <TableCell className="text-gray-300">
                  {project.bountyPaid ? `$${project.bountyPaid}` : "N/A"}
                </TableCell>
                <TableCell>
                  <span
                    className={`rounded-full py-1 px-3 ${
                      project.status.toLowerCase() === "completed"
                        ? "bg-[#01A901]"
                        : project.status.toLowerCase() === "ongoing"
                        ? "bg-[#2B2BFF]"
                        : project.status.toLowerCase() === "expired"
                        ? "bg-[#908C8E]"
                        : "bg-[#FF3737]"
                    }`}
                  >
                    {project.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/project-owner/projects/${project.id}`}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
