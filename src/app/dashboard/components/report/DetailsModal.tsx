"use client";

import React from 'react';

interface DetailsModalProps {
  onClose: () => void;
  onProceed: () => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ onClose, onProceed }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[650px] bg-[#211A1D] border border-[#464043] rounded-[10px] p-5 flex flex-col gap-[54px]">
        <div className="flex flex-col gap-4 pb-2 border-b border-b-[#464043]">
          <h2 className="font-sora font-bold text-[40px] leading-[100%] text-white">
            Provide More Details
          </h2>
          <p className="font-inter font-light text-[16px] leading-[150%] text-white text-center">
            Your report requires additional information before it can be released.
          </p>
        </div>

        <div className="bg-[#161113] border border-[#D3D1D2] rounded-[8px] p-4">
          <p className="font-inter font-normal text-[16px] leading-[150%] text-[#B5B3B4]">
            Protocols and statistics, please provide new details on the page to reproduce 
            the basic quality of product products and reports on include published proof 
            of concept releases.
          </p>
        </div>

        <div className="flex gap-[25px]">
          <button 
            onClick={onClose}
            className="flex-1 h-[57px] border border-[#6B6668] rounded-[10px] flex items-center justify-center"
          >
            <span className="font-inter font-semibold text-[16px] leading-[150%] text-white">
              Cancel
            </span>
          </button>
          <button 
            onClick={onProceed}
            className="flex-1 h-[57px] bg-[#0000FF] rounded-[10px] flex items-center justify-center"
          >
            <span className="font-inter font-semibold text-[16px] leading-[150%] text-white">
              Proceed to Edit
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};