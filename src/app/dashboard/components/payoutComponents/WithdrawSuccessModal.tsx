import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface WithdrawSuccessModalProps {
  onClose: () => void;
  title?: string;
  amount: number;
  usdAmount: number;
  type?: 'withdrawal' | 'deposit' | 'transaction';
}

export default function WithdrawSuccessModal({
  onClose,
  title = "Transaction Successful",
  amount,
  usdAmount,
  type = 'withdrawal'
}: WithdrawSuccessModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  let message: string;


  
  if (type === 'deposit') {
    message = `Your deposit of ${amount.toLocaleString()} STRK ($${usdAmount.toFixed(2)}) has been successfully added to escrow. These funds will be used for bounty payouts and security rewards.`;
  } else if (type === 'withdrawal') {
    message = `Your withdrawal of ${amount.toLocaleString()} STRK ($${usdAmount.toFixed(2)}) has been successfully processed. Funds will be sent to your wallet shortly.`;
  } else {
    message = `Transaction of ${amount.toLocaleString()} STRK ($${usdAmount.toFixed(2)}) has been successfully completed.`;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-black border border-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        
        <p className="text-gray-300 mb-8">{message}</p>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-green-500 rounded-lg w-16 h-16 flex items-center justify-center">
            <Check size={32} color="white" />
          </div>
        </motion.div>
        
        <button
          onClick={onClose}
          className="w-full bg-[#0000FF] hover:bg-[#1100ff] text-white font-medium py-3 rounded-lg transition-colors"
        >
          Back to Payouts
        </button>
      </motion.div>
    </div>
  );
}