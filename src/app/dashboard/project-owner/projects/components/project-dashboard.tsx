"use client";

import { Bell, ChevronDown, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dashboard } from "./dashboard";

export function ProjectDashboard() {
  const router = useRouter();

  const handleAddProject = () => {
    router.push("/dashboard/project-owner/projects/register-project");
  };

  return (
    <div className="flex min-h-screen bg-[#110d0f]">

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1c1618] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#211a1d] p-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
            </div>
            <h2 className="text-white text-4xl font-bold mb-2">5</h2>
            <p className="text-gray-400">Total Number of Projects</p>
          </div>
          <div className="bg-[#1c1618] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#211a1d] p-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
            </div>
            <h2 className="text-white text-4xl font-bold mb-2">5</h2>
            <p className="text-gray-400">Active Bounties</p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="16" y2="12" />
                <line x1="12" x2="12.01" y1="8" y2="8" />
              </svg>
              <h3 className="text-black text-xl font-bold">Tip</h3>
            </div>
            <p className="text-black text-sm">
              All funds in escrow are refundable if no valid reports are
              submitted before the deadline.
            </p>
            <div className="flex justify-center mt-4 gap-1">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
<Dashboard/>
        {/* <div className="flex justify-end mb-6">
          <Button
            className="bg-[#0000ff] hover:bg-[#2b2bff] text-white rounded-lg"
            onClick={handleAddProject}
          >
            <Plus size={16} className="mr-2" />
            Add Project
          </Button>
        </div> */}

        {/* Projects Table */}
        {/* <div className="bg-[#1c1618] rounded-lg overflow-hidden">
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-white text-2xl font-bold">Projects</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  className="pl-10 bg-[#211a1d] border-none text-white w-[300px] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="flex items-center gap-2 bg-[#211a1d] px-3 py-2 rounded-lg">
                <span className="text-white">All</span>
                <ChevronDown size={16} className="text-white" />
              </div>
            </div>
          </div>

          <div className="px-6">
            <div className="grid grid-cols-6 gap-4 py-4 border-b border-[#211a1d] text-gray-400 font-medium">
              <div>Name</div>
              <div>Category</div>
              <div>Bounty Allocated</div>
              <div>Bounty Paid</div>
              <div>Status</div>
              <div>Action</div>
            </div>

            <div className="divide-y divide-[#211a1d]">
              <div className="grid grid-cols-6 gap-4 py-4 items-center">
                <div className="text-white">SkillNet</div>
                <div className="text-white">DeFi</div>
                <div className="text-white">$5,200.13</div>
                <div className="text-white">$5,124.11</div>
                <div>
                  <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">
                    Completed
                  </span>
                </div>
                <div>
                  <Link href="#" className="text-[#0000ff] hover:underline">
                    View
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4 py-4 items-center">
                <div className="text-white">SkillNet</div>
                <div className="text-white">DeFi</div>
                <div className="text-white">$5,200.44</div>
                <div className="text-white">N/A</div>
                <div>
                  <span className="px-3 py-1 bg-[#0000ff] text-white text-xs rounded-full">
                    Ongoing
                  </span>
                </div>
                <div>
                  <Link href="#" className="text-[#0000ff] hover:underline">
                    View
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4 py-4 items-center">
                <div className="text-white">SkillNet</div>
                <div className="text-white">DeFi</div>
                <div className="text-white">$5,200.11</div>
                <div className="text-white">$2,600.23</div>
                <div>
                  <span className="px-3 py-1 bg-[#ff3737] text-white text-xs rounded-full">
                    Closed
                  </span>
                </div>
                <div>
                  <Link href="#" className="text-[#0000ff] hover:underline">
                    View
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4 py-4 items-center">
                <div className="text-white">SkillNet</div>
                <div className="text-white">DeFi</div>
                <div className="text-white">$5,200.11</div>
                <div className="text-white">N/A</div>
                <div>
                  <span className="px-3 py-1 bg-[#0000ff] text-white text-xs rounded-full">
                    Ongoing
                  </span>
                </div>
                <div>
                  <Link href="#" className="text-[#0000ff] hover:underline">
                    View
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4 py-4 items-center">
                <div className="text-white">SkillNet</div>
                <div className="text-white">DeFi</div>
                <div className="text-white">$410.15</div>
                <div className="text-white">N/A</div>
                <div>
                  <span className="px-3 py-1 bg-gray-500 text-white text-xs rounded-full">
                    Expired
                  </span>
                </div>
                <div>
                  <Link href="#" className="text-[#0000ff] hover:underline">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
}
