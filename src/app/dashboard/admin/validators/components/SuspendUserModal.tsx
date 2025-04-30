import React, { useState } from "react";

interface SuspendUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSuspend: (reason: string) => void;
}

const SuspendUserModal: React.FC<SuspendUserModalProps> = ({
  isOpen,
  onClose,
  onConfirmSuspend,
}) => {
  const [suspensionReason, setSuspensionReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirmSuspend(suspensionReason);
    setSuspensionReason("");
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-[#504F4F0F] bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#211A1D] border border-[#464043] rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white text-center mb-4">
            Suspend User
          </h2>
          <p className="text-neutral-400 text-sm text-center mb-6">
            Please provide reason for suspension
          </p>

          <div className="mb-6">
            <label className="text-neutral-400 text-sm mb-2 block">
              Reason for suspension (Optional)
            </label>
            <textarea
              className="w-full bg-[#161113] border border-[#D3D1D2] rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={5}
              placeholder="Reason for suspension"
              value={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
            />
            <div className="text-right text-neutral-500 text-xs mt-1">
              {suspensionReason.length}/200
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-neutral-700 text-white rounded-lg hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-2 bg-[#0000FF] text-white rounded-lg hover:bg-blue-700"
            >
              Suspend User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuspendUserModal;
