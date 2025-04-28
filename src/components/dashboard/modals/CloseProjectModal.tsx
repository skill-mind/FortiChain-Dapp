import React from "react";
import {  Description, Dialog, Transition, TransitionChild, DialogPanel, DialogTitle} from "@headlessui/react";
import { Fragment } from "react";

interface CloseProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const CloseProjectModal: React.FC<CloseProjectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full flex flex-col justify-center items-center gap-2 max-w-md transform overflow-hidden rounded-lg bg-[#211A1D] p-8 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-[1.5rem] font-semibold text-white mb-4 flex justify-center"
                >
                  Close Project
                </DialogTitle>

                {isLoading ? (
                  <>
                    <Description className="text-gray-400 text-center flex flex-col gap-4">
                      <p className="text-gray-400">
                        We are processing your request. This may take a few
                        moments
                      </p>
                      <hr className="my-2 border-gray-600" />
                      <div className="mt-2">
                        <div className="flex justify-center mb-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                        <p className="mt-4 text-white font-medium">
                          Closing project...
                        </p>
                      </div>
                    </Description>
                  </>
                ) : (
                  <>
                    <Description className="text-gray-400 text-center flex flex-col gap-4">
                      <p>Are you sure you want to close this project?</p>
                      <hr className="my-2 border-gray-600" />
                      <div className="mt-2 flex flex-col items-center gap-4">
                        <p className="text-gray-400 text-center">
                          Closing this project means that no new vulnerability
                          reports can be submitted. Any remaining allocated
                          bounties will be distributed based on the final
                          review, and unclaimed rewards may be released to you
                          for withdrawal (if applicable).
                        </p>
                        <p className="mt-4 text-white font-medium">
                          This action is irreversible.
                        </p>
                      </div>
                    </Description>
                    <div className="mt-6 w-full flex gap-4">
                      <button
                        type="button"
                        className="flex-1 rounded-lg p-4 text-white border border-[#464043]  hover:bg-gray-700 focus:outline-none"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="flex-1 rounded-lg p-4 text-white bg-[#0000AA] hover:bg-blue-700 focus:outline-none"
                        onClick={onConfirm}
                      >
                        Close Project
                      </button>
                    </div>
                  </>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CloseProjectModal;
