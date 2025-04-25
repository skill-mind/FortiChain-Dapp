"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Bell, Copy, ChevronUp, ChevronDown } from "lucide-react";
import { Animation } from "@/motion/Animation";
const Header = () => {
  const pathname = usePathname();
  const [isBellActive, setIsBellActive] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const walletAddress = "0x04baf3f32432a21D3b2C90E998Aa5EC7817E61b3";

  const title = pathname?.split("/").filter(Boolean).pop() || "Dashboard";
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <header className="w-full flex flex-row md:flex-row items-start md:items-center justify-between px-0 py-3 md:px-0 md:pb-8 md:pt-1 gap-4 relative">
      <Animation delay={0.2} animationType="slide-up">
        <h1 className="text-white text-[24px] md:text-[40px] font-bold">
          {capitalizedTitle}
        </h1>
      </Animation>
      <Animation delay={0.2} animationType="slide-up">
        <div className="flex items-center gap-3 relative">
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

          {/* Wallet Button */}
          <div
            onClick={() => setWalletOpen(!walletOpen)}
            className="flex items-center gap-2 cursor-pointer border border-[#6B6668] text-white text-[14px] md:text-[16px] md:text-sm px-3 py-2 rounded-lg bg-transparent"
          >
            <span
              onClick={() => setWalletOpen(!walletOpen)}
              className="truncate max-w-[100px] md:max-w-[140px]"
            >
              {walletAddress.slice(0, 14)}...
            </span>
            {walletOpen ? (
              <ChevronUp size={16} className="text-white" />
            ) : (
              <ChevronDown size={16} className="text-white" />
            )}
          </div>

          {/* Wallet Dropdown */}
          {walletOpen && (
            <div className="absolute right-0 top-[110%] bg-[#1E1E1E] border border-[#6B6668] text-white text-sm px-4 py-3 rounded-lg w-[280px] z-10 shadow-md">
              <div className="flex justify-between items-center">
                <span className="break-all">{walletAddress}</span>
                <button onClick={handleCopy} className="ml-2 text-white">
                  <Copy size={16} />
                </button>
              </div>
              {copied && (
                <span className="text-green-400 text-xs mt-1 block">
                  Copied!
                </span>
              )}
            </div>
          )}
        </div>
      </Animation>
    </header>
  );
};

export default Header;
