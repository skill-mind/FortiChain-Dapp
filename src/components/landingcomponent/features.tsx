import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import features_bg from "../../../public/key_features.jpg";

const KeyFeatures = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    {
      title: "On-Chain Project Registration & Verification",
      description:
        "Register and verify smart contracts on a tamper-proof blockchain ledger, ensuring full transparency, security, and ownership authentication.",
      icon: "/fluent-mdl2_open-enrollment (2).svg",
    },
    {
      title: "Decentralized Review & Voting System",
      description:
        "Security researchers can report vulnerabilities confidentially with encrypted submissions, ensuring data integrity and protection.",
      icon: "/fluent-mdl2_open-enrollment (4).svg",
    },
    {
      title: "Automated Smart Contract Bounty Escrow",
      description:
        "Smart contracts manage bounty funds, securely holding and releasing payouts only when validated vulnerabilities meet pre-set resolution criteria.",
      icon: "/fluent-mdl2_open-enrollment (3).svg",
    },
    {
      title: "Secure Vulnerability Reporting with Encrypted Submissions",
      description:
        "Security researchers can report vulnerabilities confidentially with encrypted submissions, ensuring data integrity and protection.",
      icon: "/fluent-mdl2_open-enrollment.svg",
    },
    {
      title: "Reputation-Based Incentives & Governance",
      description:
        "Earn reputation points and token rewards for accurate reporting, validation, and governance participation within the ecosystem.",
      icon: "/fluent-mdl2_open-enrollment (1).svg",
    },
  ];

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              className="text-3xl font-bold sm:text-4xl md:text-5xl"
              whileHover={{ scale: 1.02 }}
            >
              Key Features
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative bg-[#000000de] rounded-xl shadow-lg flex flex-col items-center text-center overflow-hidden"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={features_bg}
                    alt="Feature Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                    className="opacity-40"
                  />
                </div>

                {/* Content with higher z-index */}
                <div className="relative z-10 bg-[#000000ab]  p-6">
                  <motion.div
                    className="mb-4"
                    whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
                  >
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={48}
                      height={48}
                    />
                  </motion.div>

                  <motion.h3 className="text-xl font-bold mb-3">
                    {feature.title}
                  </motion.h3>

                  <motion.p className="text-gray-300">
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default KeyFeatures;
