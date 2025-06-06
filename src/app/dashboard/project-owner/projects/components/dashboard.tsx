"use client";

import type React from "react";

import { useContext } from "react";
import Link from "next/link";
import { Bell, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectsContext } from "@/context/project-context";
import { ProjectsTable } from "./project-table";
import { motion } from "framer-motion";

export function Dashboard() {
  const { projects, stats, wallet, disconnectWallet } =
    useContext(ProjectsContext);
  return (
    <motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/dashboard/project-owner/projects/register-project"
          className="block w-fit ml-auto mb-4"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      <div className="flex-1 p-6 bg-[#161113] border border-[#464043] rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Projects</h2>
          </div>

          <div className="flex gap-3 items-center">
            <div className="relative w-64 bg-[#161113]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                className="pl-10 bg-[#161113] border-[#464043] text-gray-300"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-transparent border-[#464043] text-white"
                >
                  All
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Completed</DropdownMenuItem>
                <DropdownMenuItem>Ongoing</DropdownMenuItem>
                <DropdownMenuItem>Closed</DropdownMenuItem>
                <DropdownMenuItem>Paused</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ProjectsTable projects={projects} />
      </div>
    </motion.div>
    </motion.div>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
