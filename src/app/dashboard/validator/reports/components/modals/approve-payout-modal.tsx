"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Report } from "../../types";

interface ApprovePayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  rewardAmount: string;
  setRewardAmount: (value: string) => void;
  report: Report | null;
}

export function ApprovePayoutModal({
  isOpen,
  onClose,
  onSubmit,
  rewardAmount,
  setRewardAmount,
  report,
}: ApprovePayoutModalProps) {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#211a1d] border-zinc-800 text-white max-w-md">
        <DialogTitle className="text-center text-xl mb-4">
          Approve Payout
        </DialogTitle>

        <p className="text-center text-zinc-300 mb-6">
          Are you sure you want to approve this payout? Once approved, the
          researcher will receive the bounty
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-center text-zinc-400 mb-1">Report Title</h3>
            <p className="text-center font-medium">
              Local File Inclusion (LFI) on Home Page - {report.url}
            </p>
          </div>

          <div>
            <h3 className="text-center text-zinc-400 mb-1">Severity</h3>
            <div className="flex justify-center">
              <span
                className={`bg-red-600 text-white text-sm px-3 py-1 rounded-md`}
              >
                {report.severity}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-left text-sm text-zinc-400 mt-4 mb-1">
              Reward Amount
            </h3>
            <Input
              type="text"
              placeholder="Enter Researcher's reward"
              className="bg-zinc-800 border-zinc-700 text-white"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
            />
            <p className="text-xs text-zinc-400 mt-1">
              Available amount: 5,673 STRK ($5,245)
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            className="flex-1 border rounded-md border-[#6B6668] bg-[#211a1d] text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onSubmit}
          >
            Approve
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
