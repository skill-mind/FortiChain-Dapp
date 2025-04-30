"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface RejectReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  rejectReason: string;
  setRejectReason: (value: string) => void;
}

export function RejectReportModal({
  isOpen,
  onClose,
  onSubmit,
  rejectReason,
  setRejectReason,
}: RejectReportModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#211a1d] border-zinc-800 text-white max-w-md">
        <DialogTitle className="text-center text-xl mb-4">
          Reject Report
        </DialogTitle>

        <p className="text-center text-zinc-300 mb-6">
          Are you sure you want to reject this report? Please provide a reason.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-zinc-400 mb-2">Reason for Rejection</h3>

            <div className="space-y-2 text-[#f6f6f6]">
              <div className="flex space-x-3 items-center">
                <input
                  type="checkbox"
                  name="Duplicte Report"
                  className="w-4 h-4 bg-none"
                  id=""
                />
                <label htmlFor="">Duplicte Report</label>
              </div>

              <div className="flex space-x-3 items-center">
                <input
                  type="checkbox"
                  name="Not a Valid Security issue"
                  id=""
                  className="w-4 h-4 bg-none"
                />
                <label htmlFor="">Not a Valid Security issue</label>
              </div>

              <div className="flex space-x-3 items-center">
                <input
                  type="checkbox"
                  name="Already Known"
                  className="w-4 h-4 bg-none"
                  id=""
                />
                <label htmlFor="">Already Known</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between items-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-8 w-full py-2 border rounded-md border-[#6B6668] bg-[#211a1d] text-white"
          >
            Cancel
          </button>
          <button
            className="w-full px-8 bg-[#0000FF] rounded-md py-2 hover:bg-blue-700 text-white"
            onClick={onSubmit}
          >
            Reject Report
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
