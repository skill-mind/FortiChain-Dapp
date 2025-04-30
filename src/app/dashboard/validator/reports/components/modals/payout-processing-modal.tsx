"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PayoutProcessingModalProps {
  isOpen: boolean;
}

export function PayoutProcessingModal({ isOpen }: PayoutProcessingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-xs">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 mb-4 relative">
            <div className="absolute inset-0 border-t-2 border-r-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-lg">Approving payout...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
