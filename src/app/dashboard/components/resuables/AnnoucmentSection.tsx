"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle, File, ChevronRight } from "lucide-react";
import { Animation } from "@/motion/Animation";
import Image from "next/image";
import imgOne from "../../../../../public/researcherIcon/annImgeOne.svg";
import imgTwo from "../../../../../public/researcherIcon/annImgeTwo.svg";
import imgThree from "../../../../../public/researcherIcon/annImgeThree.svg";
import hourglass from "../../../../../public/researcherIcon/hourGlass.svg";
import calendar from "../../../../../public/researcherIcon/calendarImg.svg";
import NotificationModal from "./Notification-modal";

// Type for a single announcement
interface Announcement {
  type: "rejected" | "bounty" | "new" | string;
  title: string;
  description: string;
  actionLink: string;
  authorIcon?: any;
  timeAgo: string;
}

// Props for the component
interface AnnouncementsProps {
  announcements: Announcement[];
  viewAllLink?: string;
}

export const Announcements: React.FC<AnnouncementsProps> = ({
  announcements,
  viewAllLink = "#",
}) => {
  const [showNotification, setShowNotification] = useState(false);

  function bellActiveHandler() {
    setShowNotification(false);
  }

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case "rejected":
        return <Image src={imgOne} alt={"icon"} height={20} width={20} />;
      case "bounty":
        return <Image src={imgTwo} alt={"icon"} height={20} width={20} />;
      case "new":
        return <Image src={imgThree} alt={"icon"} height={20} width={20} />;
      default:
        return <AlertCircle size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-[#161113] rounded-[20px] p-4 md:p-6 border border-neutral-800 mt-6">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-white text-[28px] font-semibold">
          Announcements & Updates
        </h2>
        <button
          onClick={() => setShowNotification((prev) => !prev)}
          className="text-[#0000FF] flex items-center text-sm hover:text-blue-400"
        >
          View All
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      {showNotification && (
        <NotificationModal setIsBellActive={bellActiveHandler} />
      )}
      <div className="space-y-5">
        {announcements.map((announcement, index) => (
          <Animation delay={0.2 * index} animationType="slide-up" key={index}>
            {/* Announcement Item */}
            <div
              key={index}
              className="border-t border-neutral-800 pt-4 pb-12 first:pt-0 first:border-0"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {getAnnouncementIcon(announcement.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {announcement.description}
                  </p>
                  <div className="flex items-center flex-wrap gap-3 text-xs">
                    <Link
                      href={announcement.actionLink}
                      className="text-[#0000FF] hover:text-blue-400"
                    >
                      View Details
                    </Link>
                    <div className="flex items-center text-gray-500 gap-1">
                      {announcement.authorIcon && (
                        <span>{announcement.authorIcon}</span>
                      )}
                      <span>{announcement.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Animation>
        ))}
      </div>
    </div>
  );
};
