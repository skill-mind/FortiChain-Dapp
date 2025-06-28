"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ProvideMoreDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: string) => void;
}

export function ProvideMoreDetailsModal({
  isOpen,
  onClose,
  onSubmit,
}: ProvideMoreDetailsModalProps) {
  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    if (details.trim()) {
      onSubmit(details);
      setDetails("");
      onClose();
    }
  };

  const handleCancel = () => {
    setDetails("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1C1618] border-[#464043] text-white max-w-2xl p-4 py-8 md:p-8 w-[calc(100vw-2rem)] md:w-full">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Provide More Details
            </h2>
            <p className="text-gray-300 text-lg">
              Your report requires additional information before it can be
              validated.
            </p>
          </div>

          {/* Content Box */}
          <div className="border border-[#464043] rounded-lg p-3 bg-[#211a1d] md:mx-5">
            <Textarea
              placeholder="To proceed with validation, please provide more details on the steps to reproduce the issue, clarify any unclear aspects of the report, or include additional proof of concept evidence."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="min-h-[120px] bg-transparent border-none text-gray-300 placeholder:text-gray-500 placeholder:text-lg resize-none focus:ring-0 focus:outline-none !text-lg leading-relaxed focus-visible:ring-0"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 md:px-5">
            <button
              onClick={handleCancel}
              className="flex-1 px-8 py-3 border border-[#464043] text-white rounded-lg hover:bg-[#2a2326] transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!details.trim()}
              className="flex-1 px-8 py-3 bg-[#0000FF] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed <span className="hidden md:inline-block">to Edit</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
