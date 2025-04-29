import { useState } from "react";
import { CheckCircle2, ChevronDown, ArrowLeft, User } from "lucide-react";
import Image from "next/image";

export default function WithdrawModal({
  onClose,
  onSubmit,
  withdrawableBalance = 11235.01,
}: {
  onClose: () => void;
  onSubmit: (amount: number, numAmount: number, usdEquivalent: number) => void;
  withdrawableBalance?: number;
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
        className="absolute top-6 left-6 text-gray-300 hover:text-white flex items-center z-20"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span>Back to Payouts</span>
      </button>

      {step === 1 && (
        <div className="relative bg-[#1b1618] border border-[#464043] rounded-2xl w-[90%] max-w-xl z-10">
          <div className="text-center pt-10 pb-6">
            <h2 className="text-4xl font-bold text-white">Withdraw</h2>
          </div>

          <div className="p-6">
            {/* Recipient Section */}
            <div className="mb-6 bg-[#110D0F] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-white text-xl mb-4">Recepient</h3>
              <div className="flex items-center">
                <User size={20} className="text-white mr-2" />
                <div>
                  <div className="flex items-center">
                    <span className="text-white text-lg font-medium">
                      0x0596....0f3
                    </span>
                    <span className="text-gray-500 ml-2 text-sm">
                      Account Address
                    </span>
                  </div>
                  <div className="flex items-center text-green-500 mt-1">
                    <CheckCircle2 size={20} className="mr-2" />
                    <span>Valid Address</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amount Section */}
            <div className="mb-6 bg-[#110D0F] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-white text-xl mb-4">Amount</h3>

              <div className="flex justify-between items-center mb-4 border-b border-gray-800">
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter Withdrawal Amount"
                  className="flex-1 bg-transparent text-white text-2xl placeholder:text-gray-600 font-medium outline-none py-2"
                />
                <button className="ml-4 bg-white text-black rounded-lg px-3 py-1 flex items-center">
                  <Image
                    src="/token-branded_starknet.svg"
                    alt="strk logo"
                    width={20}
                    height={20}
                    className="mr-1"
                  />
                  <span className="font-medium">STRK</span>
                  <ChevronDown size={20} className="ml-1" />
                </button>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-gray-500">
                  {amount && parseFloat(amount) > 0
                    ? `Approx. $${usdEquivalent.toFixed(2)}`
                    : ""}
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="invisible">Placeholder</div>
                  <div className="text-gray-500">
                    Escrow Balance: {withdrawableBalance.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="absolute right-10 top-60 transform -translate-y-1/2"></div>
            </div>
          </div>

          <div className="px-6 pb-6">
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
              } text-white font-medium py-4 rounded-lg transition-colors text-xl`}
            >
              Withdraw
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="relative bg-[#1b1618] border border-[#464043] rounded-2xl w-[90%] max-w-xl z-10">
          <div className="text-center pt-10 pb-6">
            <h2 className="text-4xl font-bold text-white">Withdraw</h2>
          </div>

          <div className="p-6">
            {/* Recipient Section */}
            <div className="mb-6 bg-[#110D0F] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-white text-xl mb-4">Recepient</h3>
              <div className="flex items-center">
                <User size={20} className="text-white mr-2" />
                <div>
                  <div className="flex items-center">
                    <span className="text-white text-lg font-medium">
                      0x0596....0f3
                    </span>
                    <span className="text-gray-500 ml-2 text-sm">
                      Account Address
                    </span>
                  </div>
                  <div className="flex items-center text-green-500 mt-1">
                    <CheckCircle2 size={20} className="mr-2" />
                    <span>Valid Address</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amount Section */}
            <div className="mb-6 bg-[#110D0F] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-white text-xl mb-4">Amount</h3>
              <div className="flex justify-between items-center mb-4">
                <div className="text-white text-4xl font-bold">
                  {parseFloat(amount).toLocaleString()}
                </div>
                <button className="bg-white text-black rounded-lg px-3 py-1 flex items-center">
                  <Image
                    src="/token-branded_starknet.svg"
                    alt="strk logo"
                    width={20}
                    height={20}
                  />
                  <span className="font-medium">STRK</span>
                  <ChevronDown size={20} className="ml-1" />
                </button>
              </div>

              <hr className="border-gray-800 mb-4" />

              <div className="flex justify-between items-center">
                <div className="text-gray-500">
                  Approx. ${usdEquivalent.toFixed(2)}
                </div>
                <div className="text-gray-500">
                  Escrow Balance: {withdrawableBalance.toLocaleString()}
                </div>
              </div>

              <div className="text-gray-500 mt-2">
                Gas Fee: 0.001 STRK ($0.001)
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#0000FF] hover:bg-[#1100ff] text-white font-medium py-4 rounded-lg transition-colors text-xl"
            >
              Withdraw
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
