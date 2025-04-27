"use client";

import { cards } from "../../researcher/projects/mockData";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CardGridProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CardGrid({ isOpen, onClose }: CardGridProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-[#504F4F0F] top-0 inset-0 backdrop-blur-lg z-50 min-h-screen w-full fixed p-10 flex justify-center items-center"
        >
          <div className="bg-[#1C1618] rounded-[30px] border px-[32px] py-[26px] border-[#464043] relative max-w-6xl w-full">
            {/* Close Button */}
            <button type="button"
              className="absolute top-5 right-5 text-white"
              onClick={onClose}
            >
              <X size={24} />
            </button>

            <h1 className="text-[32px] font-[700] my-3 text-center">
              DeFi Guard Reports
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[130px] my-[50px]">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-[#110D0F] border-[#464043] border rounded-lg p-4 flex flex-col text-white shadow-md"
                >
                  <div className="flex justify-between text-sm text-[#B5B3B4] mb-2">
                    <span>{card.id}</span>
                    <span>{card.date}</span>
                  </div>
                  <h2 className="font-semibold mb-3">{card.title}</h2>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="space-x-2 flex items-center">
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                        {card.severity}
                      </span>
                      <span className="text-sm">{card.score}</span>
                    </span>
                    <span className="text-sm text-[#B5B3B4]">{card.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
