"use client";

import { Lock, Lightbulb, Goal } from "lucide-react";
import { FaCube } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";
import { HiOutlineUserCircle } from "react-icons/hi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";

function AboutUs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effect for background
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Stagger animation for grid items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen overflow-x-hidden" ref={containerRef}>
      {/* Animated background */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ y: yBg }}
      >
        <Image
          src="/about-hero.svg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
                <div className="absolute inset-0 bg-[#0F0A0ADE]"></div>

       
      </motion.div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow text-white w-full">
          <div className="w-screen bg-[#0F0A0ADE] py-20 mt-60">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-0 space-y-12">
              <motion.div 
                className="space-y-4 -mt-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="text-[128px] font-bold text-white leading-tight"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  About Us
                </motion.h1>
                <motion.p 
                  className="text-gray-300 max-w-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  FortiChain, built by the SkillMind team, is driven by
                  passionate innovators with expertise in blockchain security,
                  cybersecurity, and smart contracts. We are committed to making
                  blockchain technology safer and more secure.
                </motion.p>
              </motion.div>

              <motion.div 
                className="grid md:grid-cols-2 gap-8"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-8 space-y-4 border border-[#464043]"
                  variants={item}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="space-y-2">
                    <Goal className="w-8 h-8" />
                    <h2 className="text-2xl font-semibold text-white">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-gray-300">
                    At FortiChain, we are on a mission to revolutionize
                    blockchain security by creating a decentralized,
                    transparent, and automated platform for vulnerability
                    disclosure and bug bounties.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-8 space-y-4 border border-[#464043]"
                  variants={item}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="space-y-2">
                    <Goal className="w-8 h-8" />
                    <h2 className="text-2xl font-semibold text-white">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-gray-300">
                    We envision a blockchain ecosystem where security is
                    proactive, trustless, and community-driven. By
                    decentralizing the vulnerability reporting and auditing
                    process.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.div 
                  className="text-center space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold text-white">
                    Our Core Values
                  </h2>
                  <p className="text-gray-300">
                    Guiding principles that shape our approach to blockchain
                    security
                  </p>
                </motion.div>

                <motion.div 
                  className="grid md:grid-cols-3 gap-6"
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.div 
                    className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-[#464043]"
                    variants={item}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-2">
                      <FaCube className="w-5 h-5 text-white" />
                      <h3 className="text-xl font-semibold text-white">
                        Transparency
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Open and verifiable security practices that foster trust
                      in the blockchain space.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-[#464043]"
                    variants={item}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="w-6 h-6" />
                      <h3 className="text-xl font-semibold text-white">
                        Security
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      A proactive approach to identifying and resolving
                      vulnerabilities before they can be exploited.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-[#464043]"
                    variants={item}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-2">
                      <SiBlockchaindotcom className="w-5 h-5" />
                      <h3 className="text-xl font-semibold text-white">
                        Decentralization
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      A trustless system where all assessments and bounty
                      payouts are governed by smart contracts.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-[#464043]"
                    variants={item}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-6 h-6" />
                      <h3 className="text-xl font-semibold text-white">
                        Innovation
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Pushing the boundaries of blockchain security through
                      incentives and innovation.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-[#464043]"
                    variants={item}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-2">
                      <HiOutlineUserCircle className="w-6 h-6" />
                      <h3 className="text-xl font-semibold text-white">
                        Collaboration
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Bringing together developers, researchers, and validators
                      to create a safer blockchain ecosystem.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

export default AboutUs;