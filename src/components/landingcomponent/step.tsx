


import React from "react";
import  Image from "next/image";
import Logo from "../../../public/validatorImage.svg"
import Logo1 from "../../../public/swapicon.svg"
import { MdOutlineLock } from "react-icons/md";

const StepProcess = () => {
  return (
    <section className=" text-white py-16 px-4">
      {/* Title Section */}
      <div className="text-center mb-10">
        <button className="px-4 py-2 text-sm font-semibold bg-[#1F1E1E] rounded-md">
          How it works
        </button>
        <h2 className="mt-4 text-3xl font-bold md:text-[48px]">
          Step By Step Process
        </h2>
      </div>

      {/* Steps Container */}
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Step 1 */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg md:flex md:justify-between md:items-center">
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold flex items-center mb-2">
              <span className="mr-2 flex items-center justify-center w-8 h-8 bg-white text-black font-bold rounded-full">
                1
              </span>
              Register and Secure Your Project
            </h3>
            <p className="text-gray-400">
              Smart contract developers register their projects on FortiChain,
              verify ownership, and set up security bounties to attract
              researchers.
            </p>
            <button className="mt-4 px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-300 transition">
              Register Your Project
            </button>
          </div>

          {/* Project Form */}
          <div className="bg-gray-800 p-4 rounded-lg mt-6 md:mt-0 md:w-1/3">
            <input
              type="text"
              placeholder="Project Name"
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
            />
            <button className="w-full py-2 bg-[#0000FF] rounded-md font-medium hover:bg-blue-700 transition">
            <span className="flex gap-2 text-[20px] justify-center">
            <MdOutlineLock  className="mt-1" />
             Submit Project 
             <MdOutlineLock className="mt-2"/>
            </span>
            
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg md:flex md:justify-between md:items-center">
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold flex items-center mb-2">
              <span className="mr-2 flex items-center justify-center w-8 h-8 bg-white text-black font-bold rounded-full">
                2
              </span>
              Report & Validate Vulnerabilities
            </h3>
            <p className="text-gray-400">
              Security researchers submit detailed vulnerability reports, which
              are securely recorded on-chain and reviewed by community
              validations.
            </p>
            <button className="mt-4 px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-300 transition">
              Submit a Vulnerability
            </button>
          </div>

          {/* Report Vulnerability Box */}
          <div className="bg-gray-800 p-4 rounded-lg mt-6 md:mt-0 md:w-1/3">
            <h4 className="text-lg font-semibold mb-3">Report Vulnerability</h4>
            <div className="flex items-center mb-2 ">
              <input type="checkbox" className="mr-2 " checked readOnly />
              <span>Private Key Leakage</span>
            </div> 
            <div className="flex items-center mb-2 ">
              <input type="checkbox" className="mr-2" checked readOnly />
              <span>Private Key Leakage</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Gas Optimization Concerns</span>
            </div>
          </div>
        </div>
         {/* Step 3 - Community-Driven Assessment */}
         <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold flex items-center mb-2">
              <span className="mr-2 flex items-center justify-center w-8 h-8 bg-white text-black font-bold rounded-full">
                3
              </span>
              Community-Driven Assessment
            </h3>
            <p className="text-gray-400">
              Validators vote on the legitimacy of reported vulnerabilities,
              leveraging a transparent, reputation-based system to ensure fair
              evaluations.
            </p>
            <button className="mt-4 px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-300 transition">
              Become a Validator
            </button>
          </div>
          {/* Right-side Icon */}
          <div className="mt-6 md:mt-0">
            <Image
              src={Logo}
              alt="Validator Network"
              className="w-32 h-32  mx-auto md:w-64 md:h-64"
            />
          </div>
        </div>

        {/* Step 4 - Automated Rewards & Security Insights */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold flex items-center mb-2">
              <span className="mr-2 flex items-center justify-center w-8 h-8 bg-white text-black font-bold rounded-full">
                4
              </span>
              Automated Rewards & Security Insights
            </h3>
            <p className="text-gray-400">
              Once a vulnerability is confirmed, the bounty is automatically
              paid out via smart contracts, and project owners receive valuable
              security insights.
            </p>
            <button className="mt-4 px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-300 transition">
              Fund a Bounty
            </button>
          </div>
          {/* Right-side Icons */}
          <div className="mt-6 md:mt-0">
            <Image
              src={Logo1}
              alt="Bounty System"
              className="w-32 h-32  mx-auto md:w-64 md:h-64"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepProcess;
