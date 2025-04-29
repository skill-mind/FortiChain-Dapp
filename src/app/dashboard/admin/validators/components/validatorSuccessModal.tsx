import React from "react";
import Image from "next/image";

interface ValidatorSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  validatorId: string;
}

const ValidatorSuccessModal: React.FC<ValidatorSuccessModalProps> = ({
  isOpen,
  onClose,
  validatorId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-[#504F4F0F] bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#211A1D] border border-[#464043] rounded-lg max-w-md w-full overflow-hidden">
        <div className="p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Validator Profile Approved
          </h2>

          <p className="text-[12px] mb-6">
            User {validatorId} has been successfully approved as a project
            validator. They can now review and validate project submissions.
          </p>

          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Image src="/Frame.svg" alt="" width={100} height={100} />
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#0000FF] hover:bg-blue-700 text-white font-medium py-3 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidatorSuccessModal;
