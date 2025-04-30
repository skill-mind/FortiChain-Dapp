"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface RequestInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  additionalInfo: string;
  setAdditionalInfo: (value: string) => void;
}

export function RequestInfoModal({
  isOpen,
  onClose,
  onSubmit,
  additionalInfo,
  setAdditionalInfo,
}: RequestInfoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
        <DialogTitle className="text-center text-xl mb-4">
          Request More Information
        </DialogTitle>

        <p className="text-center text-zinc-300 mb-6">
          Provide details on what additional information you need from the
          researcher.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-zinc-400 mb-2">Additional Details</h3>
            <Textarea
              placeholder="Please clarify the steps to reproduce or provide additional proof of concept details"
              className="bg-zinc-800 border-zinc-700 text-white min-h-[120px]"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
            <div className="flex justify-end mt-1">
              <span className="text-xs text-zinc-400">
                {additionalInfo.length}/256
              </span>
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
          <Button
            className="w-full px-8 bg-[#0000FF] rounded-md py-3 hover:bg-blue-700 text-white"
            onClick={onSubmit}
          >
            Send Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
