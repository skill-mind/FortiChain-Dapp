"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Calendar,
  DollarSign,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProjectView } from "@/hooks/useProjectView";
import type { Project } from "@/types/project";

interface ProjectViewDialogProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onViewReports?: () => void;
  onCloseProject?: () => void;
  showActions?: boolean;
}

const getStatusBadgeColor = (status: Project["status"]) => {
  switch (status) {
    case "Ongoing":
      return "bg-blue-600";
    case "Closed":
      return "bg-red-600";
    case "Completed":
      return "bg-green-600";
    case "Paused":
      return "bg-yellow-600";
    default:
      return "bg-gray-600";
  }
};

export function ProjectViewDialog({
  projectId,
  isOpen,
  onClose,
  onViewReports,
  onCloseProject,
  showActions = true,
}: ProjectViewDialogProps) {
  const { project, loading, error, fetchProject } = useProjectView();

  useEffect(() => {
    if (isOpen && projectId) {
      fetchProject(projectId);
    }
  }, [isOpen, projectId, fetchProject]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#161113] border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Loading project...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-8 text-red-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Error: {error}</span>
          </div>
        )}

        {project && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {project.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col gap-2">
                  <DialogTitle className="text-3xl font-semibold text-white">
                    {project.name}
                  </DialogTitle>
                  <Badge
                    className={`${getStatusBadgeColor(
                      project.status
                    )} text-white w-fit`}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Description */}
              {project.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}

              {/* Category and Tags */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Category & Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-white text-black rounded-md font-semibold hover:bg-gray-100"
                  >
                    {project.category}
                  </Badge>
                  {project.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-transparent border border-gray-700 rounded-lg p-3">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-xs text-gray-400">Bounty Allocated</p>
                    <p className="text-white font-semibold">
                      ${project.bountyAllocated}
                    </p>
                  </div>
                </div>

                {project.bountyPaid && (
                  <div className="flex items-center gap-3 bg-transparent border border-gray-700 rounded-lg p-3">
                    <DollarSign className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-400">Bounty Paid</p>
                      <p className="text-white font-semibold">
                        ${project.bountyPaid}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 bg-transparent border border-gray-700 rounded-lg p-3">
                  <ExternalLink className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-xs text-gray-400">Contract Address</p>
                    <p className="text-white font-mono text-xs">
                      {project.contractAddress.slice(0, 10)}...
                      {project.contractAddress.slice(-8)}
                    </p>
                  </div>
                </div>

                {project.contactInfo && (
                  <div className="flex items-center gap-3 bg-transparent border border-gray-700 rounded-lg p-3">
                    <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-xs">@</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Contact</p>
                      <p className="text-white text-sm">
                        {project.contactInfo}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Repository Links */}
              {project.repository && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Repository</h3>
                  <div className="flex items-center gap-3 bg-transparent border border-gray-700 rounded-lg p-3 w-fit">
                    <Github className="w-5 h-5 text-white" />
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View Repository
                    </a>
                  </div>
                </div>
              )}

              {/* Languages */}
              {project.languages && project.languages.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.languages.map((language) => (
                      <div
                        key={language.name}
                        className="flex items-center gap-2 bg-transparent border border-gray-700 rounded-lg p-2"
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: language.color }}
                        />
                        <span className="text-sm text-white">
                          {language.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {language.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Stats */}
              {project.stats && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Project Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-transparent border border-gray-700 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-white">
                        {project.stats.commits}
                      </p>
                      <p className="text-xs text-gray-400">Commits</p>
                    </div>
                    <div className="bg-transparent border border-gray-700 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-white">
                        {project.stats.linesOfCode}
                      </p>
                      <p className="text-xs text-gray-400">Lines of Code</p>
                    </div>
                    <div className="bg-transparent border border-gray-700 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-white">
                        {project.stats.contributors}
                      </p>
                      <p className="text-xs text-gray-400">Contributors</p>
                    </div>
                    <div className="bg-transparent border border-gray-700 rounded-lg p-3 text-center">
                      <p className="text-sm font-semibold text-white">
                        {project.stats.lastUpdated}
                      </p>
                      <p className="text-xs text-gray-400">Last Updated</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Vulnerabilities */}
              {project.vulnerabilities &&
                project.vulnerabilities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Known Vulnerabilities
                    </h3>
                    <div className="space-y-2">
                      {project.vulnerabilities.map((vuln, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-transparent border border-gray-700 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                vuln.severity === "high"
                                  ? "bg-red-500"
                                  : vuln.severity === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                            />
                            <span className="text-white">{vuln.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`${
                                vuln.severity === "high"
                                  ? "border-red-500 text-red-400"
                                  : vuln.severity === "medium"
                                  ? "border-yellow-500 text-yellow-400"
                                  : "border-green-500 text-green-400"
                              }`}
                            >
                              {vuln.severity}
                            </Badge>
                            <span className="text-gray-400 text-sm">
                              {vuln.count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Action Buttons */}
              {showActions && (
                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  {onViewReports && (
                    <Button
                      onClick={onViewReports}
                      className="bg-[#0000FF] hover:bg-blue-700 text-white"
                    >
                      View Reports
                    </Button>
                  )}
                  {onCloseProject && project.status === "Ongoing" && (
                    <Button
                      onClick={onCloseProject}
                      variant="destructive"
                      className="bg-[#FF3737] hover:bg-red-700 text-white"
                    >
                      Close Project
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
