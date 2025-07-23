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
      </div>
    </div>
  );
}
