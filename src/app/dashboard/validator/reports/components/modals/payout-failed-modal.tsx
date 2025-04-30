"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import failedImg from "../../../../../../../public/failed.svg";
import Image from "next/image";

interface PayoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
}

export function PayoutFailedModal({
  isOpen,
  onClose,
  onGoToDashboard,
}: PayoutSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#211a1d] border-zinc-800 text-white max-w-md">
        <div className="flex flex-col items-center justify-center py-6">
          <DialogTitle className="text-center text-xl mb-2">
            Approval Failed
          </DialogTitle>
          <p className="text-center border-b pb-2 border-zinc-800 w-full  text-zinc-300 mb-6">
            Opps! An Error Occur.
          </p>

          <div className=" rounded-md p-4 mb-1">
            <Image src={failedImg} alt="icon" />
          </div>

          <p className="text-center font-medium mb-6">
            Make sure you are connected to the internet.
          </p>

          <div className="flex w-full justify-between items-center gap-4 mt-4">
            <button
              onClick={onClose}
              className="px-8 w-full py-2 border rounded-md border-[#6B6668] bg-[#211a1d] text-white"
            >
              Cancel
            </button>
            <button
              className="w-full px-8 bg-[#0000FF] rounded-md py-2 hover:bg-blue-700 text-white"
              onClick={onGoToDashboard}
            >
              Retry
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
