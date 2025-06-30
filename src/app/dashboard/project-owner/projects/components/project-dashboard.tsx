"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dashboard } from "./dashboard";
import { motion } from "framer-motion";
import Image from "next/image";
import project1 from "../../../../../../public/project1.svg";
import project2 from "../../../../../../public/project2.svg";
import TipsCard from "@/app/dashboard/project-owner/projects/components/TipsCard";

export function ProjectDashboard() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handleAddProject = () => {
    router.push("/dashboard/project-owner/projects/register-project");
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen w-screen bg-[#110d0f]">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Stats Cards */}
        <motion.div
          className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mb-8"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.div
            className="bg-[#1c1618] rounded-lg p-6"
            variants={cardVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#211a1d] p-2 rounded-md">
                <Image src={project2} alt="Projects" width={24} height={24} />
              </div>
            </div>
            <h2 className="text-white text-4xl font-bold mb-2">5</h2>
            <p className="text-gray-400">Total Number of Projects</p>
          </motion.div>
          <motion.div
            className="bg-[#1c1618] rounded-lg p-4"
            variants={cardVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#211a1d] p-2 rounded-md">
                <Image src={project1} alt="Projects" width={24} height={24} />
              </div>
            </div>
            <h2 className="text-white text-4xl font-bold mb-2">5</h2>
            <p className="text-gray-400">Active Bounties</p>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg"
            variants={cardVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <TipsCard />
          </motion.div>
        </motion.div>
        <Dashboard />
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
