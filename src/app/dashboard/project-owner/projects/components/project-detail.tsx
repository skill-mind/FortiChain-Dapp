"use client"

import type React from "react"

import { useContext, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Bell, ChevronDown, ExternalLink, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ProjectsContext } from "@/context/project-context"
import { useRouter } from "next/navigation"
import VulnerabilityCard from "./volnerbility-card"

export function ProjectDetail({ id }: { id: string }) {
  const { projects, wallet, deleteProject } = useContext(ProjectsContext)
  const router = useRouter()
  const [showCloseModal, setShowCloseModal] = useState(false)
  const [closingProject, setClosingProject] = useState(false)
  const [projectClosed, setProjectClosed] = useState(false)

  // Find the project by ID or use a default one for demo
  const project = projects.find((p) => p.id === id) || {
    id: "demo",
    name: "DeFi Guard",
    category: "Security",
    bountyAllocated: "5,000.00",
    bountyPaid: "2,500.00",
    status: "Ongoing",
    description:
      "A decentralized finance (DeFi) protection tool that scans for vulnerabilities in DeFi protocols and helps prevent hacks.",
    tags: ["DeFi", "Storage", "NFTs"],
    languages: [
      { name: "TypeScript", percentage: 45, color: "#3178c6" },
      { name: "Python", percentage: 35, color: "#3572A5" },
      { name: "Cairo", percentage: 10, color: "#f7df1e" },
      { name: "Rust", percentage: 10, color: "#dea584" },
    ],
    pricePool: "$6,350.56",
    expiryDate: "25-04-2025",
    contracts: [
      { name: "DeFi-Guard-Smart-contract", url: "#" },
      { name: "DeFi-Guard-Smart-contract", url: "#" },
    ],
    vulnerabilities: [
      {
        id: "#8793",
        name: "Filename parameter on Home Page",
        severity: "critical",
        count: 3,
        date: "3 Jan, 4:38 PM",
        amount: "$200",
      },
      {
        id: "#8793",
        name: "Filename parameter on Home Page",
        severity: "critical",
        count: 8,
        date: "3 Jan, 4:38 PM",
        amount: "$200",
      },
    ],
  }

  const handleCloseProject = () => {
    setClosingProject(true)
    setTimeout(() => {
      deleteProject(id)
      setClosingProject(false)
      setProjectClosed(true)
    }, 2000)
  }

  const goToDashboard = () => {
    router.push("/dashboard/project-owner/projects");
  }

  const handleEditProject = () => {
    router.push(`/dashboard/project-owner/projects/${id}/edit`);
  }

  const handleIncreaseReward = () => {
    router.push(`/dashboard/project-owner/projects/${id}/increase-reward`);
  }
  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <button onClick={()=>router.back()}  className="text-gray-400 hover:text-white">
            <ArrowLeft size={18} />
          </button>
          <span className="text-gray-400">Back to Project Overview</span>
        </div>
      </div>

      <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-600 rounded flex items-center justify-center text-white font-bold">
              {project.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                {project.name}
                <Badge className="ml-2 bg-blue-600 hover:bg-blue-700">
                  Ongoing
                </Badge>
              </h1>
              <p className="text-gray-400 mt-1 text-sm">
                {project.description}
              </p>
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-5 w-5 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#1A1A1A] border-gray-800"
              >
                <DropdownMenuItem
                  onClick={handleEditProject}
                  className="text-white cursor-pointer"
                >
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleIncreaseReward}
                  className="text-white cursor-pointer"
                >
                  Increase Reward
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowCloseModal(true)}
                  className="text-red-500 cursor-pointer"
                >
                  Close Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag, index) => (
            <Badge
              key={index}
              className="bg-[#FFFFFF] rounded-[5px] py-1 px-3 hover:bg-[#1A1A1A] border border-gray-700 text-[#000000]"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2 border border-[#464043] rounded-md px-3 py-1.5">
            <CoinIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-white">
              Price Pool:
              {/* {project.pricePool} */}
              $6,350.56
            </span>
          </div>
          <div className="flex items-center gap-2 border border-[#464043] rounded-md px-3 py-1.5">
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-white">
              Date of Expiry:
              {/* {project.expiryDate} */}
              25-04-2025
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          {/* {project.contracts?.map((contract, index) => (
            <div key={index} className="flex items-center gap-2 bg-[#121212] rounded-md px-3 py-1.5">
              <GitHubIcon className="w-4 h-4 text-gray-400" />
              <a href={contract.url} className="text-sm text-white hover:underline">
                {contract.name}
              </a>
            </div>
          ))} */}
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4">Languages</h2>
          <div className="grid grid-cols-2 gap-4 w-1/2">
            {project.languages?.map((language) => (
              <div key={language.name} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: language.color }}
                ></div>
                <span className="text-white text-sm">{language.name}</span>
                <span className="text-gray-400 text-sm">
                  {language.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div>
            <h3 className="text-white text-2xl font-bold mb-6">
              Vulnerabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <VulnerabilityCard
                id="#8793"
                date="3 Jan, 4:35 PM"
                title="Filename parameter on Home Page -..."
                severity="Critical"
                rating={9.0}
                bounty={200}
              />
              <VulnerabilityCard
                id="#8793"
                date="3 Jan, 4:35 PM"
                title="Filename parameter on Home Page -..."
                severity="Critical"
                rating={9.0}
                bounty={200}
              />
              <div className="flex justify-end h-full w-full">
                <Button
                  onClick={() => {
                    router.back();
                  }}
                  className="bg-[#2b2bff] text-white hover:bg-[#0000aa] flex items-center h-full w-full border border-[#FFFFFF] text-lg font-semibold"
                >
                  <span>View All</span>
                  <ArrowRight className="h-8 w-8 ml-2 " />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Close Project Modal */}
      <Dialog
        open={showCloseModal && !closingProject && !projectClosed}
        onOpenChange={setShowCloseModal}
      >
        <DialogContent className="bg-[#1A1A1A] border-gray-800 p-6 max-w-md">
          <h2 className="text-xl font-bold text-white text-center mb-4">
            Close Project
          </h2>
          <p className="text-gray-400 text-center text-sm mb-6">
            Are you sure you want to close this project?
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Closing a project means that no more bounties can be claimed,
            vulnerability reports will be archived, and the project will be
            marked as closed. This action cannot be undone.
          </p>
          <div className="flex justify-between">
            <Button
              variant="outline"
              className="bg-transparent border-gray-700 text-white"
              onClick={() => setShowCloseModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleCloseProject}
            >
              Close Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Closing Project Modal */}
      <Dialog open={closingProject} onOpenChange={() => {}}>
        <DialogContent className="bg-[#1A1A1A] border-gray-800 p-6 max-w-md">
          <h2 className="text-xl font-bold text-white text-center mb-4">
            Close Project
          </h2>
          <div className="flex justify-center py-8">
            <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-700 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400 text-center">Closing Project...</p>
        </DialogContent>
      </Dialog>

      {/* Project Closed Successfully Modal */}
      <Dialog open={projectClosed} onOpenChange={() => {}}>
        <DialogContent className="bg-[#1A1A1A] border-gray-800 p-6 max-w-md">
          <h2 className="text-xl font-bold text-white text-center mb-4">
            Project Closed Successfully
          </h2>
          <p className="text-gray-400 text-center text-sm mb-6">
            Your project has been closed. No new vulnerability reports will be
            accepted, and bounties are no longer available for this project.
          </p>
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
            onClick={goToDashboard}
          >
            Go Back
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CoinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}
