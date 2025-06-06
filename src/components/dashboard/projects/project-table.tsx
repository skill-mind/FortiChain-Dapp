import {
  Search,
  ChevronDown,
  Calendar,
  DollarSign,
  Github,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import React from "react";
import { CloseProjectDialog } from "@/app/dashboard/components/project/close-project-dialog";

interface Project {
  id: string;
  name: string;
  imgSrc: string;
  bountyPool: string;
  amountPaid: string | null;
  category: string;
  deadline: string;
  projectOwner: string;
  status: "Ongoing" | "Closed" | "Completed";
}

const projects: Project[] = [
  {
    id: "1",
    name: "Defi Guard",
    imgSrc: "/adminIcon/DG.svg",
    bountyPool: "$25,231.56",
    amountPaid: "$20,231.56",
    category: "Wallets",
    deadline: "26/05/2025",
    projectOwner: "Daniel Ochoja",
    status: "Ongoing",
  },
  {
    id: "2",
    name: "Plankton Chain",
    imgSrc: "/adminIcon/plankton-chain.svg",
    bountyPool: "$12,113.78",
    amountPaid: "$1,113.78",
    category: "DeFi",
    deadline: "Closed",
    projectOwner: "Daniel Ochoja",
    status: "Closed",
  },
  {
    id: "3",
    name: "FortiChain",
    imgSrc: "/adminIcon/fortichain-clone.svg",
    bountyPool: "$12,113.78",
    amountPaid: "$10,113.78",
    category: "NFTs",
    deadline: "Closed",
    projectOwner: "Daniel Ochoja",
    status: "Completed",
  },
  {
    id: "4",
    name: "FortiChain Clone",
    imgSrc: "/adminIcon/fortichain-clone.svg",
    bountyPool: "$2,713.08",
    amountPaid: "$713.08",
    category: "NFTs",
    deadline: "18/06/2025",
    projectOwner: "Aisha Murtala",
    status: "Ongoing",
  },
  {
    id: "5",
    name: "FortiChain Clone",
    imgSrc: "/adminIcon/fortichain-clone.svg",
    bountyPool: "$2,713.08",
    amountPaid: null,
    category: "NFTs",
    deadline: "18/06/2025",
    projectOwner: "Aisha Murtala",
    status: "Ongoing",
  },
  {
    id: "6",
    name: "FortiChain Clone",
    imgSrc: "/adminIcon/fortichain-clone.svg",
    bountyPool: "$2,713.08",
    amountPaid: null,
    category: "NFTs",
    deadline: "18/06/2025",
    projectOwner: "Aisha Murtala",
    status: "Ongoing",
  },
];

// --- Framer Motion Animation Variants ---

const mobileCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const mobileContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const tableBodyVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const getStatusBadgeColor = (status: Project["status"]) => {
  switch (status) {
    case "Ongoing":
      return "bg-blue-600";
    case "Closed":
      return "bg-red-600";
    case "Completed":
      return "bg-green-600";
    default:
      return "bg-gray-600";
  }
};

export default function ProjectTable() {
  return (
    <div className="bg-[#161113] text-white p-4 sm:p-6 rounded-2xl max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex lg:flex-row flex-col lg:items-center justify-between space-y-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold">Projects</h1>

        <div className="flex xl:flex-row flex-col xl:items-center items-start gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search project name, or project owner's name"
              className="bg-[#161113] text-[#B5B3B4] block w-[900rem] max-w-[400px] text-xs border border-gray-700 rounded-lg pl-10 pr-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-xs"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex gap-3">
            <button className="bg-[#161113] border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white flex items-center justify-between sm:justify-center gap-2 hover:bg-gray-700 transition-colors text-xs ">
              Sort by Bounty Pool
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="bg-[#161113] border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white flex items-center justify-between sm:justify-center gap-2 hover:bg-gray-700 transition-colors text-xs ">
              Status
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="bg-[#161113] border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white flex items-center justify-between sm:justify-center gap-2 hover:bg-gray-700 transition-colors text-xs ">
              Category
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card View (Animated) */}
      <motion.div
        className="block lg:hidden space-y-4"
        initial="hidden"
        animate="visible"
        variants={mobileContainerVariants}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-[#161113] border !border-[#464043] rounded-lg p-4 space-y-3"
            variants={mobileCardVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Project Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={project.imgSrc}
                  alt={project.name}
                  width={24}
                  height={24}
                />
                <div>
                  <h3 className="font-medium text-white">{project.name}</h3>
                  <p className="text-sm text-gray-400">{project.category}</p>
                </div>
              </div>
              <span
                className={`${getStatusBadgeColor(
                  project.status
                )} text-white px-2 py-1 rounded-full text-xs font-medium`}
              >
                {project.status}
              </span>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Bounty Pool</p>
                <p className="font-medium text-white">{project.bountyPool}</p>
              </div>
              <div>
                <p className="text-gray-400">Amount Paid</p>
                <p className="text-gray-300">{project.amountPaid || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-400">Deadline</p>
                <p className="text-gray-300">{project.deadline}</p>
              </div>
              <div>
                <p className="text-gray-400">Project Owner</p>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {project.projectOwner}
                </a>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 border-t border-gray-700">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm">
                    View Project
                  </button>
                </DialogTrigger>
                <ProjectDialog project={project} />
              </Dialog>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Desktop Table View (Animated and Responsive) */}
      <div className="hidden lg:block overflow-x-auto">
        {" "}
        {/* Added overflow-x-auto here */}
        <table className="w-full">
          <thead className="bg-[#211A1D]">
            <tr className="">
              <th className="text-left py-4 px-4 font-medium text-gray-300">
                Name
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-300">
                Bounty Pool
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-300">
                Amount Paid
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-300">
                Category
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-300">
                Deadline
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-300">
                Project Owner
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-300">
                Status
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <motion.tbody // Apply motion to the tbody for staggering
            initial="hidden"
            animate="visible"
            variants={tableBodyVariants}
          >
            {projects.map((project, index) => (
              <motion.tr // Apply motion to each tr for individual animation
                key={project.id}
                className={`hover:bg-gray-800/50 transition-colors ${
                  index < projects.length - 1
                    ? "border-b !border-[#464043]"
                    : ""
                }`}
                variants={tableRowVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={project.imgSrc}
                      alt={project.name}
                      width={24}
                      height={24}
                    />
                    <span className="font-light text-sm">{project.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 font-light text-sm">
                  {project.bountyPool}
                </td>
                <td className="py-4 px-4 text-gray-300">
                  {project.amountPaid || "N/A"}
                </td>
                <td className="py-4 px-4 text-gray-300">{project.category}</td>
                <td className="py-4 px-4 text-gray-300">{project.deadline}</td>
                <td className="py-4 px-4">
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 transition-colors underline"
                  >
                    {project.projectOwner}
                  </a>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`${getStatusBadgeColor(
                      project.status
                    )} text-white px-3 py-1 rounded-full text-xs w-full block max-w-[87px] font-light`}
                  >
                    <div className="flex items-center justify-center">
                      {project.status}
                    </div>
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                        View
                      </button>
                    </DialogTrigger>
                    <ProjectDialog project={project} />
                  </Dialog>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}

function ProjectDialog({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsClosed(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsClosed(false);
    setIsOpen(false);
  };
  return (
    <DialogContent className="bg-[#161113] border-gray-700 text-white max-w-2xl">
      <CloseProjectDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        isClosed={isClosed}
      />
      <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-4">
          <Image
            src={project.imgSrc}
            alt={project.name}
            width={75}
            height={75}
          />
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
        <p className="text-gray-300 text-base font-[300] leading-relaxed">
          A decentralized finance (DeFi) protection tool that scans for
          vulnerabilities in DeFi protocols and helps prevent hacks.
        </p>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="bg-white text-black rounded-[5px] font-semibold text-xs hover:bg-gray-100"
          >
            DeFi
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white text-black rounded-[5px] font-semibold text-xs hover:bg-gray-100"
          >
            Storage
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white text-black rounded-[5px] font-semibold text-xs hover:bg-gray-100"
          >
            NFTs
          </Badge>
        </div>

        {/* Prize Pool and Expiry */}
        <div className=" flex gap-2">
          <div className="flex w-fit items-center gap-3 bg-transparent border border-gray-700 rounded-lg p-2">
            <Image
              src={"/adminIcon/money-bag.svg"}
              alt={"icon"}
              width={20}
              height={20}
            />
            <div className="flex items-center gap-1">
              <p className="text-xs text-[white]">Prize Pool:</p>
              <p className=" text-white text-xs">{project.bountyPool}</p>
            </div>
          </div>
          <div className="flex w-fit items-center gap-3 bg-transparent border border-gray-700 rounded-lg p-2">
            <Image src={"/calendar.svg"} alt={"icon"} width={20} height={20} />
            <div className="flex items-center gap-1">
              <p className="text-xs text-[white]">Date of Expiry:</p>
              <p className=" text-white text-xs">{project.deadline}</p>
            </div>
          </div>
        </div>

        {/* GitHub Links */}
        <div className="flex gap-2 !mt-5">
          <div className="flex items-center gap-3 bg-transparent border border-gray-700 rounded-lg p-2">
            <Github className="w-5 h-5 text-white" />
            <span className="text-xs text-white">DeFi-Guard-Smartcontract</span>
          </div>
          <div className="flex items-center gap-3 bg-transparent border border-gray-700 rounded-lg p-2">
            <Github className="w-5 h-5 text-white" />
            <span className="text-xs text-white">DeFi-Guard-Smartcontract</span>
          </div>
        </div>

        {/* Languages */}
        <div>
          <h3 className="text-xl  font-semibold text-white mb-4">Languages</h3>
          <div className="flex flex-wrap gap-2 max-w-xs">
            {[
              {
                name: "TypeScript",
                percentage: 45,
                src: "/adminIcon/ts.svg",
              },
              {
                name: "Python",
                percentage: 25,
                src: "/adminIcon/python.svg",
              },
              {
                name: "Cairo",
                percentage: 20,
                src: "/adminIcon/cairo.svg",
              },
              {
                name: "Rust",
                percentage: 10,
                src: "/adminIcon/rust.svg",
              },
            ].map((language) => (
              <div
                key={language.name}
                className="flex items-center gap-2 bg-transparent rounded-lg p-2"
              >
                <Image
                  src={language.src}
                  alt={language.name}
                  width={20}
                  height={20}
                />
                <span className="text-xs text-white">{language.name}</span>
                <span className="text-xs text-[#6B6668]">
                  {language.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button className="bg-[#0000FF] max-w-[161px] font-light hover:bg-blue-700 text-white flex-1 !px-[30px] !py-[13px] !w-fit">
            View Reports
          </Button>
          <Button
            onClick={() => setIsOpen(true)}
            variant="destructive"
            className="bg-[#FF3737] max-w-[161px] font-light hover:bg-red-700 text-white flex-1 !px-[30px] !py-[13px] !w-fit"
          >
            Close Project
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
