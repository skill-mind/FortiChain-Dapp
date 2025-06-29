"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StepProcess from "@/components/landingcomponent/step";
import KeyFeatures from "@/components/landingcomponent/features";
import SubscribeSection from "@/components/landingcomponent/newsletter";
import Footer from "@/components/footer";
import Image from "next/image";
import BackgroundImage from "../../public/Hero.svg";
import { ConnectButton } from "@/components/connect-button";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-[#000000ae] text-white">
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={BackgroundImage}
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-70"
          />
        </div>

        <div className="absolute inset-0 bg-[#00000030] bg-opacity-60 z-10"></div>

        <div className="relative z-20">
          <Navbar />
        </div>

        <div className="relative z-10 py-24 md:py-32 lg:py-40 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              Decentralized Bug Bounty and Smart Contract Security
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-300"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              Find, report, and fix smart contract vulnerabilities with complete
              transparency and trustlessness.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <ConnectButton
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                variant="default"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <section>
        <StepProcess handleConnectModal={setIsModalOpen} />
      </section>

      <section>
        <KeyFeatures />
      </section>

      <section>
        <SubscribeSection />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
