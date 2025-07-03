import { useState } from "react";
import { CheckCircle2, ChevronDown, ArrowLeft, User } from "lucide-react";
import Image from "next/image";

export default function WithdrawModal({
  onClose,
  onSubmit,
  withdrawableBalance = 11235.01,
  walletAddress,
}: {
  onClose: () => void;
  onSubmit: (amount: number, numAmount: number, usdEquivalent: number) => void;
  withdrawableBalance?: number;
  walletAddress?: string
}) {
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);
  const [usdEquivalent, setUsdEquivalent] = useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);
      const numValue = parseFloat(value) || 0;
      setUsdEquivalent(numValue * 0.573);
    }
  };

  const handleNextStep = () => {
    if (
      amount &&
      parseFloat(amount) > 0 &&
      parseFloat(amount) <= withdrawableBalance
    ) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (amount) {
      const numAmount = parseFloat(amount);
      onSubmit?.(numAmount, numAmount, usdEquivalent);
    }
  };

  const handleMaxAmount = () => {
    setAmount(withdrawableBalance.toString());
    setUsdEquivalent(withdrawableBalance * 0.573);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-[#211a1d] bg-opacity-80 backdrop-blur-md"></div>

      <button
        onClick={onClose}
        className="absolute top-4 sm:top-6 left-4 sm:left-6 text-gray-300 hover:text-white flex items-center z-20 text-sm sm:text-base"
      >
        <ArrowLeft size={18} className="mr-1 sm:mr-2" />
        <span>Back to Payouts</span>
      </button>

      {step === 1 && (
        <div className="relative bg-[#1b1618] border border-[#464043] rounded-2xl w-[95%] max-w-xl z-10 max-h-[90vh] overflow-y-auto">
          <div className="text-center pt-6 sm:pt-10 pb-4 sm:pb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Withdraw
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            {/* Recipient Section */}
            <div className="mb-4 sm:mb-6 bg-[#110D0F] border border-gray-800 rounded-2xl p-4 sm:p-6">
              <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4">
                Recepient
              </h3>
              <div className="flex items-center">
                <User size={18} className="text-white mr-2" />
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-white text-base sm:text-lg font-medium">
                     {walletAddress && `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}`}
                    </span>
                    <span className="text-gray-500 sm:ml-2 text-xs sm:text-sm mt-1 sm:mt-0">
                      Account Address
                    </span>
                  </div>
                  <div className="flex items-center text-green-500 mt-1">
                    <CheckCircle2 size={16} className="mr-2" />
                    <span className="text-sm">Valid Address</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amount Section */}
            <div className="mb-4 sm:mb-6 bg-[#110D0F] border border-gray-800 rounded-2xl p-4 sm:p-6">
              <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4">
                Amount
              </h3>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter Withdrawal Amount"
                  className="flex-1 min-w-0 bg-transparent text-white text-xl placeholder:text-gray-600 font-medium outline-none py-2"
                />
                <button className="bg-white text-black rounded-lg px-2 py-1 w-fit sm:px-3 sm:w-28 text-md sm:text-sm flex items-center justify-center">
                  <Image
                    src="/token-branded_starknet.svg"
                    alt="strk logo"
                    width={18}
                    height={18}
                    className="mr-1"
                  />
                  <span className="font-medium">STRK</span>
                  <ChevronDown size={18} className="ml-1" />
                </button>
              </div>

              <div className="flex justify-between items-center mt-3 sm:mt-4">
                <div className="text-gray-500 text-sm sm:text-base">
                  {amount && parseFloat(amount) > 0
                    ? `Approx. $${usdEquivalent.toFixed(2)}`
                    : ""}
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="invisible">Placeholder</div>
                  <div className="text-gray-500 text-sm sm:text-base">
                    Escrow Balance: {withdrawableBalance.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <button
              onClick={handleNextStep}
              disabled={
                !amount ||
                parseFloat(amount) <= 0 ||
                parseFloat(amount) > withdrawableBalance
              }
              className={`w-full ${
                !amount ||
                parseFloat(amount) <= 0 ||
                parseFloat(amount) > withdrawableBalance
                  ? "bg-gray-800 cursor-not-allowed"
                  : "bg-[#0000FF] hover:bg-[#1100ff] "
              } text-white font-medium py-3 sm:py-4 rounded-lg transition-colors text-lg sm:text-xl`}
            >
              Withdraw
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="relative bg-[#1b1618] border border-[#464043] rounded-2xl w-[95%] max-w-xl z-10 max-h-[90vh] overflow-y-auto">
          <div className="text-center pt-6 sm:pt-10 pb-4 sm:pb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Withdraw
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            {/* Recipient Section */}
            <div className="mb-4 sm:mb-6 bg-[#110D0F] border border-gray-800 rounded-2xl p-4 sm:p-6">
              <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4">
                Recepient
              </h3>
              <div className="flex items-center">
                <User size={18} className="text-white mr-2" />
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-white text-base sm:text-lg font-medium">
                      {walletAddress}
                    </span>
                    <span className="text-gray-500 sm:ml-2 text-xs sm:text-sm mt-1 sm:mt-0">
                      Account Address
                    </span>
                  </div>
                  <div className="flex items-center text-green-500 mt-1">
                    <CheckCircle2 size={16} className="mr-2" />
                    <span className="text-sm">Valid Address</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amount Section */}
            <div className="mb-4 sm:mb-6 bg-[#110D0F] border border-gray-800 rounded-2xl p-4 sm:p-6">
              <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4">
                Amount
              </h3>
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <div className="text-white text-2xl sm:text-4xl font-bold">
                  {parseFloat(amount).toLocaleString()}
                </div>
                <button className="bg-white text-black rounded-lg px-2 py-1 sm:px-3 sm:py-1 flex items-center text-sm sm:text-base">
                  <Image
                    src="/token-branded_starknet.svg"
                    alt="strk logo"
                    width={16}
                    height={16}
                  />
                  <span className="font-medium">STRK</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
              </div>

              <hr className="border-gray-800 mb-3 sm:mb-4" />

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="text-gray-500 text-sm sm:text-base mb-1 sm:mb-0">
                  Approx. ${usdEquivalent.toFixed(2)}
                </div>
                <div className="text-gray-500 text-sm sm:text-base">
                  Escrow Balance: {withdrawableBalance.toLocaleString()}
                </div>
              </div>

              <div className="text-gray-500 text-sm sm:text-base mt-2">
                Gas Fee: 0.001 STRK ($0.001)
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#0000FF] hover:bg-[#1100ff] text-white font-medium py-3 sm:py-4 rounded-lg transition-colors text-lg sm:text-xl"
            >
              Withdraw
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
