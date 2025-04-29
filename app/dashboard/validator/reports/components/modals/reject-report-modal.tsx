"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface RejectReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  rejectReason: string
  setRejectReason: (value: string) => void
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
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
        <DialogTitle className="text-center text-xl mb-4">Reject Report</DialogTitle>

        <p className="text-center text-zinc-300 mb-6">
          Are you sure you want to reject this report? Please provide a reason.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-zinc-400 mb-2">Reason for Rejection</h3>
            <Textarea
              placeholder="Please provide a reason for rejecting this report"
              className="bg-zinc-800 border-zinc-700 text-white min-h-[120px]"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end mt-1">
              <span className="text-xs text-zinc-400">{rejectReason.length}/256</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Button variant="outline" className="flex-1 border-zinc-700 text-white hover:bg-zinc-800" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={onSubmit}>
            Reject Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
