"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Animation } from "@/motion/Animation";
import { motion } from "framer-motion";
import { ConnectButton } from "@/components/connect-button";
import NotificationModal from "./resuables/Notification-modal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const pathname = usePathname();
  const [isBellActive, setIsBellActive] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const walletAddress = "0x04baf3f32432a21D3b2C90E998Aa5EC7817E61b3";

  // Fixed title logic to handle project detail pages and report pages
  const getPageTitle = () => {
    const pathSegments = pathname?.split("/").filter(Boolean) || [];

    // Check if we're on a report detail page
    if (pathSegments.includes("reports")) {
      const reportsIndex = pathSegments.indexOf("reports");

      // If there's a segment after "reports" that looks like an ID or specific route
      if (reportsIndex < pathSegments.length - 1) {
        const nextSegment = pathSegments[reportsIndex + 1];

        // Check for specific report routes
        if (nextSegment === "success" || nextSegment === "reject") {
          return "Report Details";
        }

        // If it's just a report ID (numeric or alphanumeric), show "Report Details"
        if (/^[a-zA-Z0-9-_]+$/.test(nextSegment) && nextSegment !== "new") {
          return "Report Details";
        }
      }

      // Default for reports page
      return "Reports";
    }

    // Check if we're on a project detail page (ends with a project ID)
    if (pathSegments.length >= 4 && pathSegments[2] === "projects") {
      const lastSegment = pathSegments[pathSegments.length - 1];
      // If the last segment looks like a project ID (numeric or alphanumeric ID)
      if (
        /^[a-zA-Z0-9-_]+$/.test(lastSegment) &&
        pathSegments[pathSegments.length - 2] !== "register-project"
      ) {
        return "Project Details";
      }
    }

    // For register project page
    if (pathSegments.includes("register-project")) {
      return "Register Project";
    }

    // Default behavior for other pages
    const title = pathSegments[pathSegments.length - 1];
    return title.charAt(0).toUpperCase() + title.slice(1) + " Dashboard";
  };

  const capitalizedTitle = getPageTitle().replace("-", " ");

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <header className="flex relative gap-4 justify-between items-center w-full px-[100px] py-5 border-b-[#1F1F1F] border-b-[1px]">
      <Animation delay={0.2} animationType="slide-up">
        <div className="flex gap-x-3">
          <img src="/brandlogo.svg" className="w-[127px] h-10" alt="" />
          <div className="py-3 px-6 font-normal bg-[#101011] text-[#E2E2E2] rounded-full">
            {capitalizedTitle}
          </div>
        </div>
      </Animation>
      <Animation delay={0.2} animationType="slide-up">
        <div className="flex relative gap-3 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={() => setIsBellActive(!isBellActive)}
                className="flex gap-x-2 items-center py-3 px-6 transition-colors bg-[#101011] rounded-full"
              >
                <Bell
                  size={16}
                  className={isBellActive ? "text-black" : "text-white"}
                />
                <span>Notification</span>
              </button>
            </DropdownMenuTrigger>
            <NotificationModal />
          </DropdownMenu>

          {/* Wallet Button */}
          <motion.div variants={navItemVariants} className="hidden md:block">
            <ConnectButton
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              variant="navbar"
            />
          </motion.div>

          {/* Wallet Dropdown */}
          {walletOpen && (
            <div className="absolute right-0 top-[110%] bg-none z-[9997] shadow-md">
              <button className="px-6 py-3 bg-[#FF3737] hover:bg-red-600 text-white rounded-md transition-colors">
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      </Animation>
    </header>
  );
};

export default Header;
