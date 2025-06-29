'use client';

import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectClosedSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  closingNote?: string;
}

export default function ProjectClosedSuccessModal({ 
  isOpen,
  onClose, 
  projectName,
  closingNote
}: ProjectClosedSuccessModalProps) {
  // Auto close after 4 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#161113] border border-[#464043] rounded-2xl p-8 max-w-md w-full mx-4 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Project Closed Successfully</h2>
        
        <p className="text-gray-300 mb-6">
          <span className="font-semibold text-white">{projectName}</span> has been successfully closed. 
          You can reopen it anytime from your project dashboard.
        </p>

        {closingNote && (
          <div className="bg-[#1a1518] rounded-lg p-4 mb-6 text-left">
            <h4 className="text-white font-medium mb-2">Closing Note:</h4>
            <p className="text-gray-300 text-sm">{closingNote}</p>
          </div>
        )}
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-green-500 rounded-lg w-16 h-16 flex items-center justify-center">
            <CheckCircle size={32} color="white" />
          </div>
        </motion.div>
        
        <button
          onClick={onClose}
          className="w-full bg-[#0000FF] hover:bg-[#1100ff] text-white font-medium py-3 rounded-lg transition-colors"
        >
          Back to Dashboard
        </button>
      </motion.div>
    </div>
  );
}