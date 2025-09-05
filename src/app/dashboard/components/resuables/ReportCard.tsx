"use client";

import { cards } from "../../researcher/projects/mockData";

export default function CardGrid() {
  return (
    <div className="w-full">
      <h1 className="text-[32px] font-[700] my-6 text-center">
        DeFi Guard Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}
