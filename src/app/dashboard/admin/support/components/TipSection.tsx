import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import good from "../../../../../../public/adminIcon/good.svg";
import Image from "next/image";

export default function TipsSection() {
  const [tips, setTips] = useState<string[]>([
    "Always add relevant tags to projects, so you can find the right researchers.",
    "Always add relevant tags to projects, so you can find the right researchers.",
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTipIndex, setEditingTipIndex] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTipIndex, setDeletingTipIndex] = useState<number | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const modalVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const AddTipModal = ({
    isOpen,
    onClose,
    onAddTip,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onAddTip: (tip: string) => void;
  }) => {
    const [tipText, setTipText] = useState("");
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#110D0F] border border-neutral-800 text-white p-8 rounded-lg w-full max-w-[600px]"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-2xl font-bold text-center mb-4">Add tip</h2>
              <p className="mb-6 text-gray-300 text-center text-lg">
                Write a tip or advice for project owners.
              </p>
              <hr className="border-neutral-800 mb-5" />
              <p className="pt-5 pb-2">Tip</p>
              <textarea
                className="w-full h-40 bg-[#110D0F] text-white p-3 rounded mb-4 border border-neutral-800 text-base"
                value={tipText}
                onChange={(e) => setTipText(e.target.value)}
                maxLength={258}
                placeholder="Write a tip"
              />
              <div className="text-right text-sm text-gray-400 mb-6">
                {tipText.length}/258
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  className="bg-gray-500 text-white px-5 py-2 rounded text-base"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#0000FF] text-white px-5 py-2 rounded text-base"
                  onClick={() => onAddTip(tipText)}
                >
                  Add Tip
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const EditTipModal = ({
    isOpen,
    onClose,
    initialTip,
    onSave,
  }: {
    isOpen: boolean;
    onClose: () => void;
    initialTip: string;
    onSave: (tip: string) => void;
  }) => {
    const [tipText, setTipText] = useState(initialTip);
    useEffect(() => {
      setTipText(initialTip);
    }, [initialTip]);
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#211A1D] text-white p-8 rounded-lg w-full max-w-[600px]"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-2xl font-bold mb-4">Edit Tip</h2>

              <hr className="border border-neutral-800 mb-4" />
              <p className="pt-5 pb-2">Tip</p>
              <textarea
                className="w-full h-40 bg-[#110D0F] text-white p-3 rounded mb-4 border border-neutral-800 text-base"
                value={tipText}
                onChange={(e) => setTipText(e.target.value)}
                maxLength={258}
              />

              <div className="text-right text-sm text-gray-400 mb-6">
                {tipText.length}/258
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  className="bg-gray-500 text-white px-5 py-2 rounded text-base"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#0000FF] text-white px-5 py-2 rounded text-base"
                  onClick={() => onSave(tipText)}
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const DeleteConfirmModal = ({
    isOpen,
    onClose,
    onDelete,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
  }) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#110D0F] border border-neutral-800 text-white p-8 rounded-lg w-full max-w-[600px] text-left"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-4xl font-bold text-center mb-4">
                Are you sure you want to delete this tip?
              </h2>
              <p className="mb-6 text-gray-300 text-center text-lg">
                Changes made cannot be undone
              </p>
              <div className="flex justify-center space-x-3 mt-10">
                <button
                  className="bg-[#110D0F] border border-neutral-800 text-white px-8 py-2 rounded text-base"
                  onClick={onClose}
                >
                  No, Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-8 py-2 rounded text-base"
                  onClick={onDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const SuccessModal = ({
    isOpen,
    onClose,
    title,
    message,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
  }) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#211A1D] text-white p-8 rounded-lg w-full max-w-[600px] text-center"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
              <p className="mb-6 text-gray-300 text-lg">{message}</p>
              <hr className="border border-neutral-800 mb-4" />
              <div className="mb-6 mt-10">
                <Image
                  src={good}
                  alt="PDF Icon"
                  width={150}
                  height={80}
                  className="mx-auto mb-6"
                />
              </div>
              <button
                className="bg-[#0000FF] text-white px-14 py-2 my-6 rounded-md text-base"
                onClick={onClose}
              >
                Go Back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <motion.div
      className="mt-6 px-5 pb-5 pt-8 bg-[#110D0F] rounded-[40px] gap-4 border border-neutral-800 cursor-pointer"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between mb-4">
        <h2 className="text-white text-lg font-semibold">Tips</h2>
        <button
          className="bg-[#0000FF] text-white px-4 py-2 rounded"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Tip
        </button>
      </div>
      <table className="w-full text-white">
        <thead className="bg-[#211A1D] px-5 rounded-t-[20px]">
          <tr className="border-b border-[#211A1D]">
            <th className="text-left px-3 py-2">Tip</th>
            <th className="text-left px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tips.map((tip, index) => (
            <tr key={index} className="border-b border-[#211A1D]">
              <td className="py-2">{tip}</td>
              <td className="py-2">
                <button
                  className="text-[#0000FF] hover:underline mr-5"
                  onClick={() => {
                    setEditingTipIndex(index);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-[#0000FF] hover:underline"
                  onClick={() => {
                    setDeletingTipIndex(index);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddTipModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTip={(newTip) => {
          setTips([...tips, newTip]);
          setIsAddModalOpen(false);
          setSuccessTitle("Tip Added Successfully");
          setSuccessMessage(
            "You have successfully added a tip which would be displayed on the project owner's dashboard."
          );
          setIsSuccessModalOpen(true);
        }}
      />
      {editingTipIndex !== null && (
        <EditTipModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialTip={tips[editingTipIndex]}
          onSave={(newTip) => {
            const newTips = [...tips];
            newTips[editingTipIndex] = newTip;
            setTips(newTips);
            setIsEditModalOpen(false);
            setSuccessTitle("Changes Saved");
            setSuccessMessage("All changes made have been saved");
            setIsSuccessModalOpen(true);
          }}
        />
      )}
      {deletingTipIndex !== null && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => {
            const newTips = tips.filter((_, i) => i !== deletingTipIndex);
            setTips(newTips);
            setIsDeleteModalOpen(false);
            setSuccessTitle("Tip Successfully Deleted");
            setSuccessMessage("Tip has been successfully deleted");
            setIsSuccessModalOpen(true);
          }}
        />
      )}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title={successTitle}
        message={successMessage}
      />
    </motion.div>
  );
}
