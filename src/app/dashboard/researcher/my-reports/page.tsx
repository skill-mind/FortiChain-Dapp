"use client"

import { Badge } from "@/components/ui/badge";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { projects } from "./components/mock"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { StatusBadge } from "./components/status-badge";
import { getStatusDisplayName } from "./components/status-badge";
import { EditReportModal } from "./components/edit-report-modal";
import type { Project } from "./components/types";

function page() {
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter projects based on selected status
  const filteredProjects = useMemo(() => {
    if (filterStatus === "All") {
      return projects;
    }
    return projects.filter(project => project.status === filterStatus);
  }, [filterStatus, projects]);

  const handleEditReport = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (isModalOpen && selectedProject) {
    return (
      <EditReportModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    );
  }

  return (
    <div className="">
      {/* Filter Section */}
      <div className="flex items-center gap-2 md:gap-4 md:px-6 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-transparent text-[#6C6C6C] border-[#1F1F1F] hover:bg-transparent hover:text-[#6C6C6C] rounded-full py-3 px-6 flex justify-between lg:w-[301px] w-full">
              {getStatusDisplayName(filterStatus)}
              <Image src="/researcherIcon/down-arrow.svg" className="h-4 w-4" alt="arrow Down" width={16} height={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px] lg:w-[301px] border-[#1F1F1F] rounded-lg bg-[#101011] text-[#E2E2E2]">
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-[#1F1F1F]"
              onClick={() => setFilterStatus("All")}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem 
               className="cursor-pointer hover:bg-[#1F1F1F]"
               onClick={() => setFilterStatus("audited")}
             >
               Audited
             </DropdownMenuItem>
             <DropdownMenuItem 
               className="cursor-pointer hover:bg-[#1F1F1F]"
               onClick={() => setFilterStatus("progress")}
             >
               In Progress
             </DropdownMenuItem>
             <DropdownMenuItem 
               className="cursor-pointer hover:bg-[#1F1F1F]"
               onClick={() => setFilterStatus("rejected")}
             >
               Rejected
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" className="text-gray-400 bg-transparent space-x-1 hover:text-white hover:bg-transparent border-[#1F1F1F] rounded-full">
          <Image src="/researcherIcon/filter.svg" className="h-4 w-4" alt="Filter" width={16} height={16} />
          <div className="h-4 bg-[#1F1F1F] rounded-full w-[1px] flex items-center gap-2"></div>
          <span className="text-gray-400 text-sm">{filteredProjects.length}</span>
        </Button>

      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="bg-[#101011] rounded-[8px] border-2 border-[#1F1F1F]">
            <CardContent className="sm:p-6 p-4 text-[#E2E2E2]">
              {/* Status and Title */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <StatusBadge status={project.status} />
                </div>
                <div className="hidden lg:flex items-center gap-1">
                  <Image src="/researcherIcon/chat.svg" className="h-4 w-4" alt="Chat" width={16} height={16} />
                  <span className=" text-sm">{project.issueCount}</span>
                  <Badge variant="default"  className="text-[#0073E6] ml-3 px-3 py-2 text-xs bg-[#10273E]">
                    Priority: {project.priority}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Image src={project?.logo} className="h-10 w-10" alt={project.title} width={40} height={40} />
                <h3 className="text-lg font-medium text-white">{project.title}</h3>
              </div>

              <div className="flex lg:hidden my-4 items-center gap-1">
                  <Image src="/researcherIcon/chat.svg" className="h-4 w-4" alt="Chat" width={16} height={16} />
                  <span className=" text-sm">{project.issueCount}</span>
                  <Badge variant="default"  className="ml-2 text-[#0073E6] px-3 py-1 text-xs bg-[#10273E]">
                    Priority: {project.priority}
                  </Badge>
                </div>

              {/* Details */}
              <div className="mb-6 border-t border-b border-[#1F1F1F] pt-4 pb-4">
                <h4 className="text-[#6C6C6C] text-sm mb-2">Details</h4>
                <p className=" text-sm leading-relaxed">{project.description}</p>
              </div>
              
              <div className="flex flex-col gap-y-5 lg:gap-x-1 2xl:gap-x-4 xl:flex-row xl:items-center justify-between max-w-full">
                <div className="flex xl:items-center gap-x-4 gap-y-2 text-xs text-gray-400 flex-col xl:flex-row">
                  <div className="flex items-center">
                     <span className="mr-2 text-[#6C6C6C] whitespace-nowrap">Deadline:</span>
                     <span className="text-[#E2E2E2] bg-[#1C1C1C] px-3 py-2 rounded-full whitespace-nowrap">{project.deadline}</span>
                   </div>
                   <div className="flex items-center">
                     <span className="mr-2 text-[#6C6C6C] whitespace-nowrap">Submitted:</span>
                     <span className="text-[#E2E2E2] bg-[#1C1C1C] px-3 py-2 rounded-full whitespace-nowrap">{project.submitted}</span>
                   </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#E2E2E2] w-full md:w-auto border-0 hover:border-0 hover:text-inherit bg-gradient-to-r rounded-full p-0.5 hover:text-white from-[#212121] to-[#312F2F] "
                  onClick={() => handleEditReport(project)}
                >
                  <div className="px-6 py-3 w-full h-full flex items-center bg-[#1C1C1C] justify-center rounded-full text-inherit">{project.action}</div>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default page;
