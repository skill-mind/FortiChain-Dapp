import React from "react";
import {
  Description,
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText = "Go Back",
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto w-full max-w-lg mx-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-[500px] flex flex-col justify-center 
              items-center gap-2 max-w-md transform overflow-hidden rounded-lg
               bg-[#211A1D] p-8 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-[1.5rem] font-semibold text-white mb-4 flex justify-center"
                >
                  {title}
                </DialogTitle>

                <Description className="text-gray-400 text-center flex flex-col gap-4">
                  <p>{message}</p>
                  <hr className="my-2 border-gray-600" />
                  <div className="flex justify-center mb-4">
                    <Image src={"/adminIcon/check-mark.svg"} alt="icon" className="w-16 h-16 text-green-500" height={20} width={20} />
                  </div>
                </Description>
                <div className="mt-6 w-full flex gap-4">
                  <button
                    type="button"
                    className="flex-1 rounded-lg p-4 text-white bg-[#0000AA] hover:bg-blue-700 focus:outline-none"
                    onClick={onClose}
                  >
                    {buttonText}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SuccessModal;
