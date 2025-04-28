import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

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
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-[#1C1C1C] p-6 text-center align-middle shadow-xl transition-all">
                <div className="flex justify-center mb-4">
                  <BsCheckCircleFill className="w-16 h-16 text-green-500" />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold text-white mb-4"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-gray-400">{message}</p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full rounded-lg px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    onClick={onClose}
                  >
                    {buttonText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SuccessModal;
