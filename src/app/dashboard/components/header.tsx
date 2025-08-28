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

  const dashboardType = pathname.split("/")[2] || "";

  const titleMap: Record<string, string> = {
    admin: "Admin Dashboard",
    "project-owner": "Project Owner Dashboard",
    researcher: "Researcher Dashboard",
    validator: "Validator Dashboard",
  };

  const capitalizedTitle = titleMap[dashboardType] || "Dashboard";

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <header className="flex relative gap-4 justify-between items-center w-full px-6 lg:px-[100px] py-3 lg:py-5 border-b-[#1F1F1F] border-b-[1px]">
      <Animation delay={0.2} animationType="slide-up">
        <div className="flex gap-x-3">
          <img
            src="/brandlogo.svg"
            className="w-[100px] lg:w-[127px] lg:h-10"
            alt=""
          />
          {pathname?.startsWith("/dashboard") && (
            <div className="py-3 px-6 font-normal bg-[#101011] text-[#E2E2E2] rounded-full lg:flex hidden">
              {capitalizedTitle}
            </div>
          )}
        </div>
      </Animation>
      <Animation delay={0.2} animationType="slide-up">
        <div className="flex relative gap-3 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={() => setIsBellActive(!isBellActive)}
                className="flex gap-x-2 items-center p-3 lg:py-3 lg:px-6 transition-colors bg-[#101011] rounded-full"
              >
                <Bell
                  size={16}
                  className={isBellActive ? "text-black" : "text-white"}
                />
                <span className="lg:flex hidden">Notification</span>
              </button>
            </DropdownMenuTrigger>
            <NotificationModal />
          </DropdownMenu>

          {/* Wallet Button */}
          <motion.div variants={navItemVariants} className="">
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
