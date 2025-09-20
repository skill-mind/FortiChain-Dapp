import type { TabType } from "@/app/dashboard/project-owner/upload-project/page";

interface FundProjectProps {
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const FundProject = ({ setActiveTab }: FundProjectProps) => {
  return (
    <div className="flex justify-center pb-32 sm:pb-10">
      <div className="sm:border-[1px] sm:border-[#1F1F1F] sm:rounded-[8px] p-6 w-full sm:max-w-[614px] flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="text-[16px] text-[#E2E2E2]">
            Fund project for audit
          </div>
          <div className="text-[12px] text-[#6C6C6C]">
            Add funds to your bounty escrow account to pay for audit.
          </div>
        </div>
        <div className="bg-[#101011] border-[1px] border-[#1F1F1F] p-6 rounded-[8px] flex flex-col gap-[10px]">
          <div className="text-[16px] text-[#E2E2E2]">Connect Wallet</div>
          <div className="text-[12px] text-[#6C6C6C]">
            0x4A7d5cB67eA4F6e4B7cC3B3aE3f8fD9bB2cF9a1B
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-[8px]">
            <label className="text-[16px] text-[#E2E2E2]">Amount (USD)</label>
            <input
              type="text"
              name="amount"
              placeholder="1000"
              className="border-[1px] border-[#1F1F1F] rounded-[48px] py-[12px] px-[24px] bg-[#090909] placeholder:text-[#6C6C6C] text-[#E2E2E2]"
            />
            <p className="text-[14px] text-[#6C6C6C]">Minimum deposit: $100</p>
          </div>
          <div className="bg-[#101011] p-6 flex flex-col gap-[10px] rounded-[8px]">
            <div className="text-[16px] text-[#E2E2E2]">Escrow Protection</div>
            <div className="text-[16px] text-[#6C6C6C]">
              Funds are held securely in escrow and only released when valid
              vulnerabilities are confirmed and bounties are awarded.
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 w-full">
          <div className="flex-1 rounded-[48px] p-[2px] bg-gradient-to-r from-[#212121] to-[#312F2F]">
            <button
              onClick={() => setActiveTab("submit")}
              className="w-full py-3 px-6 rounded-[48px] bg-[#1C1C1C] text-[#E2E2E2] text-[14px]"
            >
              Back
            </button>
          </div>
          <div className="flex-1 rounded-[48px] p-[2px] bg-gradient-to-r from-[#10273E] to-[#2A67A4]">
            <button
              onClick={() => setActiveTab("summary")}
              className="w-full py-3 px-6 rounded-[48px] bg-gradient-to-r from-[#1D74F9] to-[#092650] text-[#E2E2E2] text-[14px]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FundProject;
