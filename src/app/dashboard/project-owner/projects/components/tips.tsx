"use client";

import type React from "react";

import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export function Tip() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card className="bg-[#1A1A1A] border-gray-800 p-4 relative">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        onClick={() => setIsVisible(false)}
      >
        <X size={16} />
      </button>
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <TipIcon className="text-gray-400 w-5 h-5" />
        </div>
        <div>
          <h3 className="font-medium text-white mb-1">Tip</h3>
          <p className="text-gray-400 text-sm">
            All funds in escrow are refundable if no valid reports are submitted
            before the deadline.
          </p>
        </div>
      </div>
    </Card>
  );
}

function TipIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M12 8a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0v-2a4 4 0 0 0-4-4Z" />
    </svg>
  );
}
