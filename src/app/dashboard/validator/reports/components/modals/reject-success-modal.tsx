"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface RejectSuccesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
}

export function RejectSuccesModal({
  isOpen,
  onClose,
  onGoToDashboard,
}: RejectSuccesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#211a1d] border-zinc-800 text-white max-w-md">
        <div className="flex flex-col items-center justify-center py-6">
          <DialogTitle className="text-center text-xl mb-2">
            Report Rejected
          </DialogTitle>
          <p className="text-center border-b pb-2 border-zinc-800 w-full text-zinc-300 mb-6">
            This report has been successfully rejected these report
          </p>

          <div className="bg-green-500 rounded-md mt-8 p-4 mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <Button
            className="w-fit px-8 bg-[#0000FF] hover:bg-blue-700 text-white"
            onClick={onGoToDashboard}
          >
            Go to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
