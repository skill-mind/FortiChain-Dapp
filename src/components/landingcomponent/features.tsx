


import React from "react";
import { FaLock, FaVoteYea, FaClipboardCheck, FaShieldAlt, FaCoins } from "react-icons/fa";

const KeyFeatures = () => {
  const features = [
    {
      title: "On-Chain Project Registration & Verification",
      description:
        "Register and verify smart contracts on a tamper-proof blockchain ledger, ensuring full transparency, security, and ownership authentication.",
      icon: <FaClipboardCheck className="text-white text-3xl" />,
    },
    {
      title: "Decentralized Review & Voting System",
      description:
        "Security researchers can report vulnerabilities confidentially with encrypted submissions, ensuring data integrity and protection.",
      icon: <FaVoteYea className="text-white text-3xl" />,
    },
    {
      title: "Automated Smart Contract Bounty Escrow",
      description:
        "Smart contracts manage bounty funds, securely holding and releasing payouts only when validated vulnerabilities meet pre-set resolution criteria.",
      icon: <FaShieldAlt className="text-white text-3xl" />,
    },
    {
      title: "Secure Vulnerability Reporting with Encrypted Submissions",
      description:
        "Security researchers can report vulnerabilities confidentially with encrypted submissions, ensuring data integrity and protection.",
      icon: <FaLock className="text-white text-3xl" />,
    },
    {
      title: "Reputation-Based Incentives & Governance",
      description:
        "Earn reputation points and token rewards for accurate reporting, validation, and governance participation within the ecosystem.",
      icon: <FaCoins className="text-white text-3xl" />,
    },
  ];

  return (
    <section className=" text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-start space-y-4"
            >
              <div className="bg-gray-700 p-3 rounded-full">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
