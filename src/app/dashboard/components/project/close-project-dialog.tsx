"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CloseProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  isClosed: boolean;
}

export function CloseProjectDialog({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  isClosed,
}: CloseProjectDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md bg-[#211A1D] border-gray-600 text-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-[1.5rem] text-center font-semibold text-white mb-2">
          {isClosed ? "Project Closed Successfully" : "Close Project?"}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <DialogDescription className="text-gray-400 text-center flex flex-col gap-4">
            <p className="text-gray-400">
              We are processing your request. This may take a few moments
            </p>
            <hr className="my-2 border-gray-600" />
            <div className="mt-2">
              <div className="flex justify-center mb-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              </div>
              <p className="mt-4 text-white font-medium">Closing project...</p>
            </div>
          </DialogDescription>
        ) : (
          !isClosed && (
            <>
              <DialogDescription className="text-gray-400 text-center flex flex-col gap-2">
                <p>
                  Project will no longer accept report submissions and
                  researchers would be paid immediately.
                </p>
                <hr className="mt-2 border-gray-600" />
                <div className="mt-2 flex flex-col gap-2">
                  <p className="text-white text-xs text-start">
                    Reason for closure
                  </p>
                  <textarea
                    className="bg-[#161113] w-full h-40 border border-gray-600 rounded-lg p-2"
                    placeholder="Enter reason to project owner"
                  ></textarea>
                </div>
              </DialogDescription>
              <div className="mt-6 w-full flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  className="px-12 py-5 bg-[transparent] text-white border-[#464043] max-w-[198px] hover:bg-gray-700"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="px-12 py-5 border-[#0000FF] bg-[#0000FF] max-w-[198px] hover:bg-blue-700 text-white"
                  onClick={onConfirm}
                >
                  Close Project
                </Button>
              </div>
            </>
          )
        )}

        {isClosed && (
          <>
            <p className="text-gray-400 text-center text-sm mb-1">
              Project “FortiChain” was closed successfully
            </p>
            <hr className="mt-2 border-gray-600 mb-8" />

            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
              Go Back
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
