import { ChevronDown, CalendarDays } from "lucide-react";
import type { TabType } from "@/app/dashboard/project-owner/upload-project/page";

interface SubmitNewProjectProps {
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const SubmitNewProject = ({ setActiveTab }: SubmitNewProjectProps) => {
  return (
    <div className="flex justify-center pb-32 sm:pb-10">
      <div className="sm:border-[1px] sm:border-[#1F1F1F] sm:rounded-[8px] p-6 w-full sm:max-w-[614px] flex flex-col gap-6">
        <div className="font-medium text-[18px] text-[#E2E2E2]">
          Submit New Project for Audit
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-[10px]">
            <label className="text-[16px] text-[#E2E2E2]">Project Name</label>
            <input
              type="text"
              name="projectName"
              placeholder="Enter project name"
              className="border-[1px] border-[#1F1F1F] rounded-[48px] py-[12px] px-[24px] bg-[#090909] placeholder:text-[#6C6C6C] text-[#E2E2E2]"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label className="text-[16px] text-[#E2E2E2]">Description</label>
            <textarea
              name="description"
              placeholder="Describe your project and its security requirements"
              className="border-[1px] border-[#1F1F1F] rounded-[8px] py-[12px] px-[24px] h-[119px] bg-[#090909] placeholder:text-[#6C6C6C] text-[#E2E2E2]"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex flex-col gap-[10px] w-full">
              <label className="text-[16px] text-[#E2E2E2]">Project Type</label>
              <div className="relative">
                <input
                  type="text"
                  name="projectType"
                  placeholder="Select project type"
                  className="w-full border-[1px] border-[#1F1F1F] rounded-[48px] py-[12px] px-[24px] bg-[#090909] placeholder:text-[#6C6C6C] text-[#E2E2E2]"
                />
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6C] pointer-events-none"
                  size={20}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[10px] w-full">
              <label className="text-[16px] text-[#E2E2E2]">
                Project Deadline
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="projectDeadline"
                  placeholder="Pick date"
                  className="w-full border-[1px] border-[#1F1F1F] rounded-[48px] py-[12px] px-[24px] bg-[#090909] placeholder:text-[#6C6C6C] text-[#E2E2E2]"
                />
                <CalendarDays
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6C] pointer-events-none"
                  size={20}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex flex-col gap-[10px] w-full">
              <label className="text-[16px] text-[#E2E2E2]">
                Repository URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="repoUrl"
                  placeholder="Select repo"
                  className="w-full border-[1px] border-[#1F1F1F] rounded-[48px] py-[12px] px-[24px] bg-[#090909] placeholder:text-[#6C6C6C] text-[#E2E2E2]"
                />
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6C] pointer-events-none"
                  size={20}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[10px] w-full">
              <label className="text-[16px] text-[#E2E2E2]">Priority</label>
              <div className="relative">
                <input
                  type="text"
                  name="priority"
                  placeholder="Select priority"
                  className="w-full border-[1px] border-[#1F1F1F] rounded-[48px] py-[12px] px-[24px] bg-[#090909] placeholder:text-[#6C6C6C] text-[#E2E2E2]"
                />
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6C] pointer-events-none"
                  size={20}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label className="text-[16px] text-[#E2E2E2]">
              Contract Address
            </label>
            <input
              type="text"
              name="contractAddress"
              placeholder="https://yourproject.com"
              className="border-[1px] border-[#1F1F1F] rounded-[48px] py-[12px] px-[24px] bg-[#090909] placeholder:text-[#6C6C6C] text-[#E2E2E2]"
            />
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 w-full">
          <div className="flex-1 rounded-[48px] p-[2px] bg-gradient-to-r from-[#212121] to-[#312F2F]">
            <button className="w-full py-3 px-6 rounded-[48px] bg-[#1C1C1C] text-[#E2E2E2] text-[14px]">
              Cancel
            </button>
          </div>
          <div className="flex-1 rounded-[48px] p-[2px] bg-gradient-to-r from-[#10273E] to-[#2A67A4]">
            <button
              onClick={() => setActiveTab("fund")}
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
export default SubmitNewProject;
