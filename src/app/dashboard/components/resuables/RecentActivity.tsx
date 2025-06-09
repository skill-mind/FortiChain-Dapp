"use client";

import React, { useState } from "react";
import { ActivityItem } from "./ActivityItem";
import { Animation } from "@/motion/Animation";
import { Modal } from "./Modal";

interface ActivityEvent {
  id: string | number;
  title: string;
  subtitle: string;
  timestamp: string;
}

interface RecentActivityProps {
  events: ActivityEvent[];
  viewAllHref?: string;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  events,
  viewAllHref = "#",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-6 bg-[#161113] min-h-[455px] rounded-[20px] border border-neutral-800">
        <div className="flex justify-between items-center mb-6">
          <Animation delay={0.2} animationType="slide-up">
            <h3 className="text-[24px] font-bold text-white">
              Recent Activity
            </h3>
          </Animation>
          <Animation delay={0.4} animationType="slide-up">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-[#0000FF] hover:text-blue-400"
            >
              View All
            </button>
          </Animation>
        </div>

        <div className="flex flex-col">
          {events.slice(0, 5).map((event, index) => (
            <ActivityItem
              key={event.id}
              title={event.title}
              subtitle={event.subtitle}
              timestamp={event.timestamp}
              isLast={index === Math.min(events.length - 1, 4)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="All Activity"
      >
        <div className="flex flex-col space-y-4">
          {events.map((event, index) => (
            <ActivityItem
              key={event.id}
              title={event.title}
              subtitle={event.subtitle}
              timestamp={event.timestamp}
              isLast={index === events.length - 1}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};
