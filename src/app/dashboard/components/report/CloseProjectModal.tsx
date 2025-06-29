'use client';

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CloseProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  projectName: string;
  vulnerabilitiesFound: number;
  totalBountyPaid: number;
}

export default function CloseProjectModal({ 
  isOpen,
  onClose, 
  onConfirm,
  projectName,
  vulnerabilitiesFound,
  totalBountyPaid
}: CloseProjectModalProps) {
  const [closingNote, setClosingNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(closingNote.trim() || undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setClosingNote('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#161113] border border-[#464043] rounded-2xl p-6 max-w-lg w-full mx-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 rounded-lg w-10 h-10 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Close Project</h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Project Summary */}
        <div className="bg-[#1a1518] rounded-lg p-4 mb-6">
          <h3 className="text-white font-semibold mb-3">{projectName}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Vulnerabilities Found</p>
              <p className="text-white font-medium">{vulnerabilitiesFound}</p>
            </div>
            <div>
              <p className="text-gray-400">Total Bounty Paid</p>
              <p className="text-white font-medium">${totalBountyPaid.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-2">What happens when you close this project?</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• The project will be marked as closed and no longer accept new vulnerability reports</li>
            <li>• Pending reports will remain in their current state for review</li>
            <li>• Validated reports will still be eligible for bounty payouts</li>
            <li>• The project can be reopened later if needed</li>
            <li>• All project data and history will be preserved</li>
          </ul>
        </div>

        {/* Optional Closing Note */}
        <div className="mb-6">
          <label htmlFor="closingNote" className="block text-white font-medium mb-2">
            Closing Note (Optional)
          </label>
          <textarea
            id="closingNote"
            value={closingNote}
            onChange={(e) => setClosingNote(e.target.value)}
            placeholder="Add a reason for closing this project or any additional notes..."
            disabled={isLoading}
            className="w-full bg-[#1a1518] border border-[#464043] rounded-lg p-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-[#666] transition-colors disabled:opacity-50"
            rows={3}
            maxLength={500}
          />
          <p className="text-gray-500 text-xs mt-1">{closingNote.length}/500 characters</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 bg-[#1a1518] hover:bg-[#2a2528] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Closing...' : 'Close Project'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}