import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface CloseProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CloseProjectModal: React.FC<CloseProjectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-[#1C1C1C] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold text-white mb-4"
                >
                  Close Project
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-gray-400">
                    Closing this project means that no new vulnerability reports
                    can be submitted. Any remaining allocated bounties will be
                    distributed based on the final review, and unclaimed rewards
                    may be released to you for withdrawal (if applicable).
                  </p>
                  <p className="mt-4 text-white font-medium">
                    This action is irreversible.
                  </p>
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    type="button"
                    className="flex-1 rounded-lg px-4 py-2 text-white bg-gray-800 hover:bg-gray-700 focus:outline-none"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-lg px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    onClick={onConfirm}
                  >
                    Close Project
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

export default CloseProjectModal;
