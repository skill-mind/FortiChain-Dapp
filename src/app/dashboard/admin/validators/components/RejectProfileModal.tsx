import React, { useState } from "react";

interface RejectProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReject: (reason: string) => void;
}

const RejectProfileModal: React.FC<RejectProfileModalProps> = ({
  isOpen,
  onClose,
  onConfirmReject,
}) => {
  const [rejectionReason, setRejectionReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirmReject(rejectionReason);
    setRejectionReason("");
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-[#504F4F0F] bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#211A1D] border border-[#464043] rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white text-center mb-4">
            Reject Profile
          </h2>
          <div className="border-b border-[#464043] pb-2 mb-5">
            <p className="text-neutral-400 text-sm text-center">
              Please provide reason for rejection
            </p>
          </div>

          <div className="mb-6">
            <label className="text-neutral-400 text-sm mb-2 block">
              Reason for rejection (Optional)
            </label>
            <textarea
              className="w-full bg-[#161113] border border-[#D3D1D2] rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={5}
              placeholder="Reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="text-right text-neutral-500 text-xs mt-1">
              {rejectionReason.length}/200
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-[#6B6668] text-white rounded-lg hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-2 bg-[#0000FF] text-white rounded-lg hover:bg-blue-700"
            >
              Reject Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectProfileModal;
