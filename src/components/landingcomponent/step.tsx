import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "../../../public/validatorImage.svg";
import Logo1 from "../../../public/swapicon.svg";
import { MdOutlineLock } from "react-icons/md";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAccount } from "@starknet-react/core";

const StepProcess = ({
  handleConnectModal,
}: {
  handleConnectModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isConnected } = useAccount();

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Create refs for each step to track when they come into view
  const [titleRef, titleInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [step1Ref, step1InView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [step2Ref, step2InView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [step3Ref, step3InView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [step4Ref, step4InView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const requireWallet = (callback: () => void) => {
    if (isConnected) {
      callback();
    } else {
      handleConnectModal(true);
    }
  };

  return (
    <section className="text-white py-16 px-4 overflow-hidden">
      <motion.div
        className="text-center mb-10"
        ref={titleRef}
        initial="hidden"
        animate={titleInView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        <motion.button
          className="px-4 py-2 text-sm font-semibold bg-[#1F1E1E] rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          How it works
        </motion.button>
        <motion.h2
          className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-[48px]"
          variants={titleVariants}
        >
          Step By Step Process
        </motion.h2>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-gradient-to-b from-[#6b6464] to-[#343232] rounded-2xl shadow-lg md:flex md:justify-between md:items-center overflow-hidden"
          ref={step1Ref}
          initial="hidden"
          animate={step1InView ? "visible" : "hidden"}
          variants={itemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <div className="md:w-2/3  p-6">
            <motion.span
              className="mr-2 flex items-center justify-center w-8 h-8 bg-white text-black font-bold rounded-full mb-3"
              whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.5 },
              }}
            >
              1
            </motion.span>
            <h3 className="text-xl font-bold flex items-center mb-2 sm:text-2xl">
              Register and Secure Your Project
            </h3>
            <p className="text-[#E7E7E7] sm:text-lg">
              Smart contract developers register their projects on FortiChain,
              verify ownership, and set up security bounties to attract
              researchers.
            </p>
            <motion.button
              className="mt-4 px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-300 transition sm:text-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#e0e0e0" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => requireWallet(() => console.log("register"))}
            >
              Register Your Project
            </motion.button>
          </div>

          <motion.div
            className="bg-[#ffffff2a] px-4 py-6 rounded-lg mt-6 md:mt-0 md:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={
              step1InView ? { opacity: 1, x: 40 } : { opacity: 0, x: 50 }
            }
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.input
              type="text"
              placeholder="Project Name"
              className="w-full mb-3 p-2 rounded bg-[#1E1E1E80] text-white placeholder-gray-400"
              whileFocus={{ scale: 1.02, borderColor: "#0000FF" }}
            />
            <motion.input
              type="text"
              placeholder="Category"
              className="w-full mb-3 p-2 rounded bg-[#1E1E1E80] text-white placeholder-gray-400"
              whileFocus={{ scale: 1.02, borderColor: "#0000FF" }}
            />
            <motion.button
              className="w-fit px-2 space-x-2 py-2 bg-[#0000FF] rounded-md font-medium hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => requireWallet(() => console.log("submit project"))}
            >
              <span className="flex gap-2 text-[20px] justify-center">
                <MdOutlineLock className="mt-1" />
                Submit Project
                <MdOutlineLock className="mt-2" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-b overflow-hidden from-[#6b6464] to-[#343232] rounded-2xl shadow-lg md:flex md:justify-between md:items-center"
          ref={step2Ref}
          initial="hidden"
          animate={step2InView ? "visible" : "hidden"}
          variants={itemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <div className="md:w-2/3 p-6 ">
            <motion.span
              className="mr-2 flex items-center justify-center w-8 h-8 bg-white text-black font-bold rounded-full mb-4"
              whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.5 },
              }}
            >
              2
            </motion.span>
            <h3 className="text-xl font-bold flex items-center mb-2 sm:text-2xl">
              Report & Validate Vulnerabilities
            </h3>
            <p className="text-[#E7E7E7] sm:text-lg">
              Security researchers submit detailed vulnerability reports, which
              are securely recorded on-chain and reviewed by community
              validations.
            </p>
            <motion.button
              className="mt-4 px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-300 transition sm:text-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#e0e0e0" }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                requireWallet(() => console.log("Submit a Vulnerability"))
              }
            >
              Submit a Vulnerability
            </motion.button>
          </div>

          <motion.div
            className="bg-[#ffffff2a] px-4 py-6 rounded-2xl mt-2 md:w-1/3"
            initial={{ opacity: 0, x: 50, y: 40 }}
            animate={
              step1InView
                ? { opacity: 1, x: 40, y: 30 }
                : { opacity: 0, x: 50, y: 40 }
            }
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h4 className="text-lg font-semibold mb-3 sm:text-xl">
              Report Vulnerability
            </h4>
            <motion.div
              className="bg-gradient-to-r p-3 rounded-md from-[#1E1E1E99] to-[#343232] flex items-center mb-2"
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <input type="checkbox" className="mr-2" checked readOnly />
              <span>Private Key Leakage</span>
            </motion.div>
            <motion.div
              className="flex items-center mb-2 bg-gradient-to-r p-3 rounded-md from-[#1E1E1E99] to-[#343232]"
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <input type="checkbox" className="mr-2" checked readOnly />
              <span>Private Key Leakage</span>
            </motion.div>
            <motion.div
              className="flex items-center bg-gradient-to-r p-3 rounded-md from-[#1E1E1E99] to-[#343232]"
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <input type="checkbox" className="mr-2" />
              <span>Gas Optimization Concerns</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-b from-[#6b6464] to-[#343232] p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between"
          ref={step3Ref}
          initial="hidden"
          animate={step3InView ? "visible" : "hidden"}
          variants={itemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <div className="md:w-2/3">
            <motion.span
              className="mr-2 flex items-center justify-center w-8 h-8 bg-white text-black mb-3 font-bold rounded-full"
              whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.5 },
              }}
            >
              3
            </motion.span>
            <h3 className="text-xl font-bold flex items-center mb-2 sm:text-2xl">
              Community-Driven Assessment
            </h3>
            <p className="text-[#E7E7E7] sm:text-lg">
              Validators vote on the legitimacy of reported vulnerabilities,
              leveraging a transparent, reputation-based system to ensure fair
              evaluations.
            </p>
            <motion.button
              className="mt-4 px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-300 transition sm:text-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#e0e0e0" }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                requireWallet(() => console.log("Become a Validator"))
              }
            >
              Become a Validator
            </motion.button>
          </div>
          {/* Right-side Icon */}
          <motion.div
            className="mt-6 md:mt-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              step3InView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              whileHover={{
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.5, repeat: Infinity },
              }}
            >
              <Image
                src={Logo}
                alt="Validator Network"
                className="w-32 h-32 mx-auto md:w-48 md:h-48 lg:w-64 lg:h-64"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-b from-[#6b6464] to-[#343232] overflow-hidden p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between"
          ref={step4Ref}
          initial="hidden"
          animate={step4InView ? "visible" : "hidden"}
          variants={itemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <div className="md:w-2/3">
            <motion.span
              className="mr-2 flex items-center justify-center w-8 h-8 bg-white text-black font-bold rounded-full mb-3"
              whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.5 },
              }}
            >
              4
            </motion.span>
            <h3 className="text-xl font-bold flex items-center mb-2 sm:text-2xl">
              Automated Rewards & Security Insights
            </h3>
            <p className="text-[#E7E7E7] sm:text-lg">
              Once a vulnerability is confirmed, the bounty is automatically
              paid out via smart contracts, and project owners receive valuable
              security insights.
            </p>
            <motion.button
              className="mt-4 px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-300 transition sm:text-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#e0e0e0" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => requireWallet(() => console.log("Fund a Bounty"))}
            >
              Fund a Bounty
            </motion.button>
          </div>

          <motion.div
            className="mt-6 md:mt-0"
            initial={{ opacity: 0, x: 45 }}
            animate={
              step1InView ? { opacity: 1, x: 35 } : { opacity: 0, x: 45 }
            }
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={Logo1}
                alt="Bounty System"
                className="w-32 h-32 mx-auto md:w-48 md:h-48 lg:w-64 lg:h-64"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StepProcess;
