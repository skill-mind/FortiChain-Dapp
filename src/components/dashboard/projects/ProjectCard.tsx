import React from "react";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

interface ProjectCardProps {
  id: string;
  name: string;
  category: string;
  bountyAllocated: string;
  bountyPaid: string;
  status: "Ongoing" | "Completed" | "Closed";
  onClose?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  category,
  bountyAllocated,
  bountyPaid,
  status,
  onClose,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
        return "bg-[#007BFF]";
      case "Completed":
        return "bg-[#28A745]";
      case "Closed":
        return "bg-[#DC3545]";
      default:
        return "bg-[#6C757D]";
    }
  };

  return (
    <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] gap-4 items-center px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#2D2D2D] flex items-center justify-center">
          <span className="text-xl font-semibold text-white">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <Link
            href={`/dashboard/admin/projects/${id}`}
            className="text-white hover:text-[#007BFF]"
          >
            {name}
          </Link>
        </div>
      </div>
      <div className="text-gray-400">{category}</div>
      <div className="text-white">${bountyAllocated}</div>
      <div className="text-white">
        {bountyPaid === "N/A" ? "N/A" : `$${bountyPaid}`}
      </div>
      <div>
        <span
          className={`px-3 py-1 rounded-full text-sm text-white ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </div>
      <div>
        <Link
          href={`/dashboard/admin/projects/${id}`}
          className="text-[#007BFF] hover:underline text-sm"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
