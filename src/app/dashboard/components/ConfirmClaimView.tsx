"use client";
import { useState } from "react";
import { ArrowLeft, Check, Loader2, User2 } from "lucide-react";

interface ConfirmClaimViewProps {
  amount: string;
  tokenAmount: string;
  recipientAddress: string;
  onBack: () => void;
  onConfirm: () => void;
}

export function ConfirmClaimView({
  amount,
  tokenAmount,
  recipientAddress,
  onBack,
  onConfirm,
}: ConfirmClaimViewProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleTransfer = () => {
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      onConfirm();
    }, 2000); // 2 second delay to show loading state
  };

  // Format the recipient address for display
  const displayAddress =
    recipientAddress.length > 20
      ? `${recipientAddress.substring(0, 10)}...${recipientAddress.substring(
          recipientAddress.length - 4
        )}`
      : recipientAddress;

  return (
    <div className="w-full">
      <div className="flex items-center mb-4 sm:mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Rewards
        </button>
      </div>

      <div className="w-full max-w-2xl mx-auto bg-[#1C1618] border border-[#464043] rounded-[20px] p-4 sm:p-6">
        <div className="p-2 sm:p-6 md:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">
            Claim Reward
          </h2>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-base font-medium mb-4 sm:mb-6">
              Amount: {amount} ({tokenAmount})
            </h3>

            <div className="bg-[#121212] border border-[#464043] rounded-2xl p-3 sm:p-5">
              <h4 className="text-sm mb-3">Recepient</h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <User2 className="flex-shrink-0" size={20} />
                <div className="flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-sm break-all">{displayAddress}</span>
                    <span className="text-xs text-neutral-400">
                      Account Address
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Check size={12} />
                    </div>
                    <span className="text-xs text-green-500">
                      Valid Address
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={onBack}
              disabled={isLoading}
              className="py-3 px-6 sm:px-10 text-black rounded-md font-medium bg-white transition-colors text-center disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
            >
              Back
            </button>
            <button
              onClick={handleTransfer}
              disabled={isLoading}
              className="py-3 px-6 sm:px-10 rounded-md font-medium bg-[#0000FF] hover:bg-[#0052FF]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed order-1 sm:order-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                "Transfer to Wallet"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
