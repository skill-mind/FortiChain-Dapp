"use client";

import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { Bell, Copy, ChevronUp, ChevronDown } from "lucide-react";
import { Animation } from "@/motion/Animation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ConnectButton } from "@/components/connect-button";
import NotificationModal from "./resuables/Notification-modal";

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
    const title = pathSegments[pathSegments.length - 1] || "dashboard";
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const capitalizedTitle = getPageTitle().replace("-", " ");

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  interface Notification {
    id: number;
    type: "urgent" | "fund release" | "Bounty Paid Out" | "New submission";
    title: string;
    description: string;
    actionText: string;
    timeAgo: string;
    imageSrc: string;
  }

  const notifications: Notification[] = [
    {
      id: 1,
      type: "urgent",
      title: "Vulnerability Found!",
      description:
        "A critical vulnerability has been reported in your project SecureChain. Immediate action is required!",
      actionText: "View Report",
      timeAgo: "2 mins ago",
      imageSrc: "/notification-icons/urgent.png",
    },
    {
      id: 2,
      type: "fund release",
      title: "",
      description:
        "Your escrow funds of 1,500 STRK (~$2,000) are now available for withdrawal.",
      actionText: "Withdraw Now",
      timeAgo: "10 mins ago",
      imageSrc: "/notification-icons/money-bag.png",
    },
    {
      id: 3,
      type: "Bounty Paid Out",
      title: "",
      description:
        "A researcher has received their bounty for their report on SecureChain.",
      actionText: "View Details",
      timeAgo: "1 hour ago",
      imageSrc: "/notification-icons/green-tick.png",
    },
    {
      id: 4,
      type: "New submission",
      title: "",
      description:
        "A security researcher submitted a new bug report. Please review and take action.",
      actionText: "Review Submission",
      timeAgo: "30 mins ago",
      imageSrc: "/notification-icons/file.png",
    },
  ];

  // --- Animation Variants ---

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } },
  };

  const notificationItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  function bellActiveHandler() {
    setIsBellActive(false);
  }

  return (
    <header className="flex relative flex-row gap-4 justify-between items-start px-0 py-3 w-full md:flex-row md:items-center md:px-0 md:pb-8 md:pt-1">
      <Animation delay={0.2} animationType="slide-up">
        <h1 className="text-white text-[24px] md:text-[40px] font-bold">
          {capitalizedTitle}
        </h1>
      </Animation>
      <Animation delay={0.2} animationType="slide-up">
        <div className="flex relative gap-3 items-center">
          {/* Notification Bell */}
          <button
            onClick={() => setIsBellActive(!isBellActive)}
            className={`border border-[#6B6668] p-2 rounded-lg transition-colors ${
              isBellActive ? "bg-white" : "bg-transparent"
            }`}
          >
            <Bell
              size={20}
              className={isBellActive ? "text-black" : "text-white"}
            />
          </button>

          {isBellActive && (
            <NotificationModal setIsBellActive={bellActiveHandler} />
          )}

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
              <button className="px-6 py-3 bg-[#FF3737] hover:bg-red-600 text-white rounded-md text-sm transition-colors">
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
