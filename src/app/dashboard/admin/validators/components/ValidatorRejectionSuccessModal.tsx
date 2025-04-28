import React from "react";
import Image from "next/image";

interface ValidatorRejectionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  validatorId: string;
}

const ValidatorRejectionSuccessModal: React.FC<
  ValidatorRejectionSuccessModalProps
> = ({ isOpen, onClose, validatorId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-[#504F4F0F] bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#211A1D] border border-[#464043] rounded-lg w-full max-w-md p-6 text-center">
        <h2 className="text-xl font-semibold text-white mb-2">
          Validator Profile Rejected
        </h2>
        <p className="text-neutral-400 text-sm mb-8">
          User {validatorId} - application has been successfully rejected.
        </p>

        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6">
            <Image src="/Frame.svg" alt="" width={100} height={100} />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-[#0000FF] text-white px-8 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidatorRejectionSuccessModal;
