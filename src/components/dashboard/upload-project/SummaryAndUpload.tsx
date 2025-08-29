import type { TabType } from "@/app/dashboard/project-owner/upload-project/page";

interface SummaryAndUploadProps {
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const SummaryAndUpload = ({ setActiveTab }: SummaryAndUploadProps) => {
  return (
    <div className="flex justify-center pb-32 sm:pb-10">
      <div className="sm:border-[1px] sm:border-[#1F1F1F] sm:rounded-[8px] p-6 w-full sm:max-w-[808px] flex flex-col gap-6">
        <div className="text-[18px] text-[#E2E2E2]">Summary</div>
        <div className="flex flex-col gap-6">
          <div className="hidden sm:flex sm:items-center sm:justify-between">
            <div className="flex flex-col gap-[10px]">
              <div className="text-[16px] text-[#E2E2E2]">Project Name</div>
              <div className="text-[14px] text-[#6C6C6C]">
                Smart contract audit
              </div>
            </div>
            <div className="bg-[#10273E] rounded-[48px] py-[14px] px-3 text-[#0073E6]">
              Priority: Low
            </div>
            <div className="bg-[#1C1C1C] border-[1px] border-[#1F1F1F] rounded-[8px] py-[14px] px-6 text-[#6C6C6C] text-[14px]">
              Bounty Amount |{" "}
              <span className="text-[18px] text-[#E2E2E2]">$1200</span>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-[10px]">
                <div className="text-[16px] text-[#E2E2E2]">Project Name</div>
                <div className="text-[14px] text-[#6C6C6C]">
                  Smart contract audit
                </div>
              </div>
              <div className="bg-[#10273E] rounded-[48px] py-[14px] px-3 text-[#0073E6]">
                Priority: Low
              </div>
            </div>
            <div className="text-center bg-[#1C1C1C] border-[1px] border-[#1F1F1F] rounded-[8px] py-[14px] px-6 text-[#6C6C6C] text-[14px]">
              Bounty Amount |{" "}
              <span className="text-[18px] text-[#E2E2E2]">$1200</span>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="text-[16px] text-[#E2E2E2]">Description</div>
            <div className="text-[14px] text-[#6C6C6C]">
              Smart Contract Audit is a planned, thorough evaluation of a smart
              contract’s codebase, designed to equip researchers with a clear
              framework for assessing its security, functionality, and
              efficiency within the Mindblitz ecosystem or related blockchain
              applications. The audit, to be conducted by specialized security
              experts, will utilize automated analysis tools and in-depth manual
              code review to uncover potential vulnerabilities, logical errors,
              or inefficiencies that could lead to exploits or operational
              issues. Researchers will focus on verifying the contract’s
              alignment with its specified requirements, compliance with
              blockchain industry best practices, and robustness against common
              attack vectors, such as reentrancy, integer overflows, or
              unauthorized access. The process will result in a detailed report
              that identifies any issues, evaluates their severity, and provides
              actionable recommendations for remediation, enabling researchers
              to ensure the smart contract’s reliability, security, and
              trustworthiness prior to its deployment in decentralized systems.
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-[10px] w-full">
              <div className="text-[16px] text-[#E2E2E2]">Project Type</div>
              <div className="text-[14px] text-[#6C6C6C]">Smart contract</div>
            </div>
            <div className="flex flex-col gap-[10px] w-full">
              <div className="text-[16px] text-[#E2E2E2]">Project Deadline</div>
              <div className="text-[14px] text-[#6C6C6C]">17 - Aug - 2025</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex flex-col gap-[10px] w-full">
              <div className="text-[16px] text-[#E2E2E2]">Repository URL</div>
              <div className="text-[14px] text-[#6C6C6C]">
                https://github.com/smartcontract/repository
              </div>
            </div>
            <div className="flex flex-col gap-[10px] w-full">
              <div className="text-[16px] text-[#E2E2E2]">Contract Address</div>
              <div className="text-[14px] text-[#6C6C6C]">
                0x1234567890abcdef1234567890abcdef12345678
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 w-full">
          <div className="flex-1 rounded-[48px] p-[2px] bg-gradient-to-r from-[#212121] to-[#312F2F]">
            <button
              onClick={() => setActiveTab("fund")}
              className="w-full py-3 px-6 rounded-[48px] bg-[#1C1C1C] text-[#E2E2E2] text-[14px]"
            >
              Back
            </button>
          </div>
          <div className="flex-1 rounded-[48px] p-[2px] bg-gradient-to-r from-[#10273E] to-[#2A67A4]">
            <button className="w-full py-3 px-6 rounded-[48px] bg-gradient-to-r from-[#1D74F9] to-[#092650] text-[#E2E2E2] text-[14px]">
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SummaryAndUpload;
